// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17100-10130
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/badge/badge.tsx
// component=Badge

import figma from "figma"

const variant = figma.selectedInstance.getEnum("Variant", {
  Default: "default",
  Secondary: "secondary",
  Outline: "outline",
  Destructive: "destructive",
  Ghost: "ghost",
})
const label = figma.selectedInstance.getString("Badge Text")

export default {
  id: "Badge",
  imports: ['import { Badge } from "aperia-ds5"'],
  example: figma.code`<Badge${figma.helpers.react.renderProp(
    "variant",
    variant,
  )}>${figma.helpers.react.renderChildren(label)}</Badge>`,
  metadata: { nestable: true },
}
