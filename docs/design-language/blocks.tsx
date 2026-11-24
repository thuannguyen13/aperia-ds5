import type { ReactNode } from "react"
import { Unstyled } from "@storybook/addon-docs/blocks"
import { TooltipProvider } from "aperia-ds5"
import { cn } from "@/lib/utils"

// Live examples on the Design Language pages, framed like the DS4 documentation: a light frame around the real
// components, and Do / Don't pairs side by side. Unstyled keeps the docs page's own typography off the components.
// Inline examples skip the story decorators, so each frame mounts the TooltipProvider an app mounts at its root.

export function Example({
  children,
  className,
  caption,
}: {
  children: ReactNode
  className?: string
  caption?: ReactNode
}) {
  return (
    <Unstyled>
      <TooltipProvider>
        <figure className="my-4">
          <div
            className={cn(
              "flex min-h-32 flex-wrap items-center justify-center gap-3 rounded-xl bg-background p-8 text-sm text-foreground ring-[0.5px] ring-border",
              className
            )}
          >
            {children}
          </div>
          {caption && (
            <figcaption className="mt-2 text-sm text-muted-foreground">
              {caption}
            </figcaption>
          )}
        </figure>
      </TooltipProvider>
    </Unstyled>
  )
}

function Verdict({ good, children }: { good: boolean; children?: ReactNode }) {
  return (
    <figcaption className="mt-2 text-sm">
      <span
        className={cn(
          "text-xs font-semibold tracking-wide uppercase",
          good ? "text-green-700 dark:text-green-400" : "text-destructive"
        )}
      >
        {good ? "Do" : "Don't"}
      </span>
      {children && <span className="text-muted-foreground"> · {children}</span>}
    </figcaption>
  )
}

/**
 * A Do and a Don't, side by side (stacked on a narrow window). `stack` puts the Do above the Don't at every width, for
 * a pair too wide for half the page (a table, a page header with a toolbar).
 */
export function DoDont({
  good,
  bad,
  goodNote,
  badNote,
  className,
  stack,
}: {
  good: ReactNode
  bad: ReactNode
  goodNote?: ReactNode
  badNote?: ReactNode
  className?: string
  stack?: boolean
}) {
  const frame = cn(
    "flex min-h-40 flex-wrap items-center justify-center gap-3 rounded-xl bg-background p-6 text-sm text-foreground ring-[0.5px] ring-border",
    className
  )
  return (
    <Unstyled>
      <TooltipProvider>
        <div className={cn("my-4 grid gap-4", !stack && "sm:grid-cols-2")}>
          <figure>
            <div className={frame}>{good}</div>
            <Verdict good>{goodNote}</Verdict>
          </figure>
          <figure>
            <div className={frame}>{bad}</div>
            <Verdict good={false}>{badNote}</Verdict>
          </figure>
        </div>
      </TooltipProvider>
    </Unstyled>
  )
}
