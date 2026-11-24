import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  CircleAlertIcon,
  InboxIcon,
  PlusIcon,
  SearchIcon,
  StoreIcon,
} from "lucide-react"
import { EmptyState } from "./empty-state"
import { Button } from "../button/button"
import { TitledCard } from "@/docs/design-language/recipes/titled-card"

const meta: Meta<typeof EmptyState> = {
  title: "Pattern Components/EmptyState",
  // Shown on its pattern page's Code tab (site.ts), not in the sidebar or the Components index.
  tags: ["!dev"],
  component: EmptyState,
  parameters: {
    docs: {
      description: {
        component:
          'Where records would be and there are none. The icon of what is missing, the title "No [Items]", a second line only when it says whose, which or what to do, and the action that fills it, if any. No permission hints. A search with no match is "No Results" with a search icon. The empty card keeps its place, so nothing shifts when records arrive. `className` places it: a page\'s own (`flex-1 surface`), inside a card (none), a picker\'s (`p-4`).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  args: {
    icon: InboxIcon,
    title: "No Tasks",
    description: "No tasks assigned to you.",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    className: { control: "text" },
    actionClassName: { control: "text" },
    icon: { control: false },
    action: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof EmptyState>

/** Inside a card: the card's header carries the title, the empty state no Add. */
export const Default: Story = {
  render: (args) => (
    <TitledCard title="Tasks">
      <EmptyState {...args} />
    </TitledCard>
  ),
}

/** While the card is empty, Add goes in the center of the empty state, not the card header. */
export const WithAction: Story = {
  render: (args) => (
    <TitledCard title="Tasks">
      <EmptyState
        {...args}
        action={
          <Button variant="outline">
            <PlusIcon />
            Add Task
          </Button>
        }
      />
    </TitledCard>
  ),
}

/** Clear Filters only where there are filters to clear. */
export const NoResults: Story = {
  args: {
    icon: SearchIcon,
    title: "No Results",
    description: "No matching results.",
  },
  render: (args) => (
    <TitledCard title="Prospects">
      <EmptyState
        {...args}
        action={<Button variant="outline">Clear Filters</Button>}
      />
    </TitledCard>
  ),
}

/** Buttons side by side through `actionClassName`. */
export const TwoActions: Story = {
  args: {
    icon: StoreIcon,
    title: "No Merchants",
    description: "No merchants boarded for this prospect.",
    actionClassName: "flex-row justify-center",
  },
  render: (args) => (
    <TitledCard title="Merchants">
      <EmptyState
        {...args}
        action={
          <>
            <Button variant="outline">Import</Button>
            <Button>
              <PlusIcon />
              Add Merchant
            </Button>
          </>
        }
      />
    </TitledCard>
  ),
}

/** A dead end says why and offers a way on. */
export const LoadError: Story = {
  args: {
    icon: CircleAlertIcon,
    title: "Tasks Didn't Load",
    description: "Try again.",
  },
  render: (args) => (
    <TitledCard title="Tasks">
      <EmptyState
        {...args}
        action={<Button variant="outline">Try Again</Button>}
      />
    </TitledCard>
  ),
}

/** A page's own empty state is a surface that fills the space. */
export const OnPage: Story = {
  args: {
    icon: InboxIcon,
    title: "No Queues",
    description: undefined,
    className: "surface min-h-72 flex-1",
  },
  render: (args) => (
    <EmptyState
      {...args}
      action={
        <Button>
          <PlusIcon />
          Add Queue
        </Button>
      }
    />
  ),
}

/** In a picker, with the picker's tighter padding and no action. */
export const InPicker: Story = {
  args: {
    icon: SearchIcon,
    title: "No Results",
    description: undefined,
    className: "p-4",
  },
  decorators: [
    (Story) => (
      <div className="w-72 rounded-lg bg-popover shadow-md ring-[0.5px] ring-border">
        <Story />
      </div>
    ),
  ],
}
