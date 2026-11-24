import { useId, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { describedBy, useFieldNote } from "./field-note"
import { Field, FieldError, FieldGroup, FieldLabel } from "../field/field"
import { Input } from "../input/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select/select"

type Args = {
  disabled: boolean
  reason: string
  description: string
}

const meta: Meta<Args> = {
  title: "Pattern Components/FieldNote",
  // Shown on its pattern page's Code tab (site.ts), not in the sidebar or the Components index.
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component:
          '`useFieldNote` is the line under a field: while the field is disabled, the reason ("Pick a prospect first.") in place of its description. The field keeps its informative placeholder, so the reason is never said there. Render `note` under the field and add `describes` to its `aria-describedby`; `describedBy(...ids)` joins it with an error\'s id, or gives undefined when there are none.',
      },
    },
  },
  args: {
    disabled: true,
    reason: "Pick a prospect first.",
    description: "Only merchants boarded for this prospect.",
  },
  argTypes: {
    disabled: { control: "boolean" },
    reason: { control: "text" },
    description: { control: "text" },
  },
}

export default meta
type Story = StoryObj<Args>

const MERCHANTS: Record<string, string[]> = {
  "Northwind Payments": ["Lone Star Grocers", "Bayou Auto Parts"],
  "Blue Harbor Bank": ["Pecan Street Coffee"],
}

function MerchantField({
  disabled,
  reason,
  description,
  merchants = [],
  error,
}: Args & { merchants?: string[]; error?: string }) {
  const { describes, note } = useFieldNote({ disabled, reason, description })
  const errorId = useId()
  return (
    <Field data-disabled={disabled || undefined} data-invalid={!!error}>
      <FieldLabel htmlFor="task-merchant">Merchant</FieldLabel>
      <Select disabled={disabled}>
        <SelectTrigger
          id="task-merchant"
          className="w-full"
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy(describes, error ? errorId : undefined)}
        >
          <SelectValue placeholder="Pick a merchant" />
        </SelectTrigger>
        <SelectContent>
          {merchants.map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {note}
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </Field>
  )
}

/** Toggle `disabled`: the note swaps between the reason and the description. */
export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <MerchantField {...args} />
    </div>
  ),
}

/** The merchant field waits on the prospect, and says so until one is picked. */
export const DependentField: Story = {
  render: function Render({ reason, description }) {
    const [prospect, setProspect] = useState<string>()
    return (
      <FieldGroup className="w-80">
        <Field>
          <FieldLabel htmlFor="task-prospect">Prospect</FieldLabel>
          <Select value={prospect} onValueChange={setProspect}>
            <SelectTrigger id="task-prospect" className="w-full">
              <SelectValue placeholder="Pick a prospect" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(MERCHANTS).map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <MerchantField
          key={prospect}
          disabled={!prospect}
          reason={reason}
          description={description}
          merchants={prospect ? MERCHANTS[prospect] : []}
        />
      </FieldGroup>
    )
  },
}

/** No description and enabled: no note, and no aria-describedby. */
export const NoNote: Story = {
  args: { disabled: false, description: "" },
  render: (args) => (
    <div className="w-80">
      <MerchantField {...args} merchants={MERCHANTS["Northwind Payments"]} />
    </div>
  ),
}

/** `describedBy` joins the note with an error's id, so a screen reader hears both. */
export const WithError: Story = {
  args: { disabled: false },
  render: (args) => (
    <div className="w-80">
      <MerchantField
        {...args}
        merchants={MERCHANTS["Northwind Payments"]}
        error="Pick a merchant."
      />
    </div>
  ),
}

/** The same on a text field: the placeholder still says what goes in it. */
export const OnInput: Story = {
  args: {
    disabled: true,
    reason: "This item is in use and cannot be changed.",
    description: "Shown on statements, up to 22 characters.",
  },
  render: function Render(args) {
    const { describes, note } = useFieldNote(args)
    return (
      <Field className="w-80" data-disabled={args.disabled || undefined}>
        <FieldLabel htmlFor="merchant-descriptor">Descriptor</FieldLabel>
        <Input
          id="merchant-descriptor"
          placeholder="LONESTAR GROCERS TX"
          disabled={args.disabled}
          aria-describedby={describes}
        />
        {note}
      </Field>
    )
  },
}
