# Charts

A chart shows how numbers change over time or compare across groups, as bars or lines in a card.

## When to use

Use a chart when the shape of the numbers matters more than any one of them, such as a rise over months or the gap
between two teams. Choose by what people need to read:

| Need | Use |
|---|---|
| One number at a glance, such as Won Value | A tile. See [Cards and Tiles](cards-and-tiles.md). |
| How numbers rise, fall, or compare across groups | A chart |
| Exact figures to read, sort, or copy | A table. See [Tables](tables.md). |

## What is available

Charts come in four forms. Pick the form by the data it shows:

| Form | Data | Example |
|---|---|---|
| Bar chart | A count or an amount per period or per group, with up to three series side by side | Opportunities by Month, as created and won |
| Line chart | A rate or a running value over many periods | Win Rate by Month |
| Stacked bar chart | The parts of a whole, per period or per group | Opportunities by Month, as won, lost, and open |
| Funnel chart | How many records reach each stage of a process | Pipeline Funnel. |

A bar chart whose groups have long names, such as sales reps, lays its bars across. The names then run down the left
side.

A share of a whole is a stacked bar, never a pie or a donut. People compare the lengths of bars more exactly than the
angles of slices.

## Anatomy

A chart in a card has six parts, from the card's header down to the plot.

1. **Card header**. The title names what the chart counts and by what, such as "Opportunities by Month". The figure
   beside the title gives the chart's key number as text, such as a total.
2. **Plot**. The bars or lines, in the chart colors in order.
3. **Grid** (optional). Dashed lines run across the plot at each value label.
4. **Axes**. Labels sit in small muted text, with no axis line and no tick marks.
5. **Legend** (optional). It names each series under the plot, when the chart has two or more.
6. **Tooltip**. A small card opens over the plot with the period, then each series with its color, name, and value.

## How it looks and behaves

A chart sits in a titled card, with the plot under the card's header. The plot fills the card's width.

The series take the chart colors in order, so the first series is Chart 1 and the second is Chart 2. The app sets the
chart colors. See [Color](../styles/color.md) for the chart colors and what an app can change.

The value labels run up the left side, and the period or group labels run along the bottom. Labels follow
[Money and Numbers](../foundations/money-and-numbers.md), with amounts in full and percentages with %. On a narrow
chart, the labels get smaller and fewer. The first and last labels always show, so the axis still says what range it
covers.

Pointing at a bar or a point opens the tooltip, with a gap between each series' name and its value. A keyboard reaches
the chart with Tab and moves between periods with the arrow keys, and the tooltip follows.

The chart's key figures also show as text, so people who cannot see the plot or point at it still read them. A total
goes in the card header's figure. The page's headline numbers go in tiles above the charts.

A chart with nothing to count keeps its card and shows an empty state in place of the plot, such as "No
Opportunities". See [Empty States](../foundations/empty-states.md) for the empty state.

## Rules

### Pick the chart by the data

- **Do:** Use bars for amounts per period, a line for a rate over time, and stacked bars for parts of a whole, so the
  form fits the data.
- **Don't:** Use a pie or a donut for a share, or a line between groups that have no order. Use bars, so people compare
  lengths, not angles.

### Color the series from the chart palette, in order

- **Do:** Give the series Chart 1, Chart 2, and on, in order, so every chart in the app reads alike.
- **Don't:** Pick colors from outside the app's chart palette, a new color for each bar, or a status color for a series.
  Keep to the palette, so no color reads as a meaning it does not have.

### Name every series

- **Do:** Add a legend when a chart has two or more series, so people know which color is which.
- **Don't:** Leave colored series without a legend, or name them only in the tooltip. Name every series, so no one has
  to guess what a color means.

### Use the shared axes and grid

- **Do:** Draw the axes and the dashed grid from the chart parts, with no axis lines or tick marks, so the data is the
  loudest thing in the card.
- **Don't:** Add axis lines, tick marks, a solid grid, or slanted labels. Use the shared parts, so every chart looks the
  same.

### Give the key figures as text

- **Do:** Put the chart's key figure in the card header or in a tile beside it, such as a total, so people read it
  without pointing at the plot.
- **Don't:** Show a number only in the tooltip. Write it as text as well, so keyboard, screen reader, and phone users
  get it too.

## When you can do it differently

A chart built by hand, such as a funnel chart, follows the same rules with its own parts. It may put its legend in the
card's header. It may skip a chart color, so two parts that sit side by side stand apart. The funnel's moved-on and
lost parts are one such pair.

A chart form outside these four, such as a scatter chart, needs a case that the four cannot show. Raise the case in an
issue on aperia-ds5 before an app draws one.

## Works with

- See [Cards and Tiles](cards-and-tiles.md) for the titled card and for the tiles above the charts.
- See [Color](../styles/color.md) for the chart colors an app sets.
- See [Accessibility](../foundations/accessibility.md) for pairing every color with a word.
- See [Empty States](../foundations/empty-states.md) for a chart with nothing to count.
- See [Money and Numbers](../foundations/money-and-numbers.md) for the axis labels.

## In code

- Import the chart parts and recharts from `aperia-ds5/chart` in one line. Never install a second copy of `recharts`.
- `ChartContainer` takes a `config` that names each series and gives it a chart color in order:
  `{ created: { label: "Created", color: "var(--chart-1)" }, won: { label: "Won", color: "var(--chart-2)" } }`. A
  series then fills with `var(--color-created)`.
- On every chart, `margin={CHART_MARGIN}`, `<ChartGrid />` (`vertical` for bars laid across), `{...chartAxisProps(narrow)}`
  on every axis, and `<ChartTip />` for the tooltip. Add `<ChartLegend content={<ChartLegendContent />} />` for two
  series or more.
- Format axis amounts with `money` from `aperia-ds5/format` and give that axis `width="auto"`, so a full amount fits.
- Put the chart in the titled card from [Card](../components/card.md), in `<div className="px-4 pb-4">`. With no data,
  render `EmptyState` there instead.

```tsx
// AppCard is the app's own titled card, built once as Card shows.
<AppCard title="Opportunities by Month" figure="142">
  <div className="px-4 pb-4">
    <ChartContainer config={config} className="h-64 w-full">
      <BarChart data={months} margin={CHART_MARGIN}>
        <ChartGrid />
        <XAxis dataKey="month" {...chartAxisProps(narrow)} />
        <YAxis allowDecimals={false} {...chartAxisProps(narrow)} />
        <ChartTip />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="created" fill="var(--color-created)" radius={4} />
        <Bar dataKey="won" fill="var(--color-won)" radius={4} />
      </BarChart>
    </ChartContainer>
  </div>
</AppCard>
```

- A stacked bar gives each `Bar` the same `stackId`. A bar chart laid across is `<BarChart layout="vertical">`, with
  `<XAxis type="number">` and `<YAxis type="category">`.
- A line is `<Line type="monotone" stroke="var(--color-rate)" strokeWidth={2} dot={false} />`.
