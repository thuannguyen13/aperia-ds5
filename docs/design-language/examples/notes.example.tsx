import { useEffect, useRef, useState, useTransition } from "react"
import {
  ArrowRightIcon,
  PencilIcon,
  PlusIcon,
  StickyNoteIcon,
  Trash2Icon,
} from "lucide-react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ConfirmDialog,
  EmptyState,
  Field,
  FieldError,
  FieldLabel,
  FormSheet,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetForm,
  Textarea,
  ToggleGroup,
  ToggleGroupItem,
  useSheetForm,
  type FormSchema,
} from "aperia-ds5"
import {
  IconButton,
  LengthCount,
  RecordActivity,
  Timeline,
  TimelineEntry,
  TimelineSaid,
  TimelineWhen,
} from "../recipes"
import { BeforeAfter, Screen } from "./before-after"

const NOTE_MAX = 2000
const hoursAgo = (hours: number) => new Date(Date.now() - hours * 3_600_000)
const ME = "Dana Whitfield"

type Note = {
  id: number
  text: string
  at: Date
  user: string
  /** The record it was written on, when that isn't this page's. */
  on?: string
}

const NOTES: Note[] = [
  {
    id: 3,
    text: "Sent the revised rate sheet. Waiting on their processor contract end date.",
    at: hoursAgo(3),
    user: ME,
  },
  {
    id: 2,
    text: "Northwind wants one statement across both their gateways, and interchange-plus pricing before their board meets on the 14th. Their current processor contract ends in March, with a $495 early termination fee they’d like us to cover.",
    at: hoursAgo(52),
    user: "Maria Chen",
    on: "Opportunity #659",
  },
  {
    id: 1,
    text: "Asked about chargeback handling for recurring billing. Looping in the risk team before we quote.",
    at: hoursAgo(140),
    user: ME,
  },
]

const noteSchema: FormSchema<{ text: string }> = {
  safeParse(input) {
    const value = input as { text: string }
    return value.text.trim()
      ? { success: true, data: value }
      : {
          success: false,
          error: { issues: [{ path: ["text"], message: "Enter a note." }] },
        }
  },
}

function NoteForm({ onAdd }: { onAdd: (text: string) => void }) {
  const form = useSheetForm({ text: "" })
  const { draft, set, errors, check } = form
  const [pending, startTransition] = useTransition()
  function submit() {
    const parsed = check(noteSchema, draft)
    if (parsed) startTransition(() => onAdd(parsed.text.trim()))
  }
  return (
    <SheetForm
      form={form}
      onSubmit={submit}
      pending={pending}
      submit="Add Note"
    >
      <Field data-invalid={Boolean(errors.text)}>
        <FieldLabel htmlFor="note-text">Note</FieldLabel>
        <Textarea
          id="note-text"
          autoFocus
          rows={8}
          maxLength={NOTE_MAX}
          aria-invalid={Boolean(errors.text)}
          value={draft.text}
          onChange={(event) => set("text", event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              event.preventDefault()
              submit()
            }
          }}
        />
        <LengthCount value={draft.text} max={NOTE_MAX} />
        <FieldError>{errors.text}</FieldError>
      </Field>
    </SheetForm>
  )
}

