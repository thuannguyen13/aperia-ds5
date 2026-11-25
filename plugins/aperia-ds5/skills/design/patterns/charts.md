# Charts

Charts let people see how numbers change over time or compare across groups. See [Cards and Tiles](cards-and-tiles.md)
for the card a chart sits in.

## Anatomy

A bar chart in a card has six parts. The grid and the legend show only sometimes, and the tooltip opens only while
someone points at the plot.

1. **Card header**. It is the top row of the card that holds the chart. Its title names what the chart counts and by
   what, such as "Opportunities by Month". The figure beside the title gives the chart's key number as text, such as a
   total.
2. **Plot**. It is the area that draws the data, as bars or lines in the chart colors in order.
3. **Grid** (optional). It is a set of dashed lines across the plot, one at each value label.
4. **Axes**. They are the two rows of labels along the plot, with values up the left side and periods or groups along
   the bottom. The labels use small muted text, with no axis line and no tick marks.
5. **Legend** (optional). It is a row under the plot that names each series beside its color. It shows when the chart
   has two or more series.
6. **Tooltip**. It is a small card that opens over the plot when someone points at a bar or a point. It lists the
   period, then each series with its color, name, and value, with a gap between a name and its value.

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
| Funnel chart | How many records reach each stage of a process | Pipeline Funnel |

A bar chart whose groups have long names, such as sales reps, lays its bars across. The names then run down the left
side.

A funnel chart is built by hand, with its own parts, and follows the same rules as the other forms.

A chart form outside these four, such as a scatter chart, needs a case that the four cannot show. Raise the case in an
issue on aperia-ds5 before an app draws one.

## How it looks and behaves

A chart sits in a titled card, with the plot under the card's header. The plot fills the card's width.

The app sets the chart colors. See [Color](../styles/color.md) for the chart colors and what an app can change.

Labels follow [Money and Numbers](../foundations/money-and-numbers.md), with amounts in full and percentages with %. On
a narrow chart, the labels get smaller and fewer. The first and last labels always show, so the axis still says what
range it covers.

A keyboard reaches the chart with Tab and moves between periods with the arrow keys, and the tooltip follows.

A chart with nothing to count keeps its card and shows an empty state in place of the plot, such as "No
Opportunities". See [Empty States](../foundations/empty-states.md) for the empty state.

## Rules

### 1. Draw shares and groups as bars

A share of a whole is a stacked bar, never a pie or a donut, because people compare the lengths of bars more exactly
than the angles of slices. A line joins points that have an order, so groups with no order use bars.

- **Do:** Show won, lost, and open as one stacked bar for each month.
- **Don't:** Use a pie or a donut for a share, or a line across groups with no order, such as sales reps.

### 2. Color the series from the chart palette, in order

The series take Chart 1, Chart 2, and on, in order. Every chart in the app then reads alike, and no color reads as a
meaning it does not have. A funnel chart may skip a chart color, so two parts that sit side by side stand apart, such
as the moved-on part and the lost part.

- **Do:** Give Created Chart 1 and Won Chart 2 in every chart that shows them.
- **Don't:** Pick a color outside the app's chart palette, a new color for each bar, or a status color for a series.

### 3. Name every series

A chart with two or more series has a legend, so people know which color is which. A funnel chart may put its legend in
the card's header.

- **Do:** Add a legend under the plot when the chart shows Created and Won.
- **Don't:** Name the series only in the tooltip, where people must point at the plot to learn what a color means.

### 4. Use the shared axes and grid

Every chart draws its axes and its dashed grid from the chart parts, so every chart looks the same and the data is the
loudest thing in the card.

- **Don't:** Add axis lines, tick marks, a solid grid, or slanted labels.

### 5. Give the key figures as text

A chart's key figure shows as text as well as in the tooltip, so keyboard, screen reader, and phone users read it too. A
total goes in the card header's figure. The page's headline numbers go in tiles above the charts.

- **Do:** Put the total beside the title, such as "94 created".
- **Don't:** Show a number only in the tooltip.

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
