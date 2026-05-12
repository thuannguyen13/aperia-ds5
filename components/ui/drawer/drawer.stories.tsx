import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./drawer"
import { Button } from "../button/button"

const meta: Meta<typeof Drawer> = {
  title: "UI/Drawer",
  component: Drawer,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit record</DrawerTitle>
          <DrawerDescription>
            Make changes and save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-2">
          <div className="grid gap-3">
            <div className="grid gap-1">
              <label className="text-sm font-medium" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                defaultValue="Q4 Report"
                className="rounded-md border px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button>Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const FromLeft: Story = {
  render: () => (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline">Open Left Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>Browse available sections.</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-1 px-4">
          {["Dashboard", "Issues", "Reports", "Settings"].map((item) => (
            <button
              key={item}
              className="rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
            >
              {item}
            </button>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
