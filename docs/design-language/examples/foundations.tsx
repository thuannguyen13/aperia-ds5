import { useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { Unstyled } from "@storybook/addon-docs/blocks"
import {
  InboxIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  XIcon,
} from "lucide-react"
import {
  Badge,
  Button,
  CardContent,
  ConfirmDialog,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldError,
  FieldLabel,
  Input,
  NoResults,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  TooltipProvider,
} from "aperia-ds5"
import { cn } from "@/lib/utils"
import { DoDont, Example } from "../blocks"
import { DocTable, DocTD, DocTH } from "../skill-doc"
import { EmptyState, IconButton, TaskTable, TitledCard, Wide } from "./shared"
import { AppStatusColors, STATES } from "./app-status"

// Live examples for the Foundations pages, keyed by the skill files' headings. base.css is the only place a value
// lives: every sample here is drawn from its CSS variables (or the components' own classes), and the value printed
// beside it is read from the browser at render time, in the Light or Dark frame it sits in.

// ─── Reading values live ───────────────────────────────────────────────────

type Read = (style: CSSStyleDeclaration, el: HTMLElement) => string

/** A custom property as the element resolves it (its Light or Dark value), var() references substituted. */
const cssVar =
  (name: string): Read =>
  (style) =>
    style.getPropertyValue(name).trim()

/** One frame for an example, such as a spec table. A value that changes with the mode shows both samples (`InModes`). */
function Frame({ children }: { children: ReactNode }) {
  return (
    <Unstyled>
      <TooltipProvider>
        <div className="my-4 rounded-xl bg-background p-5 text-sm text-foreground ring-[0.5px] ring-border">
          {children}
        </div>
      </TooltipProvider>
    </Unstyled>
  )
}

const px = (value: string) => `${Math.round(parseFloat(value) * 100) / 100}px`

// ─── Color ────────────────────────────────────────────────────────────────

/** A menu's rows with the second highlighted, in a Light and a Dark panel side by side. */
function HoverRows({ highlight }: { highlight: string }) {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {["", "dark"].map((mode) => (
        <div key={mode} className={mode}>
          <div className="flex flex-col rounded-lg bg-popover p-1 text-sm text-popover-foreground ring-[0.5px] ring-border">
            {["Edit", "Duplicate", "Archive"].map((label, i) => (
              <span
                key={label}
                className={cn("rounded-md px-2 py-1.5", i === 1 && highlight)}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export const colorExamples = {
  "Use the primary color only for what it marks": (
    <DoDont
      good={
        <div className="grid w-full max-w-60 gap-3">
          <h3 className="text-base font-semibold">Tasks</h3>
          <Button className="justify-self-start">
            <PlusIcon />
            Add Task
          </Button>
        </div>
      }
      bad={
        <div className="grid w-full max-w-60 gap-3">
          <h3 className="flex items-center gap-1.5 text-base font-semibold text-primary">
            <InboxIcon className="size-4" />
            Tasks
          </h3>
          <Button size="xs" className="justify-self-start">
            Active
          </Button>
        </div>
      }
      goodNote="The primary color on the main action."
      badNote="A heading and icon in the primary color, a primary button as a status."
    />
  ),
  "Pick the role, not a fixed value": (
    <DoDont
      good={<HoverRows highlight="bg-muted" />}
      bad={<HoverRows highlight="bg-[#ececec]" />}
    />
  ),
  "Pair every color with a word or an icon": (
    <DoDont
      good={
        <>
          <AppStatusColors />
          <Badge className={STATES.overdue.className}>
            {STATES.overdue.label}
          </Badge>
        </>
      }
      bad={<span className="font-medium text-destructive tabular-nums">3</span>}
      goodNote="The app's Overdue badge: the color and the word."
      badNote="A red number alone."
    />
  ),
}

// ─── Typography ────────────────────────────────────────────────────────────

/** Every step of the type scale, and whether an Aperia app uses it. Size and line height are read live. */
const SCALE: { step: string; className: string; used: boolean }[] = [
  { step: "XS", className: "text-xs", used: true },
  { step: "SM", className: "text-sm", used: true },
  { step: "Base", className: "text-base", used: true },
  { step: "LG", className: "text-lg", used: false },
  { step: "XL", className: "text-xl", used: false },
  { step: "2XL", className: "text-2xl", used: true },
  { step: "3XL", className: "text-3xl", used: false },
  { step: "4XL", className: "text-4xl", used: false },
  { step: "5XL", className: "text-5xl", used: false },
  { step: "6XL", className: "text-6xl", used: false },
  { step: "7XL", className: "text-7xl", used: false },
  { step: "8XL", className: "text-8xl", used: false },
  { step: "9XL", className: "text-9xl", used: false },
]

const WEIGHTS = [
  { weight: "Regular", className: "font-normal" },
  { weight: "Medium", className: "font-medium" },
  { weight: "Semibold", className: "font-semibold" },
  { weight: "Bold", className: "font-bold" },
]

/**
 * One row of a spec table: the value's name and class, what the browser reads from its sample (`read`, given the
 * sample's computed style and the element marked `data-measure` inside it), what it is used for, and the sample.
 */
function SpecRow({
  name,
  code,
  read,
  value: given,
  note,
  sample,
}: {
  name: string
  code: string
  read?: Read
  /** A value to show instead of measuring one, such as the color token a border takes. */
  value?: ReactNode
  note?: ReactNode
  sample: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState("")
  useLayoutEffect(() => {
    const root = ref.current
    if (!root || !read) return
    const el =
      root.querySelector<HTMLElement>("[data-measure]") ??
      (root.firstElementChild as HTMLElement | null) ??
      root
    setValue(read(getComputedStyle(el), el))
  }, [read])
  return (
    <tr>
      <DocTD className="align-middle whitespace-nowrap">
        {name}
        <code className="mt-0.5 block font-mono text-xs text-muted-foreground">
          {code}
        </code>
      </DocTD>
      {(read || given) && (
        <DocTD className="max-w-48 align-middle font-mono text-xs break-words text-muted-foreground tabular-nums">
          {given ?? value}
        </DocTD>
      )}
      {note !== undefined && <DocTD className="align-middle">{note}</DocTD>}
      <DocTD className="align-middle">
        <div ref={ref} className="flex items-center py-1">
          {sample}
        </div>
      </DocTD>
    </tr>
  )
}

/** A color token's role, linked to the Color page, which holds every color's value. */
function ColorToken({ role, token }: { role: string; token: string }) {
  return (
    <a
      href="./?path=/docs/styles-color--docs"
      target="_top"
      className="font-sans text-xs text-primary hover:underline"
    >
      {role}
      <code className="block font-mono text-[11px] text-muted-foreground">
        {token}
      </code>
    </a>
  )
}

/** A spec table in its frame: one row per value, the columns named by `head`, the sample last. */
function SpecTable({
  head,
  children,
  sample = "Sample",
}: {
  head: string[]
  children: ReactNode
  /** The sample column's heading, such as "Light and Dark" for a value that changes with the mode. */
  sample?: string
}) {
  return (
    <Unstyled>
      <TooltipProvider>
        <DocTable>
          <thead>
            <tr>
              {[...head, sample].map((cell) => (
                <DocTH key={cell}>{cell}</DocTH>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </DocTable>
      </TooltipProvider>
    </Unstyled>
  )
}

const sizeAndLine = (s: CSSStyleDeclaration) =>
  `${px(s.fontSize)} / ${px(s.lineHeight)}`
const weightValue = (s: CSSStyleDeclaration) => s.fontWeight

export const typographyExamples = {
  "Type scale": (
    <SpecTable head={["Step", "Size / line height", "In an Aperia app"]}>
      {SCALE.map((step) => (
        <SpecRow
          key={step.step}
          name={step.step}
          code={step.className}
          sample={
            <span className={cn(step.className, "whitespace-nowrap")}>Aa</span>
          }
          read={sizeAndLine}
          note={step.used ? "Used" : "Not used"}
        />
      ))}
    </SpecTable>
  ),
  Weights: (
    <SpecTable head={["Weight", "Value", "In an Aperia app"]}>
      {WEIGHTS.map((weight) => (
        <SpecRow
          key={weight.weight}
          name={weight.weight}
          code={weight.className}
          sample={
            <span
              className={cn("text-base whitespace-nowrap", weight.className)}
            >
              Recent Activity
            </span>
          }
          read={weightValue}
          note={weight.weight === "Bold" ? "Sidebar logo only" : "Used"}
        />
      ))}
    </SpecTable>
  ),
  "Line up figures": (
    <DoDont
      good={
        <div className="grid text-right text-sm tabular-nums">
          <span>$1,111,111</span>
          <span>$8,000,000</span>
          <span>$4,190,500</span>
        </div>
      }
      bad={
        <div className="grid text-right text-sm [font-variant-numeric:proportional-nums]">
          <span>$1,111,111</span>
          <span>$8,000,000</span>
          <span>$4,190,500</span>
        </div>
      }
      goodNote="Every digit the same width."
      badNote="Digits of different widths."
    />
  ),
}

// ─── Spacing ───────────────────────────────────────────────────────────────

// The steps as Tailwind writes them, so each bar is exactly a step wide.
const SPACE_STEPS = [
  {
    className: "w-1",
    code: "gap-1",
    use: "Between an icon and its label, or between chips",
  },
  {
    className: "w-2",
    code: "gap-2",
    use: "Between buttons or controls in a row",
  },
  {
    className: "w-3",
    code: "gap-3 · p-3",
    use: "Inside a component; a small card's and a popover's inset",
  },
  {
    className: "w-4",
    code: "gap-4 · p-4",
    use: "A card's, a sheet's, and a dialog's inset; between cards",
  },
  {
    className: "w-5",
    code: "gap-5 · p-5",
    use: "Between page sections; the page column's inset",
  },
]

function Sections({ gap }: { gap: string }) {
  return (
    <div className={`flex w-full max-w-2xl flex-col ${gap}`}>
      <h3 className="text-xl font-semibold tracking-tight">Tasks</h3>
      <Input placeholder="Search" className="max-w-56" />
      <TitledCard title="Open">
        <TaskTable />
      </TitledCard>
    </div>
  )
}

/** A filter row: two fields and the × after them, spaced box to box (good) or with the × pulled in to its icon (bad). */
function SpacedRow({ good }: { good: boolean }) {
  return (
    <div className="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_1.375rem] items-center gap-2 rounded-lg bg-background p-3 ring-[0.5px] ring-border">
      <Input aria-label="Column" defaultValue="MC Band" />
      <Input aria-label="Value" defaultValue="High" />
      <IconButton
        label="Remove Filter"
        className={good ? undefined : "-ml-1.5"}
      >
        <XIcon />
      </IconButton>
    </div>
  )
}

export const spacingExamples = {
  "Space controls by their boxes": (
    <DoDont
      good={<SpacedRow good />}
      bad={<SpacedRow good={false} />}
      goodNote="8px from field to field, and from field to the ×'s button"
      badNote="the ×'s button pulled 6px toward the field"
    />
  ),
  "What is available": (
    <SpecTable head={["Step", "Size", "Used for"]}>
      <SpecRow
        name="Unit"
        code="--spacing"
        read={cssVar("--spacing")}
        note="Every step is a multiple of it"
        sample={<span className="text-muted-foreground">—</span>}
      />
      {SPACE_STEPS.map((step, at) => (
        <SpecRow
          key={step.className}
          name={`Step ${at + 1}`}
          code={step.code}
          read={(style) => px(style.width)}
          note={step.use}
          sample={<div className={`h-4 ${step.className} bg-primary/40`} />}
        />
      ))}
    </SpecTable>
  ),
  "Leave space between sections": (
    <DoDont
      stack
      good={<Sections gap="gap-5" />}
      bad={<Sections gap="gap-0" />}
      goodNote="Step 5 between the title, search and card."
      badNote="Sections touching."
    />
  ),
}

// ─── Border and Radius ─────────────────────────────────────────────────────

const CORNERS = [
  {
    name: "Small",
    className: "rounded-sm",
    use: "The smallest square picture",
  },
  {
    name: "Medium",
    className: "rounded-md",
    use: "Menu items, tooltips, small buttons, and loading blocks",
  },
  {
    name: "Large",
    className: "rounded-lg",
    use: "Buttons, fields, dropdowns, menus, and popovers",
  },
  {
    name: "Extra large",
    className: "rounded-xl",
    use: "Cards, dialogs, sheets, and empty states",
  },
  {
    name: "Round",
    className: "rounded-full",
    use: "People's pictures, switches, and badges",
  },
]

const radius: Read = (s) =>
  parseFloat(s.borderTopLeftRadius) > 999 ? "full" : px(s.borderTopLeftRadius)

export const borderExamples = {
  Radius: (
    <SpecTable head={["Radius", "Value", "Used for"]}>
      {CORNERS.map((corner) => (
        <SpecRow
          key={corner.name}
          name={corner.name}
          code={corner.className}
          read={radius}
          note={corner.use}
          sample={<div className={`size-10 surface ${corner.className}`} />}
        />
      ))}
    </SpecTable>
  ),
  Borders: (
    <SpecTable head={["Border", "Value", "Used for"]}>
      <SpecRow
        name="Width"
        code="--default-border-width"
        read={cssVar("--default-border-width")}
        note="Every border and divider"
        sample={<div className="h-8 w-28 surface" />}
      />
      <SpecRow
        name="Border"
        code="ring-border · border"
        value={<ColorToken role="Border" token="--border" />}
        note="Cards, tables, dialogs, sheets, and dividers"
        sample={<div className="h-8 w-28 surface" />}
      />
      <SpecRow
        name="Input"
        code="ring-input"
        value={<ColorToken role="Input" token="--input" />}
        note="Fields, outline buttons, checkboxes, and radios"
        sample={<Input placeholder="Input" className="w-28" />}
      />
      <SpecRow
        name="Focus"
        code="inset-ring-ring · ring-ring/50"
        value={<ColorToken role="Ring" token="--ring" />}
        note="Any control with keyboard focus"
        sample={
          <Input
            placeholder="Focus"
            className="w-28 ring-3 inset-ring-1 ring-ring/50 inset-ring-ring"
          />
        }
      />
      <SpecRow
        name="Invalid"
        code="aria-invalid"
        value={<ColorToken role="Destructive" token="--destructive" />}
        note="A field with an error"
        sample={<Input placeholder="Invalid" aria-invalid className="w-28" />}
      />
    </SpecTable>
  ),
  "Use the thin border": (
    <DoDont
      good={
        <div className="w-full max-w-56 surface p-4">
          <div className="text-base font-semibold">Details</div>
          <div className="text-sm text-muted-foreground">Owner</div>
        </div>
      }
      bad={
        <div
          className="w-full max-w-56 rounded-xl bg-card p-4"
          style={{ border: "1px solid #d4d4d8" }}
        >
          <div className="text-base font-semibold">Details</div>
          <div className="text-sm text-muted-foreground">Owner</div>
        </div>
      }
      goodNote="The thin border and a soft shadow."
      badNote="A thick gray border."
    />
  ),
}

// ─── Elevation ─────────────────────────────────────────────────────────────

const SHADOWS = [
  {
    name: "Small",
    token: "--shadow-sm",
    className: "shadow-sm",
    use: "Cards, fields, outline buttons, and tables on the page",
  },
  {
    name: "Medium",
    token: "--shadow-md",
    className: "shadow-md",
    use: "Menus, popovers, hover cards, and select lists",
  },
  {
    name: "Large",
    token: "--shadow-lg",
    className: "shadow-lg",
    use: "Dialogs, alert dialogs, and sheets",
  },
  {
    name: "Extra large",
    token: "--shadow-xl",
    className: "shadow-xl",
    use: "A row or card while it is dragged",
  },
]

/** A sample drawn twice, on the Light page and on the Dark page, for a value that changes with the mode. */
function InModes({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {["", "dark"].map((mode) => (
        <div key={mode} className={cn(mode, "rounded-lg bg-background p-3")}>
          {children}
        </div>
      ))}
    </div>
  )
}

function Panel() {
  return (
    <div className="relative w-full max-w-48 rounded-xl bg-background p-4 shadow-lg ring-[0.5px] ring-border">
      <div className="text-base font-medium">Delete Note?</div>
      <div className="mt-1 text-xs text-muted-foreground">
        This permanently deletes the note.
      </div>
    </div>
  )
}

function Behind({ blur }: { blur?: boolean }) {
  return (
    <div className="relative grid h-40 w-full max-w-64 place-items-end overflow-hidden rounded-lg bg-card p-4 ring-[0.5px] ring-border">
      <div className="absolute inset-0 grid gap-2 p-3">
        <div className="text-sm font-semibold">Tasks</div>
        <div className="text-xs">Send the pricing proposal</div>
        <div className="text-xs">Review the signed agreement</div>
        <div className="text-xs">Schedule onboarding</div>
      </div>
      <div
        className="absolute inset-0 bg-overlay"
        style={blur ? { backdropFilter: "blur(4px)" } : undefined}
      />
      <Panel />
    </div>
  )
}

export const elevationExamples = {
  "What is available": (
    <SpecTable head={["Shadow", "Used for"]} sample="Light and Dark">
      {SHADOWS.map((shadow) => (
        <SpecRow
          key={shadow.name}
          name={shadow.name}
          code={shadow.className}
          note={shadow.use}
          sample={
            <InModes>
              <div
                className={`h-10 w-20 rounded-xl bg-card ring-[0.5px] ring-border ${shadow.className}`}
              />
            </InModes>
          }
        />
      ))}
      <SpecRow
        name="Overlay"
        code="bg-overlay"
        note="Behind dialogs and sheets, with no blur"
        sample={
          <InModes>
            <div className="relative h-10 w-20 overflow-hidden rounded-xl bg-card ring-[0.5px] ring-border">
              <div className="absolute inset-y-0 right-0 left-1/2 bg-overlay" />
            </div>
          </InModes>
        }
      />
    </SpecTable>
  ),
  "Use one overlay without blur": (
    <DoDont
      good={<Behind />}
      bad={<Behind blur />}
      goodNote="The page dims and stays sharp."
      badNote="A blurred backdrop."
    />
  ),
}

// ─── Motion ────────────────────────────────────────────────────────────────

/** A block that moves on the panel timing: out on --panel-in and --rail-ease, back on --panel-out. */
function Play() {
  const [open, setOpen] = useState(false)
  return (
    <div className="grid gap-3">
      <div className="relative h-16 overflow-hidden rounded-xl bg-card ring-[0.5px] ring-border">
        <div
          className="absolute inset-y-2 w-24 rounded-lg bg-primary/20 ring-[0.5px] ring-primary/40"
          style={{
            left: open ? "calc(100% - 6.5rem)" : "0.5rem",
            transitionProperty: "left",
            transitionDuration: open ? "var(--panel-in)" : "var(--panel-out)",
            transitionTimingFunction: "var(--rail-ease)",
          }}
        />
      </div>
      <Button
        variant="outline"
        className="justify-self-start"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "Close" : "Open"}
      </Button>
    </div>
  )
}

const MOTION = [
  {
    name: "Panel opening",
    token: "--panel-in",
    use: "Dialogs, sheets, menus, and popovers as they open",
  },
  {
    name: "Panel closing",
    token: "--panel-out",
    use: "The same panels as they close, a little faster",
  },
  {
    name: "Sidebar rail",
    token: "--rail-duration",
    use: "The sidebar folding to its rail and back",
  },
  {
    name: "Easing",
    token: "--rail-ease",
    use: "Every move: fast at first, then easing out",
  },
]

export const motionExamples = {
  "What is available": (
    <>
      <SpecTable head={["Timing", "Value", "Used for"]}>
        {MOTION.map((timing) => (
          <SpecRow
            key={timing.name}
            name={timing.name}
            code={timing.token}
            read={cssVar(timing.token)}
            note={timing.use}
            sample={<span className="text-muted-foreground">—</span>}
          />
        ))}
      </SpecTable>
      <Frame>
        <Play />
      </Frame>
      <Example caption="A real dialog and sheet, on the same timing.">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Contact</DialogTitle>
              <DialogDescription>
                It grows from just under full size as it fades in.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button>Add Contact</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Contact</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </Example>
    </>
  ),
}

// ─── Sizes ─────────────────────────────────────────────────────────────────

const height: Read = (s) => px(s.height)

const CONTROL_SIZES = [
  {
    name: "Extra small",
    code: 'size="xs"',
    use: "Inside a compact component, when it sets it",
    sample: (
      <Button size="xs" variant="outline">
        <PlusIcon />
        Add
      </Button>
    ),
  },
  {
    name: "Small",
    code: 'size="sm"',
    use: "Inside a compact component, such as a card's header",
    sample: (
      <Button size="sm" variant="outline">
        <PlusIcon />
        Add
      </Button>
    ),
  },
  {
    name: "Default",
    code: "the default",
    use: "Every field, select, and button on a page, sheet, or dialog",
    sample: (
      <Button variant="outline">
        <PlusIcon />
        Add
      </Button>
    ),
  },
  {
    name: "Large",
    code: 'size="lg"',
    use: "No Aperia use yet",
    sample: (
      <Button size="lg" variant="outline">
        <PlusIcon />
        Add
      </Button>
    ),
  },
  {
    name: "Field",
    code: "Input",
    use: "The same height as a default button",
    sample: <Input placeholder="Search" className="w-32" />,
  },
  {
    name: "Icon button",
    code: "IconButton",
    use: "An icon with no text, such as Edit on a row",
    sample: (
      <IconButton label="Edit Task" variant="outline">
        <PencilIcon />
      </IconButton>
    ),
  },
]

export const sizesExamples = {
  "What is available": (
    <SpecTable head={["Size", "Height", "Used for"]}>
      {CONTROL_SIZES.map((size) => (
        <SpecRow
          key={size.name}
          name={size.name}
          code={size.code}
          read={height}
          note={size.use}
          sample={size.sample}
        />
      ))}
    </SpecTable>
  ),
  "Give controls side by side one height": (
    <DoDont
      good={
        <div className="flex items-center gap-2">
          <Input
            aria-label="Search merchants"
            placeholder="Search merchants"
            className="w-44"
          />
          <Button>Search</Button>
        </div>
      }
      bad={
        <div className="flex items-center gap-2">
          <Input
            aria-label="Search merchants"
            placeholder="Search merchants"
            className="w-44"
          />
          <Button size="lg">Search</Button>
        </div>
      }
      goodNote="The field and the button share one height."
      badNote="A large button beside a default field."
    />
  ),
}

// ─── Icons ─────────────────────────────────────────────────────────────────

const iconSize: Read = (_, el) =>
  px(getComputedStyle(el.querySelector("svg") ?? el).width)

export const iconsExamples = {
  "What is available": (
    <SpecTable head={["Place", "Icon size", "Used for"]}>
      {(["default", "sm", "xs"] as const).map((size) => (
        <SpecRow
          key={size}
          name={`Button, ${size === "default" ? "default" : size === "sm" ? "small" : "extra small"}`}
          code={size === "default" ? "Button" : `Button size="${size}"`}
          read={iconSize}
          note={
            size === "default"
              ? "Buttons, menu items, and fields"
              : "Compact buttons"
          }
          sample={
            <Button variant="outline" size={size}>
              <SearchIcon />
              Search
            </Button>
          }
        />
      ))}
      <SpecRow
        name="Empty state"
        code="EmptyState"
        read={iconSize}
        note="The icon above an empty state's title"
        sample={
          <div className="w-40">
            <EmptyState icon={InboxIcon} title="No Tasks" />
          </div>
        }
      />
    </SpecTable>
  ),
  "Name every icon-only button": (
    <DoDont
      good={
        <IconButton label="Delete Note">
          <TrashIcon />
        </IconButton>
      }
      bad={
        <Button variant="ghost" size="icon-sm">
          <TrashIcon />
        </Button>
      }
      goodNote="Point at it or tab to it: it says Delete Note."
      badNote="An icon with no name."
    />
  ),
}

// ─── Copy ──────────────────────────────────────────────────────────────────

export const copyExamples = {
  "Name the action": (
    <DoDont
      good={
        <>
          <Button variant="outline">Cancel</Button>
          <Button>Add Member</Button>
        </>
      }
      bad={
        <>
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </>
      }
      goodNote="The verb and its object."
      badNote="A word that doesn't say what happens."
    />
  ),
  "Say what happened and what to do": (
    <DoDont
      good={
        <Field data-invalid className="max-w-64">
          <FieldLabel htmlFor="do-email">Email</FieldLabel>
          <Input id="do-email" defaultValue="dana@acme" aria-invalid />
          <FieldError>Enter a valid email address.</FieldError>
        </Field>
      }
      bad={
        <Field data-invalid className="max-w-64">
          <FieldLabel htmlFor="dont-email">Email</FieldLabel>
          <Input id="dont-email" defaultValue="dana@acme" aria-invalid />
          <FieldError>Invalid input.</FieldError>
        </Field>
      }
      goodNote="What must change, beside the field."
      badNote="Neither the cause nor the fix."
    />
  ),
  "Write empty as No [Items]": (
    <DoDont
      good={
        <Wide>
          <TitledCard title="Tasks">
            <CardContent className="pb-4">
              <EmptyState
                icon={InboxIcon}
                title="No Tasks"
                description="No tasks assigned to you."
              />
            </CardContent>
          </TitledCard>
        </Wide>
      }
      bad={
        <Wide>
          <TitledCard title="Tasks">
            <CardContent className="pb-4">
              <EmptyState
                icon={InboxIcon}
                title="No Tasks"
                description="No tasks yet."
              />
            </CardContent>
          </TitledCard>
        </Wide>
      }
      goodNote="The second line says whose."
      badNote="A second line that repeats the title."
    />
  ),
}

// ─── Message Templates ─────────────────────────────────────────────────────

function Confirm({
  title,
  action,
  cancel,
  message,
  variant,
}: {
  title: string
  action: string
  cancel?: string
  message: string
  variant?: "default"
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        {action}
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        action={action}
        cancel={cancel}
        variant={variant}
        onConfirm={() => setOpen(false)}
      >
        {message}
      </ConfirmDialog>
    </>
  )
}

export const templateExamples = {
  Confirmations: (
    <Example caption="Open each to read the confirmation.">
      <Confirm
        title="Delete Contact?"
        action="Delete Contact"
        message="This permanently deletes Dana Whitfield."
      />
      <Confirm
        title="Change to Demo?"
        action="Change to Demo"
        variant="default"
        message="You are changing Acme Renewal from Discovery to Demo."
      />
    </Example>
  ),
  "Unsaved changes": (
    <Example>
      <Confirm
        title="Discard Changes?"
        action="Discard Changes"
        cancel="Continue Editing"
        message="What you entered in this form is lost."
      />
    </Example>
  ),
  "Empty and no results": (
    <Example className="grid gap-6 sm:grid-cols-2">
      <EmptyState
        icon={InboxIcon}
        title="No Tasks"
        description="No tasks assigned to you."
      />
      <NoResults onClear={() => {}} />
    </Example>
  ),
}
