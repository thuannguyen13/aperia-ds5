import { useState, type ReactNode } from "react"
import {
  BellIcon,
  Building2Icon,
  LayoutDashboardIcon,
  PanelLeftIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react"
import { Badge, Button, ToggleGroup, ToggleGroupItem } from "aperia-ds5"
import { cn } from "@/lib/utils"
import { Screen } from "./before-after"

// The Scaffold page's diagram: the screen's regions (sidebar, top bar, page column, and sheet), drawn small from the shell's
// own tokens (the sidebar navy, the page background, the border, the overlay, the panel shadow), on a desktop and on
// a phone. The frames are inert: a picture of a screen, not one to use.

type Layer = "page" | "sheet" | "dialog" | "sidebar"

/** A region's kind, pinned to a corner of the region it names. */
function Tag({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <Badge className={cn("absolute z-10", className)}>{children}</Badge>
}

/** A line of placeholder text. */
function Line({ className }: { className?: string }) {
  return <span className={cn("block h-1.5 rounded-full bg-muted", className)} />
}

const PAGES = [
  { label: "Dashboard", icon: LayoutDashboardIcon },
  { label: "Prospects", icon: Building2Icon, current: true },
  { label: "Settings", icon: SettingsIcon },
]

/** The sidebar: logo and name, Search, Notifications, the pages, and the account at its foot. */
function Rail({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-1 bg-sidebar p-2 text-xs text-sidebar-foreground",
        className
      )}
    >
      <div className="flex h-7 items-center gap-1.5 px-1 font-semibold">
        <span className="size-4 rounded-sm bg-sidebar-primary" />
        Product
      </div>
      <div className="flex h-6 items-center gap-1.5 rounded-md px-1">
        <SearchIcon className="size-3" />
        Search
        <span className="ml-auto opacity-70">⌘K</span>
      </div>
      <div className="flex h-6 items-center gap-1.5 rounded-md px-1">
        <BellIcon className="size-3" />
        Notifications
      </div>
      {PAGES.map((page) => (
        <div
          key={page.label}
          className={cn(
            "flex h-6 items-center gap-1.5 rounded-md px-1",
            page.current && "bg-sidebar-primary text-sidebar-primary-foreground"
          )}
        >
          <page.icon className="size-3" />
          {page.label}
        </div>
      ))}
      <div className="mt-auto flex h-7 items-center gap-1.5 px-1">
        <span className="size-4 rounded-full bg-sidebar-accent" />
        Account
      </div>
    </div>
  )
}

/** The top bar: the breadcrumb, and on a phone the button that opens the sidebar. */
function TopBar({ phone = false }: { phone?: boolean }) {
  return (
    // pr-16 keeps the crumbs clear of the region's label at the bar's end.
    <div className="relative flex h-9 shrink-0 items-center gap-1.5 border-b pr-16 pl-3 text-xs font-medium">
      {phone && <PanelLeftIcon className="size-3.5 shrink-0" />}
      <span className="shrink-0 text-muted-foreground">Prospects</span>
      <span className="text-muted-foreground">/</span>
      <span className="truncate">Northwind Payments</span>
    </div>
  )
}

/** The page column: a page header, then a card, 20px apart at full size. */
function PageColumn({ phone = false }: { phone?: boolean }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col gap-3 p-3">
      <div className={cn("flex gap-2", phone ? "flex-col" : "items-center")}>
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-sm font-semibold">Northwind Payments</span>
          <Line className="w-24" />
        </div>
        <div className="flex gap-1.5">
          <Button size="xs" variant="outline" className={cn(phone && "flex-1")}>
            Edit
          </Button>
          <Button size="xs" variant="outline" className={cn(phone && "flex-1")}>
            Delete
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 surface p-3">
        <span className="text-xs font-semibold">Details</span>
        <Line className="w-3/4" />
        <Line className="w-1/2" />
        <Line className="w-2/3" />
      </div>
      {!phone && (
        <div className="grid grid-cols-2 gap-3">
          <div className="flex h-12 flex-col gap-2 surface p-3">
            <Line className="w-1/2" />
          </div>
          <div className="flex h-12 flex-col gap-2 surface p-3">
            <Line className="w-1/3" />
          </div>
        </div>
      )}
    </div>
  )
}

/** A form in a sheet: its header, two fields, and the footer with Cancel and Save. */
function SheetPane({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute z-10 flex flex-col bg-background text-xs shadow-lg",
        className
      )}
    >
      <div className="flex h-9 shrink-0 items-center px-3 font-medium">
        Edit Prospect
      </div>
      <div className="flex flex-1 flex-col gap-2 px-3">
        <span>Name</span>
        <span className="block h-6 rounded-md control" />
        <span>Owner</span>
        <span className="block h-6 rounded-md control" />
      </div>
      <div className="flex justify-end gap-1.5 p-3">
        <Button size="xs" variant="outline">
          Cancel
        </Button>
        <Button size="xs">Save</Button>
      </div>
    </div>
  )
}

