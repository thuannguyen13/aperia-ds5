// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=195-1621
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/popover/popover.tsx
// component=Popover

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Show Header") === true) {
  const title = figma.selectedInstance.getString("Title Text")
  const description = figma.selectedInstance.getString("Description Text")
  const items = figma.properties.slot("Items")

  template = {
    id: "Popover",
    imports: [
      'import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "aperia-ds5"',
    ],
    example: figma.code`<Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>${figma.helpers.react.renderChildren(
              title,
            )}</PopoverTitle>
            <PopoverDescription>${figma.helpers.react.renderChildren(
              description,
            )}</PopoverDescription>
          </PopoverHeader>
          {/* Add your content here */}
          ${figma.helpers.react.renderChildren(items)}
        </PopoverContent>
      </Popover>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Show Header") === false) {
  const items = figma.properties.slot("Items")

  template = {
    id: "Popover",
    imports: [
      'import { Popover, PopoverContent, PopoverTrigger } from "aperia-ds5"',
    ],
    example: figma.code`<Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          {/* Add your content here */}
          ${figma.helpers.react.renderChildren(items)}
        </PopoverContent>
      </Popover>`,
    metadata: { nestable: true },
  }
} else {
  const items = figma.properties.slot("Items")

  template = {
    id: "Popover",
    imports: [
      'import { Popover, PopoverContent, PopoverTrigger } from "aperia-ds5"',
    ],
    example: figma.code`<Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          {/* Add your content here */}
          ${figma.helpers.react.renderChildren(items)}
        </PopoverContent>
      </Popover>`,
    metadata: { nestable: true },
  }
}

export default template
