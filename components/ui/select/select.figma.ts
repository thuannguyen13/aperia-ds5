// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=345-11530
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/select/select.tsx
// component=Select

import figma from "figma"

const placeholder = figma.selectedInstance.getString("Placeholder")
const size = figma.selectedInstance.getEnum("Size", {
  default: "default",
  sm: "sm",
})
const disabled = figma.selectedInstance.getEnum("State", {
  Default: false,
  Focus: false,
  Filled: false,
  "Filled (Focus)": false,
  Invalid: false,
  Disabled: true,
})
const invalid = figma.selectedInstance.getEnum("State", {
  Default: false,
  Focus: false,
  Filled: false,
  "Filled (Focus)": false,
  Invalid: true,
  Disabled: false,
})

export default {
  id: "Select",
  imports: [
    'import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "aperia-ds5"',
  ],
  example: figma.code`<Select>
        <SelectTrigger${figma.helpers.react.renderProp(
          "size",
          size,
        )}${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}${figma.helpers.react.renderProp("aria-invalid", invalid)}>
          <SelectValue${figma.helpers.react.renderProp(
            "placeholder",
            placeholder,
          )}/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option-1">Option 1</SelectItem>
          <SelectItem value="option-2">Option 2</SelectItem>
          <SelectItem value="option-3">Option 3</SelectItem>
        </SelectContent>
      </Select>`,
  metadata: { nestable: true },
}
