// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=183-532
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/tabs/tabs.tsx
// component=TabsTrigger

import figma from "figma"

const label = figma.selectedInstance.getString("Tab Text")
const disabled = figma.selectedInstance.getEnum("State", {
  Default: false,
  Hover: false,
  Focus: false,
  Disabled: true,
})
const icon = figma.selectedInstance.getBoolean("Show Icon", {
  true: (function () {
    const nestedLayer0 = figma.selectedInstance.findInstance("IconPlaceholder")
    return {
      icon:
        nestedLayer0.type !== "ERROR"
          ? nestedLayer0.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })(),
  false: { icon: undefined },
})
const badge = figma.selectedInstance.getBoolean("Badge", {
  true: figma.properties.children(["Badge Number"]),
  false: undefined,
})

export default {
  id: "TabsTrigger",
  imports: ['import { TabsTrigger } from "aperia-ds5"'],
  example: figma.code`<TabsTrigger value="..."${figma.helpers.react.renderProp(
    "disabled",
    disabled,
  )}>
        ${figma.helpers.react.renderChildren(icon.icon)}
        ${figma.helpers.react.renderChildren(label)}
        ${figma.helpers.react.renderChildren(badge)}
      </TabsTrigger>`,
  metadata: { nestable: true },
}
