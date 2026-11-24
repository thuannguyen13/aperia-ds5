# Record Page

A record page shows one record in full with a header, tiles for its key numbers, cards for its content, and its history.

## When to use

Use a record page for every record that has a page, which is every record a list opens. People read a record here and
change it in a sheet. See [Forms in Sheets](forms-in-sheets.md) for the sheet.

## What is available

A record page stacks a header, a row of tiles, and cards, from top to bottom. Facts, history, and times inside the
cards each have a set form. A record page has six parts:

| Part | Content |
|---|---|
| Header | The record's name as the title, its picture at 48px, a subtitle that leads with its kind and number, its facts, its people, and its record actions. See [Page Header](page-header.md). |
| Tiles | One number each, on its own surface. What the tile counts sits above the number. What the number means sits below it, when that needs saying. |
| Cards | Each card has a title. Cards hold the record's details, its own content (such as what is sold), the work on it (such as tasks and notes), related records and people, and its history. |
| Facts | A label and its value side by side, with the values lined up in one column so they read down. A small label over its value is the other form. |
| History | The latest ten entries, newest first. Each entry shows the icon of its kind, what happened, when, and who, then any note in a muted box of three lines at most. View All opens every entry in a sheet. |
| Times | A relative time such as "3d ago", with the exact date on hover. The hover adds the time when the value is a moment, not a whole day. With a label it reads "Created 4mo ago". |

## How it looks and behaves

A record page stacks its header, its tiles, and its body 20px apart, like every page's sections.

The body is one column of cards, or a main column with a side column. The content decides, not the number of cards. A
record gets a side column when it has related records or people to show beside its main work. Without them, the body
is one column. The side column appears once the page is 960px wide. The main column takes three quarters and the side
column one quarter, lined up under the tiles. A phone gets one column. Cards in a grid are 16px apart.

Cards are ordered by what the user does. The main column holds the record's own content first, such as what is sold
and its details. The work on the record follows, with two short cards side by side once both fit, such as Tasks and
Notes. The side column holds related records and people, with the history card last.

An empty card keeps its place, with an empty state inside.

On a record's page, a phone number, email, or website is a link. Selecting it calls, writes, or opens the website in a
new tab. The link uses the body color and is underlined only under the pointer. In a table the same values are plain
text. See [List Page](list-page.md) for contact values in a table.

## Rules

### Stack the header, tiles, and cards in order

- **Do:** Stack the header, the row of tiles, then the cards, 20px apart, so every record reads in the same order.
- **Don't:** Put tiles or tabs inside the header, or space cards by their own margins. Keep the shared order and gap, so
  records look alike.

### Use one page of cards, not page tabs

- **Do:** Build one scrolling page of cards, with tabs that switch a card's content inside that card, so the whole
  record is in view.
- **Don't:** Split the record into views with tabs across the top of the page. Use one page of cards, so nothing hides
  behind a tab.

### Show the latest entries, with View All for the rest

- **Do:** Show the latest ten in the history card, with View All opening every entry in a scrolling sheet, so the page
  stays short.
- **Don't:** Let a long history scroll inside its card, or run the page on for screens. Show ten and View All, so the
  page stays easy to scroll.

### Write when something happened in the short relative form

- **Do:** Write when something happened as "3d ago", with the exact date on hover, so times are short and still
  checkable.
- **Don't:** Write "3 days ago" or "x days ago" differently on each page, with no exact date. Use "3d ago" with the date
  on hover, so times read the same everywhere.

## When you can do it differently

A page may skip the page header when its own content already shows the record's name as a heading. See
[Page Header](page-header.md) for how that page still ends its breadcrumb with the record's name.

## Works with

- See [Page Header](page-header.md) for the record's title, facts, people, and actions.
- See [Empty and Missing](empty-and-missing.md) for missing values and empty cards.
- See [Card](../components/card.md) for the titled cards that make up the body.

## In code

- `PageHeader` with `media={<Avatar size="xl" shape="square">…}` for a company or product, `subtitle`, `properties`,
  `RecordActions` in `menu` and other actions as outline buttons in `actions`.
- Sections are direct children of `AppContent`: `StatTile`s first (`label`, `value`, `hint`; `plain` inside a card),
  then the body. Don't wrap them in a `gap-4` column or space them with margins.
- A side column: a grid from a 60rem container, three quarters and one quarter, `grid-cols-[minmax(0,1fr)]` on a phone,
  `gap-4`. Every card is a `TitledCard`, the details card too.
- Facts: `DetailSection` with `DetailRow`s (label and value), or `Fact` for a label over its value. Missing values are
  `EmptyValue`, `NoneText`, `HiddenValue`.
- History: `RecordActivity` (`items`, `list`, `title`, `empty`, `add`, `latest` defaulting to ten) drawing a `Timeline`
  of `TimelineEntry`s with `TimelineSaid` and `TimelineWhen`. Notes are the same card, titled Notes.
- Times: `RelativeTime` (`value`, a YYYY-MM-DD day, an ISO moment or a Date; `label`), in Dallas time by default. Never
  format a relative date by hand.
