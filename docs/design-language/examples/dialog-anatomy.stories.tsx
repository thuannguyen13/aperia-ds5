import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  PageHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "aperia-ds5"

// A plain dialog open over a list page, drawn in its own frame for an Anatomy drawing (anatomy.tsx, `story`). The
// dialog and its overlay render in a portal, outside an inline drawing. Hidden from the sidebar.

const meta: Meta = {
  title: "Design Language/Examples/Anatomy Dialog",
  tags: ["!dev", "!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

const ROWS = [
  { name: "Northwind Payments", stage: "Proposal", ready: true },
  { name: "Harbor Lane Bistro", stage: "Negotiation", ready: true },
  { name: "Apex Digital Goods", stage: "Discovery", ready: false },
]

function ListPage() {
  const [open, setOpen] = useState(true)
  // The drawing shows the dialog, so it opens once on load. It is the real dialog: the close button closes it.
  useEffect(() => {
    // The open dialog takes the keyboard focus into this frame. Hand it back to the docs page around the frame.
    const release = setTimeout(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur()
      ;(window.frameElement as HTMLElement | null)?.blur()
    }, 100)
    return () => clearTimeout(release)
  }, [])
  return (
    // The dimmed page is one part of the drawing, so it sits inside a margin where its marker has room.
    <div
      className="m-10 h-[calc(100svh-5rem)] bg-background p-4"
      data-anatomy="1"
    >
      <PageHeader title="Prospects" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Review Import</DialogTitle>
            <DialogDescription>
              2 of 3 rows are ready to save. Fix the row marked Error, or skip
              it.
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Row</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.stage}</TableCell>
                  <TableCell>
                    {row.ready ? (
                      <Badge variant="outline">Ready</Badge>
                    ) : (
                      <Badge variant="destructive">Error</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button>Save 2 Rows</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/** A review dialog open over the Prospects list: the dimmed page, the panel, its title, description, rows, and buttons. */
export const Open: Story = {
  render: () => <ListPage />,
}
