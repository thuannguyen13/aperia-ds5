import figma from "@figma/code-connect"

import { Input } from "./input"

figma.connect(
  Input,
  "https://www.figma.com/design/Rt3p2w3NtM1X7d9NzDlMdO/Aperia-Shadcn?node-id=16-1738",
  {
    props: {
      placeholder: figma.string("Placeholder"),
      disabled: figma.enum("State", {
        Disabled: true,
      }),
    },
    example: ({ placeholder, disabled }) => (
      <Input placeholder={placeholder} disabled={disabled} />
    ),
  }
)
