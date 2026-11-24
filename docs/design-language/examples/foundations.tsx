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
import { EmptyState, IconButton, TaskTable, TitledCard, Wide } from "./shared"

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

/** Renders `children` and prints what `read` finds on the element marked `data-measure` inside it (or the wrapper). */
function Measured({
  read,
  children,
  className,
  label,
}: {
  read: Read
  children: ReactNode
  className?: string
  label?: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState("")
  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const el = root.querySelector<HTMLElement>("[data-measure]") ?? root
    setValue(read(getComputedStyle(el), el))
  }, [read])
  return (
    <div ref={ref} className={cn("grid min-w-0 gap-1.5", className)}>
      {children}
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
      <code className="font-mono text-[11px] leading-snug break-words text-muted-foreground">
        {value}
      </code>
    </div>
  )
}

/** One frame for an example whose values are the same in Light and Dark, such as sizes, type, spacing or motion. */
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

/**
 * The same content in a Light frame and a Dark frame, side by side (stacked on a narrow window). Only for an example
 * whose values change with the mode, such as shadows; everything else uses `Frame`.
 */
function LightDark({ children }: { children: ReactNode }) {
  const frame =
    "rounded-xl bg-background p-5 text-sm text-foreground ring-[0.5px] ring-border"
  return (
    <Unstyled>
      <TooltipProvider>
        <div className="my-4 grid gap-4 lg:grid-cols-2">
          {(["Light", "Dark"] as const).map((mode) => (
            <figure key={mode} className="min-w-0">
              <div className={mode === "Dark" ? `dark ${frame}` : frame}>
                {children}
              </div>
              <figcaption className="mt-2 text-sm text-muted-foreground">
                {mode}
              </figcaption>
            </figure>
          ))}
        </div>
      </TooltipProvider>
    </Unstyled>
  )
}

const px = (value: string) => `${Math.round(parseFloat(value) * 100) / 100}px`

// ─── Color ────────────────────────────────────────────────────────────────

const chip = "rounded-4xl px-2 py-0.5 text-xs font-medium"

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
        <span className={`${chip} bg-destructive/10 text-destructive`}>
          3 Overdue
        </span>
      }
      bad={<span className="font-medium text-destructive tabular-nums">3</span>}
      goodNote="The color and the word."
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

