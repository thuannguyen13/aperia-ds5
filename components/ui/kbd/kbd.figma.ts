// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18665-781
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/kbd/kbd.tsx
// component=Kbd

import figma from "figma"

// Background=Primary has no code prop: Kbd restyles itself inside TooltipContent.
const text = figma.selectedInstance.getString("Text")

export default {
  id: "Kbd",
  imports: ['import { Kbd } from "aperia-ds5"'],
  example: figma.code`<Kbd>${figma.helpers.react.renderChildren(text)}</Kbd>`,
  metadata: { nestable: true },
}
