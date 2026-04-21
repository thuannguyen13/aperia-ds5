import React from "react"
import { Button } from "./button"
import figma from "@figma/code-connect"

figma.connect(
  Button,
  "https://www.figma.com/design/Rt3p2w3NtM1X7d9NzDlMdO/Aperia-Shadcn?node-id=9-1071&t=Ve4Jlpc5Um6KhzyY-11",
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
        Default:          false,
        "Hover & Active": false,
        Focus:            false,
        Disabled:         true,
      }),
    },
    example: ({ variant, size, shape, disabled }) => (
      <Button variant={variant} size={size} shape={shape} disabled={disabled}>
        Button
      </Button>
    ),
  },
)
