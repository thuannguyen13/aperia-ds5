import { useState, type ComponentProps, type ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  BellIcon,
  Building2Icon,
  LayoutDashboardIcon,
  SettingsIcon,
} from "lucide-react"
import {
  AppContent,
  AppHeader,
  AppSidebar,
  AppSidebarNotifications,
  AppSidebarSearch,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  SidebarInset,
  SidebarProvider,
  type AppCrumbs,
  type AppNavGroup,
} from "aperia-ds5"
import { ProspectsPage } from "./list-page.example"
import { RecordPageContent } from "./record-page.example"
import { DashboardPage } from "./dashboard.example"
import { SettingsPageContent } from "./settings-page.example"

// The four standard screens in the real app shell, each the whole window, for the desktop and phone frames on their
// Examples pages (`Devices` in before-after.tsx). Hidden from the sidebar.

const meta: Meta = {
  title: "Design Language/Examples/Screens",
  tags: ["!dev", "!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

const GROUPS: AppNavGroup[] = [
  {
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
      { href: "/prospects", label: "Prospects", icon: Building2Icon },
      { href: "/settings", label: "Settings", icon: SettingsIcon },
    ],
  },
]

// Links in a frame go nowhere.
const FrameLink = ({ href, ...props }: ComponentProps<"a">) => (
  <a href={href} onClick={(event) => event.preventDefault()} {...props} />
)

function Shell({
  path,
  crumbs,
  children,
}: {
  path: string
  crumbs?: AppCrumbs
  children: ReactNode
}) {
  const [searching, setSearching] = useState(false)
  return (
    <SidebarProvider className="h-svh min-h-0">
      <AppSidebar
        brand={{ name: "Aperia Sales Portal" }}
        groups={GROUPS}
        currentPath={path}
        link={FrameLink}
        search={<AppSidebarSearch onOpen={() => setSearching(true)} />}
        notifications={<AppSidebarNotifications icon={BellIcon} unread={3} />}
        user={{ name: "Dana Whitfield", role: "Sales Manager" }}
        onSignOut={() => {}}
      />
      <CommandDialog open={searching} onOpenChange={setSearching}>
        <CommandInput placeholder="Search prospects, contacts, and opportunities" />
        <CommandList>
          <CommandEmpty>No Results</CommandEmpty>
        </CommandList>
      </CommandDialog>
      <SidebarInset className="min-h-0 overflow-hidden">
        <AppHeader crumbs={crumbs} link={FrameLink}>
          <AppContent>{children}</AppContent>
        </AppHeader>
      </SidebarInset>
    </SidebarProvider>
  )
}

export const ListPage: Story = {
  render: () => (
    <Shell path="/prospects" crumbs={[]}>
      <ProspectsPage />
    </Shell>
  ),
}

export const RecordPage: Story = {
  render: () => (
    <Shell
      path="/prospects/659"
      crumbs={[{ label: "Prospects", href: "/prospects" }]}
    >
      <RecordPageContent />
    </Shell>
  ),
}

export const Dashboard: Story = {
  render: () => (
    <Shell path="/dashboard" crumbs={[]}>
      <DashboardPage />
    </Shell>
  ),
}

export const Settings: Story = {
  render: () => (
    <Shell path="/settings" crumbs={[]}>
      <SettingsPageContent />
    </Shell>
  ),
}
