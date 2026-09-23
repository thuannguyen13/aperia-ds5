// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18597-96515
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/collapsible/collapsible.tsx
// component=Collapsible

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("State") === "Active") {
  template = {
    id: "Collapsible",
    imports: [
      'import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "aperia-ds5"',
      'import { Button } from "aperia-ds5"',
    ],
    example: figma.code`<Collapsible defaultOpen>
        <div className="flex items-center justify-between gap-4">
          {/* Place trigger label content here */}
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon"/>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          {/* Place collapsible content here */}
        </CollapsibleContent>
      </Collapsible>`,
  }
} else if (figma.selectedInstance.getPropertyValue("State") === "Inactive") {
  template = {
    id: "Collapsible",
    imports: [
      'import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "aperia-ds5"',
      'import { Button } from "aperia-ds5"',
    ],
    example: figma.code`<Collapsible>
        <div className="flex items-center justify-between gap-4">
          {/* Place trigger label content here */}
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon"/>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          {/* Place collapsible content here */}
        </CollapsibleContent>
      </Collapsible>`,
  }
} else {
  template = {
    id: "Collapsible",
    imports: [
      'import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "aperia-ds5"',
      'import { Button } from "aperia-ds5"',
    ],
    example: figma.code`<Collapsible>
        <div className="flex items-center justify-between gap-4">
          {/* Place trigger label content here */}
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon"/>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          {/* Place collapsible content here */}
        </CollapsibleContent>
      </Collapsible>`,
  }
}

export default template
