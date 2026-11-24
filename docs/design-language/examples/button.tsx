import {
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react"
import { Badge, Button } from "aperia-ds5"
import { DoDont, Example } from "../blocks"
import { Anatomy } from "../anatomy"
import { StateTable, forceState } from "../states"
import { IconButton } from "./shared"

// Every type, as the States table shows it: its variant, its name on the page, and a label it is used with.
const TYPES = [
  ["default", "Primary", "Save"],
  ["outline", "Outline", "Cancel"],
  ["ghost", "Ghost", "Clear"],
  ["destructive", "Destructive", "Delete"],
  ["link", "Link", "View All"],
  ["secondary", "Secondary", "Proposal"],
] as const

export const buttonExamples = {
  "@intro": (
    <Example>
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </Example>
  ),
  Primary: (
    <Example>
      <Button>Add Contact</Button>
      <Button>
        <PlusIcon />
        Add Task
      </Button>
    </Example>
  ),
  Outline: (
    <Example>
      <Button variant="outline">Cancel</Button>
      <Button variant="outline">
        <PencilIcon />
        Edit
      </Button>
      <Button variant="outline">Export</Button>
    </Example>
  ),
  Ghost: (
    <Example>
      <IconButton label="Edit Task">
        <PencilIcon />
      </IconButton>
      <IconButton label="Close">
        <XIcon />
      </IconButton>
      <Button variant="ghost">Clear</Button>
    </Example>
  ),
  Destructive: (
    <Example>
      <Button variant="destructive">
        <Trash2Icon />
        Delete
      </Button>
      <Button variant="destructive">Remove</Button>
    </Example>
  ),
  Link: (
    <Example>
      <Button variant="link">View All</Button>
    </Example>
  ),
  Secondary: (
    <Example>
      <Button variant="secondary" size="sm" className="rounded-full">
        Proposal
        <XIcon data-icon="inline-end" />
      </Button>
      <Button variant="secondary" size="sm" className="rounded-full">
        This Month
        <XIcon data-icon="inline-end" />
      </Button>
    </Example>
  ),
  Sizes: (
    <Example>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
    </Example>
  ),
  "Icon button": (
    <Example caption="Hover or focus a button to see its tooltip.">
      <IconButton label="Edit Task">
        <PencilIcon />
      </IconButton>
      <IconButton label="Delete Task">
        <Trash2Icon />
      </IconButton>
      <IconButton label="More Actions">
        <MoreHorizontalIcon />
      </IconButton>
    </Example>
  ),
  Anatomy: (
    <Anatomy zoom={2}>
      <Button data-anatomy="1" data-anatomy-side="bottom">
        <PlusIcon data-anatomy="3" data-icon="inline-start" />
        <span data-anatomy="2">Add Task</span>
      </Button>
    </Anatomy>
  ),
  States: (
    <StateTable
      states={["Default", "Hover", "Focus", "Pressed", "Disabled"]}
      rows={TYPES.map(([variant, label, text]) => ({
        label,
        cells: [
          <Button variant={variant}>{text}</Button>,
          <Button variant={variant} {...forceState("hover")}>
            {text}
          </Button>,
          <Button variant={variant} {...forceState("focus")}>
            {text}
          </Button>,
          <Button variant={variant} {...forceState("hover", "active")}>
            {text}
          </Button>,
          <Button variant={variant} disabled>
            {text}
          </Button>,
        ],
      }))}
      caption="Hover, Focus, and Pressed are drawn by each button's own state styles."
    />
  ),
  "Use one primary button per area": (
    <DoDont
      good={
        <>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </>
      }
      bad={
        <>
          <Button>Save and Add Another</Button>
          <Button>Save</Button>
        </>
      }
    />
  ),
  "Say why a button is disabled": (
    <DoDont
      good={
        <IconButton
          label="Delete Task"
          disabled
          reason="This item is in use and cannot be deleted."
        >
          <Trash2Icon />
        </IconButton>
      }
      goodNote="hover it: the tooltip says why"
      bad={<Button disabled>Save</Button>}
      badNote="no reason given"
    />
  ),
  "Give every icon button a tooltip": (
    <DoDont
      good={
        <IconButton label="Edit Task">
          <PencilIcon />
        </IconButton>
      }
      goodNote="hover it"
      bad={
        <Button aria-label="Edit Task">
          <PencilIcon />
        </Button>
      }
      badNote="no tooltip"
    />
  ),
  "Show a state as a badge, not a button": (
    <DoDont
      good={
        <>
          <Badge variant="secondary">Active</Badge>
          <Badge variant="destructive">Overdue</Badge>
        </>
      }
      bad={
        <>
          <Button size="xs">Active</Button>
          <Button size="xs">Overdue</Button>
        </>
      }
    />
  ),
}
