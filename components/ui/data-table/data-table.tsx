"use client"

import * as React from "react"
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type FilterFn,
  type PaginationState,
  type ReactTable,
  type RowData,
  type SortingState,
} from "@tanstack/react-table"
import { Columns3Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { ListPager } from "@/components/ui/list-pager/list-pager"
import { PAGE_SIZE } from "@/components/ui/list-pager/paging"
import {
  ListToolbar,
  NoResults,
  type ListFilters,
} from "@/components/ui/list-toolbar/list-toolbar"
import {
  isComplete,
  matches,
  type FilterField,
  type FilterRule,
  type FilterType,
  type FilterValue,
} from "@/components/ui/list-toolbar/filters"
import { UNSORTED, type SortOption } from "@/components/ui/sort-control/sort"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },
})

type DataTableFeatures = typeof features

type DataTableInstance<TData extends RowData> = ReactTable<
  DataTableFeatures,
  TData
>

/**
 * A column's filters from the toolbar, as they sit in TanStack's `columnFilters`: the field's type, which says how to
 * compare, and the rules on that column (`FilterRule`, the same model `ListToolbar` and `filterRows` use).
 */
type DataTableColumnRules = { type: FilterType; rules: FilterRule[] }

const isColumnRules = (value: unknown): value is DataTableColumnRules =>
  typeof value === "object" &&
  value !== null &&
  Array.isArray((value as DataTableColumnRules).rules)

/**
 * The filter every column of a data table uses: the toolbar's rules (`DataTableColumnRules`), every complete one on the
 * column passing, or a text that the column's value includes. `useDataTable` sets it on every column.
 */
function filterFn_dataTable<TData extends RowData>(): FilterFn<
  DataTableFeatures,
  TData
> {
  const filter: FilterFn<DataTableFeatures, TData> = (row, columnId, value) => {
    if (isColumnRules(value)) {
      const raw = row.getValue(columnId) as FilterValue
      return value.rules
        .filter(isComplete)
        .every((rule) => matches(value.type, rule, raw))
    }
    return filterFn_includesString(row, columnId, value)
  }
  filter.autoRemove = (value) =>
    isColumnRules(value)
      ? value.rules.length === 0
      : value === undefined || value === ""
  return filter
}

/**
 * The column defaults a data table needs, for a table built on TanStack's `useTable` that filters its own rows:
 * `defaultColumn: dataTableDefaultColumn<Row>()`.
 */
const dataTableDefaultColumn = <TData extends RowData>() => ({
  filterFn: filterFn_dataTable<TData>(),
})

/**
 * A data table's state and rows: the search, the filters, the sort, which columns show, which rows are picked, and the
 * page. Pass the table it returns to the parts.
 */
function useDataTable<TData extends RowData>({
  columns,
  data,
}: {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  })

  const [defaultColumn] = React.useState(() => dataTableDefaultColumn<TData>())

  return useTable({
    features,
    data,
    columns,
    defaultColumn,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
  })
}

type DataTableSearch = {
  /** "Search merchants". The field's accessible name too. */
  placeholder: string
  /**
   * The one column the search looks in. Left out, it looks in every column with a value (TanStack's global filter); a
   * column with `enableGlobalFilter: false` is left out of it.
   */
  column?: string
}

type DataTableFilters = {
  /**
   * What the table filters by. Each field's `id` is a column's id, and the filter compares that column's value; a
   * field's `read` is not used. The column may be hidden.
   */
  fields: readonly FilterField[]
  /** `advanced` (the default) or `simple`, as on `ListToolbar`. */
  form?: ListFilters["form"]
}

type DataTableToolbarProps<TData extends RowData> = {
  table: DataTableInstance<TData>
  /** The list's search, on the left. */
  search?: DataTableSearch
  /** The list's filters, after the search: one Filter button, or fixed controls (`form: "simple"`). */
  filters?: DataTableFilters
  /** What the list can sort by, each `value` a column's id: one Sort button at the right end (`SortControl`). */
  sort?: readonly SortOption[]
  /** The list's own buttons, such as Export or Add Merchant, at the right end with the primary last. */
  actions?: React.ReactNode
  /** The Columns menu, which shows and hides columns, in the toolbar's slot before Sort. On by default. */
  columnsMenu?: boolean
  /** What a row is, one and many, for the count in the phone's filter sheet: ["merchant", "merchants"]. */
  noun?: readonly [string, string]
  /** More controls for the toolbar's slot, before the Columns menu and Sort, such as a Board and Table switch. */
  children?: React.ReactNode
  className?: string
}

