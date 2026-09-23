// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=22-516
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/accordion/accordion.tsx
// component=AccordionItem

import figma from "figma"

const triggerText = figma.selectedInstance.getString("Trigger Text")
const contentText = figma.selectedInstance.getString("Content Text")

export default {
  id: "AccordionItem",
  imports: [
    'import { AccordionItem, AccordionTrigger, AccordionContent } from "aperia-ds5"',
  ],
  example: figma.code`<AccordionItem value="item-1">
        <AccordionTrigger>${figma.helpers.react.renderChildren(
          triggerText,
        )}</AccordionTrigger>
        <AccordionContent>${figma.helpers.react.renderChildren(
          contentText,
        )}</AccordionContent>
      </AccordionItem>`,
  metadata: { nestable: true },
}
