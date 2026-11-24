import type { ReactNode } from "react"
import {
  ArgTypes,
  Canvas,
  Controls,
  Description,
  Primary,
  Stories,
  useOf,
} from "@storybook/addon-docs/blocks"
import { COMPONENTS, componentTitle } from "./site"
import { SkillDoc, fileText } from "./skill-doc"

// A component's one home, one page per component: its guidance (when it has a skill page) in the
// Overview and Guidelines tabs, and its live stories and props in the Code tab. A component with a skill page gets an
// .mdx attached to its stories (`<Meta of>`), which replaces the generated page; every other component gets
// `ComponentPage`, set as the docs page in .storybook/preview.tsx.

// Headings inside Storybook's blocks, sized to the page's own.
const BLOCK_HEADINGS =
  "mt-8 [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:tracking-[-0.014em]"

/** The live part of a component's home: its description, first story with its controls, then every story. */
export function ComponentCode() {
  return (
    <div className={BLOCK_HEADINGS}>
      <Description />
      <Primary />
      <Controls />
      <Stories title="Examples" includePrimary={false} />
    </div>
  )
}

/** The site map's entry for a sidebar title. */
function entryOf(title: string) {
  for (const group of COMPONENTS.groups ?? [])
    for (const page of group.pages)
      if (componentTitle(group.title, page.name) === title) return page
  return undefined
}
/** The site map's entry whose guidance is a skill page. */
const entryOfGuide = (guide: string) =>
  COMPONENTS.groups
    ?.flatMap((group) => group.pages)
    .find((page) => page.guide === guide)

/** A guided component's home, for its attached .mdx: the skill page in tabs, with the stories in Code. */
export function ComponentHome({
  guide,
  after,
}: {
  guide: string
  after?: Record<string, ReactNode>
}) {
  return (
    <SkillDoc
      source={fileText(guide)}
      after={after}
      code={<ComponentCode />}
      component={entryOfGuide(guide)?.dir}
    />
  )
}

/** The generated home of a component with no skill page: its name, its lead from the site map, and the Code. */
export function ComponentPage() {
  const meta = useOf("meta")
  const title = meta.type === "meta" ? meta.preparedMeta.title : ""
  const entry = entryOf(title)
  if (entry?.guide) return <ComponentHome guide={entry.guide} />
  const name = entry?.name ?? title.split("/").pop()
  const source = `# ${name}\n\n${entry?.lead ?? ""}\n`
  return (
    <SkillDoc source={source} code={<ComponentCode />} component={entry?.dir} />
  )
}

/** A CSF file as an .mdx imports it (`import * as Stories from "…stories"`). */
type StoriesFile = Record<string, unknown> & { default: unknown }

/** "SameColumnTwice" → "Same Column Twice", as Storybook names a story from its export. */
const storyName = (key: string) =>
  key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase())

/**
 * The components a pattern ships, on its page's Code tab: each one's name, description, props, and every story. A
 * pattern's components have no card in the Components index; their stories are hidden from the sidebar and live here,
 * so the pattern's guidance and its code sit on one page. The .mdx must import each stories file, so Storybook loads it.
 */
export function PatternCode({
  components,
}: {
  components: { name: string; stories: StoriesFile }[]
}) {
  return (
    <div className={BLOCK_HEADINGS}>
      {components.map(({ name, stories }) => (
        <section key={name}>
          <h2>{name}</h2>
          <Description of={stories} />
          <ArgTypes of={stories} />
          {Object.keys(stories)
            .filter((key) => key !== "default" && !key.startsWith("__"))
            .map((key) => (
              <div key={key}>
                <h3>{storyName(key)}</h3>
                <Description of={stories[key]} />
                <Canvas of={stories[key]} />
              </div>
            ))}
        </section>
      ))}
    </div>
  )
}
