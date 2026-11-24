import * as React from "react"
import type { ReactNode } from "react"
import { Unstyled } from "@storybook/addon-docs/blocks"
import { TooltipProvider } from "aperia-ds5"
import { cn } from "@/lib/utils"

// An anatomy drawing: a live example with a numbered marker beside each of its parts, and the numbered list of the
// parts under it. The example is real library components. A part carries `data-anatomy="2"`; a part inside a
// component that cannot take the attribute is named by a selector in `targets`. The markers are measured from the
// parts after layout and drawn over the example, outside each part's box, so they never cover its text. The list is
// the accessible content; the markers are aria-hidden.

export type AnatomySide = "top" | "right" | "bottom" | "left"
export type AnatomyAlign = "start" | "center" | "end"
/** A part found by a selector, inside the example: a string, or with the side its marker prefers. */
export type AnatomyTarget =
  | string
  | {
      selector: string
      side?: AnatomySide | AnatomySide[]
      align?: AnatomyAlign
    }

type Box = { left: number; top: number; right: number; bottom: number }
type Mark = { n: number; x: number; y: number; ax: number; ay: number }

/** The marker's diameter (size-5) and the space between the part's outer edge and the marker. */
const SIZE = 20
const GAP = 12
const SIDES: AnatomySide[] = ["top", "bottom", "left", "right"]

const overlaps = (a: Box, b: Box, room = 0) =>
  a.left < b.right + room &&
  b.left < a.right + room &&
  a.top < b.bottom + room &&
  b.top < a.bottom + room

const along = (start: number, end: number, align: AnatomyAlign) => {
  const inset = Math.min(SIZE / 2 + 4, (end - start) / 2)
  return align === "start"
    ? start + inset
    : align === "end"
      ? end - inset
      : (start + end) / 2
}

/** Whether an element shows: hidden by CSS, it has no box. A control rendered twice (phone and wide) shows once. */
function shows(el: Element) {
  const box = el.getBoundingClientRect()
  if (box.width === 0 && box.height === 0) return false
  return (
    el.ownerDocument.defaultView?.getComputedStyle(el).visibility !== "hidden"
  )
}

/** One numbered circle: a marker on the drawing, and the number in the list. */
function Marker({
  n,
  className,
  style,
}: {
  n: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <span
      aria-hidden
      style={style}
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] leading-none font-semibold text-background tabular-nums ring-2 ring-background",
        className
      )}
    >
      {n}
    </span>
  )
}

/** Places each part's marker beyond the outermost part that holds it, on the first side where it covers nothing. */
function place(
  parts: {
    n: number
    el: Element
    box: Box
    sides: AnatomySide[]
    align: AnatomyAlign
  }[],
  frame: Box
): Mark[] {
  const marks: Mark[] = []
  const taken: Box[] = []
  for (const part of parts) {
    const holders = parts.filter(
      (other) => other !== part && other.el.contains(part.el)
    )
    // The outermost part that holds this one: its marker sits beyond that, so it covers neither.
    const bound = holders.reduce(
      (outer, other) => ({
        left: Math.min(outer.left, other.box.left),
        top: Math.min(outer.top, other.box.top),
        right: Math.max(outer.right, other.box.right),
        bottom: Math.max(outer.bottom, other.box.bottom),
      }),
      part.box
    )
    const others = parts
      .filter((other) => other !== part && !holders.includes(other))
      .filter((other) => !part.el.contains(other.el))
      .map((other) => other.box)
    const r = SIZE / 2
    const at = (side: AnatomySide): Mark => {
      const { box } = part
      switch (side) {
        case "top": {
          const ax = along(box.left, box.right, part.align)
          return { n: part.n, ax, ay: box.top, x: ax, y: bound.top - GAP - r }
        }
        case "bottom": {
          const ax = along(box.left, box.right, part.align)
          return {
            n: part.n,
            ax,
            ay: box.bottom,
            x: ax,
            y: bound.bottom + GAP + r,
          }
        }
        case "left": {
          const ay = along(box.top, box.bottom, part.align)
          return { n: part.n, ax: box.left, ay, x: bound.left - GAP - r, y: ay }
        }
        case "right": {
          const ay = along(box.top, box.bottom, part.align)
          return {
            n: part.n,
            ax: box.right,
            ay,
            x: bound.right + GAP + r,
            y: ay,
          }
        }
      }
    }
    const circle = (mark: Mark): Box => ({
      left: mark.x - r,
      top: mark.y - r,
      right: mark.x + r,
      bottom: mark.y + r,
    })
    const fits = (mark: Mark) => {
      const c = circle(mark)
      return (
        c.left >= frame.left + 2 &&
        c.top >= frame.top + 2 &&
        c.right <= frame.right - 2 &&
        c.bottom <= frame.bottom - 2 &&
        !taken.some((box) => overlaps(box, c, 3)) &&
        !others.some((box) => overlaps(box, c, 2))
      )
    }
    const order = [
      ...part.sides,
      ...SIDES.filter((s) => !part.sides.includes(s)),
    ]
    let mark = order.map(at).find(fits)
    if (!mark) {
      // Nowhere is clear: keep the preferred side and slide along it until it is clear of the other markers.
      const first = at(order[0])
      const vertical = order[0] === "left" || order[0] === "right"
      mark = first
      for (let step = 1; step < 12; step++) {
        const shift = Math.ceil(step / 2) * (SIZE + 4) * (step % 2 ? 1 : -1)
        const moved = vertical
          ? { ...first, y: first.y + shift }
          : { ...first, x: first.x + shift }
        if (!taken.some((box) => overlaps(box, circle(moved), 3))) {
          mark = moved
          break
        }
      }
    }
    marks.push(mark)
    taken.push(circle(mark))
  }
  return marks
}

