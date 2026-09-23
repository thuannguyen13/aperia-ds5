// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=210-3534
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/menubar/menubar.tsx
// component=MenubarMenu

import figma from "figma"

const items = figma.properties.slot("Items#21418:2")

export default {
  id: "MenubarMenu",
  imports: [
    'import { MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "aperia-ds5"',
  ],
  example: figma.code`<MenubarMenu>
        <MenubarTrigger>Menu</MenubarTrigger>
        <MenubarContent>
          {/* Place MenubarItem components here */}
          ${figma.helpers.react.renderChildren(items)}
        </MenubarContent>
      </MenubarMenu>`,
  metadata: { nestable: true },
}
