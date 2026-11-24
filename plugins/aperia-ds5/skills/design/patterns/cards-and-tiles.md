# Cards and Tiles

Cards group related content under a title, and tiles each show a single number. See [Card](../components/card.md) for
the card itself.

## When to use

Choose by what the content is:

| Content | Use |
|---|---|
| Content that belongs together and has a name, such as Details, Tasks, or Recent Activity | Card |
| One number the user checks at a glance, such as Open Prospects or Overdue Tasks | Tile |
| Values that a chart shows on hover | Chart tooltip |

## What is available

Cards and tiles come in seven parts and forms:

| Part | What it shows |
|---|---|
| Card header | The title, an optional figure such as a count, and an action, on one line. Every card header has the same height. |
| Collapsible card | The title and a chevron, which form one button. The button opens and closes the card. |
| Tabs inside a card | Tabs under the card header that switch the card's content. |
| Tile | A label above the number says what it counts. A line below the number says what it means, when that needs saying, such as "Up 8% on last quarter". A progress bar can go under the number. |
| Red tile | The number in the destructive color. It shows only with a label that says what it counts, such as "3 overdue". |
| Tiles inside a card | The card is the surface, so the tiles drop their own surface. |
| Chart tooltip | A card with a gap between the name of each series and its value. A chart that takes keyboard focus shows the focus ring. |

## How it looks and behaves

A card is built from a header and its content. A card header is 56px high. Its title, figure, and action sit on one
32px row. Card titles are semibold and one step smaller than the page title. On a phone, an action that does not fit
beside the title drops under it.

Add sits at the right of the header. When the card's list also has Sort, Sort sits before Add. See
[Sort](sort.md) for the Sort control. While the card is empty, Add moves to the middle of the empty state, and the
header has none.

Each part of a card brings its own space. When a part hides, its space goes with it, and the rest stays where it was.
Examples are the content of a collapsed card and an error that clears.

Tiles sit in rows, and tiles in a row line up. The line that says what each number means is pinned to the foot of the
tile, whether or not the tile has a bar. Tile numbers use tabular figures.

## Rules

### Put Add in the header, beside the records

- **Do:** Put Add at the right of the card header, or in the middle of the empty state while there is nothing, so
  people find it beside the records.
- **Don't:** Put Add under the list, or in both the header and the empty state. Show it in one place, so people never
  wonder which to press.

### Label what a tile's number counts

- **Do:** Label a tile's number ("Overdue Tasks" above a red 3, "3 overdue" under it), so people know what it counts.
- **Don't:** Show a bare red number, or a number with no label. Add the label, so the number means something.

### Let each part own its space

- **Do:** Let the header's height and the content's padding make the space, so nothing moves when a part hides.
- **Don't:** Add space between a card's parts on the card, or add padding back when a part hides. Let each part own its
  space, so cards stay steady.

## When you can do it differently

A list that people edit inside a card, such as tasks, is the one case where a row has a button. Each row shows Edit on
hover or focus, and always on touch screens. Edit opens the same editor as the record's own page.

## Works with

Cards and tiles work with four other pages:

- See [Card](../components/card.md) for the card's types and specs, for heading every card the same way, for tabs
  inside the card, and for collapsing a card with its title.
- See [Money and Numbers](money-and-numbers.md) for how a tile's number is written.
- See [Buttons and Actions](buttons-and-actions.md) for Add in the header.
- See [Empty State](../components/empty-state.md) for an empty card.

## In code

- `TitledCard` from `aperia-ds5` for every card: `title`, `figure`, `action`, `description`, `collapsible`,
  `defaultOpen`. A table goes straight inside; other content in `<CardContent className="pb-4">`. Never a `gap` or
  `space-y` on the card.
- `StatTile` for a number: `label`, `value`, `hint`, `tone="red"` (with the app's status color), `plain` inside a
  card, a bar as `children`.
- A chart's tooltip is `ChartTip` from `aperia-ds5/chart`.
