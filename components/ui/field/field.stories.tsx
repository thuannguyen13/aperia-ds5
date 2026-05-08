import type { Meta, StoryObj } from "@storybook/react-vite"
import { Field, FieldLabel, FieldTitle, FieldDescription, FieldError, FieldGroup, FieldSet, FieldLegend, FieldContent } from "./field"
import { Input } from "../input/input"
import { Checkbox } from "../checkbox/checkbox"

const meta: Meta<typeof Field> = {
  title: "UI/Field",
  component: Field,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "responsive"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Field>

export const Default: Story = {
  args: { orientation: "vertical" },
  render: ({ orientation }) => (
    <Field orientation={orientation} className="max-w-xs">
      <FieldLabel htmlFor="email">Email address</FieldLabel>
      <Input id="email" type="email" placeholder="you@example.com" />
    </Field>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" placeholder="johndoe" />
      <FieldDescription>This will be your public display name.</FieldDescription>
    </Field>
  ),
}

export const WithError: Story = {
  render: () => (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="pw">Password</FieldLabel>
      <Input id="pw" type="password" aria-invalid="true" />
      <FieldError>Password must be at least 8 characters.</FieldError>
    </Field>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldTitle>Notifications</FieldTitle>
      <FieldContent>
        <FieldDescription>Receive email updates.</FieldDescription>
      </FieldContent>
      <Checkbox defaultChecked />
    </Field>
  ),
}

export const FieldGroupExample: Story = {
  name: "FieldGroup",
  render: () => (
    <FieldGroup className="max-w-xs">
      <Field>
        <FieldLabel htmlFor="first">First name</FieldLabel>
        <Input id="first" placeholder="Jane" />
      </Field>
      <Field>
        <FieldLabel htmlFor="last">Last name</FieldLabel>
        <Input id="last" placeholder="Doe" />
      </Field>
    </FieldGroup>
  ),
}

export const FieldSetExample: Story = {
  name: "FieldSet",
  render: () => (
    <FieldSet className="max-w-xs">
      <FieldLegend>Preferences</FieldLegend>
      <Field orientation="horizontal">
        <FieldTitle>Marketing emails</FieldTitle>
        <Checkbox />
      </Field>
      <Field orientation="horizontal">
        <FieldTitle>Product updates</FieldTitle>
        <Checkbox defaultChecked />
      </Field>
    </FieldSet>
  ),
}
