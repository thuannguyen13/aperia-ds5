import figma from "@figma/code-connect"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command"

figma.connect(
  Command,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=204-1144",
  {
    variant: { Variant: "Suggestions" },
    imports: [
      'import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "aperia-ds5"',
    ],
    example: () => (
      <Command>
        <CommandInput placeholder="Type a command or search..." />
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
      </Command>
    ),
  }
)

figma.connect(
  Command,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=204-1144",
  {
    variant: { Variant: "Empty" },
    imports: [
      'import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "aperia-ds5"',
    ],
    example: () => (
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </Command>
    ),
  }
)

figma.connect(
  CommandItem,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=345-8657",
  {
    variant: { Variant: "Default" },
    imports: ['import { CommandItem, CommandShortcut } from "aperia-ds5"'],
    props: {
      label: figma.string("Command Item Text"),
      shortcut: figma.string("Shortcut Text"),
    },
    example: ({ label, shortcut }) => (
      <CommandItem>
        {label}
        <CommandShortcut>{shortcut}</CommandShortcut>
      </CommandItem>
    ),
  }
)

figma.connect(
  CommandItem,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=345-8657",
  {
    variant: { Variant: "Icon" },
    imports: ['import { CommandItem, CommandShortcut } from "aperia-ds5"'],
    props: {
      label: figma.string("Command Item Text"),
      shortcut: figma.string("Shortcut Text"),
    },
    example: ({ label, shortcut }) => (
      <CommandItem>
        {/* Place an icon component here */}
        {label}
        <CommandShortcut>{shortcut}</CommandShortcut>
      </CommandItem>
    ),
  }
)
