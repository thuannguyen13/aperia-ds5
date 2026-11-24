import { useState, useTransition } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "../badge/badge"
import { Field, FieldError, FieldLabel } from "../field/field"
import { FormSection } from "@/docs/design-language/recipes/form-section"
import { Input } from "../input/input"
import { SheetForm } from "../sheet-form/sheet-form"
import { useSheetForm } from "../sheet-form/use-sheet-form"
import { useRefusedDraft, type Drafting } from "../entity-picker/use-picker-add"
import { DraftField, PickField } from "./pick-field"

const STAGES = [
  { id: 1, name: "Discovery" },
  { id: 2, name: "Demo" },
  { id: 3, name: "Proposal" },
  { id: 4, name: "Negotiation" },
]

// A stage drawn as the app draws it, in its own color.
const stageBadge = (name: string, className: string) => (
  <Badge className={className}>{name}</Badge>
)

const meta: Meta<typeof PickField> = {
  title: "Pattern Components/PickField",
  // Shown on its pattern page's Code tab (site.ts), not in the sidebar or the Components index.
  component: PickField,
  tags: ["!dev"],
  decorators: [
    (Story) => (
      <div className="w-[28rem] max-w-full">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "A labeled field that picks from a short fixed list: a stage, a lost reason, a queue. Each item shows its name, or its own `label` such as a status badge in the app's colors. An empty list says `none`, worded by the feature that keeps the list (where items are added, never who to ask). A disabled field says why under it; an error shows in place. Records (people, companies, products) are picked with `EntityPicker`. `DraftField` is its sibling for an item that waits on the record being added, such as a new prospect's first opportunity: its list offers only Add, which opens the item's form in a sheet, and the draft comes back to the field to change or remove.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PickField>

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState("2")
    return (
      <PickField
        id="opportunity-stage"
        label="Pipeline Stage"
        items={STAGES}
        value={value}
        placeholder="Pick a stage"
        onChange={setValue}
      />
    )
  },
}

export const WithLabels: Story = {
  name: "Items With Their Own Label",
  render: function Render() {
    const [value, setValue] = useState("")
    const colors = [
      "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
      "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
      "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
    ]
    return (
      <PickField
        id="opportunity-stage-badges"
        label="Pipeline Stage"
        items={STAGES.map((stage, index) => ({
          ...stage,
          label: stageBadge(stage.name, colors[index]),
        }))}
        value={value}
        placeholder="Pick a stage"
        onChange={setValue}
      />
    )
  },
}

export const DisabledWithReason: Story = {
  name: "Disabled With a Reason",
  render: () => (
    <PickField
      id="request-type"
      label="Request Type"
      items={[]}
      value=""
      placeholder="Pick a request type"
      disabled
      reason="Pick a queue first."
      onChange={() => {}}
    />
  ),
}

export const Invalid: Story = {
  name: "Error",
  render: function Render() {
    const [value, setValue] = useState("")
    return (
      <PickField
        id="opportunity-lost-reason"
        label="Lost Reason"
        items={[
          { id: 1, name: "Chose a competitor" },
          { id: 2, name: "No budget" },
          { id: 3, name: "No response" },
        ]}
        value={value}
        placeholder="Pick a lost reason"
        error={value ? undefined : "Pick a lost reason."}
        onChange={setValue}
      />
    )
  },
}

export const Empty: Story = {
  name: "Empty List",
  render: () => (
    <PickField
      id="opportunity-lost-reason-empty"
      label="Lost Reason"
      items={[]}
      value=""
      placeholder="Pick a lost reason"
      none="No lost reasons yet. Add them in Settings."
      onChange={() => {}}
    />
  ),
}

// --- DraftField ----------------------------------------------------------------------------------------------------

type OpportunityDraft = { name: string; amount: string }

const wait = (ms: number) => new Promise((done) => setTimeout(done, ms))

/**
 * The app's one opportunity form, opened to draft: its save checks and hands the draft back instead of saving it, as
 * the opportunity is saved later with the prospect it belongs to.
 */
function OpportunityForm({
  drafting,
}: {
  drafting: Drafting<OpportunityDraft>
}) {
  const form = useSheetForm<OpportunityDraft>(
    drafting.start ?? { name: "", amount: "" }
  )
  const { draft, set, errors } = form
  const [pending, startTransition] = useTransition()
  useRefusedDraft(drafting.refusal, form.refused)

  function submit() {
    if (!draft.name.trim())
      return form.refused({
        error: "Enter the opportunity's name.",
        field: "name",
      })
    startTransition(async () => {
      await wait(300)
      drafting.done(draft)
    })
  }

  return (
    <SheetForm
      form={form}
      onSubmit={submit}
      pending={pending}
      submit={drafting.start ? "Save Changes" : "Add Opportunity"}
    >
      <FormSection title="Details">
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor="draft-name">Name</FieldLabel>
          <Input
            id="draft-name"
            autoFocus
            placeholder="e.g. Ask Nanci for First National Bank"
            value={draft.name}
            aria-invalid={Boolean(errors.name)}
            onChange={(event) => set("name", event.target.value)}
          />
          <FieldError>{errors.name}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="draft-amount">Amount (Optional)</FieldLabel>
          <Input
            id="draft-amount"
            placeholder="e.g. 250,000"
            className="tabular-nums"
            value={draft.amount}
            onChange={(event) => set("amount", event.target.value)}
          />
        </Field>
      </FormSection>
    </SheetForm>
  )
}

const opportunityAdd = {
  label: "Add Opportunity",
  form: (drafting: Drafting<OpportunityDraft>) => (
    <OpportunityForm drafting={drafting} />
  ),
}

const shownOpportunity = (draft: OpportunityDraft) => ({
  name: draft.name,
  detail: draft.amount ? `$${draft.amount}` : undefined,
  badge: "Discovery",
})

export const Drafted: Story = {
  name: "DraftField",
  parameters: {
    docs: {
      description: {
        story:
          "In an Add Prospect form: pick Add Opportunity to draft one. Once drafted, the list offers Edit Opportunity and Remove Opportunity.",
      },
    },
  },
  render: function Render() {
    const [draft, setDraft] = useState<OpportunityDraft | null>(null)
    return (
      <DraftField
        id="prospect-opportunity"
        label="Opportunity (Optional)"
        placeholder="No opportunity"
        draft={draft}
        shown={shownOpportunity}
        add={opportunityAdd}
        remove="Remove Opportunity"
        onChange={setDraft}
      />
    )
  },
}

export const DraftRefused: Story = {
  name: "DraftField, Refused",
  render: function Render() {
    const [draft, setDraft] = useState<OpportunityDraft | null>({
      name: "Ask Nanci for Lakeview Credit Union",
      amount: "120,000",
    })
    return (
      <DraftField
        id="prospect-opportunity-refused"
        label="Opportunity (Optional)"
        placeholder="No opportunity"
        draft={draft}
        shown={shownOpportunity}
        refusal={{
          error: "An opportunity with this name already exists.",
          field: "name",
        }}
        add={opportunityAdd}
        remove="Remove Opportunity"
        onChange={setDraft}
      />
    )
  },
}

export const DraftSaved: Story = {
  name: "DraftField, Saved",
  render: () => (
    <DraftField
      id="prospect-opportunity-saved"
      label="Opportunity (Optional)"
      placeholder="No opportunity"
      draft={{ name: "Ask Nanci for Lakeview Credit Union", amount: "120,000" }}
      shown={shownOpportunity}
      saved
      add={opportunityAdd}
      onChange={() => {}}
    />
  ),
}
