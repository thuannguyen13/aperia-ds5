// url=https://www.figma.com/design/uXivJU4N3R0LWu0mbimHWt/Aperia-Shadcn-Library--Enhanced-?node-id=21180-30836
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/combobox/combobox.tsx
// component=ComboboxLabel

import figma from "figma"

const label = figma.selectedInstance.getString("Select Label")

export default {
  id: "ComboboxLabel",
  imports: [
    'import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxGroup, ComboboxLabel, ComboboxSeparator, ComboboxChips, ComboboxChip, ComboboxChipsInput, useComboboxAnchor, InputGroupAddon } from "aperia-ds5"',
  ],
  example: figma.code`<ComboboxLabel>
      {/* place inside a ComboboxGroup */}
      ${figma.helpers.react.renderChildren(label)}
    </ComboboxLabel>`,
  metadata: { nestable: true },
}
