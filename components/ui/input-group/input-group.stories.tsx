import type { Meta, StoryObj } from "@storybook/react"
import { Search, Mail } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupButton, InputGroupTextarea } from "./input-group"

const meta: Meta<typeof InputGroup> = {
  title: "UI/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof InputGroup>

export const WithLeadingIcon: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupAddon align="inline-start">
        <InputGroupText><Search /></InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
}

export const WithLeadingText: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupAddon align="inline-start">
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  ),
}

export const WithTrailingButton: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupInput placeholder="Enter email" type="email" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>
          <Mail />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithBothAddons: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupAddon align="inline-start">
        <InputGroupText>$</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="0.00" type="number" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>USD</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithTextarea: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupAddon align="block-start">
        <InputGroupText>Note</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea placeholder="Write something..." rows={3} />
    </InputGroup>
  ),
}
