// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=65-533
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/input/input.tsx
// component=Input

import figma from "figma"

const type = figma.selectedInstance.getEnum("Variant", {
  Default: undefined,
  Password: "password",
  File: "file",
})
const placeholder = figma.selectedInstance.getString("Placeholder Text")
const disabled = figma.selectedInstance.getEnum("State", {
  Default: false,
  Focus: false,
  Filled: false,
  Disabled: true,
  Invalid: false,
})
const invalid = figma.selectedInstance.getEnum("State", {
  Default: false,
  Focus: false,
  Filled: false,
  Disabled: false,
  Invalid: true,
})

export default {
  id: "Input",
  imports: ['import { Input } from "aperia-ds5"'],
  example: figma.code`<Input${figma.helpers.react.renderProp(
    "type",
    type,
  )}${figma.helpers.react.renderProp(
    "placeholder",
    placeholder,
  )}${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}${figma.helpers.react.renderProp("aria-invalid", invalid)}/>`,
  metadata: { nestable: true },
}
