// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17382-13106
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/slider/slider.tsx
// component=Slider

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Range") === "No") {
  const disabled = figma.selectedInstance.getEnum("State", {
    Default: false,
    Disabled: true,
  })

  template = {
    id: "Slider",
    imports: ['import { Slider } from "aperia-ds5"'],
    example: figma.code`<Slider defaultValue={[50]} min={0} max={100}${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}/>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Range") === "Yes") {
  const disabled = figma.selectedInstance.getEnum("State", {
    Default: false,
    Disabled: true,
  })

  template = {
    id: "Slider",
    imports: ['import { Slider } from "aperia-ds5"'],
    example: figma.code`<Slider defaultValue={[25, 75]} min={0} max={100}${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}/>`,
    metadata: { nestable: true },
  }
} else {
  const disabled = figma.selectedInstance.getEnum("State", {
    Default: false,
    Disabled: true,
  })

  template = {
    id: "Slider",
    imports: ['import { Slider } from "aperia-ds5"'],
    example: figma.code`<Slider defaultValue={[25, 75]} min={0} max={100}${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}/>`,
    metadata: { nestable: true },
  }
}

export default template
