// url=https://www.figma.com/design/uXivJU4N3R0LWu0mbimHWt/Aperia-Shadcn-Library--Enhanced-?node-id=18597-81812
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/scroll-area/scroll-area.tsx
// component=ScrollArea

import figma from "figma"

export default {
  id: "ScrollArea",
  imports: ['import { ScrollArea } from "aperia-ds5"'],
  example: figma.code`<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
        <div className="flex w-max gap-4 p-4">
          {/* Place horizontally scrollable items here */}
        </div>
      </ScrollArea>`,
}
