import type { Meta, StoryObj } from "@storybook/react-vite"
import { StatTile } from "./stat-tile"
import { CardContent } from "@/components/ui/card/card"
import { Progress } from "@/components/ui/progress/progress"
import { TitledCard } from "./titled-card"
import { money } from "@/lib/format"

// Status colors are the app's own (brand.example.css), which the library doesn't ship. An app defines them in
// its @theme; Storybook doesn't, so this stands in for the app's Sales Portal values.
const APP_STATUS_RED = `
.text-status-red-foreground { color: #8f1f1f; }
.dark .text-status-red-foreground { color: #f3a6a6; }
`

const meta: Meta<typeof StatTile> = {
  title: "Design Language/Recipes/StatTile",
  component: StatTile,
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component:
          "One number on a surface: what it counts above, the number, and what it means below when that needs saying. Use it for a page's headline figures, in a grid 16px apart. `plain` drops the surface for tiles inside a card. Money is written in full (`money()`), never shortened to $1.8M.",
      },
    },
  },
  args: {
    label: "Open Prospects",
    value: "24",
    plain: false,
  },
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    hint: { control: "text" },
    tone: { control: "select", options: [undefined, "red"] },
    plain: { control: "boolean" },
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof StatTile>

// One tile at the width it takes in a row of three.
const oneTile: NonNullable<Story["decorators"]> = [
  (Story) => (
    <div className="w-56">
      <Story />
    </div>
  ),
]

export const Default: Story = { decorators: oneTile }

export const WithHint: Story = {
  decorators: oneTile,
  args: {
    label: "Won This Quarter",
    value: money(1_840_000),
    hint: "Up 8% on last quarter",
  },
}

/** `children` go under the number, such as a bar. */
export const WithBar: Story = {
  decorators: oneTile,
  args: {
    label: "Quota Attained",
    value: "68%",
    hint: `${money(2_040_000)} of ${money(3_000_000)}`,
  },
  render: (args) => (
    <StatTile {...args}>
      <Progress value={68} className="mt-2" aria-label="Quota attained" />
    </StatTile>
  ),
}

/** Red only with a label saying what it counts; the color is the app's own status slot. */
export const Red: Story = {
  decorators: oneTile,
  args: {
    label: "Overdue Tasks",
    value: "3",
    hint: "3 overdue",
    tone: "red",
  },
  render: (args) => (
    <>
      <style>{APP_STATUS_RED}</style>
      <StatTile {...args} />
    </>
  ),
}

/** Hints pin to the foot, so they line up across a row whether or not a tile has a bar. */
export const Row: Story = {
  decorators: [
    (Story) => (
      <div className="w-[48rem]">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <StatTile label="Open Prospects" value="24" hint="6 added this week" />
      <StatTile
        label="Quota Attained"
        value="68%"
        hint={`${money(2_040_000)} of ${money(3_000_000)}`}
      >
        <Progress value={68} className="mt-2" aria-label="Quota attained" />
      </StatTile>
      <StatTile
        label="Average Deal"
        value={money(48_500)}
        hint="Across 18 closed deals"
      />
    </div>
  ),
}

/** Inside a card the card is the surface, so the tiles are `plain`. */
export const PlainInCard: Story = {
  decorators: [
    (Story) => (
      <div className="w-[40rem]">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <TitledCard title="Merchant Volume">
      <CardContent className="grid grid-cols-3 gap-4 pb-4">
        <StatTile plain label="This Month" value={money(312_400)} />
        <StatTile plain label="Last Month" value={money(298_150)} />
        <StatTile plain label="Chargebacks" value="4" hint="0.3% of volume" />
      </CardContent>
    </TitledCard>
  ),
}
