// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=118-2690
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/separator/separator.tsx
// component=Separator

import figma from "figma"

const orientation = figma.selectedInstance.getEnum("Orientation", {
  Horizontal: "horizontal",
  Vertical: "vertical",
})

export default {
  id: "Separator",
  imports: ['import { Separator } from "aperia-ds5"'],
  example: figma.code`<Separator${figma.helpers.react.renderProp(
    "orientation",
    orientation,
  )}/>`,
  metadata: { nestable: true },
}