/** A table row that prints what the browser gives its sample: `read` turns the computed style into the value. */
function SpecRow({
  name,
  className,
  sample,
  read,
  note,
  code = className,
}: {
  name: string
  className: string
  /** The class to print, when the sample needs more classes than the one it shows. */
  code?: string
  sample: string
  read: (style: CSSStyleDeclaration) => string
  note: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState("")
  useLayoutEffect(() => {
    if (ref.current) setValue(read(getComputedStyle(ref.current)))
  }, [read])
  return (
    <tr className="border-b last:border-b-0">
      <td className="py-3 pr-4 align-middle font-medium whitespace-nowrap">
        {name}
        <code className="mt-1 block font-mono text-[11px] font-normal text-muted-foreground">
          {code}
        </code>
      </td>
      <td className="py-3 pr-4 align-middle font-mono text-[11px] whitespace-nowrap text-muted-foreground tabular-nums">
        {value}
      </td>
      <td className="py-3 pr-4 align-middle text-muted-foreground">{note}</td>
      <td className="py-3 align-middle">
        <span ref={ref} className={cn(className, "block whitespace-nowrap")}>
          {sample}
        </span>
      </td>
    </tr>
  )
}

const sizeAndLine = (s: CSSStyleDeclaration) =>
  `${px(s.fontSize)} / ${px(s.lineHeight)}`
const weightValue = (s: CSSStyleDeclaration) => s.fontWeight

function SpecTable({
  head,
  children,
}: {
  head: [string, string, string]
  children: ReactNode
}) {
  return (
    <Frame>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              {[...head, "Sample"].map((cell) => (
                <th key={cell} className="pr-4 pb-2 font-medium">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </Frame>
  )
}

export const typographyExamples = {
  "Type scale": (
    <SpecTable head={["Step", "Size / line height", "In an Aperia app"]}>
      {SCALE.map((step) => (
        <SpecRow
          key={step.step}
          name={step.step}
          className={step.className}
          sample="Aa"
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
          className={cn("text-base", weight.className)}
          code={weight.className}
          sample="Recent Activity"
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
const SPACE_STEPS = ["w-1", "w-2", "w-3", "w-4", "w-5"]

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
    <Frame>
      <div className="grid gap-4">
        <Measured read={cssVar("--spacing")} label="The spacing unit">
          {null}
        </Measured>
        {SPACE_STEPS.map((w, i) => (
          <Measured key={w} read={(s) => px(s.width)} label={`Step ${i + 1}`}>
            <div data-measure className={`h-6 ${w} bg-primary/40`} />
          </Measured>
        ))}
      </div>
    </Frame>
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
  { name: "Small", className: "rounded-sm" },
  { name: "Medium", className: "rounded-md" },
  { name: "Large", className: "rounded-lg" },
  { name: "Extra large", className: "rounded-xl" },
  { name: "Round", className: "rounded-full" },
]

const radius: Read = (s) =>
  parseFloat(s.borderTopLeftRadius) > 999 ? "full" : px(s.borderTopLeftRadius)

export const borderExamples = {
  "What is available": (
    <Frame>
      <div className="grid gap-6">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] gap-3">
          {CORNERS.map((c) => (
            <Measured key={c.name} read={radius} label={c.name}>
              <div data-measure className={`size-14 surface ${c.className}`} />
            </Measured>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-3">
          <Measured read={cssVar("--default-border-width")} label="Hairline">
            <div className="h-8 surface" />
          </Measured>
          <Measured read={cssVar("--border")} label="Border">
            <div className="h-8 surface" />
          </Measured>
          <Measured read={cssVar("--input")} label="Input">
            <Input placeholder="Input" />
          </Measured>
          <Measured read={cssVar("--ring")} label="Focus">
            <Input
              placeholder="Focus"
              className="ring-3 inset-ring-1 ring-ring/50 inset-ring-ring"
            />
          </Measured>
          <Measured read={cssVar("--destructive")} label="Invalid">
            <Input placeholder="Invalid" aria-invalid />
          </Measured>
        </div>
      </div>
    </Frame>
  ),
  "Use the hairline, not a border": (
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
      goodNote="The hairline edge and a soft shadow."
      badNote="A thick gray border."
    />
  ),
}

// ─── Elevation ─────────────────────────────────────────────────────────────

const SHADOWS = [
  { name: "Small", token: "--shadow-sm", className: "shadow-sm" },
  { name: "Medium", token: "--shadow-md", className: "shadow-md" },
  { name: "Large", token: "--shadow-lg", className: "shadow-lg" },
  { name: "Extra large", token: "--shadow-xl", className: "shadow-xl" },
]

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
    <LightDark>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          {SHADOWS.map((s) => (
            <Measured key={s.name} read={cssVar(s.token)} label={s.name}>
              <div
                className={`h-16 rounded-xl bg-card ring-[0.5px] ring-border ${s.className}`}
              />
            </Measured>
          ))}
        </div>
        <Measured read={cssVar("--overlay")} label="Overlay">
          <div className="relative h-16 overflow-hidden rounded-xl bg-card ring-[0.5px] ring-border">
            <div className="absolute inset-y-0 right-0 left-1/2 bg-overlay" />
          </div>
        </Measured>
      </div>
    </LightDark>
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

export const motionExamples = {
  "What is available": (
    <>
      <Frame>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Measured read={cssVar("--panel-in")} label="Panel opening">
              {null}
            </Measured>
            <Measured read={cssVar("--panel-out")} label="Panel closing">
              {null}
            </Measured>
            <Measured read={cssVar("--rail-duration")} label="Sidebar rail">
              {null}
            </Measured>
            <Measured read={cssVar("--rail-ease")} label="Easing">
              {null}
            </Measured>
          </div>
          <Play />
        </div>
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

/** Sets a control on a 36px stage, bottom-aligned, so every label below it sits on one line. */
const Stage = ({ children }: { children: ReactNode }) => (
  <div className="flex h-9 items-end">{children}</div>
)

export const sizesExamples = {
  "What is available": (
    <Frame>
      <div className="flex flex-wrap items-start gap-x-12 gap-y-6">
        <div className="flex items-start gap-6">
          {(["xs", "sm", "default", "lg"] as const).map((size) => (
            <Measured key={size} read={height} label={size}>
              <Stage>
                <Button data-measure size={size} variant="outline">
                  <PlusIcon />
                  Add
                </Button>
              </Stage>
            </Measured>
          ))}
        </div>
        <div className="flex items-start gap-6">
          <Measured read={height} label="Field">
            <Stage>
              <Input data-measure placeholder="Search" className="w-40" />
            </Stage>
          </Measured>
          <Measured read={height} label="Button">
            <Stage>
              <Button data-measure>Add Task</Button>
            </Stage>
          </Measured>
          <Measured read={height} label="Icon button">
            <Stage>
              <IconButton data-measure label="Edit Task" variant="outline">
                <PencilIcon />
              </IconButton>
            </Stage>
          </Measured>
        </div>
      </div>
    </Frame>
  ),
}

// ─── Icons ─────────────────────────────────────────────────────────────────

const iconSize: Read = (_, el) =>
  px(getComputedStyle(el.querySelector("svg") ?? el).width)

export const iconsExamples = {
  "What is available": (
    <Frame>
      <div className="flex flex-wrap items-start gap-4">
        {(["default", "sm", "xs"] as const).map((size) => (
          <Measured key={size} read={iconSize} label={size}>
            <Button data-measure variant="outline" size={size}>
              <SearchIcon />
              Search
            </Button>
          </Measured>
        ))}
        <Measured read={iconSize} label="Empty state" className="w-40">
          <div data-measure>
            <EmptyState icon={InboxIcon} title="No Tasks" />
          </div>
        </Measured>
      </div>
    </Frame>
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
