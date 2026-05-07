import React from "react"
import { Button } from "./button"
import figma from "@figma/code-connect"

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
      label: figma.textContent("Button"),
      iconLeft: figma.boolean("Show Left Icon", {
        true:  figma.instance("IconPlaceholder--left"),
        false: undefined,
      }),
      iconRight: figma.boolean("Show Right Icon", {
        true:  figma.instance("IconPlaceholder--right"),
        false: undefined,
      }),
    },
    example: ({ variant, size, disabled, label, iconLeft, iconRight }) => (
      <Button variant={variant} size={size} disabled={disabled}>
        {iconLeft}
        {label}
        {iconRight}
      </Button>
    ),
  },
)
