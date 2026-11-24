import { CircleAlertIcon, InboxIcon, PlusIcon, SearchIcon } from "lucide-react"
import { Button } from "aperia-ds5"
import { DoDont, Example } from "../blocks"
import { EmptyState, TitledCard, Wide } from "./shared"

function InCard({
  children,
  title = "Tasks",
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <Wide>
      <TitledCard title={title}>{children}</TitledCard>
    </Wide>
  )
}

const addTask = (
  <Button variant="outline">
    <PlusIcon />
    Add Task
  </Button>
)

export const emptyStateExamples = {
  "An empty container": (
    <>
      <Example>
        <InCard>
          <EmptyState
            icon={InboxIcon}
            title="No Tasks"
            description="No tasks assigned to you."
            action={addTask}
          />
        </InCard>
      </Example>
      <Example>
        <InCard>
          <EmptyState
            icon={CircleAlertIcon}
            title="Failed to Load"
            action={<Button variant="outline">Try Again</Button>}
          />
        </InCard>
      </Example>
    </>
  ),
  "No matches": (
    <Example>
      <InCard title="Prospects">
        <EmptyState
          icon={SearchIcon}
          title="No Results"
          description="No matching results."
          action={<Button variant="outline">Clear Filters</Button>}
        />
      </InCard>
    </Example>
  ),
  "Say only what helps": (
    <DoDont
      good={
        <InCard>
          <EmptyState icon={InboxIcon} title="No Tasks" />
        </InCard>
      }
      bad={
        <InCard>
          <EmptyState
            icon={InboxIcon}
            title="No Tasks"
            description="No tasks yet."
          />
        </InCard>
      }
      badNote="the line repeats the title"
    />
  ),
  "Use the empty state, never bare text": (
    <DoDont
      good={
        <InCard>
          <EmptyState icon={InboxIcon} title="No Tasks" />
        </InCard>
      }
      bad={
        <InCard>
          <p className="px-4 pb-4 text-muted-foreground">No data</p>
        </InCard>
      }
    />
  ),
  "Leave out permission hints": (
    <DoDont
      good={
        <InCard>
          <EmptyState icon={InboxIcon} title="No Tasks" />
        </InCard>
      }
      bad={
        <InCard>
          <EmptyState
            icon={InboxIcon}
            title="No Tasks"
            description="Ask your administrator for access to see tasks."
          />
        </InCard>
      }
    />
  ),
}
