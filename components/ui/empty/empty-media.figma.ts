// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-1781
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/empty/empty.tsx
// component=EmptyMedia

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Type") === "Icon") {
  const icon = (function () {
    const nestedLayer7 = figma.selectedInstance.findInstance("IconPlaceholder")
    return {
      icon:
        nestedLayer7.type !== "ERROR"
          ? nestedLayer7.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })()

  template = {
    id: "EmptyMedia",
    imports: ['import { EmptyMedia } from "aperia-ds5"'],
    example: figma.code`<EmptyMedia variant="icon">
      ${figma.helpers.react.renderChildren(icon.icon)}
    </EmptyMedia>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Avatar") {
  const avatar = figma.properties.children(["Avatar"])

  template = {
    id: "EmptyMedia",
    imports: ['import { EmptyMedia } from "aperia-ds5"'],
    example: figma.code`<EmptyMedia>
      ${figma.helpers.react.renderChildren(avatar)}
    </EmptyMedia>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "AvatarGroup") {
  const avatarGroup = figma.properties.children(["Avatar Group"])

  template = {
    id: "EmptyMedia",
    imports: ['import { EmptyMedia } from "aperia-ds5"'],
    example: figma.code`<EmptyMedia>
      ${figma.helpers.react.renderChildren(avatarGroup)}
    </EmptyMedia>`,
    metadata: { nestable: true },
  }
} else {
  const avatarGroup = figma.properties.children(["Avatar Group"])

  template = {
    id: "EmptyMedia",
    imports: ['import { EmptyMedia } from "aperia-ds5"'],
    example: figma.code`<EmptyMedia>
      ${figma.helpers.react.renderChildren(avatarGroup)}
    </EmptyMedia>`,
    metadata: { nestable: true },
  }
}

export default template
