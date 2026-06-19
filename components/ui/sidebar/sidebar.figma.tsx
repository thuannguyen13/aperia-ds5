import figma from "@figma/code-connect"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./sidebar"

figma.connect(
  SidebarMenuButton,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=5198-1113",
  {
    variant: { Type: "Simple" },
    imports: ['import { SidebarMenuButton } from "aperia-ds5"'],
    props: {
      label: figma.string("Text#3278:82"),
    },
    example: ({ label }) => (
      <SidebarMenuButton>
        {/* Place an icon here */}
        <span>{label}</span>
      </SidebarMenuButton>
    ),
  },
)

figma.connect(
  SidebarMenuItem,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=5198-1510",
  {
    variant: { Submenu: "False" },
    imports: [
      'import { SidebarMenuItem, SidebarMenuButton } from "aperia-ds5"',
    ],
    props: {
      label: figma.string("Text#3278:82"),
    },
    example: ({ label }) => (
      <SidebarMenuItem>
        <SidebarMenuButton>
          {/* Place an icon here */}
          <span>{label}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ),
  },
)
