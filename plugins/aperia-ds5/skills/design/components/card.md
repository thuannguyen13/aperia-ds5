# Card

A card groups content that belongs together under a title, such as Details, Tasks, or Recent Activity. See [Cards and
Tiles](../patterns/cards-and-tiles.md) for how cards sit on a page.

## Anatomy

A card has three parts, which are a header, its content, and a footer. The header holds a title, an optional figure,
and an optional action. The footer, the figure, and the action show only on some cards. A Tasks card shows every part.

1. **Header**. It is the top row of the card, and it holds the title, an optional figure, and an optional action.
2. **Title**. It is the card's name, such as "Tasks". It is a heading, and it is semibold.
3. **Figure** (optional). It is a small number in muted text beside the title, such as a count of 3.
4. **Action** (optional). It is a button at the right end of the header, such as Add.
5. **Content**. It is the body of the card, under the header. It can be a table, a list, fields, or a chart.
6. **Footer** (optional). It is a band at the bottom of the card, under a divider. It holds a line of muted text, such
   as when the card was last updated.

## When to use

Use a card for content that belongs together and has a name.

Do not use a card for a whole page. See [Tables](../patterns/tables.md) for where a list's table sits.

Do not put a card inside another card. See [Surfaces and Layers](../styles/surfaces-and-layers.md) for how to set parts
apart inside a card instead.

## What is available

A card comes in three types, titled, collapsible, and small. Every type has the titled header.

### Titled card

A titled card is the default card. Every card in an Aperia app has a titled header. Every header is the same height,
so the first lines of cards side by side line up.

### Collapsible card

A collapsible card is a card whose content can be hidden. The title and a chevron (⌄) form one button. Selecting it
opens and closes the content.

### Small card

A small card has tighter padding, `p-3` instead of `p-4`, and a smaller title.

### Specs

See [Border and Radius](../styles/border-and-radius.md) and [Elevation](../styles/elevation.md) for the corner, edge,
and shadow that the table names.

| | Default | Small |
|---|---|---|
| Corners | Extra large corner | Extra large corner |
| Padding | `p-4` | `p-3` |
| Fill | Card | |
| Edge | A border in the Border color and the Small shadow | |
| Title | `text-base`, semibold | `text-sm`, semibold |
| Header | A `min-h-8` row with `py-3` above and below it, so cards side by side line up | |
| Content | Its own padding, `px-4` | |
| Footer | Muted at 50% | |

## How it looks and behaves

The card adds no space between its parts. The header has a fixed height, and the content and the footer each carry
their padding. When a part hides, such as the content of a collapsed card or an error that
clears, its space goes with it. The other parts stay where they were.

The header is one row, the same height on every card, so the first lines of cards side by side line up. The title, the
figure, and the action share that row. Where they do not fit side by side, as on a phone, the action drops under the
title and stays at the right.

A card's title is semibold and one step below the page title, so a page has one top heading. The title is a heading at
level 2, so screen reader users can jump between cards.

A collapsible card's title is a button. It tells a screen reader whether the card is open and which content it
controls.

A card works with other parts as follows:

- **Add.** An Add button sits in the action part of the header. An empty card has no Add in its header. Add sits in the
  middle of the empty state instead. See [Cards and Tiles](../patterns/cards-and-tiles.md) for why.
- **Table.** A table runs flush to the card's edges, with no top border. See [Tables](../patterns/tables.md) for the
  column headings right under the header.
- **Empty state.** An empty state fills an empty card, so the card keeps its place. See [Empty
  States](../foundations/empty-states.md).

### States

A card has no hover, pressed, or disabled state of its own. Only the controls inside it react. A collapsible card has
three states.

| State | Look |
|---|---|
| Open | The content shows, and the chevron points down. |
| Closed | The card is its header alone, and the chevron points right. |
| Focus, from the keyboard | A halo in the focus color surrounds the title and the chevron. |

## Rules

### 1. Head every card the same way

Every card uses the card's own header, which keeps the title, figure, and action on one row. Cards then line up, and
people find the same parts in the same place.

- **Do:** Put the title, a count, and Add on one row in the card's header.
- **Don't:** Build a header by hand, such as a title as large as the page title with the count inside it and a button
  under it.

### 2. Hide content with the title, not text buttons

A collapsible card opens and closes from its title and chevron, so every card works the same way and no extra button
takes room.

- **Do:** Let people select the title and chevron to hide a card's table.
- **Don't:** Add Show and Hide buttons to the header.

### 3. Put tabs inside the card

Tabs that switch a card's content sit inside the card, under its header, so people see what the tabs control.

- **Do:** Put Notes and Calls tabs inside the Activity card, under its title.
- **Don't:** Float the tabs above the card, where they look like they switch the page.

## In code

Build the titled card in the app from `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, and
`CardContent` from `aperia-ds5`. Write it once as the app's own component and use it for every card.

```tsx
<Card className="gap-0 py-0">
  <CardHeader className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3">
    <div className="flex min-h-8 flex-wrap content-center items-baseline gap-x-3">
      <CardTitle role="heading" aria-level={2}>Tasks</CardTitle>
      <p className="text-sm text-muted-foreground tabular-nums">12</p>
    </div>
    <CardDescription className="order-last basis-full">Optional line under the title</CardDescription>
    <CardAction className="ml-auto flex items-center gap-2 self-center">
      <Button variant="outline">Add Task</Button>
    </CardAction>
  </CardHeader>
  <CardContent className="pb-4">…</CardContent>
</Card>
```

- The card has `gap-0 py-0`, and each part brings its own space. Do not add `gap`, `space-y`, or vertical padding to
  the card. A table goes straight inside the card with no `CardContent`. Other content goes in
  `<CardContent className="pb-4">`.
- The header is a wrapping row, not the grid that `CardHeader` has by default. On a phone the action drops under the
  title, and `ml-auto` keeps it at the right.
- For a collapsible card, put a `<button type="button">` inside `CardTitle` that holds the title and a
  `ChevronDownIcon` (`size-4 text-muted-foreground transition-transform`, plus `-rotate-90` while closed). Give it
  `aria-expanded` and `aria-controls` that names the content's `id`. Wrap the content in a `<div>` that is `hidden`
  while closed and `className="contents"` while open. Start it open unless the page says otherwise.
- Give the card an `id` when a link elsewhere opens the page at it.
- Pass `size="sm"` to `Card` for the small card. Use the `surface` utility for an app's own box that should look like
  a card.
