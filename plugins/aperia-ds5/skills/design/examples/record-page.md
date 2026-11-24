# Record Page

A record page shows one record under a page header, with its numbers in tiles and its content in cards.

## When to use

Use this layout for every record that has a page, such as a prospect, an opportunity, or a merchant.

## How it looks and behaves

A record page has three sections. A header comes first. A row of tiles with the record's numbers follows. Cards fill the
rest. The page puts 20px between these sections, and no other spacing separates them.

The header contains five parts:

| Part | Content |
|---|---|
| Title | The record's name, with its 48px picture before it when the record has one. |
| Subtitle | The record's kind and number, such as "Opportunity #659", then the record it belongs to when it has one. |
| Facts | Labeled facts in a row, each label above its value. People show as a small stack of pictures. |
| Record actions | Edit, the record's other actions, then Delete, at the end of the title's line. |
| Actions | Further actions, such as Send Email, as outlined buttons beside the record actions. |

On a narrow screen, the record actions fold into More Actions.

The body is one column of cards, or a main column with a side column. The content decides, not the number of cards. A
record gets a side column when it has related records or people to show beside its main work. Without them, the body is
one column. The side column appears once the page's content is 960px wide. The main column takes three quarters of the
width, and the side column takes one quarter. Both line up under the tiles. A phone shows one column. Cards in a grid
are 16px apart.

Cards are ordered by what the user does:

| Column | Cards, in order |
|---|---|
| Main | The record's own content first, such as what is sold and its details. The work on the record follows, with Tasks beside Notes once both fit. |
| Side | Related records and people, with Activity last. |

Every card has the same titled header, the details card included. An empty card keeps its place and shows an empty
state.

The record is one scrolling page of cards, without page tabs. Tabs that switch a card's content go inside that card.

## Before and after

- **Before:** Facts sit beside the title as labels with colons, such as "MID:" and "MCC:". A card draws its own heading
  with a link, such as "View Alert History". Each row of the card has a solid status button and a link to related
  records, such as "View Alerted Merchants".
- **After:** The facts show as labels above values under the title. The record's actions sit at the end of its line.
  Every card is headed the same way, with its action as a button in the header.

## Rules

Each part's rules live on its pattern page, listed under Which patterns it uses.

## When you can do it differently

A page that names its record in its own content, instead of a page header, still puts the record's name in the
breadcrumb's last crumb. See [Page Header](../patterns/page-header.md) for the breadcrumb.

## Which patterns it uses

- See [Record Page](../patterns/record-page.md) for the header, actions, and history.
- See [Page Layout](../patterns/page-layout.md) for sections 20px apart.
- See [Cards and Tiles](../patterns/cards-and-tiles.md) for titled cards, tiles, and empty cards.
- See [Notes on a Record](notes.md), [Line Items With Totals](line-items.md), and [Task Checklist](task-checklist.md)
  for examples of cards on a record.

## In code

The app builds it from aperia-ds5 parts, inside `AppContent`:

- `PageHeader`: `title`, `media` (`<Avatar size="xl">`, `shape="square"` for a company), `subtitle` ("Opportunity #659 ·
  Northwind Payments"), `properties` (label and value pairs, people as `PeopleStack`), `menu={<RecordActions … />}` and
  outline buttons in `actions`.
- Tiles and the body are direct children of `AppContent`. Tiles: `StatTile`s in a grid. A side column: a grid that is
  `grid-cols-[minmax(0,1fr)]` and, from `@min-[60rem]`, four columns (main `col-span-3`, side one), `gap-4`.
- Every card is `TitledCard`, including the details (`DetailSection`, `DetailRow`, or `Fact`); empty cards hold
  `EmptyState`. History is `RecordActivity`.
