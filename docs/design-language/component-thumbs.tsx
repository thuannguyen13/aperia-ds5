import type { ReactNode } from "react"
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FileTextIcon,
  ImageIcon,
  InboxIcon,
  ItalicIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react"
import {
  Alert,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  Input,
  Kbd,
  KbdGroup,
  Label,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from "aperia-ds5"
import { cn } from "aperia-ds5/utils"

// The picture on each card of the Components index, one for every component. A control that
// renders on its own is the real component; a panel that opens over the page (a dialog, a sheet, a menu, a toast) is
// drawn from the same tokens, since the real one would open over the index. The pictures are inert: nothing in them
// takes focus or clicks.

/** A line of placeholder text. */
const Line = ({ className }: { className?: string }) => (
  <div className={cn("h-1.5 w-16 rounded-full bg-foreground/15", className)} />
)
/** A control's box: the control fill, the input edge, and a small shadow. */
const Control = ({
  className,
  children,
}: {
  className?: string
  children?: ReactNode
}) => (
  <div
    className={cn(
      "flex h-8 items-center gap-2 rounded-lg bg-control px-2.5 text-sm text-muted-foreground shadow-sm ring-[0.5px] ring-input",
      className
    )}
  >
    {children}
  </div>
)
/** A panel over the page: the background fill, the border edge, and a menu or panel shadow. */
const Panel = ({
  className,
  children,
}: {
  className?: string
  children?: ReactNode
}) => (
  <div
    className={cn(
      "flex flex-col gap-2 rounded-lg bg-background p-3 shadow-md ring-[0.5px] ring-border",
      className
    )}
  >
    {children}
  </div>
)
/** A drawn button, for a panel's footer. */
const Btn = ({ primary = false }: { primary?: boolean }) => (
  <div
    className={cn(
      "h-6 w-12 rounded-md",
      primary ? "bg-primary" : "bg-control shadow-sm ring-[0.5px] ring-input"
    )}
  />
)
/** A page behind a panel: a dimmed box of lines. */
const Page = ({ children }: { children?: ReactNode }) => (
  <div className="relative h-24 w-44 overflow-hidden rounded-lg bg-background ring-[0.5px] ring-border">
    <div className="flex flex-col gap-2 p-3">
      <Line className="w-20" />
      <Line className="w-28" />
      <Line className="w-24" />
    </div>
    {children}
  </div>
)
const Dim = () => <div className="absolute inset-0 bg-overlay" />
/** Menu rows, the second one highlighted. */
const MenuRows = ({ rows = 3 }: { rows?: number }) => (
  <>
    {Array.from({ length: rows }, (_, i) => (
      <div
        key={i}
        className={cn("rounded-md px-2 py-1.5", i === 1 && "bg-accent")}
      >
        <Line className={i === 1 ? "w-16 bg-foreground/25" : "w-14"} />
      </div>
    ))}
  </>
)

export const THUMBS: Record<string, ReactNode> = {
  // Actions
  button: (
    <div className="flex gap-2">
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </div>
  ),
  "button-group": (
    <ButtonGroup>
      <Button variant="outline">Day</Button>
      <Button variant="outline">Week</Button>
      <Button variant="outline">Month</Button>
    </ButtonGroup>
  ),
  toggle: (
    <div className="flex gap-1">
      <Toggle pressed aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Italic">
        <ItalicIcon />
      </Toggle>
    </div>
  ),
  "toggle-group": (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  "dropdown-menu": (
    <div className="flex flex-col items-center gap-1.5">
      <Button variant="outline" size="sm">
        Actions <ChevronDownIcon />
      </Button>
      <Panel className="w-32 gap-0 p-1">
        <MenuRows />
      </Panel>
    </div>
  ),
  "context-menu": (
    <div className="relative">
      <div className="h-20 w-40 rounded-lg border border-dashed border-foreground/20" />
      <Panel className="absolute top-6 left-16 w-28 gap-0 p-1">
        <MenuRows />
      </Panel>
    </div>
  ),
  menubar: (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex gap-1 rounded-lg bg-background p-1 shadow-sm ring-[0.5px] ring-border">
        {["File", "Edit", "View"].map((each, i) => (
          <div
            key={each}
            className={cn(
              "rounded-md px-2 py-0.5 text-sm",
              i === 0 && "bg-accent"
            )}
          >
            {each}
          </div>
        ))}
      </div>
      <Panel className="w-28 gap-0 p-1">
        <MenuRows />
      </Panel>
    </div>
  ),

  // Communication
  alert: (
    <Alert className="w-56">
      <InboxIcon />
      <AlertTitle>Import finished</AlertTitle>
    </Alert>
  ),
  badge: (
    <div className="flex gap-2">
      <Badge>New</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="outline">12</Badge>
    </div>
  ),
  sonner: (
    <Page>
      <Panel className="absolute right-2 bottom-2 w-28 flex-row items-center gap-2 p-2">
        <div className="size-3 rounded-full bg-primary" />
        <Line className="w-14" />
      </Panel>
    </Page>
  ),
  tooltip: (
    <div className="flex flex-col items-center gap-1.5">
      <div className="rounded-md bg-foreground px-2 py-1 text-xs text-background">
        Edit Note
      </div>
      <Control className="size-8 justify-center px-0">
        <PencilIcon className="size-4 text-foreground" />
      </Control>
    </div>
  ),
  "hover-card": (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-sm font-medium text-link underline underline-offset-4">
        Acme Payments
      </span>
      <Panel className="w-40 flex-row items-center">
        <Avatar className="size-7">
          <AvatarFallback>AP</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1.5">
          <Line className="w-16" />
          <Line className="w-10" />
        </div>
      </Panel>
    </div>
  ),
  progress: <Progress value={60} className="w-48" />,
  spinner: <Spinner className="size-6 text-muted-foreground" />,
  skeleton: (
    <div className="flex w-48 items-center gap-3">
      <Skeleton className="size-9 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  ),
  empty: (
    <div className="flex flex-col items-center gap-2">
      <div className="size-9 rounded-lg border border-dashed border-foreground/25" />
      <Line className="w-16 bg-foreground/25" />
      <Line className="w-24" />
    </div>
  ),
  kbd: (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),

  // Containment
  card: (
    <div className="w-48 rounded-xl bg-card shadow-sm ring-[0.5px] ring-border">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <Line className="w-14 bg-foreground/30" />
        <PlusIcon className="size-3.5 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-2 p-3">
        <Line className="w-32" />
        <Line className="w-24" />
      </div>
    </div>
  ),
  item: (
    <div className="flex w-52 items-center gap-3 rounded-lg bg-muted/50 p-2.5">
      <Avatar className="size-8">
        <AvatarFallback>JR</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col gap-1.5">
        <Line className="w-20 bg-foreground/30" />
        <Line className="w-28" />
      </div>
      <ChevronRightIcon className="size-4 text-muted-foreground" />
    </div>
  ),
  dialog: (
    <Page>
      <Dim />
      <Panel className="absolute top-1/2 left-1/2 w-28 -translate-x-1/2 -translate-y-1/2 shadow-lg">
        <Line className="w-16 bg-foreground/30" />
        <Line className="w-20" />
        <div className="flex justify-end gap-1">
          <Btn />
          <Btn primary />
        </div>
      </Panel>
    </Page>
  ),
  "alert-dialog": (
    <Page>
      <Dim />
      <Panel className="absolute top-1/2 left-1/2 w-28 -translate-x-1/2 -translate-y-1/2 shadow-lg">
        <Line className="w-20 bg-foreground/30" />
        <div className="flex justify-end gap-1">
          <Btn />
          <div className="h-6 w-12 rounded-md bg-destructive/15" />
        </div>
      </Panel>
    </Page>
  ),
  sheet: (
    <Page>
      <Dim />
      <Panel className="absolute inset-y-1.5 right-1.5 w-20 rounded-md shadow-lg">
        <Line className="w-12 bg-foreground/30" />
        <Line className="w-14" />
      </Panel>
    </Page>
  ),
  drawer: (
    <Page>
      <Dim />
      <Panel className="absolute inset-x-1.5 bottom-0 h-12 items-center rounded-b-none shadow-lg">
        <div className="h-1 w-8 rounded-full bg-foreground/20" />
        <Line className="w-24" />
      </Panel>
    </Page>
  ),
  popover: (
    <div className="flex flex-col items-center gap-1.5">
      <Button variant="outline" size="sm">
        Filter
      </Button>
      <Panel className="w-40">
        <Line className="w-14 bg-foreground/30" />
        <div className="h-5 rounded-md bg-control ring-[0.5px] ring-input" />
      </Panel>
    </div>
  ),
  accordion: (
    <div className="flex w-48 flex-col">
      {[true, false, false].map((open, i) => (
        <div key={i} className="border-b py-1.5">
          <div className="flex items-center justify-between">
            <Line className="w-20 bg-foreground/30" />
            <ChevronDownIcon
              className={cn(
                "size-3.5 text-muted-foreground",
                open && "rotate-180"
              )}
            />
          </div>
          {open && <Line className="mt-2 w-32" />}
        </div>
      ))}
    </div>
  ),
  collapsible: (
    <div className="flex w-44 flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <ChevronDownIcon className="size-3.5 text-muted-foreground" />
        <Line className="w-20 bg-foreground/30" />
      </div>
      <div className="ml-5 flex flex-col gap-2">
        <Line className="w-28" />
        <Line className="w-20" />
      </div>
    </div>
  ),
  tabs: (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="files">Files</TabsTrigger>
      </TabsList>
    </Tabs>
  ),

  // Navigation
  "app-shell": (
    <div className="flex h-24 w-44 overflow-hidden rounded-lg ring-[0.5px] ring-border">
      <div className="flex w-12 flex-col gap-2 bg-sidebar p-2">
        <div className="size-3 rounded bg-sidebar-foreground/60" />
        <Line className="w-7 bg-sidebar-foreground/30" />
        <Line className="w-6 bg-sidebar-foreground/30" />
      </div>
      <div className="flex flex-1 flex-col gap-2 bg-background p-2">
        <Line className="w-10" />
        <Line className="w-20 bg-foreground/30" />
        <div className="flex-1 rounded bg-muted/60" />
      </div>
    </div>
  ),
  sidebar: (
    <div className="flex h-24 w-32 flex-col gap-1 rounded-lg bg-sidebar p-2">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            "flex items-center gap-1.5 rounded px-1.5 py-1",
            i === 1 && "bg-sidebar-accent"
          )}
        >
          <div className="size-2.5 rounded-sm bg-sidebar-foreground/50" />
          <Line className="w-12 bg-sidebar-foreground/30" />
        </div>
      ))}
    </div>
  ),
  breadcrumb: (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      Prospects <ChevronRightIcon className="size-3.5" />
      <span className="text-foreground">Acme Payments</span>
    </div>
  ),
  "navigation-menu": (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex gap-3 text-sm">
        <span className="font-medium">Products</span>
        <span className="text-muted-foreground">Docs</span>
        <span className="text-muted-foreground">Pricing</span>
      </div>
      <Panel className="grid w-44 grid-cols-2 gap-2">
        <Line className="w-14" />
        <Line className="w-12" />
        <Line className="w-10" />
        <Line className="w-14" />
      </Panel>
    </div>
  ),
  pagination: (
    <div className="flex items-center gap-1 text-sm">
      {["‹", "1", "2", "3", "›"].map((each, i) => (
        <div
          key={i}
          className={cn(
            "flex size-7 items-center justify-center rounded-md",
            each === "2" && "bg-control shadow-sm ring-[0.5px] ring-input"
          )}
        >
          {each}
        </div>
      ))}
    </div>
  ),
  command: (
    <Panel className="w-48 gap-1 p-1">
      <div className="flex items-center gap-2 border-b px-2 pb-1.5 text-sm text-muted-foreground">
        <SearchIcon className="size-3.5" /> Search
      </div>
      <MenuRows />
    </Panel>
  ),

  // Selection
  checkbox: (
    <div className="flex flex-col gap-2">
      {[true, false].map((on, i) => (
        <div key={i} className="flex items-center gap-2">
          <Checkbox checked={on} aria-label="Option" />
          <Line className={i ? "w-16" : "w-20"} />
        </div>
      ))}
    </div>
  ),
  "radio-group": (
    <RadioGroup defaultValue="a" className="gap-2">
      {["a", "b"].map((value) => (
        <div key={value} className="flex items-center gap-2">
          <RadioGroupItem value={value} aria-label={value} />
          <Line className={value === "a" ? "w-20" : "w-14"} />
        </div>
      ))}
    </RadioGroup>
  ),
  switch: (
    <div className="flex items-center gap-2">
      <Switch checked aria-label="Assigned to me" />
      <span className="text-sm">Assigned to me</span>
    </div>
  ),
  select: (
    <div className="flex flex-col items-center gap-1.5">
      <Control className="w-40 justify-between text-foreground">
        Negotiation <ChevronDownIcon className="size-4 text-muted-foreground" />
      </Control>
      <Panel className="w-40 gap-0 p-1">
        <MenuRows rows={2} />
      </Panel>
    </div>
  ),
  "native-select": (
    <Control className="w-40 justify-between text-foreground">
      All products <ChevronDownIcon className="size-4 text-muted-foreground" />
    </Control>
  ),
  combobox: (
    <div className="flex flex-col items-center gap-1.5">
      <Control className="w-44 gap-1 px-1.5">
        <Badge variant="secondary">Demo</Badge>
        <Badge variant="secondary">Proposal</Badge>
      </Control>
      <Panel className="w-44 gap-0 p-1">
        <MenuRows rows={2} />
      </Panel>
    </div>
  ),
  slider: <Slider defaultValue={[40]} className="w-44" aria-label="Value" />,
  calendar: (
    <div className="grid grid-cols-7 gap-1 rounded-lg bg-background p-2 ring-[0.5px] ring-border">
      {Array.from({ length: 21 }, (_, i) => (
        <div
          key={i}
          className={cn(
            "size-4 rounded-sm",
            i === 9 ? "bg-primary" : "bg-foreground/8"
          )}
        />
      ))}
    </div>
  ),
  "day-range-fields": (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      From <Control className="w-20 text-foreground">11/01</Control>
      To <Control className="w-20">—</Control>
    </div>
  ),
  // Text inputs
  input: <Input placeholder="name@example.com" className="w-48" />,
  "input-group": (
    <Control className="w-48">
      <SearchIcon className="size-4" /> Search prospects
    </Control>
  ),
  "input-otp": (
    <div className="flex gap-1.5">
      {["4", "8", "2", "", "", ""].map((digit, i) => (
        <div
          key={i}
          className={cn(
            "flex size-8 items-center justify-center rounded-md bg-control text-sm shadow-sm ring-[0.5px] ring-input",
            i === 3 && "ring-2 ring-ring/50"
          )}
        >
          {digit}
        </div>
      ))}
    </div>
  ),
  textarea: (
    <Textarea placeholder="Add a note" className="min-h-16 w-48 resize-none" />
  ),
  field: (
    <div className="flex w-48 flex-col gap-1.5">
      <Label>Start Date</Label>
      <Control>MM/DD/YYYY</Control>
      <span className="text-xs text-muted-foreground">
        The first day it runs.
      </span>
    </div>
  ),
  label: (
    <div className="flex items-center gap-2">
      <Checkbox checked aria-label="Notify" />
      <Label>Notify the owner</Label>
    </div>
  ),
  // Files and media
  avatar: (
    <div className="flex -space-x-2">
      {["JR", "MK", "AL"].map((initials) => (
        <Avatar key={initials} className="ring-2 ring-background">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
  attachment: (
    <div className="flex items-center gap-2 rounded-lg bg-muted/60 p-2 pr-3">
      <div className="flex size-8 items-center justify-center rounded-md bg-background ring-[0.5px] ring-border">
        <FileTextIcon className="size-4 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium">contract.pdf</span>
        <span className="text-xs text-muted-foreground">PDF</span>
      </div>
    </div>
  ),
  carousel: (
    <div className="flex items-center gap-2">
      <div className="h-14 w-6 rounded-md bg-muted/60" />
      <div className="h-16 w-24 rounded-md bg-muted" />
      <div className="h-14 w-6 rounded-md bg-muted/60" />
    </div>
  ),
  "aspect-ratio": (
    <div className="flex aspect-video w-36 items-center justify-center rounded-lg bg-muted">
      <ImageIcon className="size-5 text-muted-foreground" />
    </div>
  ),

  // Lists and tables
  table: (
    <div className="w-52 overflow-hidden rounded-lg bg-card ring-[0.5px] ring-border">
      {[0, 1, 2].map((row) => (
        <div
          key={row}
          className={cn(
            "flex gap-3 border-b px-2.5 py-2 last:border-b-0",
            row === 0 && "bg-muted/40"
          )}
        >
          <Line className={row === 0 ? "w-12 bg-foreground/25" : "w-14"} />
          <Line className="w-10" />
          <Line className="ml-auto w-8" />
        </div>
      ))}
    </div>
  ),
  "data-table": (
    <div className="flex w-52 flex-col gap-1.5">
      <Control className="h-6 w-24 text-xs">Filter…</Control>
      <div className="overflow-hidden rounded-lg bg-card ring-[0.5px] ring-border">
        {[0, 1, 2].map((row) => (
          <div
            key={row}
            className="flex items-center gap-2 border-b px-2 py-1.5 last:border-b-0"
          >
            <div className="size-2.5 rounded-sm ring-[0.5px] ring-input" />
            <Line className="w-14" />
            <Line className="ml-auto w-8" />
          </div>
        ))}
      </div>
    </div>
  ),
  // Charts
  chart: (
    <div className="flex h-20 items-end gap-2 border-b border-l px-2">
      {[40, 65, 30, 80, 55].map((height, i) => (
        <div
          key={i}
          className="w-5 rounded-t-sm bg-chart-1"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  ),

  // Chat
  message: (
    <div className="flex w-52 flex-col gap-2">
      <div className="flex items-end gap-2">
        <Avatar className="size-6">
          <AvatarFallback className="text-xs">AI</AvatarFallback>
        </Avatar>
        <div className="rounded-xl bg-muted px-3 py-2">
          <Line className="w-24" />
        </div>
      </div>
      <div className="ml-auto rounded-xl bg-primary px-3 py-2">
        <Line className="w-16 bg-primary-foreground/60" />
      </div>
    </div>
  ),
  bubble: (
    <div className="rounded-xl bg-muted px-3 py-2 text-sm">
      Your dispute was filed.
    </div>
  ),
  marker: (
    <div className="flex w-48 items-center gap-2 text-xs text-muted-foreground">
      <Separator className="flex-1" /> Today <Separator className="flex-1" />
    </div>
  ),

  // Layout
  separator: (
    <div className="flex w-44 flex-col gap-3">
      <Line className="w-28" />
      <Separator />
      <Line className="w-20" />
    </div>
  ),
  "scroll-area": (
    <div className="relative h-20 w-40 overflow-hidden rounded-lg ring-[0.5px] ring-border">
      <div className="flex flex-col gap-2 p-2.5">
        <Line className="w-24" />
        <Line className="w-20" />
        <Line className="w-28" />
        <Line className="w-16" />
      </div>
      <div className="absolute top-2 right-1 h-8 w-1 rounded-full bg-foreground/20" />
    </div>
  ),
  resizable: (
    <div className="flex h-20 w-44 overflow-hidden rounded-lg ring-[0.5px] ring-border">
      <div className="flex-1 bg-muted/40" />
      <div className="relative w-px bg-border">
        <div className="absolute top-1/2 left-1/2 h-4 w-2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-background ring-[0.5px] ring-border" />
      </div>
      <div className="flex-[2] bg-background" />
    </div>
  ),
  direction: (
    <div className="flex flex-col gap-2 text-sm">
      <span>Left to right →</span>
      <span dir="rtl">← من اليمين</span>
    </div>
  ),
}
