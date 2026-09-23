// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17379-199232
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/combobox/combobox.tsx
// component=ComboboxItem

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Type") === "Simple") {
  const label = figma.selectedInstance.getString("Select Item")

  template = {
    id: "ComboboxItem",
    imports: ['import { ComboboxItem } from "aperia-ds5"'],
    example: figma.code`<ComboboxItem${figma.helpers.react.renderProp(
      "value",
      label,
    )}>${figma.helpers.react.renderChildren(label)}</ComboboxItem>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Custom") {
  const label = figma.selectedInstance.getString("Select Item")
  const description = figma.selectedInstance.getString("Select Description")

  template = {
    id: "ComboboxItem",
    imports: [
      'import { ComboboxItem, Item, ItemContent, ItemTitle, ItemDescription } from "aperia-ds5"',
    ],
    example: figma.code`<ComboboxItem${figma.helpers.react.renderProp(
      "value",
      label,
    )}>
      <Item size="xs" className="p-0">
        <ItemContent>
          <ItemTitle>${figma.helpers.react.renderChildren(label)}</ItemTitle>
          <ItemDescription>${figma.helpers.react.renderChildren(
            description,
          )}</ItemDescription>
        </ItemContent>
      </Item>
    </ComboboxItem>`,
    metadata: { nestable: true },
  }
} else {
  const label = figma.selectedInstance.getString("Select Item")
  const description = figma.selectedInstance.getString("Select Description")

  template = {
    id: "ComboboxItem",
    imports: [
      'import { ComboboxItem, Item, ItemContent, ItemTitle, ItemDescription } from "aperia-ds5"',
    ],
    example: figma.code`<ComboboxItem${figma.helpers.react.renderProp(
      "value",
      label,
    )}>
      <Item size="xs" className="p-0">
        <ItemContent>
          <ItemTitle>${figma.helpers.react.renderChildren(label)}</ItemTitle>
          <ItemDescription>${figma.helpers.react.renderChildren(
            description,
          )}</ItemDescription>
        </ItemContent>
      </Item>
    </ComboboxItem>`,
    metadata: { nestable: true },
  }
}

export default template
