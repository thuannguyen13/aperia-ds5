# Scaffold

A scaffold is the frame that every screen is built in, made of three kinds of region called bars, rails, and panes. See
[App Shell](../patterns/app-shell.md) for the components that build it.

## When to use

Use the scaffold on every screen of an app once the user is signed in. Read it first whenever a screen needs something
new, such as an action, a message, or a form. Its table under How it looks and behaves names the one place each kind of
thing goes.

## What is available

A scaffold has three kinds of region. Each kind does one job, and each sits in the same place on every screen.

| Region | What it does | On every screen |
|---|---|---|
| Bar | Frames the screen and shows people where they are | The top bar, with the breadcrumb. On phones and tablets, it also holds the button that opens the sidebar. |
| Rail | Fills an edge around the content and holds navigation and tools | The sidebar, with the logo, Search, Notifications, the app's pages, and the account |
| Pane | Holds content | The page column, and a sheet while one is open |

A screen has one or two panes:

| Pane | Content | When it shows |
|---|---|---|
| Page column | The page itself, from its page header down. It is the main pane. | Always |
| Sheet | A form that adds or edits a record. It is a second pane, and it is temporary. | While the form is open |

A dialog sits above every region and is not a pane. It asks for a decision or a short input, such as "Delete
Prospect?", and closes before people go on. Menus, popovers, and toasts also float above the regions.

## How it looks and behaves

Every screen places the regions the same way, on a desktop and on a phone.

On a desktop, the sidebar runs down the left edge. It is 256px wide, or 48px when people collapse it to its icons. The
top bar runs across the rest of the screen. It is 56px tall, with a hairline under it. The page column fills the space
under the top bar and scrolls as one. It is centered and up to 1440px wide, with 20px of space around it. A board or a
wide list table fills the full width beside the sidebar instead.

A sheet slides in from the right as the second pane. It sits 16px in from the window's edges, over a dimmed page. A
dialog opens in the middle of the screen, over the page or over the sheet that opened it.

On a phone, the regions change in five ways:

- The sidebar is hidden on phones and tablets, below 768px. The button at the start of the top bar opens it as a
  288px panel from the left.
- The top bar keeps the breadcrumb, cut to its last two crumbs.
- The page column fills the screen under the top bar, with 20px of space around it.
- A sheet fills the screen.
- A dialog stays in the middle, 16px from each side, and its buttons stack with the action on top.

### Where does it go?

Each kind of thing on a screen has one place. This table names that place and the page that owns its rules.

| What | Where it goes | Owner |
|---|---|---|
| Moving between pages | The app's pages in the sidebar. The breadcrumb in the top bar links to the pages above this one. | [App Shell](../patterns/app-shell.md) |
| Search across the app | Search in the sidebar, or ⌘K from any page, which opens a dialog | [Search](../patterns/search.md) |
| Notifications | Notifications in the sidebar, after Search, which opens a panel beside the sidebar | [Notifications](../patterns/notifications.md) |
| The account and the theme | The account at the foot of the sidebar. Its menu holds Dark Theme or Light Theme, and Log Out. | [App Shell](../patterns/app-shell.md) |
| The page's title and facts | The page header, the first section of the page column | [Page Header](../patterns/page-header.md) |
| The page's actions | The end of the page header's title line, with outline buttons first and the primary action last | [Page Header](../patterns/page-header.md) |
| A record's actions | The end of the record's page header, with Edit first and Delete last | [Page Header](../patterns/page-header.md) |
| A list's actions | The right end of the list toolbar, after Sort, with the primary action last | [List Toolbar](../patterns/list-toolbar.md) |
| A list's search, filters, and sort | The list toolbar, with the search and the filters at its left end and Sort at its right end | [List Toolbar](../patterns/list-toolbar.md) |
| A list's count and pages | The footer under the list | [Paging](../patterns/paging.md) |
| Adding or editing a record | A form in a sheet | [Forms in Sheets](../patterns/forms-in-sheets.md) |
| Confirming a delete | A dialog over the page, or over the sheet that opened it | [Confirmations and Delete](../patterns/confirmations-and-delete.md) |
| A success, such as "Note added." | A toast in a corner of the screen, which closes on its own | [Message Templates](copy-templates.md) |
| An error on a field | With the field it names, in the form | [Message Templates](copy-templates.md) |
| An error that no field shows | Above the buttons of the form or dialog, which stays open. An error with nothing left on screen is a toast that stays until it is closed. | [Message Templates](copy-templates.md) |
| An empty list | An empty state in the list's place, holding Add. The list toolbar is gone. | [Empty States](empty-states.md) |

## Rules

### Put all content in a pane

- **Do:** Put every piece of content in the page column or in a sheet, such as a record's status in its page header,
  so people find content in the same two places on every screen.
- **Don't:** Put content in a bar or a rail, such as a record's status in the top bar or a summary under the sidebar's
  pages. Move it into the page column, so the bars and rails stay the same on every page.

### Give each thing one place

- **Do:** Put each thing where the table above places it, such as Add Prospect at the right end of the list toolbar,
  so people find it in the same place in every app.
- **Don't:** Offer one thing in two places, such as Add in the page header and again in the toolbar. Keep its one
  place, so people never wonder which to use.

## When you can do it differently

A board, or a list table wider than the column, fills the full width of the main pane instead of the centered column.
It is still the same pane.

A sheet for rows of amounts that add up, such as an opportunity's line items, is wider than other sheets. It is still
the second pane. See [Forms in Sheets](../patterns/forms-in-sheets.md) for that sheet.

## Works with

- See [App Shell](../patterns/app-shell.md) for the sidebar, the top bar, and the page column.
- See [Page Layout](page-layout.md) for the sections inside the page column.
- See [Screen Sizes](screen-sizes.md) for what each region and part does on a phone and a tablet.
- See [Forms in Sheets](../patterns/forms-in-sheets.md) for the sheet.
- See [Surfaces and Layers](../styles/surfaces-and-layers.md) for the fill of each pane and of the panels above them.
- See [Dialog](../components/dialog.md) for what a dialog holds and what opens in a sheet instead.
- See [Buttons and Actions](../patterns/buttons-and-actions.md) for where buttons go inside each region.

## In code

- The app shell is the scaffold, wired once in the app's layout ([App Shell](../patterns/app-shell.md)). `AppSidebar`
  is the rail, `AppHeader` is the top bar, and `AppContent` is the page column, the main pane. A page renders into
  `AppContent` only. It never adds a fixed bar, a panel of its own, or a second scroll.
- The second pane is `FormSheet` with `SheetForm`. Above the regions sit `ConfirmDialog`, the app's search
  `CommandDialog`, the notifications `Popover`, and toasts from `sonner`.
- `<FullWidth />` in a page lets it fill the main pane. A wider sheet is `FormSheet` with
  `className="data-[side=right]:sm:max-w-6xl"`.
- Below 768px, `AppSidebar` renders as a `Sheet` from the left, opened by the `SidebarToggle` that `AppHeader` shows
  there. Below 640px (`max-sm`), a right `SheetContent` fills the screen.
