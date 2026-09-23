// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=26-160
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/alert/alert.tsx
// component=Alert

import figma from "figma"

const variant = figma.selectedInstance.getEnum("Variant", {
  Default: "default",
  Destructive: "destructive",
})
const icon = figma.selectedInstance.getBoolean("Icon", {
  true: (function () {
    const nestedLayer21 = figma.selectedInstance.findInstance("IconPlaceholder")
    return {
      icon:
        nestedLayer21.type !== "ERROR"
          ? nestedLayer21.getInstanceSwap("Lucide Icon")?.executeTemplate()
              .example
          : undefined,
    }
  })(),
  false: { icon: undefined },
})
const title = figma.selectedInstance.getString("Title Text")
const description = figma.selectedInstance.getString("Description Text")

export default {
  id: "Alert",
  imports: [
    'import { Alert, AlertTitle, AlertDescription, AlertAction } from "aperia-ds5"',
  ],
  example: figma.code`<Alert${figma.helpers.react.renderProp(
    "variant",
    variant,
  )}>
        ${figma.helpers.react.renderChildren(icon.icon)}
        <AlertTitle>${figma.helpers.react.renderChildren(title)}</AlertTitle>
        <AlertDescription>${figma.helpers.react.renderChildren(
          description,
        )}</AlertDescription>
      </Alert>`,
  metadata: { nestable: true },
}
