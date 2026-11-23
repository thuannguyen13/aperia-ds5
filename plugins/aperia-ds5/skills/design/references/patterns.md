# Patterns

## Pages

- **The shell comes from aperia-ds5.** Don't rebuild it. Wire these once in the app's layout and every page gets them:
  - `AppSidebar` inside `SidebarProvider`: the logo and product name, Search (`AppSidebarSearch`, ⌘K), the app's pages,
    Notifications (`AppSidebarNotifications`) and the account menu at the foot. Routes, the router's `link` and the
    user come in as props; the search dialog and the notifications panel are the app's own.
  - `AppHeader` around the page content, inside `SidebarInset`: the sidebar toggle and the breadcrumb, **nothing
    else**. No title, status chips, filters, dates or buttons in the top bar.
  - `PageHeader` at the top of every page: the title (which fills the breadcrumb's last crumb, so the title is never
    written twice), a one-line subtitle, the page's actions and its labelled `properties`. A record's actions are
    `RecordActions` in its `menu`. A page that names its record in its content uses `PageCrumb` instead.
- **Every record has a page.** Forms open in a sheet. Tables show and sheets edit, so checks and errors live in one place.
- **One scroll.** The page scrolls as one. Never nest a scroll area: it traps the wheel. Long histories show the latest
  ten, with View All opening a sheet.
- **One page header** (`PageHeader`):
  - the breadcrumb alone in the top bar, and one title on the page;
  - then the title, a one-line subtitle, the page's actions and its labelled properties;
  - tiles, toolbars, filters and tabs are content, not header. A filter such as a report date is a control in the
    page's toolbar, not a stacked label and field in the header.
- **A record with a number** leads its header line with the kind and number ("Opportunity #659"). Tables keep the bare
  number.
- **People in a header** show as avatars: three at most, then "+N". A card listing them opens on hover, focus and tap.
- **Record actions** are `RecordActions`: Edit, then the rest, then Delete in red, as header buttons that fold into More
  actions below lg.
- **Width:** a centred column up to 1440px. Boards and list tables run full width.
- **Never show internal scope, phase or demo labels** ("MVP", "Not in MVP", "Phase 2", "Demo Data", "Mock") to users.
  What isn't built yet is left out, not labelled. Sample data in a demo build isn't marked on screen.

## Cards

- Head every card with `TitledCard`: title, an optional figure such as a count, and an action. Its header is 56px and
  carries its own space; a table follows it straight to the card's edges, and other content brings its own padding
  (`<CardContent className="pb-4">`).
- **Add** goes in the card header beside the records. While the card is empty, Add goes in the centre of the empty state,
  and the header has none.
- A list worked from a card, such as tasks, is edited in the card with the same editor as its own page: an Edit button on
  each row, shown on hover or focus, and always on touch devices.
- Tabs that switch a card's content sit **inside** the card, under its header.
- **A collapsible section** is a disclosure in the card's own `TitledCard` header (`collapsible`): the title and a
  chevron are one button. Never "Show" / "Hide" text buttons, and never a header the card draws for itself.

## Lists and tables

- **A row opens its record.** Spread `opensOnClick(label, open)` from aperia-ds5 on the `TableRow` (or `openable` for a
  row with no controls inside): the whole row is one focusable target with the pointer. No per-row "Open" or "View
  [Thing]" button, and no link on one cell only: the name is plain text like the rest of the row. Edit and Delete live
  on the record page.
- **A table in a card has no top border.** The card's `TitledCard` header sits directly above the column headings, with
  no line, `Separator` or `border-t` between them. The first hairline is the one under the column headings.
- **One Sort per list**, at the right end of the toolbar: a field and a direction. Column headings don't sort. An empty
  value sorts lowest.
- **Filters** are in the toolbar. On a phone they go behind one Filters button that counts those on, open in a sheet and
  show as chips that clear on a tap.
- **Several names in a cell** show a count. Clicking it lists them.
- **Contact values are plain text.** Phone numbers, emails and websites read in the body colour like any value. In a
  table they stay plain (the row opens its record). On a record's page, a value tapping does something with is a link
  (`tel:`, `mailto:`, the website, in a new tab): body colour, `hover:underline`, never blue or underlined at rest.
- **No zebra stripes.** Rows are separated by hairlines and hover with a muted tint. A group of rows is headed by a quiet
  band.

## Empty and missing

