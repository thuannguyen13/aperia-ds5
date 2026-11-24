import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "../button/button"
import { ConfirmDialog } from "./confirm-dialog"

const meta: Meta<typeof ConfirmDialog> = {
  title: "Patterns/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      story: { inline: false, height: "320px" },
      description: {
        component:
          'Asks before a change. A short title naming it as a question ("Delete Prospect?"), one line on the consequence the user must know, then Cancel and the action named with a verb and its object ("Delete Prospect"), never "Are you sure?", OK or Yes. The action is red by default; a step that adds rather than removes passes `variant="default"`. Closing gives focus back to what opened it, even a row\'s icon or a menu item. Inside a sheet, a record\'s Delete is `SheetDelete`, which brings its own.',
      },
    },
  },
  args: {
    title: "Delete Prospect?",
    action: "Delete Prospect",
    children:
      "This permanently deletes Harbor Freight Payments and all its opportunities and tasks.",
    variant: "destructive",
    cancel: "Cancel",
    disabled: false,
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["destructive", "default"] },
    open: { control: false },
    onOpenChange: { control: false },
    onConfirm: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof ConfirmDialog>

/** Opens on load; the button opens it again. */
function Demo(props: React.ComponentProps<typeof ConfirmDialog>) {
  const [open, setOpen] = useState(true)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        {props.action}
      </Button>
      <ConfirmDialog {...props} open={open} onOpenChange={setOpen} />
    </>
  )
}

/** A change that can't be taken back: the action is red. */
export const Destructive: Story = {
  render: (args) => <Demo {...args} />,
}

/** A step that adds rather than removes: the action is primary. */
export const Positive: Story = {
  args: {
    title: "Apply Template?",
    action: "Apply Template",
    variant: "default",
    children:
      "This adds the 6 tasks of Merchant Onboarding to Harbor Freight Payments.",
  },
  render: (args) => <Demo {...args} />,
}

/** A change of state says Change. */
export const StatusChange: Story = {
  args: {
    title: "Change to Demo?",
    action: "Change to Demo",
    variant: "default",
    children: "The opportunity moves to Demo and its stage tasks start.",
  },
  render: (args) => <Demo {...args} />,
}

/** Nothing to do yet: the action is disabled. */
export const Disabled: Story = {
  args: {
    title: "Apply Template?",
    action: "Apply Template",
    variant: "default",
    disabled: true,
    children:
      "Every task in Merchant Onboarding is already on this opportunity.",
  },
  render: (args) => <Demo {...args} />,
}
