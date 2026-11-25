# Scaffold

A scaffold gives every screen after sign-in the same regions in the same places, so people always know where to find
navigation, content, and actions. See [App Shell](../patterns/app-shell.md) for the components that build it.

## Anatomy

A scaffold has four regions, the sidebar, the top bar, the page column, and a sheet. The sheet shows only while a form
is open. The parts are those of a prospect's page with its edit form open in a sheet.

1. **Sidebar**. It is the navigation panel on the left of every screen. It holds the logo, Search, Notifications, the
   app's pages, and the account.
2. **Top bar**. It is the bar across the top of the screen, beside the sidebar. It holds the breadcrumb, a trail of
   links that shows where the page sits. While the sidebar is hidden, it also holds the button that opens the sidebar.
3. **Page column**. It is the region under the top bar that holds the page, from its page header down. It is the one
   region that scrolls.
4. **Sheet** (optional). It is a second panel that opens from the right edge, over a dimmed page. It holds a form that
   adds or edits a record, and it closes when the form is done.

## How it looks and behaves

Every screen places the regions the same way, on a desktop and on a phone. The sidebar and the top bar stay in place
while the page column scrolls.

### On a desktop

The sidebar runs down the left edge. It is `--sidebar-width` wide, or `--sidebar-width-icon` wide when people collapse
it to its icons. The top bar runs across the screen beside the sidebar. It is `h-14` tall, with a divider under it.

The page column fills the space under the top bar and scrolls as one. It is centered and up to `max-w-360` wide, with
`p-5` around it. A board or a wide list table fills the full width beside the sidebar instead.

A sheet slides in from the right. It sits in from the window's edges by `right-4`, over a dimmed page. A sheet for rows
of amounts that add up, such as an opportunity's line items, is wider than other sheets. See
[Forms in Sheets](../patterns/forms-in-sheets.md) for that sheet.

### Above the regions

A dialog, a menu, a popover, and a toast float above the regions, and none of them is a region. A dialog asks for a
decision or a short input, such as "Delete Prospect?", and closes before people go on. A dialog opens over the page or
over the sheet that opened it. See [Dialog](../components/dialog.md) for where each kind of dialog sits.

Toasts sit at the top right of the screen.

### On a phone

On a phone, the regions change in six ways:

- The sidebar is hidden below the width [Screen Sizes](screen-sizes.md) gives. The button at the start of the top bar
  opens it as a 288px panel from the left.
- The top bar keeps the breadcrumb, cut to its last two crumbs.
- The page column fills the screen under the top bar, with `p-5` around it.
- A sheet fills the screen.
- A confirmation or a reason dialog stays in the middle, and its buttons stack with the action on top. A search or
  review dialog fills the screen.
- Toasts run across the top of the screen.

### Where each thing goes

Each kind of thing on a screen has one place. The table names that place and the page that holds the thing's rules.

| What | Where it goes | Rules |
|---|---|---|
| Moving between pages | The app's pages in the sidebar. The breadcrumb in the top bar links to the pages above this one. | [App Shell](../patterns/app-shell.md) |
| Search across the app | Search in the sidebar, or ⌘K from any page, which opens a dialog | [Global Search](../patterns/global-search.md) |
| Notifications | Notifications in the sidebar, after Search, which opens a panel beside the sidebar | [Notifications](../patterns/notifications.md) |
| The account and the theme | The account at the foot of the sidebar. Its menu holds Dark Theme or Light Theme, and Log Out. | [App Shell](../patterns/app-shell.md) |
| The page's title and facts | The page header, the first section of the page column | [Page Header](../patterns/page-header.md) |
| The page's actions | The end of the page header's title line, with outline buttons first and the primary action last | [Page Header](../patterns/page-header.md) |
| A record's actions | The end of the record's page header, with Edit first and Delete last. Delete appears again only as the action of its confirmation. | [Page Header](../patterns/page-header.md) |
| A small record's actions, such as an option's or a note's | Its sheet's footer, with Delete at the start and the save button at the end | [Forms in Sheets](../patterns/forms-in-sheets.md) |
| A list's actions | The right end of the list toolbar, after Sort, with the primary action last | [List Toolbar](../patterns/list-toolbar.md) |
| A list's search, filters, and sort | The list toolbar, with the search and the filters at its left end and Sort at its right end | [List Toolbar](../patterns/list-toolbar.md) |
| A list's count and pages | The footer under the list | [Paging](../patterns/paging.md) |
| Adding or editing a record | A form in a sheet | [Forms in Sheets](../patterns/forms-in-sheets.md) |
| Confirming a delete | A dialog over the page, or over the sheet that opened it | [Confirmations and Delete](../patterns/confirmations-and-delete.md) |
| A success, such as "Note added." | A toast at the top right of the screen, which closes on its own | [Saving and Feedback](saving-and-feedback.md) |
| An error on a field | With the field it names, in the form | [Message Templates](copy-templates.md) |
| An error that no field shows | Above the buttons of the form or dialog, which stays open. An error with nothing left on screen is a toast that stays until it is closed. | [Message Templates](copy-templates.md) |
| An empty list | An empty state in the list's place, holding Add. The list toolbar is gone. | [Empty States](empty-states.md) |

## Rules

### 1. Put content in the page column or a sheet

Content lives in the page column and in a sheet, so people find it in the same two places on every screen. The sidebar
and the top bar stay the same on every page.

- **Do:** Put a record's status in its page header.
- **Don't:** Put content in the sidebar or the top bar, such as a record's status in the top bar or a summary under the
  sidebar's pages.

### 2. Give each thing one place

Each thing goes where the table places it, so people find it in the same place in every app and never wonder which of
two places to use.

- **Do:** Put Add Prospect at the right end of the list toolbar.
- **Don't:** Offer one thing in two places, such as Add in the page header and again in the toolbar. A confirmation that
  repeats its action, such as Delete, is the same action, not a second place.

## In code

- The app shell is the scaffold, wired once in the app's layout ([App Shell](../patterns/app-shell.md)). `AppSidebar`
  is the sidebar, `AppHeader` is the top bar, and `AppContent` is the page column. A page renders into `AppContent`
  only. It never adds a fixed bar, a panel of its own, or a second scroll.
- The sheet is `FormSheet` with `SheetForm`, never a raw `Sheet`. Above the regions sit `ConfirmDialog`, the app's
  search `CommandDialog`, the notifications `Popover`, and toasts from `sonner` in the one `Toaster`.
- `<FullWidth />` in a page lets it fill the width beside the sidebar. A wider sheet is `FormSheet` with
  `className="data-[side=right]:sm:max-w-6xl"`.
- Below 768px, `AppSidebar` renders as a `Sheet` from the left, opened by the `SidebarToggle` that `AppHeader` shows
  there. Below 640px (`max-sm`), a right `SheetContent` fills the screen.
