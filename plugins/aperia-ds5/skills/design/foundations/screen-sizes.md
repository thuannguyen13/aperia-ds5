# Screen Sizes

Screen sizes set where each part of a screen goes at phone, tablet, and desktop widths, so every task works on every device. See [Sizes](sizes.md) for the size of each control, which stays the same at every width.

## What is available

A screen has three sizes, set by the width of the browser window.

| Screen size | Window width | What changes |
|---|---|---|
| Phone | Narrower than `--breakpoint-sm` | The layout changes the most. Sheets fill the screen, and toolbars and buttons move onto rows of their own. |
| Tablet | From `--breakpoint-sm` up to `--breakpoint-lg` | The desktop layout, with a record's actions folded into one More actions button. The sidebar shows only on a wide tablet. |
| Desktop | `--breakpoint-lg` and wider | Every part shows its desktop layout, with a record's actions as buttons. |

Every "phone" on these pages means a window narrower than `--breakpoint-sm`.

Two widths decide a layout. The app shell and the shared components change by the window's width. The sections inside a page, such as a row of tiles or a grid of cards, change by the page column's width. The page column is the window less the sidebar and the space around the column, so an open sidebar can change a page's layout.

## How it looks and behaves

A screen keeps its regions at every size. Each region changes its width or its place, and nothing is dropped.

The shared components already carry these layouts, so most screens need no phone work of their own. A part may already have a phone layout, listed in the tables below, before it needs one of its own.

### Regions at each size

Each region of the scaffold changes as the window narrows. See [Scaffold](scaffold.md) for the regions themselves.

| Region | Phone | Tablet | Desktop |
|---|---|---|---|
| Sidebar | Hidden. The button at the start of the top bar opens it as a 288px panel from the left. | Hidden below `--breakpoint-md`, as on a phone. From `--breakpoint-md`, it shows at `--sidebar-width` or as a rail of `--sidebar-width-icon`. | `--sidebar-width` wide, or a rail of icons `--sidebar-width-icon` wide |
| Top bar | `h-14` tall. The breadcrumb keeps its last two crumbs. | `h-14` tall, with the whole breadcrumb | `h-14` tall, with the whole breadcrumb |
| Page column | Fills the window under the top bar, with `p-5` around it | Fills the space beside the sidebar, or the whole window while the sidebar is hidden, with `p-5` around it | Centered and up to `max-w-360` wide, with `p-5` around it |
| Sheet | Fills the screen, with square corners | In from the window's edges by `right-4`, three quarters of the window wide, up to `max-w-xl` for a form | In from the window's edges by `right-4`, `max-w-xl` wide for a form |
| Dialog | A confirmation or a dialog that asks for a reason sits in the middle, `max-w-xs` wide and at least `1rem` from each side. A search or a review dialog fills the screen. | In the middle, up to `max-w-sm` wide | In the middle, up to `max-w-sm` wide |
| Toast | Across the top of the screen, `1rem` from each side | At the top right of the window | At the top right of the window |

See [Dialog](../components/dialog.md) for the kinds of dialog. See [Saving and Feedback](saving-and-feedback.md) for the one stack of toasts.

### Parts on a phone

Each shared part has one phone layout, set by its component, so a screen adds none. The page in the Owner column holds each part's rules.

| Part | On a phone | Owner |
|---|---|---|
| Page header's buttons | They take a full-width row under the title, with the primary action first and every button the same width. | [Page Header](../patterns/page-header.md) |
| Record actions | They fold into one More actions (…) button on the title's line. This happens below `--breakpoint-lg`, so tablets fold them too. | [Page Header](../patterns/page-header.md) |
| Page header's properties | They sit in two columns. | [Page Header](../patterns/page-header.md) |
| List toolbar | It takes up to three rows. The list's actions come first, then the search with Filter and Sort as icon buttons, then the filters that are on as chips. | [List Toolbar](../patterns/list-toolbar.md) |
| Filters | They are set in a sheet from the bottom, up to 85% of the screen's height. The chips sit on one line that scrolls sideways. | [Filters](../patterns/filters.md) |
| Sort | It is an icon button that shows a dot while the list is sorted. | [Sort](../patterns/sort.md) |
| Table | It keeps every column and scrolls sideways inside its box. | [Tables](../patterns/tables.md) |
| Grid of switches | A grid too wide for the screen, such as roles and their permissions, scrolls sideways inside its card. It can instead show one column at a time, with a select above the table that picks the column. | [Switches in a Grid](../patterns/switches-in-a-grid.md) |
| Pager | The pages move under the count when they do not fit beside it. Previous and Next show their arrows without words. | [Paging](../patterns/paging.md) |
| Row of tiles | The tiles sit two to a row until the page column is `@min-page-md` wide. | [Cards and Tiles](../patterns/cards-and-tiles.md) |
| Grid of cards | The cards stack in one column until the page column is `@min-page-lg` wide. | [Cards and Tiles](../patterns/cards-and-tiles.md) |
| Card header | An action that does not fit beside the title drops under it, at the right. | [Card](../components/card.md) |
| Sheet's footer | A record's Delete takes a line of its own, above Cancel and the save button. | [Forms in Sheets](../patterns/forms-in-sheets.md) |
| Dialog's footer | The buttons stack, with the action on top. | [Dialog](../components/dialog.md) |
| Text typed in a field | It is `text-base` below `--breakpoint-md` and `text-sm` from `--breakpoint-md`, so a phone never zooms into the field. | [Typography](../styles/typography.md) |

