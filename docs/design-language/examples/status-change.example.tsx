import { useId, useRef, useState } from "react"
import { toast } from "sonner"
import { ArrowRightIcon, ChevronDownIcon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Label,
  Popover,
  PopoverAnchor,
  PopoverContent,
  RadioGroup,
  RadioGroupItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  Toaster,
} from "aperia-ds5"
import { IconButton, LengthCount } from "../recipes"
import { BeforeAfter, Screen } from "./before-after"

const REASON_MAX = 2000
const wait = (ms: number) => new Promise((done) => setTimeout(done, ms))

const DISPOSITIONS = [
  "Cleared, No Action",
  "Contact Merchant",
  "Hold Funds",
  "Termination Recommended",
]

const STAGES = ["Discovery", "Qualification", "Demo", "Proposal", "Closed Lost"]
const LOST_REASONS = ["Went with a competitor", "Pricing", "No decision"]

/** The change, the choices, and the reason: the body the popover and the dialog share. */
function ChangeForm({
  from,
  choices,
  initial,
  lostAt,
  onDone,
  onCancel,
  heading,
}: {
  from: string
  choices: string[]
  initial: string
  lostAt?: string
  onDone: (to: string) => void
  onCancel: () => void
  heading: (to: string) => React.ReactNode
}) {
  const id = useId()
  const [to, setTo] = useState(initial)
  const [lostReason, setLostReason] = useState(LOST_REASONS[0])
  const [reason, setReason] = useState("")
  const [error, setError] = useState<string>()
  const [pending, setPending] = useState(false)
  const reasonRef = useRef<HTMLTextAreaElement>(null)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!reason.trim()) {
      setError("Enter a reason for the change.")
      reasonRef.current?.focus()
      return
    }
    setPending(true)
    await wait(900)
    setPending(false)
    onDone(to)
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      {heading(to)}
      <div className="flex flex-wrap items-center gap-2" aria-hidden>
        <Badge variant="secondary">{from}</Badge>
        <ArrowRightIcon className="size-4 text-muted-foreground" />
        <Badge variant="outline">{to}</Badge>
      </div>
      <fieldset disabled={pending} className="flex flex-col gap-4">
        <FieldSet>
          <FieldLegend variant="label">Change To</FieldLegend>
          <RadioGroup value={to} onValueChange={setTo}>
            {choices
              .filter((choice) => choice !== from)
              .map((choice) => (
                <Field key={choice} orientation="horizontal">
                  <RadioGroupItem value={choice} id={`${id}-${choice}`} />
                  <FieldLabel
                    htmlFor={`${id}-${choice}`}
                    className="font-normal"
                  >
                    {choice}
                  </FieldLabel>
                </Field>
              ))}
          </RadioGroup>
        </FieldSet>
        {lostAt === to && (
          <FieldSet>
            <FieldLegend variant="label">Lost Reason</FieldLegend>
            <RadioGroup value={lostReason} onValueChange={setLostReason}>
              {LOST_REASONS.map((choice) => (
                <Field key={choice} orientation="horizontal">
                  <RadioGroupItem value={choice} id={`${id}-lost-${choice}`} />
                  <FieldLabel
                    htmlFor={`${id}-lost-${choice}`}
                    className="font-normal"
                  >
                    {choice}
                  </FieldLabel>
                </Field>
              ))}
            </RadioGroup>
          </FieldSet>
        )}
        <Field data-invalid={Boolean(error)}>
          <FieldLabel htmlFor={`${id}-reason`}>Reason for Change</FieldLabel>
          <Textarea
            ref={reasonRef}
            id={`${id}-reason`}
            autoFocus
            rows={3}
            maxLength={REASON_MAX}
            placeholder="e.g. Owner confirmed the refund spike was a promotion."
            aria-invalid={Boolean(error)}
            value={reason}
            onChange={(event) => {
              setReason(event.target.value)
              setError(undefined)
            }}
          />
          <LengthCount value={reason} max={REASON_MAX} />
          <FieldError>{error}</FieldError>
        </Field>
      </fieldset>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={pending}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" aria-disabled={pending || undefined}>
          {pending && <Spinner data-icon="inline-start" />}
          Change to {to}
        </Button>
      </div>
    </form>
  )
}

type Alert = { mid: string; name: string; status: string }

const ALERTS: Alert[] = [
  { mid: "492001837716", name: "Harbor Lane Bistro LLC", status: "Unworked" },
  { mid: "492001902245", name: "Apex Digital Goods Inc", status: "Unworked" },
  {
    mid: "492001655390",
    name: "Northgate Auto Repair",
    status: "Cleared, No Action",
  },
]

