import React from "react"
import { Switch } from "./switch"
import figma from "@figma/code-connect"

figma.connect(
  Switch,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=60-450",
  {
    imports: ['import { Switch } from "@/components/ui/switch"'],
    props: {
      size: figma.enum("Size", {
        default: "default",
        sm: "sm",
      }),
      defaultChecked: figma.enum("Active", {
        On: true,
        Off: false,
      }),
      disabled: figma.enum("State", {
        Default: false,
        Focus: false,
        Invalid: false,
        Disabled: true,
      }),
      invalid: figma.enum("State", {
        Default: false,
        Focus: false,
        Invalid: true,
        Disabled: false,
      }),
    },
    example: ({ size, defaultChecked, disabled, invalid }) => (
      <Switch
        size={size}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-invalid={invalid}
      />
    ),
  },
)
