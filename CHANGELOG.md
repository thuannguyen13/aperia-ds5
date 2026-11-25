# Changelog

## 0.3.0 (release candidate: rc.2)

The shared Aperia look moves into the library, from Sales Portal's `globals.css`, and matches the Figma library
"Aperia Shadcn Library (Enhanced)". An app now sets only its status and chart colors.

### Upgrade an app

1. `npm install aperia-ds5@0.3.0`.
2. In `globals.css`, keep `@import "tailwindcss"`, `@import "aperia-ds5/base.css"` and the `@source` line. Delete every
   override of a shared token and every `[data-slot=…]` rule the library now covers (below). Keep only the app's status and chart colors:
   copy `plugins/aperia-ds5/skills/design/assets/brand.example.css`.
3. Run `npx aperia-ds5 init` in the app and commit what it writes: it enables the `aperia-ds5:design` skill for Claude
   Code, adds the lines to `CLAUDE.md` and `AGENTS.md`, and removes rc.1's `.claude/skills/aperia-app-design` link. Each
   teammate installs the plugin once: README, Agent skill.
4. Compare the app before and after in Light, Dark and at phone width.

### Breaking since rc.2: DataTable is a list

`DataTable` is now built from the list's own parts: `ListToolbar` (through the new `DataTableToolbar`), `Table`, and
`ListPager`. Its toolbar is the one every list has: the search and the filters on the left; the slot with the Columns
menu, Sort, and the list's actions on the right. Column headings no longer sort; Sort does.

Migrate a table:

1. Write each heading as plain text: `header: "Merchant"`. `DataTableColumnHeader` still renders, as plain text, and is
   deprecated.
2. Move sorting to Sort: `sort={[{ value: "volume", label: "Volume", starts: "desc" }]}`, each `value` a column's id.
3. Replace `filterColumn` and `filterPlaceholder` with `search={{ placeholder: "Search merchants" }}`, which looks in
   every column, or `search={{ placeholder, column: "email" }}` for one column. The old props still work, deprecated.
4. Add filters with `filters={{ fields }}` (`FilterField`, each `id` a column's id; `form: "simple"` for fixed
   controls). They are stored in TanStack's `columnFilters` as `{ type, rules }`.
5. Put the list's buttons in `actions` and any other control in `children` (the toolbar's slot, before the Columns
   menu). `columnsMenu={false}` hides the Columns menu.
6. A hand-built table puts `DataTableToolbar` where its own toolbar was, in place of `DataTableFilter` (deprecated) and
   `DataTableViewOptions`, which now sits in the toolbar's slot. A table on TanStack's `useTable` that filters its own
   rows passes `defaultColumn: dataTableDefaultColumn<Row>()`.

### Changed

- **SheetForm** `ready` is deprecated. A save button stays enabled and the form is checked on save, so pressing it
  shows what is missing (Errors and Validation). `ready={false}` still disables the button.
- **Tokens** (`base.css`): Sales Portal's values. Page `oklch(0.975 0.002 286)`, cards white, darker muted and muted
  text (`#66666e`), destructive `#c10007` / `#ff8a8c`, accent equals muted, Dark surfaces on hue 286.
- **Primary** is `#0058cc` in both modes, white text. The Light sidebar is the navy `#002f67`, set on `--sidebar` itself.
- **One sidebar, shadcn's tokens** (rc.2): there's no `--brand` token any more. `--sidebar` and
  `--sidebar-primary-foreground` hold the navy themselves, and in Light `--sidebar-accent`, `--sidebar-border` and
  `--sidebar-ring` are white at 8%, 15% and 60% over it. Every app has the same sidebar: delete `--brand` and any
  `--sidebar-*` from the app's CSS (Titan's `#002454` goes). On the navy the steps shift slightly (hover `#0d3f7f` →
  `#144073`).
- `--border` and `--input` are foreground at 12% and 16% mixed with `transparent`, so they composite the same on every
  surface. Every border and divider is 0.5px (`--default-border-width`).
