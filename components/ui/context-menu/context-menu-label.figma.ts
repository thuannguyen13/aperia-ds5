// url=https://www.figma.com/design/uXivJU4N3R0LWu0mbimHWt/Aperia-Shadcn-Library--Enhanced-?node-id=419-4517
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/context-menu/context-menu.tsx
// component=ContextMenuLabel

import figma from "figma"

const label = figma.selectedInstance.getString("Title Text")

export default {
  id: "ContextMenuLabel",
  imports: ['import { ContextMenuLabel } from "aperia-ds5"'],
  example: figma.code`<ContextMenuLabel>${figma.helpers.react.renderChildren(
    label,
  )}</ContextMenuLabel>`,
  metadata: { nestable: true },
}