- Use `EmptyState` (`assets/components/empty-state.tsx`):
  - an icon of what's missing;
  - the title "No [Items]";
  - a second line only when it says what the title can't: whose ("No tasks assigned to you."), which ("No lost
    opportunities in this range.") or what to do ("Try again.");
  - no permission hints or who to ask.
- A search with no match shows the same empty state with a search icon, titled "No Results". The line "No matching
  results." and Clear Filters appear only where there are filters to clear.
- The empty card keeps its place, so nothing shifts when records arrive.
- Every dead end (not found, no access, an error) says why and offers a way home.

## Pictures

- Every record's picture is the ds5 `Avatar`. **People are circles; companies, products and teams are
  `shape="square"`.** The square's corner steps down with the size on its own; don't add `rounded-*`.
  - A person: their photo (`AvatarImage`), else their initials (`AvatarFallback`). No one is `empty`, a dashed outline.
  - A company or product: its logo (`AvatarImage className="bg-white object-contain"`, so a transparent mark shows in
    Dark), else a monogram.
  - Initials and monograms take the app's colours through `colors={{ fill, text }}`, picked by the record's id so they
    never change between pages.
  - The app keeps one small adapter that maps a record to its picture (URL, letters, colours) and renders `Avatar`;
    every page calls that.
- Sizes: `xs` 20px (a picker row), `sm` 24px (beside a name), `default` 32px, `lg` 40px, `xl` 48px (a page header).
  Smaller, such as a 16px chip, is the app's `className`.
- Beside its name an avatar is hidden from screen readers; alone, give it `label`.
- No ring, border or shadow.
- Pickers show each record's picture beside its name.

## Buttons and actions

- Icon-only buttons use `IconButton` (`assets/components/icon-button.tsx`): the label is the tooltip and the accessible
  name.
- A button disabled for a reason stays focusable, with `aria-disabled`, and its tooltip says why.
- **Colour never carries meaning on its own.** Pair it with a badge, an icon or a label, so it reads in greyscale and to
  a colour-blind user: an amber count says what it counts ("3 overdue"), a red dot sits beside a word. A colour used for
  a state on a chart or table has a legend.
- Status is a badge in its status colour, never a solid primary button. Changing a status is an action on the record,
  such as "Change to In Progress".
- Destructive actions use precise verbs (Delete, Remove, Revoke) and red text.

## Forms

- **One form per record**, used everywhere it's added or edited, including from a picker.
- Forms open in a sheet with a fixed footer (Cancel and Save). A record sheet's Delete sits at the footer's start.
- **Sections** use `FormSection` (`assets/components/form-section.tsx`): a title with a line across the whole sheet.
- **Errors in place:** a refused save shows beside the field it names, or above the buttons. The sheet stays open with
  what was typed. No toast.
- **Optional fields** end their label with "(Optional)". Required ones carry no marker. An empty optional pick reads "No
  [field]".
- **Pickers:**
  - every record picker works alike, with picture, name and a line of detail;
  - "Every" is a choice of its own, and empty means nothing picked;
  - a missing record is added from the picker in a nested sheet, then selected.
- **Disabled fields** keep an informative placeholder and one line under the field saying why ("Pick a prospect
  first."). A locked record says "This item is in use and can't be changed."
- **Files** are picked in one drop zone, dropped or clicked, with what it accepts underneath.
- A sheet forgets what was typed when it's closed: no saved drafts.

## Dialogs

- A confirmation is a short title naming the change, one line on the consequence the user must know, then Cancel and the
  action, named.
- A destructive confirmation's action is red.
- Never "Are you sure?" when the consequence can be named.

## Tiles and charts

- A number goes on a surface with `StatTile` (`assets/components/stat-tile.tsx`): what it counts above, the number, and
  what it means below when that needs saying.
- A chart's tooltip is a card (white) with a gap between each series' name and its value. A focusable chart shows the
  focus ring.

## Navigation

- The sidebar is `AppSidebar`: the app's pages and what concerns the user: search first (⌘K too), notifications, and
  their account at the foot (name, role, settings, theme, sign out).
- **Global search** opens in a dialog:
  - the field is flush with the panel (no fill, edge or ring), with a clear (×) mirroring the search icon;
  - results are grouped by kind, each with its picture, and what matched is bold;
  - a key-hint footer has a 0.5px top border;
  - the panel fills the screen on a phone.
