import { useEffect, useRef, useState, type ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  BellIcon,
  Building2Icon,
  CalendarCheckIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  SquareKanbanIcon,
} from "lucide-react"
import {
  AppContent,
  AppHeader,
  AppSidebar,
  AppSidebarNotifications,
  AppSidebarSearch,
  Badge,
  CardContent,
  ListToolbar,
  PageHeader,
  SidebarInset,
  SidebarProvider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type AppNavGroup,
  type SortState,
} from "aperia-ds5"
import { formatDate } from "aperia-ds5/format"
import { sortRows, type SortField } from "aperia-ds5/list"
import { TitledCard } from "../recipes"

// Compositions that lay out by the window, drawn in their own frame for an Anatomy drawing (anatomy.tsx, `story`), so
// they show as on a desktop at every width of the docs page. Hidden from the sidebar.

const meta: Meta = {
  title: "Design Language/Examples/Anatomy",
  tags: ["!dev", "!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

const GROUPS: AppNavGroup[] = [
  {
    items: [
      { href: "/todo", label: "To Do", icon: CalendarCheckIcon },
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
      { href: "/prospects", label: "Prospects", icon: Building2Icon },
      { href: "/pipeline", label: "Pipeline", icon: SquareKanbanIcon },
      { href: "/settings", label: "Settings", icon: SettingsIcon },
    ],
  },
]

// Links in the drawing go nowhere.
const Link = ({ href, ...props }: ComponentProps<"a">) => (
  <a href={href} onClick={(event) => event.preventDefault()} {...props} />
)

/** The app shell on a record's page: the sidebar with every part, the top bar with a two-crumb trail, and the page. */
export const AppShell: Story = {
  render: () => (
    <SidebarProvider className="h-svh min-h-0">
      <AppSidebar
        brand={{ name: "Aperia Sales Portal" }}
        groups={GROUPS}
        currentPath="/prospects/101"
        link={Link}
        search={<AppSidebarSearch onOpen={() => {}} />}
        notifications={<AppSidebarNotifications icon={BellIcon} unread={3} />}
        user={{ name: "Dana Whitfield", role: "Sales Manager" }}
      />
      <SidebarInset className="min-h-0 overflow-hidden">
        <AppHeader
          crumbs={[{ label: "Prospects", href: "/prospects" }]}
          link={Link}
        >
          <AppContent>
            <PageHeader
              title="Northwind Payments"
              subtitle="Card issuing and acquiring, Midwest region"
              properties={[
                ["Owner", "Dana Whitfield"],
                ["Stage", <Badge variant="outline">Proposal</Badge>],
              ]}
            />
            <TitledCard title="Details">
              <CardContent className="pb-4 text-sm text-muted-foreground">
                Monthly volume of $4,200,000 across three card programs.
              </CardContent>
            </TitledCard>
          </AppContent>
        </AppHeader>
      </SidebarInset>
    </SidebarProvider>
  ),
}

type Queue = { id: number; name: string; open: number; alerted: string }

const QUEUES: Queue[] = [
  { id: 1, name: "Chargeback Review", open: 42, alerted: "2026-11-04" },
  { id: 2, name: "High-Risk Merchants", open: 7, alerted: "2026-11-19" },
  { id: 3, name: "Pricing Exceptions", open: 15, alerted: "2026-11-11" },
  { id: 4, name: "Refund Spikes", open: 3, alerted: "2026-11-21" },
]

const QUEUE_SORTS: SortField<Queue>[] = [
  { value: "name", label: "Name", read: (row) => row.name },
  {
    value: "open",
    label: "Open Alerts",
    read: (row) => row.open,
    starts: "desc",
  },
  {
    value: "alerted",
    label: "Last Alert",
    read: (row) => row.alerted,
    starts: "desc",
  },
]

function SortedList() {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortState>({
    by: "alerted",
    direction: "desc",
  })
  // The drawing shows the panel, so it opens once on load. It is the real panel: a choice reorders the rows.
  const root = useRef<HTMLDivElement>(null)
  const opened = useRef(false)
  useEffect(() => {
    if (opened.current) return
    opened.current = true
    root.current
      ?.querySelector<HTMLButtonElement>('button[aria-label^="Sort"]')
      ?.click()
    // The open panel takes the keyboard focus into this frame. Hand it back to the docs page around the frame.
    const release = setTimeout(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur()
      ;(window.frameElement as HTMLElement | null)?.blur()
    }, 100)
    return () => clearTimeout(release)
  }, [])
  const rows = sortRows(
    QUEUES.filter((row) =>
      row.name.toLowerCase().includes(query.toLowerCase())
    ),
    QUEUE_SORTS,
    sort
  )
  return (
    <div ref={root} className="flex flex-col gap-5 p-6">
      <ListToolbar
        search={{
          placeholder: "Search queues",
          value: query,
          onChange: setQuery,
        }}
        sort={{ fields: QUEUE_SORTS, value: sort, onChange: setSort }}
      />
      <div className="overflow-clip surface">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Name</TableHead>
              <TableHead className="text-right">Open Alerts</TableHead>
              <TableHead className="pr-4">Last Alert</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="pl-4">{row.name}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {row.open}
                </TableCell>
                <TableCell className="pr-4 tabular-nums">
                  {formatDate(row.alerted)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

/** Sort in a list's toolbar with its panel open, sorted by Last Alert, newest first. */
export const Sort: Story = {
  render: () => <SortedList />,
}
