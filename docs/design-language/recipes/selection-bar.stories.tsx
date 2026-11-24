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
          "The selection bar shows at the list toolbar's right end while rows are selected, in the place of the list's own actions, so the search, the filters and Sort stay beside it. It holds the count, Clear Selection and the actions on the selected rows, all Outline except a Destructive Delete Selected. It keeps the toolbar's height, so the table under it does not move.",
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
      <Button variant="outline">Edit Selected</Button>
      <Button variant="destructive">Delete Selected</Button>
    </SelectionBar>
  ),
}
