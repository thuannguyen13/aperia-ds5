// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=204-1144
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/command/command.tsx
// component=Command

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Variant") === "Suggestions") {
  template = {
    id: "Command",
    imports: [
      'import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "aperia-ds5"',
    ],
    example: figma.code`<Command>
        <CommandInput placeholder="Type a command or search..."/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {/* Place CommandItem components here */}
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>`,
  }
} else if (figma.selectedInstance.getPropertyValue("Variant") === "Empty") {
  template = {
    id: "Command",
    imports: [
      'import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "aperia-ds5"',
    ],
    example: figma.code`<Command>
        <CommandInput placeholder="Type a command or search..."/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </Command>`,
  }
} else {
  template = {
    id: "Command",
    imports: [
      'import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "aperia-ds5"',
    ],
    example: figma.code`<Command>
        <CommandInput placeholder="Type a command or search..."/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </Command>`,
  }
}

export default template
