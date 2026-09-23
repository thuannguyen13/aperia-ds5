import figma from "@figma/code-connect"
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "./menubar"

figma.connect(
  Menubar,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=216-1522",
  {
    imports: [
      'import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "aperia-ds5"',
    ],
    props: {
      items: figma.slot("Items#21418:3"),
    },
    example: ({ items }) => (
      <Menubar>
        {/* Place MenubarMenu components here */}
        {items}
      </Menubar>
    ),
  },
)

figma.connect(
  MenubarMenu,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=210-3534",
  {
    imports: [
      'import { MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "aperia-ds5"',
    ],
    props: {
      items: figma.slot("Items#21418:2"),
    },
    example: ({ items }) => (
      <MenubarMenu>
        <MenubarTrigger>Menu</MenubarTrigger>
        <MenubarContent>
          {/* Place MenubarItem components here */}
          {items}
        </MenubarContent>
      </MenubarMenu>
    ),
  },
)
