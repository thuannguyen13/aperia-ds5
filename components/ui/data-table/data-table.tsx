"use client"

import * as React from "react"
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
  useTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type ReactTable,
  type RowData,
  type SortingState,
} from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

type DataTableFeatures = typeof features

type DataTableInstance<TData extends RowData> = ReactTable<
  DataTableFeatures,
  TData
>

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
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  return useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
}

function DataTable<TData extends RowData>({
  columns,
  data,
  filterColumn,
  filterPlaceholder,
}: {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
  /** Column id the search input filters on. Omit to hide the input. */
  filterColumn?: string
  filterPlaceholder?: string
}) {
  const table = useDataTable({ columns, data })

  return (
    <div data-slot="data-table" className="w-full">
      <div className="flex items-center gap-2 py-4">
        {filterColumn && (
          <DataTableFilter
            table={table}
            column={filterColumn}
            placeholder={filterPlaceholder}
          />
        )}
        <DataTableViewOptions table={table} className="ml-auto" />
      </div>
      <DataTableContent table={table} />
      <DataTablePagination table={table} />
    </div>
  )
}

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

function DataTableContent<TData extends RowData>({
  table,
  className,
}: {
  table: DataTableInstance<TData>
  className?: string
}) {
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
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
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
          <TableRow>
            <TableCell
              colSpan={table.getVisibleLeafColumns().length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  className,
}: {
  column: Column<DataTableFeatures, TData, TValue>
  title: string
  className?: string
}) {
  if (!column.getCanSort()) {
    return <div className={className}>{title}</div>
  }

  const sorted = column.getIsSorted()

  return (
    <Button
      variant="ghost"
      className={className}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {title}
      {sorted === "asc" ? (
        <ArrowUp data-icon="inline-end" />
      ) : sorted === "desc" ? (
        <ArrowDown data-icon="inline-end" />
      ) : (
        <ArrowUpDown data-icon="inline-end" />
      )}
    </Button>
  )
}

function DataTablePagination<TData extends RowData>({
  table,
  className,
}: {
  table: DataTableInstance<TData>
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-2 py-4", className)}>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  )
}

function DataTableViewOptions<TData extends RowData>({
  table,
  className,
}: {
  table: DataTableInstance<TData>
  className?: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className}>
          Columns
          <ChevronDown data-icon="inline-end" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
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
  DataTableViewOptions,
  features as dataTableFeatures,
  useDataTable,
  type DataTableFeatures,
  type DataTableInstance,
}
