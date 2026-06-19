import figma from "@figma/code-connect"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card"

figma.connect(
  HoverCard,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=216-3141",
  {
    imports: [
      'import { HoverCard, HoverCardTrigger, HoverCardContent } from "aperia-ds5"',
    ],
    example: () => (
      <HoverCard>
        <HoverCardTrigger>Hover</HoverCardTrigger>
        <HoverCardContent>
          {/* Place hover card content here */}
        </HoverCardContent>
      </HoverCard>
    ),
  },
)

figma.connect(
  HoverCardTrigger,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=216-3085",
  {
    imports: ['import { HoverCardTrigger } from "aperia-ds5"'],
    props: {
      triggerText: figma.string("Trigger Text#473:4"),
    },
    example: ({ triggerText }) => (
      <HoverCardTrigger>{triggerText}</HoverCardTrigger>
    ),
  },
)
