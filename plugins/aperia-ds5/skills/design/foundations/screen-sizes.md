# Screen Sizes

Screen sizes are three ranges of window width, called phone, tablet, and desktop, that set how a screen lays itself
out. See [Sizes](sizes.md) for the size of each control, which stays the same at every width.

## When to use

Use this page to check a screen at phone width, or when something new has to work on a phone. The shared components
already change at these widths, so most screens need no phone work of their own.

Read it before giving a part its own phone layout. The part may already have one, listed under How it looks and
behaves.

## What is available

A screen has three sizes, set by the width of the browser window.

| Screen size | Window width | What changes |
|---|---|---|
| Phone | Narrower than 640px | The layout changes the most. Sheets fill the screen, and toolbars and buttons move onto rows of their own. |
| Tablet | 640px to 1023px | The desktop layout, with a record's actions folded into one More actions button. The sidebar shows only on a wide tablet. |
| Desktop | 1024px and wider | Every part shows its desktop layout, with a record's actions as buttons. |

Every "phone" on these pages means a window narrower than 640px.

Two widths decide a layout. The app shell and the shared components change by the window's width. The sections inside a
page, such as a row of tiles or a grid of cards, change by the page column's width. The page column is the window less
the sidebar and the space around the column, so an open sidebar can change a page's layout.

## How it looks and behaves

A screen keeps its regions at every size. Each region changes its width or its place, and nothing is dropped.

### Regions at each size

Each region of the scaffold changes as the window narrows. See [Scaffold](scaffold.md) for the regions themselves.

| Region | Phone | Tablet | Desktop |
|---|---|---|---|
| Sidebar | Hidden. The button at the start of the top bar opens it as a 288px panel from the left. | Hidden below 768px, as on a phone. From 768px, it shows at 256px or as a 48px rail. | 256px wide, or a 48px rail of icons |
| Top bar | 56px tall. The breadcrumb keeps its last two crumbs. | 56px tall, with the whole breadcrumb | 56px tall, with the whole breadcrumb |
| Page column | Fills the window under the top bar, with 20px around it | Fills the space beside the sidebar, or the whole window while the sidebar is hidden, with 20px around it | Centered and up to 1440px wide, with 20px around it |
| Sheet | Fills the screen, with square corners | 16px in from the window's edges, three quarters of the window wide, up to 576px for a form | 16px in from the window's edges, 576px wide for a form |
| Dialog | A confirmation or a dialog that asks for a reason sits in the middle, 320px wide and at least 16px from each side. A search or a review dialog fills the screen. | In the middle, up to 384px wide | In the middle, up to 384px wide |
| Toast | Across the top of the screen, 16px from each side | At the top right of the window | At the top right of the window |

See [Dialog](../components/dialog.md) for the kinds of dialog. See
[Saving and Feedback](saving-and-feedback.md) for the one stack of toasts.

### Parts on a phone

Each shared part has one phone layout, set by its component. The page in the Owner column holds each part's rules.

| Part | On a phone | Owner |
|---|---|---|
| Page header's buttons | They take a full-width row under the title, with the primary action first and every button the same width. | [Page Header](../patterns/page-header.md) |
| Record actions | They fold into one More actions (…) button on the title's line. This happens below 1024px, so tablets fold them too. | [Page Header](../patterns/page-header.md) |
| Page header's properties | They sit in two columns. | [Page Header](../patterns/page-header.md) |
| List toolbar | It takes up to three rows. The list's actions come first, then the search with Filter and Sort as icon buttons, then the filters that are on as chips. | [List Toolbar](../patterns/list-toolbar.md) |
| Filters | They are set in a sheet from the bottom, up to 85% of the screen's height. The chips sit on one line that scrolls sideways. | [Filters](../patterns/filters.md) |
| Sort | It is an icon button that shows a dot while the list is sorted. | [Sort](../patterns/sort.md) |
| Table | It keeps every column and scrolls sideways inside its box. | [Tables](../patterns/tables.md) |
| Pager | The pages move under the count when they do not fit beside it. Previous and Next show their arrows without words. | [Paging](../patterns/paging.md) |
| Row of tiles | The tiles sit two to a row until the page column is 768px wide. | [Cards and Tiles](../patterns/cards-and-tiles.md) |
| Grid of cards | The cards stack in one column until the page column is 960px wide. | [Cards and Tiles](../patterns/cards-and-tiles.md) |
| Card header | An action that does not fit beside the title drops under it, at the right. | [Card](../components/card.md) |
| Sheet's footer | A record's Delete takes a line of its own, above Cancel and the save button. | [Forms in Sheets](../patterns/forms-in-sheets.md) |
| Dialog's footer | The buttons stack, with the action on top. | [Dialog](../components/dialog.md) |
| Text typed in a field | It is 16px below 768px and 14px from 768px, so a phone never zooms into the field. | [Typography](../styles/typography.md) |

### What stays the same

A phone changes where parts sit, never the size of a control. Buttons, fields, and icon buttons keep their heights at
every width. See [Sizes](sizes.md) for those heights.

The page still scrolls as one, up and down. Only a wide table, or the line of filter chips, scrolls sideways inside its
own box.

### Adapting something new

A new part goes through five steps before it ships:

1. Build it from the shared components. They already change at these widths, so most new parts need nothing more.
2. Check the screen at 390px wide for a phone, then at 640px and at 1024px, where layouts change.
3. Lay out its sections by the page column's width, at the same steps as tiles and cards, 768px and 960px.
4. Move whatever does not fit to its phone place. Actions go into a More actions menu, controls go into a sheet, and a
   wide table goes into a box that scrolls sideways.
5. Check that every control keeps its size and that the page never scrolls sideways.

## Rules

### Move a part on a phone, never drop it

- **Do:** Move a part that does not fit (record actions into More actions, filters into the Filter sheet), so a phone
  user can do every task.
- **Don't:** Hide an action or a filter on a phone with nothing in its place. Move it into a menu or a sheet, so no task
  needs a desktop.

### Keep the page from scrolling sideways

- **Do:** Let only a wide table or a line of chips scroll sideways, inside its own box, so the page moves only up and
  down.
- **Don't:** Let a wide table, a fixed width, or a long unbroken word push the page past the screen's edge. Put the
  table in a box that scrolls and let text wrap, so the page never moves sideways.

### Lay out a page by its column's width

- **Do:** Change a page's sections by the page column's width (tiles two to a row until the column is 768px wide), so
  a page fits beside an open sidebar.
- **Don't:** Change a page's sections by the window's width. Use the column's width, so an open sidebar never squeezes
  four tiles into a narrow column.

## When you can do it differently

A grid of switches too wide for a phone, such as roles and their permissions, can show one column at a time instead
of scrolling sideways. A select above the table picks the column.

## Works with

- See [Sizes](sizes.md) for the control sizes that stay the same on a phone.
- See [Scaffold](scaffold.md) for the regions and where each kind of thing goes.
- See [Page Layout](page-layout.md) for the sections inside the page column.
- See [App Shell](../patterns/app-shell.md) for the sidebar's panel and the top bar.
- See [List Toolbar](../patterns/list-toolbar.md) and [Filters](../patterns/filters.md) for a list on a phone.

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
  `grid grid-cols-2 gap-4 @min-[48rem]:grid-cols-4`; a side column or two cards side by side start at `@min-[60rem]`.
- Check a screen at 390px wide. `Devices` in `docs/design-language/examples/before-after.tsx` shows a story at 1280px
  and 390px, each in its own window, since the components follow the window and not a frame.
