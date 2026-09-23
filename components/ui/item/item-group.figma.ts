// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-218902
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/item/item.tsx
// component=ItemGroup

import figma from "figma"

const items = figma.properties.slot("Items")

export default {
  id: "ItemGroup",
  imports: ['import { ItemGroup } from "aperia-ds5"'],
  example: figma.code`<ItemGroup>${figma.helpers.react.renderChildren(
    items,
  )}</ItemGroup>`,
  metadata: { nestable: true },
}
