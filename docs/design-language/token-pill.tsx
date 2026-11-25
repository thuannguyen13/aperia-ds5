import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react"
import { createPortal } from "react-dom"
import {
  Layers2Icon,
  MinusIcon,
  RulerIcon,
  MoveHorizontalIcon,
  SplineIcon,
  SquareRoundCornerIcon,
  TimerIcon,
  TypeIcon,
  type LucideIcon,
} from "lucide-react"
import {
  SidebarProvider,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "aperia-ds5"

// A token named in the docs, drawn as a small chip in the sentence: a mark of its kind and the token's name. The value
// the browser reads shows on hover, and the chip links to the page that owns the token. Every kind of token reads the
// same way, on every tab: the name is what a designer picks and a developer types, and a shadow or a curve has no
// value short enough for a sentence. The chip is quiet on purpose (the size and fill of inline code, no border), so it
// does not break the line someone is reading. A color's mark is a live swatch, because a color has to be seen. Every
// other kind's mark is an icon. `base.css` is the one place a value lives; the docs read it from the page and never
// repeat it.
//
// Tailwind writes a theme variable to the page only when a class uses it, and a breakpoint or a container query never
// does, so `.storybook/preview.css` lists the classes that bring the named widths and breakpoints in for these pills.

type Kind =
  | "color"
  | "radius"
  | "shadow"
  | "space"
  | "size"
  | "type"
  | "duration"
  | "ease"
  | "width"

/**
 * What a token is: the CSS expression that reads it, the kind of mark and value it gets, its owner page's docs
 * id, and, for a variable a component sets on its own element rather than on the page, that component.
 */
type Token = { expr: string; kind: Kind; owner: string; scope?: "sidebar" }

const COLOR = "styles-color"
const SPACING = "foundations-layout-spacing"
const SIZES = "foundations-layout-sizes"
const SCREENS = "foundations-layout-screen-sizes"

const OWNERS: [RegExp, Kind, string][] = [
  [/^--radius/, "radius", "styles-border-and-radius"],
  [/^--default-border-width$/, "width", "styles-border-and-radius"],
  [/^--shadow-color$/, "color", "styles-elevation"],
  [/^--shadow/, "shadow", "styles-elevation"],
  [/^--spacing$/, "space", SPACING],
  [/^--(panel-in|panel-out|rail-duration)$/, "duration", "styles-motion"],
  [/^--rail-ease$/, "ease", "styles-motion"],
  [/^--(text|font|leading|tracking)/, "type", "styles-typography"],
  [/^--breakpoint-/, "size", SCREENS],
  [/^--container-page-/, "size", SCREENS],
  [/^--container-/, "size", SIZES],
  [/^--sidebar-width/, "size", SIZES],
]

/** Spacing between, inside, and around things, on the Spacing page. */
const SPACE =
  /^-?(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y|inset|inset-x|inset-y|top|right|bottom|left)-(\d+(?:\.\d+)?)$/
/** The size of a thing, on the Sizes page: a step of the spacing scale, or a named width. */
const SIZE =
  /^(h|w|size|min-h|min-w|max-h|max-w)-(?:(\d+(?:\.\d+)?)|(page-md|page-lg|popover-sm|popover-lg|3xs|2xs|xs|sm|md|lg|xl|[2-7]xl))$/
/** Widths of the page itself, which Screen Sizes owns: the page column. */
const PAGE_WIDTHS = new Set(["max-w-360"])

/** Reads a backticked name as a token, or null when it is not one: a CSS variable, or a class that draws one. */
export function tokenOf(name: string): Token | null {
  if (/^--[a-z0-9-]+$/.test(name)) {
    const owned = OWNERS.find(([pattern]) => pattern.test(name))
    return {
      expr: `var(${name})`,
      kind: owned?.[1] ?? "color",
      owner: owned?.[2] ?? COLOR,
      scope: name.startsWith("--sidebar-width") ? "sidebar" : undefined,
    }
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
  // A container query at a named width, such as `@min-page-md`.
  m = name.match(/^@(?:min|max)-(page-md|page-lg|popover-sm|popover-lg)$/)
  if (m)
    return {
      expr: `var(--container-${m[1]})`,
      kind: "size",
      owner: m[1].startsWith("page") ? SCREENS : SIZES,
    }
  m = name.match(SPACE)
  if (m)
    return {
      expr: `calc(var(--spacing) * ${m[2]})`,
      kind: "space",
      owner: SPACING,
    }
  m = name.match(SIZE)
  if (m)
    return {
      expr: m[2]
        ? `calc(var(--spacing) * ${m[2]})`
        : `var(--container-${m[3]})`,
      kind: "size",
      owner:
        PAGE_WIDTHS.has(name) || m[3]?.startsWith("page") ? SCREENS : SIZES,
    }
  m = name.match(
    /^(?:bg|text|ring|inset-ring|border|fill|stroke|outline)-([a-z-]+?[a-z0-9])(?:\/(\d+))?$/
  )
  if (m) {
    // A library color is its own variable (`--card`); a Tailwind color is only its theme variable (`--color-red-500`).
    const color = `var(--${m[1]}, var(--color-${m[1]}))`
    return {
      expr: m[2]
        ? `color-mix(in oklab, ${color} ${m[2]}%, transparent)`
        : color,
      kind: "color",
      owner: COLOR,
    }
  }
  return null
}

/** The variables an expression reads, so a name with nothing behind any of them is not a token. */
const varsOf = (expr: string) =>
  [...expr.matchAll(/var\((--[a-z0-9-]+)/g)].map((m) => m[1])

/** The style that makes a probe compute `expr`, and the computed property to read back. */
function probeOf(token: Token): {
  style: CSSProperties
  read: (s: CSSStyleDeclaration) => string
} {
  switch (token.kind) {
    case "color":
      return { style: { color: token.expr }, read: (s) => s.color }
    case "shadow":
      return { style: { boxShadow: token.expr }, read: (s) => s.boxShadow }
    case "type":
      return { style: { fontSize: token.expr }, read: (s) => s.fontSize }
    case "duration":
      return {
        style: { transitionDuration: token.expr },
        read: (s) => s.transitionDuration,
      }
    case "ease":
      return {
        style: { transitionTimingFunction: token.expr },
        read: (s) => s.transitionTimingFunction,
      }
    default:
      return { style: { width: token.expr }, read: (s) => s.width }
  }
}

/** The value the browser gives `expr`, read from a probe so a `var()` resolves in the page's current mode. */
function useValue(token: Token) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState<string | null>(null)
  const { style, read: readStyle } = useMemo(() => probeOf(token), [token])
  useLayoutEffect(() => {
    const probe = ref.current
    if (!probe) return
    const read = () => {
      // A var() with nothing behind it (a class that only looks like a token, such as `border-b`) is not a token.
      const names = varsOf(token.expr)
      const scope = getComputedStyle(probe.parentElement ?? probe)
      if (
        names.length &&
        !names.some((n) => scope.getPropertyValue(n).trim())
      ) {
        setValue(null)
        return
      }
      const raw = readStyle(getComputedStyle(probe))
      const empty =
        !raw ||
        raw === "none" ||
        raw === "auto" ||
        raw === "0px" ||
        raw === "rgba(0, 0, 0, 0)"
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
  }, [token, readStyle])
  const node = (
    <span
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute size-0 overflow-hidden opacity-0"
      style={style}
    />
  )
  return {
    // A variable a component sets on its own element is read inside a hidden copy of that element, kept out of the
    // sentence so a block element never sits inside a paragraph.
    probe:
      token.scope === "sidebar"
        ? createPortal(
            <SidebarProvider className="hidden">{node}</SidebarProvider>,
            document.body
          )
        : node,
    value,
  }
}

/** The icon of each kind of token but a color. */
const ICON: Record<Exclude<Kind, "color">, LucideIcon> = {
  radius: SquareRoundCornerIcon,
  shadow: Layers2Icon,
  space: MoveHorizontalIcon,
  size: RulerIcon,
  type: TypeIcon,
  duration: TimerIcon,
  ease: SplineIcon,
  width: MinusIcon,
}

/** The mark before the name: a live swatch for a color, and the icon of its kind for every other token. */
function Mark({ token }: { token: Token }) {
  if (token.kind === "color")
    return (
      <span
        className="size-2.5 shrink-0 rounded-full bg-card ring-[0.5px] ring-foreground/20"
        style={{ background: token.expr }}
      />
    )
  const Icon = ICON[token.kind]
  return (
    <Icon aria-hidden className="size-3 shrink-0 text-muted-foreground/80" />
  )
}

/** A token as a chip. A name that only looks like a token, such as a class with nothing behind it, stays plain code. */
export function TokenPill({
  name,
  fallback,
}: {
  name: string
  fallback: React.ReactNode
}) {
  const token = useMemo(() => tokenOf(name), [name])
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
            className="relative inline-flex items-center gap-1 rounded-md bg-muted/70 px-1 py-px align-baseline font-mono text-[0.8125rem] leading-5 tracking-normal whitespace-nowrap text-foreground no-underline transition-colors hover:bg-muted"
          >
            {probe}
            <Mark token={token} />
            {name}
          </a>
        </TooltipTrigger>
        <TooltipContent className="font-mono">{value}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
