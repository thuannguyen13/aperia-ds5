// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18677-9902
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/input-group/input-group.tsx
// component=InputGroup

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Variant") === "Text") {
  const text = figma.selectedInstance.getString("Text")

  template = {
    id: "InputGroup",
    imports: [
      'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
    ],
    example: figma.code`<InputGroup>
      <InputGroupAddon><InputGroupText>${figma.helpers.react.renderChildren(
        text,
      )}</InputGroupText></InputGroupAddon>
      <InputGroupInput placeholder="Search..."/>
    </InputGroup>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Variant") === "Button") {
  const button = figma.properties.children(["Button"])

  template = {
    id: "InputGroup",
    imports: [
      'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
    ],
    example: figma.code`<InputGroup>
      <InputGroupAddon>${figma.helpers.react.renderChildren(
        button,
      )}</InputGroupAddon>
      <InputGroupInput placeholder="Search..."/>
    </InputGroup>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Variant") === "Icon") {
  const icon = (function () {
    const nestedLayer3 = figma.selectedInstance.findInstance("IconPlaceholder")
    return {
      icon:
        nestedLayer3.type !== "ERROR"
          ? nestedLayer3.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })()

  template = {
    id: "InputGroup",
    imports: [
      'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
    ],
    example: figma.code`<InputGroup>
      <InputGroupAddon>${figma.helpers.react.renderChildren(
        icon.icon,
      )}</InputGroupAddon>
      <InputGroupInput placeholder="Search..."/>
    </InputGroup>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Variant") === "Kbd") {
  const kbd = figma.properties.children(["KbdGroup"])

  template = {
    id: "InputGroup",
    imports: [
      'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
    ],
    example: figma.code`<InputGroup>
      <InputGroupInput placeholder="Search..."/>
      <InputGroupAddon align="inline-end">${figma.helpers.react.renderChildren(
        kbd,
      )}</InputGroupAddon>
    </InputGroup>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Variant") === "Spinner") {
  const spinner = figma.properties.children(["Spinner"])

  template = {
    id: "InputGroup",
    imports: [
      'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
    ],
    example: figma.code`<InputGroup>
      <InputGroupInput placeholder="Search..."/>
      <InputGroupAddon align="inline-end">${figma.helpers.react.renderChildren(
        spinner,
      )}</InputGroupAddon>
    </InputGroup>`,
    metadata: { nestable: true },
  }
} else if (
  figma.selectedInstance.getPropertyValue("Variant") === "Check Circle"
) {
  const icon = (function () {
    const nestedLayer4 = figma.selectedInstance.findInstance("IconPlaceholder")
    return {
      icon:
        nestedLayer4.type !== "ERROR"
          ? nestedLayer4.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })()

  template = {
    id: "InputGroup",
    imports: [
      'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
    ],
    example: figma.code`<InputGroup>
      <InputGroupInput placeholder="Search..."/>
      <InputGroupAddon align="inline-end">${figma.helpers.react.renderChildren(
        icon.icon,
      )}</InputGroupAddon>
    </InputGroup>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Variant") === "Tooltip") {
  const icon = (function () {
    const nestedLayer5 = figma.selectedInstance.findInstance("IconPlaceholder")
    return {
      icon:
        nestedLayer5.type !== "ERROR"
          ? nestedLayer5.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })()
  const tooltip = (function () {
    const nestedLayer6 = figma.selectedInstance.findInstance("Tooltip")
    return {
      content:
        nestedLayer6.type !== "ERROR"
          ? nestedLayer6.getString("Tooltip Text")
          : undefined,
    }
  })()

  template = {
    id: "InputGroup",
    imports: [
      'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
      'import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "aperia-ds5"',
    ],
    example: figma.code`<InputGroup>
      <InputGroupInput placeholder="Search..."/>
      <InputGroupAddon align="inline-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton size="icon-xs">${figma.helpers.react.renderChildren(
                icon.icon,
              )}</InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>${figma.helpers.react.renderChildren(
              tooltip.content,
            )}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </InputGroupAddon>
    </InputGroup>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Variant") === "Dropdown") {
  const button = figma.properties.children(["Button"])

  template = {
    id: "InputGroup",
    imports: [
      'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
      'import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "aperia-ds5"',
    ],
    example: figma.code`<InputGroup>
      <InputGroupInput placeholder="Search..."/>
      <InputGroupAddon align="inline-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>${figma.helpers.react.renderChildren(
            button,
          )}</DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </InputGroupAddon>
    </InputGroup>`,
    metadata: { nestable: true },
  }
} else {
  const button = figma.properties.children(["Button"])

  template = {
    id: "InputGroup",
    imports: [
      'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
      'import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "aperia-ds5"',
    ],
    example: figma.code`<InputGroup>
      <InputGroupInput placeholder="Search..."/>
      <InputGroupAddon align="inline-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>${figma.helpers.react.renderChildren(
            button,
          )}</DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </InputGroupAddon>
    </InputGroup>`,
    metadata: { nestable: true },
  }
}

export default template
