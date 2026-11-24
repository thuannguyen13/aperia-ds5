# Surfaces and Layers

Surfaces and layers set which fill each part of a screen sits on, how parts group into boxes, and which part leads. See
[Color](color.md) for the value of each fill.

## When to use

Read this page before you style a part that no pattern or example shows, such as a list in a sheet or a box of your
own. The other Styles pages give each value on its own. This page says how the values combine on one screen.

## What is available

A layer is a fill that parts of a screen sit on, with the edge and the shadow that go with it. A screen has four
layers, listed here from the bottom up.

| Layer | Fill | Edge and shadow | What sits there |
|---|---|---|---|
| Page | Background, a light gray | No edge and no shadow | The page column, the top bar, and the list toolbar |
| Surface | Card, white in Light | A border in the Border color and the Small shadow | Cards, a table or an empty state on the page, and a list of rows in a sheet or a dialog |
| Control | Control, white in Light | A border in the Input color and the Small shadow | Fields, outline buttons, checkboxes, radios, and the chosen tab |
| Panel | Background for a dialog, a sheet, or a drawer. Popover for a menu, a popover, or a list that opens from a field. | A border in the Border color, with the Large shadow and the overlay for a dialog or a sheet, or the Medium shadow for a menu | Dialogs, sheets, drawers, menus, popovers, and select and combobox lists |

In Dark, the page, a surface, a control, and a menu each step lighter in that order. The layers keep their order
without white.

Two more fills sit inside a layer and are not layers themselves:

| Fill | Where it shows |
|---|---|
| Muted, at half strength or in full | A card's footer, a dialog's footer, a note's box, a group row in a table, and the hover and selected fills of rows |
| Sidebar | The sidebar alone. Nothing from the page column sits on the sidebar. |

## How it looks and behaves

### Layers

Each part sits on the layer that the table under What is available names. A part sits only on a layer below its own.

- A surface sits on the page, or on a panel whose fill is the page's. A surface never sits on another surface.
- A control sits on any layer. Its fill and its edge make it show on the page, on a surface, and in a menu.
- A panel floats above every other layer. A dialog or a sheet dims the page under the overlay. A menu or a popover
  casts its shadow and dims nothing.

A dialog, a sheet, and a drawer have the page's fill, so the parts inside them follow the order of the page:

- Fields and a form's sections sit straight on the panel, because each field is already a control.
- A list of rows goes onto one surface, with dividers between rows. The filters in a phone's filter sheet sit this
  way.
- A table goes onto a surface, as it does on a page.

A menu or a popover has the Popover fill, a step above every layer under it. Its rows sit straight on that fill. A
menu or a popover never holds a surface.

### Grouping

A group is a set of parts that belong together under one name, such as a card's tasks or a sheet's filters. Each group
sits in one box, and the box sets how its parts are separated.

| What the parts are | How they are separated | Box |
|---|---|---|
| Rows that people act on one by one, such as table rows, tasks, or filters | A divider between rows, running to the box's edges | The card that holds them, or a surface of their own on a page or a panel |
| A short list read as one block, such as the people on a record | Space, from each row's padding | No box of their own. The rows sit in the card's content. |
| One record's values, such as its details | Space, with the values lined up in one column | No box of their own. The rows sit in the card's content. |
| Sections of one form, or of one details card | A divider above each section, or space and a heading | No box of their own |

A divider always runs from its container's left edge to its right edge. The content keeps the container's inset, and
the divider never does. Between the rows of a list, such as a table or a list people reorder by dragging, each row
moves and highlights as one piece, and its divider spans it. Inside a sheet, a popover, a dialog, or a card, groups are
sections, such as a sheet's header and body, a popover's column list and its Ascending and Descending, or a card's
footer. Each section keeps the inset, and the divider between two sections spans the container.

Groups with their own title and their own actions are separate cards, 16px apart. Two products' line items are two
cards, each with its own Add. See [Spacing](../foundations/spacing.md) for the gaps between cards and between sections.

### Emphasis

Every area has one element that leads, the element people should see first. See
[Buttons and Actions](../patterns/buttons-and-actions.md) for what an area is. The lead is marked in this order:

1. Weight and size come first. A title is semibold, and a stat tile's figure is larger than its label. See
   [Typography](typography.md) for each role's weight.
