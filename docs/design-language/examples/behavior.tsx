import { useId, useState } from "react"
import { toast } from "sonner"
import { EllipsisIcon, PencilIcon, Trash2Icon } from "lucide-react"
import {
  BlockedMenuItem,
  Button,
  Checkbox,
  ConfirmDialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Field,
  FieldError,
  FieldLabel,
  FormSheet,
  IN_USE_DELETE,
  Input,
  RecordActions,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetForm,
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useSheet,
  useSheetForm,
} from "aperia-ds5"
import { FlagSwitch } from "../recipes"
import { DoDont, Example } from "../blocks"

// Live examples for Saving and Feedback and for Disabled With a Reason, keyed by the page's headings. The toasts here
// show in the one Toaster that the Saving and Feedback page mounts under its lead.

const noop = () => {}

/** Two channels of one notification, each a flag switch, with an optional Save button under them for a Don't. */
function Channels({
  withSave = false,
  onFlip,
}: {
  withSave?: boolean
  onFlip?: (on: boolean) => void
}) {
  const [value, setValue] = useState({ app: true, email: false })
  return (
    <div className="flex flex-col items-start gap-1">
      {(
        [
          ["app", "In App"],
          ["email", "Email"],
        ] as const
      ).map(([key, label]) => (
        <div key={key} className="flex items-center gap-3">
          <span className="w-14 text-muted-foreground">{label}</span>
          <FlagSwitch
            on={value[key]}
            label={`Pipeline: Opportunity assignment, ${label}`}
            onChange={(on) => {
              setValue((was) => ({ ...was, [key]: on }))
              onFlip?.(on)
            }}
          />
        </div>
      ))}
      {withSave && <Button className="mt-3">Save Changes</Button>}
    </div>
  )
}

/** A task's box that saves at once and offers Undo. */
function TickWithUndo() {
  const id = useId()
  const [done, setDone] = useState(false)
  return (
    <Field orientation="horizontal" className="w-fit">
      <Checkbox
        id={id}
        checked={done}
        onCheckedChange={(on) => {
          setDone(on === true)
          if (on === true)
            toast("Task completed.", {
              action: { label: "Undo", onClick: () => setDone(false) },
            })
        }}
      />
      <FieldLabel htmlFor={id}>Send Proposal</FieldLabel>
    </Field>
  )
}

/** A task's box that asks before it saves. */
function TickWithQuestion() {
  const id = useId()
  const [done, setDone] = useState(false)
  const [asking, setAsking] = useState(false)
  return (
    <Field orientation="horizontal" className="w-fit">
      <Checkbox
        id={id}
        checked={done}
        onCheckedChange={(on) =>
          on === true ? setAsking(true) : setDone(false)
        }
      />
      <FieldLabel htmlFor={id}>Send Proposal</FieldLabel>
      <ConfirmDialog
        open={asking}
        onOpenChange={setAsking}
        title="Mark Task as Done?"
        action="Mark as Done"
        variant="default"
        onConfirm={() => setDone(true)}
      >
        You are marking Send Proposal as done.
      </ConfirmDialog>
    </Field>
  )
}

/** The note form as an app writes it: a fresh draft each opening, and Discard Changes? once something was typed. */
function NoteForm({ onDone }: { onDone: () => void }) {
  const form = useSheetForm({ note: "" })
  return (
    <SheetForm form={form} onSubmit={onDone} pending={false} submit="Add Note">
      <Field>
        <FieldLabel htmlFor="discard-do-note">Note</FieldLabel>
        <Input
          id="discard-do-note"
          autoFocus
          value={form.draft.note}
          onChange={(event) => form.set("note", event.target.value)}
        />
      </Field>
    </SheetForm>
  )
}

function FreshSheet() {
  const sheet = useSheet(null)
  return (
    <>
      <Button variant="outline" onClick={() => sheet.show(null)}>
        Add Note
      </Button>
      <FormSheet
        open={sheet.open}
        onOpenChange={sheet.onOpenChange}
        title="Add Note"
      >
        <NoteForm key={sheet.key} onDone={() => sheet.onOpenChange(false)} />
      </FormSheet>
    </>
  )
}

