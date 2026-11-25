import { useEffect, useRef, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  ListToolbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type FilterField,
  type FilterRule,
} from "aperia-ds5"
import { money } from "aperia-ds5/format"
import { filterRows } from "aperia-ds5/list"

// Advanced filters with the Filter button's popover open, drawn in its own frame for an Anatomy drawing (anatomy.tsx,
// `story`). Hidden from the sidebar.

const meta: Meta = {
  title: "Design Language/Examples/Anatomy Filters",
  tags: ["!dev", "!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

type Prospect = { id: number; name: string; stage: string; volume: number }

const PROSPECTS: Prospect[] = [
  { id: 1, name: "Northwind Payments", stage: "Proposal", volume: 4_200_000 },
  {
    id: 2,
    name: "Harbor Lane Bistro",
    stage: "Negotiation",
    volume: 1_850_000,
  },
  { id: 3, name: "Apex Digital Goods", stage: "Discovery", volume: 920_000 },
  { id: 4, name: "Coastline Tickets", stage: "Proposal", volume: 640_000 },
]

const FIELDS: FilterField<Prospect>[] = [
  { id: "name", label: "Name", type: "text", read: (row) => row.name },
  {
    id: "stage",
    label: "Stage",
    type: "enum",
    options: ["Discovery", "Proposal", "Negotiation"].map((stage) => ({
      value: stage,
      text: stage,
    })),
    read: (row) => row.stage,
  },
  {
    id: "volume",
    label: "Monthly Volume",
    type: "money",
    read: (row) => row.volume,
  },
]

function FilteredList() {
  const [query, setQuery] = useState("")
  const [rules, setRules] = useState<FilterRule[]>([
    { field: "stage", operator: "is", values: ["Proposal", "Negotiation"] },
    { field: "volume", operator: "gte", values: ["1000000"] },
  ])
  // The drawing shows the popover, so it opens once on load. It is the real popover: a change filters the rows.
  const root = useRef<HTMLDivElement>(null)
  const opened = useRef(false)
  useEffect(() => {
    if (opened.current) return
    opened.current = true
    root.current
      ?.querySelector<HTMLButtonElement>("button[aria-haspopup=dialog]")
      ?.click()
    // The open popover takes the keyboard focus into this frame. Hand it back to the docs page around the frame.
    const release = setTimeout(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur()
      ;(window.frameElement as HTMLElement | null)?.blur()
    }, 100)
    return () => clearTimeout(release)
  }, [])
  const rows = filterRows(
    PROSPECTS.filter((row) =>
      row.name.toLowerCase().includes(query.toLowerCase())
    ),
    FIELDS,
    rules
  )
  return (
    <div ref={root} className="flex flex-col gap-5 p-6">
      <ListToolbar
        search={{
          placeholder: "Search prospects",
          value: query,
          onChange: setQuery,
        }}
        filters={{ fields: FIELDS, value: rules, onChange: setRules }}
      />
      <div className="overflow-clip surface">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Name</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead className="pr-4 text-right">Monthly Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="pl-4">{row.name}</TableCell>
                <TableCell>{row.stage}</TableCell>
                <TableCell className="pr-4 text-right tabular-nums">
                  {money(row.volume)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

/** Advanced filters in a list's toolbar with the popover open: Stage is Proposal or Negotiation, Monthly Volume ≥ $1,000,000. */
export const Filters: Story = {
  render: () => <FilteredList />,
}
