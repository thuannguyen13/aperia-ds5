// Recipes: patterns an app composes from plain aperia-ds5 components, following the design skill's pages. They are not
// part of the package. These copies render the docs' live examples; the skill page that owns each one shows its recipe.
export { TitledCard } from "./titled-card"
export { StatTile } from "./stat-tile"
export { FormSection } from "./form-section"
export { LengthCount } from "./length-count"
export { EmptyValue, NoneText, HiddenValue } from "./empty-value"
export { MoneyValue } from "./money-value"
export { Fact, DetailRow, DetailSection } from "./detail-section"
export { ScrollTable } from "./scroll-table"
export { TableGroupRow } from "./table-group-row"
export { PeopleStack, type StackPerson } from "./people-stack"
export {
  Timeline,
  TimelineEntry,
  TimelineSaid,
  TimelineWhen,
} from "./timeline-entry"
export { RecordActivity } from "./record-activity"
export { ListSkeleton } from "./list-skeleton"
export { FlagSwitch } from "./flag-switch"
export { SelectionBar } from "./selection-bar"
export { StatusDot } from "./status-dot"
// An icon-only button with its tooltip: private to the library (ListToolbar and SortControl use it), a recipe for apps.
export { IconButton } from "@/components/ui/icon-button/icon-button"
