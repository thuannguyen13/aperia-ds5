// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=430-4114
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/combobox/combobox.tsx
// component=ComboboxInput

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Type") === "Default") {
  const placeholder = figma.selectedInstance.getString("Text")
  const disabled = figma.selectedInstance.getEnum("State", {
    Default: false,
    Focus: false,
    Active: false,
    Disabled: true,
  })
  const addon = figma.selectedInstance.getBoolean("Addon Inline", {
    true: figma.properties.children(["InputGroup / Addon Inline"]),
    false: undefined,
  })

  template = {
    id: "ComboboxInput",
    imports: ['import { ComboboxInput } from "aperia-ds5"'],
    example: figma.code`<ComboboxInput${figma.helpers.react.renderProp(
      "placeholder",
      placeholder,
    )}${figma.helpers.react.renderProp("disabled", disabled)}>
      ${figma.helpers.react.renderChildren(addon)}
    </ComboboxInput>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Invalid") {
  const placeholder = figma.selectedInstance.getString("Text")
  const disabled = figma.selectedInstance.getEnum("State", {
    Default: false,
    Focus: false,
    Active: false,
    Disabled: true,
  })

  template = {
    id: "ComboboxInput",
    imports: ['import { ComboboxInput } from "aperia-ds5"'],
    example: figma.code`<ComboboxInput${figma.helpers.react.renderProp(
      "placeholder",
      placeholder,
    )}${figma.helpers.react.renderProp("disabled", disabled)} aria-invalid/>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Multiple") {
  const chips = figma.properties.slot("Multiple Selection Items")
  const placeholder = figma.selectedInstance.getString("Text")

  template = {
    id: "ComboboxChips",
    imports: [
      'import { ComboboxChips, ComboboxChip, ComboboxChipsInput } from "aperia-ds5"',
    ],
    example: figma.code`<ComboboxChips>
      {/* pass ref={useComboboxAnchor()} here and anchor={ref} to ComboboxContent */}
      ${figma.helpers.react.renderChildren(chips)}
      <ComboboxChipsInput${figma.helpers.react.renderProp(
        "placeholder",
        placeholder,
      )}/>
    </ComboboxChips>`,
    metadata: { nestable: true },
  }
} else {
  const chips = figma.properties.slot("Multiple Selection Items")
  const placeholder = figma.selectedInstance.getString("Text")

  template = {
    id: "ComboboxChips",
    imports: [
      'import { ComboboxChips, ComboboxChip, ComboboxChipsInput } from "aperia-ds5"',
    ],
    example: figma.code`<ComboboxChips>
      {/* pass ref={useComboboxAnchor()} here and anchor={ref} to ComboboxContent */}
      ${figma.helpers.react.renderChildren(chips)}
      <ComboboxChipsInput${figma.helpers.react.renderProp(
        "placeholder",
        placeholder,
      )}/>
    </ComboboxChips>`,
    metadata: { nestable: true },
  }
}

export default template
