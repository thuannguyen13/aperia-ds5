import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog"
import { Button } from "../button/button"

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="grid gap-1">
            <label className="text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              defaultValue="John Doe"
              className="rounded-md border px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              defaultValue="john@example.com"
              className="rounded-md border px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Session expiring</DialogTitle>
          <DialogDescription>
            Your session will expire in 5 minutes. Do you want to extend it?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Sign out</Button>
          <Button>Extend session</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Informational: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Learn more</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About this feature</DialogTitle>
          <DialogDescription>
            This feature allows you to analyze trends over time and generate
            reports automatically. Data is refreshed every 24 hours from your
            connected sources.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  ),
}