- **Shadows**: `shadow-sm` is two soft shadows that deepen in Dark; `md`, `lg` and `xl` include it.
- **Controls** (input, textarea, select, native select, input group, combobox chips, checkbox, radio, outline button,
  outline toggle, OTP slot, active tab, attachment): `control` fill (white in Light), 0.5px `input` edge, `shadow-sm`. No transparent
  border: focus and invalid are a 1px inner ring plus the 3px halo, so text no longer shifts. 40px tall below 640px.
- **Attachment** (rc.2): the control recipe instead of a 0.5px border on `card`. Idle draws a dashed outline with no
  shadow; error turns the edge destructive; focus is the control's inner ring plus halo.
- **Titled card recipe** (skill, rc.2): each part owns its space. The card has no gap or vertical padding; the
  header is 56px (12px around its 2rem row), a table follows it directly, and padded content brings its own
  (`<CardContent className="pb-4">`). A collapsed card is just its header, with no padding added back. An app with a
  copy re-copies it, drops `className="pb-0"` / `"pb-3"` from its cards, and moves padding onto the content.
- **Avatar** (rc.2), from Sales Portal's `EntityAvatar`:
  - `shape="square"` for companies, products and teams (default `circle`, so existing avatars don't change). The root
    owns the radius (`rounded-lg`, `md` at `sm`, `sm` at `xs`) and the inner line, image and fallback inherit it. Drop
    any `rounded-*` classes that squared one by hand.
  - Sizes `xs` (20px) and `xl` (48px), matching the Figma Avatar; Code Connect maps every size one-to-one and renders
    `shape` from Figma's `Shape` property.
  - `AvatarImage` is a plain `img` over the fallback: the initials show at once, the picture fades in once loaded and
    the initials go, and a picture that fails leaves them. Give a logo `className="bg-white object-contain"`.
  - `colors={{ fill, text }}` colors the fallback inline (the app picks them, for example by record id); `empty` draws
    a dashed outline for no one.
  - **Behavior change:** an avatar is hidden from screen readers unless it has `label`, which makes it `role="img"`
    with that name. One beside its name needs nothing; one standing alone needs `label` (an `alt` on `AvatarImage` no
    longer names it).
- **Disabled fields**: Light keeps full opacity with a 4% foreground fill and muted text; Dark fades to 50%.
- **Card**: 0.5px edge plus `shadow-sm`; title semibold.
- **Panels**: dialogs, alert dialogs, sheets and drawers use `background`, a 0.5px edge and `shadow-lg`. One overlay,
  black 10% / 50%, no blur. They open over 220ms and close over 150ms; dialogs scale from 97%; reduced motion only fades.
- **Sheet** (right side): floats 16px from the window, `rounded-xl`, 56px header, full screen below 640px. Its header and footer keep their height when the content scrolls.
- **Menus and popovers**: 0.5px `border` edge instead of `ring-foreground/10`.
- **Switch** thumb is white in both modes with the control edge.
- **Outline badge** has the control fill. **Ghost button** hovers with a 5% (Dark 10%) tint of the text color.
- **Choice cards** (`FieldLabel` around a `Field`): control fill and edge; checked mixes 5% primary into the fill and 30%
  into the edge (Dark 10% and 20%).
- Separators are 0.5px. Avatars draw a 10% inner line instead of a blended border. Table header rows don't hover.
  Command items use `rounded-md`. Chart tooltips sit on `card`.
- Pointer cursor on everything clickable, including menu items and options. Number fields have no spin arrows.

### Added

- **Errors and Validation** (docs, Foundations › States): where each error shows, when a form is checked, the words
  of every field and form error, preventing errors in the control, and trimming spaces.
- Tokens `--control`, `--overlay`, `--ghost-hover`, `--shadow-color`, `--shadow-depth`, `--shadow-base`,
  `--panel-in`, `--panel-out`, `--rail-duration`, `--rail-ease`; utilities `bg-control`, `bg-overlay`.
- Utilities `surface` and `control` for app markup.
- `aperia-ds5:design`, the design language for coding agents. From rc.2 it's the `design` skill of the `aperia-ds5`
  Claude Code plugin in this repo's marketplace (`.claude-plugin/marketplace.json`, `plugins/aperia-ds5`), updated by
  merging to `main` with no library release; the npm package keeps a copy under `plugins/` for Codex and Cursor. rc.1
  shipped it as `skills/aperia-app-design`, linked into `.claude/skills/`.
- **App shell** (rc.2), ported from Sales Portal, so no app's agent rebuilds it: `AppSidebar` (brand, `AppSidebarSearch`
  with ⌘K, pages, `AppSidebarNotifications`, account menu), `AppHeader` (sidebar toggle and breadcrumb only),
  `PageHeader` (title that fills the last crumb, subtitle, actions, `properties`), `PageCrumb`, `PageProperty`,
  `RecordActions` (header buttons that fold into More actions below lg) and `BlockedMenuItem`. Routes, the router's
  `link` and the user come in as props; nothing imports Next.js. Stories: UI/App Shell.
