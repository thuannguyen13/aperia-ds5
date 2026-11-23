// url=https://www.figma.com/design/uXivJU4N3R0LWu0mbimHWt/Aperia-Shadcn-Library--Enhanced-?node-id=17100-29935
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/avatar/avatar.tsx
// component=Avatar

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Type") === "Image") {
  const size = figma.selectedInstance.getEnum("Size", {
    xl: "xl",
    lg: "lg",
    default: undefined,
    sm: "sm",
    xs: "xs",
  })
  // Circle is the default and prints nothing. Shape is the Figma property for `shape` (people circles; companies,
  // products and teams square).
  const shape = figma.selectedInstance.getEnum("Shape", {
    Circle: undefined,
    Square: "square",
  })
  const badge = figma.selectedInstance.getBoolean("Show Badge", {
    true: figma.properties.children(["Avatar / Avatar Badge"]),
    false: undefined,
  })

  template = {
    id: "Avatar",
    imports: [
      'import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "aperia-ds5"',
    ],
    example: figma.code`<Avatar${figma.helpers.react.renderProp("size", size)}${figma.helpers.react.renderProp("shape", shape)}>
      <AvatarImage src="..." alt="..."/>
      ${figma.helpers.react.renderChildren(badge)}
    </Avatar>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Fallback") {
  const size = figma.selectedInstance.getEnum("Size", {
    xl: "xl",
    lg: "lg",
    default: undefined,
    sm: "sm",
    xs: "xs",
  })
  // Circle is the default and prints nothing. Shape is the Figma property for `shape` (people circles; companies,
  // products and teams square).
  const shape = figma.selectedInstance.getEnum("Shape", {
    Circle: undefined,
    Square: "square",
  })
  const fallback = figma.selectedInstance.getString("Fallback Text")
  const badge = figma.selectedInstance.getBoolean("Show Badge", {
    true: figma.properties.children(["Avatar / Avatar Badge"]),
    false: undefined,
  })

  template = {
    id: "Avatar",
    imports: [
      'import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "aperia-ds5"',
    ],
    example: figma.code`<Avatar${figma.helpers.react.renderProp("size", size)}${figma.helpers.react.renderProp("shape", shape)}>
      <AvatarFallback>${figma.helpers.react.renderChildren(
        fallback,
      )}</AvatarFallback>
      ${figma.helpers.react.renderChildren(badge)}
    </Avatar>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Icon") {
  const size = figma.selectedInstance.getEnum("Size", {
    xl: "xl",
    lg: "lg",
    default: undefined,
    sm: "sm",
    xs: "xs",
  })
  // Circle is the default and prints nothing. Shape is the Figma property for `shape` (people circles; companies,
  // products and teams square).
  const shape = figma.selectedInstance.getEnum("Shape", {
    Circle: undefined,
    Square: "square",
  })
  const icon = (function () {
    const nestedLayer20 = figma.selectedInstance.findInstance("IconPlaceholder")
    return {
      icon:
        nestedLayer20.type !== "ERROR"
          ? nestedLayer20.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })()
  const badge = figma.selectedInstance.getBoolean("Show Badge", {
    true: figma.properties.children(["Avatar / Avatar Badge"]),
    false: undefined,
  })

  template = {
    id: "Avatar",
    imports: [
      'import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "aperia-ds5"',
    ],
    example: figma.code`<Avatar${figma.helpers.react.renderProp("size", size)}${figma.helpers.react.renderProp("shape", shape)}>
      <AvatarFallback>${figma.helpers.react.renderChildren(
        icon.icon,
      )}</AvatarFallback>
      ${figma.helpers.react.renderChildren(badge)}
    </Avatar>`,
    metadata: { nestable: true },
  }
} else {
  const size = figma.selectedInstance.getEnum("Size", {
    xl: "xl",
    lg: "lg",
    default: undefined,
    sm: "sm",
    xs: "xs",
  })
  // Circle is the default and prints nothing. Shape is the Figma property for `shape` (people circles; companies,
  // products and teams square).
  const shape = figma.selectedInstance.getEnum("Shape", {
    Circle: undefined,
    Square: "square",
  })
  const icon = (function () {
    const nestedLayer20 = figma.selectedInstance.findInstance("IconPlaceholder")
    return {
      icon:
        nestedLayer20.type !== "ERROR"
          ? nestedLayer20.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })()
  const badge = figma.selectedInstance.getBoolean("Show Badge", {
    true: figma.properties.children(["Avatar / Avatar Badge"]),
    false: undefined,
  })

  template = {
    id: "Avatar",
    imports: [
      'import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "aperia-ds5"',
    ],
    example: figma.code`<Avatar${figma.helpers.react.renderProp("size", size)}${figma.helpers.react.renderProp("shape", shape)}>
      <AvatarFallback>${figma.helpers.react.renderChildren(
        icon.icon,
      )}</AvatarFallback>
      ${figma.helpers.react.renderChildren(badge)}
    </Avatar>`,
    metadata: { nestable: true },
  }
}

export default template
