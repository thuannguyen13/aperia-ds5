// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=419-4521
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/context-menu/context-menu.tsx
// component=ContextMenuItem

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Variant") === "Default") {
  const label = figma.selectedInstance.getString("ContextMenu Text")
  const icon = figma.selectedInstance.getBoolean("Show Icon", {
    true: (function () {
      const nestedLayer8 =
        figma.selectedInstance.findInstance("IconPlaceholder")
      return {
        icon:
          nestedLayer8.type !== "ERROR"
            ? nestedLayer8.getInstanceSwap("Lucide Icon")?.executeTemplate()
                .example
            : undefined,
      }
    })(),
    false: { icon: undefined },
  })
  const shortcut = figma.selectedInstance.getBoolean("Show Shortcut Text", {
    true: figma.selectedInstance.getString("Shortcut Text"),
    false: undefined,
  })
  const disabled = figma.selectedInstance.getEnum("State", {
    Default: false,
    Hover: false,
    "Hover (Translucent)": false,
    Disabled: true,
  })

  template = {
    id: "ContextMenuItem",
    imports: [
      'import { ContextMenuItem, ContextMenuShortcut } from "aperia-ds5"',
    ],
    example: figma.code`<ContextMenuItem${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}>
      ${figma.helpers.react.renderChildren(icon.icon)}
      ${figma.helpers.react.renderChildren(label)}
      <ContextMenuShortcut>${figma.helpers.react.renderChildren(
        shortcut,
      )}</ContextMenuShortcut>
    </ContextMenuItem>`,
    metadata: { nestable: true },
  }
} else if (
  figma.selectedInstance.getPropertyValue("Variant") === "Destructive"
) {
  const label = figma.selectedInstance.getString("ContextMenu Text")
  const icon = figma.selectedInstance.getBoolean("Show Icon", {
    true: (function () {
      const nestedLayer9 =
        figma.selectedInstance.findInstance("IconPlaceholder")
      return {
        icon:
          nestedLayer9.type !== "ERROR"
            ? nestedLayer9.getInstanceSwap("Lucide Icon")?.executeTemplate()
                .example
            : undefined,
      }
    })(),
    false: { icon: undefined },
  })
  const shortcut = figma.selectedInstance.getBoolean("Show Shortcut Text", {
    true: figma.selectedInstance.getString("Shortcut Text"),
    false: undefined,
  })

  template = {
    id: "ContextMenuItem",
    imports: [
      'import { ContextMenuItem, ContextMenuShortcut } from "aperia-ds5"',
    ],
    example: figma.code`<ContextMenuItem variant="destructive">
      ${figma.helpers.react.renderChildren(icon.icon)}
      ${figma.helpers.react.renderChildren(label)}
      <ContextMenuShortcut>${figma.helpers.react.renderChildren(
        shortcut,
      )}</ContextMenuShortcut>
    </ContextMenuItem>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Variant") === "Radio") {
  // The Radio variant's IconPlaceholder is the checked indicator, which ContextMenuRadioItem renders itself
  const label = figma.selectedInstance.getString("ContextMenu Text")
  const disabled = figma.selectedInstance.getEnum("State", {
    Default: false,
    Hover: false,
    "Hover (Translucent)": false,
    Disabled: true,
  })

  template = {
    id: "ContextMenuRadioItem",
    imports: ['import { ContextMenuRadioItem } from "aperia-ds5"'],
    example: figma.code`<ContextMenuRadioItem value="value"${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}>
      ${figma.helpers.react.renderChildren(label)}
    </ContextMenuRadioItem>`,
    metadata: { nestable: true },
  }
} else {
  const label = figma.selectedInstance.getString("ContextMenu Text")
  const disabled = figma.selectedInstance.getEnum("State", {
    Default: false,
    Hover: false,
    "Hover (Translucent)": false,
    Disabled: true,
  })

  template = {
    id: "ContextMenuRadioItem",
    imports: ['import { ContextMenuRadioItem } from "aperia-ds5"'],
    example: figma.code`<ContextMenuRadioItem value="value"${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}>
      ${figma.helpers.react.renderChildren(label)}
    </ContextMenuRadioItem>`,
    metadata: { nestable: true },
  }
}

export default template
