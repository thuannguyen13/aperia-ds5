import type { Meta, StoryObj } from "@storybook/react-vite"
import { InboxIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react"
import {
  Button,
  Field,
  FieldLabel,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  opensOnClick,
} from "aperia-ds5"
import { EmptyState } from "../../plugins/aperia-ds5/skills/design/assets/components/empty-state"
import { FormSection } from "../../plugins/aperia-ds5/skills/design/assets/components/form-section"
import { IconButton } from "../../plugins/aperia-ds5/skills/design/assets/components/icon-button"
import { StatTile } from "../../plugins/aperia-ds5/skills/design/assets/components/stat-tile"
import { TitledCard } from "../../plugins/aperia-ds5/skills/design/assets/components/titled-card"

// The skill's copy-in compositions (assets/components), rendered from the skill's own files.

const meta: Meta = {
  title: "Design Language/Compositions",
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj

const TASKS = [
  {
    name: "Send the pricing proposal",
    owner: "Dana Whitfield",
    due: "Nov 24, 2026",
  },
  {
    name: "Review the signed agreement",
    owner: "Marcus Lee",
    due: "Nov 27, 2026",
  },
  { name: "Schedule onboarding", owner: "Priya Raman", due: "Dec 2, 2026" },
]

function TaskTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4">Task</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead className="pr-4">Due</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TASKS.map((t) => (
          <TableRow key={t.name} {...opensOnClick(t.name, () => {})}>
            <TableCell className="pl-4">{t.name}</TableCell>
            <TableCell>{t.owner}</TableCell>
            <TableCell className="pr-4">{t.due}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

/** A table runs to the card's edges, straight under the header: no line above the column headings. */
export const TitledCardWithTable: Story = {
  name: "TitledCard With a Table",
  render: () => (
    <TitledCard
      title="Tasks"
      figure={
        <span className="text-sm text-muted-foreground tabular-nums">3</span>
      }
      action={
        <Button variant="outline" size="sm">
          <PlusIcon />
          Add
        </Button>
      }
    >
      <TaskTable />
    </TitledCard>
  ),
}

/** The title and chevron are one button; no Show or Hide text buttons. */
export const TitledCardCollapsible: Story = {
  name: "TitledCard Collapsible",
  render: () => (
    <TitledCard title="Tasks" collapsible>
      <TaskTable />
    </TitledCard>
  ),
}

export const Empty: Story = {
  name: "EmptyState",
  render: () => (
    <TitledCard title="Tasks">
      <EmptyState
        icon={InboxIcon}
        title="No Tasks"
        description="No tasks assigned to you."
        action={
          <Button variant="outline" size="sm">
            <PlusIcon />
            Add
          </Button>
        }
      />
    </TitledCard>
  ),
}

export const IconButtons: Story = {
  name: "IconButton",
  render: () => (
    <div className="flex gap-2">
      <IconButton label="Edit Task">
        <PencilIcon />
      </IconButton>
      <IconButton
        label="Delete Task"
        disabled
        reason="This item is in use and cannot be deleted."
      >
        <Trash2Icon />
      </IconButton>
    </div>
  ),
}

export const StatTiles: Story = {
  name: "StatTile",
  render: () => (
    <div className="grid grid-cols-3 gap-3">
      <StatTile label="Open Opportunities" value="24" />
      <StatTile
        label="Won This Quarter"
        value="$1.2M"
        hint="Up 8% on last quarter"
      />
      <StatTile label="Average Deal" value="$48K" />
    </div>
  ),
}

export const FormSections: Story = {
  name: "FormSection",
  render: () => (
    <div className="surface p-4">
      <FormSection title="Details">
        <Field>
          <FieldLabel htmlFor="company">Company</FieldLabel>
          <Input id="company" />
        </Field>
      </FormSection>
      <FormSection title="Portfolio">
        <Field>
          <FieldLabel htmlFor="volume">Annual Volume</FieldLabel>
          <Input id="volume" placeholder="$2,500,000" />
        </Field>
      </FormSection>
    </div>
  ),
}
