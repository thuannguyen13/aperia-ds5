import { PlusIcon } from "lucide-react"
import { Button, CardContent, PageHeader } from "aperia-ds5"
import { Anatomy } from "../anatomy"
import { DetailRow, DetailSection, StatTile, TitledCard } from "../recipes"
import { TaskTable } from "./shared"

// The Anatomy drawing of the Page Layout page: a record's page inside the page column, from its page header down. Each
// section is marked in the order of the part list in page-layout.md: the page header, the row of tiles, the main
// column, and the side column. The spacing between them is the page column's `gap-5`, and `gap-4` between cards.

const CONTACTS = ["Dana Whitfield", "Marcus Lee", "Priya Raman"]

function RecordPage() {
  return (
    <div className="flex w-[48rem] max-w-full flex-col gap-5">
      <PageHeader
        title="Northwind Payments"
        subtitle="Opportunity #659"
        actions={<Button>Send Proposal</Button>}
      />
      <div data-tiles className="grid grid-cols-3 gap-4">
        <StatTile label="Open Tasks" value="12" />
        <StatTile label="Overdue Tasks" value="3" />
        <StatTile label="Won This Quarter" value="$1,840,000" />
      </div>
      <div className="grid grid-cols-[3fr_1fr] gap-4">
        <div data-main className="flex min-w-0 flex-col gap-4">
          <TitledCard title="Details">
            <CardContent className="pb-4">
              <DetailSection>
                <DetailRow label="Owner">Dana Whitfield</DetailRow>
                <DetailRow label="Source">Partner referral</DetailRow>
              </DetailSection>
            </CardContent>
          </TitledCard>
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
          </TitledCard>
        </div>
        <div data-side className="flex min-w-0 flex-col gap-4 self-start">
          <TitledCard title="Contacts">
            <CardContent className="flex flex-col gap-2 pb-4">
              {CONTACTS.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </CardContent>
          </TitledCard>
        </div>
      </div>
    </div>
  )
}

export const pageLayoutAnatomy = (
  <Anatomy
    targets={{
      1: { selector: "[data-slot=page-header]", side: "left" },
      2: { selector: "[data-tiles]", side: "left" },
      3: { selector: "[data-main]", side: "left" },
      4: { selector: "[data-side]", side: "right" },
    }}
  >
    <RecordPage />
  </Anatomy>
)
