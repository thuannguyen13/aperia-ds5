import { money } from "@/lib/format"
import { cn } from "@/lib/utils"
import { EmptyValue } from "../empty-value/empty-value"

/**
 * An amount as every Aperia app shows it (UI Style Guide V4.3): "$1,840,000", never shortened, in tabular figures, with
 * cents only when it has them ("$12.50"); a negative amount in parentheses and red, "($125.50)"; no amount at all, a
 * muted em dash. `cents` forces two decimals (`true`) or whole dollars (`false`).
 */
export function MoneyValue({
  value,
  cents = "auto",
  className,
}: {
  value: number | null | undefined
  cents?: boolean | "auto"
  className?: string
}) {
  if (value === null || value === undefined) return <EmptyValue />
  return (
    <span
      className={cn("tabular-nums", value < 0 && "text-destructive", className)}
    >
      {money(value, { cents })}
    </span>
  )
}
