"use client"

import * as React from "react"
import {
  ChevronsUpDownIcon,
  LogOutIcon,
  MoonIcon,
  PanelLeftIcon,
  SearchIcon,
  SunIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar"
import { Badge } from "@/components/ui/badge/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu/dropdown-menu"
import { Kbd } from "@/components/ui/kbd/kbd"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip/tooltip"
import { renderIcon, type IconProp } from "@/lib/icon"

/** One page in the sidebar. `active` overrides the match on `currentPath`. */
export type AppNavItem = {
  href: string
  label: string
  /** The page's icon, `icon={UsersIcon}` or, from a server component, `icon={<UsersIcon />}`. */
  icon: IconProp
  active?: boolean
}

/** A run of pages, with an optional heading. Most apps have one group without a label. */
export type AppNavGroup = { label?: string; items: AppNavItem[] }

/** Who is signed in, for the account menu at the sidebar's foot. */
export type AppUser = {
  name: string
  /** Their role, under the name and in a badge. */
  role?: string
  /** Their picture; initials on a circle when absent. */
  avatar?: React.ReactNode
}

/** The page links in the shell: the app's router link (Next.js `Link`), or a plain `<a>` by default. */
export type AppLinkComponent = React.ElementType

const isActive = (item: AppNavItem, currentPath?: string) =>
  item.active ??
  (currentPath !== undefined &&
    (currentPath === item.href || currentPath.startsWith(`${item.href}/`)))

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

/**
 * The sidebar's toggle, named for what a click does next. On the rail (`rail`) it is a menu button like its
 * neighbours; `AppHeader` uses the plain trigger below md, where the rail is a sheet.
 */
export function SidebarToggle({
  className,
  rail = false,
}: {
  className?: string
  rail?: boolean
}) {
  const { open, openMobile, isMobile, toggleSidebar } = useSidebar()
  const label = (isMobile ? openMobile : open)
    ? "Close sidebar"
    : "Open sidebar"
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {rail ? (
          <SidebarMenuButton
            aria-label={label}
            onClick={toggleSidebar}
            className={cn("w-auto", className)}
          >
            <PanelLeftIcon />
          </SidebarMenuButton>
        ) : (
          <SidebarTrigger className={className} aria-label={label} />
        )}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

/**
 * The sidebar's Search entry, first in the menu: opens the app's search dialog on a click and on ⌘K (Ctrl K off a
 * Mac). The dialog is the app's own, as it searches the app's records.
 */
export function AppSidebarSearch({
  onOpen,
  label = "Search",
}: {
  onOpen: () => void
  label?: string
}) {
  const [mac, setMac] = React.useState(true)
  const open = React.useRef(onOpen)
  open.current = onOpen
  React.useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform))
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        open.current()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])
  return (
    <SidebarMenuButton tooltip={label} aria-label={label} onClick={onOpen}>
      <SearchIcon />
      <span>{label}</span>
      <Kbd className="ml-auto bg-transparent text-sidebar-foreground/60 max-md:hidden">
        {mac ? "⌘K" : "Ctrl K"}
      </Kbd>
    </SidebarMenuButton>
  )
}

/**
 * The sidebar's Notifications entry: a menu entry like the pages, with the unread count where an entry's count goes.
 * It forwards its props to the button, so the app's `PopoverTrigger asChild` (or sheet trigger) wraps it directly.
 */
export function AppSidebarNotifications({
  unread = 0,
  label = "Notifications",
  icon,
  className,
  ...props
}: React.ComponentProps<typeof SidebarMenuButton> & {
  unread?: number
  label?: string
  icon: IconProp
}) {
  const count = unread > 99 ? "99+" : unread
  return (
    <>
      <SidebarMenuButton
        tooltip={label}
        aria-label={unread > 0 ? `${label}, ${unread} unread` : label}
        className={cn(
          "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
          className
        )}
        {...props}
      >
        {renderIcon(icon)}
        <span>{label}</span>
      </SidebarMenuButton>
      {unread > 0 && (
        <SidebarMenuBadge
          aria-hidden
          className="rounded-full bg-destructive text-white peer-hover/menu-button:text-white"
        >
          {count}
        </SidebarMenuBadge>
      )}
      {/* Collapsed to icons, the sidebar hides an entry's count, so the same count sits on the icon's corner, beside
          the button rather than in it, whose edge would clip it. */}
      {unread > 0 && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 left-4.5 hidden h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] leading-none font-semibold text-white tabular-nums group-data-[collapsible=icon]:flex"
        >
          {count}
        </span>
      )}
    </>
  )
}

/**
 * The app's sidebar, the same in every Aperia app: the logo and product name with the rail's toggle, then Search, the
 * app's pages (Notifications after the page `notificationsAfter` names, else right after Search), and the account
 * menu at the foot (name, role, the app's own items, theme and Log Out).
 *
 * Everything app-specific comes in as props: the pages and `currentPath`, the router's `link`, the user, and the
 * `search` and `notifications` entries (`AppSidebarSearch`, `AppSidebarNotifications`) wired to the app's own dialog
 * and panel. Put sheets opened from `accountItems` in `children`, outside the menu, which unmounts as it closes.
 * Render it inside `SidebarProvider`, beside `SidebarInset`.
 */