2. Muted text lowers every secondary part, such as labels, descriptions, and times.
3. Color comes last. The primary color marks the main button and the mark of a chosen option, and nothing else. Links
   take the Link color. See [Color](color.md) for that rule.
4. Status color sits only on a badge, on a dot beside its word, or on an alert. A card, a row, a tile's number, or a
   switch never takes a status color.

### States on a surface

Rows and items on a surface show their state with the Muted fill. The primary color draws only the mark of a chosen
option, and the Ring color draws the focus line. The states below are the ones the components draw.

| State | How it looks | Where it shows |
|---|---|---|
| Hover | Muted at half strength | A table row, and a row in a list on a surface |
| Highlighted | Muted in full | A menu row under the pointer or the arrow keys, a search result, and an item that is a link under the pointer |
| Selected | Muted in full | A selected table row, and a pressed toggle |
| Chosen option | The primary color on the option's mark | A ticked checkbox, a picked radio, a switch that is on, and the tint and border of a choice card that is picked |
| Current tab | The Control fill with its border on the chosen tab, or a line in the text color under it in line tabs | The tab whose content shows |
| Focus on a row | Muted at half strength, with a focus line just inside the row's edge | A row that opens its record, and a row in a list on a surface |
| Focus on a control | A thin focus line inside and a halo around | Fields, buttons, and items |
| Current page | White with navy text in Light, and a lighter gray than the sidebar in Dark | The app's pages in the sidebar |

A selected row and a pressed toggle never take the primary color, and neither does the current tab. A row's focus line
sits inside the row, because the surface cuts off anything outside its edge. No state changes a row's height or moves
its text.

### Showing what responds

Anything that responds looks different at rest from something that does not. Hover can confirm that a part responds,
but hover is never the only signal, because a touch screen has no hover and a keyboard never points.

| Element | At rest | Hover (mouse) | Keyboard |
|---|---|---|---|
| A button, a link, or a tab | Its fill, its border, or its blue text | Its hover state | The focus line |
| A table row that opens a record | The record's name in medium weight, as the row's title | The Muted fill and the hand cursor | The focus line |
| A row in a list on a surface, or any row on a phone | A chevron at the row's end | The Muted fill | The focus line |
| Something that only shows information | Nothing | No hand cursor and no fill | Not focusable |

Everything clickable shows the hand cursor, including menu items and rows that open a record. Disabled controls do
not show it.

### Styling something new

A part that no page shows is styled in five steps:

1. Find the closest pattern or example, and follow its structure.
2. Pick the layer for each part from the table under What is available.
3. Group the parts. A list of rows goes on one surface with dividers, and separate groups go in separate cards.
4. Mark the one element that leads, by weight first, with muted text for secondary parts, and with color last.
5. Use only tokens, the surface and control recipes, and the components' variants. A look that none of them gives is a
   proposal for the library.

The filter sheet on a phone shows the five steps at work:

1. The closest pattern is [Filters](../patterns/filters.md), which opens a sheet on a phone.
2. The sheet is a panel with the page's fill. Each filter is a line that people tap, so the lines need a surface.
3. Every line sits in one card, with a divider between lines. Add Filter sits under the card, on the sheet, because
   Add Filter is an action and not a line.
4. Each line's filter name is medium weight, and its value is muted. No line uses the primary color.
5. The card is the surface recipe. Each line takes the hover and the focus of a table row.

## Rules

### Put a list of rows on a surface

- **Do:** Put a list of rows in a sheet or a dialog on one surface, with dividers between rows, so the rows read as
  one group.
- **Don't:** Leave rows loose on a panel's gray fill. Put them on a surface, so each row has an edge and its hover fill
  shows.

### Give each group one surface

- **Do:** Let the card be the one surface around its content, and set parts apart with space, a divider, or the
  Muted fill, so each group has one frame.
- **Don't:** Put a card, a surface, or an outlined box inside a card. Remove the inner box, so the content does not sit
  in two frames.

### Run every divider edge to edge

- **Do:** Run a divider from the container's edge to its edge, between rows and between sections alike. Give the inset
  to the content instead, so every divider marks the full width of what it separates.
- **Don't:** Stop a divider at the container's inset. A stopped divider leaves stubs at both ends and makes a group read
  as one more row.

### Show a status on a badge, not a filled area

- **Do:** Show a state as a badge, or as a dot beside its word, in the app's status color, so the color marks only the
  state.
- **Don't:** Fill a card, a row, or a tile with a status color. Keep the fill neutral and add a badge, so the content
  keeps its contrast.