/**
 * A data table's toolbar: `ListToolbar`, the same toolbar every list has, run by the table's state. The search and the
 * filters sit on the left; the slot (`children`), the Columns menu, Sort and `actions` sit on the right. On a phone it
 * folds as `ListToolbar` does. Column headings don't sort; Sort does.
 */
function DataTableToolbar<TData extends RowData>({
  table,
  search,
  filters,
  sort,
  actions,
  columnsMenu = true,
  noun,
  children,
  className,
}: DataTableToolbarProps<TData>) {
  const state = table.store.state
  const fields = filters?.fields ?? []
  const fieldIds = new Set(fields.map((field) => field.id))
  const typeOf = (id: string) =>
    fields.find((field) => field.id === id)?.type ?? "text"

  // The toolbar's rules, in the order of the columns they are on.
  const rules = state.columnFilters.flatMap((filter) =>
    fieldIds.has(filter.id) && isColumnRules(filter.value)
      ? filter.value.rules
      : []
  )
  const setRules = (next: FilterRule[]) =>
    table.setColumnFilters((previous) => {
      const byColumn = new Map<string, FilterRule[]>()
      for (const rule of next) {
        byColumn.set(rule.field, [...(byColumn.get(rule.field) ?? []), rule])
      }
      return [
        ...previous.filter((filter) => !fieldIds.has(filter.id)),
        ...[...byColumn].map(([id, columnRules]) => ({
          id,
          value: { type: typeOf(id), rules: columnRules },
        })),
      ]
    })

  const searchColumn = search?.column
    ? table.getColumn(search.column)
    : undefined
  const searchValue = search?.column
    ? ((searchColumn?.getFilterValue() as string | undefined) ?? "")
    : ((state.globalFilter as string | undefined) ?? "")

  const sorted = state.sorting[0]
  const slot =
    children || columnsMenu ? (
      <>
        {children}
        {columnsMenu && <DataTableViewOptions table={table} />}
      </>
    ) : null

  if (!search && !filters && !sort && !actions && !slot) return null
  return (
    <div
      data-slot="data-table-toolbar"
      className={cn("flex flex-col gap-2 py-4", className)}
    >
      <ListToolbar
        search={
          search && {
            placeholder: search.placeholder,
            value: searchValue,
            onChange: (value) =>
              searchColumn
                ? searchColumn.setFilterValue(value)
                : table.setGlobalFilter(value),
          }
        }
        filters={
          filters && {
            fields,
            form: filters.form,
            value: rules,
            onChange: setRules,
          }
        }
        shown={table.getFilteredRowModel().rows.length}
        total={table.getCoreRowModel().rows.length}
        noun={noun}
        sort={
          sort && {
            fields: sort,
            value: sorted
              ? { by: sorted.id, direction: sorted.desc ? "desc" : "asc" }
              : UNSORTED,
            onChange: (value) =>
              table.setSorting(
                value.by
                  ? [{ id: value.by, desc: value.direction === "desc" }]
                  : []
              ),
          }
        }
        actions={actions}
      >
        {slot}
      </ListToolbar>
    </div>
  )
}

/**
 * A data table: `DataTableToolbar` (the list's toolbar: search, filters, the Columns menu, Sort and the list's actions),
 * the table, and `DataTablePagination` (the count and the pages) under it. Column headings are plain text; the list
 * sorts from Sort. Built only from the parts this module exports, so a table built from them looks the same.
 */
function DataTable<TData extends RowData>({
  columns,
  data,
  noun,
  search,
  filters,
  sort,
  actions,
  columnsMenu = true,
  children,
  filterColumn,
  filterPlaceholder,
}: {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
  /** What a row is, one and many, for the count under the table: ["merchant", "merchants"]. */
  noun?: readonly [string, string]
  /** The list's search: its placeholder, and the one column it looks in, if only one. */
  search?: DataTableSearch
  /** What the list filters by, each field's `id` a column's id, and the form the filters take. */
  filters?: DataTableFilters
  /** What the list can sort by, each `value` a column's id. */
  sort?: readonly SortOption[]
  /** The list's own buttons, such as Export or Add Merchant, at the toolbar's right end with the primary last. */
  actions?: React.ReactNode
  /** The Columns menu in the toolbar. On by default. */
  columnsMenu?: boolean
  /** More controls for the toolbar's slot, before the Columns menu and Sort. */
  children?: React.ReactNode
  /** @deprecated Use `search={{ placeholder, column }}`. */
  filterColumn?: string
  /** @deprecated Use `search={{ placeholder, column }}`. */
  filterPlaceholder?: string
}) {
  const table = useDataTable({ columns, data })

  return (
    <div data-slot="data-table" className="w-full">
      <DataTableToolbar
        table={table}
        search={
          search ??
          (filterColumn
            ? {
                placeholder: filterPlaceholder ?? "Search",
                column: filterColumn,
              }
            : undefined)
        }
        filters={filters}
        sort={sort}
        actions={actions}
        columnsMenu={columnsMenu}
        noun={noun}
      >
        {children}
      </DataTableToolbar>
      <DataTableContent table={table} />
      <DataTablePagination table={table} noun={noun} />
    </div>
  )
}

