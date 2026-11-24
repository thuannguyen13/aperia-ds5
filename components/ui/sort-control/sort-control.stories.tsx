import { useState } from "react"
import { PlusIcon } from "lucide-react"
import { Button } from "../button/button"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { SortControl } from "./sort-control"
import { sortRows, UNSORTED, type SortField, type SortState } from "./sort"
import { TitledCard } from "../titled-card/titled-card"
import { EmptyValue } from "../empty-value/empty-value"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/table"
import { formatDate } from "@/lib/format"

const meta: Meta<typeof SortControl> = {
  title: "Patterns/SortControl",
  component: SortControl,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A list's one Sort: a field, then which way. It sits at the right end of `ListToolbar` (its `sort`), or alone in a card's header for a list inside a card. Column headings don't sort. Picking a field starts in that field's `starts` direction (highest or newest first for amounts and dates, A to Z otherwise), and the arrow flips it; in the list's own order the arrow stays, disabled with a reason, so nothing shifts. `sortRows(rows, fields, value)` sorts with the same fields: ties keep their order and an empty value sorts lowest.",
      },
    },
  },
  argTypes: {
    fields: { control: false },
    value: { control: false },
    onChange: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof SortControl>

type Queue = {
  id: number
  name: string
  open: number
  oldest: string | null
}

const QUEUES: Queue[] = [
  { id: 1, name: "Chargeback Review", open: 42, oldest: "2026-11-04" },
  { id: 2, name: "High-Risk Merchants", open: 7, oldest: "2026-11-19" },
  { id: 3, name: "Pricing Exceptions", open: 0, oldest: null },
  { id: 4, name: "Queue 10", open: 15, oldest: "2026-11-11" },
  { id: 5, name: "Queue 9", open: 15, oldest: "2026-11-15" },
]

const FIELDS: SortField<Queue>[] = [
  { value: "name", label: "Name", read: (row) => row.name },
  {
    value: "open",
    label: "Open Alerts",
    read: (row) => row.open,
    starts: "desc",
  },
  {
    value: "oldest",
    label: "Oldest Alert",
    read: (row) => row.oldest,
    starts: "asc",
  },
]

function Controlled({ initial = UNSORTED }: { initial?: SortState }) {
  const [value, setValue] = useState(initial)
  return <SortControl fields={FIELDS} value={value} onChange={setValue} />
}

/** The list's own order: the arrow is disabled, and its tooltip says to choose a field. */
export const Default: Story = {
  render: () => <Controlled />,
}

export const Sorted: Story = {
  render: () => <Controlled initial={{ by: "open", direction: "desc" }} />,
}

/**
 * A list inside a card has its Sort in the card's header, before Add when the card has one (see `WithAdd`). A queue with no open alerts has no oldest one: it
 * sorts lowest, so first when ascending.
 */
export const InACard: Story = {
  render: function Render() {
    const [value, setValue] = useState<SortState>({
      by: "oldest",
      direction: "asc",
    })
    return (
      <div className="w-full max-w-2xl">
        <TitledCard
          title="Detection Queues"
          figure={QUEUES.length}
          action={
            <SortControl
              fields={FIELDS}
              value={value}
              onChange={setValue}
              size="sm"
            />
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Queue</TableHead>
                <TableHead className="text-right">Open Alerts</TableHead>
                <TableHead className="pr-4">Oldest Alert</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortRows(QUEUES, FIELDS, value).map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="pl-4">{row.name}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.open}
                  </TableCell>
                  <TableCell className="pr-4 tabular-nums">
                    {row.oldest ? formatDate(row.oldest) : <EmptyValue />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TitledCard>
      </div>
    )
  },
}

/** A card whose list has both: Sort first, Add last, so Add keeps its place at the far end of every card. */
export const WithAdd: Story = {
  render: function Render() {
    const [value, setValue] = useState<SortState>({
      by: "oldest",
      direction: "asc",
    })
    return (
      <div className="w-full max-w-2xl">
        <TitledCard
          title="Detection Queues"
          figure={QUEUES.length}
          action={
            <>
              <SortControl
                fields={FIELDS}
                value={value}
                onChange={setValue}
                size="sm"
              />
              <Button variant="outline" size="sm">
                <PlusIcon />
                Add Queue
              </Button>
            </>
          }
        >
          <Table>
            <TableBody>
              {sortRows(QUEUES, FIELDS, value).map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="pl-4">{row.name}</TableCell>
                  <TableCell className="pr-4 text-right tabular-nums">
                    {row.open}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TitledCard>
      </div>
    )
  },
}
