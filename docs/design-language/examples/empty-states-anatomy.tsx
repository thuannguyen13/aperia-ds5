import { InboxIcon, PlusIcon } from "lucide-react"
import { Button, EmptyState } from "aperia-ds5"
import { Anatomy } from "../anatomy"
import { TitledCard } from "../recipes"

// The Anatomy drawing of the Empty States page: an empty Tasks card with its empty state inside, Add moved into the
// empty state. Each part is marked in the order of the part list in empty-states.md.

function EmptyCard() {
  return (
    <div className="w-[34rem] max-w-full">
      <TitledCard title="Tasks">
        <EmptyState
          icon={InboxIcon}
          title="No Tasks"
          description="No tasks assigned to you."
          action={
            <Button variant="outline">
              <PlusIcon />
              Add Task
            </Button>
          }
        />
      </TitledCard>
    </div>
  )
}

export const emptyStatesAnatomy = (
  <Anatomy
    targets={{
      1: { selector: "[data-slot=empty-icon]", side: "right" },
      2: { selector: "[data-slot=empty-title]", side: "left" },
      3: { selector: "[data-slot=empty-description]", side: "right" },
      4: { selector: "[data-slot=empty-content] button", side: "left" },
    }}
  >
    <EmptyCard />
  </Anatomy>
)
