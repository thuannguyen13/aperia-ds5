# Cards and Tiles

Cards group a page's related content under titles, and tiles show the numbers people check at a glance. See
[Card](../components/card.md) for a card's parts, types, and specs.

## Anatomy

A record's page has eight parts that belong to cards and tiles. A tile has a label, a number, and a hint. A card has a
header and its content. A side column holds more cards. The hint and the side column show only on some pages.

1. **Tile**. It is a box on a surface that shows one number. A page lays its tiles in a row under the page header.
2. **Label**. It is the small muted text above the number. It says what the number counts, such as "Overdue Tasks".
3. **Number**. It is the tile's figure, in larger semibold text and the body color.
4. **Hint** (optional). It is a line of muted text under the number. It says what the number means, such as "Up 8% on
   last quarter".
5. **Card**. It is a surface that groups related content under a title, such as Tasks.
6. **Card header**. It is the row at the top of a card. It holds the title, an optional figure such as a count, and an
   optional action such as Add.
7. **Card content**. It is what the card holds under its header, such as a table, a list, fields, or a chart.
8. **Side column** (optional). It is a narrow column of cards beside the main column. It holds related records and
   people.

## When to use

Choose by what the content is:

| Content | Use |
|---|---|
| Content that belongs together and has a name, such as Details, Tasks, or Recent Activity | Card |
| One number the user checks at a glance, such as Open Prospects or Overdue Tasks | Tile |

## How it looks and behaves

### Tiles

Tiles sit in a row, and the tiles in a row line up. A bar can go under a tile's number to show progress. The hint is
pinned to the foot of the tile, so the hints in a row stay level whether or not a tile has a bar. See [Money and
Numbers](../foundations/money-and-numbers.md) for how a tile's number is written, and [Screen
Sizes](../foundations/screen-sizes.md) for how many tiles sit in a row at each width.

A tile inside a card drops its own surface, because the card is already the surface. See [Surfaces and
Layers](../styles/surfaces-and-layers.md) for why.

### Cards

A card's header holds its title, figure, and action on one row. See [Card](../components/card.md) for the header's
height, the title's size, collapsing a card, and tabs inside a card.

Add sits at the right end of the card header. See [Sort](sort.md) for where Sort sits beside it. While the card is
empty, Add moves to the middle of the empty state, and the header has none. See [Empty
States](../foundations/empty-states.md) for the empty state.

A row in a card shows a button only when the row's click is already taken, such as a task whose checkbox ticks it. See
[Tables](tables.md), Buttons on a row, for every such row. See [Tables](tables.md) for a table in a card and
[Charts](charts.md) for a chart in a card.

### A page of cards

A page of cards stacks the page header, a row of tiles, and the cards, in that order. See [Page
Layout](../foundations/page-layout.md) for the gaps between them.

The cards sit in one column, or in a main column with a side column. The content decides, not the number of cards. A
page gets a side column when it has related records or people to show beside its main work. The side column appears
once the page is `@min-page-lg` wide. The main column takes three quarters and the side column one quarter, lined up
under the tiles. A phone gets one column.

Cards are ordered by what the user does. The main column holds the record's own content first, such as what is sold
and its details. The work on the record follows, with two short cards side by side once both fit, such as Tasks and
Notes. The side column holds related records and people, with the history card last. See [Details](details.md) and
[History](history.md) for those two cards.

An empty card keeps its place, with an empty state inside.

## Rules

### 1. Put Add in the header, beside the records

Add sits at the right end of the card header, so people find it beside the records. While the card has no records, Add
moves to the middle of the empty state, so it shows in one place.

- **Do:** Put Add in the card header, beside the title and the count of Tasks.
- **Don't:** Put Add under the list, or in both the header and the empty state.

### 2. Label what a tile's number counts

A tile puts a label above its number, and the number stays in the body color, so the words carry the meaning and color
stays for badges. See [Surfaces and Layers](../styles/surfaces-and-layers.md) for where status color goes.

- **Do:** Put "Overdue Tasks" above a 3 in the body color.
- **Don't:** Show a bare number, or color the number red.

### 3. Use one page of cards, not page tabs

A record's page is one scrolling page of cards, so people see the whole record and nothing hides behind a tab.

- **Do:** Put a record's tasks, notes, and history in separate cards on one page.
- **Don't:** Split the record into Tasks, Notes, and History views with tabs across the top of the page.

## In code

- Sections are direct children of `AppContent`: the row of tiles first, then the body. Do not wrap them in a
  `gap-4` column or space them with margins.
- A side column: a grid from a 60rem container, three quarters and one quarter, `grid-cols-[minmax(0,1fr)]` on a
  phone, `gap-4`. Build every card, the details card too, as the titled card recipe on [Card](../components/card.md).

Build the stat tile in the app from plain elements with the `surface` utility from `aperia-ds5`. A bar under the
number is a `Progress` from `aperia-ds5`.

```tsx
<div className="surface flex flex-col gap-0.5 px-4 py-3">
  <span className="text-xs text-muted-foreground">Overdue Tasks</span>
  <span className="text-2xl font-semibold tabular-nums">3</span>
  {/* An optional bar goes here, under the number. */}
  <span className="mt-auto text-xs text-muted-foreground">Oldest was due 11/02/2026</span>
</div>
```

- The number never takes `text-destructive` or a status color. The label says what it counts.
- Inside a card, drop `surface px-4 py-3` and keep `flex flex-col gap-0.5`, because the card is the surface.
- The line under the number has `mt-auto`, so the lines of a row of tiles stay level whether or not a tile has a bar.
- A row of tiles is a grid with `gap-4`, two columns on a phone.
