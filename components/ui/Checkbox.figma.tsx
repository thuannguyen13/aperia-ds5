import figma from "@figma/code-connect"

import { Checkbox } from "./checkbox"

figma.connect(
  Checkbox,
  "https://www.figma.com/design/Rt3p2w3NtM1X7d9NzDlMdO/Aperia-Shadcn?node-id=16-1790",
  {
    props: {
      checked: figma.enum("Checked?", {
        False:         false,
        True:          true,
        Indeterminate: "indeterminate",
      }),
      disabled: figma.enum("State", {
        Default:      false,
        Focus:        false,
        Error:        false,
        "Error Focus": false,
        Disabled:     true,
      }),
    },
    example: ({ checked, disabled }) => (
      <Checkbox
        checked={checked}
        disabled={disabled}
      />
    ),
  }
)
