import React from "react"
import { Input } from "./input"
import figma from "@figma/code-connect"

figma.connect(
  Input,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=65-533",
  {
    imports: ['import { Input } from "aperia-ds5"'],
    props: {
      type: figma.enum("Variant", {
        Default: undefined,
        Password: "password",
        File: "file",
      }),
      placeholder: figma.string("Placeholder Text"),
      disabled: figma.enum("State", {
        Default: false,
        Focus: false,
        Filled: false,
        Disabled: true,
        Invalid: false,
      }),
      invalid: figma.enum("State", {
        Default: false,
        Focus: false,
        Filled: false,
        Disabled: false,
        Invalid: true,
      }),
    },
    example: ({ type, placeholder, disabled, invalid }) => (
      <Input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={invalid}
      />
    ),
  },
)
