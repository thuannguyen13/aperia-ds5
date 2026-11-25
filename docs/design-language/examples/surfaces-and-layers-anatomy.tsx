import { Anatomy } from "../anatomy"

// The Anatomy drawing of the Surfaces and Layers page: a Details card on the page with the Edit button's menu open, in
// its own framed story (surfaces-and-layers-anatomy.stories.tsx) because the menu renders outside an inline drawing.
// Each layer is marked in the order of the part list in surfaces-and-layers.md.

export const surfacesAndLayersAnatomy = (
  <Anatomy
    story="design-language-examples-anatomy-surfaces-and-layers--surfaces-and-layers"
    title="A Details card on the page with its Edit menu open"
    width={640}
    height={200}
    targets={{
      1: { selector: "[data-layers-page]", side: "top", align: "start" },
      2: { selector: "[data-slot=card]", side: "left" },
      3: { selector: "[data-slot=input]", side: "bottom" },
      4: { selector: "[data-slot=dropdown-menu-content]", side: "right" },
    }}
  />
)
