# Date Range and Report Date

A date control sets the day or the period that a page's figures cover.

## When to use

Use a date control on a page whose figures count over one day or over a period. Use a report date when the figures are a
snapshot of a single day, such as a work queue on a given day. Use a date range when the figures add up over a period,
such as a dashboard for this quarter. Use a days filter when a list filters its records by a date, such as when they
were created.

## How it looks and behaves

A date control is one control in the page's toolbar. It never sits with the page title's buttons. It is never a label
stacked over a field.

A date control takes one of three forms:

| Form | Use when | How it looks |
|---|---|---|
| Days filter | A list filters its records by date. | One of the list's filters, set as From and To. |
| Report date | The figures count one day. | The first control in the list's toolbar, before a saved view's picker. It is an outlined button with a calendar icon, "Report Date" in muted text, and the date written MM/DD/YYYY. |
| Range | A dashboard counts a period. | A dropdown of named spans. |

On a phone, the report date hides the words "Report Date" and keeps them for screen readers only. Selecting the report
date opens a calendar. Picking a day closes the calendar.

A range offers named spans that match how the app reports, such as This quarter, Last quarter, Year to date, Last 12
months, and All time. Custom always comes last. The default is the span people check most often, such as This quarter.
Custom shows From and To fields beside the dropdown. The figures update once both fields hold whole dates.

The page's subtitle states the span once, as text, so every figure says what it counts. The span reads like
"10/01/2026–12/31/2026", "Since 01/15/2025", or "All time".

The page's address holds the choice, so a shared link, a reload, and Back keep it. The default adds nothing to the
address.

## Before and after

- **Before:** A "Report Date:" label sits beside a date field, hand-built in the toolbar. Nothing under the title says
  which day the figures count.
- **After:** One outlined button reads "Report Date 11/22/2026" and opens a calendar. The dashboard's subtitle states
  the span as text.

## Rules

### Put the day in the toolbar

- **Do:** Put the report date, or the range, as a control in the page's toolbar ("Report Date 11/22/2026"), so people
  find it beside the other controls that change the figures.
- **Don't:** Put a date picker among the page title's buttons, or stack a "Report Date:" label with its field. Make it
  one control in the toolbar, so people find it where they look.

### Say the span once, as text

- **Do:** Write the span in the subtitle ("10/01/2026–12/31/2026"), so every figure says what it counts.
- **Don't:** Show the span only inside the dropdown. Say it once, as text, under the title, so the figures say what they
  count.

### Keep the choice in the address

- **Do:** Make a link or a reload open the same span, so a shared page shows the same figures.
- **Don't:** Reset the span to the default on reload. Keep the choice in the page's address, so no one reads the wrong
  figures without noticing.

## When you can do it differently

A date control has no exceptions.

## Which patterns it uses

- See [List Toolbar](../patterns/list-toolbar.md) for the toolbar and the place of a report date in it.
- See [Filters](../patterns/filters.md) for a list's days, From and To.
- See [Page Layout](../foundations/page-layout.md) for the subtitle under the title.
- See [Cards and Tiles](../patterns/cards-and-tiles.md) for the figures the span counts.

## In code

The app builds it from aperia-ds5 parts:

- A list's days: a `day` field in `ListToolbar`'s `filters`, set as a `between` rule.
- A report date: in `ListToolbar`'s `start`, an outline `Button` with `CalendarIcon`,
  `<span className="text-muted-foreground max-sm:sr-only">Report Date</span>` and the date (`formatDate`,
  `tabular-nums`), as the trigger of a `Popover` with `Calendar mode="single"`; `onSelect` closes it.
- A dashboard's range: a `Select` of the named spans; Custom adds `DayRangeFields`, applied once both days pass
  `isDay`. The subtitle is `PageHeader`'s `subtitle`, from `dayRangeLabel` (`aperia-ds5/format`).
- Keep the choice in the URL's search params, and leave them out for the default.