export function AppSidebar({
  brand,
  groups,
  currentPath,
  link: Link = "a",
  search,
  notifications,
  notificationsAfter,
  user,
  accountItems,
  onSignOut,
  signingOut = false,
  themeToggle = true,
  children,
  className,
}: {
  /** The logo (a 24px mark) and product name at the top, linking to `href` ("/" by default). */
  brand: { name: string; logo?: React.ReactNode; href?: string }
  groups: AppNavGroup[]
  /** The current route, to mark the page it falls under. */
  currentPath?: string
  link?: AppLinkComponent
  search?: React.ReactNode
  notifications?: React.ReactNode
  /** The `href` of the page Notifications follows, such as the user's To Do; first after Search when absent. */
  notificationsAfter?: string
  user: AppUser
  /** `DropdownMenuItem`s between the user and the theme, such as Notification Settings. */
  accountItems?: React.ReactNode
  onSignOut?: () => void
  /** Disables Log Out while signing out. */
  signingOut?: boolean
  /** The Dark theme / Light theme item, which toggles the `dark` class on `<html>` and stores it as `theme`. */
  themeToggle?: boolean
  children?: React.ReactNode
  className?: string
}) {
  const placed =
    notificationsAfter !== undefined &&
    groups.some((group) =>
      group.items.some((item) => item.href === notificationsAfter)
    )
  const BrandLink = Link

  return (
    <Sidebar variant="inset" collapsible="icon" className={className}>
      {/* The sidebar is a div; a landmark lets a screen reader jump to it and past it. */}
      <nav aria-label="Main" className="flex min-h-0 flex-1 flex-col">
        <SidebarHeader className="h-14 justify-center">
          <SidebarMenu>
            {/* The name fills what the toggle leaves, so as the rail narrows it is cut and fades while the toggle
                rides the rail's edge. Collapsed, 3px of padding keeps the toggle over the icons. */}
            <SidebarMenuItem className="flex items-center gap-1 transition-[padding] duration-(--rail-duration) ease-(--rail-ease) group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:pr-0.75">
              {/* The 24px logo centers on the 16px icon column and the name starts on the labels' line. */}
              <SidebarMenuButton
                size="lg"
                className="h-10 min-w-0 flex-1 gap-1 pl-1 transition-[height,padding,opacity,visibility] group-data-[collapsible=icon]:invisible group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:opacity-0"
                asChild
              >
                <BrandLink href={brand.href ?? "/"}>
                  {brand.logo ?? (
                    <span className="flex size-6 shrink-0 items-center justify-center rounded bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
                      {brand.name[0]}
                    </span>
                  )}
                  <span className="font-semibold">{brand.name}</span>
                </BrandLink>
              </SidebarMenuButton>
              <SidebarToggle rail className="shrink-0" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarSeparator />

        <SidebarContent>
          {groups.map((group, at) => (
            <SidebarGroup key={group.label ?? at}>
              {group.label && (
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {at === 0 && search && (
                    <SidebarMenuItem>{search}</SidebarMenuItem>
                  )}
                  {at === 0 && notifications && !placed && (
                    <SidebarMenuItem>{notifications}</SidebarMenuItem>
                  )}
                  {group.items.map((item) => (
                    <React.Fragment key={item.href}>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive(item, currentPath)}
                          tooltip={item.label}
                          // The current page inverts. Both states sit on data-active so they outrank the hover rule
                          // at the same specificity.
                          className="data-active:bg-sidebar-primary data-active:text-sidebar-primary-foreground data-active:hover:bg-sidebar-primary data-active:hover:text-sidebar-primary-foreground"
                        >
                          <Link href={item.href}>
                            {renderIcon(item.icon)}
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      {notifications &&
                        placed &&
                        item.href === notificationsAfter && (
                          <SidebarMenuItem>{notifications}</SidebarMenuItem>
                        )}
                    </React.Fragment>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        {children}
        <SidebarSeparator />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="h-auto"
                    tooltip={user.name}
                  >
                    {user.avatar ?? (
                      <Avatar className="size-8">
                        <AvatarFallback>{initials(user.name)}</AvatarFallback>
                      </Avatar>
                    )}
                    <span className="flex min-w-0 flex-col items-start gap-1">
                      <span className="max-w-36 truncate font-medium">
                        {user.name}
                      </span>
                      {user.role && (
                        <Badge variant="secondary">{user.role}</Badge>
                      )}
                    </span>
                    <ChevronsUpDownIcon className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="right"
                  align="end"
                  sideOffset={8}
                  className="w-56"
                >
                  <DropdownMenuLabel className="flex flex-col gap-1">
                    <span>{user.name}</span>
                    {user.role && (
                      <span className="text-xs font-normal text-muted-foreground">
                        {user.role}
                      </span>
                    )}
                  </DropdownMenuLabel>
                  {(accountItems || themeToggle) && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        {accountItems}
                        {themeToggle && (
                          // The label is read from the html class by CSS, so it renders the same on the server.
                          <DropdownMenuItem
                            onSelect={(event) => {
                              event.preventDefault()
                              const dark =
                                document.documentElement.classList.toggle(
                                  "dark"
                                )
                              try {
                                localStorage.setItem(
                                  "theme",
                                  dark ? "dark" : "light"
                                )
                              } catch {
                                // Storage blocked: the theme still changes for this visit.
                              }
                            }}
                          >
                            <MoonIcon className="dark:hidden" />
                            <SunIcon className="hidden dark:block" />
                            <span className="dark:hidden">Dark Theme</span>
                            <span className="hidden dark:inline">
                              Light Theme
                            </span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuGroup>
                    </>
                  )}
                  {onSignOut && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          disabled={signingOut}
                          onSelect={(event) => {
                            event.preventDefault()
                            onSignOut()
                          }}
                        >
                          <LogOutIcon />
                          Log Out
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </nav>

      <SidebarRail />
    </Sidebar>
  )
}
