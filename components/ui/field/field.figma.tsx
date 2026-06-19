import figma from "@figma/code-connect"
import { Field, FieldLabel, FieldDescription, FieldError } from "./field"

figma.connect(
  Field,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18684-15221",
  {
    imports: [
      'import { Field, FieldLabel, FieldDescription, FieldError } from "aperia-ds5"',
    ],
    example: () => (
      <Field>
        <FieldLabel>Label</FieldLabel>
        {/* Place your form control (Input, Select, Checkbox, etc.) here */}
        <FieldDescription>Helper text goes here</FieldDescription>
      </Field>
    ),
  },
)

figma.connect(
  Field,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18692-40259",
  {
    imports: [
      'import { Field, FieldLabel, FieldDescription, FieldError } from "aperia-ds5"',
    ],
    example: () => (
      <Field>
        <FieldLabel>Label</FieldLabel>
        {/* Place your form control here with aria-invalid */}
        <FieldError>Error message</FieldError>
      </Field>
    ),
  },
)
