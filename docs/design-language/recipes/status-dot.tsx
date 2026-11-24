import { cn } from "@/lib/utils"

/**
 * A condition inside a line of text or a dense cell: a small dot in the state's deep color, then the word in body text.
 * `dot` is the app's class for the pair's deep color, such as `bg-status-red-foreground`. The dot is hidden from screen
 * readers, because the word says the state.
 */
export function StatusDot({
  dot,
  children,
}: {
  dot: string
  children: React.ReactNode
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden className={cn("size-1.5 rounded-full", dot)} />
      {children}
    </span>
  )
}
