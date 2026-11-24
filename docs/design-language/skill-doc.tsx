import * as React from "react"
import type { ReactNode } from "react"
import { Markdown } from "@storybook/addon-docs/blocks"
import { cn } from "aperia-ds5/utils"
import { Unstyled } from "@storybook/addon-docs/blocks"
import { Badge, Tabs, TabsList, TabsTrigger, TooltipProvider } from "aperia-ds5"
import { DoDont } from "./blocks"
import { Anatomy } from "./anatomy"
import { COMPONENTS, componentTitle, skillTitle, storyId } from "./site"
import { LiveColor } from "./live-color"
import { componentsOf, pagesUsing, type Home } from "./uses"

// The skill's markdown is the source: these pages render it as it is and never copy its text.
// Its links point at sibling files; here they open the matching page, or the file on GitHub.

const REPO =
  "https://github.com/thuannguyen13/aperia-ds5/blob/main/plugins/aperia-ds5/skills/design/"

// Every skill page, so a link can open its Storybook page without a hand-kept list. A page's Storybook title comes from
// the site map (site.ts) and its "# Title".
const ROOT = "../../plugins/aperia-ds5/skills/design/"
export const FILES = import.meta.glob(
  "../../plugins/aperia-ds5/skills/design/**/*.md",
  {
    query: "?raw",
    import: "default",
    eager: true,
  }
) as Record<string, string>

