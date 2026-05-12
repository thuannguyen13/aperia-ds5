import { Checkbox } from "./checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../field/field"
import figma from "@figma/code-connect"

// Type=Default — plain checkbox with optional label/description in a Field
figma.connect(
  Checkbox,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=46-112",
  {
    variant: { Type: "Default" },
    imports: ['import { Checkbox, Field, FieldContent, FieldTitle, FieldDescription } from "aperia-ds5"'],
    props: {
      defaultChecked: figma.enum("Checked", {
        Yes: true,
        No: false,
      }),
      disabled: figma.enum("State", {
        Default: false,
        Focus: false,
        Pressed: false,
        Invalid: false,
        Disabled: true,
      }),
      invalid: figma.enum("State", {
        Default: false,
        Focus: false,
        Pressed: false,
        Invalid: true,
        Disabled: false,
      }),
      label: figma.string("Label Text"),
      description: figma.string("Description Text"),
    },
    example: ({ defaultChecked, disabled, invalid, label, description }) => (
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>{label}</FieldTitle>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <Checkbox
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-invalid={invalid}
        />
      </Field>
    ),
  }
)

// Type=Box — choice card: checkbox wrapped in a bordered FieldLabel card
figma.connect(
  Checkbox,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=46-112",
  {
    variant: { Type: "Box" },
    imports: ['import { Checkbox, Field, FieldLabel, FieldContent, FieldTitle, FieldDescription } from "aperia-ds5"'],
    props: {
      defaultChecked: figma.enum("Checked", {
        Yes: true,
        No: false,
      }),
      disabled: figma.enum("State", {
        Default: false,
        Focus: false,
        Pressed: false,
        Invalid: false,
        Disabled: true,
      }),
      invalid: figma.enum("State", {
        Default: false,
        Focus: false,
        Pressed: false,
        Invalid: true,
        Disabled: false,
      }),
      label: figma.string("Label Text"),
      description: figma.string("Description Text"),
    },
    example: ({ defaultChecked, disabled, invalid, label, description }) => (
      <FieldLabel>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>{label}</FieldTitle>
            <FieldDescription>{description}</FieldDescription>
          </FieldContent>
          <Checkbox
            defaultChecked={defaultChecked}
            disabled={disabled}
            aria-invalid={invalid}
          />
        </Field>
      </FieldLabel>
    ),
  }
)
