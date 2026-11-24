import type { ReactNode } from "react"
import { Unstyled } from "@storybook/addon-docs/blocks"
import { ChevronRightIcon, PlusIcon } from "lucide-react"
import {
  Badge,
  Button,
  CardContent,
  Field,
  FieldLabel,
  Input,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Label,
  RadioGroup,
  RadioGroupItem,
  ToggleGroup,
  ToggleGroupItem,
  TooltipProvider,
  openable,
} from "aperia-ds5"
import { cn } from "@/lib/utils"
import { DoDont } from "../blocks"
import { DetailRow, DetailSection } from "../recipes"
import { StateCards, forceState, useForcedStates } from "../states"
import { TitledCard } from "./shared"

// Live examples for Surfaces and Layers, keyed by the skill page's headings. Every fill here is a token class or a
// component's own classes; the layers are drawn from the real Card, Input, Button, Table and Badge.

// ─── Parts ────────────────────────────────────────────────────────────────

/** A layer's name and the class that draws it, under the part it names. */
function Caption({ name, token }: { name: string; token: string }) {
  return (
    <span className="flex flex-wrap items-baseline gap-x-1.5 text-xs text-muted-foreground">
      <span className="font-medium text-foreground">{name}</span>
      <code className="font-mono text-[11px]">{token}</code>
    </span>
  )
}

/** A menu open over the page, drawn with DropdownMenuContent's classes; the second row is highlighted. */
function Menu({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex w-36 flex-col rounded-lg bg-popover p-1 text-sm text-popover-foreground shadow-md ring-[0.5px] ring-border",
        className
      )}
    >
      <span className="rounded-md px-1.5 py-1">Edit Details</span>
      <span className="rounded-md bg-accent px-1.5 py-1 text-accent-foreground">
        Duplicate
      </span>
      <span className="rounded-md px-1.5 py-1">Archive</span>
    </div>
  )
}

const FILTERS = [
  { label: "Stage", value: "Proposal" },
  { label: "Owner", value: "Dana Whitfield" },
  { label: "Created", value: "Any" },
]

/** One filter line of a phone's filter sheet, with ListToolbar's row classes. */
function FilterLine({
  label,
  value,
  hover = false,
}: {
  label: string
  value: string
  hover?: boolean
}) {
  return (
    <button
      type="button"
      {...(hover ? forceState("hover") : {})}
      className="flex min-h-11 items-center gap-3 px-3 py-1.5 text-left text-sm outline-none hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
    >
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-medium">{label}</span>
        <span className="truncate text-muted-foreground">{value}</span>
      </span>
      <ChevronRightIcon className="size-4 text-muted-foreground" />
    </button>
  )
}

/** A sheet's panel (the page fill, the hairline edge and the Large shadow) titled at the top. */
function Panel({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "w-full max-w-64 rounded-xl bg-background text-left shadow-lg ring-[0.5px] ring-border",
        className
      )}
    >
      <div className="border-b px-4 py-3 text-base font-medium">{title}</div>
      <div className="flex flex-col p-4">{children}</div>
    </div>
  )
}

/** The phone's filter sheet: its lines on one surface, or loose on the panel. The second line is under the pointer. */
function FilterSheet({ onSurface }: { onSurface: boolean }) {
  useForcedStates()
  return (
    <Panel title="Filters">
      <div
        className={cn(
          "flex flex-col divide-y",
          onSurface && "overflow-hidden surface"
        )}
      >
        {FILTERS.map((filter, i) => (
          <FilterLine key={filter.label} {...filter} hover={i === 1} />
        ))}
      </div>
      <Button variant="ghost" className="mt-2 -ml-2.5 self-start">
        <PlusIcon data-icon="inline-start" />
        Add Filter
      </Button>
    </Panel>
  )
}

