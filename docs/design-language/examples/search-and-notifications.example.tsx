import { useEffect, useState, type ReactNode } from "react"
import { BellIcon, SearchIcon, SettingsIcon } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  Button,
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  EmptyState,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  Kbd,
  KbdGroup,
  NoResults,
  RelativeTime,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  matchRange,
} from "aperia-ds5"
import { IconButton } from "../recipes"
import { initials } from "@/lib/format"
import { cn } from "@/lib/utils"
import { BeforeAfter, Screen } from "./before-after"

// ── Search ──────────────────────────────────────────────────────────────────────────────────────────────────────────

type Found = { id: number; name: string; detail: string }
type Kind = {
  key: string
  heading: string
  square: boolean
  rows: Found[]
}

// The kinds in their fixed order. In an app the server matches; this stands in for its answer.
const KINDS: Kind[] = [
  {
    key: "prospects",
    heading: "Prospects",
    square: true,
    rows: [
      {
        id: 101,
        name: "Northwind Payments",
        detail: "Proposal · Dana Whitfield",
      },
      { id: 102, name: "Blue Harbor Bank", detail: "Discovery · Sam Ortega" },
      { id: 103, name: "Cedar Credit Union", detail: "Demo · Dana Whitfield" },
    ],
  },
  {
    key: "contacts",
    heading: "Contacts",
    square: false,
    rows: [
      { id: 201, name: "Nora Whitley", detail: "CFO, Northwind Payments" },
      { id: 202, name: "Marcus Lee", detail: "Operations, Blue Harbor Bank" },
    ],
  },
  {
    key: "opportunities",
    heading: "Opportunities",
    square: true,
    rows: [
      { id: 659, name: "Northwind Card Issuing", detail: "Opportunity #659" },
      { id: 702, name: "Cedar Merchant Services", detail: "Opportunity #702" },
    ],
  },
]

function serverSearch(query: string) {
  const needle = query.trim()
  if (needle === "") return []
  return KINDS.map((kind) => ({
    ...kind,
    rows: kind.rows.filter(
      (row) =>
        matchRange(row.name, needle) !== null ||
        matchRange(row.detail, needle) !== null
    ),
  })).filter((kind) => kind.rows.length > 0)
}

function Marked({ text, query }: { text: string; query: string }) {
  const range = matchRange(text, query)
  if (range === null) return text
  const [start, end] = range
  return (
    <>
      {text.slice(0, start)}
      <mark className="bg-transparent font-semibold text-foreground">
        {text.slice(start, end)}
      </mark>
      {text.slice(end)}
    </>
  )
}

function Picture({ name, square }: { name: string; square?: boolean }) {
  return (
    <Avatar size="xs" shape={square ? "square" : "circle"}>
      <AvatarFallback>{initials(name)}</AvatarFallback>
    </Avatar>
  )
}

const PAUSE_MS = 150

