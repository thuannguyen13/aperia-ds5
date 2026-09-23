// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=124-27
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/toggle/toggle.tsx
// component=Toggle

import figma from "figma"

const variant = figma.selectedInstance.getEnum("Variant", {
  Default: "default",
  Outline: "outline",
})
const size = figma.selectedInstance.getEnum("Size", {
  Default: "default",
  sm: "sm",
  lg: "lg",
})
const disabled = figma.selectedInstance.getEnum("State", {
  Default: false,
  Hover: false,
  Focus: false,
  Pressed: false,
  Disabled: true,
})
const label = figma.selectedInstance.getString("Toggle Text")

export default {
  id: "Toggle",
  imports: ['import { Toggle } from "aperia-ds5"'],
  example: figma.code`<Toggle${figma.helpers.react.renderProp(
    "variant",
    variant,
  )}${figma.helpers.react.renderProp(
    "size",
    size,
  )}${figma.helpers.react.renderProp("disabled", disabled)}>
        ${figma.helpers.react.renderChildren(label)}
      </Toggle>`,
  metadata: { nestable: true },
}
