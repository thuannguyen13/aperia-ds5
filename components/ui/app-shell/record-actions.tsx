"use client"

import * as React from "react"
import { EllipsisIcon, PencilIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip/tooltip"
import { useTapOpen } from "@/components/ui/tooltip/use-tap-open"
import { renderIcon, type IconProp } from "@/lib/icon"

/** The one reason a Delete is refused, on every disabled Delete. */
export const IN_USE_DELETE = "This item is in use and cannot be deleted."

// A record page shows three actions as buttons at most; with more, the first two stay and the rest fold into a menu.
const MAX_BUTTONS = 3
const KEPT_BUTTONS = 2

/** One of a record page's actions, besides Edit and Delete. */
export type RecordAction = {
  label: string
  /** `icon={ArchiveIcon}` or, from a server component, `icon={<ArchiveIcon />}`. */
  icon: IconProp
  onSelect: () => void
  /** Ends or removes the record's work: set apart in red, beside Delete. */
  destructive?: boolean
  disabled?: boolean
  /** Why the viewer cannot take it: it shows, and says why on hover. */
  blocked?: string
}

/**
 * A record page's actions, the same on every record page, for `PageHeader`'s `menu`: Edit first, then the record's
 * other actions, then, set apart in red, what ends its work and Delete. Three actions or fewer are header buttons. With
 * four or more, the first two stay buttons and the rest, Delete included, go into a More actions menu (…). It is the
 * same at every width. Without `onDelete` there is no Delete. With `deleteBlocked`, Delete
 * shows disabled and says why on hover (`IN_USE_DELETE`, or the reason given), so a refused delete is never offered.
 */
export function RecordActions({
  onEdit,
  onDelete,
  deleteBlocked,
  actions = [],
}: {
  onEdit?: () => void
  onDelete?: () => void
  deleteBlocked?: boolean | string | null
  /** A false entry is left out. */
  actions?: (RecordAction | false | undefined | null)[]
}) {
  const shown = actions.filter((action): action is RecordAction =>
    Boolean(action)
  )
  const all: RecordAction[] = [
    ...(onEdit ? [{ label: "Edit", icon: PencilIcon, onSelect: onEdit }] : []),
    ...shown.filter((action) => !action.destructive),
    ...shown.filter((action) => action.destructive),
    ...(onDelete
      ? [
          {
            label: "Delete",
            icon: Trash2Icon,
            onSelect: onDelete,
            destructive: true,
            blocked:
              typeof deleteBlocked === "string"
                ? deleteBlocked
                : deleteBlocked
                  ? IN_USE_DELETE
                  : undefined,
          },
        ]
      : []),
  ]
  if (all.length === 0) return null
  // Three fit as buttons; past three, two stay and the rest share one menu. Below 1024px every action folds into the
  // menu, so the record's title keeps the width of its line.
  const buttons = all.length <= MAX_BUTTONS ? all : all.slice(0, KEPT_BUTTONS)
  const folded = all.slice(buttons.length)
  return (
    <>
      <div className="hidden gap-2 lg:flex">
        {buttons.map((action) => (
          <ActionButton key={action.label} action={action} />
        ))}
        {folded.length > 0 && <MoreActions actions={folded} />}
      </div>
      <div className="flex lg:hidden">
        <MoreActions actions={all} />
      </div>
    </>
  )
}

/** One More actions (…) button whose menu holds `actions`, the red ones set apart from those before them. */
function MoreActions({ actions }: { actions: RecordAction[] }) {
  const apart = actions.findIndex((action) => action.destructive)
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="More actions"
            >
              <EllipsisIcon />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>More actions</TooltipContent>
      </Tooltip>
      {/* The menu is sized to its trigger, 128px at least, which wrapped a longer item. */}
      <DropdownMenuContent align="end" className="w-auto">
        {actions.map((action, at) => (
          <React.Fragment key={action.label}>
            {at > 0 && at === apart && <DropdownMenuSeparator />}
            {action.blocked ? (
              <BlockedMenuItem reason={action.blocked}>
                {renderIcon(action.icon)}
                {action.label}
              </BlockedMenuItem>
            ) : (
              <DropdownMenuItem
                variant={action.destructive ? "destructive" : undefined}
                disabled={action.disabled}
                className="whitespace-nowrap"
                onSelect={action.onSelect}
              >
                {renderIcon(action.icon)}
                {action.label}
              </DropdownMenuItem>
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * An action as a header button. Blocked, it stays focusable through aria-disabled, so the tooltip saying why opens, on
 * hover, focus or a tap.
 */
function ActionButton({ action }: { action: RecordAction }) {
  const tap = useTapOpen()
  const button = (
    <Button
      type="button"
      variant={action.destructive ? "destructive" : "outline"}
      disabled={action.disabled}
      aria-disabled={action.blocked ? true : undefined}
      className="whitespace-nowrap aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      onClick={
        action.blocked ? (event) => event.preventDefault() : action.onSelect
      }
    >
      {renderIcon(action.icon, { "data-icon": "inline-start" })}
      {action.label}
    </Button>
  )
  if (!action.blocked) return button
  return (
    <Tooltip {...tap.root}>
      <TooltipTrigger asChild {...tap.trigger}>
        {button}
      </TooltipTrigger>
      <TooltipContent>{action.blocked}</TooltipContent>
    </Tooltip>
  )
}

/**
 * A menu item the viewer cannot take, with why in a tooltip that opens on hover, as the keyboard lands on it, and on a
 * tap on a touch screen. It stays focusable, marked aria-disabled, and refuses its own select, so the menu stays open.
 */
export function BlockedMenuItem({
  reason,
  children,
}: {
  reason: string
  children: React.ReactNode
}) {
  const tap = useTapOpen()
  return (
    <Tooltip {...tap.root}>
      <TooltipTrigger asChild {...tap.trigger}>
        <DropdownMenuItem
          aria-disabled
          className="cursor-not-allowed text-muted-foreground focus:bg-muted/50 not-data-[variant=destructive]:focus:**:text-muted-foreground"
          onSelect={(event) => event.preventDefault()}
        >
          {children}
        </DropdownMenuItem>
      </TooltipTrigger>
      <TooltipContent side="left">{reason}</TooltipContent>
    </Tooltip>
  )
}
