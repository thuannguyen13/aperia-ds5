// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=118-1541
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/select/select.tsx
// component=SelectItem

import figma from "figma"

const label = figma.selectedInstance.getString("Select Item Text")

export default {
  id: "SelectItem",
  imports: ['import { SelectItem } from "aperia-ds5"'],
  example: figma.code`<SelectItem value="value">${figma.helpers.react.renderChildren(
    label,
  )}</SelectItem>`,
  metadata: { nestable: true },
}
