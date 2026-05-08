import type { Meta, StoryObj } from "@storybook/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "./card"
import { Button } from "../button/button"

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: { size: "default" },
  render: ({ size }) => (
    <Card size={size} className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Card content area.</p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Confirm action</CardTitle>
        <CardDescription>This action cannot be undone.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Are you sure you want to continue?</p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Confirm</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Monthly Usage</CardTitle>
        <CardDescription>Your plan resets on Jun 1.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">Upgrade</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">82%</p>
      </CardContent>
    </Card>
  ),
}

export const Small: Story = {
  render: () => (
    <Card size="sm" className="w-72">
      <CardHeader>
        <CardTitle>Small card</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Compact size variant.</p>
      </CardContent>
    </Card>
  ),
}
