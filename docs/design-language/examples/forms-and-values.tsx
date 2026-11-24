import {
  ArrowDownIcon,
  ArrowUpIcon,
  GripVerticalIcon,
  PlusIcon,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  Button,
  EntityPicker,
  Field,
  FieldLabel,
  FileDrop,
  Input,
  MoneyInput,
  NativeSelect,
  NativeSelectOption,
  Switch,
} from "aperia-ds5"
import { FlagSwitch, HiddenValue, StatTile } from "../recipes"
import { DoDont } from "../blocks"

// Live Do / Don't pairs for the Patterns pages on forms, actions and values, keyed by the rule's heading.

const narrow = "w-full max-w-60"

const PROSPECTS = [
  { id: "1", name: "First National Bank", detail: "Omaha, NE" },
  { id: "2", name: "Harbor Freight Payments", detail: "Chicago, IL" },
]

const prospectItems = PROSPECTS.map((p) => ({
  id: p.id,
  name: p.name,
  detail: p.detail,
  picture: { shape: "square" as const, fallback: p.name.slice(0, 1) },
}))

function Labeled({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <Field className={narrow}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {children}
    </Field>
  )
}

export const formsExamples = {
  "Mark optional fields, not required ones": (
    <DoDont
      good={
        <div className={`${narrow} flex flex-col gap-4`}>
          <Labeled id="do-name" label="Name">
            <Input id="do-name" />
          </Labeled>
          <Labeled id="do-phone" label="Phone (Optional)">
            <Input id="do-phone" />
          </Labeled>
        </div>
      }
      bad={
        <div className={`${narrow} flex flex-col gap-4`}>
          <Labeled id="dont-name" label="Name *">
            <Input id="dont-name" />
          </Labeled>
          <Labeled id="dont-phone" label="Phone">
            <Input id="dont-phone" />
          </Labeled>
        </div>
      }
      badNote="a marker on the required field, nothing on the optional one"
    />
  ),
  "Give every field a short label": (
    <DoDont
      good={
        <Labeled id="do-email" label="Email">
          <Input id="do-email" placeholder="name@example.com" />
        </Labeled>
      }
      goodNote="the placeholder is an example"
      bad={
        <Input
          className={narrow}
          aria-label="Email"
          placeholder="Please enter your email"
        />
      }
      badNote="no label, an instruction in the placeholder"
    />
  ),
}

