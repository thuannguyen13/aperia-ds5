import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  BellIcon,
  Building2Icon,
  CalendarCheckIcon,
  CheckIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  SquareKanbanIcon,
} from "lucide-react"

import {
  AppSidebar,
  AppSidebarNotifications,
  AppSidebarSearch,
  type AppNavGroup,
} from "./app-sidebar"
import { AppHeader, PageHeader, type AppCrumbs } from "./app-header"
import { RecordActions } from "./record-actions"
import { opensOnClick } from "./open-record"
import { Avatar, AvatarFallback } from "../avatar/avatar"
import { Badge } from "../badge/badge"
import { Button } from "../button/button"
import { Card, CardHeader, CardTitle } from "../card/card"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command/command"
import { DropdownMenuItem } from "../dropdown-menu/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover"
import { SidebarInset, SidebarProvider } from "../sidebar/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/table"

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

const PROSPECTS = [
  {
    id: 101,
    name: "Northwind Payments",
    owner: "Dana Whitfield",
    stage: "Proposal",
    volume: "$4.2M",
  },
  {
    id: 102,
    name: "Blue Harbor Bank",
    owner: "Sam Ortega",
    stage: "Discovery",
    volume: "$1.8M",
  },
  {
    id: 103,
    name: "Cedar Credit Union",
    owner: "Dana Whitfield",
    stage: "Negotiation",
    volume: "$6.5M",
  },
  {
    id: 104,
    name: "Lumen Card Services",
    owner: "Priya Nair",
    stage: "Discovery",
    volume: "$950K",
  },
]

// Links in a story go nowhere.
const StoryLink = ({ href, ...props }: React.ComponentProps<"a">) => (
  <a href={href} onClick={(event) => event.preventDefault()} {...props} />
)

function Shell({
  path,
  crumbs,
  children,
}: {
  path: string
  crumbs?: AppCrumbs
  children: React.ReactNode
}) {
  const [searching, setSearching] = React.useState(false)
  return (
    <SidebarProvider className="h-svh min-h-0">
      <AppSidebar
        brand={{ name: "Aperia Sales Portal" }}
        groups={GROUPS}
        currentPath={path}
        link={StoryLink}
        notificationsAfter="/todo"
        search={<AppSidebarSearch onOpen={() => setSearching(true)} />}
        notifications={
          <Popover>
            <PopoverTrigger asChild>
              <AppSidebarNotifications icon={BellIcon} unread={3} />
            </PopoverTrigger>
            <PopoverContent
              side="right"
              align="start"
              sideOffset={8}
              className="text-sm"
            >
              The app's notifications panel.
            </PopoverContent>
          </Popover>
        }
        user={{ name: "Dana Whitfield", role: "Sales Manager" }}
        accountItems={
          <DropdownMenuItem>
            <BellIcon />
            Notification Settings
          </DropdownMenuItem>
        }
        onSignOut={() => {}}
      />
      <CommandDialog open={searching} onOpenChange={setSearching}>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandEmpty>No Results</CommandEmpty>
          <CommandGroup heading="Prospects">
            {PROSPECTS.map((row) => (
              <CommandItem key={row.id}>{row.name}</CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <SidebarInset className="min-h-0 overflow-hidden">
        <AppHeader crumbs={crumbs} link={StoryLink}>
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-5">
            <div className="mx-auto flex w-full max-w-360 flex-1 flex-col gap-5">
              {children}
            </div>
          </div>
        </AppHeader>
      </SidebarInset>
    </SidebarProvider>
  )
}

function ProspectsTable({ onOpen }: { onOpen: (name: string) => void }) {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="flex min-h-14 items-center py-3">
        <CardTitle role="heading" aria-level={2}>
          Prospects
        </CardTitle>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead className="text-right">Monthly Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PROSPECTS.map((row) => (
            // The whole row opens the record: no per-row button, and the name is plain text like every other cell.
            <TableRow
              key={row.id}
              {...opensOnClick(`Open ${row.name}`, () => onOpen(row.name))}
            >
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell>
                <Badge variant="outline">{row.stage}</Badge>
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {row.volume}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

function ListPage() {
  const [opened, setOpened] = React.useState<string | null>(null)
  return (
    <Shell path="/prospects" crumbs={[]}>
      <PageHeader
        title="Prospects"
        subtitle={
          opened ? `Opened ${opened}` : "Companies you're working to sign."
        }
        actions={<Button>Add Prospect</Button>}
      />
      <ProspectsTable onOpen={setOpened} />
    </Shell>
  )
}

function RecordPage() {
  return (
    <Shell
      path="/prospects/101"
      crumbs={[{ label: "Prospects", href: "/prospects" }]}
    >
      <PageHeader
        title="Northwind Payments"
        subtitle="Card issuing and acquiring, Midwest region"
        media={
          <Avatar size="xl" shape="square">
            <AvatarFallback>NP</AvatarFallback>
          </Avatar>
        }
        menu={
          <RecordActions
            onEdit={() => {}}
            onDelete={() => {}}
            deleteBlocked
            actions={[
              { label: "Mark as Won", icon: CheckIcon, onSelect: () => {} },
            ]}
          />
        }
        properties={[
          ["Owner", "Dana Whitfield"],
          ["Stage", <Badge variant="outline">Proposal</Badge>],
          ["Monthly Volume", "$4.2M"],
          ["Next Step", "Pricing review, Dec 2"],
        ]}
      />
      <ProspectsTable onOpen={() => {}} />
    </Shell>
  )
}

/** Puts the whole document in Dark, so portalled menus and tooltips are Dark too. */
function Dark({ children }: { children: React.ReactNode }) {
  React.useLayoutEffect(() => {
    const root = document.documentElement
    const had = root.classList.contains("dark")
    root.classList.add("dark")
    return () => {
      if (!had) root.classList.remove("dark")
    }
  }, [])
  return children
}

const meta: Meta = {
  title: "UI/App Shell",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The Aperia app shell: `AppSidebar` (brand, search with ⌘K, pages, notifications, account), `AppHeader` (sidebar toggle and breadcrumb only), `PageHeader` (title, subtitle, actions, properties) with `RecordActions`, and `opensOnClick` for rows that open their record. Routes, the link component and the user come in as props.",
      },
    },
  },
}

export default meta
type Story = StoryObj

export const List: Story = { render: () => <ListPage /> }

export const Record: Story = { render: () => <RecordPage /> }

export const RecordDark: Story = {
  name: "Record (Dark)",
  render: () => (
    <Dark>
      <RecordPage />
    </Dark>
  ),
}

export const Phone: Story = {
  render: () => <RecordPage />,
  globals: { viewport: { value: "mobile1", isRotated: false } },
}
