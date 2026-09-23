// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-226415
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/input-group/input-group.tsx
// component=InputGroup

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Type") === "Input") {
  const placeholder = figma.selectedInstance.getString("Placeholder Text")
  const disabled = figma.selectedInstance.getEnum("State", {
    Default: false,
    Focus: false,
    Filled: false,
    Disabled: true,
    Invalid: false,
  })
  const invalid = figma.selectedInstance.getEnum("State", {
    Default: false,
    Focus: false,
    Filled: false,
    Disabled: false,
    Invalid: true,
  })

  template = {
    id: "InputGroup",
    imports: [
      'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
    ],
    example: figma.code`<InputGroup>
      <InputGroupInput${figma.helpers.react.renderProp(
        "placeholder",
        placeholder,
      )}${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}${figma.helpers.react.renderProp("aria-invalid", invalid)}/>
    </InputGroup>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Textarea") {
  const placeholder = figma.selectedInstance.getString("Placeholder Text")
  const disabled = figma.selectedInstance.getEnum("State", {
    Default: false,
    Focus: false,
    Filled: false,
    Disabled: true,
    Invalid: false,
  })
  const invalid = figma.selectedInstance.getEnum("State", {
    Default: false,
    Focus: false,
    Filled: false,
    Disabled: false,
    Invalid: true,
  })

  template = {
    id: "InputGroup",
    imports: [
      'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
    ],
    example: figma.code`<InputGroup>
      <InputGroupTextarea${figma.helpers.react.renderProp(
        "placeholder",
        placeholder,
      )}${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}${figma.helpers.react.renderProp("aria-invalid", invalid)}/>
    </InputGroup>`,
    metadata: { nestable: true },
  }
} else {
  const placeholder = figma.selectedInstance.getString("Placeholder Text")
  const disabled = figma.selectedInstance.getEnum("State", {
    Default: false,
    Focus: false,
    Filled: false,
    Disabled: true,
    Invalid: false,
  })
  const invalid = figma.selectedInstance.getEnum("State", {
    Default: false,
    Focus: false,
    Filled: false,
    Disabled: false,
    Invalid: true,
  })

  template = {
    id: "InputGroup",
    imports: [
      'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
    ],
    example: figma.code`<InputGroup>
      <InputGroupTextarea${figma.helpers.react.renderProp(
        "placeholder",
        placeholder,
      )}${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}${figma.helpers.react.renderProp("aria-invalid", invalid)}/>
    </InputGroup>`,
    metadata: { nestable: true },
  }
}

export default template
