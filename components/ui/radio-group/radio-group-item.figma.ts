// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=65-326
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/radio-group/radio-group.tsx
// component=RadioGroupItem

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Type") === "Default") {
  const disabled = figma.selectedInstance.getEnum("State", {
    Default: false,
    Focus: false,
    Invalid: false,
    Disabled: true,
  })
  const invalid = figma.selectedInstance.getEnum("State", {
    Default: false,
    Focus: false,
    Invalid: true,
    Disabled: false,
  })
  const label = figma.selectedInstance.getString("Label Text")
  const description = figma.selectedInstance.getString("Description Text")

  template = {
    id: "RadioGroupItem",
    imports: [
      'import { RadioGroupItem, Field, FieldContent, FieldTitle, FieldDescription } from "aperia-ds5"',
    ],
    example: figma.code`<Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>${figma.helpers.react.renderChildren(label)}</FieldTitle>
          <FieldDescription>${figma.helpers.react.renderChildren(
            description,
          )}</FieldDescription>
        </FieldContent>
        <RadioGroupItem value="value"${figma.helpers.react.renderProp(
          "disabled",
          disabled,
        )}${figma.helpers.react.renderProp("aria-invalid", invalid)}/>
      </Field>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Box") {
  const disabled = figma.selectedInstance.getEnum("State", {
    Default: false,
    Focus: false,
    Invalid: false,
    Disabled: true,
  })
  const invalid = figma.selectedInstance.getEnum("State", {
    Default: false,
    Focus: false,
    Invalid: true,
    Disabled: false,
  })
  const label = figma.selectedInstance.getString("Label Text")
  const description = figma.selectedInstance.getString("Description Text")

  template = {
    id: "RadioGroupItem",
    imports: [
      'import { RadioGroupItem, Field, FieldLabel, FieldContent, FieldTitle, FieldDescription } from "aperia-ds5"',
    ],
    example: figma.code`<FieldLabel>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>${figma.helpers.react.renderChildren(
              label,
            )}</FieldTitle>
            <FieldDescription>${figma.helpers.react.renderChildren(
              description,
            )}</FieldDescription>
          </FieldContent>
          <RadioGroupItem value="value"${figma.helpers.react.renderProp(
            "disabled",
            disabled,
          )}${figma.helpers.react.renderProp("aria-invalid", invalid)}/>
        </Field>
      </FieldLabel>`,
    metadata: { nestable: true },
  }
} else {
  const disabled = figma.selectedInstance.getEnum("State", {
    Default: false,
    Focus: false,
    Invalid: false,
    Disabled: true,
  })
  const invalid = figma.selectedInstance.getEnum("State", {
    Default: false,
    Focus: false,
    Invalid: true,
    Disabled: false,
  })
  const label = figma.selectedInstance.getString("Label Text")
  const description = figma.selectedInstance.getString("Description Text")

  template = {
    id: "RadioGroupItem",
    imports: [
      'import { RadioGroupItem, Field, FieldLabel, FieldContent, FieldTitle, FieldDescription } from "aperia-ds5"',
    ],
    example: figma.code`<FieldLabel>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>${figma.helpers.react.renderChildren(
              label,
            )}</FieldTitle>
            <FieldDescription>${figma.helpers.react.renderChildren(
              description,
            )}</FieldDescription>
          </FieldContent>
          <RadioGroupItem value="value"${figma.helpers.react.renderProp(
            "disabled",
            disabled,
          )}${figma.helpers.react.renderProp("aria-invalid", invalid)}/>
        </Field>
      </FieldLabel>`,
    metadata: { nestable: true },
  }
}

export default template
