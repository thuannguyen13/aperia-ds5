import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "aperia-ds5";
import { cn } from "aperia-ds5/utils";

/**
 * A card headed by its title, with an optional figure beside it and an action at the right, all on one 2rem
 * row so every card's first line lines up, and an optional description under it. `className` sets the bottom: pb-0 for a table that runs to the
 * card's edge, pb-3 for padded content.
 */
export function TitledCard({
  id,
  title,
  figure,
  description,
  action,
  className,
  children,
}: {
  /** An anchor, so a link elsewhere can open the page at this card. */
  id?: string;
  title: React.ReactNode;
  figure?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card id={id} className={cn("gap-2.5 pt-3.25", className)}>
      {/* A wrapping row rather than the design system's grid: where the title and the action do not fit side by side,
          on a phone, the action drops under the title instead of squeezing it or running past the card's edge. */}
      <CardHeader className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        {/* The figure sits beside the title. */}
        <div className="flex min-h-8 flex-wrap content-center items-baseline gap-x-3">
          <CardTitle role="heading" aria-level={2}>
            {title}
          </CardTitle>
          {figure !== undefined && (
            <p className="text-sm text-muted-foreground tabular-nums">
              {figure}
            </p>
          )}
        </div>
        {description !== undefined && (
          <CardDescription className="order-last basis-full">
            {description}
          </CardDescription>
        )}
        {/* Centred on the row: a 32px button fills it, and a shorter legend would otherwise sit above the title's line.
            ml-auto keeps it on the right when it drops under the title. */}
        {action !== undefined && (
          <CardAction className="ml-auto self-center">{action}</CardAction>
        )}
      </CardHeader>
      {children}
    </Card>
  );
}
