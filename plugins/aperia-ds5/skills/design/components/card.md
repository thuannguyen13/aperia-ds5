# Card

A card is a surface that groups one kind of content under a title. See [Cards and Tiles](../patterns/cards-and-tiles.md)
for how cards sit on a page.

## When to use

Use a card to group content that belongs together and has a name, such as Details, Tasks, or Recent Activity.

Do not use a card for a whole page. A list page's table sits on the page in its own surface, not in a card.

Do not put a card inside another card. A card never holds a second bordered box, so each group has one frame.

## What is available

A card has three parts and comes in three types, titled, collapsible, and small. Every type has the titled header.

### Parts

A card has three parts, listed from top to bottom:

| Part | Content |
|---|---|
| Header | One line with the title, an optional figure such as a count, and an optional action such as Add |
| Content | A table, a list, fields, or a chart |
| Footer, when there is one | A band at the bottom of the card, under the hairline |

Each part carries its own space. The header carries its height, and the content carries its padding. The card adds no
space between them, so the header stays the same when the content is hidden.

### Titled card

A titled card is the default card. Every card in an Aperia app has a titled header. Every header is the same height,
so the first lines of cards side by side line up.

### Collapsible card

A collapsible card is a card whose content can be hidden. The title and a chevron (⌄) form one button. Selecting it
opens and closes the content.

### Small card

A small card has tighter padding, 12px instead of 16px, and a smaller title.

### Specs

| | Default | Small |
|---|---|---|
| Corners | Extra large corner | Extra large corner |
| Padding | 16px | 12px |
| Fill | Card | |
| Edge | Border hairline edge and the Small shadow | |
| Title | 16px, semibold | 14px, semibold |
| Header | 56px, made of 12px above and below a 32px row, so cards side by side line up | |
| Content | Its own padding, 16px | |
| Footer | Muted at 50% | |

## How it looks and behaves

A card's title is a heading at level 2, so screen reader users can jump between cards.

A collapsible card's title is a button. It tells a screen reader whether the card is open and which content it
controls.

### States

A card has no hover, pressed, or disabled state of its own. Only the controls inside it react. A collapsible card has
three states.

| State | Look |
|---|---|
| Open | The content shows, and the chevron points down. |
| Closed | The card is its header alone, and the chevron points right. |
| Focus, from the keyboard | A halo in the focus color surrounds the title and the chevron. |

## Rules

### Head every card the same way

- **Do:** Put the title, a count, and the action on one line, the same height on every card, so people find them in one
  place.
- **Don't:** Draw a card's header yourself, or make its title as large as the page title. Use the card's own header, so
  cards line up.

### Hide content with the title, not text buttons

- **Do:** Open and close the card with its title and chevron, so every card works the same way.
- **Don't:** Add "Show" and "Hide" buttons. Use the title and chevron, so the card takes no extra room.

### Put tabs inside the card

- **Do:** Put tabs that switch a card's content inside it, under its header, so people see what they control.
- **Don't:** Float tabs above the card. Put them under the card's header, so it is clear what they switch.

## When you can do it differently

- While a card is empty, its Add button moves from the header to the middle of the empty state.

## Works with

| Component | How it works with a card |
|---|---|
| Button | Add sits in the card header. |
| Table | A table runs flush to the card's edges, with no top border. |
| Empty State | An empty state fills an empty card. |
| Tabs | Tabs sit inside the card, under its header. |
| Page header | The page title is larger. A card's title is one step below it. |

See [Tables](../patterns/tables.md) for running a table to the card's edges, with the column headings right under the
card header. See [Empty State](../foundations/empty-state.md) for keeping an empty card in its place. See [Border and
Radius](../styles/border-and-radius.md) and [Elevation](../styles/elevation.md) for the corner, edge, and shadow
the Specs name.

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
