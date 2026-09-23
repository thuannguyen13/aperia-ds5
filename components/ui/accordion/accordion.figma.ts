// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21119-34264
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/accordion/accordion.tsx
// component=Accordion

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Variant") === "Basic") {
  const items = figma.properties.slot("Basic Items")

  template = {
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
} else if (figma.selectedInstance.getPropertyValue("Variant") === "Border") {
  const items = figma.properties.slot("Border Items")

  template = {
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
} else {
  const items = figma.properties.slot("Border Items")

  template = {
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
}

export default template
