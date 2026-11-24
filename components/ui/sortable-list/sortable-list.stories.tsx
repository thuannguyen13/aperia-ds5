import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { TrashIcon } from "lucide-react"
import { moveItem, SortableList, SortableRow } from "./sortable-list"
import { IconButton } from "../icon-button/icon-button"
import { Input } from "../input/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/table"
import { draftKey } from "@/lib/draft-key"
import { cn } from "@/lib/utils"

const meta: Meta<typeof SortableList> = {
  title: "Pattern Components/SortableList",
  // Shown on its pattern page's Code tab (site.ts), not in the sidebar or the Components index.
  component: SortableList,
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component:
          'A vertical list whose rows reorder by dragging their grip, or from the keyboard: Space on the grip picks a row up, the arrows move it, Space drops it and Escape puts it back, and each step is read out ("Demo dropped at position 2 of 5."). A held row lifts with the dragging shadow and stays within its list; Escape while holding never closes the sheet around it. `onMove(from, to)` gets the row\'s index before and after (`moveItem` applies it to an array). Each row is a `SortableRow`, which hands its element `row` props to spread and `handle(label)` to place. Rows added on a form take a `draftKey` so they keep their identity as they move. In a table, put the list in its own `TableBody`.',
      },
    },
  },
  argTypes: {
    ids: { control: false },
    name: { control: false },
    onMove: { control: false },
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof SortableList>

const STAGES = [
  { id: 1, name: "Lead", deals: 42 },
  { id: 2, name: "Discovery", deals: 18 },
  { id: 3, name: "Demo", deals: 11 },
  { id: 4, name: "Proposal", deals: 7 },
  { id: 5, name: "Negotiation", deals: 3 },
]

/** A pipeline's stages in a table, reordered in place. */
export const InATable: Story = {
  render: function Render() {
    const [rows, setRows] = useState(STAGES)
    return (
      <div className="w-[28rem] overflow-hidden surface">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10" />
              <TableHead>Stage</TableHead>
              <TableHead className="text-right">Deals</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <SortableList
              ids={rows.map((row) => row.id)}
              name={(id) => rows.find((row) => row.id === id)?.name ?? "Row"}
              onMove={(from, to) => setRows((was) => moveItem(was, from, to))}
            >
              {rows.map((stage) => (
                <SortableRow key={stage.id} id={stage.id}>
                  {(row, handle) => (
                    <TableRow {...row}>
                      <TableCell className="py-1 pl-2">
                        {handle(`Reorder ${stage.name}`)}
                      </TableCell>
                      <TableCell>{stage.name}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {stage.deals}
                      </TableCell>
                    </TableRow>
                  )}
                </SortableRow>
              ))}
            </SortableList>
          </TableBody>
        </Table>
      </div>
    )
  },
}

type Item = { key: string; title: string }

const START: Item[] = [
  "Collect the signed application",
  "Verify the business owner",
  "Order the terminal",
  "Schedule the training call",
].map((title) => ({ key: draftKey("item"), title }))

/** A task template's items on a form: each row edits in place, and new rows keep their key as they move. */
export const OnAForm: Story = {
  render: function Render() {
    const [items, setItems] = useState(START)
    return (
      <div className="flex w-[28rem] flex-col divide-y">
        <SortableList
          ids={items.map((item) => item.key)}
          name={(key) => {
            const at = items.findIndex((item) => item.key === key)
            return [`Item ${at + 1}`, items[at]?.title.trim()]
              .filter(Boolean)
              .join(", ")
          }}
          onMove={(from, to) => setItems((was) => moveItem(was, from, to))}
        >
          {items.map((item, index) => (
            <SortableRow key={item.key} id={item.key}>
              {(row, handle) => (
                <div
                  {...row}
                  className={cn("flex items-center gap-2 py-2", row.className)}
                >
                  {handle(`Reorder item ${index + 1}`)}
                  <span className="w-4 text-sm text-muted-foreground tabular-nums">
                    {index + 1}
                  </span>
                  <Input
                    aria-label={`Item ${index + 1}`}
                    value={item.title}
                    onChange={(event) =>
                      setItems((was) =>
                        was.map((each) =>
                          each.key === item.key
                            ? { ...each, title: event.target.value }
                            : each
                        )
                      )
                    }
                  />
                  <IconButton
                    label={`Remove item ${index + 1}`}
                    onClick={() =>
                      setItems((was) =>
                        was.filter((each) => each.key !== item.key)
                      )
                    }
                  >
                    <TrashIcon />
                  </IconButton>
                </div>
              )}
            </SortableRow>
          ))}
        </SortableList>
      </div>
    )
  },
}
