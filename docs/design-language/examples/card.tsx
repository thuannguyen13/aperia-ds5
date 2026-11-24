import { PlusIcon } from "lucide-react"
import {
  Button,
  Card,
  CardContent,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "aperia-ds5"
import { DoDont, Example } from "../blocks"
import { StateCards, forceState } from "../states"
import { TaskTable, TitledCard, Wide } from "./shared"

const add = (
  <Button variant="outline">
    <PlusIcon />
    Add
  </Button>
)
const count = <span>3</span>

function Details() {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
      <div>
        <dt className="text-muted-foreground">Owner</dt>
        <dd>Dana Whitfield</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Stage</dt>
        <dd>Proposal</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Monthly Volume</dt>
        <dd className="tabular-nums">$4,200,000</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Next Step</dt>
        <dd>Pricing review</dd>
      </div>
    </dl>
  )
}

const note = (
  <CardContent className="pb-4 text-muted-foreground">
    Send the pricing proposal by Friday.
  </CardContent>
)

export const cardExamples = {
  // A collapsible card's states, each the real card: Focus marks the title's button with the focus state's own styles.
  States: (
    <StateCards
      items={[
        {
          label: "Open",
          node: (
            <TitledCard
              title="Tasks"
              figure={count}
              collapsible
              className="w-full"
            >
              {note}
            </TitledCard>
          ),
        },
        {
          label: "Closed",
          node: (
            <TitledCard
              title="Tasks"
              figure={count}
              collapsible
              defaultOpen={false}
              className="w-full"
            >
              {note}
            </TitledCard>
          ),
        },
        {
          label: "Focus",
          node: (
            <div {...forceState("focus")} className="w-full">
              <TitledCard title="Tasks" figure={count} collapsible>
                {note}
              </TitledCard>
            </div>
          ),
        },
      ]}
    />
  ),
  "@intro": (
    <Example>
      <Wide>
        <TitledCard title="Details">
          <CardContent className="pb-4">
            <Details />
          </CardContent>
        </TitledCard>
      </Wide>
    </Example>
  ),
  "Titled card": (
    <Example>
      <Wide>
        <TitledCard title="Tasks" figure={count} action={add}>
          <TaskTable />
        </TitledCard>
      </Wide>
    </Example>
  ),
  "Collapsible card": (
    <Example caption="Click the title to open and close it.">
      <Wide>
        <TitledCard title="Tasks" figure={count} collapsible>
          <TaskTable />
        </TitledCard>
      </Wide>
    </Example>
  ),
  "Head every card the same way": (
    <DoDont
      stack
      good={
        <Wide>
          <TitledCard title="Tasks" figure={count} action={add}>
            <TaskTable />
          </TitledCard>
        </Wide>
      }
      bad={
        <Wide>
          <Card>
            <CardContent className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Tasks (3)</h2>
              <Button className="w-fit">Add New Task</Button>
            </CardContent>
            <TaskTable />
          </Card>
        </Wide>
      }
      badNote="its own header, as large as a page title"
    />
  ),
  "Run a table to the card's edges": (
    <DoDont
      stack
      good={
        <Wide>
          <TitledCard title="Tasks" figure={count}>
            <TaskTable />
          </TitledCard>
        </Wide>
      }
      bad={
        <Wide>
          <TitledCard title="Tasks" figure={count}>
            <Separator />
            <div className="p-4">
              <div className="rounded-lg border">
                <TaskTable />
              </div>
            </div>
          </TitledCard>
        </Wide>
      }
      badNote="a line under the header and a box inside the card"
    />
  ),
  "Hide content with the title, not text buttons": (
    <DoDont
      good={
        <Wide>
          <TitledCard
            title="Tasks"
            figure={count}
            collapsible
            defaultOpen={false}
          >
            <TaskTable />
          </TitledCard>
        </Wide>
      }
      bad={
        <Wide>
          <TitledCard
            title="Tasks"
            figure={count}
            action={
              <Button variant="link" size="sm">
                Show
              </Button>
            }
          >
            {null}
          </TitledCard>
        </Wide>
      }
    />
  ),
  "Put tabs inside the card": (
    <DoDont
      good={
        <Wide>
          <TitledCard title="Activity">
            <CardContent className="pb-4">
              <Tabs defaultValue="notes">
                <TabsList>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="calls">Calls</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="notes"
                  className="pt-2 text-muted-foreground"
                >
                  Sent the revised pricing.
                </TabsContent>
                <TabsContent
                  value="calls"
                  className="pt-2 text-muted-foreground"
                >
                  Intro call with the CFO.
                </TabsContent>
              </Tabs>
            </CardContent>
          </TitledCard>
        </Wide>
      }
      bad={
        <Wide>
          <Tabs defaultValue="notes" className="gap-3">
            <TabsList>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="calls">Calls</TabsTrigger>
            </TabsList>
            <TabsContent value="notes">
              <TitledCard title="Activity">
                <CardContent className="pb-4 text-muted-foreground">
                  Sent the revised pricing.
                </CardContent>
              </TitledCard>
            </TabsContent>
          </Tabs>
        </Wide>
      }
      badNote="tabs floating above the card"
    />
  ),
}
