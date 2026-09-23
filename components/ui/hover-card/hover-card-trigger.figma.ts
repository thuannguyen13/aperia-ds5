// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=216-3085
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/hover-card/hover-card.tsx
// component=HoverCardTrigger

import figma from "figma"

const triggerText = figma.selectedInstance.getString("Trigger Text#473:4")

export default {
  id: "HoverCardTrigger",
  imports: ['import { HoverCardTrigger } from "aperia-ds5"'],
  example: figma.code`<HoverCardTrigger>${figma.helpers.react.renderChildren(
    triggerText,
  )}</HoverCardTrigger>`,
  metadata: { nestable: true },
}
