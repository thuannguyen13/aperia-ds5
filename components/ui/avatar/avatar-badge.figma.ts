// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21122-16180
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/avatar/avatar.tsx
// component=AvatarBadge

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Type") === "Default") {
  template = {
    id: "AvatarBadge",
    imports: ['import { AvatarBadge } from "aperia-ds5"'],
    example: figma.code`<AvatarBadge />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Icon") {
  const icon = (function () {
    const nestedLayer19 = figma.selectedInstance.findInstance("IconPlaceholder")
    return {
      icon:
        nestedLayer19.type !== "ERROR"
          ? nestedLayer19.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })()

  template = {
    id: "AvatarBadge",
    imports: ['import { AvatarBadge } from "aperia-ds5"'],
    example: figma.code`<AvatarBadge>${figma.helpers.react.renderChildren(
      icon.icon,
    )}</AvatarBadge>`,
    metadata: { nestable: true },
  }
} else {
  const icon = (function () {
    const nestedLayer19 = figma.selectedInstance.findInstance("IconPlaceholder")
    return {
      icon:
        nestedLayer19.type !== "ERROR"
          ? nestedLayer19.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })()

  template = {
    id: "AvatarBadge",
    imports: ['import { AvatarBadge } from "aperia-ds5"'],
    example: figma.code`<AvatarBadge>${figma.helpers.react.renderChildren(
      icon.icon,
    )}</AvatarBadge>`,
    metadata: { nestable: true },
  }
}

export default template
