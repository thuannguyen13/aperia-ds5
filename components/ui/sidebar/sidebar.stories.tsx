import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuSkeleton,
  SidebarInset,
  SidebarRail,
  SidebarSeparator,
  SidebarInput,
} from "./sidebar"
import { Separator } from "@/components/ui/separator/separator"
import {
  HomeIcon,
  InboxIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
  BotIcon,
  BookOpenIcon,
  SquareTerminalIcon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
} from "lucide-react"

// CSS transform trick: makes fixed-position children treat this div as their
// containing block instead of the viewport, so the sidebar stays within the frame.
const SidebarFrame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ transform: "scale(1)", height: 600, overflow: "hidden" }}>
    {children}
  </div>
)

const meta: Meta<typeof Sidebar> = {
  title: "UI/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { story: { height: "600px" } },
  },
  decorators: [
    (Story) => (
      <SidebarFrame>
        <Story />
      </SidebarFrame>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Sidebar>

const navItems = [
  { title: "Home", icon: HomeIcon, isActive: true },
  { title: "Inbox", icon: InboxIcon, badge: "3" },
  { title: "Search", icon: SearchIcon },
  { title: "Team", icon: UsersIcon },
  { title: "Settings", icon: SettingsIcon },
]

export const Default: Story = {
  render: () => (
    <SidebarProvider style={{ height: "100%" }}>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="size-6 rounded-md bg-primary" />
            <span className="text-sm font-semibold">Aperia</span>
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.isActive}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-2 py-1 text-xs text-muted-foreground">v2.4.1</div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm font-medium">Home</span>
        </header>
        <div className="flex flex-1 items-center justify-center p-8 text-sm text-muted-foreground">
          Main content area
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

export const IconCollapsible: Story = {
  render: () => (
    <SidebarProvider defaultOpen={false} style={{ height: "100%" }}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="size-6 shrink-0 rounded-md bg-primary" />
            <span className="text-sm font-semibold group-data-[collapsible=icon]:hidden">Aperia</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={item.isActive}
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm font-medium">Dashboard</span>
        </header>
        <div className="flex flex-1 items-center justify-center p-8 text-sm text-muted-foreground">
          Main content area
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

export const Floating: Story = {
  render: () => (
    <SidebarProvider style={{ height: "100%" }}>
      <Sidebar variant="floating">
        <SidebarHeader>
          <div className="px-2 py-1 text-sm font-semibold">Aperia</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.isActive}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <span className="text-sm font-medium">Dashboard</span>
        </header>
        <div className="flex flex-1 items-center justify-center p-8 text-sm text-muted-foreground">
          Main content area
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

export const Inset: Story = {
  render: () => (
    <SidebarProvider style={{ height: "100%" }}>
      <Sidebar variant="inset">
        <SidebarHeader>
          <div className="px-2 py-1 text-sm font-semibold">Aperia</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.isActive}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <span className="text-sm font-medium">Dashboard</span>
        </header>
        <div className="flex flex-1 items-center justify-center p-8 text-sm text-muted-foreground">
          Main content area
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

const navMain = [
  {
    title: "Playground",
    icon: SquareTerminalIcon,
    isActive: true,
    items: [{ title: "History" }, { title: "Starred" }, { title: "Settings" }],
  },
  {
    title: "Models",
    icon: BotIcon,
    items: [{ title: "Genesis" }, { title: "Explorer" }, { title: "Quantum" }],
  },
  {
    title: "Documentation",
    icon: BookOpenIcon,
    items: [
      { title: "Introduction" },
      { title: "Get Started" },
      { title: "Tutorials" },
      { title: "Changelog" },
    ],
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    items: [
      { title: "General" },
      { title: "Team" },
      { title: "Billing" },
      { title: "Limits" },
    ],
  },
]

const projects = [
  { name: "Design Engineering", icon: FrameIcon },
  { name: "Sales & Marketing", icon: PieChartIcon },
  { name: "Travel", icon: MapIcon },
]

export const WithSubmenus: Story = {
  render: () => (
    <SidebarProvider style={{ height: "100%" }}>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="size-6 rounded-md bg-primary" />
            <span className="text-sm font-semibold">Acme Inc</span>
          </div>
          <SidebarInput placeholder="Search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={item.isActive}>
                    <item.icon />
                    <span>{item.title}</span>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {item.items.map((sub) => (
                      <SidebarMenuSubItem key={sub.title}>
                        <SidebarMenuSubButton>
                          <span>{sub.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {projects.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton>
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontalIcon />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <UsersIcon />
                <span>User Account</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm font-medium">Dashboard</span>
        </header>
        <div className="flex flex-1 items-center justify-center p-8 text-sm text-muted-foreground">
          Main content area
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

export const WithSkeleton: Story = {
  render: () => (
    <SidebarProvider style={{ height: "100%" }}>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenuSkeleton showIcon />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Loading...</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <span className="text-sm font-medium">Loading</span>
        </header>
        <div className="flex flex-1 items-center justify-center p-8 text-sm text-muted-foreground">
          Main content area
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

export const RightSide: Story = {
  render: () => (
    <SidebarProvider style={{ height: "100%" }}>
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center justify-end gap-2 border-b px-4">
          <span className="text-sm font-medium">Dashboard</span>
          <Separator orientation="vertical" className="ml-2 h-4" />
          <SidebarTrigger className="-mr-1" />
        </header>
        <div className="flex flex-1 items-center justify-center p-8 text-sm text-muted-foreground">
          Main content area
        </div>
      </SidebarInset>
      <Sidebar side="right">
        <SidebarHeader>
          <div className="px-2 py-1 text-sm font-semibold">Details</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.isActive}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  ),
}
