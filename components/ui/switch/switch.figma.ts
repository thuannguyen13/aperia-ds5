// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=60-450
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/switch/switch.tsx
// component=Switch

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Type") === "Default") {
  const size = figma.selectedInstance.getEnum("Size", {
    default: "default",
    sm: "sm",
  })
  const defaultChecked = figma.selectedInstance.getEnum("Active", {
    On: true,
    Off: false,
  })
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
    id: "Switch",
    imports: [
      'import { Switch, Field, FieldContent, FieldTitle, FieldDescription } from "aperia-ds5"',
    ],
    example: figma.code`<Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>${figma.helpers.react.renderChildren(label)}</FieldTitle>
          <FieldDescription>${figma.helpers.react.renderChildren(
            description,
          )}</FieldDescription>
        </FieldContent>
        <Switch${figma.helpers.react.renderProp(
          "size",
          size,
        )}${figma.helpers.react.renderProp(
      "defaultChecked",
      defaultChecked,
    )}${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}${figma.helpers.react.renderProp("aria-invalid", invalid)}/>
      </Field>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Box") {
  const size = figma.selectedInstance.getEnum("Size", {
    default: "default",
    sm: "sm",
  })
  const defaultChecked = figma.selectedInstance.getEnum("Active", {
    On: true,
    Off: false,
  })
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
    id: "Switch",
    imports: [
      'import { Switch, Field, FieldLabel, FieldContent, FieldTitle, FieldDescription } from "aperia-ds5"',
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
          <Switch${figma.helpers.react.renderProp(
            "size",
            size,
          )}${figma.helpers.react.renderProp(
      "defaultChecked",
      defaultChecked,
    )}${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}${figma.helpers.react.renderProp("aria-invalid", invalid)}/>
        </Field>
      </FieldLabel>`,
    metadata: { nestable: true },
  }
} else {
  const size = figma.selectedInstance.getEnum("Size", {
    default: "default",
    sm: "sm",
  })
  const defaultChecked = figma.selectedInstance.getEnum("Active", {
    On: true,
    Off: false,
  })
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
    id: "Switch",
    imports: [
      'import { Switch, Field, FieldLabel, FieldContent, FieldTitle, FieldDescription } from "aperia-ds5"',
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
          <Switch${figma.helpers.react.renderProp(
            "size",
            size,
          )}${figma.helpers.react.renderProp(
      "defaultChecked",
      defaultChecked,
    )}${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}${figma.helpers.react.renderProp("aria-invalid", invalid)}/>
        </Field>
      </FieldLabel>`,
    metadata: { nestable: true },
  }
}

export default template
