import { useLayoutEffect, useRef, useState, type ReactNode } from "react"
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

const DESKTOP = { width: 1280, height: 800 }
const PHONE = { width: 390, height: 844 }

/** One window of a device pair: the story at the device's width, scaled to fit beside the other. */
function DeviceFrame({
  src,
  label,
  device,
  scale,
}: {
  src: string
  label: string
  device: { width: number; height: number }
  scale: number
}) {
  return (
    <figure className="flex min-w-0 flex-col gap-2">
      <div
        className="overflow-hidden rounded-xl ring-[0.5px] ring-border"
        style={{ width: device.width * scale, height: device.height * scale }}
      >
        <iframe
          src={src}
          title={label}
          loading="lazy"
          className="origin-top-left border-0"
          style={{
            width: device.width,
            height: device.height,
            transform: `scale(${scale})`,
          }}
        />
      </div>
      <figcaption className="text-xs text-muted-foreground">
        {label} · {device.width}px
      </figcaption>
    </figure>
  )
}

/**
 * A screen on a desktop and on a phone, side by side at one scale. Each frame is the story `id` in its own window, so
 * the components lay out by that window's width, as they do in an app. (A narrow frame inside the docs page would keep
 * the desktop layout, since the components respond to the window, not the frame.)
 */
export function Devices({ id, caption }: { id: string; caption?: ReactNode }) {
  const row = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    const element = row.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width)
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  // 16px between the frames. Both share one scale, so the phone keeps its size against the desktop.
  const scale = width ? (width - 16) / (DESKTOP.width + PHONE.width) : 0
  const src = `iframe.html?id=${id}&viewMode=story`
  return (
    <Unstyled>
      <div className="my-4">
        <div ref={row} className="flex items-start gap-4">
          {scale > 0 && (
            <>
              <DeviceFrame
                src={src}
                label="Desktop"
                device={DESKTOP}
                scale={scale}
              />
              <DeviceFrame
                src={src}
                label="Phone"
                device={PHONE}
                scale={scale}
              />
            </>
          )}
        </div>
        {caption && (
          <p className="mt-2 text-sm text-muted-foreground">{caption}</p>
        )}
      </div>
    </Unstyled>
  )
}
