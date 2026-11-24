import { cn } from "@/lib/utils"

/**
 * One number on a surface: what it counts above, and what it means below where it needs saying. `children` go under the
 * number, such as a bar. `plain` drops the surface, for a tile inside a card.
 */
export function StatTile({
  label,
  value,
  hint,
  tone,
  plain = false,
  children,
}: {
  label: string
  value: React.ReactNode
  hint?: string
  tone?: "red"
  plain?: boolean
  children?: React.ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-0.5", !plain && "surface px-4 py-3")}>
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-2xl font-semibold tabular-nums",
          tone === "red" && "text-destructive"
        )}
      >
        {value}
      </span>
      {children}
      {/* Pinned to the foot, so hints line up across a row of tiles whether or not one has a bar. */}
      {hint && (
        <span className="mt-auto text-xs text-muted-foreground">{hint}</span>
      )}
    </div>
  )
}
