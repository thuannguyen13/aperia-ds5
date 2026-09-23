// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21180-30054
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/combobox/combobox.tsx
// component=ComboboxChip

import figma from "figma"

const label = figma.selectedInstance.getString("Text")

export default {
  id: "ComboboxChip",
  imports: ['import { ComboboxChip } from "aperia-ds5"'],
  example: figma.code`<ComboboxChip>${figma.helpers.react.renderChildren(
    label,
  )}</ComboboxChip>`,
  metadata: { nestable: true },
}
