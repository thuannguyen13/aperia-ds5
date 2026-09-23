// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18677-10743
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/input-group/input-group.tsx
// component=InputGroup

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Align") === "Start") {
  const addonContent = figma.properties.children(["*"])

  template = {
    id: "InputGroup",
    imports: [
      'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
    ],
    example: figma.code`<InputGroup>
      <InputGroupAddon align="block-start">${figma.helpers.react.renderChildren(
        addonContent,
      )}</InputGroupAddon>
      <InputGroupInput placeholder="..."/>
    </InputGroup>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Align") === "End") {
  const addonContent = figma.properties.children(["*"])

  template = {
    id: "InputGroup",
    imports: [
      'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
    ],
    example: figma.code`<InputGroup>
      <InputGroupInput placeholder="..."/>
      <InputGroupAddon align="block-end">${figma.helpers.react.renderChildren(
        addonContent,
      )}</InputGroupAddon>
    </InputGroup>`,
    metadata: { nestable: true },
  }
} else {
  const addonContent = figma.properties.children(["*"])

  template = {
    id: "InputGroup",
    imports: [
      'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
    ],
    example: figma.code`<InputGroup>
      <InputGroupInput placeholder="..."/>
      <InputGroupAddon align="block-end">${figma.helpers.react.renderChildren(
        addonContent,
      )}</InputGroupAddon>
    </InputGroup>`,
    metadata: { nestable: true },
  }
}

export default template
