"use client"

import { Button } from "../button/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip"
import { useTapOpen } from "../tooltip/use-tap-open"
import { cn } from "@/lib/utils"

/**
 * A button that is only an icon. The label is its tooltip, so a sighted user can read
 * the action, and its accessible name unless an aria-label names the record too. Disabled
 * with a reason, the tooltip says why instead, and a tap on a touch screen shows it too.
 */
export function IconButton({
  label,
  reason,
  variant = "ghost",
  size = "icon-sm",
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button> & {
  label: string
  /** Why the button is disabled, shown in place of the label while it is. */
  reason?: string | null
}) {
  const why = props.disabled ? reason : null
  const tap = useTapOpen()
  return (
    <Tooltip {...tap.root}>
      <TooltipTrigger asChild {...(why ? tap.trigger : {})}>
        {/*
          Disabled with a reason, the button stays focusable and hoverable through aria-disabled, so
          keyboard and pointer users both reach the tooltip, which Radix sets as its description. The
          element never changes, so focus holds when disabled flips. The DS only styles native
          disabled, so the look is repeated here for the ghost variant every reason caller uses.
        */}
        <Button
          variant={variant}
          size={size}
          aria-label={label}
          // A plain button unless a caller says otherwise, so one inside a form never submits it by being clicked.
          type="button"
          {...props}
          disabled={props.disabled && !why}
          aria-disabled={why ? true : undefined}
          className={cn(
            "aria-disabled:opacity-50 aria-disabled:hover:bg-transparent aria-disabled:active:translate-y-0 dark:aria-disabled:hover:bg-transparent",
            className
          )}
          onClick={why ? (event) => event.preventDefault() : onClick}
        />
      </TooltipTrigger>
      <TooltipContent>{why || label}</TooltipContent>
    </Tooltip>
  )
}