/** The Notes card: whole notes, Add Note in the header or the empty state, and the author’s Delete. */
export function NotesCardExample() {
  const [notes, setNotes] = useState(NOTES)
  const [shown, setShown] = useState<"notes" | "empty">("notes")
  const [adding, setAdding] = useState(false)
  const [deleting, setDeleting] = useState<Note | null>(null)
  const items = shown === "empty" ? [] : notes

  const add = (
    <Button variant="outline" onClick={() => setAdding(true)}>
      <PlusIcon data-icon="inline-start" />
      Add Note
    </Button>
  )

  return (
    <Screen
      controls={
        <>
          <span>Show</span>
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            aria-label="State to show"
            value={shown}
            onValueChange={(next) => next && setShown(next as typeof shown)}
          >
            <ToggleGroupItem value="notes">Notes</ToggleGroupItem>
            <ToggleGroupItem value="empty">No Notes</ToggleGroupItem>
          </ToggleGroup>
        </>
      }
      caption="Point at one of your notes to see Delete Note. Add Note opens the sheet; ⌘↵ saves."
    >
      <div className="max-w-xl">
        <RecordActivity
          title="Notes"
          items={items}
          add={add}
          empty={
            <EmptyState icon={StickyNoteIcon} title="No Notes" action={add} />
          }
          list={(list) => (
            <Timeline>
              {list.map((note, at) => (
                <TimelineEntry
                  key={note.id}
                  icon={StickyNoteIcon}
                  title="Note"
                  boxed
                  last={at === list.length - 1}
                >
                  <div className="group relative self-stretch rounded-lg bg-muted/60 py-2 pr-10 pl-3">
                    <p className="text-xs leading-5 whitespace-pre-line text-foreground">
                      {note.text}
                    </p>
                    {note.user === ME && (
                      <IconButton
                        label="Delete Note"
                        size="icon-xs"
                        className="absolute top-1.5 right-1.5 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 pointer-coarse:opacity-100"
                        onClick={() => setDeleting(note)}
                      >
                        <Trash2Icon />
                      </IconButton>
                    )}
                  </div>
                  <TimelineWhen date={note.at} user={note.user}>
                    {note.on && (
                      <>
                        <span aria-hidden>·</span>
                        <span className="truncate">{note.on}</span>
                      </>
                    )}
                  </TimelineWhen>
                </TimelineEntry>
              ))}
            </Timeline>
          )}
        />
      </div>
      <FormSheet open={adding} onOpenChange={setAdding} title="Add Note">
        {adding && (
          <NoteForm
            onAdd={(text) => {
              setNotes((was) => [
                { id: Date.now(), text, at: new Date(), user: ME },
                ...was,
              ])
              setShown("notes")
              setAdding(false)
            }}
          />
        )}
      </FormSheet>
      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete Note?"
        action="Delete Note"
        onConfirm={() => {
          setNotes((was) => was.filter((note) => note.id !== deleting?.id))
          setDeleting(null)
        }}
      >
        This permanently deletes the note.
      </ConfirmDialog>
    </Screen>
  )
}

/** A note under another entry: three lines at most, and View Note only when it’s cut short, measured as it resizes. */
function NotePreview({
  text,
  what,
  when,
}: {
  text: string
  what: string
  when: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [cut, setCut] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const measure = () =>
      setCut(element.scrollHeight > element.clientHeight + 1)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [text])
  return (
    <>
      <div className="mt-1.5 self-stretch rounded-lg bg-muted/60 px-3 py-2">
        <p
          ref={ref}
          className="line-clamp-3 text-xs leading-5 whitespace-pre-line text-foreground"
        >
          {text}
        </p>
      </div>
      {cut && (
        <Button
          variant="link"
          size="xs"
          className="h-auto self-start px-0"
          onClick={() => setOpen(true)}
        >
          View Note
        </Button>
      )}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="data-[side=right]:sm:max-w-xl">
          <SheetHeader className="border-b">
            <SheetTitle>Note</SheetTitle>
            <SheetDescription>
              {what}, {when}
            </SheetDescription>
          </SheetHeader>
          <p className="px-4 pb-4 text-sm whitespace-pre-line">{text}</p>
        </SheetContent>
      </Sheet>
    </>
  )
}

const strong = (text: string) => <span className="text-foreground">{text}</span>

