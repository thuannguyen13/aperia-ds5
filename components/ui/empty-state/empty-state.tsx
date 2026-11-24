import type { ReactNode } from "react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../empty/empty"
import { renderIcon, type IconProp } from "@/lib/icon"

/**
 * An empty state, put together from the design system's parts the same way everywhere: "No [Items]" and, when it helps,
 * one static line ("No [items] [context]."), with no permission hints; the icon of what is missing; and the action that
 * fills it, if any. `className` places it: a page's own (flex-1 surface), inside a card (none), a picker's (p-4).
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  actionClassName,
  className,
}: {
  /** The icon of what is missing, `icon={InboxIcon}` or, from a server component, `icon={<InboxIcon />}`. */
  icon?: IconProp
  title: ReactNode
  description?: ReactNode
  /** What fills it, such as Add or Clear Filters; buttons side by side with `actionClassName`. */
  action?: ReactNode
  actionClassName?: string
  className?: string
}) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        {icon && <EmptyMedia variant="icon">{renderIcon(icon)}</EmptyMedia>}
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {action && (
        <EmptyContent className={actionClassName}>{action}</EmptyContent>
      )}
    </Empty>
  )
}
