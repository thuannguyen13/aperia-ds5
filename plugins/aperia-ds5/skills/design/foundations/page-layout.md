# Page Layout

Page layout fixes the order, spacing, and alignment of the sections in a page, so people find the same things in the same place on every page. See [Scaffold](scaffold.md) for the regions around the page column.

## Anatomy

A record's page has four parts, stacked inside the page column, which is the centered area under the top bar. Only the page header and the main column show on every page. The parts are those of a record's page with tiles and a side column.

1. **Page header**. It is the first part of every page. It holds the page's title, its actions, and its key facts. See [Page Header](../patterns/page-header.md) for its parts.
2. **Tiles** (optional). They are a row of boxes under the page header. Each tile shows one number that people check at a glance, such as Open Tasks.
3. **Main column**. It is the wider column of cards under the tiles. It holds the page's own content and its work, such as Details and Tasks.
4. **Side column** (optional). It is a narrow column of cards at the page's right edge. It holds related records and people, such as Contacts.

## What is available

The page column has one of two widths:

| Width | Use when |
|---|---|
| Centered column, up to `max-w-360` wide | Most pages |
| Full width of the window beside the sidebar | A board, or a list table wider than the column |

## How it looks and behaves

The page column has `p-5` around it. Its parts stack in one order. The page header comes first. After it come the sections the page needs, in the order of its work. A record's page puts a row of tiles next, then its cards. A list page puts a toolbar next, then its table or board.

The cards under the tiles sit in one column, or in two columns called the main column and the side column. On a wide page the main column takes three quarters of the width and the side column one quarter. On a phone the page has one column. See [Screen Sizes](screen-sizes.md) for the widths at which a page changes, and [Cards and Tiles](../patterns/cards-and-tiles.md) for the order of the cards.

The whole page scrolls as one. A long list on a page, such as a record's history, shows its latest ten entries, and View All opens a sheet with every entry. See [History](../patterns/history.md) for the history card.

The column narrows with the window. A page lays itself out by the width it gets, such as tiles in one row on a wide screen and stacked tiles on a phone.

Content and box edges line up across containers, to the pixel. Two cases need care inside a card:

- A part with its own padding, such as a row that highlights under the pointer or a ghost button, is pulled back onto the title's line. Its text sits on the line, and its highlight reaches past it. The same holds at a row's right end, where an icon button's padding reaches past the line and the icon ends on it. See [Spacing](spacing.md) for the gap before it.
- Rows divided to a card's edges, such as a table's rows, keep the `px-4` inside each row. Their text lines up with the title, and the lines between rows run edge to edge.

## Rules

### 1. Start every page with its page header

A page's first part is its page header, which holds the page's title, so people see which page they are on before anything else. A page may skip the page header when its content already names the record in a heading. See [Page Header](../patterns/page-header.md) 1 for that case.

- **Do:** Put the page header above a board's toolbar, so the board has its title.
- **Don't:** Open a page with a toolbar, tiles, or a card, or leave a page without a title.

### 2. Space sections evenly

Parts of a page, such as its page header, toolbar, and cards, are `gap-5` apart, so every page has the same rhythm.

- **Do:** Space the page header, the search box, and the card `gap-5` apart.
- **Don't:** Let sections touch, such as a title against a search box, or space them with a margin each page picks.

### 3. Space cards closer than sections

Cards or tiles side by side are `gap-4` apart. This gap is smaller than the gap between sections, because a card already has space inside it.

- **Do:** Put `gap-4` between Details and Tasks, and between tiles in a row.
- **Don't:** Space two cards side by side `gap-5`, so they read as separate sections.

### 4. Put the page's own work in the main column

The main column holds the page's own content and its work. The side column holds related records and people, so people read the work first and find the context beside it. A page gets a side column only when it has such related items.

- **Do:** Put Details and Tasks in the main column and Contacts in the side column.
- **Don't:** Put the page's own work in the side column, or add a side column for cards that are the page's own content.

### 5. Keep one scroll

The page scrolls as one, so the mouse wheel always moves the page. A part with a scroll of its own catches the wheel.

- **Do:** Show a long list's latest entries, and open every entry in a sheet with View All.
- **Don't:** Put a box on the page that scrolls on its own.

### 6. Put content on its title's line

Everything in a card starts on the card title's line, `px-4` in from the card's edge, so edges line up. That includes a table's first column, a list's pictures, and a form's labels. An indent past that line shows a hierarchy and nothing else.

- **Do:** Start a card's rows, pictures, and labels where its title starts. Indent a reply under its comment, or a field under the checkbox that reveals it.
- **Don't:** Let a part's own padding push content a few pixels past the title, or stack boxes whose content starts a few pixels apart. People would read an indent that means nothing.

### 7. Let each part carry its own padding

A card's header, content, and footer each carry the padding they need, so a part that hides takes its space with it and nothing else in the card moves. See [Card](../components/card.md) for the card's parts. Items that always show together, such as buttons in a row or a title and its count, can have a gap between them.

- **Do:** Pad each part itself, so a collapsed card leaves no empty band.
- **Don't:** Space a card's parts with a `gap` or `space-y` on the card, because the space stays when a part hides.

## In code

- `AppContent` from `aperia-ds5`, inside `AppHeader`, wraps every page: the one scroll, `p-5` around a column centered
  up to `max-w-360` (1440px) with `gap-5` between its children. Make each section a direct child: no margins, and no
  second `gap` wrapper. A page that fills the whole width renders `<FullWidth />` anywhere in its markup. Never build this
  wrapper by hand (`max-w-…`, `mx-auto`, `p-5` in the layout).
- The column is a container: lay a page out by its width with container queries (`@min-page-md:grid-cols-4`), not
  the window's.
- Lining up in a card (`CardContent` is `px-4`): `<Item className="-mx-3">` cancels `Item`'s own `px-3`; a section whose
  divider runs to the card's edges is `-mx-4 px-4`; rows divided to the edges straight in a titled card
  ([Card](../components/card.md)) carry `px-4` themselves (`<Item className="px-4">` in an `ItemGroup` with no wrapper);
  a table's first and last cells are `pl-4` and `pr-4`. A ghost button beside a heading takes −6px top and bottom, so
  the heading sets the row's height.
- Work each x out from the real classes (padding plus border plus gap), write the shared lines in a one-line comment,
  then measure them in the browser (`getBoundingClientRect`).
- Do not put `gap` or `space-y` on a card or panel to space its parts; a gap is fine between items that always show
  together.
