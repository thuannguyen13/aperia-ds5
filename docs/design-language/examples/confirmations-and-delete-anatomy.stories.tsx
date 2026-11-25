import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Avatar,
  AvatarFallback,
  Badge,
  ConfirmDialog,
  PageHeader,
  RecordActions,
} from "aperia-ds5"

// A delete confirmation open over a record's page, drawn in its own frame for an Anatomy drawing (anatomy.tsx,
// `story`). The dialog renders in a portal, outside an inline drawing. Hidden from the sidebar.

const meta: Meta = {
  title: "Design Language/Examples/Anatomy Confirmations and Delete",
  tags: ["!dev", "!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

function RecordPage() {
  const [open, setOpen] = useState(true)
  // The drawing shows the dialog, so it opens once on load. It is the real dialog: Cancel closes it.
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
    <div className="p-6">
      <PageHeader
        title="Harbor Lane Bistro"
        subtitle="Restaurants, Pacific region"
        media={
          <Avatar size="xl" shape="square">
            <AvatarFallback>HL</AvatarFallback>
          </Avatar>
        }
        menu={
          <RecordActions onEdit={() => {}} onDelete={() => setOpen(true)} />
        }
        properties={[
          ["Owner", "Dana Whitfield"],
          ["Stage", <Badge variant="outline">Proposal</Badge>],
          ["Monthly Volume", "$1,850,000"],
        ]}
      />
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete Prospect?"
        action="Delete Prospect"
        onConfirm={() => {}}
      >
        This permanently deletes Harbor Lane Bistro and its 3 contacts.
      </ConfirmDialog>
    </div>
  )
}

/** A delete confirmation over a prospect's page: the dialog, its title, the consequence, Cancel, and the action. */
export const Confirmation: Story = {
  render: () => <RecordPage />,
}
