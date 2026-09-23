// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21180-33376
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/combobox/combobox.tsx
// component=Combobox

import figma from "figma"

const parts = figma.properties.children([
  "Combobox / Item",
  "Combobox / Combobox List",
])

export default {
  id: "Combobox",
  imports: ['import { Combobox } from "aperia-ds5"'],
  example: figma.code`<Combobox>
      {/* pass items={...} to enable filtering */}
      ${figma.helpers.react.renderChildren(parts)}
    </Combobox>`,
  metadata: { nestable: true },
}