/** A skill file's text, by its path from the skill's root. */
export const fileText = (path: string) => FILES[ROOT + path]
/** A skill file's "# Title". */
export const titleOf = (path: string) =>
  fileText(path)
    ?.match(/^# (.+)$/m)?.[1]
    ?.trim()
/** A skill file's lead: the first paragraph under its title, as one line. */
export const leadOf = (path: string) =>
  fileText(path)
    ?.replace(/^---\n[\s\S]*?\n---\n/, "")
    .split(/\n\s*\n/)
    .find((block) => block.trim() && !block.startsWith("#"))
    ?.replace(/\s*\n\s*/g, " ")
    .trim()

/** The Storybook docs id of a skill file (a path from the skill's root), or undefined when it has no page. */
export function pageOf(path: string) {
  if (path === "SKILL.md") path = "overview.md"
  for (const group of COMPONENTS.groups ?? [])
    for (const page of group.pages)
      if (page.guide === path)
        return storyId(componentTitle(group.title, page.name))
  const title = titleOf(path)
  const full = title && skillTitle(path, title)
  return full ? storyId(full) : undefined
}

/** The skill path a link points at, resolved from the page it sits on (`from`, a path from the skill's root). */
function resolve(href: string, from: string) {
  const parts = from.split("/").slice(0, -1)
  for (const part of href.split("#")[0].split("/")) {
    if (part === "..") parts.pop()
    else if (part !== ".") parts.push(part)
  }
  return parts.join("/")
}

const Here = React.createContext("SKILL.md")

function SkillLink({
  href = "",
  children,
  ...props
}: React.ComponentProps<"a">) {
  const from = React.useContext(Here)
  if (/^[a-z]+:/.test(href) || href.startsWith("#")) {
    return (
      <a
        href={href}
        target={href.startsWith("#") ? undefined : "_blank"}
        rel="noreferrer"
        {...props}
      >
        {children}
      </a>
    )
  }
  const target = resolve(href, from)
  const page = pageOf(target)
  if (page) {
    // Docs render in the preview iframe; the page lives in the manager around it.
    return (
      <a href={`./?path=/docs/${page}--docs`} target="_top" {...props}>
        {children}
      </a>
    )
  }
  return (
    <a href={REPO + target} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  )
}

// The page's look, in the spirit of Mintlify and Notion docs: a narrow reading column, generous space, quiet headings,
// minimal tables, and Do / Don't as callouts. The wrapper is `sb-unstyled`, so Storybook's own docs styles stay out and
// these classes (built on the library's tokens) are the only ones that apply.
// Tailwind-aware, so a class passed in (a Dark cell's fill) wins over the element's own.
const cx = cn

type El<T extends keyof React.JSX.IntrinsicElements> = React.ComponentProps<T>

const H1 = ({ className, ...props }: El<"h1">) => (
  <h1
    className={cx(
      "mt-2 mb-3 text-4xl leading-[1.15] font-semibold tracking-tight text-foreground",
      className
    )}
    {...props}
  />
)
const H2 = ({ className, ...props }: El<"h2">) => (
  <h2
    className={cx(
      "mt-14 mb-3 scroll-mt-6 text-2xl leading-tight font-semibold tracking-tight text-foreground",
      className
    )}
    {...props}
  />
)
const H3 = ({ className, ...props }: El<"h3">) => (
  <h3
    className={cx(
      "mt-8 mb-2 scroll-mt-6 text-lg font-semibold tracking-[-0.014em] text-foreground",
      className
    )}
    {...props}
  />
)
const P = ({ className, ...props }: El<"p">) => (
  <p
    className={cx(
      "my-4 text-base leading-6.5 tracking-[-0.011em] text-foreground/80",
      className
    )}
    {...props}
  />
)
const UL = ({ className, ...props }: El<"ul">) => (
  <ul
    className={cx(
      "my-4 list-disc space-y-2 pl-6 marker:text-muted-foreground/60 [&_li>p]:my-0 [p+&]:-mt-2",
      className
    )}
    {...props}
  />
)
const OL = ({ className, ...props }: El<"ol">) => (
  <ol
    className={cx(
      "my-4 list-decimal space-y-2 pl-6 marker:text-muted-foreground [&_li>p]:my-0 [p+&]:-mt-2",
      className
    )}
    {...props}
  />
)
const Strong = (props: El<"strong">) => (
  <strong className="font-semibold text-foreground" {...props} />
)

/** "Do:" or "Don't:" when a list item starts with that bold label, so it renders as a callout. */
function verdictOf(children: ReactNode) {
  const first = React.Children.toArray(children)[0]
  if (
    !React.isValidElement<{ children?: ReactNode }>(first) ||
    first.type !== Strong
  )
    return null
  const label = String(first.props.children ?? "").trim()
  return label === "Do:" ? "do" : label === "Don't:" ? "dont" : null
}

function LI({ className, children, ...props }: El<"li">) {
  const verdict = verdictOf(children)
  if (verdict) {
    const rest = React.Children.toArray(children).slice(1)
    return (
      <li
        className={cx(
          "-ml-6 flex list-none gap-3 rounded-lg px-3.5 py-2.5 text-base leading-6.5 tracking-[-0.011em]",
          verdict === "do"
            ? "bg-[color-mix(in_oklab,#16a34a_7%,transparent)]"
            : "bg-[color-mix(in_oklab,var(--destructive)_7%,transparent)]",
          className
        )}
        {...props}
      >
        <span
          aria-hidden
          className={cx(
            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
            verdict === "do" ? "bg-[#16a34a]" : "bg-destructive"
          )}
        >
          {verdict === "do" ? "✓" : "✕"}
        </span>
        <span className="text-foreground/85">
          <span className="font-semibold text-foreground">
            {verdict === "do" ? "Do" : "Don't"}
          </span>
          {rest}
        </span>
      </li>
    )
  }
  return (
    <li
      className={cx(
        "pl-1.5 text-base leading-6.5 tracking-[-0.011em] text-foreground/80",
        className
      )}
      {...props}
    >
      {children}
    </li>
  )
}

const Code = ({ className, ...props }: El<"code">) => (
  <code
    className={cx(
      "rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm tracking-normal text-foreground [pre_&]:bg-transparent [pre_&]:p-0 [td_&]:whitespace-nowrap",
      className
    )}
    {...props}
  />
)
const Pre = ({ className, ...props }: El<"pre">) => (
  <pre
    className={cx(
      "my-4 overflow-x-auto rounded-xl bg-muted/50 p-4 text-sm leading-6 ring-[0.5px] ring-border",
      className
    )}
    {...props}
  />
)
function TableFrame({ className, ...props }: El<"table">) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl ring-[0.5px] ring-border">
      <table
        className={cx(
          "w-full border-collapse text-left text-sm tracking-[-0.006em]",
          className
        )}
        {...props}
      />
    </div>
  )
}

