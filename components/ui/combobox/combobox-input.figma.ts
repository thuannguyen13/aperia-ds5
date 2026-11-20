// url=https://www.figma.com/design/uXivJU4N3R0LWu0mbimHWt/Aperia-Shadcn-Library--Enhanced-?node-id=430-4114
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
  // ComboboxInput already renders its own InputGroup and input, so only the
  // addon's icon is read here. Rendering the Addon Inline instance through its
  // template would nest a second InputGroup and input.
  const iconSlot = figma.selectedInstance.getBoolean("Addon Inline")
    ? figma.selectedInstance.findInstance("IconPlaceholder", {
        traverseInstances: true,
      })
    : undefined
  const icon =
    iconSlot?.type === "INSTANCE"
      ? iconSlot.getInstanceSwap("Lucide Icon")
      : undefined
  // executeTemplate() returns the icon's JSX without its import, so the
  // lucide import is rebuilt from the icon template's id (the export name).
  const iconName = icon?.type === "INSTANCE" ? icon.codeConnectId() : null

  template = {
    id: "ComboboxInput",
    imports: [
      'import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxGroup, ComboboxLabel, ComboboxSeparator, ComboboxChips, ComboboxChip, ComboboxChipsInput, useComboboxAnchor, InputGroupAddon } from "aperia-ds5"',
      ...(iconName ? [`import { ${iconName} } from "lucide-react"`] : []),
    ],
    example:
      icon?.type === "INSTANCE"
        ? figma.code`<ComboboxInput${figma.helpers.react.renderProp(
            "placeholder",
            placeholder,
          )}${figma.helpers.react.renderProp("disabled", disabled)}>
      <InputGroupAddon>${icon.executeTemplate().example}</InputGroupAddon>
    </ComboboxInput>`
        : figma.code`<ComboboxInput${figma.helpers.react.renderProp(
            "placeholder",
            placeholder,
          )}${figma.helpers.react.renderProp("disabled", disabled)} />`,
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
    imports: [
      'import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxGroup, ComboboxLabel, ComboboxSeparator, ComboboxChips, ComboboxChip, ComboboxChipsInput, useComboboxAnchor, InputGroupAddon } from "aperia-ds5"',
    ],
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
      'import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxGroup, ComboboxLabel, ComboboxSeparator, ComboboxChips, ComboboxChip, ComboboxChipsInput, useComboboxAnchor, InputGroupAddon } from "aperia-ds5"',
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
      'import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxGroup, ComboboxLabel, ComboboxSeparator, ComboboxChips, ComboboxChip, ComboboxChipsInput, useComboboxAnchor, InputGroupAddon } from "aperia-ds5"',
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
