import { Anatomy } from "../anatomy"

// The Anatomy drawing of the Filters page: advanced filters with the Filter button's popover open, in its own framed
// story (filters-anatomy.stories.tsx) because the popover renders outside an inline drawing. Each part is marked in the
// order of the part list in filters.md.

const POPOVER = "[data-slot=popover-content]"
// The second row: the first row's markers would sit over the title, so these point at the row below it.
const ROW = `${POPOVER} [role=group] ~ [role=group]`

export const filtersAnatomy = (
  <Anatomy
    story="design-language-examples-anatomy-filters--filters"
    title="Advanced filters with the Filter popover open"
    width={820}
    height={290}
    targets={{
      1: {
        selector: "button[aria-haspopup=dialog]",
        side: "top",
        align: "start",
      },
      2: { selector: "button[aria-haspopup=dialog] > span", side: "top" },
      3: { selector: `${POPOVER} > div:first-child > p`, side: "right" },
      4: { selector: `${ROW} [aria-label=Column]`, side: "bottom" },
      5: { selector: `${ROW} [aria-label$=" operator"]`, side: "bottom" },
      6: { selector: `${ROW} > :nth-child(3)`, side: "bottom" },
      7: {
        selector: `${POPOVER} button[aria-label^="Remove"][aria-label$="filter"]`,
        side: "right",
      },
      8: { selector: `${POPOVER} > div:last-child > button`, side: "bottom" },
      9: {
        selector: `${POPOVER} > div:last-child > div button`,
        side: "bottom",
      },
    }}
  />
)