/** The plain text of rendered Markdown, to read a table's headings and tokens. */
function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textOf).join("")
  if (React.isValidElement<{ children?: ReactNode }>(node))
    return textOf(node.props.children)
  return ""
}

const rowsOf = (section: ReactNode) =>
  React.Children.toArray(
    React.isValidElement<{ children?: ReactNode }>(section)
      ? section.props.children
      : null
  ).filter(React.isValidElement) as React.ReactElement<{
    children?: ReactNode
  }>[]
const cellsOf = (row: React.ReactElement<{ children?: ReactNode }>) =>
  React.Children.toArray(row.props.children).filter(
    React.isValidElement
  ) as React.ReactElement<{ children?: ReactNode }>[]

/** The tokens a Token cell names: `--card`, or a run such as `--chart-1` … `--chart-6`. */
function tokensIn(cell: ReactNode) {
  const named = textOf(cell).match(/--[a-z0-9-]+/g) ?? []
  const run = named.length === 2 && named[0].match(/^(.*-)(\d+)$/)
  const end = run && named[1].match(/-(\d+)$/)
  if (run && end && named[1].startsWith(run[1])) {
    return Array.from(
      { length: Number(end[1]) - Number(run[2]) + 1 },
      (_, i) => `${run[1]}${Number(run[2]) + i}`
    )
  }
  return named
}

/**
 * A table. One with Tokens, In Light and In Dark columns (Foundations › Color) shows each color live: the In Light
 * cells a swatch and the value the browser reads, the In Dark column the same rendered in Dark. The page's words for
 * each value stay in the Markdown for agents; the swatch says it here. The docs never copy a value from `base.css`.
 */