/** The layers of one screen, each named with the class that draws it. */
function Layers() {
  return (
    <div className="grid gap-5">
      <Caption name="Page" token="bg-background" />
      <div className="grid gap-2">
        <div className="relative">
          <TitledCard
            title="Details"
            action={<Button variant="outline">Edit</Button>}
          >
            <CardContent className="pb-4">
              <Field>
                <FieldLabel htmlFor="layers-owner">Owner</FieldLabel>
                <Input id="layers-owner" defaultValue="Dana Whitfield" />
              </Field>
            </CardContent>
          </TitledCard>
          {/* The Edit button's menu, open over the card. */}
          <Menu className="absolute top-12 right-3 z-10" />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <Caption name="Surface" token="surface" />
          <Caption name="Control" token="control" />
          <Caption name="Menu" token="bg-popover shadow-md" />
        </div>
      </div>
      <div className="grid gap-2">
        {/* A sheet over the page: the page's text under the overlay, then the panel above both. */}
        <div className="relative overflow-hidden rounded-lg p-3">
          <div className="absolute inset-0 grid content-start gap-2 p-3 text-xs">
            <span className="font-semibold">Prospects</span>
            <span>Northwind Payments</span>
            <span>Contoso Retail</span>
            <span>Fabrikam Foods</span>
          </div>
          <div className="absolute inset-0 bg-overlay" />
          <Panel title="Filters" className="relative ml-auto max-w-56">
            <div className="flex flex-col divide-y overflow-hidden surface">
              {FILTERS.slice(0, 2).map((filter) => (
                <FilterLine key={filter.label} {...filter} />
              ))}
            </div>
          </Panel>
        </div>
        <Caption name="Panel" token="bg-background shadow-lg over bg-overlay" />
      </div>
    </div>
  )
}

/** The same screen in a Light frame and a Dark frame, since every layer's fill changes with the mode. */
function LightDark({ children }: { children: ReactNode }) {
  const frame =
    "rounded-xl bg-background p-5 text-sm text-foreground ring-[0.5px] ring-border"
  return (
    <Unstyled>
      <TooltipProvider>
        <div className="my-4 grid gap-4 lg:grid-cols-2">
          {(["Light", "Dark"] as const).map((mode) => (
            <figure key={mode} className="min-w-0">
              <div className={mode === "Dark" ? `dark ${frame}` : frame}>
                {children}
              </div>
              <figcaption className="mt-2 text-sm text-muted-foreground">
                {mode}
              </figcaption>
            </figure>
          ))}
        </div>
      </TooltipProvider>
    </Unstyled>
  )
}

/** A billing card's values, straight in its content or inside a second box. */
function Billing({ boxed }: { boxed: boolean }) {
  const rows = (
    <DetailSection>
      <DetailRow label="Plan">Growth</DetailRow>
      <DetailRow label="Billing">Monthly</DetailRow>
      <DetailRow label="Seats">12</DetailRow>
    </DetailSection>
  )
  return (
    <TitledCard title="Billing" className="w-full max-w-72 text-left">
      <CardContent className="pb-4">
        {boxed ? <div className="surface p-3">{rows}</div> : rows}
      </CardContent>
    </TitledCard>
  )
}

// An app's own status pair (the amber from brand.example.css): the library ships no status colors.
const STATUS_AMBER = { backgroundColor: "#fbeed3", color: "#7a4c07" }

/** A record on a surface, its state shown by a badge or by filling the whole box. */
function Account({ filled }: { filled: boolean }) {
  return (
    <div
      className="flex w-full max-w-64 flex-col items-start gap-2 surface p-4 text-left"
      style={filled ? STATUS_AMBER : undefined}
    >
      <span className="font-semibold">Northwind Payments</span>
      <span className={filled ? undefined : "text-muted-foreground"}>
        Renewal due Dec 1
      </span>
      {!filled && <Badge style={STATUS_AMBER}>In Review</Badge>}
    </div>
  )
}

/** A dialog's foot: one primary action beside an outline one, or two primaries. */
function Actions({ twoPrimary }: { twoPrimary: boolean }) {
  return (
    <Panel title="Add Task" className="max-w-72">
      <p className="text-muted-foreground">Send the pricing proposal.</p>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <Button variant={twoPrimary ? "default" : "outline"}>
          {twoPrimary ? "Save and Add Another" : "Cancel"}
        </Button>
        <Button>Save</Button>
      </div>
    </Panel>
  )
}

const ACCOUNTS = ["Northwind Payments", "Contoso Retail", "Fabrikam Foods"]

