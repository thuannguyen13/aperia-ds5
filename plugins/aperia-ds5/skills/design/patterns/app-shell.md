# App Shell

An app shell lets people move between the pages of an app and see where they are, through a sidebar, a top bar, and a
page column. See [Scaffold](../foundations/scaffold.md) for where each kind of thing goes in the shell.

## Anatomy

An app shell has nine parts, a sidebar with six parts, a top bar with two, and a page column. Search and Notifications
show only when an app has them. The sidebar's parts are listed from top to bottom.

1. **Sidebar**. It is the panel down the left edge, in the sidebar color. It holds the app's navigation.
2. **Header**. It is the top of the sidebar. It holds the app logo, the product name, and the collapse button. Selecting
   the logo opens the home page.
3. **Search** (optional). It is a menu entry that shows a search icon, "Search", and the shortcut ⌘K or Ctrl K. Selecting
   the entry opens search. See [Global Search](global-search.md).
4. **Notifications** (optional). It is a menu entry with a bell icon, and a badge in the destructive color that shows
   the unread count. It opens the notifications panel. See [Notifications](notifications.md).
5. **Pages**. They are the menu entries that open the app's pages, each with an icon and a name, in optional groups with
   headings. The current page is highlighted.
6. **Account**. It is a button at the foot of the sidebar that shows the user's picture, name, and role. Selecting the
   button opens the account menu.
7. **Top bar**. It is the bar across the top of the page area.
8. **Breadcrumb**. It is a trail of links in the top bar that shows where the page sits. While the sidebar is hidden,
   the button that opens the sidebar sits before it.
9. **Page column**. It is the area under the top bar that holds the page. See
   [Page Layout](../foundations/page-layout.md) for how a page is laid out inside it.

## How it looks and behaves

### Sidebar

The sidebar is `--sidebar-width` wide and collapses to a rail of icons, `--sidebar-width-icon` wide. It uses the sidebar
color, which is the shared Aperia navy in Light and a dark neutral in Dark. The current page uses the sidebar's
highlight color, which is white in Light.

Search comes first among the menu entries and Notifications follows it. An app whose main page is a personal work list
may place Notifications after that page, such as To Do. New items then sit beside the work they affect.

People collapse and open the sidebar in three ways:

- The button beside the product name collapses and opens it. Its tooltip names what a click does next, "Close
  sidebar" or "Open sidebar".
- A click on the sidebar's edge collapses and opens it.
- The shortcut ⌘B, or Ctrl B off a Mac, collapses and opens it.

Collapsing and opening take `--rail-duration` on the ease-out curve, `--rail-ease`. The sidebar, its buttons, and the
page beside it move together. As the rail narrows, the product name is cut off and fades. The collapse button moves with
the rail's edge.

On the rail, each entry shows its name in a tooltip. The unread count moves to the corner of the Notifications icon.

The sidebar keeps its open or collapsed state the next time the app loads.

The account menu shows the user's name and role, the app's own items (such as Notification Settings), Dark Theme or
Light Theme, and Log Out.

The sidebar is hidden on a phone and a tablet. The button at the start of the top bar opens it as a panel from the left,
and the panel closes when people open a search result. See [Screen Sizes](../foundations/screen-sizes.md) for the width
where it hides and for every region at each screen size.

### Top bar

The top bar is `h-14` tall, on the page background, with a divider under it.

The breadcrumb starts with the page's section as a link, such as Prospects. It ends with the page's own title, which
comes from the [Page Header](page-header.md). A section's own page shows its title alone. A page outside every section
shows the product name.

A record that belongs to another record shows the parent record's page in its trail, wherever it was opened from.

On a phone, a long trail keeps only the last two crumbs, so neither crumb is cut short.

### Page column

The page column scrolls as one, under the top bar, with `p-5` around it. The column is centered and up to
`max-w-360` wide. See [Page Layout](../foundations/page-layout.md) for the sections inside it.

## Rules

### 1. Build the shell once

The app sets up one shell in its layout. Every page after sign-in sits inside it, so the sidebar, top bar, and page
column stay the same on every page.

- **Do:** Put each page's content in the page column.
- **Don't:** Build a sidebar, a top bar, or a page column inside a page.

### 2. Use the shared sidebar

Every app uses the shared sidebar with its own logo and name in the header, so its parts sit in the same place in every
app. Every other part of the shell is the same in every app. The design system team must agree before an app changes the
sidebar's color. See [Color](../styles/color.md) for what an app can change.

- **Do:** Set the app's own logo and name at the top of the shared sidebar.
- **Don't:** Build the app its own sidebar, or recolor it to look different.

### 3. Keep the top bar to the breadcrumb

The top bar shows only where people are, so they always know where they are. It holds the breadcrumb and, on a phone,
the button that opens the sidebar.

- **Do:** Show "Prospects / Northwind Payments" in the top bar.
- **Don't:** Put a title, status chips, dates, filters, or buttons in the top bar. Put them on the page.

## In code

- Every `icon` here (a sidebar item's, `AppSidebarNotifications`', a `RecordActions` action's) takes the icon
  (`icon={UsersIcon}`) or an element (`icon={<UsersIcon />}`). A server component, such as a layout that lists the
  pages, passes the element.
- Wire it once in the app's layout, from `aperia-ds5`:

  ```tsx
  <TooltipProvider>
    <SidebarProvider>
      <AppSidebar brand={{ name: "Sales Portal", logo }} groups={groups} currentPath={pathname} link={Link}
        search={<AppSidebarSearch onOpen={openSearch} />}
        notifications={<Popover><PopoverTrigger asChild><AppSidebarNotifications icon={BellIcon} unread={3} /></PopoverTrigger>…</Popover>}
        notificationsAfter="/todo" user={{ name, role }} accountItems={…} onSignOut={signOut} />
      <SidebarInset>
        <AppHeader crumbs={crumbs} link={Link}>
          <AppContent>{children}</AppContent>
        </AppHeader>
      </SidebarInset>
    </SidebarProvider>
  </TooltipProvider>
  ```

- `AppSidebar`: `brand` (`name`, a 24px `logo`, `href`), `groups` (`{ label?, items: { href, label, icon }[] }`),
  `currentPath`, the router's `link`, `search`, `notifications`, `notificationsAfter`, `user` (`name`, `role`,
  `avatar`), `accountItems` (`DropdownMenuItem`s), `onSignOut`, `signingOut`, `themeToggle`. Sheets opened from
  `accountItems` go in its `children`, outside the menu.
- The search dialog and the notifications panel are the app's own; `AppSidebarSearch` and `AppSidebarNotifications`
  only open them.
- `AppHeader`: `crumbs` are the crumbs before the page's title, from the route (none on a section's own page);
  `fallback` shows when there are none. `PageHeader` fills the last crumb. `TooltipProvider` wraps the shell once: the
  sidebar's tooltips need it.
- `AppContent`'s column has the id `content`, the target of a "Skip to content" link.
