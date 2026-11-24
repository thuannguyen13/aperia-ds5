import type { Meta, StoryObj } from "@storybook/react-vite"
import { DownloadIcon } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { SelectionBar } from "./selection-bar"

const meta: Meta<typeof SelectionBar> = {
  title: "Design Language/Recipes/SelectionBar",
  component: SelectionBar,
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component:
          "The selection bar shows in the list toolbar's place while rows are selected: the count and Clear Selection at the left, the actions on the selected rows at the right, all Outline except a Destructive Delete Selected. It keeps the toolbar's height, so the table under it does not move.",
      },
    },
  },
  args: { count: 3, label: "Selected merchants", onClear: () => {} },
  argTypes: { children: { control: false } },
  decorators: [
    (Story) => (
      <div className="w-[40rem]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SelectionBar>

export const Default: Story = {
  render: (args) => (
    <SelectionBar {...args}>
      <Button variant="outline">
        <DownloadIcon data-icon="inline-start" />
        Export Selected
      </Button>
      <Button variant="destructive">Delete Selected</Button>
    </SelectionBar>
  ),
}
