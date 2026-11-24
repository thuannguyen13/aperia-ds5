import type { Meta, StoryObj } from "@storybook/react-vite"
import { EmptyValue, HiddenValue, NoneText } from "./empty-value"
import { DetailRow, DetailSection } from "../detail-section/detail-section"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/table"
import { TitledCard } from "../titled-card/titled-card"
import { money } from "@/lib/format"

const meta: Meta<typeof EmptyValue> = {
  title: "Patterns/EmptyValue",
  component: EmptyValue,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          '`EmptyValue` is a missing value: a muted em dash with no spaces around it, in tables, detail rows and headers alike, and different from 0. `NoneText` is an empty optional field where its value would show, "No [field]" in muted text. `HiddenValue` is an amount the viewer may not see: the shape of a figure ("$XX,XXX"), so a column keeps its width, read to a screen reader as "Amount hidden".',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof EmptyValue>

export const Default: Story = {}

export const None: Story = {
  render: () => <NoneText>No priority</NoneText>,
}

export const Hidden: Story = {
  render: () => <HiddenValue />,
}

const MERCHANTS = [
  {
    name: "Lone Star Grocers",
    mcc: "5411",
    volume: 312_400 as number | null,
    chargebacks: 4 as number | null,
    hidden: false,
  },
  {
    name: "Bayou Auto Parts",
    mcc: "5533",
    volume: null,
    chargebacks: 0,
    hidden: false,
  },
  {
    name: "Pecan Street Coffee",
    mcc: "5814",
    volume: 48_900,
    chargebacks: null,
    hidden: true,
  },
]

/** In a table: a dash where there is no value, 0 where there is one, and the figure's shape where it's hidden. */
export const InTable: Story = {
  render: () => (
    <div className="w-[36rem]">
      <TitledCard title="Merchants" figure="3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Merchant</TableHead>
              <TableHead>MCC</TableHead>
              <TableHead className="text-right">Chargebacks</TableHead>
              <TableHead className="pr-4 text-right">Monthly Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MERCHANTS.map((m) => (
              <TableRow key={m.name}>
                <TableCell className="pl-4">{m.name}</TableCell>
                <TableCell className="tabular-nums">{m.mcc}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {m.chargebacks === null ? <EmptyValue /> : m.chargebacks}
                </TableCell>
                <TableCell className="pr-4 text-right tabular-nums">
                  {m.hidden ? (
                    <HiddenValue />
                  ) : m.volume === null ? (
                    <EmptyValue />
                  ) : (
                    money(m.volume)
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TitledCard>
    </div>
  ),
}

/** In detail rows: a missing value is a dash, an empty optional pick reads "No [field]". */
export const InDetails: Story = {
  render: () => (
    <div className="w-96">
      <DetailSection title="Details">
        <DetailRow label="Company">Northwind Payments</DetailRow>
        <DetailRow label="Website">
          <EmptyValue />
        </DetailRow>
        <DetailRow label="Priority">
          <NoneText>No priority</NoneText>
        </DetailRow>
        <DetailRow label="Annual Volume">
          <HiddenValue />
        </DetailRow>
      </DetailSection>
    </div>
  ),
}
