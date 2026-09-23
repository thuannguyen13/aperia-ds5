// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18684-15220
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/field/field.tsx
// component=Field

import figma from "figma"

let template
if (
  figma.selectedInstance.getPropertyValue("Orientation") === "Vertical" &&
  figma.selectedInstance.getPropertyValue("Description Placement") ===
    "Under Input"
) {
  const invalid = figma.selectedInstance.getEnum("Data Invalid", {
    False: undefined,
    True: true,
  })
  const label = figma.selectedInstance.getBoolean("Label", {
    true: figma.selectedInstance.getString("Label Text"),
    false: undefined,
  })
  const description = figma.selectedInstance.getBoolean("Description", {
    true: figma.selectedInstance.getString("Description Text"),
    false: undefined,
  })
  const control = figma.selectedInstance
    .getInstanceSwap("Input Type")
    ?.executeTemplate().example

  template = {
    id: "Field",
    imports: [
      'import { Field, FieldLabel, FieldDescription } from "aperia-ds5"',
    ],
    example: figma.code`<Field${figma.helpers.react.renderProp(
      "data-invalid",
      invalid,
    )}>
      <FieldLabel>${figma.helpers.react.renderChildren(label)}</FieldLabel>
      ${figma.helpers.react.renderChildren(control)}
      <FieldDescription>${figma.helpers.react.renderChildren(
        description,
      )}</FieldDescription>
    </Field>`,
    metadata: { nestable: true },
  }
} else if (
  figma.selectedInstance.getPropertyValue("Orientation") === "Vertical" &&
  figma.selectedInstance.getPropertyValue("Description Placement") ===
    "Under Label"
) {
  const invalid = figma.selectedInstance.getEnum("Data Invalid", {
    False: undefined,
    True: true,
  })
  const label = figma.selectedInstance.getBoolean("Label", {
    true: figma.selectedInstance.getString("Label Text"),
    false: undefined,
  })
  const description = figma.selectedInstance.getBoolean("Description", {
    true: figma.selectedInstance.getString("Description Text"),
    false: undefined,
  })
  const control = figma.selectedInstance
    .getInstanceSwap("Input Type")
    ?.executeTemplate().example

  template = {
    id: "Field",
    imports: [
      'import { Field, FieldLabel, FieldDescription } from "aperia-ds5"',
    ],
    example: figma.code`<Field${figma.helpers.react.renderProp(
      "data-invalid",
      invalid,
    )}>
      <FieldLabel>${figma.helpers.react.renderChildren(label)}</FieldLabel>
      <FieldDescription>${figma.helpers.react.renderChildren(
        description,
      )}</FieldDescription>
      ${figma.helpers.react.renderChildren(control)}
    </Field>`,
    metadata: { nestable: true },
  }
} else if (
  figma.selectedInstance.getPropertyValue("Orientation") === "Responsive"
) {
  const invalid = figma.selectedInstance.getEnum("Data Invalid", {
    False: undefined,
    True: true,
  })
  const label = figma.selectedInstance.getBoolean("Label", {
    true: figma.selectedInstance.getString("Label Text"),
    false: undefined,
  })
  const description = figma.selectedInstance.getBoolean("Description", {
    true: figma.selectedInstance.getString("Description Text"),
    false: undefined,
  })
  const control = figma.selectedInstance
    .getInstanceSwap("Input Type")
    ?.executeTemplate().example

  template = {
    id: "Field",
    imports: [
      'import { Field, FieldContent, FieldLabel, FieldDescription } from "aperia-ds5"',
    ],
    example: figma.code`<Field orientation="responsive"${figma.helpers.react.renderProp(
      "data-invalid",
      invalid,
    )}>
      <FieldContent>
        <FieldLabel>${figma.helpers.react.renderChildren(label)}</FieldLabel>
        <FieldDescription>${figma.helpers.react.renderChildren(
          description,
        )}</FieldDescription>
      </FieldContent>
      ${figma.helpers.react.renderChildren(control)}
    </Field>`,
    metadata: { nestable: true },
  }
} else {
  const invalid = figma.selectedInstance.getEnum("Data Invalid", {
    False: undefined,
    True: true,
  })
  const label = figma.selectedInstance.getBoolean("Label", {
    true: figma.selectedInstance.getString("Label Text"),
    false: undefined,
  })
  const description = figma.selectedInstance.getBoolean("Description", {
    true: figma.selectedInstance.getString("Description Text"),
    false: undefined,
  })
  const control = figma.selectedInstance
    .getInstanceSwap("Input Type")
    ?.executeTemplate().example

  template = {
    id: "Field",
    imports: [
      'import { Field, FieldContent, FieldLabel, FieldDescription } from "aperia-ds5"',
    ],
    example: figma.code`<Field orientation="responsive"${figma.helpers.react.renderProp(
      "data-invalid",
      invalid,
    )}>
      <FieldContent>
        <FieldLabel>${figma.helpers.react.renderChildren(label)}</FieldLabel>
        <FieldDescription>${figma.helpers.react.renderChildren(
          description,
        )}</FieldDescription>
      </FieldContent>
      ${figma.helpers.react.renderChildren(control)}
    </Field>`,
    metadata: { nestable: true },
  }
}

export default template
