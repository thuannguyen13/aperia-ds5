// url=https://www.figma.com/design/uXivJU4N3R0LWu0mbimHWt/Aperia-Shadcn-Library--Enhanced-?node-id=21180-30054
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/combobox/combobox.tsx
// component=ComboboxChip

import figma from "figma"

const label = figma.selectedInstance.getString("Text")

export default {
  id: "ComboboxChip",
  imports: [
    'import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxGroup, ComboboxLabel, ComboboxSeparator, ComboboxChips, ComboboxChip, ComboboxChipsInput, useComboboxAnchor, InputGroupAddon } from "aperia-ds5"',
  ],
  example: figma.code`<ComboboxChip>${figma.helpers.react.renderChildren(
    label,
  )}</ComboboxChip>`,
  metadata: { nestable: true },
}
