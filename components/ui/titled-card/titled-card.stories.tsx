import type { Meta, StoryObj } from "@storybook/react-vite"
import { InboxIcon, PlusIcon } from "lucide-react"
import { TitledCard } from "./titled-card"
import { Button } from "../button/button"
import { CardContent } from "../card/card"
import { DetailRow, DetailSection } from "../detail-section/detail-section"
import { EmptyState } from "../empty-state/empty-state"
import { EmptyValue } from "../empty-value/empty-value"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/table"
import { opensOnClick } from "../app-shell/open-record"
import { money } from "@/lib/format"

const meta: Meta<typeof TitledCard> = {
  title: "Patterns/TitledCard",
  component: TitledCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          'Heads every card: a title, an optional figure such as a count, an action at the right and a description under it, on one 2rem row so cards side by side line up. The header is 56px and owns its space: a table follows it straight to the card\'s edges (first cells `pl-4`, last `pr-4`), and padded content brings its own padding (`<CardContent className="pb-4">`). `collapsible` turns the title and a chevron into one disclosure button; never Show or Hide text buttons.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Prospects",
    collapsible: false,
    defaultOpen: true,
  },
  argTypes: {
    title: { control: "text" },
    figure: { control: "text" },
    description: { control: "text" },
    collapsible: { control: "boolean" },
    defaultOpen: { control: "boolean" },
    action: { control: false },
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof TitledCard>

const PROSPECTS = [
  {
    name: "Northwind Payments",
    owner: "Dana Whitfield",
    stage: "Proposal",
    volume: 4_200_000,
  },
  {
    name: "Blue Harbor Bank",
    owner: "Marcus Lee",
    stage: "Discovery",
    volume: 1_840_000,
  },
  {
    name: "Cedar Credit Union",
    owner: "Priya Raman",
    stage: "Negotiation",
    volume: 650_000,
  },
]

/** The first and last cells sit on the card title's line: `pl-4` and `pr-4`. */
function ProspectTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4">Prospect</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Stage</TableHead>
          <TableHead className="pr-4 text-right">Annual Volume</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {PROSPECTS.map((p) => (
          <TableRow key={p.name} {...opensOnClick(p.name, () => {})}>
            <TableCell className="pl-4">{p.name}</TableCell>
            <TableCell>{p.owner}</TableCell>
            <TableCell>{p.stage}</TableCell>
            <TableCell className="pr-4 text-right tabular-nums">
              {money(p.volume)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const addButton = (
  <Button variant="outline" size="sm">
    <PlusIcon />
    Add
  </Button>
)

/** A table runs to the card's edges straight under the header, with no line above the column headings. */
export const Default: Story = {
  render: (args) => (
    <TitledCard {...args}>
      <ProspectTable />
    </TitledCard>
  ),
}

/** A count beside the title and Add at the right, on the same 2rem row. */
export const WithFigureAndAction: Story = {
  args: { figure: "3" },
  render: (args) => (
    <TitledCard {...args} action={addButton}>
      <ProspectTable />
    </TitledCard>
  ),
}

/** Content other than a table brings its own padding; the header adds none under it. */
export const WithPaddedContent: Story = {
  args: { title: "Details" },
  render: (args) => (
    <TitledCard {...args}>
      <CardContent className="pb-4">
        <DetailSection>
          <DetailRow label="Company">Northwind Payments</DetailRow>
          <DetailRow label="Owner">Dana Whitfield</DetailRow>
          <DetailRow label="Annual Volume">
            <span className="tabular-nums">{money(4_200_000)}</span>
          </DetailRow>
          <DetailRow label="Website">
            <EmptyValue />
          </DetailRow>
        </DetailSection>
      </CardContent>
    </TitledCard>
  ),
}

export const WithDescription: Story = {
  args: {
    title: "Review Queue",
    figure: "3",
    description: "Merchants waiting on an underwriting decision.",
  },
  render: (args) => (
    <TitledCard {...args} action={addButton}>
      <ProspectTable />
    </TitledCard>
  ),
}

/** The title and chevron are one button. Collapsed, the content takes its space with it. */
export const Collapsible: Story = {
  args: { collapsible: true, figure: "3" },
  render: (args) => (
    <TitledCard {...args}>
      <ProspectTable />
    </TitledCard>
  ),
}

export const CollapsedByDefault: Story = {
  args: { collapsible: true, defaultOpen: false, figure: "3" },
  render: (args) => (
    <TitledCard {...args}>
      <ProspectTable />
    </TitledCard>
  ),
}

/** While the card is empty, Add sits in the empty state and the header has none. */
export const Empty: Story = {
  args: { title: "Tasks" },
  render: (args) => (
    <TitledCard {...args}>
      <EmptyState
        icon={InboxIcon}
        title="No Tasks"
        description="No tasks assigned to you."
        action={addButton}
      />
    </TitledCard>
  ),
}

/** Cards side by side share their first line, with or without an action. */
export const SideBySide: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2">
      <TitledCard title="Open Tasks" figure="2" action={addButton}>
        <CardContent className="pb-4 text-sm">
          Send the pricing proposal to Northwind Payments.
        </CardContent>
      </TitledCard>
      <TitledCard title="Merchants" figure="12">
        <CardContent className="pb-4 text-sm">
          12 merchants boarded this quarter.
        </CardContent>
      </TitledCard>
    </div>
  ),
}
