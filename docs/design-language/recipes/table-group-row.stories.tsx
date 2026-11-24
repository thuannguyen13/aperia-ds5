import { Fragment } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { PencilIcon, PlusIcon } from "lucide-react"
import { TableGroupRow } from "./table-group-row"
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar"
import { IconButton } from "@/components/ui/icon-button/icon-button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table"
import { TitledCard } from "./titled-card"
import { opensOnClick } from "@/components/ui/app-shell/open-record"
import { money } from "@/lib/format"

const meta: Meta<typeof TableGroupRow> = {
  title: "Design Language/Recipes/TableGroupRow",
  component: TableGroupRow,
  tags: ["!dev"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Heads a group of rows in one table: a quiet band across it holding the group's name, on the table's first-column line (`pl-4`, as the first cells in a `TitledCard`). `leading` sits before the name, such as a logo; `trailing` at the end, such as the group's total or buttons. `colSpan` is the table's column count. Use it in place of zebra stripes or a table per group.",
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
    colSpan: 3,
  },
  argTypes: {
    colSpan: { control: "number" },
    className: { control: "text" },
    leading: { control: false },
    trailing: { control: false },
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof TableGroupRow>

const QUEUES = [
  {
    name: "Underwriting Review",
    merchants: [
      { name: "Pecan Street Coffee", owner: "Priya Raman", volume: 48_900 },
      { name: "Hill Country Hardware", owner: "Marcus Lee", volume: 126_300 },
    ],
  },
  {
    name: "Chargeback Disputes",
    merchants: [
      { name: "Lone Star Grocers", owner: "Dana Whitfield", volume: 312_400 },
    ],
  },
  {
    name: "New Merchant Boarding",
    merchants: [
      { name: "Bayou Auto Parts", owner: "Marcus Lee", volume: 98_750 },
      { name: "Gulf Coast Marine", owner: "Priya Raman", volume: 205_000 },
    ],
  },
]

function Head() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="pl-4">Merchant</TableHead>
        <TableHead>Owner</TableHead>
        <TableHead className="pr-4 text-right">Monthly Volume</TableHead>
      </TableRow>
    </TableHeader>
  )
}

function Rows({
  merchants,
}: {
  merchants: (typeof QUEUES)[number]["merchants"]
}) {
  return merchants.map((m) => (
    <TableRow key={m.name} {...opensOnClick(m.name, () => {})}>
      <TableCell className="pl-4">{m.name}</TableCell>
      <TableCell>{m.owner}</TableCell>
      <TableCell className="pr-4 text-right tabular-nums">
        {money(m.volume)}
      </TableCell>
    </TableRow>
  ))
}

/** Merchants grouped by queue, in one table inside a TitledCard. */
export const Default: Story = {
  render: ({ colSpan, className }) => (
    <TitledCard title="Merchants by Queue" figure="5">
      <Table>
        <Head />
        <TableBody>
          {QUEUES.map((queue) => (
            <Fragment key={queue.name}>
              <TableGroupRow colSpan={colSpan} className={className}>
                {queue.name}
              </TableGroupRow>
              <Rows merchants={queue.merchants} />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TitledCard>
  ),
}

const PROSPECTS = [
  {
    name: "Northwind Payments",
    initials: "NP",
    merchants: QUEUES[0].merchants,
  },
  {
    name: "Blue Harbor Bank",
    initials: "BH",
    merchants: QUEUES[2].merchants,
  },
]

/**
 * A logo before the name and the group's total at the end. `className="pr-4"` puts the total on the last column's
 * line, as the cell pads only its start.
 */
export const WithLeadingAndTrailing: Story = {
  args: { className: "pr-4" },
  render: ({ colSpan, className }) => (
    <TitledCard title="Merchants by Prospect" figure="4">
      <Table>
        <Head />
        <TableBody>
          {PROSPECTS.map((prospect) => (
            <Fragment key={prospect.name}>
              <TableGroupRow
                colSpan={colSpan}
                className={className}
                leading={
                  <Avatar size="xs" shape="square" aria-hidden>
                    <AvatarFallback>{prospect.initials}</AvatarFallback>
                  </Avatar>
                }
                trailing={
                  <span className="tabular-nums">
                    {money(
                      prospect.merchants.reduce((sum, m) => sum + m.volume, 0)
                    )}
                  </span>
                }
              >
                {prospect.name}
              </TableGroupRow>
              <Rows merchants={prospect.merchants} />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TitledCard>
  ),
}

/** Buttons that act on the group sit at its end. */
export const WithButtons: Story = {
  args: { className: "pr-4" },
  render: ({ colSpan, className }) => (
    <TitledCard title="Merchants by Queue" figure="5">
      <Table>
        <Head />
        <TableBody>
          {QUEUES.map((queue) => (
            <Fragment key={queue.name}>
              <TableGroupRow
                colSpan={colSpan}
                className={className}
                trailing={
                  <>
                    <IconButton
                      label="Add Merchant"
                      aria-label={`Add Merchant to ${queue.name}`}
                      size="icon-xs"
                    >
                      <PlusIcon />
                    </IconButton>
                    <IconButton
                      label="Edit Queue"
                      aria-label={`Edit ${queue.name}`}
                      size="icon-xs"
                    >
                      <PencilIcon />
                    </IconButton>
                  </>
                }
              >
                {queue.name}
              </TableGroupRow>
              <Rows merchants={queue.merchants} />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TitledCard>
  ),
}
