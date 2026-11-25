import { Anatomy } from "../anatomy"

// The Anatomy drawing of the Global Search page: the search dialog open over a page, in its own framed story
// (global-search-anatomy.stories.tsx) because the dialog renders outside an inline drawing. Each part is marked in the
// order of the part list in global-search.md.

const DIALOG = "[data-slot=dialog-content]"

export const globalSearchAnatomy = (
  <Anatomy
    story="design-language-examples-anatomy-global-search--global-search"
    title="Global search open over a page"
    width={760}
    height={540}
    targets={{
      1: {
        selector: `${DIALOG} [data-slot=command-input-wrapper]`,
        side: "left",
      },
      2: { selector: `${DIALOG} [cmdk-group-heading]`, side: "right" },
      3: { selector: `${DIALOG} [data-slot=command-item]`, side: "left" },
      4: { selector: `${DIALOG} [data-anatomy="4"]`, side: "right" },
    }}
  />
)
