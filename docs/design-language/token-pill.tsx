import { useLayoutEffect, useRef, useState, type CSSProperties } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "aperia-ds5"
import { cn } from "@/lib/utils"

// A token named in the docs, drawn as a pill: a live thumbnail of the value, the token's name, the value the browser
// reads on hover, and a link to the page that owns it. `base.css` is the one place a value lives; the docs point at
// it and never repeat it.

type Kind = "color" | "radius" | "shadow" | "space" | "type" | "other"

/** What a token is: the CSS expression that reads it, the kind of thumbnail it gets, and its owner page's docs id. */
type Token = { expr: string; kind: Kind; owner: string }

const COLOR = "styles-color"
const OWNERS: [RegExp, Kind, string][] = [
  [/^--radius/, "radius", "styles-border-and-radius"],
  [/^--default-border-width$/, "other", "styles-border-and-radius"],
  [/^--shadow/, "shadow", "styles-elevation"],
  [/^--spacing$/, "space", "foundations-layout-spacing"],
  [/^--(panel|rail)-/, "other", "styles-motion"],
  [/^--(text|font|leading|tracking)/, "type", "styles-typography"],
]

const SPACE =
  /^-?(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y|h|w|size|min-h|min-w|max-h|max-w)-(\d+(?:\.\d+)?)$/

/** Reads a backticked name as a token, or null when it is not one: a CSS variable, or a class that draws one. */
export function tokenOf(name: string): Token | null {
  if (/^--[a-z0-9-]+$/.test(name)) {
    const owned = OWNERS.find(([pattern]) => pattern.test(name))
    return owned
      ? { expr: `var(${name})`, kind: owned[1], owner: owned[2] }
      : { expr: `var(${name})`, kind: "color", owner: COLOR }
  }
  let m = name.match(/^rounded-(sm|md|lg|xl|2xl|full)$/)
  if (m)
    return {
      expr: m[1] === "full" ? "9999px" : `var(--radius-${m[1]})`,
      kind: "radius",
      owner: "styles-border-and-radius",
    }
  m = name.match(/^shadow-(sm|md|lg|xl)$/)
  if (m)
    return {
      expr: `var(--shadow-${m[1]})`,
      kind: "shadow",
      owner: "styles-elevation",
    }
  m = name.match(/^text-(xs|sm|base|lg|xl|[2-9]xl)$/)
  if (m)
    return {
      expr: `var(--text-${m[1]})`,
      kind: "type",
      owner: "styles-typography",
    }
  m = name.match(SPACE)
  if (m)
    return {
      expr: `calc(var(--spacing) * ${m[2]})`,
      kind: "space",
      owner: "foundations-layout-spacing",
    }
  m = name.match(
    /^(?:bg|text|ring|inset-ring|border|fill|stroke|outline)-([a-z-]+?)(?:\/\d+)?$/
  )
  if (m) return { expr: `var(--color-${m[1]})`, kind: "color", owner: COLOR }
  return null
}

/** The value the browser gives `expr`, read from a probe so a `var()` resolves in the page's current mode. */
function useValue(token: Token) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState<string | null>(null)
  useLayoutEffect(() => {
    const probe = ref.current
    if (!probe) return
    const read = () => {
      // A var() with nothing behind it (a class that only looks like a token, such as `border-b`) is not a token.
      const named = token.expr.match(/var\((--[a-z0-9-]+)\)/)?.[1]
      if (
        named &&
        !getComputedStyle(document.documentElement)
          .getPropertyValue(named)
          .trim()
      ) {
        setValue(null)
        return
      }
      const style = getComputedStyle(probe)
      const raw =
        token.kind === "color"
          ? style.color
          : token.kind === "shadow"
            ? style.boxShadow
            : token.kind === "type"
              ? style.fontSize
              : style.width
      const empty =
        !raw || raw === "none" || raw === "0px" || raw === "rgba(0, 0, 0, 0)"
      setValue(empty ? null : raw)
    }
    read()
    // Read again when the theme flips, so the value shown is the one on screen.
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [token])
  const style: CSSProperties =
    token.kind === "color"
      ? { color: token.expr }
      : token.kind === "shadow"
        ? { boxShadow: token.expr }
        : token.kind === "type"
          ? { fontSize: token.expr }
          : { width: token.expr }
  return {
    probe: (
      <span
        ref={ref}
        aria-hidden
        className="pointer-events-none absolute size-0 overflow-hidden opacity-0"
        style={style}
      />
    ),
    value,
  }
}

/** The thumbnail: a swatch, a corner, a raised square, a bar, or "Aa", each drawn from the token itself. */
function Thumb({ token }: { token: Token }) {
  const box = "size-3.5 shrink-0 bg-card ring-[0.5px] ring-border"
  switch (token.kind) {
    case "color":
      return (
        <span
          className={cn(box, "rounded-full")}
          style={{ background: token.expr }}
        />
      )
    case "radius":
      return (
        <span
          className="size-3.5 shrink-0 border-t-[1.5px] border-l-[1.5px] border-foreground/70"
          style={{ borderTopLeftRadius: token.expr }}
        />
      )
    case "shadow":
      return (
        <span
          className={cn(box, "rounded-[3px]")}
          style={{ boxShadow: token.expr }}
        />
      )
    case "space":
      return (
        <span
          className="h-2 max-w-6 shrink-0 rounded-[2px] bg-primary/50"
          style={{ width: token.expr }}
        />
      )
    case "type":
      return (
        <span className="shrink-0 font-sans leading-none font-medium">Aa</span>
      )
    default:
      return null
  }
}

/** A token as a pill. A name that only looks like a token, such as a class with nothing behind it, stays plain code. */
export function TokenPill({
  name,
  fallback,
}: {
  name: string
  fallback: React.ReactNode
}) {
  const token = tokenOf(name)
  if (!token) return <>{fallback}</>
  return <Pill name={name} token={token} fallback={fallback} />
}

function Pill({
  name,
  token,
  fallback,
}: {
  name: string
  token: Token
  fallback: React.ReactNode
}) {
  const { probe, value } = useValue(token)
  if (value === null)
    return (
      <span className="relative">
        {probe}
        {fallback}
      </span>
    )
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={`./?path=/docs/${token.owner}--docs`}
            target="_top"
            className="relative inline-flex translate-y-[-1px] items-center gap-1.5 rounded-full bg-muted py-0.5 pr-2 pl-1 align-middle font-mono text-[0.8125rem] leading-5 text-foreground no-underline ring-[0.5px] ring-border transition-colors hover:bg-muted/70"
          >
            {probe}
            <Thumb token={token} />
            {name}
          </a>
        </TooltipTrigger>
        <TooltipContent className="font-mono">{value}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
