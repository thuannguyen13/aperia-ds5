// url=https://www.figma.com/design/uXivJU4N3R0LWu0mbimHWt/Aperia-Shadcn-Library--Enhanced-?node-id=249-5013
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/context-menu/context-menu.tsx
// component=ContextMenu

import figma from "figma"

const items = figma.properties.slot("Items")

export default {
  id: "ContextMenu",
  imports: [
    'import { ContextMenu, ContextMenuTrigger, ContextMenuContent } from "aperia-ds5"',
  ],
  example: figma.code`<ContextMenu>
        <ContextMenuTrigger>Right click here</ContextMenuTrigger>
        <ContextMenuContent>${figma.helpers.react.renderChildren(
          items,
        )}</ContextMenuContent>
      </ContextMenu>`,
  metadata: { nestable: true },
}
