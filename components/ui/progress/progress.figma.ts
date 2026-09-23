// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=296-4740
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/progress/progress.tsx
// component=Progress

import figma from "figma"

const value = figma.selectedInstance.getEnum("Percent", {
  "0%": 0,
  Custom: 50,
  "100%": 100,
})

export default {
  id: "Progress",
  imports: ['import { Progress } from "aperia-ds5"'],
  example: figma.code`<Progress${figma.helpers.react.renderProp(
    "value",
    value,
  )}/>`,
  metadata: { nestable: true },
}
