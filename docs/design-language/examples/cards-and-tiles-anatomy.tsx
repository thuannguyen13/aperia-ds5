import { PlusIcon } from "lucide-react"
import { Button, CardContent } from "aperia-ds5"
import { Anatomy } from "../anatomy"
import { StatTile, TitledCard } from "../recipes"
import { TaskTable } from "./shared"

// The Anatomy drawing of the Cards and Tiles page: the top of a record's page, a row of tiles with a main column of
// cards under it and a side column beside. The part list lives in the page's Markdown; each part is marked in the
// order of that list.

const CONTACTS = ["Dana Whitfield", "Marcus Lee", "Priya Raman"]

function CardsAndTiles() {
  return (
    <div className="flex w-[46rem] max-w-full flex-col gap-5">
      <div data-tiles className="grid grid-cols-3 gap-4">
        <StatTile label="Open Tasks" value="12" hint="3 due this week" />
        <StatTile label="Overdue Tasks" value="3" hint="Oldest was due 11/02" />
        <StatTile label="Won This Quarter" value="$1,840,000" />
      </div>
      <div className="grid grid-cols-[3fr_1fr] gap-4">
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
        <div data-side className="flex flex-col gap-4">
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

const FIRST = "[data-tiles] > div:first-child"

export const cardsAndTilesAnatomy = (
  <Anatomy
    targets={{
      1: { selector: FIRST, side: "top" },
      2: { selector: `${FIRST} > span:nth-child(1)`, side: "left" },
      3: { selector: `${FIRST} > span:nth-child(2)`, side: "left" },
      4: { selector: `${FIRST} > span:nth-child(3)`, side: "left" },
      5: {
        selector: "[data-slot=card]:not([data-side] *)",
        side: "bottom",
      },
      6: {
        selector: "[data-slot=card]:not([data-side] *) [data-slot=card-header]",
        side: "left",
      },
      7: {
        selector:
          "[data-slot=card]:not([data-side] *) [data-slot=table-container]",
        side: "left",
      },
      8: { selector: "[data-side]", side: "right" },
    }}
  >
    <CardsAndTiles />
  </Anatomy>
)
