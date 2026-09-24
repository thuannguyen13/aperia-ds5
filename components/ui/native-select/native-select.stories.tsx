import type { Meta, StoryObj } from "@storybook/react-vite"
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "./native-select"

const meta: Meta<typeof NativeSelect> = {
  title: "UI/NativeSelect",
  component: NativeSelect,
  args: {
    size: "default",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default"],
    },
    disabled: { control: "boolean" },
  },
  render: (args) => (
    <NativeSelect className="w-48" {...args}>
      <NativeSelectOption value="">Select a status</NativeSelectOption>
      <NativeSelectOption value="open">Open</NativeSelectOption>
      <NativeSelectOption value="pending">Pending</NativeSelectOption>
      <NativeSelectOption value="closed">Closed</NativeSelectOption>
    </NativeSelect>
  ),
}

export default meta
type Story = StoryObj<typeof NativeSelect>

export const Default: Story = {}

export const Small: Story = { args: { size: "sm" } }

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <NativeSelect size="sm" className="w-40">
        <NativeSelectOption value="sm">sm</NativeSelectOption>
      </NativeSelect>
      <NativeSelect size="default" className="w-40">
        <NativeSelectOption value="default">default</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
}

export const WithGroups: Story = {
  render: (args) => (
    <NativeSelect className="w-48" defaultValue="est" {...args}>
      <NativeSelectOptGroup label="Americas">
        <NativeSelectOption value="est">Eastern (EST)</NativeSelectOption>
        <NativeSelectOption value="cst">Central (CST)</NativeSelectOption>
        <NativeSelectOption value="pst">Pacific (PST)</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Europe">
        <NativeSelectOption value="gmt">London (GMT)</NativeSelectOption>
        <NativeSelectOption value="cet">Berlin (CET)</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
}

export const Disabled: Story = { args: { disabled: true } }

export const Invalid: Story = { args: { "aria-invalid": true } }
