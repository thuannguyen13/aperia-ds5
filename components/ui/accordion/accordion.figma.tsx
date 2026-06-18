import figma from "@figma/code-connect"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion"

figma.connect(
  Accordion,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21119-34264",
  {
    variant: { Variant: "Basic" },
    imports: ['import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "aperia-ds5"'],
    props: {
      items: figma.slot("Basic Items"),
    },
    example: ({ items }) => (
      <Accordion type="single" collapsible>
        {/* Place one or more AccordionItem components here */}
        {items}
      </Accordion>
    ),
  },
)

figma.connect(
  Accordion,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21119-34264",
  {
    variant: { Variant: "Border" },
    imports: ['import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "aperia-ds5"'],
    props: {
      items: figma.slot("Border Items"),
    },
    example: ({ items }) => (
      <Accordion type="single" collapsible>
        {/* Place one or more AccordionItem components here */}
        {items}
      </Accordion>
    ),
  },
)

figma.connect(
  AccordionItem,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=22-516",
  {
    imports: ['import { AccordionItem, AccordionTrigger, AccordionContent } from "aperia-ds5"'],
    props: {
      triggerText: figma.string("Trigger Text"),
      contentText: figma.string("Content Text"),
    },
    example: ({ triggerText, contentText }) => (
      <AccordionItem value="item-1">
        <AccordionTrigger>{triggerText}</AccordionTrigger>
        <AccordionContent>{contentText}</AccordionContent>
      </AccordionItem>
    ),
  },
)
