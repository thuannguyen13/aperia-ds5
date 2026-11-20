// url=https://www.figma.com/design/uXivJU4N3R0LWu0mbimHWt/Aperia-Shadcn-Library--Enhanced-?node-id=65-341
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/radio-group/radio-group.tsx
// component=RadioGroup

import figma from "figma"

const children = figma.properties.children(["RadioButton"])

export default {
  id: "RadioGroup",
  imports: ['import { RadioGroup, RadioGroupItem } from "aperia-ds5"'],
  example: figma.code`<RadioGroup defaultValue="value">
        ${figma.helpers.react.renderChildren(children)}
      </RadioGroup>`,
  metadata: { nestable: true },
}