function StatusCell({
  alert,
  onChange,
}: {
  alert: Alert
  onChange: (status: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <span className="flex items-center gap-1">
        <PopoverAnchor asChild>
          <Badge variant="secondary">{alert.status}</Badge>
        </PopoverAnchor>
        <IconButton
          label={`Change Disposition for ${alert.name}`}
          size="icon-xs"
          onClick={() => setOpen(true)}
        >
          <ChevronDownIcon />
        </IconButton>
      </span>
      <PopoverContent align="start" className="w-80">
        <ChangeForm
          from={alert.status}
          choices={DISPOSITIONS}
          initial={DISPOSITIONS.find((d) => d !== alert.status) ?? ""}
          onCancel={() => setOpen(false)}
          onDone={(to) => {
            const was = alert.status
            onChange(to)
            setOpen(false)
            toast(`Changed to ${to}.`, {
              action: { label: "Undo", onClick: () => onChange(was) },
            })
          }}
          heading={(to) => <p className="font-medium">Change to {to}?</p>}
        />
      </PopoverContent>
    </Popover>
  )
}

function RecordChange() {
  const [stage, setStage] = useState("Demo")
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-wrap items-center gap-3 surface px-4 py-3">
      <span className="text-muted-foreground">Cedar Credit Union</span>
      <Badge variant="outline">{stage}</Badge>
      <Button
        variant="outline"
        className="ml-auto"
        onClick={() => setOpen(true)}
      >
        Change Stage
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <ChangeForm
            key={String(open)}
            from={stage}
            choices={STAGES}
            initial="Closed Lost"
            lostAt="Closed Lost"
            onCancel={() => setOpen(false)}
            onDone={(to) => {
              const was = stage
              setStage(to)
              setOpen(false)
              toast(`Changed to ${to}.`, {
                action: { label: "Undo", onClick: () => setStage(was) },
              })
            }}
            heading={(to) => (
              <AlertDialogHeader>
                <AlertDialogTitle>Change to {to}?</AlertDialogTitle>
                <AlertDialogDescription className="sr-only">
                  Cedar Credit Union moves from {stage} to {to}.
                </AlertDialogDescription>
              </AlertDialogHeader>
            )}
          />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

/** A disposition changed from a table row, and a stage changed from a record page. */
export function StatusChangeExample() {
  const [alerts, setAlerts] = useState(ALERTS)
  return (
    <>
      <Toaster />
      <Screen caption="Press the chevron beside a status, or Change Stage. Press the button with no reason to see the refusal.">
        <div className="overflow-x-auto surface">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Disposition</TableHead>
                <TableHead>MID</TableHead>
                <TableHead className="pr-4">Merchant Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.mid}>
                  <TableCell className="pl-4">
                    <StatusCell
                      alert={alert}
                      onChange={(status) =>
                        setAlerts((was) =>
                          was.map((each) =>
                            each.mid === alert.mid ? { ...each, status } : each
                          )
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="tabular-nums">{alert.mid}</TableCell>
                  <TableCell className="pr-4">{alert.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <RecordChange />
      </Screen>
    </>
  )
}

/** Titan's solid status button and its Submit, against the badge and a named change with a reason. */
export function StatusChangeBeforeAfter() {
  return (
    <BeforeAfter
      beforeNote="a solid button as the status; no reason; Submit grayed out until a pick"
      afterNote="a badge and a chevron; the change shown, a reason asked, the button names it"
      before={
        <div className="flex flex-col gap-3">
          <ButtonGroup>
            <Button size="xs" className="bg-blue-600 text-white">
              Unworked
            </Button>
            <Button
              size="icon-xs"
              className="bg-blue-600 text-white"
              aria-label="Open"
            >
              <ChevronDownIcon />
            </Button>
          </ButtonGroup>
          <div className="flex flex-col gap-3 rounded-lg bg-popover p-3 shadow-md ring-[0.5px] ring-border">
            <p className="font-medium">Mark Work</p>
            <div className="flex items-center gap-2">
              <Checkbox id="before-wip" />
              <Label htmlFor="before-wip" className="font-normal">
                Work in Progress
              </Label>
            </div>
            <p className="font-medium">Disposition</p>
            <RadioGroup>
              {DISPOSITIONS.slice(0, 2).map((choice) => (
                <div key={choice} className="flex items-center gap-2">
                  <RadioGroupItem value={choice} id={`before-${choice}`} />
                  <Label htmlFor={`before-${choice}`} className="font-normal">
                    {choice}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline">
                Cancel
              </Button>
              <Button size="sm" disabled>
                Submit
              </Button>
            </div>
          </div>
        </div>
      }
      after={
        <div className="flex flex-col gap-3">
          <span className="flex items-center gap-1">
            <Badge variant="secondary">Unworked</Badge>
            <IconButton
              label="Change Disposition for Harbor Lane Bistro LLC"
              size="icon-xs"
            >
              <ChevronDownIcon />
            </IconButton>
          </span>
          <div className="flex flex-col gap-3 rounded-lg bg-popover p-3 shadow-md ring-[0.5px] ring-border">
            <p className="font-medium">Change to Contact Merchant?</p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Unworked</Badge>
              <ArrowRightIcon className="size-4 text-muted-foreground" />
              <Badge variant="outline">Contact Merchant</Badge>
            </div>
            <Field data-invalid>
              <FieldLabel htmlFor="after-reason">Reason for Change</FieldLabel>
              <Textarea id="after-reason" rows={2} aria-invalid />
              <FieldError>Enter a reason for the change.</FieldError>
            </Field>
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline">
                Cancel
              </Button>
              <Button size="sm">Change to Contact Merchant</Button>
            </div>
          </div>
        </div>
      }
    />
  )
}

export const statusChangeExamples = {
  "How it looks and behaves": <StatusChangeExample />,
  "Before and after": <StatusChangeBeforeAfter />,
}
