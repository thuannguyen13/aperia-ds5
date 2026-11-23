# Card

A card is a white box that groups one kind of content on a page: a record's details, its tasks, a chart. Cards sit on
the light grey page.

## When to use

- To group content that belongs together and has a name: Details, Tasks, Recent Activity.
- Not for a whole page. A list page's table sits on the page in its own surface; it isn't a card inside a card.
- Not inside another card. A card never holds a second bordered box.

## Parts

- **Header**, one line: the title, an optional figure such as a count, and an optional action such as Add.
- **Content:** a table, a list, fields or a chart.
- **Footer**, when there is one: a light grey band under a hairline.

Each part carries its own space: the header its height, the content its padding. The card adds none between them, so
when the content is hidden the header stays exactly as it was.

## Types

### Titled card

Every card in an Aperia app has a titled header. Because every header is the same height, the first lines of cards side
by side line up.

### Collapsible card

A card whose content can be hidden. The title and a chevron (⌄) form one button that opens and closes it.

### Small card

Tighter padding (12px instead of 16px) and a smaller title.

## Rules

### Head every card the same way

- **Do:** the title, a count and the action on one line, with the same height on every card.
- **Don't:** a card that draws its own header, or a title as large as the page title.

### A table runs to the card's edges

- **Do:** the table fills the card's width and reaches its bottom edge. The column headings sit straight under the card
  header, with no line between them.
- **Don't:** a bordered table boxed inside the card, or a line between the header and the table.

### Hide content with the title, not text buttons

- **Do:** the title and chevron open and close the card.
- **Don't:** "Show" and "Hide" buttons.

### Tabs go inside the card

- **Do:** tabs that switch a card's content sit inside it, under its header.
- **Don't:** tabs floating above the card.

### An empty card keeps its place

- **Do:** the card stays, with an empty state inside, so nothing shifts when records arrive.
- **Don't:** a card that disappears when it has nothing to show.

## Works with

- **Button:** Add sits in the header. While the card is empty, Add moves to the middle of the empty state instead.
- **Table:** runs flush to the card's edges, with no top border.
- **Empty State:** fills an empty card.
- **Tabs:** inside the card, under its header.
- **Page header:** the page title is larger; a card's title is a step below it.

## Accessibility

- A card's title is a heading (level 2), so screen reader users can jump between cards.
- A collapsible card's title is a button that says whether it's open, and which content it controls.

## Specs

| | Default | Small |
|---|---|---|
| Corners | 14px | 14px |
| Padding | 16px | 12px |
| Fill | Card (white in light mode) | |
| Edge | 0.5px border edge and a small shadow | |
| Title | 16px, semibold | 14px, semibold |
| Header | 56px: 12px above and below a 32px row, so cards side by side line up | |
| Content | Its own padding, 16px; a table has none and runs to the edges | |

## In code

- `TitledCard` (`assets/components/titled-card.tsx`) for every card: `title`, `figure`, `action`, `collapsible` and
  `defaultOpen`. A table goes straight inside; other content goes in `<CardContent className="pb-4">`, which brings
  its own padding. Don't add `gap`, `space-y` or vertical padding to the card: each part owns its space.
- It's built on `Card` from `aperia-ds5` (`size="sm"` for the small card). Use the `surface` utility for your own box
  that should look like a card.
