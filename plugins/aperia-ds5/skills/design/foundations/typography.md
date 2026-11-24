# Typography

Typography defines the font, type sizes, and weights used for every heading, label, and line of text.

## When to use

Use a type step whenever you set text on screen. Pick the step by the text's role, such as page title, card title, or
body, not by the size you want.

## What is available

Typography has eight steps.

| Step | Size and weight | Where you see it |
|---|---|---|
| Page title | The largest step, semibold | The title at the top of every page, and the figure in a stat tile |
| Card title | Large, semibold (one step smaller in a small card) | Every card's header |
| Panel title | Large, medium weight | Dialog and sheet titles |
| Top bar | Large, medium weight | The breadcrumb |
| Body | The base step, regular | Table cells, descriptions, menu items, and most text |
| Control text | The base step, medium weight | Buttons, labels, tabs, and table headings |
| Field text | One step larger on a phone than on larger screens | What a person types in a field |
| Small | The smallest step | Badges and tooltips |

The live specimen on this page shows each step's size, line height, and weight as the browser reads them.

Typography uses three weights. Regular is for reading. Medium is for controls and labels. Semibold is for headings,
titles, and figures.

Every Aperia app uses the Inter font.

## How it looks and behaves

The page title is the largest text on a page. Card titles are one step below it. All other text is body text, with
muted text for labels and descriptions. Most text uses the base step, which keeps tables and forms compact.

Names, such as titles and buttons, use Title Case, and sentences use sentence case. See [Copy](copy.md) for when to
use each.

Figures in tables and tiles use tabular numbers, which are digits of equal width. Amounts in a column then sit under
each other.

Muted text, in gray, is for labels, descriptions, and hints. Values a person reads use the body color.

## Rules

### Set card titles a step below the page title

- **Do:** Set card titles semibold and smaller than the page title, so the page has one top heading.
- **Don't:** Make a section title as large as the page title, or set a card title in medium weight. Use the card's own
  title, so people see which heading leads.

### Line up figures

- **Do:** Set amounts and counts in tables and tiles in tabular numbers, so figures line up for comparing.
- **Don't:** Set figures in proportional digits. Use tabular numbers, so a column of amounts lines up.

## When you can do it differently

Typography has no exceptions. Every app uses these steps, weights, and font.

## Works with

- See [Copy](copy.md) for what the words say, and for the rule on Title Case and sentence case.
- See [Color](color.md) for text and muted text.
- See [Sizes](sizes.md) for the heights the text sits in.

## In code

- The library sets no font. It uses `--font-sans`, which the app sets on `<html>`. Sales Portal, for example, loads
  Inter with `next/font/google` (`variable: "--font-sans"`). Without it, text falls back to whatever the page inherits.
- Steps as the components use them: page title `text-2xl leading-9 font-semibold tracking-tight` (`PageHeader`), stat
  figure `text-2xl font-semibold tabular-nums` (`StatTile`), card title `text-base font-semibold` (`CardTitle`,
  `text-sm` at `size="sm"`), dialog and sheet titles `text-base font-medium`, body `text-sm`, buttons, labels, tabs and
  table heads `text-sm font-medium`, inputs `text-base md:text-sm`, badges and tooltips `text-xs`.
- Use the components' own type; do not restyle headings per app. Use `tabular-nums` on figures in your own markup.
