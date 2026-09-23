// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17100-83077
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/avatar/avatar.tsx
// component=AvatarGroup

import figma from "figma"

const items = figma.properties.slot("Items")

export default {
  id: "AvatarGroup",
  imports: ['import { Avatar, AvatarFallback, AvatarGroup } from "aperia-ds5"'],
  example: figma.code`<AvatarGroup>${figma.helpers.react.renderChildren(
    items,
  )}</AvatarGroup>`,
  metadata: { nestable: true },
}
