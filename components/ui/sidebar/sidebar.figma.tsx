import figma from "@figma/code-connect"
import { SidebarMenuButton, SidebarMenuItem } from "./sidebar"

figma.connect(
  SidebarMenuButton,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=5198-1113",
  {
    variant: { Type: "Simple" },
    imports: ['import { SidebarMenuButton } from "aperia-ds5"'],
    props: {
      label: figma.string("Text"),
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
      button: figma.nestedProps("Sidebar / SidebarMenuButton", {
        label: figma.string("Text"),
      }),
    },
    example: ({ button }) => (
      <SidebarMenuItem>
        <SidebarMenuButton>
          {/* Place an icon here */}
          <span>{button.label}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ),
  },
)
