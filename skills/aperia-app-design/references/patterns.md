# Patterns

## Pages

- **Every record has a page.** Forms open in a sheet. Tables show and sheets edit, so checks and errors live in one place.
- **One scroll.** The page scrolls as one. Never nest a scroll area: it traps the wheel. Long histories show the latest
  ten, with View All opening a sheet.
- **One page header:**
  - the breadcrumb alone in the top bar;
  - then the title, a one-line subtitle, the page's actions and its labelled properties;
  - tiles, toolbars and tabs are content, not header.
- **A record with a number** leads its header line with the kind and number ("Opportunity #659"). Tables keep the bare
  number.
- **People in a header** show as avatars: three at most, then "+N". A card listing them opens on hover, focus and tap.
- **Record actions** are header buttons: Edit, then the rest, then Delete in red. They fold into More actions on narrow
  screens.
- **Width:** a centred column up to 1440px. Boards and list tables run full width.

## Cards

- Head every card with `TitledCard`: title, an optional figure such as a count, and an action. A table inside runs to
  the card's edges (`pb-0`); other content is padded (`pb-3`).
- **Add** goes in the card header beside the records. While the card is empty, Add goes in the centre of the empty state,
  and the header has none.
- A list worked from a card, such as tasks, is edited in the card with the same editor as its own page: an Edit button on
  each row, shown on hover or focus, and always on touch devices.
- Tabs that switch a card's content sit **inside** the card, under its header.

## Lists and tables

- **A row opens its record.** It's a focusable row, not a button that contains controls. Edit and Delete live on the
  record page.
- **One Sort per list**, at the right end of the toolbar: a field and a direction. Column headings don't sort. An empty
  value sorts lowest.
- **Filters** are in the toolbar. On a phone they go behind one Filters button that counts those on, open in a sheet and
  show as chips that clear on a tap.
- **Several names in a cell** show a count. Clicking it lists them.
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

- One component draws every record's picture:
  - a person: their photo, else their initials, in a circle; no one is a dashed circle;
  - a company or product: its logo, else a monogram on a rounded square, in a colour fixed by its id.
- Sizes come from one scale, from 14px in a link to 40px in a page header.
- No ring, border or shadow. An uploaded logo keeps a white ground, so a transparent mark shows in dark mode.
- Pickers show each record's picture beside its name.

## Buttons and actions

- Icon-only buttons use `IconButton` (`assets/components/icon-button.tsx`): the label is the tooltip and the accessible
  name.
- A button disabled for a reason stays focusable, with `aria-disabled`, and its tooltip says why.
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

- The sidebar holds the app's pages and what concerns the user: search first (⌘K too), notifications, and their account
  at the foot (name, role, settings, theme, sign out).
- **Global search** opens in a dialog:
  - the field is flush with the panel (no fill, edge or ring), with a clear (×) mirroring the search icon;
  - results are grouped by kind, each with its picture, and what matched is bold;
  - a key-hint footer has a 0.5px top border;
  - the panel fills the screen on a phone.
