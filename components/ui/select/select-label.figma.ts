// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=118-1542
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/select/select.tsx
// component=SelectLabel

import figma from "figma"

const label = figma.selectedInstance.getString("Label Text")

export default {
  id: "SelectLabel",
  imports: ['import { SelectLabel } from "aperia-ds5"'],
  example: figma.code`<SelectLabel>${figma.helpers.react.renderChildren(
    label,
  )}</SelectLabel>`,
  metadata: { nestable: true },
}
