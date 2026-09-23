// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17103-809
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/tooltip/tooltip.tsx
// component=Tooltip

import figma from "figma"

const side = figma.selectedInstance.getEnum("Side", {
  Top: "top",
  Bottom: "bottom",
  Left: "left",
  Right: "right",
})
const content = figma.selectedInstance.getString("Tooltip Text")

export default {
  id: "Tooltip",
  imports: [
    'import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "aperia-ds5"',
  ],
  example: figma.code`<TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent${figma.helpers.react.renderProp(
            "side",
            side,
          )}>${figma.helpers.react.renderChildren(content)}</TooltipContent>
        </Tooltip>
      </TooltipProvider>`,
  metadata: { nestable: true },
}
