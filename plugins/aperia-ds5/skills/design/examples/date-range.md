# Date Range

A date range sets the period that a page's figures cover, or the days that a list's records fall in.

## When to use

Use a date range when a page's figures add up over a period, such as a dashboard for this quarter. Use a days filter
when a list filters its records by a date, such as when they were created.

## How it looks and behaves

A date range is one control on its own row under the page header. It never sits with the page title's buttons. It is
never a label stacked over fields.

A date control takes one of two forms:

| Form | Use when | How it looks |
|---|---|---|
| Days filter | A list filters its records by date. | One of the list's filters, set as From and To. |
| Range | A dashboard counts a period. | A dropdown of named spans. |

A range offers named spans that match how the app reports, such as This quarter, Last quarter, Year to date, Last 12
months, and All time. Custom always comes last. The default is the span people check most often, such as This quarter.
Custom shows From and To fields beside the dropdown. The figures update once both fields hold whole dates.

The page's subtitle states the span once, as text, so every figure says what it counts. The span reads like
"10/01/2026–12/31/2026", "Since 01/15/2025", or "All time".

The page's address holds the choice, so a shared link, a reload, and Back keep it. The default adds nothing to the
address.

## Before and after

- **Before:** A "Date Range:" label sits beside two hand-built date fields. Nothing under the title says which span the
  figures count.
- **After:** One dropdown offers named spans, such as This quarter. The dashboard's subtitle states the span as text.

## Rules

### Offer named spans

- **Do:** Offer the spans people report on, such as This quarter, with Custom last, so most people pick a span in one
  click.
- **Don't:** Start with two empty date fields under a "Date Range:" label. Offer the named spans, so no one types a
  date that a span already covers.

### Say the span once, as text

- **Do:** Write the span in the subtitle ("10/01/2026–12/31/2026"), so every figure says what it counts.
- **Don't:** Show the span only inside the dropdown. Say it once, as text, under the title, so the figures say what they
  count.

### Keep the choice in the address

- **Do:** Make a link or a reload open the same span, so a shared page shows the same figures.
- **Don't:** Reset the span to the default on reload. Keep the choice in the page's address, so no one reads the wrong
  figures without noticing.

## When you can do it differently

A list never takes a date range. Its days are one of its filters, so they show as a chip and clear with the others.

## Which patterns it uses

- See [Filters](../patterns/filters.md) for a list's days, From and To.
- See [Page Layout](../foundations/page-layout.md) for the subtitle under the title.
- See [Cards and Tiles](../patterns/cards-and-tiles.md) for the figures the span counts.

## In code

The app builds it from aperia-ds5 parts:

- A list's days: a `day` field in `ListToolbar`'s `filters`, set as a `between` rule.
- A dashboard's range: a `Select` of the named spans; Custom adds `DayRangeFields`, applied once both days pass
  `isDay`. The subtitle is `PageHeader`'s `subtitle`, from `dayRangeLabel` (`aperia-ds5/format`).
- Keep the choice in the URL's search params, and leave them out for the default.
