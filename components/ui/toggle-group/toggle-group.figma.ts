// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18707-214048
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/toggle-group/toggle-group.tsx
// component=ToggleGroup

import figma from "figma"

const orientation = figma.selectedInstance.getEnum("Orientation", {
  Horizontal: "horizontal",
  Vertical: "vertical",
})
const spacing = figma.selectedInstance.getEnum("Type", {
  Default: 0,
  Fill: 0,
  "With Spacing": 2,
})
const items = figma.properties.slot("Items")

export default {
  id: "ToggleGroup",
  imports: ['import { ToggleGroup, ToggleGroupItem } from "aperia-ds5"'],
  example: figma.code`<ToggleGroup${figma.helpers.react.renderProp(
    "orientation",
    orientation,
  )}${figma.helpers.react.renderProp("spacing", spacing)}>
        ${figma.helpers.react.renderChildren(items)}
      </ToggleGroup>`,
  metadata: { nestable: true },
}
