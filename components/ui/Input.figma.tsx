import { CircleIcon } from "lucide-react"
import figma from "@figma/code-connect"

import { Input } from "./input"

figma.connect(
  Input,
  "https://www.figma.com/design/Rt3p2w3NtM1X7d9NzDlMdO/Aperia-Shadcn?node-id=16-1738",
  {
    props: {
      size: figma.enum("Size", {
        Regular: "default",
        Large:   "lg",
        Small:   "sm",
        Mini:    "xs",
      }),
      shape: figma.enum("Roundness", {
        Default: "default",
        Round:   "round",
      }),
      state: figma.enum("State", {
        Empty:         undefined,
        Placeholder:   undefined,
        Value:         undefined,
        Focus:         undefined,
        Error:         "error",
        "Error Focus": "error",
        Disabled:      "disabled",
      }),
      leftIcon: figma.boolean("Show decoration left", {
        true:  <CircleIcon />,
        false: undefined,
      }),
      rightIcon: figma.boolean("Show decoration right", {
        true:  <CircleIcon />,
        false: undefined,
      }),
    },
    example: ({ size, shape, state, leftIcon, rightIcon }) => (
      <Input
        size={size}
        shape={shape}
        state={state}
        placeholder="Enter value..."
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      />
    ),
  }
)
