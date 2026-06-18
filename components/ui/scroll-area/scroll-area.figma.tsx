import figma from "@figma/code-connect"
import { ScrollArea } from "./scroll-area"

figma.connect(
  ScrollArea,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18597-81811",
  {
    imports: ['import { ScrollArea } from "aperia-ds5"'],
    example: () => (
      <ScrollArea className="h-72 w-48 rounded-md border">
        {/* Place scrollable content here */}
      </ScrollArea>
    ),
  }
)

figma.connect(
  ScrollArea,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18597-81812",
  {
    imports: ['import { ScrollArea } from "aperia-ds5"'],
    example: () => (
      <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
        <div className="flex w-max gap-4 p-4">
          {/* Place horizontally scrollable items here */}
        </div>
      </ScrollArea>
    ),
  }
)
