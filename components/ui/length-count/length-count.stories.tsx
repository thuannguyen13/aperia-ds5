import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { LengthCount } from "./length-count"
import { Field, FieldLabel } from "../field/field"
import { Textarea } from "../textarea/textarea"

const meta: Meta<typeof LengthCount> = {
  title: "Patterns/LengthCount",
  component: LengthCount,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "How much of a long field's limit is used, once 90% of it is: \"1,850 / 2,000\", right-aligned under the field. Put it after the field with the input's `maxLength`, so the limit is met while typing rather than refused after the save. Hidden before 90%, so a short note carries no number.",
      },
    },
  },
  args: {
    value: "",
    max: 200,
  },
  argTypes: {
    value: { control: "text" },
    max: { control: "number" },
  },
}

export default meta
type Story = StoryObj<typeof LengthCount>

const NEAR_LIMIT =
  "Northwind processes about $4,200,000 a year across 38 locations, mostly card-present. They are unhappy with their current processor's chargeback handling and want a decision by the end of Q1."

/** A prospect's description, 90% or more of its limit used: type to the limit, which stops it. */
function NotesField({ value: initial, max }: { value: string; max?: number }) {
  const [value, setValue] = useState(initial)
  return (
    <Field className="w-96">
      <FieldLabel htmlFor="prospect-description">
        Description (Optional)
      </FieldLabel>
      <Textarea
        id="prospect-description"
        value={value}
        maxLength={max}
        onChange={(event) => setValue(event.target.value)}
      />
      <LengthCount value={value} max={max} />
    </Field>
  )
}

/** Near the limit: the count shows. */
export const Default: Story = {
  args: { value: NEAR_LIMIT },
  render: (args) => <NotesField key={args.value} {...args} />,
}

/** A short note carries no number. */
export const BelowThreshold: Story = {
  args: { value: "Wants a decision by Q1." },
  render: (args) => <NotesField key={args.value} {...args} />,
}

export const AtLimit: Story = {
  args: { value: NEAR_LIMIT, max: NEAR_LIMIT.length },
  render: (args) => <NotesField key={`${args.value}${args.max}`} {...args} />,
}

/** With thousands, the count is grouped: "1,850 / 2,000". */
export const LongLimit: Story = {
  args: { value: "x".repeat(1850), max: 2000 },
  render: ({ value, max }) => (
    <div className="w-96">
      <LengthCount value={value} max={max} />
    </div>
  ),
}
