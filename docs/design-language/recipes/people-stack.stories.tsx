import type { Meta, StoryObj } from "@storybook/react-vite"
import { PeopleStack, type StackPerson } from "./people-stack"

// An app's own colors, picked by each record's id; plain values here.
const TEAL = { fill: "oklch(0.93 0.05 190)", text: "oklch(0.42 0.08 190)" }
const AMBER = { fill: "oklch(0.95 0.06 85)", text: "oklch(0.48 0.1 70)" }
const VIOLET = { fill: "oklch(0.93 0.05 300)", text: "oklch(0.45 0.12 300)" }
const ROSE = { fill: "oklch(0.93 0.05 15)", text: "oklch(0.48 0.14 20)" }

const logo = (color: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="10" y="10" width="44" height="44" rx="12" fill="${color}"/><path d="M22 32h20M32 22v20" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>`
  )

const REPS: StackPerson[] = [
  { id: 11, name: "Maria Chen", role: "Primary", detail: "60%", colors: TEAL },
  {
    id: 12,
    name: "James Ortiz",
    role: "Secondary",
    detail: "25%",
    colors: AMBER,
  },
  {
    id: 13,
    name: "Priya Raman",
    role: "Secondary",
    detail: "15%",
    colors: VIOLET,
  },
  { id: 14, name: "Tom Becker", role: "Sales Engineer", colors: ROSE },
  { id: 15, name: "Lena Novak", role: "Sales Engineer", colors: TEAL },
]

const PRODUCTS: StackPerson[] = [
  {
    id: "p1",
    name: "Card Processing",
    shape: "square",
    image: logo("#0f766e"),
  },
  {
    id: "p2",
    name: "ACH Payments",
    shape: "square",
    monogram: "AP",
    colors: AMBER,
  },
  { id: "p3", name: "Fraud Shield", shape: "square", colors: VIOLET },
]

const meta: Meta<typeof PeopleStack> = {
  title: "Design Language/Recipes/PeopleStack",
  component: PeopleStack,
  tags: ["!dev"],
  args: {
    people: REPS,
    title: "Sales Reps",
    empty: "No sales rep",
    size: "sm",
  },
  argTypes: { size: { control: "inline-radio", options: ["xs", "sm"] } },
  parameters: {
    docs: {
      description: {
        component:
          'The people of a record in its page header: avatars, three at most, then "+N". A card listing everyone (avatar, name, role) opens on hover, keyboard focus and tap, and the button’s accessible name lists them all. Pass each person as data (name, picture URL, the app’s colors by id); companies and products are `shape: "square"`. With no one it draws the empty avatar and `empty` ("No assignee") is what it says.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PeopleStack>

/** Five reps: three avatars and "+2". Hover or focus it for the card. */
export const Default: Story = {}

export const Few: Story = { args: { people: REPS.slice(0, 2) } }

/** One assignee on a request. */
export const One: Story = {
  args: { title: "Assignee", empty: "No assignee", people: [REPS[0]] },
}

/** No one assigned: the dashed empty avatar, and the card says so. */
export const NoOne: Story = {
  args: { title: "Assignee", empty: "No assignee", people: [] },
}

/** Products are squares, a logo where there is one. */
export const Products: Story = {
  args: {
    title: "Products",
    empty: "No products",
    people: PRODUCTS,
    size: "xs",
  },
}

/** In a record's header line, as an opportunity shows its products and reps. */
export const InHeader: Story = {
  render: () => (
    <p className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
      <span className="tabular-nums">Opportunity #659</span>
      <span aria-hidden>·</span>
      <span className="text-foreground">Northwind Merchant Services</span>
      <span aria-hidden>·</span>
      <PeopleStack
        title="Products"
        empty="No products"
        people={PRODUCTS}
        size="xs"
      />
      <span aria-hidden>·</span>
      <PeopleStack title="Sales Reps" empty="No sales rep" people={REPS} />
    </p>
  ),
}
