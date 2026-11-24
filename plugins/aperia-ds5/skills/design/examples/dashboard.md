# Dashboard

A dashboard shows the figures that add up over a period, in a row of tiles above charts in cards.

## When to use

Use this layout for a page whose job is to show how numbers add up over a period, such as new opportunities this
quarter or the win rate by month. A page whose job is a list of records is a list page instead. See
[List Page](list-page.md) for that page.

## How it looks and behaves

A dashboard has four sections, 20px apart. A page header comes first, then the date range, then a row of tiles, then
the charts.

| Section | Content |
|---|---|
| Page header | The title, such as "Dashboard", and the span the figures count as its subtitle, such as "10/01/2026–12/31/2026". |
| Date range | A dropdown of named spans, such as This quarter, on its own row under the header. |
| Tiles | One number each, such as New Opportunities or Won Value, with a label above it that says what it counts. |
| Charts | Each chart in its own titled card, such as Opportunities by Month. |

Every tile and every chart counts the span that the date range sets. A new span updates the subtitle, the tiles, and
the charts together. Amounts show in full, such as $2,400,000. See [Charts](../patterns/charts.md) for each chart and
for a chart with nothing to count in the span.

On a wide screen, four tiles sit in a row, and two chart cards sit side by side once the page's content is 960px
wide. Cards are 16px apart. On a phone, the tiles sit two to a row, and the charts stack in one column. The date range
keeps its own row under the header.

## Before and after

- **Before:** Each chart card has its own span picker in its header, so two numbers on one page count different
  months. Nothing under the title says which span a figure counts.
- **After:** One date range under the header sets the span for every tile and chart. The subtitle states that span
  once, as text.

## Rules

Each part's rules live on its pattern page, listed under Which patterns it uses. One rule belongs to the dashboard
itself.

### Count one span on the whole page

- **Do:** Let the page's one date range set the span of every tile and chart, so people can compare any two figures on
  the page.
- **Don't:** Give a chart card its own span picker, or show tiles for this quarter beside a chart for the last 12
  months. Count one span, so no two figures on the page disagree without a word.

## When you can do it differently

A dashboard whose figures all count what stands today, such as open tasks, has no date range. Its subtitle says what
the figures count instead, such as "Open work as of today".

## Which patterns it uses

- See [Page Header](../patterns/page-header.md) for the title and the subtitle.
- See [Date Range](date-range.md) for the named spans and the span in the subtitle.
- See [Cards and Tiles](../patterns/cards-and-tiles.md) for the tiles and the chart cards.
- See [Charts](../patterns/charts.md) for which chart to draw, its colors, its legend, and a chart with nothing to
  count.
- See [Money and Numbers](../foundations/money-and-numbers.md) for amounts and percentages in tiles.
- See [Funnel Chart](funnel-chart.md) for a chart that shows how records move through stages.
- See [Page Layout](../foundations/page-layout.md) for the 20px between sections.

## In code

The app builds the page from aperia-ds5 parts and the recipes on the pattern and component pages, inside
`AppContent`:

- `PageHeader` with `title` and a `subtitle` from `dayRangeLabel` (`aperia-ds5/format`), or "All time".
- The date range on its own row, as on [Date Range](date-range.md): a `Select` of the named spans, with
  `DayRangeFields` for Custom. Keep the choice in the URL's search params.
- Tiles: the stat tile from [Cards and Tiles](../patterns/cards-and-tiles.md) in a grid,
  `grid grid-cols-2 gap-4 @min-[48rem]:grid-cols-4`. Amounts from `money`, rates from `percent`
  (`aperia-ds5/format`).
- Charts: each drawn in its titled card as on [Charts](../patterns/charts.md), in a grid,
  `grid grid-cols-[minmax(0,1fr)] gap-4 @min-[60rem]:grid-cols-2`.
- Each section is a direct child of `AppContent`, with no wrapper and no margins.
