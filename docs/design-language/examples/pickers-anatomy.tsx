import { Anatomy } from "../anatomy"

// The Anatomy drawing of the Pickers page: a record picker with its list open, in its own framed story
// (pickers-anatomy.stories.tsx) because the list renders outside an inline drawing. Each part is marked in the order
// of the part list in pickers.md.

const LIST = "[data-slot=combobox-content]"
const ROW = `${LIST} [data-slot=combobox-item]`

export const pickersAnatomy = (
  <Anatomy
    story="design-language-examples-anatomy-pickers--pickers"
    title="A record picker with its list open"
    width={640}
    height={290}
    targets={{
      1: {
        selector: "[data-slot=entity-picker-anchor] [data-slot=input-group]",
        side: "right",
      },
      2: {
        selector: "[data-slot=entity-picker-anchor] [data-slot=avatar]",
        side: "left",
      },
      3: { selector: LIST, side: "bottom" },
      4: { selector: `${ROW}:nth-child(3)`, side: "left" },
      5: { selector: `${ROW}:nth-child(2) [data-slot=avatar]`, side: "left" },
      6: {
        selector: `${ROW}:nth-child(3) span.truncate.text-muted-foreground`,
        side: "right",
      },
      7: { selector: `${ROW}:nth-child(2) [data-slot=badge]`, side: "right" },
      8: { selector: `${ROW}:nth-child(1) > span:last-child`, side: "right" },
      9: {
        selector: `${ROW}:has(svg.lucide-plus)`,
        side: "left",
      },
    }}
  />
)
