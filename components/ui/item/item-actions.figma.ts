// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-218310
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/item/item.tsx
// component=ItemActions

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Type") === "Buttons") {
  const first = figma.selectedInstance
    .getInstanceSwap("Instance 1")
    ?.executeTemplate().example
  const second = figma.selectedInstance.getBoolean("Show Instance 2", {
    true: figma.selectedInstance
      .getInstanceSwap("Instance 2")
      ?.executeTemplate().example,
    false: undefined,
  })

  template = {
    id: "ItemActions",
    imports: ['import { ItemActions } from "aperia-ds5"'],
    example: figma.code`<ItemActions>
      ${figma.helpers.react.renderChildren(first)}
      ${figma.helpers.react.renderChildren(second)}
    </ItemActions>`,
    metadata: { nestable: true },
  }
} else if (
  figma.selectedInstance.getPropertyValue("Type") === "Text + Button"
) {
  const text = figma.selectedInstance.getString("Text")
  const button = figma.selectedInstance
    .getInstanceSwap("Instance 1")
    ?.executeTemplate().example

  template = {
    id: "ItemActions",
    imports: ['import { ItemActions } from "aperia-ds5"'],
    example: figma.code`<ItemActions>
      <span className="text-sm text-muted-foreground">${figma.helpers.react.renderChildren(
        text,
      )}</span>
      ${figma.helpers.react.renderChildren(button)}
    </ItemActions>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Icon") {
  const icon = (function () {
    const nestedLayer2 = figma.selectedInstance.findInstance("IconPlaceholder")
    return {
      glyph:
        nestedLayer2.type !== "ERROR"
          ? nestedLayer2.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })()

  template = {
    id: "ItemActions",
    imports: ['import { ItemActions } from "aperia-ds5"'],
    example: figma.code`<ItemActions>${figma.helpers.react.renderChildren(
      icon.glyph,
    )}</ItemActions>`,
    metadata: { nestable: true },
  }
} else {
  const icon = (function () {
    const nestedLayer2 = figma.selectedInstance.findInstance("IconPlaceholder")
    return {
      glyph:
        nestedLayer2.type !== "ERROR"
          ? nestedLayer2.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })()

  template = {
    id: "ItemActions",
    imports: ['import { ItemActions } from "aperia-ds5"'],
    example: figma.code`<ItemActions>${figma.helpers.react.renderChildren(
      icon.glyph,
    )}</ItemActions>`,
    metadata: { nestable: true },
  }
}

export default template
