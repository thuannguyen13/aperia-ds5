import type { Meta, StoryObj } from "@storybook/react-vite"
import { AddOption } from "./add-option"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../command/command"

const meta: Meta<typeof AddOption> = {
  title: "Pattern Components/AddOption",
  // Shown on its pattern page's Code tab (site.ts), not in the sidebar or the Components index.
  component: AddOption,
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component:
          'The Add row of a picker, after its items: a plus and what it adds, inside the picker\'s own item, so it is reached and picked like any other row. Picking it opens the record\'s add form in a nested sheet, and the new record is then selected. The label is a button\'s: "Add Prospect", or the typed value when that is what gets added ("Add jane@northwind.com").',
      },
    },
  },
  args: { label: "Add Prospect" },
}

export default meta
type Story = StoryObj<typeof AddOption>

const PROSPECTS = ["Northwind Payments", "Harbor Dental Group", "Lakeside Auto"]

export const InAPicker: Story = {
  render: (args) => (
    <Command className="w-72 surface">
      <CommandInput placeholder="Search prospects" />
      <CommandList>
        <CommandEmpty>No prospects found.</CommandEmpty>
        <CommandGroup>
          {PROSPECTS.map((name) => (
            <CommandItem key={name}>{name}</CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup>
          <CommandItem>
            <AddOption {...args} />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
