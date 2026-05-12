import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./sheet"
import { Button } from "../button/button"

const meta: Meta<typeof Sheet> = {
  title: "UI/Sheet",
  component: Sheet,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Sheet>

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit issue</SheetTitle>
          <SheetDescription>
            Update the issue details. Changes are saved immediately.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 py-2">
          <div className="grid gap-3">
            <div className="grid gap-1">
              <label className="text-sm font-medium">Title</label>
              <input
                defaultValue="Fix login redirect"
                className="rounded-md border px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium">Description</label>
              <textarea
                rows={4}
                defaultValue="Users are being redirected to a 404 page after login."
                className="rounded-md border px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const FromLeft: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse your workspace.</SheetDescription>
        </SheetHeader>
        <nav className="px-4 py-2">
          {["Dashboard", "Issues", "Reports", "Settings"].map((item) => (
            <button
              key={item}
              className="flex w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
            >
              {item}
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  ),
}

export const FromBottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Export data</SheetTitle>
          <SheetDescription>
            Choose a format to export your data.
          </SheetDescription>
        </SheetHeader>
        <div className="flex gap-2 px-4 py-2">
          <Button variant="outline" className="flex-1">CSV</Button>
          <Button variant="outline" className="flex-1">Excel</Button>
          <Button variant="outline" className="flex-1">JSON</Button>
        </div>
        <SheetFooter className="p-4">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}
