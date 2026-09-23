// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=5198-1510
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/sidebar/sidebar.tsx
// component=SidebarMenuItem

import figma from "figma"

const button = figma.selectedInstance.findInstance("Sidebar / SidebarMenuButton")
const buttonCode = button.type === "INSTANCE" ? button.executeTemplate().example : undefined

let template
if (figma.selectedInstance.getPropertyValue("Submenu") === "True") {
  template = {
    id: "SidebarMenuItem",
    imports: ['import { SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "aperia-ds5"'],
    example: figma.code`<SidebarMenuItem>
        ${buttonCode}
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton href="#">{/* sub item label */}</SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </SidebarMenuItem>`,
    metadata: { nestable: true },
  }
} else {
  template = {
    id: "SidebarMenuItem",
    imports: ['import { SidebarMenuItem } from "aperia-ds5"'],
    example: figma.code`<SidebarMenuItem>
        ${buttonCode}
      </SidebarMenuItem>`,
    metadata: { nestable: true },
  }
}

export default template