### Show what responds before the pointer reaches it

- **Do:** Mark every part that responds at rest, such as a table whose name column is medium weight, so people see
  which rows open before they point at one.
- **Don't:** Leave a plain table where nothing marks the rows that open. Give each row its title, so the rows read as
  records on a touch screen and with a keyboard too.

### Show the hand cursor on everything clickable

- **Do:** Show the hand over a button, a tab, a menu item, or a row that opens, so people know they can click it.
- **Don't:** Leave the arrow on a clickable row, or show the hand over a disabled button. Show the hand only on what
  responds, so the pointer never misleads.

### Let one element lead each area

- **Do:** Give each card, sheet, or dialog one lead, such as its title by weight and its main action as the one
  primary button, so people see first what matters.
- **Don't:** Make two elements compete, such as two primary buttons side by side. Lower one to an outline button or to
  muted text, so the lead stays clear.

## When you can do it differently

A board's columns are a tint over the page, not surfaces. Its cards sit in the columns as they would on the page.

A row that people drag lifts off its surface while it moves, with the Extra large shadow. The row drops back onto the
surface when people let go. See [Reordering](../patterns/reordering.md) for dragging rows.

## Works with

- See [Color](color.md) for the value of each fill, and for the rule on the primary color.
- See [Elevation](elevation.md) for the shadow of each layer and for the overlay.
- See [Border and Radius](border-and-radius.md) for the borders of surfaces and controls.
- See [Typography](typography.md) for the weights that mark the lead.
- See [Page Layout](../foundations/page-layout.md) for lining up rows inside a surface.
- See [Cards and Tiles](../patterns/cards-and-tiles.md) and [Card](../components/card.md) for the card.
- See [Buttons and Actions](../patterns/buttons-and-actions.md) for one primary button per area.
- See [Filters](../patterns/filters.md) for the filter sheet on a phone.
- See [Tables](../patterns/tables.md) for the rows that open a record.

## In code

- Page: `bg-background`, already on `body`. `Dialog`, `AlertDialog`, `Sheet` and `Drawer` fill with `bg-background`;
  `Popover`, `DropdownMenu`, `Select`, `HoverCard` and the combobox list fill with `bg-popover`.
- Surface: `Card`, or the `surface` utility (`rounded-xl bg-card shadow-sm ring-[0.5px] ring-border`) for the app's
  own box, such as a table or an empty state on the page, or a list of rows in a sheet.
- Control: the components themselves; the `control` utility (`bg-control shadow-sm ring-[0.5px] ring-input`) for the
  app's own control.
- A list of rows on a surface, as `ListToolbar`'s phone sheet draws it:

  ```tsx
  <div className="flex flex-col divide-y overflow-hidden surface">
    <button
      type="button"
      className="flex min-h-11 items-center gap-3 px-3 py-1.5 text-left text-sm outline-none hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
    >
      …
    </button>
  </div>
  ```

  `overflow-hidden` keeps the row fills inside the rounded corners. A row that opens a record takes `openable` or
  `opensOnClick`, which give it the same focus look.
- Inside a card: never `Card`, `surface`, `Item variant="outline"` or a `border` box. A part set apart is
  `bg-muted/50`, as `CardFooter` and `Item variant="muted"` are.
- Status: `Badge` with the app's pair, `className="bg-status-amber text-status-amber-foreground"`. Never put a
  `bg-status-*` class on a `Card`, a `TableRow` or a tile.
- States, as drawn: `TableRow` is `hover:bg-muted/50` and `data-[state=selected]:bg-muted`; menu rows are
  `focus:bg-accent` (`--accent` is `--muted`); a `CommandItem` is `data-selected:bg-muted`; the sidebar's current page
  is `data-active` on `AppSidebar`'s menu buttons. A ticked `Checkbox` or `RadioGroupItem` and a `Switch` that is on are
  `data-checked:bg-primary`. The chosen `TabsTrigger` is `data-active:bg-control`, or a
  `bg-foreground` line in `variant="line"`.
- The name cell of a row that opens is `font-medium`. A row in a list on a surface that opens ends with a
  `ChevronRightIcon` in `text-muted-foreground`.
- `base.css` gives every clickable element the pointer, including a row marked with `opensOnClick` (`data-opens`). It
  skips `:disabled`, `aria-disabled` and `data-disabled`.
