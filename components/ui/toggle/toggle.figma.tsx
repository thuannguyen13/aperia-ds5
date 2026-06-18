import React from "react"
import { Toggle } from "./toggle"
import figma from "@figma/code-connect"

figma.connect(
  Toggle,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=124-27",
  {
    imports: ['import { Toggle } from "aperia-ds5"'],
    props: {
      variant: figma.enum("Variant", {
        Default: "default",
        Outline: "outline",
      }),
      size: figma.enum("Size", {
        Default: "default",
        sm: "sm",
        lg: "lg",
      }),
      disabled: figma.enum("State", {
        Default: false,
        Hover: false,
        Focus: false,
        Pressed: false,
        Disabled: true,
      }),
      label: figma.string("Toggle Text"),
    },
    example: ({ variant, size, disabled, label }) => (
      <Toggle variant={variant} size={size} disabled={disabled}>
        {label}
      </Toggle>
    ),
  }
)
