import { PlusIcon } from "lucide-react"
import { Button, CardFooter } from "aperia-ds5"
import { Anatomy } from "../anatomy"
import { TitledCard } from "../recipes"
import { TaskTable } from "./shared"

// The Anatomy drawing of the Card page: the titled card recipe with a figure, an action, a table, and a footer. The
// part list lives in the page's Markdown; each part is marked in the order of that list.

function TasksCard() {
  return (
    <div className="w-[40rem] max-w-full">
      <TitledCard
        title="Tasks"
        figure="3"
        action={
          <Button variant="outline">
            <PlusIcon />
            Add
          </Button>
        }
      >
        <TaskTable />
        <CardFooter className="text-muted-foreground">
          Updated Nov 24, 2026
        </CardFooter>
      </TitledCard>
    </div>
  )
}

export const cardAnatomy = (
  <Anatomy
    targets={{
      1: { selector: "[data-slot=card-header]", side: "left" },
      2: { selector: "[data-slot=card-title]", side: "top" },
      3: { selector: "[data-slot=card-header] p", side: "top" },
      4: { selector: "[data-slot=card-action]", side: "top" },
      5: { selector: "[data-slot=table-container]", side: "left" },
      6: { selector: "[data-slot=card-footer]", side: "left" },
    }}
  >
    <TasksCard />
  </Anatomy>
)
