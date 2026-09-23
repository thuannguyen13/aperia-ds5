// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=37-931
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/button/button.tsx
// component=Button

import figma from "figma"

// Icon sizes have no Button text layer and show IconPlaceholder--left unconditionally
// (no boolean binds it), so label and iconLeft branch on Size.
const variant = figma.selectedInstance.getEnum("Variant", {
  Default: "default",
  Secondary: "secondary",
  Destructive: "destructive",
  Outline: "outline",
  Ghost: "ghost",
  Link: "link",
})
const size = figma.selectedInstance.getEnum("Size", {
  default: "default",
  xs: "xs",
  sm: "sm",
  lg: "lg",
  icon: "icon",
  "icon-xs": "icon-xs",
  "icon-sm": "icon-sm",
  "icon-lg": "icon-lg",
})
const disabled = figma.selectedInstance.getEnum("State", {
  Default: false,
  Hover: false,
  Focus: false,
  Loading: false,
  Disabled: true,
  Pressed: false,
})
const label = figma.selectedInstance.getEnum("Size", {
  default: figma.selectedInstance.findText("Button").__render__(),
  xs: figma.selectedInstance.findText("Button").__render__(),
  sm: figma.selectedInstance.findText("Button").__render__(),
  lg: figma.selectedInstance.findText("Button").__render__(),
  icon: undefined,
  "icon-xs": undefined,
  "icon-sm": undefined,
  "icon-lg": undefined,
})
const iconLeft = figma.selectedInstance.getEnum("Size", {
  default: figma.selectedInstance.getBoolean("Show Left Icon", {
    true: (function () {
      const nestedLayer10 = figma.selectedInstance.findInstance(
        "IconPlaceholder--left",
      )
      return {
        icon:
          nestedLayer10.type !== "ERROR"
            ? nestedLayer10.getInstanceSwap("Lucide Icon")?.executeTemplate()
                .example
            : undefined,
      }
    })(),
    false: { icon: undefined },
  }),
  xs: figma.selectedInstance.getBoolean("Show Left Icon", {
    true: (function () {
      const nestedLayer11 = figma.selectedInstance.findInstance(
        "IconPlaceholder--left",
      )
      return {
        icon:
          nestedLayer11.type !== "ERROR"
            ? nestedLayer11.getInstanceSwap("Lucide Icon")?.executeTemplate()
                .example
            : undefined,
      }
    })(),
    false: { icon: undefined },
  }),
  sm: figma.selectedInstance.getBoolean("Show Left Icon", {
    true: (function () {
      const nestedLayer12 = figma.selectedInstance.findInstance(
        "IconPlaceholder--left",
      )
      return {
        icon:
          nestedLayer12.type !== "ERROR"
            ? nestedLayer12.getInstanceSwap("Lucide Icon")?.executeTemplate()
                .example
            : undefined,
      }
    })(),
    false: { icon: undefined },
  }),
  lg: figma.selectedInstance.getBoolean("Show Left Icon", {
    true: (function () {
      const nestedLayer13 = figma.selectedInstance.findInstance(
        "IconPlaceholder--left",
      )
      return {
        icon:
          nestedLayer13.type !== "ERROR"
            ? nestedLayer13.getInstanceSwap("Lucide Icon")?.executeTemplate()
                .example
            : undefined,
      }
    })(),
    false: { icon: undefined },
  }),
  icon: (function () {
    const nestedLayer14 = figma.selectedInstance.findInstance(
      "IconPlaceholder--left",
    )
    return {
      icon:
        nestedLayer14.type !== "ERROR"
          ? nestedLayer14.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })(),
  "icon-xs": (function () {
    const nestedLayer15 = figma.selectedInstance.findInstance(
      "IconPlaceholder--left",
    )
    return {
      icon:
        nestedLayer15.type !== "ERROR"
          ? nestedLayer15.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })(),
  "icon-sm": (function () {
    const nestedLayer16 = figma.selectedInstance.findInstance(
      "IconPlaceholder--left",
    )
    return {
      icon:
        nestedLayer16.type !== "ERROR"
          ? nestedLayer16.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })(),
  "icon-lg": (function () {
    const nestedLayer17 = figma.selectedInstance.findInstance(
      "IconPlaceholder--left",
    )
    return {
      icon:
        nestedLayer17.type !== "ERROR"
          ? nestedLayer17.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })(),
})
const iconRight = figma.selectedInstance.getBoolean("Show Right Icon", {
  true: (function () {
    const nestedLayer18 = figma.selectedInstance.findInstance(
      "IconPlaceholder--right",
    )
    return {
      icon:
        nestedLayer18.type !== "ERROR"
          ? nestedLayer18.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })(),
  false: { icon: undefined },
})
const kbd = figma.selectedInstance.getBoolean("Show KbdGroup", {
  true: figma.properties.children(["KbdGroup"]),
  false: undefined,
})

export default {
  id: "Button",
  imports: ['import { Button } from "aperia-ds5"'],
  example: figma.code`<Button${figma.helpers.react.renderProp(
    "variant",
    variant,
  )}${figma.helpers.react.renderProp(
    "size",
    size,
  )}${figma.helpers.react.renderProp("disabled", disabled)}>
        ${figma.helpers.react.renderChildren(iconLeft?.icon)}
        ${figma.helpers.react.renderChildren(label)}
        ${figma.helpers.react.renderChildren(iconRight.icon)}
        ${figma.helpers.react.renderChildren(kbd)}
      </Button>`,
  metadata: { nestable: true },
}
