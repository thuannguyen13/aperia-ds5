import type { ReactNode } from "react"
import { Unstyled } from "@storybook/addon-docs/blocks"
import { TooltipProvider } from "aperia-ds5"
import { cn } from "@/lib/utils"

// The Examples pages' frames: a screen built by the rules, and a Before / After pair that shows what the rules change.
// Unstyled keeps the docs page's own typography off the components; each frame mounts the TooltipProvider an app
// mounts at its root, as inline examples skip the story decorators.

/** A live screen: the page's light gray behind real components, laid out as a page (not centered like a swatch). */
export function Screen({
  children,
  caption,
  controls,
  className,
}: {
  children: ReactNode
  caption?: ReactNode
  /** Docs controls above the frame, such as which state to show; not part of the screen. */
  controls?: ReactNode
  className?: string
}) {
  return (
    <Unstyled>
      <TooltipProvider>
        <figure className="my-4">
          {controls && (
            <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {controls}
            </div>
          )}
          <div
            className={cn(
              "@container flex flex-col gap-5 rounded-xl bg-background p-4 text-sm text-foreground ring-[0.5px] ring-border sm:p-6",
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

function Label({ after, children }: { after: boolean; children?: ReactNode }) {
  return (
    <figcaption className="mt-2 text-sm">
      <span
        className={cn(
          "text-xs font-semibold tracking-wide uppercase",
          after ? "text-green-700 dark:text-green-400" : "text-destructive"
        )}
      >
        {after ? "After" : "Before"}
      </span>
      {children && <span className="text-muted-foreground"> · {children}</span>}
    </figcaption>
  )
}

/** The same small piece of screen built without the rules and with them, side by side (stacked on a narrow window). */
export function BeforeAfter({
  before,
  after,
  beforeNote,
  afterNote,
  className,
}: {
  before: ReactNode
  after: ReactNode
  beforeNote?: ReactNode
  afterNote?: ReactNode
  className?: string
}) {
  const frame = cn(
    "@container flex min-h-40 flex-col items-stretch justify-center gap-3 rounded-xl bg-background p-4 text-sm text-foreground ring-[0.5px] ring-border",
    className
  )
  return (
    <Unstyled>
      <TooltipProvider>
        <div className="my-4 grid gap-4 sm:grid-cols-2">
          <figure className="min-w-0">
            <div className={frame}>{before}</div>
            <Label after={false}>{beforeNote}</Label>
          </figure>
          <figure className="min-w-0">
            <div className={frame}>{after}</div>
            <Label after>{afterNote}</Label>
          </figure>
        </div>
      </TooltipProvider>
    </Unstyled>
  )
}