/** A confirmation: the question, its one line, and Cancel then the named action (stacked on a phone). */
function DialogBox({
  phone = false,
  className,
}: {
  phone?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "absolute top-1/2 z-10 flex -translate-y-1/2 flex-col gap-1 rounded-xl bg-background p-3 text-xs shadow-lg ring-[0.5px] ring-border",
        className
      )}
    >
      <span className="font-medium">Delete Prospect?</span>
      <span className="text-muted-foreground">
        This permanently deletes the prospect.
      </span>
      <div
        className={cn(
          "mt-2 flex gap-1.5",
          phone ? "flex-col-reverse" : "justify-end"
        )}
      >
        <Button size="xs" variant="outline">
          Cancel
        </Button>
        <Button size="xs" variant="destructive">
          Delete Prospect
        </Button>
      </div>
    </div>
  )
}

/** The dim behind a sheet, a dialog, or the phone's sidebar. */
const Overlay = () => <div className="absolute inset-0 z-10 bg-overlay" />

function Desktop({ layer }: { layer: Layer }) {
  return (
    <div className="relative flex h-80 overflow-hidden rounded-xl bg-background ring-[0.5px] ring-border">
      <Rail className="w-36 shrink-0" />
      <Tag className="bottom-12 left-2">Sidebar</Tag>
      <div className="relative flex min-w-0 flex-1 flex-col">
        <TopBar />
        <Tag className="top-1.5 right-2">Top bar</Tag>
        <PageColumn />
        <Tag className="right-2 bottom-2">Page column</Tag>
      </div>
      {(layer === "sheet" || layer === "dialog") && <Overlay />}
      {layer === "sheet" && (
        <>
          <SheetPane className="inset-y-2 right-2 w-2/5 rounded-xl ring-[0.5px] ring-border" />
          <Tag className="top-3 right-3 z-20">Sheet</Tag>
        </>
      )}
      {layer === "dialog" && (
        <>
          <DialogBox className="left-1/2 w-56 -translate-x-1/2" />
          <Tag className="top-14 left-1/2 z-20 -translate-x-1/2">Dialog</Tag>
        </>
      )}
    </div>
  )
}

function Phone({ layer }: { layer: Layer }) {
  return (
    <div className="relative mx-auto flex h-80 w-44 flex-col overflow-hidden rounded-xl bg-background ring-[0.5px] ring-border">
      <TopBar phone />
      <Tag className="top-1.5 right-1.5">Top bar</Tag>
      <PageColumn phone />
      <Tag className="right-1.5 bottom-2">Page column</Tag>
      {layer === "sheet" && (
        <>
          <SheetPane className="inset-0" />
          <Tag className="top-1.5 right-1.5 z-20">Sheet</Tag>
        </>
      )}
      {(layer === "dialog" || layer === "sidebar") && <Overlay />}
      {layer === "dialog" && (
        <>
          <DialogBox phone className="inset-x-2" />
          <Tag className="top-14 left-1/2 z-20 -translate-x-1/2">Dialog</Tag>
        </>
      )}
      {layer === "sidebar" && (
        <>
          <Rail className="absolute inset-y-0 left-0 z-10 w-36" />
          <Tag className="bottom-12 left-2 z-20">Sidebar</Tag>
        </>
      )}
    </div>
  )
}

/** The regions on a desktop and on a phone, with a sheet, a dialog, or the phone's sidebar open on request. */
export function ScaffoldDiagram() {
  const [layer, setLayer] = useState<Layer>("page")
  return (
    <Screen
      controls={
        <>
          <span>Show</span>
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            aria-label="What is open"
            value={layer}
            onValueChange={(next) => next && setLayer(next as Layer)}
          >
            <ToggleGroupItem value="page">Page</ToggleGroupItem>
            <ToggleGroupItem value="sheet">Sheet</ToggleGroupItem>
            <ToggleGroupItem value="dialog">Dialog</ToggleGroupItem>
            <ToggleGroupItem value="sidebar">Phone Sidebar</ToggleGroupItem>
          </ToggleGroup>
        </>
      }
      caption="The regions on a desktop and on a phone. The buttons open a sheet, a dialog, or the phone's sidebar over the page."
    >
      <div
        inert
        className="grid gap-4 @min-[40rem]:grid-cols-[minmax(0,1fr)_11rem]"
      >
        <figure className="flex min-w-0 flex-col gap-2">
          <Desktop layer={layer} />
          <figcaption className="text-xs text-muted-foreground">
            Desktop
          </figcaption>
        </figure>
        <figure className="flex flex-col gap-2">
          <Phone layer={layer} />
          <figcaption className="text-center text-xs text-muted-foreground">
            Phone
          </figcaption>
        </figure>
      </div>
    </Screen>
  )
}

export const scaffoldExamples = {
  "@intro": <ScaffoldDiagram />,
}
