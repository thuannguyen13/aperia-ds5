// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18665-995
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/kbd/kbd.tsx
// component=KbdGroup

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Type") === "Default") {
  const keys = figma.properties.children(["Kbd"])

  template = {
    id: "KbdGroup",
    imports: ['import { Kbd, KbdGroup } from "aperia-ds5"'],
    example: figma.code`<KbdGroup>${figma.helpers.react.renderChildren(
      keys,
    )}</KbdGroup>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "+ Separated") {
  const keys = figma.properties.children(["Kbd"])

  template = {
    id: "KbdGroup",
    imports: ['import { Kbd, KbdGroup } from "aperia-ds5"'],
    example: figma.code`<KbdGroup>
      {/* put <span>+</span> between each Kbd */}
      ${figma.helpers.react.renderChildren(keys)}
    </KbdGroup>`,
    metadata: { nestable: true },
  }
} else {
  const keys = figma.properties.children(["Kbd"])

  template = {
    id: "KbdGroup",
    imports: ['import { Kbd, KbdGroup } from "aperia-ds5"'],
    example: figma.code`<KbdGroup>
      {/* put <span>+</span> between each Kbd */}
      ${figma.helpers.react.renderChildren(keys)}
    </KbdGroup>`,
    metadata: { nestable: true },
  }
}

export default template
