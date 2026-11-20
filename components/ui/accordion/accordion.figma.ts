// url=https://www.figma.com/design/uXivJU4N3R0LWu0mbimHWt/Aperia-Shadcn-Library--Enhanced-?node-id=22-1330
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/accordion/accordion.tsx
// component=Accordion

import figma from "figma"

const items = figma.properties.slot("Basic Items")

export default {
  id: "Accordion",
  imports: [
    'import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "aperia-ds5"',
  ],
  example: figma.code`<Accordion type="single" collapsible>
      {/* Place one or more AccordionItem components here */}
      ${figma.helpers.react.renderChildren(items)}
    </Accordion>`,
  metadata: { nestable: true },
}
