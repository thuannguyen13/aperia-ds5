// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21473-104411
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/select/select.tsx
// component=Select

import figma from "figma"

// Figma-only open-state component; the SelectMenu Group slot holds the items
const children = figma.properties.slot("SelectMenu Group")

export default {
  id: "Select",
  imports: [
    'import { Select, SelectTrigger, SelectValue, SelectContent } from "aperia-ds5"',
  ],
  example: figma.code`<Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option"/>
        </SelectTrigger>
        {/* Paste SelectContent after SelectTrigger inside your <Select> */}
        <SelectContent>
          ${figma.helpers.react.renderChildren(children)}
        </SelectContent>
      </Select>`,
  metadata: { nestable: true },
}
