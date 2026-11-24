import type { Meta, StoryObj } from "@storybook/react-vite"
import { ScrollTable } from "./scroll-table"
import { EmptyValue } from "../empty-value/empty-value"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/table"
import { TitledCard } from "../titled-card/titled-card"
import { formatDate, money } from "@/lib/format"

const meta: Meta<typeof ScrollTable> = {
  title: "Patterns/ScrollTable",
  component: ScrollTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A table that can be wider than its box, in a region that scrolls it sideways. A table with nothing to Tab to can't be scrolled from the keyboard, so the region takes focus and a name (`label`): Tab to it, then use the arrow keys. `className` styles the region, as `surface` does for a table on the page itself. Inside a `TitledCard` it needs no class.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg">
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Merchants",
  },
  argTypes: {
    label: { control: "text" },
    className: { control: "text" },
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof ScrollTable>

const MERCHANTS = [
  {
    name: "Lone Star Grocers",
    mid: "4450 1123 0098",
    mcc: "5411",
    city: "Austin, TX",
    boarded: "2026-03-14",
    volume: 312_400,
    chargebacks: 4,
    queue: "Chargeback Disputes",
  },
  {
    name: "Bayou Auto Parts",
    mid: "4450 1123 0142",
    mcc: "5533",
    city: "Baton Rouge, LA",
    boarded: "2026-06-02",
    volume: 98_750,
    chargebacks: 0,
    queue: null,
  },
  {
    name: "Pecan Street Coffee",
    mid: "4450 1123 0187",
    mcc: "5814",
    city: "San Antonio, TX",
    boarded: "2026-09-21",
    volume: 48_900,
    chargebacks: 1,
    queue: "Underwriting Review",
  },
]

function MerchantTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4">Merchant</TableHead>
          <TableHead>MID</TableHead>
          <TableHead>MCC</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Boarded</TableHead>
          <TableHead className="text-right">Monthly Volume</TableHead>
          <TableHead className="text-right">Chargebacks</TableHead>
          <TableHead className="pr-4">Queue</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {MERCHANTS.map((m) => (
          <TableRow key={m.mid}>
            <TableCell className="pl-4">{m.name}</TableCell>
            <TableCell className="tabular-nums">{m.mid}</TableCell>
            <TableCell className="tabular-nums">{m.mcc}</TableCell>
            <TableCell>{m.city}</TableCell>
            <TableCell className="tabular-nums">
              {formatDate(m.boarded)}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {money(m.volume)}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {m.chargebacks}
            </TableCell>
            <TableCell className="pr-4">{m.queue ?? <EmptyValue />}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

/** A table on the page itself: the region is the surface. Tab to it and scroll with the arrow keys. */
export const Default: Story = {
  args: { className: "surface" },
  render: (args) => (
    <ScrollTable {...args}>
      <MerchantTable />
    </ScrollTable>
  ),
}

/** In a card, the card is the surface and the region needs no class. */
export const InTitledCard: Story = {
  render: (args) => (
    <TitledCard title="Merchants" figure={MERCHANTS.length}>
      <ScrollTable {...args}>
        <MerchantTable />
      </ScrollTable>
    </TitledCard>
  ),
}
