import React from "react"
import { Button } from "./button"
import figma from "@figma/code-connect"

figma.connect(
  Button,
  "https://www.figma.com/design/H4KukL6eIWt21GlJCxA7l9/Obra-shadcn-ui-kit-community-edition--1.6.0---Community-?node-id=9-1071",
  {
    props: {
      variant: figma.enum("Variant", {
        Primary:     "default",
        Secondary:   "secondary",
        Outline:     "outline",
        Ghost:       "ghost",
        Destructive: "destructive",
      }),
      size: figma.enum("Size", {
        Mini:          "xs",
        Small:         "sm",
        Default:       "default",
        Large:         "lg",
        "Extra Large": "xl",
      }),
      shape: figma.enum("Roundness", {
        Default: "default",
        Round:   "round",
      }),
      disabled: figma.enum("State", {
        Default:            false,
        "Hover & Active":   false,
        Focus:              false,
        Disabled:           true,
      }),
    },
    example: ({ variant, size, shape, disabled }) => (
      <Button variant={variant} size={size} shape={shape} disabled={disabled}>
        Button
      </Button>
    ),
  },
)
