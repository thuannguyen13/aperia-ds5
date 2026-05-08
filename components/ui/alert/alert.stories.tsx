import type { Meta, StoryObj } from "@storybook/react-vite"
import { Terminal, CircleAlert } from "lucide-react"
import { Alert, AlertTitle, AlertDescription, AlertAction } from "./alert"
import { Button } from "../button/button"

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "[View in Figma](https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=26-160)",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: { variant: "default" },
  render: ({ variant }) => (
    <Alert variant={variant}>
      <Terminal />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  args: { variant: "destructive" },
  render: ({ variant }) => (
    <Alert variant={variant}>
      <CircleAlert />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
}

export const WithAction: Story = {
  args: { variant: "default" },
  render: ({ variant }) => (
    <Alert variant={variant}>
      <Terminal />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>
        A new version of the application is ready to install.
      </AlertDescription>
      <AlertAction>
        <Button variant="outline" size="sm">Update</Button>
      </AlertAction>
    </Alert>
  ),
}

export const TitleOnly: Story = {
  args: { variant: "default" },
  render: ({ variant }) => (
    <Alert variant={variant}>
      <AlertTitle>Note</AlertTitle>
    </Alert>
  ),
}

export const NoIcon: Story = {
  args: { variant: "default" },
  render: ({ variant }) => (
    <Alert variant={variant}>
      <AlertTitle>No icon</AlertTitle>
      <AlertDescription>
        An alert without a leading icon — just text.
      </AlertDescription>
    </Alert>
  ),
}