/** A sheet whose draft lives outside it: it closes without asking and reopens with what was typed last time. */
function StaleSheet() {
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState("Call back about the Q3 rates and")
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Add Note
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          aria-describedby={undefined}
          className="data-[side=right]:sm:max-w-xl"
        >
          <SheetHeader className="border-b">
            <SheetTitle>Add Note</SheetTitle>
          </SheetHeader>
          <div className="flex-1 p-4">
            <Field>
              <FieldLabel htmlFor="discard-dont-note">Note</FieldLabel>
              <Input
                id="discard-dont-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </Field>
          </div>
          <SheetFooter className="flex-row justify-end border-t">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Add Note</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

export const savingExamples = {
  "Save a choice where it is made": (
    <DoDont
      good={<Channels />}
      goodNote="each switch saves as it is flipped"
      bad={<Channels withSave />}
      badNote="nothing saves until Save Changes"
    />
  ),
  "Offer Undo instead of asking first": (
    <DoDont
      good={<TickWithUndo />}
      goodNote="tick it: the toast offers Undo"
      bad={<TickWithQuestion />}
      badNote="a question before a change that can be taken back"
    />
  ),
  "Keep the label and the sheet while it saves": (
    <DoDont
      good={
        <>
          <Button variant="ghost">Cancel</Button>
          <Button disabled aria-busy>
            <Spinner data-icon="inline-start" />
            Save Changes
          </Button>
        </>
      }
      bad={
        <>
          <Button variant="ghost">Cancel</Button>
          <Button disabled>Saving…</Button>
        </>
      }
      badNote="the label says what is happening"
    />
  ),
  "Confirm only what the screen does not show": (
    <DoDont
      good={<Channels />}
      goodNote="flip it: the switch shows the change"
      bad={<Channels onFlip={() => toast("Setting saved.")} />}
      badNote="flip it: a toast repeats the switch"
    />
  ),
  "Discard a closed form's input": (
    <DoDont
      good={<FreshSheet />}
      goodNote="type, then press Escape: it asks first, and opens fresh"
      bad={<StaleSheet />}
      badNote="it closes without asking and reopens with old text"
    />
  ),
}

export const roleLimitExamples = {
  "How it looks and behaves": (
    <Example caption="Open the menu and point at Delete. The record is in use, so Delete stays in the menu and says why.">
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="More actions"
              >
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>More actions</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="w-auto">
          <DropdownMenuItem>
            <PencilIcon />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <BlockedMenuItem reason={IN_USE_DELETE}>
            <Trash2Icon />
            Delete
          </BlockedMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>
  ),
  "Leave out what a role can never do": (
    <DoDont
      good={<RecordActions onEdit={noop} />}
      goodNote="a role that never deletes"
      bad={
        <RecordActions
          onEdit={noop}
          onDelete={noop}
          deleteBlocked="You do not have access to delete prospects."
        />
      }
      badNote="a disabled Delete that the role can never use"
    />
  ),
  "Show a record read-only to someone who cannot change it": (
    <DoDont
      good={
        <div className="flex w-full max-w-60 flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="read-do-name">Name</FieldLabel>
            <Input id="read-do-name" value="Dana Whitfield" disabled readOnly />
          </Field>
          <div className="flex justify-end">
            <Button variant="outline">Close</Button>
          </div>
        </div>
      }
      goodNote="fields disabled, Close in place of Save"
      bad={
        <div className="flex w-full max-w-60 flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="read-dont-name">Name</FieldLabel>
            <Input id="read-dont-name" defaultValue="Dana Whitfield" />
          </Field>
          <FieldError>You do not have access to edit contacts.</FieldError>
          <div className="flex justify-end gap-2">
            <Button variant="ghost">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      }
      badNote="a form that refuses the save"
    />
  ),
}