/** The address of a story alone, as Storybook serves it beside the docs. */
function storySrc(id: string) {
  return `iframe.html?id=${id}&viewMode=story`
}

/**
 * An anatomy drawing. Pass the live example as `children`, with `data-anatomy="n"` on its parts (and, optionally,
 * `data-anatomy-side="bottom left"` for where the marker goes first and `data-anatomy-align="start"` for where along
 * that edge). `targets` names a part by selector instead, for a part inside a component. Where a selector matches
 * several elements, the first one that shows is the part, so a control rendered twice (phone and wide) is marked once.
 *
 * `story` draws a story in its own frame instead, `width` × `height` and scaled to fit, for a composition that lays out
 * by the window (the app shell). `zoom` enlarges a small example. `legend` is the numbered list under the drawing: on a
 * skill page, `SkillDoc` fills it from the Anatomy section's list, so the text lives only in the Markdown.
 */
export function Anatomy({
  children,
  targets = {},
  legend,
  legendColumns = 1,
  zoom,
  story,
  width = 960,
  height = 560,
  title,
  className,
}: {
  children?: ReactNode
  targets?: Record<number, AnatomyTarget>
  legend?: ReactNode[]
  legendColumns?: 1 | 2
  zoom?: number
  story?: string
  width?: number
  height?: number
  /** The framed story's name, for a screen reader. */
  title?: string
  className?: string
}) {
  const frame = React.useRef<HTMLDivElement>(null)
  const stage = React.useRef<HTMLDivElement>(null)
  const iframe = React.useRef<HTMLIFrameElement>(null)
  const [marks, setMarks] = React.useState<Mark[]>([])
  const [scale, setScale] = React.useState(1)
  const [loaded, setLoaded] = React.useState(0)
  // Read on every measure, so the observers need not restart when a prop object is new.
  const targetsRef = React.useRef(targets)
  targetsRef.current = targets
  const count = legend?.length ?? 0

  const measure = React.useCallback(() => {
    const f = frame.current
    if (!f) return
    const origin = f.getBoundingClientRect()
    let root: ParentNode | null = stage.current
    let toLocal = (r: DOMRect): Box => ({
      left: r.left - origin.left,
      top: r.top - origin.top,
      right: r.right - origin.left,
      bottom: r.bottom - origin.top,
    })
    if (story) {
      const doc = iframe.current?.contentDocument
      if (!iframe.current || !doc?.body) return
      const outer = iframe.current.getBoundingClientRect()
      const s = outer.width / width
      root = doc.body
      toLocal = (r) => ({
        left: outer.left - origin.left + r.left * s,
        top: outer.top - origin.top + r.top * s,
        right: outer.left - origin.left + r.right * s,
        bottom: outer.top - origin.top + r.bottom * s,
      })
    }
    if (!root) return
    const listed = Object.keys(targetsRef.current).map(Number)
    const tagged = [...root.querySelectorAll("[data-anatomy]")].map((el) =>
      Number(el.getAttribute("data-anatomy"))
    )
    const last = Math.max(count, ...listed, ...tagged, 0)
    const parts = []
    for (let n = 1; n <= last; n++) {
      const target = targetsRef.current[n]
      const selector =
        typeof target === "string"
          ? target
          : (target?.selector ?? `[data-anatomy="${n}"]`)
      const el = [...root.querySelectorAll(selector)].find(shows)
      if (!el) continue
      const side =
        (typeof target === "object" && target.side) ||
        el.getAttribute("data-anatomy-side")?.split(/\s+/) ||
        []
      const align =
        (typeof target === "object" && target.align) ||
        (el.getAttribute("data-anatomy-align") as AnatomyAlign | null) ||
        "center"
      parts.push({
        n,
        el,
        box: toLocal(el.getBoundingClientRect()),
        sides: (Array.isArray(side) ? side : [side]) as AnatomySide[],
        align,
      })
    }
    const next = place(parts, {
      left: 0,
      top: 0,
      right: origin.width,
      bottom: origin.height,
    }).map((m) => ({
      n: m.n,
      x: Math.round(m.x),
      y: Math.round(m.y),
      ax: Math.round(m.ax),
      ay: Math.round(m.ay),
    }))
    setMarks((was) =>
      JSON.stringify(was) === JSON.stringify(next) ? was : next
    )
  }, [story, width, count])

  // Measure after layout, and again whenever anything could move a part: a resize, a change inside the example, a
  // transition ending, the fonts arriving, or the theme changing.
  React.useEffect(() => {
    let frameId = 0
    const schedule = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(measure)
    }
    schedule()
    const resize = new ResizeObserver(() => {
      const f = frame.current
      if (story && f) {
        const style = getComputedStyle(f)
        const room =
          f.clientWidth -
          parseFloat(style.paddingLeft) -
          parseFloat(style.paddingRight)
        setScale(Math.min(1, room / width))
      }
      schedule()
    })
    if (frame.current) resize.observe(frame.current)
    if (stage.current) resize.observe(stage.current)
    const changes = new MutationObserver(schedule)
    if (stage.current)
      changes.observe(stage.current, {
        subtree: true,
        childList: true,
        attributes: true,
        characterData: true,
      })
    // The theme: the page's class, which a framed story follows too.
    const syncTheme = () => {
      const doc = iframe.current?.contentDocument
      if (doc?.documentElement)
        doc.documentElement.classList.toggle(
          "dark",
          document.documentElement.classList.contains("dark")
        )
      schedule()
    }
    const theme = new MutationObserver(syncTheme)
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    })
    const doc = story ? iframe.current?.contentDocument : null
    if (doc?.body) {
      syncTheme()
      changes.observe(doc.body, {
        subtree: true,
        childList: true,
        attributes: true,
        characterData: true,
      })
      resize.observe(doc.documentElement)
      doc.addEventListener("transitionend", schedule, true)
      doc.fonts?.ready.then(schedule)
    }
    const host = stage.current
    host?.addEventListener("transitionend", schedule, true)
    window.addEventListener("resize", schedule)
    document.fonts?.ready.then(schedule)
    return () => {
      cancelAnimationFrame(frameId)
      resize.disconnect()
      changes.disconnect()
      theme.disconnect()
      host?.removeEventListener("transitionend", schedule, true)
      doc?.removeEventListener("transitionend", schedule, true)
      window.removeEventListener("resize", schedule)
    }
  }, [measure, story, width, loaded])

  const r = SIZE / 2
  return (
    <Unstyled>
      <TooltipProvider>
        <figure className="my-4">
          <div
            ref={frame}
            className={cn(
              "relative flex min-h-32 items-center justify-center overflow-hidden rounded-xl bg-background p-10 text-sm text-foreground ring-[0.5px] ring-border",
              className
            )}
          >
            {story ? (
              <div
                ref={stage}
                className="relative shrink-0 overflow-hidden rounded-lg ring-[0.5px] ring-border"
                style={{ width: width * scale, height: height * scale }}
              >
                <iframe
                  ref={iframe}
                  title={title ?? "Example"}
                  src={storySrc(story)}
                  onLoad={() => setLoaded((n) => n + 1)}
                  tabIndex={-1}
                  className="absolute top-0 left-0 origin-top-left border-0"
                  style={{
                    width,
                    height,
                    transform: `scale(${scale})`,
                  }}
                />
              </div>
            ) : (
              <div ref={stage} className="min-w-0" style={{ zoom }}>
                {children}
              </div>
            )}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <svg className="absolute inset-0 size-full overflow-visible">
                {marks.map((m) => {
                  const dx = m.x - m.ax
                  const dy = m.y - m.ay
                  const length = Math.hypot(dx, dy) || 1
                  return (
                    <g key={m.n} className="fill-foreground stroke-foreground">
                      <line
                        x1={m.ax}
                        y1={m.ay}
                        x2={m.x - (dx / length) * r}
                        y2={m.y - (dy / length) * r}
                        strokeWidth={1}
                      />
                      <circle cx={m.ax} cy={m.ay} r={2.5} strokeWidth={0} />
                    </g>
                  )
                })}
              </svg>
              {marks.map((m) => (
                <Marker
                  key={m.n}
                  n={m.n}
                  className="absolute"
                  style={{ left: m.x - r, top: m.y - r }}
                />
              ))}
            </div>
          </div>
          {legend && legend.length > 0 && (
            // The list is the drawing's text: its numbers are the markers'. role keeps it a list where list-none drops it.
            <ol
              role="list"
              className={cn(
                "mt-4 grid list-none gap-x-8 gap-y-2.5 p-0",
                legendColumns === 2 && "sm:grid-cols-2"
              )}
            >
              {legend.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-base leading-6.5 tracking-[-0.011em] text-foreground/85"
                >
                  <Marker n={i + 1} className="mt-[3px]" />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ol>
          )}
        </figure>
      </TooltipProvider>
    </Unstyled>
  )
}
