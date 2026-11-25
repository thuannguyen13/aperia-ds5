import { Anatomy } from "../anatomy"

// The Anatomy drawing of the Dialog page: a plain dialog open over a list page, in its own framed story
// (dialog-anatomy.stories.tsx) because the dialog renders outside an inline drawing. Each part is marked in the order
// of the part list in dialog.md. Part 1 is the dimmed page behind the dialog, so it is marked on the page itself.

const PANEL = "[data-slot=dialog-content]"

export const dialogAnatomy = (
  <Anatomy
    story="design-language-examples-anatomy-dialog--open"
    title="A review dialog open over a list page"
    width={760}
    height={480}
    targets={{
      1: { selector: '[data-anatomy="1"]', side: "left" },
      2: { selector: PANEL, side: "top" },
      3: { selector: "[data-slot=dialog-title]", side: "left" },
      4: { selector: "[data-slot=dialog-close]", side: "top" },
      5: { selector: "[data-slot=dialog-description]", side: "right" },
      6: { selector: `${PANEL} [data-slot=table-container]`, side: "right" },
      7: { selector: "[data-slot=dialog-footer]", side: "left" },
    }}
  />
)
