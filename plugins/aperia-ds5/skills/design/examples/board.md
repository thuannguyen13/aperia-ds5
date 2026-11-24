# Board of Cards

A board shows records as cards in columns, with one column for each state.

## When to use

Use a board for a list that people work by moving records from one state to the next, such as sales opportunities by
stage.

## How it looks and behaves

A board page has a toolbar and a board under it. The list's toolbar sits above the board. When the list also has a table
view, a Board / Table switch comes first in the toolbar. The board fills the whole width of the page.

The board has one column per state. The columns share the width equally, and each column is at least 16rem wide. When
there are more columns than fit, the board scrolls sideways. Arrows show at its edges while more columns are off screen.
Each column has a tint of the shadow color over the page.

A column header stays at the top while the column scrolls. It shows the state's badge and the number of cards. When the
records carry an amount, the column's total follows at the right, in muted text. An empty column says so, such as "No
Opportunities".

A card uses the small card size. Selecting anywhere on the card opens the record, so the card's text is plain, with no
links inside. The record's name comes first. Detail lines follow, each with a small icon and muted text. Badges come
last.

A drag starts differently for each kind of input:

| Input | When a drag starts | Why |
|---|---|---|
| Mouse | After the pressed pointer moves 4px. | A click still opens the card. |
| Touch | After a finger holds for 200ms. | A swipe still scrolls. |

Screen readers announce each pickup and drop.

Dropping a card on another column opens a status change before anything saves. The status change asks for a reason when
the app records why a record changes state. See [Status Change With a Reason](status-change.md) for that dialog. While
the dialog is open, the card shows in its new column. Cancel, or a refused change, puts the card back.

Dragging works with a pointer only. Keyboard and screen reader users open the card and change the state from the
record's page.

While the board loads, the page shows placeholder shapes in the board's shape instead of a spinner.

## Before and after

- **Before:** Each card has its own View button, a related record's name as a link, and a solid pill for its state. The
  column header shows only the state's name.
- **After:** The whole card opens the record. The column header shows the state's badge, the count, and the total.

## Rules

### Open the record from the whole card

- **Do:** Open the card on a click or Enter anywhere on it (its name and details plain text), so the whole card is one
  easy target.
- **Don't:** Put a "View" link or button inside the card, or links on its text. Let the whole card open the record, so
  no one guesses which part opens what.

### Confirm a move before it saves

- **Do:** Open the status change when a card is dropped on another column (Cancel puts it back), so nothing changes by
  accident.
- **Don't:** Save the new state on a drop without asking. Open the status change on every drop, so a slip never changes
  a record and a required reason is always recorded.

### Load in the board's shape

- **Do:** Show placeholder columns and cards where the board will be, so people see the page's shape at once and nothing
  jumps.
- **Don't:** Show a spinner in the middle of the page. Show placeholders in the board's shape, so the page does not sit
  blank and then jump.

## When you can do it differently

A board has no exceptions.

## Which patterns it uses

- See [List Toolbar](../patterns/list-toolbar.md) for the toolbar and the Board / Table switch.
- See [Page Layout](../foundations/page-layout.md) for a board that fills the page's width.
- See [Cards and Tiles](../patterns/cards-and-tiles.md) for the small card.

## In code

The app builds it from aperia-ds5 parts and the recipes on the pattern and component pages:

- `ListToolbar` above, with a `ToggleGroup` (Board / Table) in `start`; render `<FullWidth />` on the page; load with
  the list skeleton from [Loading](../foundations/loading.md) in its board shape, full width.
- Columns: a grid of `auto-cols-[minmax(16rem,1fr)] grid-flow-col`, each column tinted with
  `color-mix(in oklab, var(--shadow-color) 3%, transparent)` (18% in Dark), its header `sticky` with the stage
  `Badge`, the count and the total (`text-xs text-muted-foreground tabular-nums`). An empty column holds
  `EmptyState` ("No Opportunities").
- A card is `Card size="sm"` with `{...openable(label, open)}`; detail lines are `text-xs text-muted-foreground` with a
  `size-3` icon.
- Dragging uses dnd-kit with a `MouseSensor` (`distance: 4`), a `TouchSensor` (`delay: 200`) and no keyboard sensor,
  plus `announcements`. A drop opens the app's stage change (`AlertDialog`).
