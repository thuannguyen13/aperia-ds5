import type { ComponentType, ReactNode } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "aperia-ds5";

/**
 * An empty state, put together from the design system's parts the same way everywhere: "No [Items]" and, when it helps,
 * one static line ("No [items] [context]."), with no permission hints; the icon of what is missing; and the action that
 * fills it, if any. `className` places it: a page's own (flex-1 surface), inside a card (none), a picker's (p-4).
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  actionClassName,
  className,
}: {
  icon?: ComponentType;
  title: ReactNode;
  description?: ReactNode;
  /** What fills it, such as Add or Clear Filters; buttons side by side with `actionClassName`. */
  action?: ReactNode;
  actionClassName?: string;
  className?: string;
}) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        {Icon && (
          <EmptyMedia variant="icon">
            <Icon />
          </EmptyMedia>
        )}
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {action && (
        <EmptyContent className={actionClassName}>{action}</EmptyContent>
      )}
    </Empty>
  );
}
