import { Anatomy } from "../anatomy"

// The Anatomy drawing of the Forms in Sheets page: the sheet that edits a contact, open over its list, in its own
// framed story (forms-in-sheets-anatomy.stories.tsx) because a sheet renders outside an inline drawing. Each part is
// marked in the order of the part list in forms-in-sheets.md.

const SHEET = "[data-slot=sheet-content]"
const FOOTER = `${SHEET} [data-slot=sheet-footer]`

export const formsInSheetsAnatomy = (
  <Anatomy
    story="design-language-examples-anatomy-forms-in-sheets--forms-in-sheets"
    title="The sheet that edits a contact, open over the contacts list"
    width={820}
    height={625}
    targets={{
      1: { selector: SHEET, side: "left", align: "start" },
      2: { selector: "[data-anatomy='2']", side: "top", align: "start" },
      3: { selector: `${SHEET} > [data-slot=sheet-close]`, side: "right" },
      4: {
        selector: `${SHEET} form > div > fieldset > [data-slot=field-group] > div:nth-child(2)`,
        side: "left",
        align: "start",
      },
      5: {
        selector: `${SHEET} [data-slot=field-label][for=anatomy-phone]`,
        side: "left",
      },
      6: { selector: `${SHEET} #anatomy-phone`, side: "left" },
      7: {
        selector: `${FOOTER} button[data-variant=destructive]`,
        side: "bottom",
      },
      8: { selector: `${FOOTER} button[data-variant=ghost]`, side: "bottom" },
      9: { selector: `${FOOTER} button[type=submit]`, side: "bottom" },
    }}
  />
)
