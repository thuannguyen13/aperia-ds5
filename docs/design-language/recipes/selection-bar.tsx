import { Button } from "@/components/ui/button/button"

/**
 * The selection bar: passed to `ListToolbar` as `actions` while rows are selected, in the place of the list's own
 * actions, so the search, the filters and Sort stay beside it. The count and Clear Selection come first, then the actions
 * on the selected rows (`children`). It is one element, so on a phone it takes the toolbar's first row and its actions
 * wrap under the count.
 */
export function SelectionBar({
  count,
  label,
  onClear,
  children,
}: {
  count: number
  /** The toolbar's name for a screen reader, such as "Selected merchants". */
  label: string
  onClear: () => void
  children: React.ReactNode
}) {
  return (
    <div
      role="toolbar"
      aria-label={label}
      className="flex flex-wrap items-center gap-2"
    >
      <span className="text-sm font-medium tabular-nums">{count} selected</span>
      <Button variant="ghost" onClick={onClear}>
        Clear Selection
      </Button>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}