export const pickerExamples = {
  "Show each record's picture": (
    <DoDont
      good={
        <Labeled id="do-prospect" label="Prospect">
          <EntityPicker
            id="do-prospect"
            items={prospectItems}
            value="1"
            placeholder="Pick a prospect"
            onChange={() => {}}
          />
        </Labeled>
      }
      goodNote="open it: each row has its logo and city"
      bad={
        <Labeled id="dont-prospect" label="Prospect">
          <NativeSelect id="dont-prospect" defaultValue="1">
            {PROSPECTS.map((p) => (
              <NativeSelectOption key={p.id} value={p.id}>
                {p.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Labeled>
      }
      badNote="a plain list of names"
    />
  ),
}

export const disabledExamples = {
  "Put a field's reason under it": (
    <DoDont
      good={
        <Labeled id="do-contact" label="Contact">
          <EntityPicker
            id="do-contact"
            items={[]}
            value=""
            placeholder="Pick a contact"
            disabled
            reason="Pick a prospect first."
            onChange={() => {}}
          />
        </Labeled>
      }
      bad={
        <Labeled id="dont-contact" label="Contact">
          <Input
            id="dont-contact"
            disabled
            placeholder="Pick a prospect first"
          />
        </Labeled>
      }
      badNote="the reason in the placeholder"
    />
  ),
}

export const moneyExamples = {
  "Write amounts in full": (
    <DoDont
      good={<StatTile label="Won This Quarter" value="$1,840,000" />}
      bad={<StatTile label="Won This Quarter" value="$1.8M" />}
      badNote="shortened"
    />
  ),
  "Use the money field for money": (
    <DoDont
      good={
        <Labeled id="do-volume" label="Monthly Volume">
          <MoneyInput id="do-volume" value="1250000" onChange={() => {}} />
        </Labeled>
      }
      goodNote="$ and commas shown, digits saved"
      bad={
        <Labeled id="dont-volume" label="Monthly Volume">
          <Input id="dont-volume" type="number" defaultValue={1250000} />
        </Labeled>
      }
      badNote="a number field: no $, no commas"
    />
  ),
  "Hide an amount with its shape": (
    <DoDont
      good={
        <span className="text-sm">
          Monthly Volume: <HiddenValue />
        </span>
      }
      bad={
        <span className="text-sm">
          Monthly Volume: <span className="text-muted-foreground">Hidden</span>
        </span>
      }
    />
  ),
}

export const fileExamples = {
  "Say what the drop zone accepts": (
    <DoDont
      good={
        <div className={narrow}>
          <FileDrop
            id="do-drop"
            label="Upload files"
            hint="PDF or XLSX, up to 4 MB each."
            onFiles={() => {}}
          />
        </div>
      }
      bad={
        <div className={narrow}>
          <FileDrop id="dont-drop" label="Upload files" onFiles={() => {}} />
        </div>
      }
      badNote="no word on what it takes"
    />
  ),
}

const STAGES = ["Discovery", "Demo", "Proposal"]

export const reorderExamples = {
  "Drag by the grip, or move from the keyboard": (
    <DoDont
      good={
        <ul className={`${narrow} flex flex-col`}>
          {STAGES.map((stage) => (
            <li key={stage} className="flex h-9 items-center gap-2 border-b">
              <GripVerticalIcon className="size-4 text-muted-foreground" />
              {stage}
            </li>
          ))}
        </ul>
      }
      goodNote="see the live list above"
      bad={
        <ul className={`${narrow} flex flex-col`}>
          {STAGES.map((stage) => (
            <li key={stage} className="flex h-9 items-center gap-1 border-b">
              <span className="flex-1">{stage}</span>
              <Button variant="ghost" size="icon-xs" aria-label="Move Up">
                <ArrowUpIcon />
              </Button>
              <Button variant="ghost" size="icon-xs" aria-label="Move Down">
                <ArrowDownIcon />
              </Button>
            </li>
          ))}
        </ul>
      }
      badNote="Move Up / Move Down buttons"
    />
  ),
}

export const switchExamples = {
  "Show the word, not only the color": (
    <DoDont
      good={
        <FlagSwitch
          on
          label="Prospect assigned to me, Email"
          onChange={() => {}}
        />
      }
      bad={<Switch checked aria-label="Prospect assigned to me, Email" />}
      badNote="the state is only its color"
    />
  ),
}

// Buttons and Actions imports this; its rules have no pair in this file.
export const actionExamples = {}

export const cardTileExamples = {
  "Label what a tile's number counts": (
    <DoDont
      good={
        <div className="w-48">
          <StatTile label="Overdue Tasks" value="3" />
        </div>
      }
      bad={
        <div className="flex w-48 flex-col gap-0.5 surface px-4 py-3">
          <span className="text-2xl font-semibold text-destructive tabular-nums">
            3
          </span>
        </div>
      }
      goodNote="the label says what it counts, in the body color"
      badNote="a red number that says nothing"
    />
  ),
  "Put Add in the header, beside the records": (
    <DoDont
      good={
        <div className="flex w-full max-w-sm items-center justify-between">
          <span className="font-semibold">Tasks</span>
          <Button variant="outline">
            <PlusIcon />
            Add
          </Button>
        </div>
      }
      bad={
        <div className="flex w-full max-w-sm flex-col items-start gap-3">
          <span className="font-semibold">Tasks</span>
          <span className="text-muted-foreground">3 tasks</span>
          <Button>Add New Task</Button>
        </div>
      }
      badNote="Add under the list, in blue"
    />
  ),
}

export const peopleExamples = {
  "Show people as circles and companies, products, and teams as squares": (
    <DoDont
      good={
        <>
          <span className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>DW</AvatarFallback>
            </Avatar>
            Dana Whitfield
          </span>
          <span className="flex items-center gap-2">
            <Avatar shape="square">
              <AvatarFallback>AF</AvatarFallback>
            </Avatar>
            Acme Foods
          </span>
        </>
      }
      bad={
        <>
          <span className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>DW</AvatarFallback>
            </Avatar>
            Dana Whitfield
          </span>
          <span className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>AF</AvatarFallback>
            </Avatar>
            Acme Foods
          </span>
        </>
      }
      badNote="a company in a circle"
    />
  ),
  "Show a picture without a frame": (
    <DoDont
      good={
        <Avatar>
          <AvatarFallback>DW</AvatarFallback>
        </Avatar>
      }
      bad={
        <Avatar className="shadow-md ring-2 ring-primary">
          <AvatarFallback>DW</AvatarFallback>
        </Avatar>
      }
      badNote="a ring and a shadow"
    />
  ),
}
