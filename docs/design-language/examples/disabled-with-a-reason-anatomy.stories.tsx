import { useEffect, useRef } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  ReasonTooltip,
  Select,
  SelectTrigger,
  SelectValue,
  describedBy,
  useFieldNote,
} from "aperia-ds5"
import { Trash2Icon } from "lucide-react"

// A task's page with a field that waits on another and a Delete that is blocked, the Delete's reason open, drawn in its
// own frame for an Anatomy drawing (anatomy.tsx, `story`). The reason is a tooltip, which renders in a portal outside an
// inline drawing. Hidden from the sidebar.

const meta: Meta = {
  title: "Design Language/Examples/Anatomy Disabled With a Reason",
  tags: ["!dev", "!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

function TaskPage() {
  const { describes, note } = useFieldNote({
    disabled: true,
    reason: "Pick a prospect first.",
  })
  const root = useRef<HTMLDivElement>(null)
  // The drawing shows the tooltip, so a tap opens it once on load (the tooltip stays open until a tap elsewhere). It is
  // the real tooltip.
  useEffect(() => {
    root.current?.querySelector<HTMLElement>("[tabindex='0']")?.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        pointerType: "touch",
      })
    )
    // Hand the keyboard focus back to the docs page around the frame.
    const release = setTimeout(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur()
      ;(window.frameElement as HTMLElement | null)?.blur()
    }, 100)
    return () => clearTimeout(release)
  }, [])
  return (
    <div ref={root} className="flex items-start gap-10 px-6 pt-16 pb-10">
      <FieldGroup className="w-72">
        <Field>
          <FieldLabel htmlFor="anatomy-prospect">Prospect</FieldLabel>
          <Input id="anatomy-prospect" readOnly placeholder="Pick a prospect" />
        </Field>
        <Field data-disabled>
          <FieldLabel htmlFor="anatomy-contact">Contact</FieldLabel>
          <Select disabled>
            <SelectTrigger
              id="anatomy-contact"
              className="w-full"
              aria-describedby={describedBy(describes)}
            >
              <SelectValue placeholder="Pick a contact" />
            </SelectTrigger>
          </Select>
          {note}
        </Field>
      </FieldGroup>
      <div className="pt-6">
        <ReasonTooltip reason="This item is in use and cannot be deleted.">
          <Button variant="destructive" disabled>
            <Trash2Icon />
            Delete Task
          </Button>
        </ReasonTooltip>
      </div>
    </div>
  )
}

/** A field that waits on another, with its note under it, and a blocked Delete with its reason open in a tooltip. */
export const DisabledWithAReason: Story = {
  render: () => <TaskPage />,
}
