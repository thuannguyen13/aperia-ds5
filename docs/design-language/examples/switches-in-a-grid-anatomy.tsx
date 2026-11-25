import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "aperia-ds5"
import { Anatomy } from "../anatomy"
import { FlagSwitch } from "../recipes"

// The Anatomy drawing of the Switches in a Grid page: notification settings, one row per event and one column per
// channel, on a surface, with one switch locked. The part list lives in the page's Markdown; each part is marked in
// the order of that list.

const CHANNELS = ["In App", "Email", "Teams"]
const EVENTS = [
  "Prospect assigned to me",
  "Deal changed stage",
  "Mentioned in a note",
]

function GridDrawing() {
  const [on, setOn] = useState<Record<string, boolean>>({
    "0-0": true,
    "0-1": true,
    "1-0": true,
    "2-0": true,
    "2-1": true,
    "2-2": true,
  })
  return (
    <div className="w-[34rem] max-w-full overflow-hidden surface">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-3">Event</TableHead>
            {CHANNELS.map((channel) => (
              <TableHead key={channel} className="px-2.5">
                {channel}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {EVENTS.map((event, row) => (
            <TableRow key={event}>
              <TableCell className="pl-3">{event}</TableCell>
              {CHANNELS.map((channel, column) => {
                const key = `${row}-${column}`
                const locked = row === 2 && column === 1
                return (
                  <TableCell key={channel} className="px-2.5 py-0">
                    <FlagSwitch
                      on={Boolean(on[key])}
                      label={`${event}, ${channel}`}
                      reason={locked ? "Mentions always email you." : undefined}
                      onChange={(next) =>
                        setOn((was) => ({ ...was, [key]: next }))
                      }
                    />
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export const switchesInAGridAnatomy = (
  <Anatomy
    targets={{
      1: { selector: ".surface", side: "top", align: "start" },
      2: { selector: "thead th:nth-child(3)", side: "top" },
      3: { selector: "tbody tr:nth-child(2) td:first-child", side: "left" },
      4: {
        selector: "tbody tr:nth-child(2) td:nth-child(4) label",
        side: "right",
      },
      5: {
        selector: "tbody tr:nth-child(3) td:nth-child(3) label",
        side: "bottom",
      },
    }}
  >
    <GridDrawing />
  </Anatomy>
)
