// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=195-1993
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/breadcrumb/breadcrumb.tsx
// component=BreadcrumbItem

import figma from "figma"

const variant = figma.selectedInstance.getPropertyValue("Variant")
const label = figma.selectedInstance.getString("Breadcrumb Text")

let template
if (variant === "Link") {
  template = {
    id: "BreadcrumbItem",
    imports: ['import { BreadcrumbItem, BreadcrumbLink } from "aperia-ds5"'],
    example: figma.code`<BreadcrumbItem>
        <BreadcrumbLink href="#">${figma.helpers.react.renderChildren(label)}</BreadcrumbLink>
      </BreadcrumbItem>`,
    metadata: { nestable: true },
  }
} else if (variant === "Dropdown") {
  template = {
    id: "BreadcrumbItem",
    imports: [
      'import { BreadcrumbItem, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "aperia-ds5"',
      'import { ChevronDownIcon } from "lucide-react"',
    ],
    example: figma.code`<BreadcrumbItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            ${figma.helpers.react.renderChildren(label)}
            <ChevronDownIcon className="size-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {/* DropdownMenuItem for each hidden page */}
          </DropdownMenuContent>
        </DropdownMenu>
      </BreadcrumbItem>`,
    metadata: { nestable: true },
  }
} else if (variant === "Ellipsis") {
  template = {
    id: "BreadcrumbItem",
    imports: ['import { BreadcrumbItem, BreadcrumbEllipsis } from "aperia-ds5"'],
    example: figma.code`<BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>`,
    metadata: { nestable: true },
  }
} else {
  template = {
    id: "BreadcrumbItem",
    imports: ['import { BreadcrumbItem, BreadcrumbPage } from "aperia-ds5"'],
    example: figma.code`<BreadcrumbItem>
        <BreadcrumbPage>${figma.helpers.react.renderChildren(label)}</BreadcrumbPage>
      </BreadcrumbItem>`,
    metadata: { nestable: true },
  }
}

export default template
