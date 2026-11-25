import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  PageHeader,
  RecordActions,
} from "aperia-ds5"
import { CheckIcon } from "lucide-react"
import { Anatomy } from "../anatomy"
import { PeopleStack, type StackPerson } from "../recipes"

// The Anatomy drawing of the Page Header page: a record's header with every part, drawn inline since nothing opens a
// panel. Each part is marked in the order of the part list in page-header.md. The parts are found by their place in the
// header: its title line holds the picture, the title block, the actions, and the record actions, in that order.

const TEAL = { fill: "oklch(0.93 0.05 190)", text: "oklch(0.42 0.08 190)" }
const AMBER = { fill: "oklch(0.95 0.06 85)", text: "oklch(0.48 0.1 70)" }

const REPS: StackPerson[] = [
  { id: 11, name: "Maria Chen", role: "Primary", colors: TEAL },
  { id: 12, name: "James Ortiz", role: "Secondary", colors: AMBER },
]

const LINE = "[data-slot=page-header] > div"

export const pageHeaderAnatomy = (
  <Anatomy
    targets={{
      1: { selector: `${LINE} > :nth-child(1)`, side: "left" },
      2: {
        selector: "[data-slot=page-header] h1",
        side: "top",
        align: "start",
      },
      3: { selector: "[data-slot=page-header] h1 + div", side: "bottom" },
      4: { selector: `${LINE} > :nth-child(3)`, side: "top" },
      5: { selector: `${LINE} > :nth-child(4)`, side: "top" },
      6: {
        selector: "[data-slot=page-header] dl",
        side: "bottom",
        align: "start",
      },
      7: {
        selector: "[data-slot=page-header] dl button",
        side: "bottom",
      },
    }}
  >
    <div className="w-[52rem] max-w-full">
      <PageHeader
        title="Northwind Payments"
        subtitle="Opportunity #659 · Card issuing"
        media={
          <Avatar size="xl" shape="square">
            <AvatarFallback>NP</AvatarFallback>
          </Avatar>
        }
        actions={<Button>Send Proposal</Button>}
        menu={
          <RecordActions
            onEdit={() => {}}
            onDelete={() => {}}
            actions={[
              { label: "Mark as Won", icon: CheckIcon, onSelect: () => {} },
            ]}
          />
        }
        properties={[
          ["Owner", "Dana Whitfield"],
          ["Stage", <Badge variant="outline">Proposal</Badge>],
          [
            "Sales Reps",
            <PeopleStack
              key="reps"
              title="Sales Reps"
              empty="No sales rep"
              people={REPS}
            />,
          ],
          ["Monthly Volume", "$4,200,000"],
        ]}
      />
    </div>
  </Anatomy>
)
