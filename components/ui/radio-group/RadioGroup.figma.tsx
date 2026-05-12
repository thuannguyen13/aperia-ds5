import { RadioGroup, RadioGroupItem } from "./radio-group"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../field/field"
import figma from "@figma/code-connect"

// RadioButton Type=Default — radio item in a horizontal Field
figma.connect(
  RadioGroupItem,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=65-326",
  {
    variant: { Type: "Default" },
    imports: ['import { RadioGroupItem, Field, FieldContent, FieldTitle, FieldDescription } from "aperia-ds5"'],
    props: {
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
      label: figma.string("Label Text"),
      description: figma.string("Description Text"),
    },
    example: ({ disabled, invalid, label, description }) => (
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>{label}</FieldTitle>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <RadioGroupItem
          value="value"
          disabled={disabled}
          aria-invalid={invalid}
        />
      </Field>
    ),
  }
)

// RadioButton Type=Box — choice card: radio item in a bordered FieldLabel card
figma.connect(
  RadioGroupItem,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=65-326",
  {
    variant: { Type: "Box" },
    imports: ['import { RadioGroupItem, Field, FieldLabel, FieldContent, FieldTitle, FieldDescription } from "aperia-ds5"'],
    props: {
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
      label: figma.string("Label Text"),
      description: figma.string("Description Text"),
    },
    example: ({ disabled, invalid, label, description }) => (
      <FieldLabel>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>{label}</FieldTitle>
            <FieldDescription>{description}</FieldDescription>
          </FieldContent>
          <RadioGroupItem
            value="value"
            disabled={disabled}
            aria-invalid={invalid}
          />
        </Field>
      </FieldLabel>
    ),
  }
)

// Radio Group — wraps RadioGroupItems; use defaultValue to set the initial selection
figma.connect(
  RadioGroup,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=65-341",
  {
    imports: ['import { RadioGroup, RadioGroupItem } from "aperia-ds5"'],
    props: {
      children: figma.children(["RadioButton"]),
    },
    example: ({ children }) => (
      <RadioGroup defaultValue="value">
        {children}
      </RadioGroup>
    ),
  }
)
