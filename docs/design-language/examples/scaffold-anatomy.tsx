import { Anatomy } from "../anatomy"

// The Anatomy drawing of the Scaffold page: a prospect's page in the app shell with its edit form open in a sheet, in
// its own framed story (scaffold-anatomy.stories.tsx) because a sheet renders outside an inline drawing. Each part is
// marked in the order of the part list in scaffold.md. The App Shell page draws the shell's own parts.

export const scaffoldAnatomy = (
  <Anatomy
    story="design-language-examples-anatomy-scaffold--scaffold"
    title="A prospect's page in the app shell, with its edit form open in a sheet"
    width={1100}
    height={520}
    targets={{
      1: { selector: "[data-slot=sidebar-inner]", side: "top" },
      2: { selector: "[data-slot=sidebar-inset] > header", side: "top" },
      3: { selector: "#content", side: "bottom", align: "start" },
      4: { selector: "[data-slot=sheet-content]", side: "right" },
    }}
  />
)
