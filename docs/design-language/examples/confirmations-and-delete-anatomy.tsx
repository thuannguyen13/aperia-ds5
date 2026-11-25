import { Anatomy } from "../anatomy"

// The Anatomy drawing of the Confirmations and Delete page: a delete confirmation open over a record's page, in its own
// framed story (confirmations-and-delete-anatomy.stories.tsx) because the dialog renders outside an inline drawing.
// Each part is marked in the order of the part list in confirmations-and-delete.md.

const DIALOG = "[data-slot=alert-dialog-content]"

export const confirmationsAndDeleteAnatomy = (
  <Anatomy
    story="design-language-examples-anatomy-confirmations-and-delete--confirmation"
    title="A delete confirmation open over a record's page"
    width={1040}
    height={380}
    targets={{
      1: { selector: DIALOG, side: "left" },
      2: { selector: "[data-slot=alert-dialog-title]", side: "right" },
      3: { selector: "[data-slot=alert-dialog-description]", side: "right" },
      4: { selector: "[data-slot=alert-dialog-cancel]", side: "bottom" },
      5: { selector: "[data-slot=alert-dialog-action]", side: "bottom" },
    }}
  />
)
