import figma from "@figma/code-connect"
import { Field, FieldContent, FieldLabel, FieldDescription } from "./field"

const url =
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18684-15220"

figma.connect(Field, url, {
  variant: { Orientation: "Vertical", "Description Placement": "Under Input" },
  imports: ['import { Field, FieldLabel, FieldDescription } from "aperia-ds5"'],
  props: {
    invalid: figma.enum("Data Invalid", { False: undefined, True: true }),
    label: figma.boolean("Label", { true: figma.string("Label Text"), false: undefined }),
    description: figma.boolean("Description", {
      true: figma.string("Description Text"),
      false: undefined,
    }),
    control: figma.instance("Input Type"),
  },
  example: ({ invalid, label, description, control }) => (
    <Field data-invalid={invalid}>
      <FieldLabel>{label}</FieldLabel>
      {control}
      <FieldDescription>{description}</FieldDescription>
    </Field>
  ),
})

figma.connect(Field, url, {
  variant: { Orientation: "Vertical", "Description Placement": "Under Label" },
  imports: ['import { Field, FieldLabel, FieldDescription } from "aperia-ds5"'],
  props: {
    invalid: figma.enum("Data Invalid", { False: undefined, True: true }),
    label: figma.boolean("Label", { true: figma.string("Label Text"), false: undefined }),
    description: figma.boolean("Description", {
      true: figma.string("Description Text"),
      false: undefined,
    }),
    control: figma.instance("Input Type"),
  },
  example: ({ invalid, label, description, control }) => (
    <Field data-invalid={invalid}>
      <FieldLabel>{label}</FieldLabel>
      <FieldDescription>{description}</FieldDescription>
      {control}
    </Field>
  ),
})

figma.connect(Field, url, {
  variant: { Orientation: "Responsive" },
  imports: ['import { Field, FieldContent, FieldLabel, FieldDescription } from "aperia-ds5"'],
  props: {
    invalid: figma.enum("Data Invalid", { False: undefined, True: true }),
    label: figma.boolean("Label", { true: figma.string("Label Text"), false: undefined }),
    description: figma.boolean("Description", {
      true: figma.string("Description Text"),
      false: undefined,
    }),
    control: figma.instance("Input Type"),
  },
  example: ({ invalid, label, description, control }) => (
    <Field orientation="responsive" data-invalid={invalid}>
      <FieldContent>
        <FieldLabel>{label}</FieldLabel>
        <FieldDescription>{description}</FieldDescription>
      </FieldContent>
      {control}
    </Field>
  ),
})
