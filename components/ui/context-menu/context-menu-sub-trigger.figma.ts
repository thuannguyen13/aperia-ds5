// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=419-4534
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/context-menu/context-menu.tsx
// component=ContextMenuSubTrigger

import figma from "figma"

const label = figma.selectedInstance.getString("SubTrigger Text")

export default {
  id: "ContextMenuSubTrigger",
  imports: [
    'import { ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent } from "aperia-ds5"',
  ],
  example: figma.code`<ContextMenuSub>
        <ContextMenuSubTrigger>${figma.helpers.react.renderChildren(
          label,
        )}</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          {/* submenu items */}
        </ContextMenuSubContent>
      </ContextMenuSub>`,
  metadata: { nestable: true },
}
