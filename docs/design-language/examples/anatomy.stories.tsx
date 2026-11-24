import type { ComponentProps } from "react"
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
  PageHeader,
  SidebarInset,
  SidebarProvider,
  type AppNavGroup,
} from "aperia-ds5"
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
