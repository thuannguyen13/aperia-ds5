import { useEffect, useRef } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Badge,
  Button,
  Checkbox,
  PageHeader,
  RecordActions,
  TooltipProvider,
} from "aperia-ds5"
import {
  ArchiveIcon,
  CheckIcon,
  MailIcon,
  PencilIcon,
  PlusIcon,
} from "lucide-react"
import { IconButton, TitledCard } from "../recipes"

// A record's page with its actions and a card with its Add, with the More actions menu open, drawn in its own frame for
// an Anatomy drawing (anatomy.tsx, `story`). The frame is 1024px wide because RecordActions shows its buttons only from
// `--breakpoint-lg`. Hidden from the sidebar.

const meta: Meta = {
  title: "Design Language/Examples/Anatomy Buttons and Actions",
  tags: ["!dev", "!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

const TASKS = ["Send the pricing proposal", "Review the signed agreement"]

function RecordWithActions() {
  // The drawing shows the menu, so it opens once on load. Radix opens a menu on the trigger's pointer down.
  const root = useRef<HTMLDivElement>(null)
  const opened = useRef(false)
  useEffect(() => {
    if (opened.current) return
    opened.current = true
    root.current
      ?.querySelector<HTMLButtonElement>('button[aria-label="More actions"]')
      ?.dispatchEvent(
        new PointerEvent("pointerdown", {
          bubbles: true,
          button: 0,
          ctrlKey: false,
        })
      )
    // The open menu takes the keyboard focus into this frame. Hand it back to the docs page around the frame.
    const release = setTimeout(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur()
      ;(window.frameElement as HTMLElement | null)?.blur()
    }, 100)
    return () => clearTimeout(release)
  }, [])
  return (
    <TooltipProvider>
      <div ref={root} className="flex flex-col gap-6 py-6 pr-16 pl-6">
        <PageHeader
          title="Northwind Payments"
          subtitle="Opportunity #659 · Card issuing"
          actions={<Button>Send Proposal</Button>}
          menu={
            <RecordActions
              onEdit={() => {}}
              onDelete={() => {}}
              actions={[
                { label: "Send Email", icon: MailIcon, onSelect: () => {} },
                { label: "Mark as Won", icon: CheckIcon, onSelect: () => {} },
                {
                  label: "Close as Lost",
                  icon: ArchiveIcon,
                  onSelect: () => {},
                  destructive: true,
                },
              ]}
            />
          }
          properties={[
            ["Owner", "Dana Whitfield"],
            ["Stage", <Badge variant="outline">Proposal</Badge>],
            ["Monthly Volume", "$4,200,000"],
          ]}
        />
        <TitledCard
          title="Tasks"
          action={
            <Button variant="outline">
              <PlusIcon />
              Add Task
            </Button>
          }
        >
          <ul className="divide-y divide-border">
            {TASKS.map((task) => (
              <li key={task} className="flex items-center gap-3 px-4 py-2">
                <Checkbox aria-label={task} />
                <span className="flex-1 text-sm">{task}</span>
                <IconButton label={`Edit ${task}`} size="icon-sm">
                  <PencilIcon />
                </IconButton>
              </li>
            ))}
          </ul>
        </TitledCard>
      </div>
    </TooltipProvider>
  )
}

/** A record's page: Send Proposal, Edit and Send Email as buttons, the More actions menu open, and a card with Add. */
export const Record: Story = {
  render: () => <RecordWithActions />,
}
