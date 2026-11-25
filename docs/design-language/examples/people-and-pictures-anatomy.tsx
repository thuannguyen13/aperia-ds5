import { Avatar, AvatarFallback, AvatarImage } from "aperia-ds5"
import { Anatomy } from "../anatomy"
import { DoDont } from "../blocks"
import { PeopleStack, type StackPerson } from "../recipes"

// The Anatomy drawing of the People and Pictures page: an opportunity record's header and details, which show a
// company's picture, an owner, no assignee, and a stack of sales reps. Drawn inline, since the stack's card opens only
// on hover and is not part of the list. Each part is marked in the order of the part list in people-and-pictures.md.
// The rule examples of the page that are not in forms-and-values.tsx sit here too.

// An app's own colors, picked by each record's id; plain values here.
const TEAL = { fill: "oklch(0.93 0.05 190)", text: "oklch(0.42 0.08 190)" }
const AMBER = { fill: "oklch(0.95 0.06 85)", text: "oklch(0.48 0.1 70)" }
const VIOLET = { fill: "oklch(0.93 0.05 300)", text: "oklch(0.45 0.12 300)" }
const ROSE = { fill: "oklch(0.93 0.05 15)", text: "oklch(0.48 0.14 20)" }

const LOGO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="10" y="10" width="44" height="44" rx="12" fill="#0f766e"/><path d="M22 32h20M32 22v20" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>`
  )

const REPS: StackPerson[] = [
  { id: 11, name: "Maria Chen", role: "Primary", colors: TEAL },
  { id: 12, name: "James Ortiz", role: "Secondary", colors: AMBER },
  { id: 13, name: "Priya Raman", role: "Secondary", colors: VIOLET },
  { id: 14, name: "Tom Becker", role: "Sales Engineer", colors: ROSE },
  { id: 15, name: "Lena Novak", role: "Sales Engineer", colors: TEAL },
]

function Row({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-4 border-t border-border py-2.5 text-sm">
      <span className="w-28 shrink-0 text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}

function Record() {
  return (
    <div className="w-[28rem] surface px-4 pt-4 pb-1.5">
      <div className="mb-4 flex items-center gap-3">
        <Avatar size="xl" shape="square" data-anatomy="1">
          <AvatarImage src={LOGO} className="bg-white object-contain" />
          <AvatarFallback className="font-semibold">NM</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">Northwind Merchant Services</p>
          <p className="text-sm text-muted-foreground">Opportunity #659</p>
        </div>
      </div>
      <Row label="Owner">
        <span className="flex items-center gap-2">
          <Avatar size="sm" colors={TEAL} data-anatomy="2">
            <AvatarFallback className="font-semibold">DW</AvatarFallback>
          </Avatar>
          Dana Whitfield
        </span>
      </Row>
      <Row label="Assignee">
        <span className="flex items-center gap-2 text-muted-foreground">
          <Avatar size="sm" empty data-anatomy="3" />
          No assignee
        </span>
      </Row>
      <Row label="Sales Reps">
        <PeopleStack title="Sales Reps" empty="No sales rep" people={REPS} />
      </Row>
    </div>
  )
}

export const peopleAndPicturesAnatomy = (
  <Anatomy
    targets={{
      1: { selector: "[data-anatomy='1']", side: "left" },
      2: { selector: "[data-anatomy='2']", side: "left" },
      3: { selector: "[data-anatomy='3']", side: "left" },
      4: { selector: "button[aria-label^='Sales Reps']", side: "right" },
      5: { selector: "[data-slot=avatar-group-count]", side: "bottom" },
    }}
  >
    <div className="px-10 py-4">
      <Record />
    </div>
  </Anatomy>
)

// A record in the same place and with the same colors on two pages.
const Dana = ({
  colors = TEAL,
}: {
  colors?: { fill: string; text: string }
}) => (
  <span className="flex items-center gap-2">
    <Avatar size="sm" colors={colors}>
      <AvatarFallback className="font-semibold">DW</AvatarFallback>
    </Avatar>
    Dana Whitfield
  </span>
)

export const peopleAndPicturesExamples = {
  "Use one picture for a record everywhere": (
    <DoDont
      good={
        <div className="flex flex-col gap-3">
          <Dana />
          <Dana />
        </div>
      }
      bad={
        <div className="flex flex-col gap-3">
          <Dana />
          <Dana colors={ROSE} />
        </div>
      }
    />
  ),
  "Show no one as no one": (
    <DoDont
      good={
        <span className="flex items-center gap-3">
          <span className="text-muted-foreground">Assignee</span>
          <Avatar size="sm" empty />
          <span className="text-muted-foreground">No assignee</span>
        </span>
      }
      bad={
        <span className="flex items-center gap-3">
          <span className="text-muted-foreground">Assignee</span>
        </span>
      }
    />
  ),
}