/** Three table rows on a surface, the second drawn in one state by the table's own classes. */
function Rows({ state }: { state: "hover" | "selected" | "focus" }) {
  return (
    <div className="w-full overflow-hidden surface">
      <Table>
        <TableBody>
          {ACCOUNTS.map((name, i) => {
            const shown = i === 1
            return (
              <TableRow
                key={name}
                {...(shown && state === "focus"
                  ? {
                      ...openable(`Open ${name}`, () => {}),
                      ...forceState("focus"),
                    }
                  : {})}
                {...(shown && state === "hover" ? forceState("hover") : {})}
                data-state={
                  shown && state === "selected" ? "selected" : undefined
                }
              >
                <TableCell className="px-4">{name}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

/**
 * A sort panel drawn with the popover's own classes: its column list, then Ascending and Descending as a second group.
 * Good: two sections, each with the popover's 12px inset, and a line from edge to edge. Bad: one padded box with a
 * line stopped at the inset, which reads as one more row.
 */
function SortPanel({ sections }: { sections: boolean }) {
  const list = (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium">Sort By</p>
      <RadioGroup defaultValue="Name" aria-label="Sort by" className="gap-0">
        {["Default order", "Name", "Annual Volume"].map((label) => (
          <Label
            key={label}
            className="flex min-h-8 items-center gap-3 font-normal"
          >
            <RadioGroupItem value={label} />
            {label}
          </Label>
        ))}
      </RadioGroup>
    </div>
  )
  const direction = (
    <ToggleGroup
      type="single"
      variant="outline"
      spacing={0}
      value="asc"
      aria-label="Direction"
      className="w-full"
    >
      <ToggleGroupItem value="asc" className="flex-1">
        Ascending
      </ToggleGroupItem>
      <ToggleGroupItem value="desc" className="flex-1">
        Descending
      </ToggleGroupItem>
    </ToggleGroup>
  )
  return (
    <div className="w-60 rounded-lg bg-popover text-sm text-popover-foreground shadow-md ring-[0.5px] ring-border">
      {sections ? (
        <>
          <div className="p-3">{list}</div>
          <div className="border-t p-3">{direction}</div>
        </>
      ) : (
        <div className="flex flex-col gap-3 p-3">
          {list}
          <div className="border-t" />
          {direction}
        </div>
      )}
    </div>
  )
}

export const surfacesExamples = {
  "What is available": (
    <LightDark>
      <Layers />
    </LightDark>
  ),
  "States on a surface": (
    <StateCards
      className="md:grid-cols-2"
      items={[
        { label: "Hover", node: <Rows state="hover" /> },
        { label: "Selected", node: <Rows state="selected" /> },
        { label: "Focus on a row", node: <Rows state="focus" /> },
        { label: "Highlighted in a menu", node: <Menu /> },
      ]}
    />
  ),
  "Put a list of rows on a surface": (
    <DoDont
      good={<FilterSheet onSurface />}
      bad={<FilterSheet onSurface={false} />}
      goodNote="The filters on one surface, a hairline between rows."
      badNote="Rows loose on the sheet's gray fill, where the hover barely shows."
    />
  ),
  "Give each group one surface": (
    <DoDont
      good={<Billing boxed={false} />}
      bad={<Billing boxed />}
      goodNote="The card is the one frame."
      badNote="A surface inside the card."
    />
  ),
  "Run a line between groups edge to edge": (
    <DoDont
      good={<SortPanel sections />}
      bad={<SortPanel sections={false} />}
      goodNote="Two sections, the line from edge to edge."
      badNote="The line stops at the inset and reads as one more row."
    />
  ),
  "Show a status on a badge, not a filled area": (
    <DoDont
      good={<Account filled={false} />}
      bad={<Account filled />}
      goodNote="A neutral surface with a badge."
      badNote="The whole card in the status color."
    />
  ),
  "Let one element lead each area": (
    <DoDont
      good={<Actions twoPrimary={false} />}
      bad={<Actions twoPrimary />}
      goodNote="One primary action, the other in outline."
      badNote="Two primary buttons compete."
    />
  ),
}
