import type { Meta, StoryObj } from "@storybook/react-vite"
import { ScrollArea, ScrollBar } from "./scroll-area"

const meta: Meta<typeof ScrollArea> = {
  title: "UI/Scroll Area",
  component: ScrollArea,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ScrollArea>

const tags = [
  "authentication",
  "authorization",
  "bug",
  "dependencies",
  "design",
  "documentation",
  "enhancement",
  "frontend",
  "infrastructure",
  "integration",
  "performance",
  "refactor",
  "security",
  "testing",
  "ux",
  "wontfix",
]

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-56 w-64 rounded-lg border">
      <div className="p-3">
        <h4 className="mb-2 text-sm font-medium">Tags</h4>
        {tags.map((tag) => (
          <div key={tag} className="py-1.5 text-sm">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-72 whitespace-nowrap rounded-lg border">
      <div className="flex gap-3 p-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-lg bg-muted"
          >
            <span className="text-xs text-muted-foreground">Card {i + 1}</span>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}

export const TallContent: Story = {
  render: () => (
    <ScrollArea className="h-72 w-80 rounded-lg border">
      <div className="divide-y">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <div className="size-8 rounded-full bg-muted" />
            <div className="space-y-1">
              <p className="text-sm font-medium">User {i + 1}</p>
              <p className="text-xs text-muted-foreground">user{i + 1}@example.com</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