- **One structure for every app** (rc.2): every Aperia app has the same sidebar and primary; an app sets only its
  status and chart colors. `brand.example.css` holds just those.
- **Patterns every app has ship in aperia-ds5; the rest are recipes.** The library ships building components and
  only the patterns every app needs, ported from Sales Portal. Anything an app can put together from plain components
  is a recipe on its design page instead (the card header, stat tile, people stack, history timeline, detail rows,
  empty value, money value, scroll table, group row, flag switch, icon button, form section, length count, a list
  page's loading shape, and the ⌘K search dialog). Apps build those themselves from the page's recipe.
  - Lists: `ListToolbar`, a list's one toolbar (scope slot, search, filters, count, Sort). Filters use one model
    (`FilterField`, `FilterRule`, `filterRows`) in two forms. Advanced filters are a Filter button that counts the filters on and opens
    them in a popover as rows of Column, Operator and Value (the default; a row's column changes in place, one column
    can hold several filters, and Add Filter adds empty rows at any time), with Add Filter and Remove All always
    shown. Simple filters (`form: "simple"`) are fixed controls, one click to pick, for a list with four filters or
    fewer, each a pick-list, yes or no, or a date. On a phone they become a Filters button with a sheet and clearable chips.
    `NoResults` ships beside it. `SortControl` with `sortRows` and `UNSORTED` (one Sort per list; empty values sort
    lowest; `size="sm"` in a card's header, before Add). `DayRangeFields`. The pure sort and filter helpers are also in
    `aperia-ds5/list` for server pages.
  - `EmptyState`, which the skill used to have apps copy in from `assets/components` (gone).
  - `ReasonTooltip` (why something cannot be used), `useFieldNote` and `describedBy`.
  - Drag and drop: `SortableList` and `SortableRow` (adds `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`),
    `FileDrop`, `FilePicker` (built on `Attachment`) with `fileSize` and `fileRefusal`, `ImagePicker` and
    `ImagePreview`.
  - `aperia-ds5/format`: `formatDate` (09/22/2026), `formatMoment` (with the zone), `ago` ("3d ago"),
    `dayRangeLabel`, `money`, `percent`, `plural`, `listed`, `initials` and day helpers, in Dallas time by default.
    `RelativeTime` ("3d ago", the full date on hover).
  - Sheets and confirms: `FormSheet` and `SheetForm` (errors beside their fields, a save spinner, Discard Changes?
    before closing a typed form), `useSheetForm`, `useSheet`, `combineForms`, `SheetDelete` (its own confirm, a reason
    when it cannot delete), `ConfirmDialog` (named by its action, returns focus), and the focus helpers
    `returnFocus`, `useReturnFocus`, `OpenerReturnsFocus`, `keepScroll`, `useEscapeClosesList`.
  - Inputs and pickers: `MoneyInput` and `MoneyField`, `EntityPicker` (records with their `Avatar`, search, reasons,
    Add from inside the picker), `PickField`, `DraftField`, `AddOption`, `draftKey`, and `useAdded`, `useAdding`,
    `useRefusedDraft` so one record form works on its page and from a picker.
- **UI copy follows the UI Style Guide V4.3** (rc.2): no contractions in UI text (`IN_USE_DELETE` reads "This item is
  in use and cannot be deleted."), `money()` writes a negative in parentheses ("($125.50)") and shows cents only when the amount has
  them ("$1,250", "$12.50"; `cents: true` or `false` forces one form, and `MoneyValue` follows it), and `listed()` uses
  the serial comma ("Acme, Globex, and Initech"). The design skill's Foundations › Copy page is now the one source for UI copy.
- `AppContent` and `FullWidth` (rc.2), from Sales Portal's layout: the page's scroll and column inside `AppHeader`, 20px
  around it, centered up to 1440px, 20px between the page's sections; `<FullWidth />` lets a board fill the pane. The
  skill gains DS4's spacing system (Foundations, Spacing). Found in the blind test, where agents copied the README's
  bare `p-5` wrapper and stacked the title, search and table with no space.
- Skill (rc.2), from the blind test: content in a card starts on the title's line, a part with its own padding takes
  an equal negative margin to stay on it (`<Item className="-mx-3">`), and indents only show hierarchy.
- `opensOnClick` and `openable` (rc.2): props that make a `TableRow` open its record; `[data-opens]` gets the pointer.
- Skill (rc.2): the shell components replace the shell prose; rules against internal labels (MVP, Demo Data), color
  as the only signal, Show / Hide buttons (the titled card collapses by its title) and a line between a card's header and its
  table; a screenshot review in `SKILL.md`.
- **Design language docs** (rc.2), written for designers, POs and PMs first and agents second, and the one source of
  truth: the skill's pages are what Storybook's Design Language section shows and what agents read.
  - **Foundations:** Color (with what an app can change, replacing Brand Slots), Typography, Spacing, Border and Radius,
    Elevation, Motion, Sizes, Icons, Copy and Message Templates (the one source for UI copy, built on the UI Style
    Guide V4.3). Values are shown live from `base.css`, never copied into the text.
  - **Patterns:** one page each for how things fit and behave: App Shell, Page Layout, Page Header, List Page, Filters,
    Sort, Tables, Loading, Empty and Missing, Record Page, Forms in Sheets, Confirmations and Delete, Pickers, Disabled
    With a Reason, Money and Numbers, Files and Images, Reordering, Switches in a Grid, Buttons and Actions (replacing
    Button Best Practices), Cards and Tiles, People and Pictures, Search, Notifications.
  - **Components:** Button, Card, Dialog, Empty State, Table.
  - **Examples:** screens apps build from the patterns, each with a before / after: List Page, Record Page,
    Status Change With a Reason, Notes, Board, Line Items, Import, Date Range, Task Checklist, Roles and Permissions,
    Option List, Audit Log, Funnel Chart, Global Search and Notifications.
  - Every page: what it is, when to use it, what's available, how it looks and behaves, rules as Do / Don't, when you
    can do it differently, works with, then In code. The old references, Brand Slots, Drifts and Best Practices pages
    are gone; their rules moved to these pages, and each mistake is a Don't on its page.
- Controls keep one size on every screen: the default is 32px and an icon button 28px, on a phone too. The phone-only
  40px heights are gone from `Button`, `Input`, `InputGroup`, `SelectTrigger`, the icon button recipe, `RecordActions`
  and the top bar's sidebar button. A phone changes a page's layout, not a control's size.
- `ListToolbar` holds only the list's own controls: the search and filters on the left; then Sort and `actions` (the list's buttons, such as Import and Add Prospect, primary last) on the right.
  **Breaking:** `start` is gone, and `children` is now a slot before Sort for a control only one app needs, such as a
  board's Board / Table switch. A control that picks the list's scope, such as a report date or a saved
  view, is the app's own, outside the toolbar; a list's Add moves from `PageHeader`'s `actions` to the toolbar's
  `actions`. The toolbar shows no count; `shown`, `total` and `noun` now feed the phone's Filter sheet only.
- `ItemGroup`: plain items (the default variant) sit flush, spaced by their own padding, so a list of people or records
  reads as one list; outline and muted items keep a 10px gap. An app that set `gap-0` on a plain group can drop it.
- Docs: Shape and Edges is now Border and Radius (`styles/border-and-radius.md`).
- Docs: Empty and Missing and Empty State are now one page, Empty States (Foundations › States), by case: a missing
  value, an empty container (card, list, or page), and no matches. The empty state's specs are on its Code tab.
- Docs: a load failure's empty state is titled "Failed to Load", with no item name and no line; its action is Try
  Again, or a way home.
- Docs: decision tables for the choices people get wrong: a sheet, a dialog, or a page of its own (Forms in Sheets);
  simple or advanced filters (Filters); a toast, an alert, or a message on the field (Message Templates); a table on the
  page, a table in a card, or a list (Tables).
- Docs: Scaffold (Foundations › Layout) names the screen's regions (the sidebar, the top bar, the page column, and a
  sheet) and holds the "Where each thing goes" table, one place and one owner page for each kind of thing on a screen.
- Docs: Dashboard and Settings Page join List Page and Record Page as the four standard screens in Examples, each shown
  in the app shell at desktop and phone width side by side.
- Docs: every page has one structure (after rc.2). Anatomy comes first, under the lead, on every component and pattern
  page and on a Foundations or Styles page whose subject has parts (35 pages): a live drawing of the real component in
  its place on a screen, a panel or a menu drawn open, with a numbered marker on each part and a list that says what
  kind of thing each part is. When to use and What is available show only where a page has something to say there.
  "When you can do it differently" and "Works with" are gone: an exception sits with the behavior or the rule it
  changes, and a link in the sentence that needs it.
- Docs: rules are numbered and cited by page and number, such as "Sort 2" (after rc.2). Each rule is a statement with
  its reason, with a Do and a Don't only where they add a concrete case. A rule that repeated another page's rule is
  removed, and that page links to the owner.
- Docs: every live example has a caption that says what it shows, and every page shows the Overview, Guidelines and
  Code tabs (after rc.2).
- Docs: a token named in a sentence is a small chip with the token's name and a mark of its kind; its value shows on
  hover (after rc.2). A color keeps a live swatch.
- Docs: live States (default, hover, focus, pressed, disabled) on Button, Card, Dialog and Table.
- Docs: every component's home lists the pages that use it (Used in), generated from the pages' In code sections and
  live examples.
- `npm run check:docs` checks the design skill's pages for structure, rules, live examples, writing-standard slips,
  repeated rules and broken links. It fails on a rule with no number or no statement, and on a retired section.
- Docs: Typography shows the whole type scale and the four weights, measured live, then the step and weight each role
  in an Aperia app uses.
- `SortControl` is one button that opens a panel: "Default order" and the fields as a list of choices, then Ascending
  and Descending once a field is picked. The button reads "Sort", or "Sort: \<field\>" with an arrow for the direction.
  The separate direction arrow is gone, and `iconOnly` draws it as an icon with a dot while sorted, which
  `ListToolbar` uses on a phone in place of its own sort menu.
- `PopoverContent` and `HoverCardContent` pad and space their content at 12px, on the 4px grid (shadcn's default was
  10px). The Insets table on Spacing lists every container's inset: the page 20px, a card, sheet or dialog 16px, a small
  card, popover or hover card 12px.
- Spacing: controls in a row are spaced box to box, and an icon button at a row's end lets its padding reach past the
  edge so its icon lines up. The filter popover follows both.
- Docs, new pages:
  - Screen Sizes (Foundations › Layout): the phone, tablet and desktop widths, what each region and shared part does at
    each, and a path for adapting something new. Every pattern page now says what it does on a phone.
  - Surfaces and Layers (Styles, first): which fill each part sits on (page, surface, control, panel), how parts group
    (a line between groups runs edge to edge; a line stopped at the inset is only for rows of a list), how one element
    leads, the row states, and five steps for styling something no page shows.
  - Saving and Feedback (Foundations › States): what saves at once and what waits for its button, the working state,
    what confirms a save, Undo, and what a closing sheet does with typed input.
  - Disabled With a Reason now says when to leave an action out (a role can never take it), disable it with its reason,
    or show a record read-only.
- Docs: new pattern pages Selecting Rows (Lists), and Charts, Status and Banner Alerts (Content), with live examples,
  and two recipes, the selection bar and the status dot. The chart rules moved from Dashboard and Funnel Chart to
  Charts, and "Use status color only for state" moved from Color to Status.
- Docs: the Search pattern is now Global Search, so it is not confused with a list's own search in its toolbar; the
  example is now Global Search and Notifications.
- New `ListPager`: the footer under a list, with its count ("6 merchants", or "26–50 of 312 merchants") and, once the
  rows run past one page (25 rows, `PAGE_SIZE`), Previous, the page numbers ("1 … 6 7 8 … 13") and Next, built from
  `Pagination`. `pageRows` and `pageCount` in `aperia-ds5/list` cut
  the rows on the server or the client. `DataTable`'s footer is now `ListPager` (pass its `noun`), replacing shadcn's
  "0 of 6 row(s) selected." text. New pattern page: Paging.
- Docs: the Saved Views example and the report date are removed, as one app's needs rather than shared guidance; Date
  Range covers a dashboard's range and a list's days filter. Toolbar buttons no longer carry a muted label inside them.
- `ListToolbar` on a phone: the list's actions first, then one row of the search with Filter and Sort as icon buttons
  (Sort opens a menu), and under it the filters that are on as chips on one line that scrolls sideways. The Filter sheet opens on one line
  per filter, a tap opens that filter alone (its ways to compare as toggles, then its value), Add Filter picks a column
  first, and the header holds the count, Clear All, and the close button. A filter's row ends with × to remove it.
- From the 0.3.0 blind test (five fresh agents, one brief each, on Next.js 16):
  - `RelativeTime` reads the clock only in the browser, so it works in a server component and a prerendered page with no
    `Suspense` (Next.js 16 refused a clock read during prerender and failed the build). An unseen stand-in holds its
    place until then, and it now stays current while the page is open. `ago()` takes an optional time to count from.
  - `icon` on `EmptyState`, the sidebar's items, `AppSidebarNotifications` and `RecordActions` also takes an element
    (`icon={<InboxIcon />}`), which a server component can pass; a component (`icon={InboxIcon}`) still works. New type
    `IconProp`.
  - `SheetForm`'s `also` messages may leave a field out (`draft.email ? { email: "…" } : {}` now type-checks).
  - The skill's screenshot review says how to take the screenshots (headless Chrome, Dark through the system setting)
    and, when no browser can run, to say the review did not run and hand its checks to the user.
- **Docs in six sections** (0.3.0): Get Started, Foundations, Styles, Components, Patterns and
  Examples, each opening on an index of cards built from the pages' leads. Foundations now holds the rules across every
  screen (Accessibility, new; Layout; Content Design; States, with Loading, Empty and Missing, and Disabled With a
  Reason moved from Patterns), and Styles holds the visual values (Color, Typography, Border and Radius, Elevation,
  Motion, Icons). Every component has one home under Components, grouped by purpose: its guidance, live examples and
  props on one page. Pages show their sections in Overview, Guidelines and Code tabs, with an "On this page" for the tab
  in view. Get Started adds For Designers, For Developers and What's New. The skill's folders follow the same sections
  (`styles/` is new, and five pages moved), so links to a moved page's old path need updating. Story titles moved from
  "UI/" to `Components/<Group>/`, which changes their Storybook links. The Components index lists building blocks only:
  each pattern's components (ListToolbar, SortControl, SortableList, SheetForm, SheetDelete, ConfirmDialog, the pickers,
  the file pickers, MoneyInput, RelativeTime, ReasonTooltip, FieldNote, EmptyState) are on that pattern's page, in its
  Code tab, and Empty State's guidance sits in Foundations beside Empty and Missing. Patterns are UI patterns only: the
  List Page and Record Page patterns are gone (whole pages stay as Examples), and their content moved to List Toolbar,
  Details and History (new) and Cards and Tiles (the page of cards).
