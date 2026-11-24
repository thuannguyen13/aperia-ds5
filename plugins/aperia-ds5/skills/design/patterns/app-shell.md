# App Shell

An app shell frames every page with a sidebar, a top bar, and a page column.

## When to use

Use the app shell on every page of an app once the user is signed in. The app sets it up once, and every page sits
inside it. A page never builds its own sidebar, top bar, or page column.

## What is available

An app shell comes in one layout, with a sidebar, a top bar, and a page column. Its parts are listed under Anatomy.

The sidebar shows in three ways. On a desktop it is open at full width or collapsed to a rail of icons. On phones and
tablets it is hidden and opens as a panel.

The account menu shows the user's name and role, the app's own items (such as Notification Settings), Dark Theme or
Light Theme, and Log Out.

## Anatomy

An app shell needs every part except Search and Notifications, which an app adds when it has them. The sidebar's
parts are listed from top to bottom.

1. **Sidebar**. It runs down the left edge in the sidebar color.
2. **Header**. It holds the app logo, the product name, and the collapse button. Selecting the logo opens the home page.
3. **Search** (optional). It shows the search entry and its shortcut, ⌘K or Ctrl K, and opens search. See
   [Global Search](global-search.md).
4. **Notifications** (optional). It follows Search and shows the unread count in a badge in the destructive color. It
   opens the notifications panel. See [Notifications](notifications.md).
5. **Pages**. Each page shows its icon and name, in optional groups with headings. Selecting one opens the page and
   highlights it.
6. **Account**. It shows the user's picture, name, and role, and opens the account menu.
7. **Top bar**. It runs across the top of the page area.
8. **Breadcrumb**. It shows where the page sits. While the sidebar is hidden, the button that opens the sidebar sits before
   it.
9. **Page column**. It fills the space under the top bar and holds the page. See
   [Page Layout](../foundations/page-layout.md) for how a page is laid out inside it.

## How it looks and behaves

### Sidebar

The sidebar is `--sidebar-width` wide and collapses to a rail of icons, `--sidebar-width-icon` wide. It uses the sidebar color, which is the shared Aperia
navy in Light and a dark neutral in Dark. The current page uses the sidebar's highlight color, which is white in Light.

People collapse and open the sidebar in three ways:

- The button beside the product name collapses and opens it. Its tooltip names what a click does next, "Close
  sidebar" or "Open sidebar".
- A click on the sidebar's edge collapses and opens it.
- The shortcut ⌘B, or Ctrl B off a Mac, collapses and opens it.

Collapsing and opening take `--rail-duration` on the ease-out curve, `--rail-ease`. The sidebar, its buttons, and the page beside it move
together. As the rail narrows, the product name is cut off and fades. The collapse button moves with the rail's edge.

On the rail, each entry shows its name in a tooltip. The unread count moves to the corner of the Notifications icon.

The sidebar keeps its open or collapsed state the next time the app loads.

Below the width [Screen Sizes](../foundations/screen-sizes.md) gives, the sidebar is hidden. The button at the start of the top bar opens it as
a 288px panel from the left. Opening a search result closes the panel. See
[Screen Sizes](../foundations/screen-sizes.md) for every region at each screen size.

### Top bar

The top bar is `h-14` tall, on the page background, with a divider under it.

The breadcrumb shows where the page sits. It starts with the page's section as a link, such as Prospects. It ends with
the page's own title, which comes from the page header. A section's own page shows its title alone. A page outside
every section shows the product name.

A record that belongs to another record shows the parent record's page in its trail, wherever it was opened from.

On a phone, a long trail keeps only the last two crumbs, so neither crumb is cut short.

### Page column

The page column scrolls as one, under the top bar, with `p-5` around it. The column is centered and up to
`max-w-360` wide. See [Page Layout](../foundations/page-layout.md) for the sections inside it.

## Rules

### Keep the top bar to the breadcrumb

- **Do:** Keep the top bar to the breadcrumb (such as "Prospects / Northwind Payments") and, on a phone, the sidebar
  button, so people always know where they are.
- **Don't:** Put a title, status chips, dates, filters, or buttons in the top bar. Put them on the page, so the top bar
  shows only where people are.

### Use the shared sidebar

- **Do:** Use the shared sidebar with the app's own logo and name at the top, so the sidebar works the same in every
  Aperia app.
- **Don't:** Build the app its own sidebar, or recolor it to look different. Keep the shared one, so its parts sit in
  the same place in every app.

## When you can do it differently

An app whose main page is a personal work list may place Notifications after that page, such as after To Do, so new
items sit beside the work they affect.

An app changes the sidebar's color only after the design system team agrees to the change, never to look different.
See [Color](../styles/color.md) for what an app can change.

Every other part of the shell is the same in every app.

## Works with

- See [Scaffold](../foundations/scaffold.md) for the bars, rails, and panes the shell is made of, and where each kind
  of thing goes.
- See [Page Layout](../foundations/page-layout.md) for what goes in the page column.
- See [Page Header](page-header.md) for the page title that fills the breadcrumb.
- See [Global Search](global-search.md) and [Notifications](notifications.md) for what opens from the sidebar.

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
