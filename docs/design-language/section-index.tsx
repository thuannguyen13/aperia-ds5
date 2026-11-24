import type { ReactNode } from "react"
import { cn } from "aperia-ds5/utils"
import {
  COMPONENTS,
  skillTitle,
  storyId,
  componentTitle,
  type Section,
  type SkillPage,
} from "./site"
import { leadOf, titleOf } from "./skill-doc"
import { THUMBS } from "./component-thumbs"

// A section's index: its one-sentence lead, then a card for every page under the
// group it sits in, each with the page's name and the first sentence of its lead. The cards come from the site map
// and the pages' own leads, so the index never holds a copy of their text.

type Card = { title: string; lead: string; id: string; thumb?: ReactNode }

/** The first sentence of a lead, so a card reads in one glance. */
const firstSentence = (text = "") =>
  text.match(/^.+?[.?!](?=\s|$)/)?.[0] ?? text

function skillCard(file: string): Card | undefined {
  const title = titleOf(file)
  const full = title && skillTitle(file, title)
  if (!title || !full) return undefined
  return { title, lead: firstSentence(leadOf(file)), id: storyId(full) }
}

function CardGrid({ cards }: { cards: Card[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        // Docs render in the preview iframe; the page opens in the manager around it.
        <a
          key={card.id}
          href={`./?path=/docs/${card.id}--docs`}
          target="_top"
          className="flex flex-col overflow-hidden surface transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          {card.thumb && (
            // A preview, not a control: nothing in it takes focus, a click, or a screen reader's turn.
            <span
              aria-hidden
              inert
              className="pointer-events-none flex h-36 items-center justify-center overflow-hidden border-b border-border bg-muted/40 select-none"
            >
              {card.thumb}
            </span>
          )}
          <span className="flex flex-col gap-1.5 p-4">
            <span className="text-base font-semibold tracking-[-0.011em] text-foreground">
              {card.title}
            </span>
            <span className="text-sm leading-6 tracking-[-0.006em] text-muted-foreground">
              {card.lead}
            </span>
          </span>
        </a>
      ))}
    </div>
  )
}

function IndexPage({
  title,
  lead,
  children,
}: {
  title: string
  lead: string
  children: ReactNode
}) {
  return (
    <div className="dl-page sb-unstyled mx-auto max-w-[66rem] pb-24 font-sans text-foreground antialiased">
      <h1 className="mt-2 mb-3 text-4xl leading-[1.15] font-semibold tracking-tight">
        {title}
      </h1>
      <p className="mb-10 max-w-[50rem] text-lg leading-7 tracking-[-0.014em] text-muted-foreground">
        {lead}
      </p>
      {children}
    </div>
  )
}

function Group({ title, cards }: { title?: string; cards: Card[] }) {
  return (
    <section className={cn(title && "mt-12")}>
      {title && (
        <h2 className="mb-4 text-2xl leading-tight font-semibold tracking-tight">
          {title}
        </h2>
      )}
      <CardGrid cards={cards} />
    </section>
  )
}

/** The index of a section of skill pages (Foundations, Styles, Patterns, Examples). */
export function SectionIndex({ section }: { section: Section<SkillPage> }) {
  const cards = (pages: SkillPage[]) =>
    pages
      .map((page) => skillCard(page.file))
      .filter((card) => card !== undefined)
  return (
    <IndexPage title={section.title} lead={section.lead}>
      {section.pages && <Group cards={cards(section.pages)} />}
      {section.groups?.map((group) => (
        <Group
          key={group.title}
          title={group.title}
          cards={cards(group.pages)}
        />
      ))}
    </IndexPage>
  )
}

/** The index of every component, by group. */
export function ComponentIndex() {
  return (
    <IndexPage title={COMPONENTS.title} lead={COMPONENTS.lead}>
      {COMPONENTS.groups?.map((group) => (
        <Group
          key={group.title}
          title={group.title}
          cards={group.pages.map((page) => ({
            title: page.name,
            lead: page.lead,
            id: storyId(componentTitle(group.title, page.name)),
            thumb: THUMBS[page.dir],
          }))}
        />
      ))}
    </IndexPage>
  )
}