/** @deprecated Use `DataTableToolbar`'s `search`, which draws the list's search field. */
function DataTableFilter<TData extends RowData>({
  table,
  column,
  placeholder = "Filter...",
  className,
}: {
  table: DataTableInstance<TData>
  column: string
  placeholder?: string
  className?: string
}) {
  return (
    <Input
      placeholder={placeholder}
      value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(column)?.setFilterValue(event.target.value)
      }
      className={cn("max-w-sm", className)}
    />
  )
}

/**
 * The table: its heading row, its rows, and, when the search and filters leave no rows, `NoResults` with Clear Filters.
 * Headings are plain text.
 */
function DataTableContent<TData extends RowData>({
  table,
  className,
}: {
  table: DataTableInstance<TData>
  className?: string
}) {
  const rows = table.getRowModel().rows
  // Rows the search or a filter left out, as opposed to a table with no rows at all.
  const narrowed = rows.length === 0 && table.getCoreRowModel().rows.length > 0
  return (
    <Table className={className}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : (
                  <table.FlexRender header={header} />
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {rows.length ? (
          rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow className="hover:bg-transparent">
            <TableCell
              colSpan={table.getVisibleLeafColumns().length}
              className={cn(!narrowed && "h-24 text-center")}
            >
              {narrowed ? (
                <NoResults
                  onClear={() => {
                    table.setGlobalFilter("")
                    table.setColumnFilters([])
                  }}
                />
              ) : (
                "No results."
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

/**
 * @deprecated Column headings no longer sort: pass `sort` to `DataTable` or `DataTableToolbar`, and write the heading as
 * a plain `header: "Merchant"`. This renders the title as plain text.
 */
function DataTableColumnHeader<TData extends RowData, TValue>({
  title,
  className,
}: {
  column?: Column<DataTableFeatures, TData, TValue>
  title: string
  className?: string
}) {
  return <div className={className}>{title}</div>
}

/** The table's footer: its count and pages, drawn by `ListPager` as under every list. */
function DataTablePagination<TData extends RowData>({
  table,
  noun = ["row", "rows"],
  className,
}: {
  table: DataTableInstance<TData>
  /** What a row is, one and many, for the count: ["merchant", "merchants"]. */
  noun?: readonly [string, string]
  className?: string
}) {
  const { pageIndex, pageSize } = table.store.state.pagination
  return (
    <ListPager
      page={pageIndex + 1}
      pageSize={pageSize}
      total={table.getRowCount()}
      noun={noun}
      onPageChange={(page) => table.setPageIndex(page - 1)}
      className={cn("py-4", className)}
    />
  )
}

// A column's name in the Columns menu: its heading when that is text, its id otherwise.
const columnName = <TData extends RowData>(
  column: Column<DataTableFeatures, TData, unknown>
) =>
  typeof column.columnDef.header === "string"
    ? column.columnDef.header
    : column.id

/**
 * The Columns menu, which shows and hides columns, as an outline button for the toolbar's slot. A column with
 * `enableHiding: false` is not listed. `DataTableToolbar` puts it in its slot.
 */
function DataTableViewOptions<TData extends RowData>({
  table,
  className,
}: {
  table: DataTableInstance<TData>
  className?: string
}) {
  const hideable = table.getAllColumns().filter((column) => column.getCanHide())
  if (hideable.length === 0) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn("shrink-0", className)}>
          <Columns3Icon data-icon="inline-start" />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Show Columns</DropdownMenuLabel>
        {hideable.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}
            // The menu stays open, so several columns change in one go.
            onSelect={(event) => event.preventDefault()}
          >
            {columnName(column)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export {
  DataTable,
  DataTableColumnHeader,
  DataTableContent,
  DataTableFilter,
  DataTablePagination,
  DataTableToolbar,
  DataTableViewOptions,
  dataTableDefaultColumn,
  features as dataTableFeatures,
  useDataTable,
  type DataTableColumnRules,
  type DataTableFeatures,
  type DataTableFilters,
  type DataTableInstance,
  type DataTableSearch,
}
