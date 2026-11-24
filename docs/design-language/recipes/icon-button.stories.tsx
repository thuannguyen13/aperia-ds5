import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  RefreshCwIcon,
  Trash2Icon,
} from "lucide-react"
import { IconButton } from "@/components/ui/icon-button/icon-button"

const meta: Meta<typeof IconButton> = {
  title: "Design Language/Recipes/IconButton",
  component: IconButton,
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component:
          "Every button that is only an icon. Its `label` is the tooltip and the accessible name, so a sighted user can read the action. Disabled for a `reason`, it stays focusable through `aria-disabled` and the tooltip says why instead; disabled with no reason it is a plain disabled button. Ghost and `icon-sm` by default, 40px square on a phone.",
      },
    },
  },
  args: {
    label: "Edit Prospect",
    variant: "ghost",
    size: "icon-sm",
    disabled: false,
    reason: "",
    children: <PencilIcon />,
  },
  argTypes: {
    label: { control: "text" },
    reason: { control: "text" },
    disabled: { control: "boolean" },
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["icon-xs", "icon-sm", "icon", "icon-lg"],
    },
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

/** Hover or focus it: the label is the tooltip. */
export const Default: Story = {}

/** Disabled for a reason: still focusable and hoverable, and the tooltip says why. */
export const DisabledWithReason: Story = {
  args: {
    label: "Delete Merchant",
    disabled: true,
    reason: "This item is in use and cannot be changed.",
    children: <Trash2Icon />,
  },
}

/** Disabled with no reason: a native disabled button, out of the Tab order. Prefer giving a reason. */
export const Disabled: Story = {
  args: { label: "Refresh Queue", disabled: true, children: <RefreshCwIcon /> },
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <IconButton {...args} label="Edit Prospect" variant="ghost">
        <PencilIcon />
      </IconButton>
      <IconButton {...args} label="Add Contact" variant="outline">
        <PlusIcon />
      </IconButton>
      <IconButton {...args} label="Refresh Queue" variant="secondary">
        <RefreshCwIcon />
      </IconButton>
      <IconButton {...args} label="Delete Merchant" variant="destructive">
        <Trash2Icon />
      </IconButton>
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      {(["icon-xs", "icon-sm", "icon", "icon-lg"] as const).map((size) => (
        <IconButton key={size} {...args} size={size} label={`More (${size})`}>
          <MoreHorizontalIcon />
        </IconButton>
      ))}
    </div>
  ),
}

/** In a row of records the tooltip reads "Edit", while `aria-label` names the record for a screen reader. */
export const NamingTheRecord: Story = {
  render: (args) => (
    <ul className="w-80 divide-y text-sm">
      {["Northwind Payments", "Blue Harbor Bank"].map((name) => (
        <li key={name} className="flex items-center justify-between py-1.5">
          {name}
          <IconButton {...args} label="Edit" aria-label={`Edit ${name}`}>
            <PencilIcon />
          </IconButton>
        </li>
      ))}
    </ul>
  ),
}