/** Activity with two stage changes: a short reason that fits, and a long one cut to three lines with View Note. */
export function NotePreviewExample() {
  return (
    <Screen caption="Narrow the window: View Note shows only while the note is cut short.">
      <div className="max-w-xl">
        <RecordActivity
          items={[0, 1, 2]}
          list={() => (
            <Timeline>
              <TimelineEntry icon={ArrowRightIcon} title="Stage change">
                <TimelineSaid>
                  Changed stage from {strong("Demo")} to {strong("Proposal")}
                </TimelineSaid>
                <TimelineWhen date={hoursAgo(5)} user="Maria Chen" />
                <NotePreview
                  what="Maria Chen changed the stage from Demo to Proposal"
                  when="today"
                  text={NOTES[1].text + " " + NOTES[0].text}
                />
              </TimelineEntry>
              <TimelineEntry icon={ArrowRightIcon} title="Stage change">
                <TimelineSaid>
                  Changed stage from {strong("Qualification")} to{" "}
                  {strong("Demo")}
                </TimelineSaid>
                <TimelineWhen date={hoursAgo(76)} user={ME} />
                <NotePreview
                  what="Dana Whitfield changed the stage from Qualification to Demo"
                  when="3 days ago"
                  text="Demo booked for Thursday with their CFO."
                />
              </TimelineEntry>
              <TimelineEntry icon={PencilIcon} title="Edit" last>
                <TimelineSaid>
                  Changed expected close to {strong("12/15/2026")}
                </TimelineSaid>
                <TimelineWhen date={hoursAgo(120)} user="James Ortiz" />
              </TimelineEntry>
            </Timeline>
          )}
        />
      </div>
    </Screen>
  )
}

/** Titan’s Merchant Notes card against the Notes card. */
export function NotesBeforeAfter() {
  return (
    <BeforeAfter
      beforeNote="“Merchant Notes”, an add box always open, a red bin that deletes at once"
      afterNote="“Notes”, Add Note in the header, a quiet bin that asks first"
      before={
        <Card className="gap-4 py-3">
          <CardHeader className="px-3">
            <CardTitle className="text-sm font-semibold">
              Merchant Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 px-3">
            <div className="flex flex-col items-end gap-2">
              <Textarea
                aria-label="Add a note"
                placeholder="Add a note"
                className="min-h-16"
              />
              <Button size="sm" disabled>
                Add Note
              </Button>
            </div>
            <div className="flex items-start gap-3 rounded-lg p-3 shadow-sm ring-[0.5px] ring-border">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="font-medium">Dana Whitfield</span>
                <span className="text-xs text-muted-foreground">
                  11/23/2026 09:12 AM
                </span>
                <p>Sent the revised rate sheet.</p>
              </div>
              <Button variant="outline" size="icon-sm" aria-label="Edit note">
                <PencilIcon />
              </Button>
              <Button
                variant="destructive"
                size="icon-sm"
                aria-label="Delete note"
              >
                <Trash2Icon />
              </Button>
            </div>
          </CardContent>
        </Card>
      }
      after={
        <RecordActivity
          title="Notes"
          items={[NOTES[0]]}
          add={
            <Button variant="outline">
              <PlusIcon data-icon="inline-start" />
              Add Note
            </Button>
          }
          list={(list) => (
            <Timeline>
              {list.map((note) => (
                <TimelineEntry
                  key={note.id}
                  icon={StickyNoteIcon}
                  title="Note"
                  boxed
                  last
                >
                  <div className="relative self-stretch rounded-lg bg-muted/60 py-2 pr-10 pl-3">
                    <p className="text-xs leading-5 text-foreground">
                      {note.text}
                    </p>
                    <IconButton
                      label="Delete Note"
                      size="icon-xs"
                      className="absolute top-1.5 right-1.5"
                    >
                      <Trash2Icon />
                    </IconButton>
                  </div>
                  <TimelineWhen date={note.at} user={note.user} />
                </TimelineEntry>
              ))}
            </Timeline>
          )}
        />
      }
    />
  )
}

export const notesExamples = {
  "Notes card": <NotesCardExample />,
  "Note preview": <NotePreviewExample />,
  "Before and after": <NotesBeforeAfter />,
}
