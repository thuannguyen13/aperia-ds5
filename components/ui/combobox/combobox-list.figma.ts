// url=https://www.figma.com/design/uXivJU4N3R0LWu0mbimHWt/Aperia-Shadcn-Library--Enhanced-?node-id=17379-199778
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/combobox/combobox.tsx
// component=ComboboxList

import figma from "figma"

const search = figma.selectedInstance.getBoolean("Search Input", {
  true: figma.helpers.react.jsxElement(
    '<ComboboxInput showTrigger={false} placeholder="Search" />',
  ),
  false: undefined,
})
const items = figma.properties.slot("Items")

export default {
  id: "ComboboxList",
  imports: [
    'import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxGroup, ComboboxLabel, ComboboxSeparator, ComboboxChips, ComboboxChip, ComboboxChipsInput, useComboboxAnchor, InputGroupAddon } from "aperia-ds5"',
  ],
  example: figma.code`<ComboboxContent>
      ${figma.helpers.react.renderChildren(search)}
      <ComboboxList>${figma.helpers.react.renderChildren(items)}</ComboboxList>
    </ComboboxContent>`,
  metadata: { nestable: true },
}
