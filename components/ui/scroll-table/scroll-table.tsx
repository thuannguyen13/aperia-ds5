import { cn } from "@/lib/utils"

/**
 * A table that can be wider than its box, wrapped in the region that scrolls it sideways. The table holds nothing to
 * Tab to, so the region takes focus and a name; the table container's own scroll would be out of the keyboard's reach.
 * `className` styles the region, as `surface` does for a table on the page itself.
 */
export function ScrollTable({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cn(
        "overflow-x-auto outline-none focus-visible:ring-2 focus-visible:ring-ring *:data-[slot=table-container]:overflow-visible",
        className
      )}
    >
      {children}
    </div>
  )
}
