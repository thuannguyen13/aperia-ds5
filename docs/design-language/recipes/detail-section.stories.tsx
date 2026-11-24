import type { Meta, StoryObj } from "@storybook/react-vite"
import { DetailRow, DetailSection, Fact } from "./detail-section"
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar"
import { Badge } from "@/components/ui/badge/badge"
import { CardContent } from "@/components/ui/card/card"
import { EmptyValue, NoneText } from "./empty-value"
import { TitledCard } from "./titled-card"
import { formatDate, money } from "@/lib/format"

const meta: Meta<typeof DetailSection> = {
  title: "Design Language/Recipes/DetailSection",
  component: DetailSection,
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component:
          "A record's facts. `DetailSection` is a block of `DetailRow`s, label and value in two columns with the values on one line so they read down, in a detail card or sheet; its heading is optional inside a tab, which names it. `Fact` is a small label over its value, for a row of facts in a `<dl>`, such as a header's properties. A missing value is `EmptyValue` (—); an empty optional field is `NoneText` (\"No priority\").",
      },
    },
  },
  decorators: [
    // A sheet or card sets text-sm; the section takes its size from there.
    (Story) => (
      <div className="w-[28rem] text-sm">
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Details",
  },
  argTypes: {
    title: { control: "text" },
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof DetailSection>

function ProspectRows() {
  return (
    <>
      <DetailRow label="Company">Northwind Payments</DetailRow>
      <DetailRow label="Legal Name">
        <EmptyValue />
      </DetailRow>
      <DetailRow label="Stage">
        <Badge variant="outline">Proposal</Badge>
      </DetailRow>
      <DetailRow label="Priority">
        <NoneText>No priority</NoneText>
      </DetailRow>
      <DetailRow label="Owner">
        <span className="flex items-center gap-2">
          <Avatar size="sm" aria-hidden>
            <AvatarFallback>DW</AvatarFallback>
          </Avatar>
          Dana Whitfield
        </span>
      </DetailRow>
      <DetailRow label="Annual Volume">
        <span className="tabular-nums">{money(4_200_000)}</span>
      </DetailRow>
      <DetailRow label="Phone">(214) 555-0142</DetailRow>
      <DetailRow label="Last Contacted">{formatDate("2026-11-18")}</DetailRow>
    </>
  )
}

/** Missing values read as a muted dash; an empty optional pick reads "No priority". */
export const Default: Story = {
  render: (args) => (
    <DetailSection {...args}>
      <ProspectRows />
    </DetailSection>
  ),
}

/** Inside a tab the tab names the block, so there is no heading. */
export const WithoutTitle: Story = {
  args: { title: undefined },
  render: (args) => (
    <DetailSection {...args}>
      <ProspectRows />
    </DetailSection>
  ),
}

/** In a card, the card's title heads it and `CardContent` brings the padding. */
export const InCard: Story = {
  render: () => (
    <TitledCard title="Details">
      <CardContent className="pb-4">
        <DetailSection>
          <ProspectRows />
        </DetailSection>
      </CardContent>
    </TitledCard>
  ),
}

/** Several blocks in a sheet, each with its heading. */
export const Sections: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <DetailSection title="Details">
        <DetailRow label="Merchant">Lone Star Grocers</DetailRow>
        <DetailRow label="MCC">
          <span className="tabular-nums">5411</span>
        </DetailRow>
        <DetailRow label="Website">
          <EmptyValue />
        </DetailRow>
      </DetailSection>
      <DetailSection title="Processing">
        <DetailRow label="Monthly Volume">
          <span className="tabular-nums">{money(312_400)}</span>
        </DetailRow>
        <DetailRow label="Chargebacks">
          <span className="tabular-nums">0</span>
        </DetailRow>
        <DetailRow label="Queue">
          <NoneText>No queue</NoneText>
        </DetailRow>
      </DetailSection>
    </div>
  ),
}

/** `Fact`: a row of label-over-value pairs in a `<dl>`, as a page header's properties. */
export const Facts: Story = {
  render: () => (
    <dl className="flex flex-wrap gap-x-8 gap-y-3">
      <Fact label="Stage">
        <Badge variant="outline">Proposal</Badge>
      </Fact>
      <Fact label="Owner">Dana Whitfield</Fact>
      <Fact label="Annual Volume">
        <span className="tabular-nums">{money(4_200_000)}</span>
      </Fact>
      <Fact label="Close Date">
        <EmptyValue />
      </Fact>
      <Fact label="Priority">
        <NoneText>No priority</NoneText>
      </Fact>
    </dl>
  ),
}
