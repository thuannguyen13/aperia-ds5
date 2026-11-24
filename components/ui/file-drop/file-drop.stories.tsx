import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { FileDrop } from "./file-drop"
import { Field, FieldError, FieldLabel } from "../field/field"

const meta: Meta<typeof FileDrop> = {
  title: "Pattern Components/FileDrop",
  // Shown on its pattern page's Code tab (site.ts), not in the sidebar or the Components index.
  component: FileDrop,
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component:
          "Where a file is picked: dropped on the zone, or chosen by clicking it or pressing Space on it. The one look of picking a file in every app; what happens to the file stays with the caller (`onFiles`). What it accepts goes under it as `hint`; disabled with a `reason`, the reason shows there instead. For files that upload and list on a form, use `FilePicker`, which is built on it.",
      },
    },
  },
  args: {
    id: "import-file",
    label: "File to import",
    accept: ".csv,.xlsx",
    multiple: false,
    disabled: false,
    hint: "CSV or XLSX, up to 5,000 rows.",
  },
  argTypes: {
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    reason: { control: "text" },
    hint: { control: "text" },
    onFiles: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof FileDrop>

/** The prospect import's first step: one file, read in the browser. */
export const Default: Story = {
  render: function Render(args) {
    const [chosen, setChosen] = useState<string | null>(null)
    return (
      <div className="flex w-96 flex-col gap-2">
        <FileDrop {...args} onFiles={([file]) => setChosen(file.name)} />
        {chosen && (
          <p className="text-sm">
            Picked <span className="font-medium">{chosen}</span>
          </p>
        )}
      </div>
    )
  },
}

export const Multiple: Story = {
  args: {
    id: "merchant-statements",
    label: "Merchant statements",
    accept: ".pdf",
    multiple: true,
    hint: "PDF, up to 4 MB each.",
  },
  render: (args) => (
    <div className="w-96">
      <FileDrop {...args} onFiles={() => {}} />
    </div>
  ),
}

/** While the file is read, the zone waits; the hint says what it's doing. */
export const Reading: Story = {
  args: {
    disabled: true,
    hint: "Reading prospects-q3.csv…",
  },
  render: (args) => (
    <div className="w-96">
      <FileDrop {...args} onFiles={() => {}} />
    </div>
  ),
}

export const DisabledWithReason: Story = {
  args: {
    disabled: true,
    reason: "Pick a queue first.",
  },
  render: (args) => (
    <div className="w-96">
      <FileDrop {...args} onFiles={() => {}} />
    </div>
  ),
}

/** A refused file says why in place, under the zone, with the field's own error. */
export const WithError: Story = {
  render: (args) => (
    <Field data-invalid className="w-96">
      <FieldLabel htmlFor={args.id}>File</FieldLabel>
      <FileDrop {...args} onFiles={() => {}} />
      <FieldError>
        Row 14 has no company name. Fix it and pick the file again.
      </FieldError>
    </Field>
  ),
}
