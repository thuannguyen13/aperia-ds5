import type { Meta, StoryObj } from "@storybook/react-vite"
import { Switch } from "./switch"
import { Label } from "../label/label"
import { Field, FieldContent, FieldDescription, FieldTitle } from "../field/field"

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default"],
    },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="mode" defaultChecked />
      <Label htmlFor="mode">Dark mode</Label>
      <Field orientation="horizontal">
        <Switch size="default" />
<FieldContent>
  
<FieldTitle>Switch Text</FieldTitle>
<FieldDescription>This is a switch description.</FieldDescription>  
</FieldContent>

</Field>    
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Switch size="sm" defaultChecked />
        <span className="text-sm">Small</span>
      </div>
      <div className="flex items-center gap-2">
        <Switch size="default" defaultChecked />
        <span className="text-sm">Default</span>
      </div>
    </div>
  ),
}
