// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=216-1522
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/menubar/menubar.tsx
// component=Menubar

import figma from "figma"

const items = figma.properties.slot("Items#21418:3")

export default {
  id: "Menubar",
  imports: [
    'import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "aperia-ds5"',
  ],
  example: figma.code`<Menubar>
        {/* Place MenubarMenu components here */}
        ${figma.helpers.react.renderChildren(items)}
      </Menubar>`,
  metadata: { nestable: true },
}