function SearchPanel() {
  const [query, setQuery] = useState("nor")
  const [settled, setSettled] = useState("nor")
  const [opened, setOpened] = useState<string | null>(null)
  // The search runs once typing pauses; until then the last results stay, faded.
  useEffect(() => {
    const wait = setTimeout(() => setSettled(query), PAUSE_MS)
    return () => clearTimeout(wait)
  }, [query])
  const results = serverSearch(settled)
  const typing = query !== settled
  return (
    <div className="flex w-full flex-col gap-2">
      <Command
        shouldFilter={false}
        label="Search"
        className="h-auto shadow-lg ring-[0.5px] ring-border"
      >
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search prospects, contacts and opportunities"
        />
        <CommandList
          className={cn(
            "max-h-80 transition-opacity duration-150",
            typing && "opacity-60"
          )}
        >
          {!typing && settled.trim() !== "" && results.length === 0 && (
            <NoResults className="py-8" />
          )}
          {results.map((kind) => (
            <CommandGroup key={kind.key} heading={kind.heading}>
              {kind.rows.map((row) => (
                <CommandItem
                  key={row.id}
                  value={`${kind.key}-${row.id}`}
                  onSelect={() => {
                    setOpened(row.name)
                    setQuery("")
                    setSettled("")
                  }}
                >
                  <Picture name={row.name} square={kind.square} />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate">
                      <Marked text={row.name} query={settled} />
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {row.detail}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
        <div className="flex flex-wrap items-center gap-3 border-t-[0.5px] px-3 py-1.5 text-[11px] text-muted-foreground max-sm:hidden">
          <span className="flex items-center gap-1">
            <KbdGroup>
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
            </KbdGroup>
            Move
          </span>
          <span className="flex items-center gap-1">
            <Kbd>↵</Kbd>
            Open
          </span>
          <span className="flex items-center gap-1">
            <Kbd>⌘↵</Kbd>
            Open in New Tab
          </span>
          <span className="flex items-center gap-1">
            <Kbd>Esc</Kbd>
            Close
          </span>
        </div>
      </Command>
      {opened && (
        <p className="text-xs text-muted-foreground">Opened {opened}.</p>
      )}
    </div>
  )
}

// ── Notifications ───────────────────────────────────────────────────────────────────────────────────────────────────

type Note = {
  id: number
  actor: string | null
  said: string
  record: string
  at: string
  read: boolean
}

const NOTES: Note[] = [
  {
    id: 1,
    actor: "Sam Ortega",
    said: "Sam Ortega assigned you Blue Harbor Bank.",
    record: "Blue Harbor Bank",
    at: "2026-11-23T14:05:00Z",
    read: false,
  },
  {
    id: 2,
    actor: "Priya Nair",
    said: "Priya Nair changed Northwind Card Issuing to Proposal.",
    record: "Northwind Card Issuing",
    at: "2026-11-23T09:40:00Z",
    read: false,
  },
  {
    id: 3,
    actor: null,
    said: "Send Proposal on Cedar Credit Union is overdue.",
    record: "Cedar Credit Union",
    at: "2026-11-22T13:00:00Z",
    read: false,
  },
  {
    id: 4,
    actor: "Marcus Lee",
    said: "Marcus Lee added a note to Lumen Card Services.",
    record: "Lumen Card Services",
    at: "2026-11-19T16:20:00Z",
    read: true,
  },
]

/** The sentence in gray, with who did it and the record in the body color, a little heavier. */
function Sentence({ note }: { note: Note }) {
  const parts = [note.actor, note.record].filter(Boolean) as string[]
  const pieces: ReactNode[] = []
  let from = 0
  for (const part of parts) {
    const at = note.said.indexOf(part, from)
    if (at < 0) continue
    pieces.push(
      note.said.slice(from, at),
      <span key={at} className="font-medium text-foreground">
        {part}
      </span>
    )
    from = at + part.length
  }
  pieces.push(note.said.slice(from))
  return <span className="text-sm text-muted-foreground">{pieces}</span>
}

function NotificationList({
  notes,
  empty,
  onOpen,
}: {
  notes: Note[]
  empty: string
  onOpen: (id: number) => void
}) {
  if (notes.length === 0)
    return <EmptyState icon={BellIcon} title={empty} className="py-10" />
  return (
    <ItemGroup className="gap-0 p-1 has-data-[size=sm]:gap-0">
      {notes.map((note) => (
        <Item
          key={note.id}
          size="sm"
          asChild
          className="items-start gap-3 px-3 py-2.5 focus-visible:bg-accent"
        >
          <a
            href={`#${note.record}`}
            onClick={(event) => {
              event.preventDefault()
              onOpen(note.id)
            }}
          >
            <ItemMedia>
              {note.actor ? (
                <Avatar size="sm">
                  <AvatarFallback>{initials(note.actor)}</AvatarFallback>
                </Avatar>
              ) : (
                <BellIcon className="size-6 p-1 text-muted-foreground" />
              )}
            </ItemMedia>
            <ItemContent className="gap-0.5">
              <Sentence note={note} />
              <span className="text-xs text-muted-foreground">
                <RelativeTime value={new Date(note.at)} />
              </span>
            </ItemContent>
            {!note.read && (
              <span
                aria-label="Unread"
                className="mt-1.5 size-2 shrink-0 rounded-full bg-destructive"
              />
            )}
          </a>
        </Item>
      ))}
    </ItemGroup>
  )
}

function NotificationsPanel() {
  const [notes, setNotes] = useState(NOTES)
  const unread = notes.filter((note) => !note.read)
  const open = (id: number) =>
    setNotes((was) =>
      was.map((note) => (note.id === id ? { ...note, read: true } : note))
    )
  return (
    // The panel as it opens beside the sidebar: up to 24rem, never wider than the screen.
    <div className="w-full max-w-96 overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-md ring-[0.5px] ring-border">
      <Tabs defaultValue="unread" className="gap-0">
        <div className="flex h-12 items-center justify-between gap-2 border-b pr-2 pl-3">
          <TabsList
            variant="line"
            className="h-full gap-2 p-0 group-data-horizontal/tabs:h-full"
          >
            <TabsTrigger
              value="unread"
              className="h-full min-w-12 flex-none gap-1 px-1 group-data-horizontal/tabs:after:bottom-[-1px]"
            >
              Unread
              {unread.length > 0 && (
                <span className="tabular-nums">{unread.length}</span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="h-full min-w-12 flex-none gap-1 px-1 group-data-horizontal/tabs:after:bottom-[-1px]"
            >
              All
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              disabled={unread.length === 0}
              onClick={() =>
                setNotes((was) => was.map((note) => ({ ...note, read: true })))
              }
            >
              Mark All as Read
            </Button>
            <IconButton label="Notification Settings">
              <SettingsIcon />
            </IconButton>
          </div>
        </div>
        <TabsContent value="unread">
          <NotificationList
            notes={unread}
            empty="No Unread Notifications"
            onOpen={open}
          />
        </TabsContent>
        <TabsContent value="all">
          <NotificationList
            notes={notes}
            empty="No Notifications"
            onOpen={open}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

/** The search panel as it opens over the page. */
export function SearchExample() {
  return (
    <Screen caption="Type to see the results fade while they update. “nor” matches across kinds; “zzz” finds nothing.">
      <div className="w-full max-w-xl self-center">
        <SearchPanel />
      </div>
    </Screen>
  )
}

/** The notifications panel as it opens beside the sidebar. */
export function NotificationsExample() {
  return (
    <Screen caption="Open a notification to mark it read. Mark All as Read empties the Unread tab.">
      <div className="flex w-full justify-center">
        <NotificationsPanel />
      </div>
    </Screen>
  )
}

// ── Before and after ────────────────────────────────────────────────────────────────────────────────────────────────

export function SearchAndNotificationsBeforeAfter() {
  return (
    <BeforeAfter
      beforeNote="a search page with a table of names; notifications in one weight, “No data” when empty"
      afterNote="search over the page with pictures and the match in bold; notifications with tabs, pictures and “No Unread Notifications”"
      before={
        <>
          <h3 className="text-lg font-semibold">Search Results</h3>
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput aria-label="Search" defaultValue="nor" />
          </InputGroup>
          <div className="overflow-hidden surface">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">Name</TableHead>
                  <TableHead className="pr-4">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["Northwind Payments", "Prospect"],
                  ["Nora Whitley", "Contact"],
                  ["Northwind Card Issuing", "Opportunity"],
                ].map(([name, type]) => (
                  <TableRow key={name}>
                    <TableCell className="pl-4">{name}</TableCell>
                    <TableCell className="pr-4">{type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="rounded-xl bg-popover p-3 ring-[0.5px] ring-border">
            <p className="mb-2 font-semibold">Notifications</p>
            <p className="text-muted-foreground">No data</p>
          </div>
        </>
      }
      after={
        <>
          <div className="overflow-hidden rounded-xl bg-popover shadow-md ring-[0.5px] ring-border">
            <Command shouldFilter={false} label="Search" className="h-auto">
              <CommandInput
                aria-label="Search"
                placeholder="Search prospects, contacts and opportunities"
                value="nor"
                readOnly
              />
              <CommandList>
                {serverSearch("nor").map((kind) => (
                  <CommandGroup key={kind.key} heading={kind.heading}>
                    {kind.rows.slice(0, 1).map((row) => (
                      <CommandItem key={row.id} value={`${kind.key}-${row.id}`}>
                        <Picture name={row.name} square={kind.square} />
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate">
                            <Marked text={row.name} query="nor" />
                          </span>
                          <span className="truncate text-xs text-muted-foreground">
                            {row.detail}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </div>
          <div className="overflow-hidden rounded-xl bg-popover ring-[0.5px] ring-border">
            <EmptyState
              icon={BellIcon}
              title="No Unread Notifications"
              className="py-6"
            />
          </div>
        </>
      }
    />
  )
}

export const searchAndNotificationsExamples = {
  Search: <SearchExample />,
  Notifications: <NotificationsExample />,
  "Before and after": <SearchAndNotificationsBeforeAfter />,
}
