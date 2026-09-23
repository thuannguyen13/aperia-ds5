// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=345-8657
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/command/command.tsx
// component=CommandItem

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Variant") === "Default") {
  const label = figma.selectedInstance.getString("Command Item Text")
  const shortcut = figma.selectedInstance.getString("Shortcut Text")

  template = {
    id: "CommandItem",
    imports: ['import { CommandItem, CommandShortcut } from "aperia-ds5"'],
    example: figma.code`<CommandItem>
        ${figma.helpers.react.renderChildren(label)}
        <CommandShortcut>${figma.helpers.react.renderChildren(
          shortcut,
        )}</CommandShortcut>
      </CommandItem>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Variant") === "Icon") {
  const label = figma.selectedInstance.getString("Command Item Text")
  const shortcut = figma.selectedInstance.getString("Shortcut Text")

  template = {
    id: "CommandItem",
    imports: ['import { CommandItem, CommandShortcut } from "aperia-ds5"'],
    example: figma.code`<CommandItem>
        {/* Place an icon component here */}
        ${figma.helpers.react.renderChildren(label)}
        <CommandShortcut>${figma.helpers.react.renderChildren(
          shortcut,
        )}</CommandShortcut>
      </CommandItem>`,
    metadata: { nestable: true },
  }
} else {
  const label = figma.selectedInstance.getString("Command Item Text")
  const shortcut = figma.selectedInstance.getString("Shortcut Text")

  template = {
    id: "CommandItem",
    imports: ['import { CommandItem, CommandShortcut } from "aperia-ds5"'],
    example: figma.code`<CommandItem>
        {/* Place an icon component here */}
        ${figma.helpers.react.renderChildren(label)}
        <CommandShortcut>${figma.helpers.react.renderChildren(
          shortcut,
        )}</CommandShortcut>
      </CommandItem>`,
    metadata: { nestable: true },
  }
}

export default template
