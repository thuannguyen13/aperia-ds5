import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { MoneyField, MoneyInput } from "./money-input"
import { Field, FieldLabel } from "../field/field"

const meta: Meta<typeof MoneyInput> = {
  title: "Patterns/MoneyInput",
  component: MoneyInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'A dollar amount: a $ before the number and thousands separators as it is typed, with the caret kept in place. The value it holds and passes to `onChange` stays plain digits ("1234567"), so what is validated and saved never carries a comma. With `amountHidden` the viewer may not see or set the amount: the field is disabled, empty, shows the hidden shape "XX,XXX" and a screen reader hears that it is hidden. `MoneyField` is the labeled field: its `reason` hides the amount and says why under it, `error` shows in place.',
      },
    },
  },
  args: { amountHidden: false, placeholder: "0" },
  argTypes: {
    amountHidden: { control: "boolean" },
    placeholder: { control: "text" },
    value: { control: false },
    onChange: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof MoneyInput>

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState("1250000")
    return (
      <div className="flex w-72 flex-col gap-2">
        <Field>
          <FieldLabel htmlFor="deal-value">Deal Value</FieldLabel>
          <MoneyInput
            {...args}
            id="deal-value"
            value={value}
            onChange={setValue}
          />
        </Field>
        <p className="text-xs text-muted-foreground">
          Saved as <code className="tabular-nums">{value || "(empty)"}</code>
        </p>
      </div>
    )
  },
}

/** Right-aligned in a table's rate column, with the row's placeholder for an unpriced line. */
export const InATable: Story = {
  render: function Render() {
    const [rate, setRate] = useState("")
    return (
      <div className="w-48">
        <MoneyInput
          aria-label="Rate"
          placeholder="Not priced yet"
          className="text-right"
          value={rate}
          onChange={setRate}
        />
      </div>
    )
  },
}

export const Labeled: Story = {
  render: function Render() {
    const [value, setValue] = useState("48000")
    return (
      <div className="w-72">
        <MoneyField
          id="annual-volume"
          label="Annual Volume"
          description="Card volume across every location."
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
}

export const WithError: Story = {
  render: function Render() {
    const [value, setValue] = useState("")
    return (
      <div className="w-72">
        <MoneyField
          id="setup-fee"
          label="Setup Fee"
          error="Enter the setup fee, or 0 for none."
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
}

/** The viewer may not see the amount: hidden shape, disabled, and the reason under it. */
export const Hidden: Story = {
  render: () => (
    <div className="w-72">
      <MoneyField
        id="contract-value"
        label="Contract Value"
        reason="Only the deal's owner and managers see its value."
        value="98765"
        onChange={() => {}}
      />
    </div>
  ),
}
