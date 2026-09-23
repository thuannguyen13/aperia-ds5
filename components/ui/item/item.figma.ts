// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-198607
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/item/item.tsx
// component=Item

import figma from "figma"

const variant = figma.selectedInstance.getEnum("Variant", {
  Default: "default",
  Outline: "outline",
  Muted: "muted",
})
const size = figma.selectedInstance.getEnum("Size", {
  default: "default",
  sm: "sm",
  xs: "xs",
})
const header = figma.selectedInstance.getBoolean("Show Header", {
  true: figma.selectedInstance.getInstanceSwap("Swap Header")?.executeTemplate()
    .example,
  false: undefined,
})
const media = figma.selectedInstance.getBoolean("Show Media", {
  true: figma.properties.children(["Item / Media"]),
  false: undefined,
})
const title = figma.selectedInstance.getString("Title Text")
const description = figma.selectedInstance.getString("Description Text")
const actions = figma.selectedInstance.getBoolean("Show Actions", {
  true: figma.properties.children(["Item / Actions"]),
  false: undefined,
})

export default {
  id: "Item",
  imports: [
    'import { Item, ItemContent, ItemTitle, ItemDescription } from "aperia-ds5"',
  ],
  example: figma.code`<Item${figma.helpers.react.renderProp(
    "variant",
    variant,
  )}${figma.helpers.react.renderProp("size", size)}>
      ${figma.helpers.react.renderChildren(header)}
      ${figma.helpers.react.renderChildren(media)}
      <ItemContent>
        <ItemTitle>${figma.helpers.react.renderChildren(title)}</ItemTitle>
        <ItemDescription>${figma.helpers.react.renderChildren(
          description,
        )}</ItemDescription>
      </ItemContent>
      ${figma.helpers.react.renderChildren(actions)}
    </Item>`,
  metadata: { nestable: true },
}
