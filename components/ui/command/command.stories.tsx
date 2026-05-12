import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "./command"
import {
  CalendarIcon,
  FileIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

const meta: Meta<typeof Command> = {
  title: "UI/Command",
  component: Command,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Command>

export const Default: Story = {
  render: () => (
    <Command className="max-w-sm rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <LayoutDashboardIcon />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem>
            <SearchIcon />
            <span>Search</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <UsersIcon />
            <span>Team</span>
            <CommandShortcut>⌘T</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const WithFiles: Story = {
  render: () => (
    <Command className="max-w-sm rounded-lg border shadow-md">
      <CommandInput placeholder="Search files..." />
      <CommandList>
        <CommandEmpty>No files found.</CommandEmpty>
        <CommandGroup heading="Recent files">
          <CommandItem>
            <FileIcon />
            <span>report-q4.pdf</span>
          </CommandItem>
          <CommandItem>
            <FileIcon />
            <span>budget-2026.xlsx</span>
          </CommandItem>
          <CommandItem>
            <FileIcon />
            <span>roadmap.docx</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
