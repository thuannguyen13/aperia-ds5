// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=216-3141
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/hover-card/hover-card.tsx
// component=HoverCard

import figma from "figma"

export default {
  id: "HoverCard",
  imports: [
    'import { HoverCard, HoverCardTrigger, HoverCardContent } from "aperia-ds5"',
  ],
  example: figma.code`<HoverCard>
        <HoverCardTrigger>Hover</HoverCardTrigger>
        <HoverCardContent>
          {/* Place hover card content here */}
        </HoverCardContent>
      </HoverCard>`,
}
