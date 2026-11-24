import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowRightIcon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Spinner,
  Textarea,
} from "aperia-ds5"

// Open panels for the Design Language pages, which show them in their own frame (inline: false), so the overlay and
// the fixed position stay inside the example. Hidden from the sidebar.

const meta: Meta = {
  title: "Design Language/Examples/Panels",
  tags: ["!dev", "!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

// An open panel takes focus on load, which would scroll the docs page to the frame.
const keepFocus = (event: Event) => event.preventDefault()

function Page() {
  return <div className="h-svh bg-background" />
}

export const Confirmation: Story = {
  render: () => (
    <>
      <Page />
      <AlertDialog open>
        <AlertDialogContent onOpenAutoFocus={keepFocus}>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the project and its files.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">
              Delete Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  ),
}

/** The confirmation while its action runs: a spinner beside the label, and both buttons disabled. */
export const ConfirmationWorking: Story = {
  render: () => (
    <>
      <Page />
      <AlertDialog open>
        <AlertDialogContent onOpenAutoFocus={keepFocus}>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the project and its files.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" disabled>
              <Spinner data-icon="inline-start" />
              Delete Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  ),
}

/** The confirmation after its action failed: the error above the buttons, and the dialog still open. */
export const ConfirmationError: Story = {
  render: () => (
    <>
      <Page />
      <AlertDialog open>
        <AlertDialogContent onOpenAutoFocus={keepFocus}>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the project and its files.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <FieldError>Project failed to delete. Try again.</FieldError>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">
              Delete Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  ),
}

/** The failure as a toast after the confirmation closed, the page behind it as if nothing happened. */
export const ClosedWithToast: Story = {
  render: () => (
    <div className="relative h-svh bg-background">
      <div
        role="status"
        className="absolute top-4 right-4 w-72 rounded-lg bg-popover px-4 py-3 text-sm text-popover-foreground shadow-lg ring-[0.5px] ring-border"
      >
        Project failed to delete.
      </div>
    </div>
  ),
}

export const AreYouSure: Story = {
  render: () => (
    <>
      <Page />
      <AlertDialog open>
        <AlertDialogContent onOpenAutoFocus={keepFocus}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Please confirm you want to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  ),
}

export const BlueDelete: Story = {
  render: () => (
    <>
      <Page />
      <AlertDialog open>
        <AlertDialogContent onOpenAutoFocus={keepFocus}>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the project and its files.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  ),
}

/** The reason dialog: the change as badges, then the reason, as Status Change With a Reason builds it. */
export const ReasonDialog: Story = {
  render: () => (
    <>
      <Page />
      <AlertDialog open>
        <AlertDialogContent onOpenAutoFocus={keepFocus}>
          <AlertDialogHeader>
            <AlertDialogTitle>Change to Lost?</AlertDialogTitle>
            <AlertDialogDescription className="sr-only">
              Northwind Payments moves from Demo to Lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center gap-2" aria-hidden>
            <Badge variant="secondary">Demo</Badge>
            <ArrowRightIcon className="size-4 text-muted-foreground" />
            <Badge variant="outline">Lost</Badge>
          </div>
          <Field>
            <FieldLabel htmlFor="reason">Reason for Change</FieldLabel>
            <Textarea
              id="reason"
              rows={3}
              placeholder="e.g. Chose another processor."
            />
          </Field>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Change to Lost</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  ),
}

function ContactFields() {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input id="name" />
      </Field>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" placeholder="name@example.com" />
      </Field>
      <Field>
        <FieldLabel htmlFor="phone">Phone (Optional)</FieldLabel>
        <Input id="phone" />
      </Field>
      <Field>
        <FieldLabel htmlFor="notes">Notes (Optional)</FieldLabel>
        <Textarea id="notes" />
      </Field>
    </FieldGroup>
  )
}

export const FormInSheet: Story = {
  render: () => (
    <>
      <Page />
      <Sheet open>
        <SheetContent onOpenAutoFocus={keepFocus}>
          <SheetHeader>
            <SheetTitle>Add Contact</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4">
            <ContactFields />
          </div>
          <SheetFooter className="flex-row justify-end">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  ),
}

export const RecordSheet: Story = {
  render: () => (
    <>
      <Page />
      <Sheet open>
        <SheetContent onOpenAutoFocus={keepFocus}>
          <SheetHeader>
            <SheetTitle>Edit Contact</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4">
            <ContactFields />
          </div>
          <SheetFooter className="flex-row">
            <Button variant="destructive" className="mr-auto">
              Delete
            </Button>
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  ),
}

export const FormInDialog: Story = {
  render: () => (
    <>
      <Page />
      <Dialog open>
        <DialogContent onOpenAutoFocus={keepFocus}>
          <DialogHeader>
            <DialogTitle>Add Contact</DialogTitle>
          </DialogHeader>
          <ContactFields />
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  ),
}
