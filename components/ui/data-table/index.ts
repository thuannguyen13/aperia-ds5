// The data table surface, published as the "aperia-ds5/data-table" subpath.
//
// TanStack Table is re-exported here and not from the root barrel because it exports
// a `Table` type that would collide with the DS5 `Table` component, the same reason
// the recharts primitives live under "aperia-ds5/chart".
export * from "@tanstack/react-table"

export {
  DataTable,
  DataTableColumnHeader,
  DataTableContent,
  DataTableFilter,
  DataTablePagination,
  DataTableViewOptions,
  dataTableFeatures,
  useDataTable,
  type DataTableFeatures,
  type DataTableInstance,
} from "./data-table"
