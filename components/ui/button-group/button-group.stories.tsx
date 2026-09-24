import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "../button/button"
import { Input } from "../input/input"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./button-group"

const meta: Meta<typeof ButtonGroup> = {
  title: "UI/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "[View in Figma](https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-224279)",
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  render: ({ orientation }) => (
    <ButtonGroup orientation={orientation}>
      <Button variant="outline">Archive</Button>
      <Button variant="outline">Report</Button>
      <Button variant="outline">Snooze</Button>
    </ButtonGroup>
  ),
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

export const Default: Story = {}

export const Vertical: Story = { args: { orientation: "vertical" } }

export const WithSeparator: Story = {
  render: ({ orientation }) => (
    <ButtonGroup orientation={orientation}>
      <Button variant="secondary">Copy</Button>
      <ButtonGroupSeparator orientation={orientation === "vertical" ? "horizontal" : "vertical"} />
      <Button variant="secondary">Paste</Button>
    </ButtonGroup>
  ),
}

export const WithText: Story = {
  render: ({ orientation }) => (
    <ButtonGroup orientation={orientation}>
      <ButtonGroupText>https://</ButtonGroupText>
      <Input placeholder="aperia.com" />
    </ButtonGroup>
  ),
}

export const WithInput: Story = {
  render: ({ orientation }) => (
    <ButtonGroup orientation={orientation}>
      <Input placeholder="Search accounts" />
      <Button variant="outline">Search</Button>
    </ButtonGroup>
  ),
}

export const Nested: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Previous</Button>
        <Button variant="outline">Next</Button>
      </ButtonGroup>
    </ButtonGroup>
  ),
}
