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

A card's header, content, and footer each hold their own space, so a part that hides takes its space with it. See
[Card](../components/card.md) for the card's parts.

Tiles sit in rows, and tiles in a row line up. The line that says what each number means is pinned to the foot of the
tile, whether or not the tile has a bar. Tile numbers use tabular figures.

A page of cards, such as a record's page, stacks the page header, a row of tiles, and the cards, 20px apart. The cards
sit in one column, or in a main column with a side column. The content decides, not the number of cards. A page gets a
side column when it has related records or people to show beside its main work. The side column appears once the page
is 960px wide. The main column takes three quarters and the side column one quarter, lined up under the tiles. A phone
gets one column. Cards in a grid are 16px apart.

Cards are ordered by what the user does. The main column holds the record's own content first, such as what is sold
and its details. The work on the record follows, with two short cards side by side once both fit, such as Tasks and
Notes. The side column holds related records and people, with the history card last. An empty card keeps its place,
with an empty state inside.

## Rules

### Put Add in the header, beside the records

- **Do:** Put Add at the right of the card header, or in the middle of the empty state while there is nothing, so
  people find it beside the records.
- **Don't:** Put Add under the list, or in both the header and the empty state. Show it in one place, so people never
  wonder which to press.

### Label what a tile's number counts

- **Do:** Label a tile's number ("Overdue Tasks" above a red 3, "3 overdue" under it), so people know what it counts.
- **Don't:** Show a bare red number, or a number with no label. Add the label, so the number means something.

### Use one page of cards, not page tabs

- **Do:** Build one scrolling page of cards, with tabs that switch a card's content inside that card, so the whole
  record is in view.
- **Don't:** Split the record into views with tabs across the top of the page. Use one page of cards, so nothing hides
  behind a tab.

### Let each part own its space

- **Do:** Let the header's height and the content's padding make the space, so nothing moves when a part hides.
- **Don't:** Add space between a card's parts on the card, or add padding back when a part hides. Let each part own its
  space, so cards stay steady.

## When you can do it differently

A list that people edit inside a card, such as tasks, is the one case where a row has a button. Each row shows Edit on
hover or focus, and always on touch screens. Edit opens the same editor as the record's own page.

## Works with

Cards and tiles work with these pages:

- See [Card](../components/card.md) for the card's types and specs, for heading every card the same way, for tabs
  inside the card, and for collapsing a card with its title.
- See [Money and Numbers](../foundations/money-and-numbers.md) for how a tile's number is written.
- See [Buttons and Actions](buttons-and-actions.md) for Add in the header.
- See [Empty States](../foundations/empty-states.md) for an empty card.
- See [Tables](tables.md) for choosing a table in a card, a simple list, or a table on the page.
- See [Details](details.md) and [History](history.md) for the cards a record's page holds.

## In code

- Sections are direct children of `AppContent`: the row of tiles first, then the body. Don't wrap them in a
  `gap-4` column or space them with margins.
- A side column: a grid from a 60rem container, three quarters and one quarter, `grid-cols-[minmax(0,1fr)]` on a
  phone, `gap-4`. Build every card, the details card too, as the titled card recipe on [Card](../components/card.md).
Build every card's header as the titled card recipe on [Card](../components/card.md).

Build the stat tile in the app from plain elements with the `surface` utility from `aperia-ds5`. A bar under the
number is a `Progress` from `aperia-ds5`.

```tsx
<div className="surface flex flex-col gap-0.5 px-4 py-3">
  <span className="text-xs text-muted-foreground">Overdue Tasks</span>
  <span className="text-2xl font-semibold tabular-nums text-destructive">3</span>
  {/* An optional bar goes here, under the number. */}
  <span className="mt-auto text-xs text-muted-foreground">3 overdue</span>
</div>
```

- The red number (`text-destructive`) shows only with a label that says what it counts. An app can use its own status
  color in its place.
- Inside a card, drop `surface px-4 py-3` and keep `flex flex-col gap-0.5`, because the card is the surface.
- The line under the number has `mt-auto`, so the lines of a row of tiles stay level whether or not a tile has a bar.
- A row of tiles is a grid with `gap-4`, two columns on a phone.
- A chart's tooltip is `ChartTip` from `aperia-ds5/chart`.