### What stays the same

A phone changes where parts sit, never the size of a control. Buttons, fields, and icon buttons keep their heights at every width. See [Sizes](sizes.md) for those heights.

The page still scrolls as one, up and down. Only a wide table, or the line of filter chips, scrolls sideways inside its own box.

### Adapting something new

A new part goes through five steps before it ships:

1. Build it from the shared components. They already change at these widths, so most new parts need nothing more.
2. Check the screen in a window `390px` wide for a phone, then at `--breakpoint-sm` and at `--breakpoint-lg`, where layouts change.
3. Lay out its sections by the page column's width, at the same steps as tiles and cards, `@min-page-md` and `@min-page-lg`.
4. Move whatever does not fit to its phone place. Actions go into a More actions menu, controls go into a sheet, and a wide table goes into a box that scrolls sideways.
5. Check that every control keeps its size and that the page never scrolls sideways.

## Rules

### 1. Move a part on a phone, never drop it

A part that does not fit on a phone moves to a place that fits, so a phone user can do every task.

- **Do:** Fold record actions into More actions, and put filters in the Filter sheet.
- **Don't:** Hide an action or a filter on a phone with nothing in its place, which leaves a task that needs a desktop.

### 2. Keep the page from scrolling sideways

Only a wide table or a line of chips scrolls sideways, inside its own box, so the page moves only up and down.

- **Do:** Put a wide table in a box that scrolls, and let long text wrap.
- **Don't:** Let a fixed width or a long unbroken word push the page past the screen's edge.

### 3. Lay out a page by its column's width

A page's sections change by the page column's width, so a page fits beside an open sidebar.

- **Do:** Show four tiles in a row once the column is `@min-page-md` wide, and two to a row below that.
- **Don't:** Change a page's sections by the window's width, which squeezes four tiles into a narrow column when the sidebar is open.

## In code

- The widths are Tailwind's breakpoints. `sm` (640px) starts the tablet, and `lg` (1024px) starts the desktop. A
  phone-only class is `max-sm:`. `md` (768px) is where `useIsMobile` (`hooks/use-mobile.ts`) turns `Sidebar` into a
  `Sheet` from the left (`SIDEBAR_WIDTH_MOBILE`, 18rem), and where `Input` and `Textarea` go from `text-base` to
  `md:text-sm`.
- The components carry their phone layouts, so a page adds none. `AppHeader` hides all crumbs but the last two
  (`max-sm:hidden`) and shows `SidebarToggle` below `md`. `PageHeader` puts `actions` on their own row
  (`max-sm:basis-full max-sm:flex-row-reverse max-sm:*:flex-1`) and `properties` in `grid-cols-2`. `RecordActions`
  renders buttons at `lg` and a More actions `DropdownMenu` below it.
- `ListToolbar` renders the wide row (`max-sm:hidden`) and the phone rows (`sm:hidden`) both, so a control passed in
  renders twice and keeps its state with the list. Its Filter sheet is `SheetContent side="bottom"` with
  `max-h-[85dvh]`.
- `SheetContent side="right"` fills the screen below `sm` (`max-sm:inset-0`). `SheetForm` is `sm:max-w-xl` and puts its
  `start` on its own line (`max-sm:basis-full`). `DialogContent` is `max-w-[calc(100%-2rem)] sm:max-w-sm`;
  `AlertDialogContent`, which `ConfirmDialog` uses, is `max-w-xs sm:max-w-sm`. Both footers are
  `flex-col-reverse sm:flex-row`.
- `Table` scrolls inside its container (`overflow-x-auto`); a table on the page or in a card uses the scroll table
  recipe on [Tables](../patterns/tables.md). `PaginationPrevious` and `PaginationNext` hide their words below `sm`,
  and `ListPager` wraps the pages under the count.
- `Toaster` (`sonner`) takes `position="top-right"` once, at the app's root. It spans the screen below its own 600px
  breakpoint, 16px from each side.
- Page sections use container queries on `AppContent`'s column, never `md:` or `lg:`. Tiles are
  `grid grid-cols-2 gap-4 @min-page-md:grid-cols-4`; a side column or two cards side by side start at `@min-page-lg`.
- Check a screen at 390px wide. `Devices` in `docs/design-language/examples/before-after.tsx` shows a story at 1280px
  and 390px, each in its own window, since the components follow the window and not a frame.
