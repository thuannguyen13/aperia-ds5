import * as React from "react"
import type { ReactNode } from "react"
import { Markdown } from "@storybook/addon-docs/blocks"
import { cn } from "aperia-ds5/utils"
import { Unstyled } from "@storybook/addon-docs/blocks"
import { TooltipProvider } from "aperia-ds5"
import { DoDont } from "./blocks"
import { LiveColor } from "./live-color"

// The skill's markdown is the source: these pages render it as it is and never copy its text.
// Its links point at sibling files; here they open the matching page, or the file on GitHub.

const REPO =
  "https://github.com/thuannguyen13/aperia-ds5/blob/main/plugins/aperia-ds5/skills/design/"

// Every skill page, so a link can open its Storybook page without a hand-kept list. A page's Storybook id is its folder
// and its "# Title" (each page's Meta title is "Design Language/<Folder>/<Title>").
const ROOT = "../../plugins/aperia-ds5/skills/design/"
const FILES = import.meta.glob(
  "../../plugins/aperia-ds5/skills/design/**/*.md",
  {
    query: "?raw",
    import: "default",
    eager: true,
  }
) as Record<string, string>
const GROUPS: Record<string, string> = {
  foundations: "foundations",
  patterns: "patterns",
  components: "components",
  examples: "examples",
}
const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

/** The Storybook docs id of a skill file (a path from the skill's root), or undefined when it has no page. */
function pageOf(path: string) {
  if (path === "SKILL.md" || path === "overview.md")
    return "design-language-overview"
  const [folder, file] = path.split("/")
  const title = file && FILES[ROOT + path]?.match(/^# (.+)$/m)?.[1]
  return GROUPS[folder] && title
    ? `design-language-${GROUPS[folder]}-${slug(title)}`
    : undefined
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
      "mt-2 mb-3 text-[2.25rem] leading-[1.15] font-semibold tracking-tight text-foreground",
      className
    )}
    {...props}
  />
)
const H2 = ({ className, ...props }: El<"h2">) => (
  <h2
    className={cx(
      "mt-14 mb-3 scroll-mt-6 text-[1.5rem] leading-tight font-semibold tracking-tight text-foreground",
      className
    )}
    {...props}
  />
)
const H3 = ({ className, ...props }: El<"h3">) => (
  <h3
    className={cx(
      "mt-8 mb-2 scroll-mt-6 text-[1.0625rem] font-semibold text-foreground",
      className
    )}
    {...props}
  />
)
const P = ({ className, ...props }: El<"p">) => (
  <p
    className={cx(
      "my-3 text-[0.9375rem] leading-7 text-foreground/80",
      className
    )}
    {...props}
  />
)
const UL = ({ className, ...props }: El<"ul">) => (
  <ul
    className={cx(
      "my-3 list-disc space-y-1.5 pl-6 marker:text-muted-foreground/60",
      className
    )}
    {...props}
  />
)
const OL = ({ className, ...props }: El<"ol">) => (
  <ol
    className={cx(
      "my-3 list-decimal space-y-1.5 pl-6 marker:text-muted-foreground",
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
          "-ml-6 flex list-none gap-3 rounded-lg px-3.5 py-2.5 text-[0.9375rem] leading-6",
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
            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white",
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
        "pl-1 text-[0.9375rem] leading-7 text-foreground/80",
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
      "rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground [pre_&]:bg-transparent [pre_&]:p-0 [td_&]:whitespace-nowrap",
      className
    )}
    {...props}
  />
)
const Pre = ({ className, ...props }: El<"pre">) => (
  <pre
    className={cx(
      "my-4 overflow-x-auto rounded-xl bg-muted/50 p-4 text-[0.8125rem] leading-6 ring-[0.5px] ring-border",
      className
    )}
    {...props}
  />
)
function TableFrame({ className, ...props }: El<"table">) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl ring-[0.5px] ring-border">
      <table
        className={cx("w-full border-collapse text-left text-sm", className)}
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
              "flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white",
              good ? "bg-[#16a34a]" : "bg-destructive"
            )}
          >
            {good ? "✓" : "✕"}
          </span>
          {good ? "Do" : "Don't"}
        </span>
        <span className="text-[0.9375rem] leading-6 text-foreground/85">
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

/**
 * Renders a skill file, with a live example after any `##` or `###` section named in `after` (by its heading text, or
 * "@intro" for the text under the page title).
 */
export function SkillDoc({
  source,
  after = {},
}: {
  source: string
  after?: Record<string, ReactNode>
}) {
  const here =
    Object.keys(FILES)
      .find((key) => FILES[key] === source)
      ?.slice(ROOT.length) ?? "SKILL.md"
  const body = source.replace(/^---\n[\s\S]*?\n---\n/, "")
  const sections = body.split(/\n(?=###? )/)
  return (
    <Here.Provider value={here}>
      <div className="sb-unstyled mx-auto max-w-[50rem] pb-24 font-sans text-foreground antialiased">
        {sections.map((section, i) => {
          const heading =
            i === 0 ? "@intro" : section.match(/^###? (.+)/)?.[1]?.trim()
          const example = heading ? after[heading] : undefined
          // A rule (###) with both a Do and a Don't renders them as one card each, with the live pair inside.
          const split = section.startsWith("### ")
            ? splitVerdicts(section)
            : undefined
          const verdicts = split && split.do && split.dont ? split : undefined
          const paired =
            verdicts && React.isValidElement(example) && example.type === DoDont
          return (
            // The text under the title is the page's lead: larger and quieter, as a docs page opens.
            <div
              key={i}
              className={cx(
                i === 0 &&
                  "[&_p]:text-[1.0625rem] [&_p]:leading-8 [&_p]:text-muted-foreground"
              )}
            >
              <Markdown options={OPTIONS}>
                {verdicts ? verdicts.rest : section}
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
                <div className="skip-toc my-6">{example}</div>
              )}
            </div>
          )
        })}
      </div>
    </Here.Provider>
  )
}
