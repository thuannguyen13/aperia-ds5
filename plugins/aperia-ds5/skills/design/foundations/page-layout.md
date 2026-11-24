# Page Layout

Page layout sets the order, spacing, and alignment of the sections inside a page.

## When to use

Use this layout on every page.

## What is available

A page has a page header and the sections under it. The page header always comes first and holds the page's title,
actions, and facts. See [Page Header](../patterns/page-header.md) for its parts.

Sections follow in the order the page needs them, such as stat tiles, a toolbar, cards, a table, or a board.

A page has one of two widths:

| Width | Use when |
|---|---|
| Centered column, up to 1440px wide | Most pages |
| Full width of the window beside the sidebar | A board or a wide list table |

## How it looks and behaves

A page follows five layout rules for spacing, scrolling, width, alignment, and the space inside a card.

The page column has 20px of space around it and 20px between its sections. Cards or tiles side by side are 16px apart.
This gap is smaller than the gap between sections, because a card already has space inside it.

The whole page scrolls as one. No part of the page has a scroll of its own, because a part that scrolls catches the
mouse wheel. A long list on a page, such as a record's history, shows its latest ten entries. View All opens a sheet
with every entry. See [History](../patterns/history.md) for the history card.

The column narrows with the window. A page lays itself out by the width it gets, such as tiles in one row on a wide
screen and stacked tiles on a phone.

Content and box edges line up across containers, to the pixel. Three cases apply inside a card:

- Everything in a card starts on the card title's line, 16px in from the card's edge. This includes a table's first
  column, a list's pictures, and a form's labels.
- A part with its own padding, such as a row that highlights under the pointer or a ghost button, is pulled back onto
  that line. Its text sits on the line, and its highlight reaches past it.
- Rows divided to a card's edges, such as a table's rows, keep the 16px inside each row. Their text lines up with the
  title, and the lines between rows run edge to edge.

A card's header, content, and footer each hold their own space, so a part that hides takes its space with it and
nothing else in the card moves. See [Card](../components/card.md) for the card's parts.

## Rules

### Space sections evenly

- **Do:** Space every section of a page 20px apart (a page header, a toolbar, and a card), so pages share one rhythm.
- **Don't:** Let sections touch (a title against a search box) or space them by a margin each page picks. Use the 20px
  gap, so every page has the same spacing.

### Keep one scroll

- **Do:** Let the page scroll as one. Show a long list's latest entries, with View All opening every entry in a sheet,
  so the mouse wheel always moves the page.
- **Don't:** Put a box on the page that scrolls on its own. Show the latest entries and open the full list in a sheet,
  so the wheel never gets trapped.

### Put content on its title's line

- **Do:** Start a card's rows, pictures, and labels exactly where its title starts, so the content lines up.
- **Don't:** Let a part's own padding push content a few pixels past the title, or stack boxes whose content starts a
  few pixels apart. Align to the title, so edges line up.

### Indent only to show hierarchy

- **Do:** Indent only to show hierarchy (a reply under its comment, a field under the checkbox that reveals it), so an
  indent always means something.
- **Don't:** Keep an indent left by a part's own padding. Remove it, so people do not read a hierarchy that is not
  there.

## When you can do it differently

A board, or a list table wider than the column, fills the full width beside the sidebar instead of the 1440px column.
Items that always show together, such as buttons in a row or a title and its count, can have a gap between them.

## Works with

- See [App Shell](../patterns/app-shell.md) for the frame the page column sits in.
- See [Page Header](../patterns/page-header.md) for the first section of every page.
- See [List Page](../examples/list-page.md) and [Record Page](../examples/record-page.md) for the two kinds of page.
- See [Copy](copy.md) for hiding internal labels, such as "MVP" or "Demo Data", from users.

## In code

- `AppContent` from `aperia-ds5`, inside `AppHeader`, wraps every page: the one scroll, `p-5` around a column centered
  up to `max-w-360` (1440px) with `gap-5` between its children. Make each section a direct child: no margins, and no
  second `gap` wrapper. A page that fills the pane renders `<FullWidth />` anywhere in its markup. Never build this
  wrapper by hand (`max-w-…`, `mx-auto`, `p-5` in the layout).
- The column is a container: lay a page out by its width with container queries (`@min-[48rem]:grid-cols-4`), not
  the window's.
- Lining up in a card (`CardContent` is `px-4`): `<Item className="-mx-3">` cancels `Item`'s own `px-3`; a section whose
  divider runs to the card's edges is `-mx-4 px-4`; rows divided to the edges straight in a titled card
  ([Card](../components/card.md)) carry `px-4` themselves (`<Item className="px-4">` in an `ItemGroup` with no wrapper);
  a table's first and last cells are `pl-4` and `pr-4`. A ghost button beside a heading takes −6px top and bottom, so
  the heading sets the row's height.
- Work each x out from the real classes (padding plus border plus gap), write the shared lines in a one-line comment,
  then measure them in the browser (`getBoundingClientRect`).
- Don't put `gap` or `space-y` on a card or panel to space its parts; a gap is fine between items that always show
  together.
