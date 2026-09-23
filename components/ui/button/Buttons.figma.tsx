import React from "react"
import { Button } from "./button"
import figma from "@figma/code-connect"

// Icon sizes have no Button text layer and show IconPlaceholder--left unconditionally
// (no boolean binds it), so label and iconLeft branch on Size instead of a second connect.
figma.connect(
  Button,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=37-931",
  {
    imports: ['import { Button } from "aperia-ds5"'],
    props: {
      variant: figma.enum("Variant", {
        Default:     "default",
        Secondary:   "secondary",
        Destructive: "destructive",
        Outline:     "outline",
        Ghost:       "ghost",
        Link:        "link",
      }),
      size: figma.enum("Size", {
        default:   "default",
        xs:        "xs",
        sm:        "sm",
        lg:        "lg",
        icon:      "icon",
        "icon-xs": "icon-xs",
        "icon-sm": "icon-sm",
        "icon-lg": "icon-lg",
      }),
      disabled: figma.enum("State", {
        Default:  false,
        Hover:    false,
        Focus:    false,
        Loading:  false,
        Disabled: true,
        Pressed:  false,
      }),
      label: figma.enum("Size", {
        default:   figma.textContent("Button"),
        xs:        figma.textContent("Button"),
        sm:        figma.textContent("Button"),
        lg:        figma.textContent("Button"),
        icon:      undefined,
        "icon-xs": undefined,
        "icon-sm": undefined,
        "icon-lg": undefined,
      }),
      iconLeft: figma.enum("Size", {
        default: figma.boolean("Show Left Icon", {
          true:  figma.nestedProps("IconPlaceholder--left", { icon: figma.instance("Lucide Icon") }),
          false: { icon: undefined },
        }),
        xs: figma.boolean("Show Left Icon", {
          true:  figma.nestedProps("IconPlaceholder--left", { icon: figma.instance("Lucide Icon") }),
          false: { icon: undefined },
        }),
        sm: figma.boolean("Show Left Icon", {
          true:  figma.nestedProps("IconPlaceholder--left", { icon: figma.instance("Lucide Icon") }),
          false: { icon: undefined },
        }),
        lg: figma.boolean("Show Left Icon", {
          true:  figma.nestedProps("IconPlaceholder--left", { icon: figma.instance("Lucide Icon") }),
          false: { icon: undefined },
        }),
        icon:      figma.nestedProps("IconPlaceholder--left", { icon: figma.instance("Lucide Icon") }),
        "icon-xs": figma.nestedProps("IconPlaceholder--left", { icon: figma.instance("Lucide Icon") }),
        "icon-sm": figma.nestedProps("IconPlaceholder--left", { icon: figma.instance("Lucide Icon") }),
        "icon-lg": figma.nestedProps("IconPlaceholder--left", { icon: figma.instance("Lucide Icon") }),
      }),
      iconRight: figma.boolean("Show Right Icon", {
        true:  figma.nestedProps("IconPlaceholder--right", { icon: figma.instance("Lucide Icon") }),
        false: { icon: undefined },
      }),
      kbd: figma.boolean("Show KbdGroup", {
        true:  figma.children("KbdGroup"),
        false: undefined,
      }),
    },
    example: ({ variant, size, disabled, label, iconLeft, iconRight, kbd }) => (
      <Button variant={variant} size={size} disabled={disabled}>
        {iconLeft.icon}
        {label}
        {iconRight.icon}
        {kbd}
      </Button>
    ),
  },
)
