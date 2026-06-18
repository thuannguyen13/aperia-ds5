import figma from "@figma/code-connect"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
import { Button } from "@/components/ui/button"

figma.connect(
  Collapsible,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18597-96515",
  {
    variant: { State: "Active" },
    imports: [
      'import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "aperia-ds5"',
      'import { Button } from "aperia-ds5"',
    ],
    example: () => (
      <Collapsible defaultOpen>
        <div className="flex items-center justify-between gap-4">
          {/* Place trigger label content here */}
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          {/* Place collapsible content here */}
        </CollapsibleContent>
      </Collapsible>
    ),
  }
)

figma.connect(
  Collapsible,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18597-96515",
  {
    variant: { State: "Inactive" },
    imports: [
      'import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "aperia-ds5"',
      'import { Button } from "aperia-ds5"',
    ],
    example: () => (
      <Collapsible>
        <div className="flex items-center justify-between gap-4">
          {/* Place trigger label content here */}
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          {/* Place collapsible content here */}
        </CollapsibleContent>
      </Collapsible>
    ),
  }
)
