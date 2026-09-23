// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18665-25956
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/spinner/spinner.tsx
// component=Spinner

import figma from "figma"

// "Spin Degree" only exists to animate the Figma prototype; code spins with animate-spin.
const className = figma.selectedInstance.getEnum("Size", {
  "3": "size-3",
  "4": undefined,
  "5": "size-5",
  "6": "size-6",
  "8": "size-8",
})

export default {
  id: "Spinner",
  imports: ['import { Spinner } from "aperia-ds5"'],
  example: figma.code`<Spinner${figma.helpers.react.renderProp(
    "className",
    className,
  )}/>`,
  metadata: { nestable: true },
}
