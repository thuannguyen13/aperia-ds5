import { useEffect, useState, useTransition } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "../badge/badge"
import { Button } from "../button/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "../field/field"
import { FormSection } from "../form-section/form-section"
import { Input } from "../input/input"
import { FormSheet, SheetForm } from "../sheet-form/sheet-form"
import { useSheet } from "../sheet-form/use-sheet"
import { useSheetForm, type FormSchema } from "../sheet-form/use-sheet-form"
import { EntityPicker, type EntityItem } from "./entity-picker"
import type { EntityPicture } from "./entity-picture"
import { useAdded, type PickerAdd } from "./use-picker-add"

// An app's own colors, fixed by the record's id; plain values here.
const PAIRS = [
  { fill: "oklch(0.93 0.05 190)", text: "oklch(0.42 0.08 190)" },
  { fill: "oklch(0.93 0.05 250)", text: "oklch(0.45 0.12 250)" },
  { fill: "oklch(0.94 0.05 80)", text: "oklch(0.48 0.1 70)" },
  { fill: "oklch(0.93 0.04 320)", text: "oklch(0.45 0.1 320)" },
]
const colorsOf = (id: number) => PAIRS[id % PAIRS.length]

// A logo with a transparent ground: it sits on white, so it shows in Dark too.
const logo = (color: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="${color}"/><path d="M20 34h24M32 22v24" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>`
  )

type Prospect = {
  id: number
  name: string
  acronym: string
  city: string
  logo?: string
  customer?: boolean
}

const PROSPECTS: Prospect[] = [
  {
    id: 1,
    name: "First National Bank",
    acronym: "FNB",
    city: "Omaha, NE",
    logo: logo("#0f766e"),
  },
  {
    id: 2,
    name: "Harbor Freight Payments",
    acronym: "HFP",
    city: "Chicago, IL",
    customer: true,
  },
  { id: 3, name: "Lakeview Credit Union", acronym: "LCU", city: "Madison, WI" },
  {
    id: 4,
    name: "Summit Merchant Services",
    acronym: "SMS",
    city: "Denver, CO",
    logo: logo("#1d4ed8"),
  },
  {
    id: 5,
    name: "Coastal Commerce Group",
    acronym: "CCG",
    city: "Tampa, FL",
    customer: true,
  },
  {
    id: 6,
    name: "Prairie State Processing",
    acronym: "PSP",
    city: "Springfield, IL",
  },
]

// The app's one adapter from a record to its picture: a company is square, its logo or else its monogram.
const companyPicture = (prospect: Prospect): EntityPicture => ({
  shape: "square",
  src: prospect.logo ?? null,
  fallback: prospect.acronym,
  colors: colorsOf(prospect.id),
})

const prospectItems = (list: Prospect[]): EntityItem[] =>
  list.map((prospect) => ({
    id: prospect.id,
    name: prospect.name,
    picture: companyPicture(prospect),
    detail: prospect.city,
    badge: prospect.customer ? "Customer" : undefined,
  }))

const PEOPLE = [
  { id: 11, name: "Maria Chen", role: "Sales Director", team: "Enterprise" },
  {
    id: 12,
    name: "Dana Whitfield",
    role: "Account Executive",
    team: "Enterprise",
  },
  {
    id: 13,
    name: "Luis Ortega",
    role: "Account Executive",
    team: "Mid-Market",
  },
  { id: 14, name: "Priya Raman", role: "Sales Engineer", team: "Mid-Market" },
  {
    id: 15,
    name: "Tom Becker",
    role: "Account Executive",
    team: "Mid-Market",
    away: true,
  },
]

// A person is a circle: their photo, else their initials.
const personItem = (person: (typeof PEOPLE)[number]): EntityItem => ({
  id: person.id,
  name: person.name,
  picture: { colors: colorsOf(person.id) },
  detail: person.role,
  disabled: person.away,
  reason: person.away ? "Away until Dec 1. Pick someone else." : undefined,
})

const PRODUCTS: EntityItem[] = [
  {
    id: 21,
    name: "Ask Nanci",
    picture: { shape: "square", fallback: "AN", colors: colorsOf(1) },
  },
  {
    id: 22,
    name: "Merchant Portal",
    picture: { shape: "square", fallback: "MP", colors: colorsOf(2) },
  },
  {
    id: 23,
    name: "Chargeback Shield",
    picture: { shape: "square", fallback: "CS", colors: colorsOf(3) },
  },
  {
    id: 24,
    name: "Payout Insights",
    picture: { shape: "square", fallback: "PI", colors: colorsOf(0) },
  },
  {
    id: 25,
    name: "Risk Monitor",
    picture: { shape: "square", fallback: "RM", colors: colorsOf(1) },
  },
]

/** A labeled field around the picker, as an app writes it. */
function Labeled({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <Field data-invalid={Boolean(error)} className="w-[28rem] max-w-full">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {children}
      <FieldError>{error}</FieldError>
    </Field>
  )
}

const meta: Meta<typeof EntityPicker> = {
  title: "Patterns/EntityPicker",
  component: EntityPicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Every field that picks a record: a person, a company, a product. Type to narrow the list (case, accents and punctuation aside); each row shows the record's picture (`Avatar`, square for companies and products), its name, a line of detail and a badge. One record by default, its id as a string; `multiple` picks several as chips. A disabled row says why on hover (`reason`); a chip that can't be taken off says why too (`kept`). A disabled field says why under it. `clearable` makes an optional pick, whose placeholder reads \"No [field]\". With `add`, the list ends in an Add row that opens the record's own form in a sheet over this one, starts it with what was typed, and picks the new record once the list holds it. Short fixed lists, such as a stage, are a `PickField`.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof EntityPicker>

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState("1")
    return (
      <Labeled id="opportunity-prospect" label="Prospect">
        <EntityPicker
          id="opportunity-prospect"
          items={prospectItems(PROSPECTS)}
          value={value}
          placeholder="Pick a prospect"
          onChange={setValue}
        />
      </Labeled>
    )
  },
}

export const People: Story = {
  name: "People, Optional",
  render: function Render() {
    const [value, setValue] = useState("")
    return (
      <Labeled id="request-assignee" label="Assignee (Optional)">
        <EntityPicker
          id="request-assignee"
          items={PEOPLE.map(personItem)}
          value={value}
          placeholder="No assignee"
          clearable
          onChange={setValue}
        />
      </Labeled>
    )
  },
}

export const Grouped: Story = {
  render: function Render() {
    const [value, setValue] = useState("")
    const teams = ["Enterprise", "Mid-Market"]
    return (
      <Labeled id="deal-owner" label="Owner">
        <EntityPicker
          id="deal-owner"
          groups={teams.map((team) => ({
            value: team,
            items: PEOPLE.filter((person) => person.team === team).map(
              personItem
            ),
          }))}
          value={value}
          placeholder="Pick an owner"
          onChange={setValue}
        />
      </Labeled>
    )
  },
}

export const Several: Story = {
  render: function Render() {
    const [value, setValue] = useState<number[]>([21, 23])
    // A product with line items on the opportunity stays until they're removed.
    const items = PRODUCTS.map((product) =>
      product.id === 21
        ? { ...product, kept: "This item is in use and cannot be removed." }
        : product
    )
    return (
      <Labeled id="opportunity-products" label="Products">
        <EntityPicker
          multiple
          id="opportunity-products"
          items={items}
          value={value}
          placeholder="Pick products"
          onChange={setValue}
        />
      </Labeled>
    )
  },
}

export const WithBadges: Story = {
  name: "Status Badges",
  render: function Render() {
    const [value, setValue] = useState("")
    // A status keeps the app's own colors, so it comes in as a badge, not a color name.
    const queues: EntityItem[] = [
      {
        id: 31,
        name: "Onboarding",
        detail: "12 open",
        badge: (
          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
            Active
          </Badge>
        ),
      },
      {
        id: 32,
        name: "Disputes",
        detail: "4 open",
        badge: (
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
            Paused
          </Badge>
        ),
      },
      {
        id: 33,
        name: "Renewals",
        detail: "None open",
        badge: "Archived",
        disabled: true,
        reason: "Archived queues cannot take requests.",
      },
    ]
    return (
      <Labeled id="request-queue" label="Queue">
        <EntityPicker
          id="request-queue"
          items={queues}
          value={value}
          placeholder="Pick a queue"
          onChange={setValue}
        />
      </Labeled>
    )
  },
}

export const DisabledWithReason: Story = {
  name: "Disabled With a Reason",
  render: () => (
    <Labeled id="request-contact" label="Contact">
      <EntityPicker
        id="request-contact"
        items={[]}
        value=""
        placeholder="Pick a contact"
        disabled
        reason="Pick a prospect first."
        onChange={() => {}}
      />
    </Labeled>
  ),
}

export const Invalid: Story = {
  name: "Error",
  render: function Render() {
    const [value, setValue] = useState("")
    return (
      <Labeled
        id="opportunity-prospect-error"
        label="Prospect"
        error={value ? undefined : "Pick a prospect."}
      >
        <EntityPicker
          id="opportunity-prospect-error"
          items={prospectItems(PROSPECTS)}
          value={value}
          placeholder="Pick a prospect"
          invalid={!value}
          onChange={setValue}
        />
      </Labeled>
    )
  },
}

export const Empty: Story = {
  name: "Empty List",
  render: () => (
    <Labeled id="opportunity-template" label="Template (Optional)">
      <EntityPicker
        id="opportunity-template"
        items={[]}
        value=""
        placeholder="No template"
        clearable
        description="No task templates yet. Add them in Settings."
        onChange={() => {}}
      />
    </Labeled>
  ),
}

// --- Add from the picker -------------------------------------------------------------------------------------------

type NewProspect = { name: string; city: string }

const prospectSchema: FormSchema<NewProspect> = {
  safeParse(input) {
    const value = input as NewProspect
    const issues: { path: PropertyKey[]; message: string }[] = []
    if (!value.name.trim())
      issues.push({ path: ["name"], message: "Enter the prospect's name." })
    return issues.length > 0
      ? { success: false, error: { issues } }
      : { success: true, data: value }
  },
}

const wait = (ms: number) => new Promise((done) => setTimeout(done, ms))

/**
 * The app's one prospect form, the same one its Prospects page adds with. `useAdded` starts the name with what was
 * typed in the picker, and hands the new id back to the picker after the save. `save` stands in for the server action.
 */
function ProspectForm({
  save,
  onDone,
}: {
  save: (
    prospect: NewProspect
  ) => Promise<
    { ok: true; id: number } | { ok: false; error: string; field?: string }
  >
  onDone?: () => void
}) {
  const added = useAdded()
  const form = useSheetForm<NewProspect>({ name: added.name, city: "" })
  const { draft, set, errors, check } = form
  const [pending, startTransition] = useTransition()

  function submit() {
    const parsed = check(prospectSchema, draft)
    if (!parsed) return
    startTransition(async () => {
      const result = await save(parsed)
      if (result.ok) added.then(onDone)(result)
      else form.refused(result)
    })
  }

  return (
    <SheetForm
      form={form}
      onSubmit={submit}
      pending={pending}
      submit="Add Prospect"
      ready={Boolean(draft.name.trim())}
    >
      <FormSection title="Details">
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor="prospect-name">Name</FieldLabel>
          <Input
            id="prospect-name"
            autoFocus
            placeholder="e.g. First National Bank"
            value={draft.name}
            aria-invalid={Boolean(errors.name)}
            onChange={(event) => set("name", event.target.value)}
          />
          <FieldError>{errors.name}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="prospect-city">City (Optional)</FieldLabel>
          <Input
            id="prospect-city"
            placeholder="e.g. Omaha, NE"
            value={draft.city}
            onChange={(event) => set("city", event.target.value)}
          />
        </Field>
      </FormSection>
    </SheetForm>
  )
}

/** The page's list of prospects, which a save adds to, as the app's refreshed data would. */
function useProspects() {
  const [prospects, setProspects] = useState(PROSPECTS)
  const save = async ({ name, city }: NewProspect) => {
    await wait(900)
    if (
      prospects.some(
        (each) => each.name.toLowerCase() === name.trim().toLowerCase()
      )
    )
      return {
        ok: false as const,
        error: "A prospect with this name already exists.",
        field: "name",
      }
    const id = Math.max(...prospects.map((each) => each.id)) + 1
    const acronym = name
      .split(/\s+/)
      .map((word) => word[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 3)
    setProspects((list) => [...list, { id, name: name.trim(), acronym, city }])
    return { ok: true as const, id }
  }
  const add: PickerAdd = {
    label: "Add Prospect",
    form: <ProspectForm save={save} />,
  }
  return { prospects, add }
}

export const AddFromPicker: Story = {
  name: "Add From the Picker",
  parameters: {
    docs: {
      description: {
        story:
          'Type a name that isn\'t listed, then pick Add Prospect: the prospect form opens in a sheet with that name, and the new prospect is picked once saved. Try "First National Bank" for a refusal in place.',
      },
    },
  },
  render: function Render() {
    const { prospects, add } = useProspects()
    const [value, setValue] = useState("")
    return (
      <Labeled id="opportunity-prospect-add" label="Prospect">
        <EntityPicker
          id="opportunity-prospect-add"
          items={prospectItems(prospects)}
          value={value}
          placeholder="Pick a prospect"
          add={add}
          onChange={setValue}
        />
      </Labeled>
    )
  },
}

export const InASheet: Story = {
  name: "In a Sheet",
  parameters: {
    docs: {
      description: {
        story:
          "Pickers in an Add Opportunity sheet. The list scrolls and Escape closes it without closing the sheet; Add Prospect opens a second sheet over the first, which keeps what was typed.",
      },
    },
  },
  render: function Render() {
    const { prospects, add } = useProspects()
    const sheet = useSheet(null)
    const [prospect, setProspect] = useState("")
    const [products, setProducts] = useState<number[]>([])
    const [owner, setOwner] = useState("")
    // Open on load, so the story shows the sheet.
    useEffect(() => sheet.show(null), [])
    const form = useSheetForm({})
    return (
      <>
        <Button variant="outline" onClick={() => sheet.show(null)}>
          Add Opportunity
        </Button>
        <FormSheet
          open={sheet.open}
          onOpenChange={sheet.onOpenChange}
          title="Add Opportunity"
        >
          <SheetForm
            form={form}
            onSubmit={() => sheet.onOpenChange(false)}
            pending={false}
            submit="Add Opportunity"
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="sheet-prospect">Prospect</FieldLabel>
                <EntityPicker
                  id="sheet-prospect"
                  items={prospectItems(prospects)}
                  value={prospect}
                  placeholder="Pick a prospect"
                  add={add}
                  onChange={setProspect}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="sheet-products">Products</FieldLabel>
                <EntityPicker
                  multiple
                  id="sheet-products"
                  items={PRODUCTS}
                  value={products}
                  placeholder="Pick products"
                  onChange={setProducts}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="sheet-owner">Owner</FieldLabel>
                <EntityPicker
                  id="sheet-owner"
                  items={PEOPLE.map(personItem)}
                  value={owner}
                  placeholder="Pick an owner"
                  onChange={setOwner}
                />
              </Field>
            </FieldGroup>
          </SheetForm>
        </FormSheet>
      </>
    )
  },
}
