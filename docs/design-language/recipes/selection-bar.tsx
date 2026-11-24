import { Button } from "@/components/ui/button/button"

/**
 * The selection bar: shown in the list toolbar's place while rows are selected. The count and Clear Selection sit at the
 * left, the actions on the selected rows (`children`) at the right. `min-h-8` keeps the toolbar's height, so the table
 * under it does not move when the bar swaps in.
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
      className="flex min-h-8 flex-wrap items-center gap-2"
    >
      <span className="text-sm font-medium tabular-nums">{count} selected</span>
      <Button variant="ghost" onClick={onClear}>
        Clear Selection
      </Button>
      <div className="ml-auto flex flex-wrap gap-2">{children}</div>
    </div>
  )
}
