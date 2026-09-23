// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=5198-1113
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/sidebar/sidebar.tsx
// component=SidebarMenuButton

import figma from "figma"

const type = figma.selectedInstance.getPropertyValue("Type")
const label = figma.selectedInstance.getString("Text")

let template
if (type === "Badge") {
  const badge = figma.selectedInstance.getString("Badge Text")
  template = {
    id: "SidebarMenuButton",
    imports: ['import { SidebarMenuButton, SidebarMenuBadge } from "aperia-ds5"'],
    example: figma.code`<SidebarMenuButton>
        {/* Place an icon here */}
        <span>${figma.helpers.react.renderChildren(label)}</span>
      </SidebarMenuButton>
      <SidebarMenuBadge>${figma.helpers.react.renderChildren(badge)}</SidebarMenuBadge>`,
    metadata: { nestable: true },
  }
} else if (type === "Big Icon") {
  const subtitle = figma.selectedInstance.getString("Subtitle Text")
  template = {
    id: "SidebarMenuButton",
    imports: [
      'import { SidebarMenuButton } from "aperia-ds5"',
      'import { ChevronsUpDownIcon } from "lucide-react"',
    ],
    example: figma.code`<SidebarMenuButton size="lg">
        {/* Place the media (logo or avatar) here */}
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">${figma.helpers.react.renderChildren(label)}</span>
          <span className="truncate text-xs">${figma.helpers.react.renderChildren(subtitle)}</span>
        </div>
        <ChevronsUpDownIcon className="ml-auto" />
      </SidebarMenuButton>`,
    metadata: { nestable: true },
  }
} else if (type === "Collapsible" || type === "Tree") {
  template = {
    id: "SidebarMenuButton",
    imports: [
      'import { SidebarMenuButton, CollapsibleTrigger } from "aperia-ds5"',
      'import { ChevronRightIcon } from "lucide-react"',
    ],
    example: figma.code`<CollapsibleTrigger asChild>
        <SidebarMenuButton>
          {/* Place an icon here */}
          <span>${figma.helpers.react.renderChildren(label)}</span>
          <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
        </SidebarMenuButton>
      </CollapsibleTrigger>`,
    metadata: { nestable: true },
  }
} else if (type === "Dropdown") {
  template = {
    id: "SidebarMenuButton",
    imports: [
      'import { SidebarMenuButton, DropdownMenuTrigger } from "aperia-ds5"',
      'import { ChevronDownIcon } from "lucide-react"',
    ],
    example: figma.code`<DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          {/* Place an icon here */}
          <span>${figma.helpers.react.renderChildren(label)}</span>
          <ChevronDownIcon className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>`,
    metadata: { nestable: true },
  }
} else if (type === "Checkbox") {
  template = {
    id: "SidebarMenuButton",
    imports: ['import { SidebarMenuButton, Checkbox } from "aperia-ds5"'],
    example: figma.code`<SidebarMenuButton>
        <Checkbox />
        <span>${figma.helpers.react.renderChildren(label)}</span>
      </SidebarMenuButton>`,
    metadata: { nestable: true },
  }
} else {
  template = {
    id: "SidebarMenuButton",
    imports: ['import { SidebarMenuButton } from "aperia-ds5"'],
    example: figma.code`<SidebarMenuButton>
        {/* Place an icon here */}
        <span>${figma.helpers.react.renderChildren(label)}</span>
      </SidebarMenuButton>`,
    metadata: { nestable: true },
  }
}

export default template
