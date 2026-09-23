// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-224279
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/button-group/button-group.tsx
// component=ButtonGroup

import figma from "figma"

// Figma's Variant prop styles the child Buttons, not the group itself
const orientation = figma.selectedInstance.getEnum("Orientation", {
  Horizontal: "horizontal",
  Vertical: "vertical",
})
const items = figma.properties.slot("Items")

export default {
  id: "ButtonGroup",
  imports: ['import { ButtonGroup } from "aperia-ds5"'],
  example: figma.code`<ButtonGroup${figma.helpers.react.renderProp(
    "orientation",
    orientation,
  )}>${figma.helpers.react.renderChildren(items)}</ButtonGroup>`,
  metadata: { nestable: true },
}