- Skill (rc.2), from Sales Portal's blind test: a missing value is an em dash (—), not `-` (UI Style Guide V4.3,
  p.11); phone numbers, emails and websites read as plain text in the body color, links only where tapping does
  something (`tel:`, `mailto:`, the website), underlined on hover.
- `npx aperia-ds5 init` (rc.2): sets an app up for coding agents (plugin settings, `CLAUDE.md`, `AGENTS.md`), adding only
  what is missing. The package description, README and type definitions tell agents to run it and read the skill.
- Storybook renders in Inter, the font Aperia apps set through `--font-sans`, instead of Storybook's own Nunito Sans
  (rc.2).
- **Font** (after rc.2): `--font-sans` defaults to Inter (`"Inter Variable", Inter`), then the system sans serif, and
  `body` uses it. The library loads no font file: an app that wants Inter loads it, through `next/font/google` with
  `variable: "--font-sans"` on `<html>`, or `@fontsource-variable/inter` imported once. An app's own `--font-sans`
  still wins. The old `--font-sans: var(--font-sans)` referred to itself, so an app that set nothing got the system
  font, never Inter.
- **Link color and focus line in Dark** (after rc.2): new token `--link` (`text-link`), primary in Light and
  `oklch(0.74 0.13 259.33)` (#78ABFC) in Dark, at least 4.5:1 on Dark's background, card, control, popover and muted.
  The Link button and badge variants and the hover color of links in Field, Item and Empty use it. Dark `--ring` is
  `oklch(0.65 0.16 259.33)` (#508DEF), at least 3:1 on the same fills. Primary stays `#0058cc` as a fill.
- **Named widths** (after rc.2): `--container-page-md` (48rem) and `--container-page-lg` (60rem) for a page's sections
  (`@min-page-md:grid-cols-4`), `--container-popover-sm` (16rem, so Sort's Ascending and Descending fit their labels) for Sort and a filter's value picker, and
  `--container-popover-lg` (24rem) for a wide panel such as Notifications (`w-popover-lg`).
- Button and Toggle `sm` text is `text-xs` (was `text-[0.8rem]`).
- **Toasts** (after rc.2): `Toaster` sits at the top right, and on a phone spans the top, 16px from each side. It shows
  three toasts at most. New `toast` from `aperia-ds5` (sonner's, with a close button on any toast that stays until it is
  closed; `toast.error` stays until closed by default) and `toastNotification` (a new notification in the same stack;
  past three, one toast reads "4 more new notifications."). Import `toast` from `aperia-ds5` instead of `sonner`.
- **Tap to explain** (after rc.2): `ReasonTooltip`, `BlockedMenuItem`, a blocked `RecordActions` button or
  `SheetDelete`, a disabled `IconButton`'s reason, and `RelativeTime`'s exact time open on a tap on a touch screen. A
  tap elsewhere closes them.
- **ConfirmDialog working state** (after rc.2): `onConfirm` may return a Promise. While it runs, the action shows a
  spinner beside its label, Cancel is disabled, and the dialog stays open. A rejected Promise keeps the dialog open
  with a red line above the buttons (`error`, "Delete Contact failed. Try again." by default). `pending` shows the same
  state for an action the app tracks. `SheetDelete`'s `onDelete` may return a Promise too.
- **RecordActions** (after rc.2): three actions or fewer are buttons; with four or more, the first two stay buttons and
  the rest, Delete included, go into More actions. Below 1024px every action folds into More actions, as before.
- **CommandDialog** (after rc.2): 576px wide from `sm`; on a phone it fills the screen.

### Not in the library

Status colors, the amber warning alert and access-level colors stay in each app (style `Badge` and `Alert` through
`className`). Sales Portal also keeps, for now: the segmented toggle-group track, read-only fields, stacked sheets, sidebar
fine-tuning, destructive button colors in Dark.

### Figma

Code Connect points at "Aperia Shadcn Library (Enhanced)" (`uXivJU4N3R0LWu0mbimHWt`). Removed from the Figma library
because the code has no such prop (Swap library keeps working for everything else): menu `Color=Inverted` and
`Appearance=Translucent`, item `State=Hover (Translucent)`, Badge `Variant=Verified`, Alert `Variant=Warning`, Accordion
`Variant=Border`, ButtonGroup `Variant`, Toggle Group `Type=Fill`, and the status-color variables.
