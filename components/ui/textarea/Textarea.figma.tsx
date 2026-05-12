import { Textarea } from "./textarea"
import figma from "@figma/code-connect"

figma.connect(
  Textarea,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=183-74",
  {
    imports: ['import { Textarea } from "aperia-ds5"'],
    props: {
      placeholder: figma.string("Placeholder Text"),
      disabled: figma.enum("State", {
        Default: false,
        Filled: false,
        Focus: false,
        Disabled: true,
        Error: false,
        "Error (Focus)": false,
      }),
      invalid: figma.enum("State", {
        Default: false,
        Filled: false,
        Focus: false,
        Disabled: false,
        Error: true,
        "Error (Focus)": true,
      }),
    },
    example: ({ placeholder, disabled, invalid }) => (
      <Textarea
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={invalid}
      />
    ),
  }
)
