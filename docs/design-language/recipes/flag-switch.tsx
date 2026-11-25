"use client"

import { useId } from "react"
import { LockIcon } from "lucide-react"

import { ReasonTooltip } from "@/components/ui/reason-tooltip/reason-tooltip"
import { Switch } from "@/components/ui/switch/switch"
import { cn } from "@/lib/utils"

/**
 * An on/off choice in a grid, such as a role's permission or a notification's channel: a small switch with its Yes or
 * No beside it, one target lit on hover. With a `reason` it can't change: locked, with a lock, and the reason in a
 * tooltip that shows on hover, when the keyboard lands on it, and on a tap.
 * The switch is on in the primary color, the same in every app.
 */
export function FlagSwitch({
  on,
  label,
  disabled = false,
  reason,
  onChange,
}: {
  on: boolean
  /** What the switch sets, read out by a screen reader: "Sales Rep: Prospects, Delete". */
  label: string
  disabled?: boolean
  /** Why it can't change; locks it. */
  reason?: string | null
  onChange: (on: boolean) => void
}) {
  const id = useId()
  const locked = disabled || Boolean(reason)
  // The switch and its word are one target, lit on hover as a picker in the same grid is.
  const control = (
    <label
      htmlFor={id}
      className={cn(
        "flex h-7 w-fit items-center gap-1.5 rounded-md px-1.5 text-sm",
        locked
          ? "opacity-50"
          : "cursor-pointer hover:bg-muted/50 in-[tr]:hover:bg-foreground/6"
      )}
    >
      <Switch
        id={id}
        size="sm"
        checked={on}
        aria-label={reason ? `${label}. ${reason}` : label}
        disabled={locked}
        onCheckedChange={onChange}
        // The label fades the whole target, so the switch doesn't fade twice.
        className="data-disabled:opacity-100"
      />
      <span className={cn(!on && "text-muted-foreground")}>
        {on ? "Yes" : "No"}
      </span>
      {reason && (
        <LockIcon className="size-3.5 text-muted-foreground" aria-hidden />
      )}
    </label>
  )
  // Pulled out by its own padding, so the switch lines up with its column's name and only the hover reaches past it.
  // ReasonTooltip shows the reason on hover, when the keyboard lands on it, and on a tap; with no reason it renders the
  // switch as it is.
  return (
    <span className="-mx-1.5 flex h-8 w-fit items-center">
      <ReasonTooltip reason={reason}>{control}</ReasonTooltip>
    </span>
  )
}
