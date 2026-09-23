// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=183-74
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/textarea/textarea.tsx
// component=Textarea

import figma from "figma"

const placeholder = figma.selectedInstance.getString("Placeholder Text")
const disabled = figma.selectedInstance.getEnum("State", {
  Default: false,
  Filled: false,
  Focus: false,
  Disabled: true,
  Error: false,
  "Error (Focus)": false,
})
const invalid = figma.selectedInstance.getEnum("State", {
  Default: false,
  Filled: false,
  Focus: false,
  Disabled: false,
  Error: true,
  "Error (Focus)": true,
})

export default {
  id: "Textarea",
  imports: ['import { Textarea } from "aperia-ds5"'],
  example: figma.code`<Textarea${figma.helpers.react.renderProp(
    "placeholder",
    placeholder,
  )}${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}${figma.helpers.react.renderProp("aria-invalid", invalid)}/>`,
  metadata: { nestable: true },
}
