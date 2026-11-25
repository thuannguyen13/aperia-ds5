import { useEffect, useRef, type ComponentProps } from "react"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
  SidebarInset,
  SidebarProvider,
  type AppNavGroup,
} from "aperia-ds5"
import { NotificationsPanel } from "./search-and-notifications.example"

// The Notifications entry in the sidebar with its panel open, drawn in its own frame for an Anatomy drawing
// (anatomy.tsx, `story`), because the panel renders outside an inline drawing. Hidden from the sidebar.

const meta: Meta = {
  title: "Design Language/Examples/Anatomy Notifications",
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

function NotificationsOpen() {
  // The drawing shows the panel, so it opens once on load. It is the real popover.
  const root = useRef<HTMLDivElement>(null)
  const opened = useRef(false)
  useEffect(() => {
    if (opened.current) return
    opened.current = true
    root.current
      ?.querySelector<HTMLButtonElement>('button[aria-label^="Notifications"]')
      ?.click()
    // The open panel takes the keyboard focus into this frame. Hand it back to the docs page around the frame.
    const release = setTimeout(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur()
      ;(window.frameElement as HTMLElement | null)?.blur()
    }, 100)
    return () => clearTimeout(release)
  }, [])
  return (
    <div ref={root}>
      <SidebarProvider className="h-svh min-h-0">
        <AppSidebar
          brand={{ name: "Aperia Sales Portal" }}
          groups={GROUPS}
          currentPath="/prospects"
          link={Link}
          notificationsAfter="/todo"
          search={<AppSidebarSearch onOpen={() => {}} />}
          notifications={
            <Popover>
              <PopoverTrigger asChild>
                <AppSidebarNotifications icon={BellIcon} unread={3} />
              </PopoverTrigger>
              <PopoverContent
                side="right"
                align="start"
                sideOffset={8}
                className="w-96 gap-0 rounded-xl bg-transparent p-0 shadow-none ring-0"
              >
                <NotificationsPanel />
              </PopoverContent>
            </Popover>
          }
          user={{ name: "Dana Whitfield", role: "Sales Manager" }}
        />
        <SidebarInset className="min-h-0 overflow-hidden">
          <AppHeader crumbs={[]} link={Link}>
            <AppContent>{null}</AppContent>
          </AppHeader>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

/** The sidebar's Notifications entry with its panel open on the Unread tab: three unread notifications, one of each look. */
export const Notifications: Story = {
  render: () => <NotificationsOpen />,
}
