import type { ReactNode } from "react"
import { Markdown } from "@storybook/addon-docs/blocks"

// The skill's markdown is the source: these pages render it as it is and never copy its text.
// Its links point at sibling files; here they open the matching page, or the file on GitHub.

const REPO =
  "https://github.com/thuannguyen13/aperia-ds5/blob/main/plugins/aperia-ds5/skills/design/"

// File name to Storybook docs id (from the page's Meta title).
const PAGES: Record<string, string> = {
  "SKILL.md": "design-language-overview",
  "foundations.md": "design-language-foundations",
  "patterns.md": "design-language-patterns",
  "copy.md": "design-language-copy",
  "brand-slots.md": "design-language-brand-slots",
  "drifts.md": "design-language-drifts",
  "buttons.md": "design-language-best-practices-buttons",
  "button.md": "design-language-components-button",
  "card.md": "design-language-components-card",
  "dialog.md": "design-language-components-dialog",
  "empty-state.md": "design-language-components-empty-state",
  "table.md": "design-language-components-table",
}

function SkillLink({
  href = "",
  children,
  ...props
}: React.ComponentProps<"a">) {
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
  const page = PAGES[href.split("/").pop() ?? ""]
  if (page) {
    // Docs render in the preview iframe; the page lives in the manager around it.
    return (
      <a href={`./?path=/docs/${page}--docs`} target="_top" {...props}>
        {children}
      </a>
    )
  }
  const path = href.replace(/^(\.\.\/)+/, "")
  return (
    <a href={REPO + path} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  )
}

const OPTIONS = { overrides: { a: SkillLink } }

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
  const body = source.replace(/^---\n[\s\S]*?\n---\n/, "")
  const sections = body.split(/\n(?=###? )/)
  return (
    <>
      {sections.map((section, i) => {
        const heading =
          i === 0 ? "@intro" : section.match(/^###? (.+)/)?.[1]?.trim()
        return (
          // Tailwind's preflight drops list numbers; the skill's numbered lists keep theirs.
          <div key={i} className="[&_ol]:list-decimal">
            <Markdown options={OPTIONS}>{section}</Markdown>
            {heading && after[heading]}
          </div>
        )
      })}
    </>
  )
}
