// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-6043
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/item/item.tsx
// component=ItemMedia

import figma from "figma"

const variant = figma.selectedInstance.getEnum("Variant", {
  Icon: "icon",
  "Icon (Simple)": "icon",
  Image: "image",
  Avatar: "default",
  AvatarGroup: "default",
})
const content = figma.properties.children(["*"])

export default {
  id: "ItemMedia",
  imports: ['import { ItemMedia } from "aperia-ds5"'],
  example: figma.code`<ItemMedia${figma.helpers.react.renderProp(
    "variant",
    variant,
  )}>${figma.helpers.react.renderChildren(content)}</ItemMedia>`,
  metadata: { nestable: true },
}