function Table({ children, ...props }: El<"table">) {
  const [head, body] = React.Children.toArray(children)
  const headRow = rowsOf(head)[0]
  const headings = headRow
    ? cellsOf(headRow).map((cell) => textOf(cell).trim())
    : []
  const tokens = headings.indexOf("Tokens")
  const light = headings.indexOf("In Light")
  const dark = headings.indexOf("In Dark")
  if (tokens < 0 || light < 0 || dark < 0)
    return <TableFrame {...props}>{children}</TableFrame>
  const darkCell = "dark bg-background text-muted-foreground"
  return (
    <TableFrame {...props}>
      <thead>
        <tr>
          {cellsOf(headRow).map((cell, c) => (
            <TH key={c} className={cx(c === dark && darkCell)}>
              {cell.props.children}
            </TH>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowsOf(body).map((row, r) => {
          const cells = cellsOf(row)
          const named = tokensIn(cells[tokens]?.props.children)
          return (
            <tr key={r}>
              {cells.map((cell, c) => {
                if (c === tokens)
                  return (
                    <TD key={c} className="min-w-40">
                      <span className="flex flex-col items-start gap-1">
                        {cell.props.children}
                      </span>
                    </TD>
                  )
                if (c !== light && c !== dark)
                  return (
                    <TD key={c} className="min-w-48">
                      {cell.props.children}
                    </TD>
                  )
                // "Not used: …" has no color to show in that mode.
                const unused = /^not used/i.test(
                  textOf(cell.props.children).trim()
                )
                return (
                  <TD
                    key={c}
                    className={cx("min-w-36", c === dark && darkCell)}
                  >
                    {unused ? (
                      <span className="text-muted-foreground">Not used</span>
                    ) : (
                      <LiveColor tokens={named} />
                    )}
                  </TD>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </TableFrame>
  )
}

const TH = ({ className, ...props }: El<"th">) => (
  <th
    className={cx(
      "border-b border-border bg-muted/40 px-4 py-2.5 align-bottom text-xs font-medium text-muted-foreground",
      className
    )}
    {...props}
  />
)
const TD = ({ className, ...props }: El<"td">) => (
  <td
    className={cx(
      "border-b border-border px-4 py-2.5 align-top leading-6 text-foreground/85 [tr:last-child_&]:border-b-0",
      className
    )}
    {...props}
  />
)
const Blockquote = ({ className, ...props }: El<"blockquote">) => (
  <blockquote
    className={cx(
      "my-4 rounded-xl bg-muted/50 px-4 py-1 text-foreground/80 [&_p]:my-2",
      className
    )}
    {...props}
  />
)
const HR = () => <hr className="my-10 border-border" />

function Link(props: El<"a">) {
  return (
    <SkillLink
      {...props}
      className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
    />
  )
}

const OPTIONS = {
  overrides: {
    a: Link,
    h1: H1,
    h2: H2,
    h3: H3,
    p: P,
    ul: UL,
    ol: OL,
    li: LI,
    strong: Strong,
    code: Code,
    pre: Pre,
    table: Table,
    th: TH,
    td: TD,
    blockquote: Blockquote,
    hr: HR,
  },
}

/**
 * A rule's "- **Do:** …" and "- **Don't:** …" lines, taken out of its Markdown so they can sit in one card each with
 * their live preview. Continuation lines (indented) belong to the line above.
 */
function splitVerdicts(section: string) {
  const rest: string[] = []
  const verdicts: Record<"do" | "dont", string> = { do: "", dont: "" }
  let current: "do" | "dont" | null = null
  for (const line of section.split("\n")) {
    const match = line.match(/^- \*\*(Do|Don't):\*\*\s*(.*)$/)
    if (match) {
      current = match[1] === "Do" ? "do" : "dont"
      verdicts[current] = match[2]
    } else if (current && /^\s+\S/.test(line)) {
      verdicts[current] += " " + line.trim()
    } else {
      current = null
      rest.push(line)
    }
  }
  return { rest: rest.join("\n"), ...verdicts }
}

/** The rule's text as a sentence on its own: its first letter capitalized ("the primary color…" → "The primary color…"). */
const sentence = (text: string) =>
  text.replace(
    /^([^A-Za-z]*)([a-z])/,
    (_, lead: string, letter: string) => lead + letter.toUpperCase()
  )

/** One verdict: the live preview on top (when the rule has one), then Do or Don't and the rule's sentence. */
function VerdictCard({
  verdict,
  text,
  preview,
  frame,
}: {
  verdict: "do" | "dont"
  text: string
  preview?: ReactNode
  frame?: string
}) {
  const good = verdict === "do"
  return (
    <figure className="flex flex-col overflow-hidden rounded-xl ring-[0.5px] ring-border">
      {preview !== undefined && (
        <Unstyled>
          <TooltipProvider>
            <div
              className={cx(
                "flex min-h-40 flex-wrap items-center justify-center gap-3 bg-background p-6 text-sm text-foreground",
                frame
              )}
            >
              {preview}
            </div>
          </TooltipProvider>
        </Unstyled>
      )}
      <figcaption
        className={cx(
          // flex-1: the caption fills the card, so two cards side by side end level.
          "flex flex-1 flex-col gap-1.5 border-t-2 px-4 py-3",
          preview === undefined && "border-t-0",
          good
            ? "border-[#16a34a] bg-[color-mix(in_oklab,#16a34a_7%,transparent)]"
            : "border-destructive bg-[color-mix(in_oklab,var(--destructive)_7%,transparent)]"
        )}
      >
        {/* The verdict is a label on its own line, so the rule under it reads as a plain sentence. */}
        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <span
            aria-hidden
            className={cx(
              "flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
              good ? "bg-[#16a34a]" : "bg-destructive"
            )}
          >
            {good ? "✓" : "✕"}
          </span>
          {good ? "Do" : "Don't"}
        </span>
        <span className="text-base leading-6.5 tracking-[-0.011em] text-foreground/85">
          <Markdown options={{ ...OPTIONS, forceInline: true }}>
            {sentence(text)}
          </Markdown>
        </span>
      </figcaption>
    </figure>
  )
}

/**
 * A rule's Do and Don't, each with its half of the live pair: side by side, or stacked with the Do on top when the
 * pair is too wide for half the page (`stack` on its DoDont) and on a narrow window.
 */
function Verdicts({
  doText,
  dontText,
  example,
}: {
  doText: string
  dontText: string
  example?: ReactNode
}) {
  const pair =
    React.isValidElement<React.ComponentProps<typeof DoDont>>(example) &&
    example.type === DoDont
      ? example.props
      : undefined
  return (
    <div
      data-verdicts
      className={cx("my-5 grid gap-4", !pair?.stack && "sm:grid-cols-2")}
    >
      <VerdictCard
        verdict="do"
        text={doText}
        preview={pair?.good}
        frame={pair?.className}
      />
      <VerdictCard
        verdict="dont"
        text={dontText}
        preview={pair?.bad}
        frame={pair?.className}
      />
    </div>
  )
}

/** A row of links to pages, as outline badges. The page in view is named without a link. */
function PageLinks({ pages, here }: { pages: Home[]; here?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {pages.map((page) =>
        page.id === here ? (
          <Badge key={page.id} variant="outline">
            {page.name}
          </Badge>
        ) : (
          <Badge key={page.id} variant="outline" asChild>
            {/* Docs render in the preview iframe; the page opens in the manager around it. */}
            <a href={`./?path=/docs/${page.id}--docs`} target="_top">
              {page.name}
            </a>
          </Badge>
        )
      )}
    </div>
  )
}

/**
 * The links between components and the pages that use them, generated from the source (uses.ts) so they never go
 * stale: a component's home lists the pages that use it, by section, and a skill page lists the components it uses.
 */
function Related({ component, file }: { component?: string; file: string }) {
  const here = component ? undefined : pageOf(file)
  const groups = component
    ? pagesUsing(component)
    : [{ section: "", pages: componentsOf(file) }].filter(
        (group) => group.pages.length > 0
      )
  if (!groups.length) return null
  return (
    <section>
      <H2>{component ? "Used in" : "Components"}</H2>
      <P>
        {component
          ? "Each page below uses this component."
          : "This page uses each component below."}
      </P>
      <div className="flex flex-col gap-4">
        {groups.map((group) => (
          <div key={group.section} className="flex flex-col gap-2">
            {group.section && (
              <span className="text-sm font-medium text-muted-foreground">
                {group.section}
              </span>
            )}
            <PageLinks pages={group.pages} here={here} />
          </div>
        ))}
      </div>
    </section>
  )
}

type Tab = "overview" | "guidelines" | "code"
const TAB_LABEL: Record<Tab, string> = {
  overview: "Overview",
  guidelines: "Guidelines",
  code: "Code",
}
// Which tab each section of a page goes in, by its heading. Every other section is a guideline.
const TAB_OF: Record<string, Tab> = {
  "When to use": "overview",
  "What is available": "overview",
  Anatomy: "overview",
  "In code": "code",
}

/**
 * An Anatomy section's numbered list ("1. Container", "3. Icon (optional)"), taken out of its Markdown so the drawing
 * shows it as its legend, numbered like its markers. Continuation lines (indented) belong to the item above.
 */
function splitParts(section: string) {
  const rest: string[] = []
  const parts: string[] = []
  let inList = false
  for (const line of section.split("\n")) {
    const item = line.match(/^\d+\.\s+(.*)$/)
    if (item) {
      parts.push(item[1])
      inList = true
    } else if (inList && /^\s+\S/.test(line)) {
      parts[parts.length - 1] += " " + line.trim()
    } else {
      inList = false
      rest.push(line)
    }
  }
  return { rest: rest.join("\n"), parts }
}

/** An Anatomy drawing with its legend filled from the section's list. */
function withLegend(example: ReactNode, parts: string[]) {
  if (
    !React.isValidElement<React.ComponentProps<typeof Anatomy>>(example) ||
    example.type !== Anatomy
  )
    return example
  return React.cloneElement(example, {
    legend: parts.map((part, at) => (
      <Markdown key={at} options={{ ...OPTIONS, forceInline: true }}>
        {part}
      </Markdown>
    )),
    // Names alone fit two columns; a part with a sentence takes the whole line.
    legendColumns: parts.every((part) => part.length <= 32) ? 2 : 1,
  })
}

/** Sections of a page (split at each `##` and `###`), each with the live example `after` names for its heading. */
function Sections({
  text,
  after,
  intro = false,
}: {
  text: string
  after: Record<string, ReactNode>
  intro?: boolean
}) {
  const sections = text.split(/\n(?=###? )/)
  return sections.map((section, i) => {
    const heading =
      intro && i === 0 ? "@intro" : section.match(/^###? (.+)/)?.[1]?.trim()
    const example = heading ? after[heading] : undefined
    // A rule (###) with both a Do and a Don't renders them as one card each, with the live pair inside.
    const split = section.startsWith("### ")
      ? splitVerdicts(section)
      : undefined
    const verdicts = split && split.do && split.dont ? split : undefined
    const paired =
      verdicts && React.isValidElement(example) && example.type === DoDont
    // An Anatomy drawing shows the section's numbered list as its legend, so the list is not shown twice.
    const anatomy =
      React.isValidElement(example) && example.type === Anatomy
        ? splitParts(section)
        : undefined
    const shown = anatomy ? withLegend(example, anatomy.parts) : example
    return (
      // The text under the title is the page's lead: larger and quieter, as a docs page opens.
      <div
        key={i}
        className={cx(
          intro &&
            i === 0 &&
            "[&_p]:text-lg [&_p]:leading-7 [&_p]:tracking-[-0.014em] [&_p]:text-muted-foreground"
        )}
      >
        <Markdown options={OPTIONS}>
          {verdicts ? verdicts.rest : anatomy ? anatomy.rest : section}
        </Markdown>
        {verdicts && (
          <div className="skip-toc">
            <Verdicts
              doText={verdicts.do}
              dontText={verdicts.dont}
              example={paired ? example : undefined}
            />
          </div>
        )}
        {example && !paired && (
          // skip-toc: a heading inside an example (a mock card's title) isn't a section of the page.
          <div className="skip-toc my-6">{shown}</div>
        )}
      </div>
    )
  })
}

/**
 * "On this page": the headings of the tab in view, read from the page once it renders, so it follows the tab and
 * includes the stories a component's Code tab shows. The heading under the top of the window is highlighted.
 */
function OnThisPage({ panel }: { panel: React.RefObject<HTMLElement | null> }) {
  const [headings, setHeadings] = React.useState<HTMLElement[]>([])
  const [active, setActive] = React.useState(0)
  React.useEffect(() => {
    const root = panel.current
    if (!root) return
    const read = () =>
      setHeadings(
        [...root.querySelectorAll<HTMLElement>("h2, h3")].filter(
          (h) => !h.closest(".skip-toc, .docs-story") && h.textContent?.trim()
        )
      )
    read()
    const observer = new MutationObserver(read)
    observer.observe(root, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [panel])
  React.useEffect(() => {
    const onScroll = () => {
      let current = 0
      headings.forEach((h, i) => {
        if (h.getBoundingClientRect().top < 120) current = i
      })
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [headings])
  if (headings.length < 2) return null
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 text-xs font-medium text-muted-foreground">
        On this page
      </p>
      <ul className="flex flex-col gap-0.5 border-l border-border">
        {headings.map((h, i) => (
          <li key={i}>
            <a
              href={h.id ? `#${h.id}` : undefined}
              onClick={(event) => {
                event.preventDefault()
                h.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className={cx(
                "-ml-px block border-l py-1 leading-5 transition-colors",
                h.tagName === "H3" ? "pl-6" : "pl-3",
                i === active
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {h.textContent?.trim()}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * Renders a skill file as a page: its title and lead, then its sections in three tabs. Overview holds When to use, What
 * is available and Anatomy (a live drawing whose legend is the section's numbered list), Guidelines holds how it looks
 * and behaves and its rules, and Code holds In code plus `code` (a component's live stories and props). A page without the standard
 * sections (the Overview, a getting-started page) shows as one page. A live example follows any `##` or `###` section
 * named in `after`, by its heading text, or "@intro" for the text under the title. The Overview ends with the
 * generated links: the components the page uses, or, for a component's home (`component`, its folder under
 * components/ui), the pages that use it.
 */
export function SkillDoc({
  source,
  after = {},
  code,
  component,
}: {
  source: string
  after?: Record<string, ReactNode>
  code?: ReactNode
  component?: string
}) {
  const here =
    Object.keys(FILES)
      .find((key) => FILES[key] === source)
      ?.slice(ROOT.length) ?? "SKILL.md"
  const body = source.replace(/^---\n[\s\S]*?\n---\n/, "")
  const [intro, ...parts] = body.split(/\n(?=## )/)
  const tabbed = parts.some((part) => part.startsWith("## When to use"))
  const panels: Record<Tab, string[]> = {
    overview: [],
    guidelines: [],
    code: [],
  }
  // A screen (an Examples page) has no What is available: its Overview shows the screen itself, How it looks and
  // behaves, so the tab is not one sentence long.
  const screen = !parts.some((part) => part.startsWith("## What is available"))
  for (const part of parts) {
    const heading = part.match(/^## (.+)/)?.[1]?.trim() ?? ""
    const overview = screen && heading === "How it looks and behaves"
    panels[
      tabbed
        ? overview
          ? "overview"
          : (TAB_OF[heading] ?? "guidelines")
        : "guidelines"
    ].push(part)
  }
  const tabs = (Object.keys(TAB_LABEL) as Tab[]).filter(
    (tab) => panels[tab].length > 0 || (tab === "code" && code)
  )
  const [tab, setTab] = React.useState<Tab>(tabs[0] ?? "guidelines")
  const panel = React.useRef<HTMLDivElement>(null)
  return (
    <Here.Provider value={here}>
      <div className="dl-page sb-unstyled mx-auto grid max-w-[66rem] gap-12 pb-24 font-sans text-foreground antialiased lg:grid-cols-[minmax(0,1fr)_12rem]">
        <article className="min-w-0">
          <Sections text={intro} after={after} intro />
          {tabbed && tabs.length > 1 && (
            <Tabs
              value={tab}
              onValueChange={(value) => setTab(value as Tab)}
              className="skip-toc mt-6 border-b border-border"
            >
              <TabsList variant="line" className="-mb-px h-10">
                {tabs.map((each) => (
                  <TabsTrigger key={each} value={each} className="px-3">
                    {TAB_LABEL[each]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
          <div ref={panel} role={tabbed ? "tabpanel" : undefined}>
            <Sections
              key={tab}
              text={(tabbed ? panels[tab] : parts).join("\n")}
              after={after}
            />
            {(tab === "overview" || !tabbed) && (
              <Related component={component} file={here} />
            )}
            {(tab === "code" || !tabbed) && code}
          </div>
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-8">
            <OnThisPage panel={panel} />
          </div>
        </aside>
      </div>
    </Here.Provider>
  )
}

/** The docs' one table style, so a live spec table in an example draws exactly as a Markdown table does. */
export { TableFrame as DocTable, TH as DocTH, TD as DocTD }
