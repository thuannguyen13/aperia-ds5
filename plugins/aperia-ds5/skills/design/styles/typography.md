# Typography

Typography defines the font, type sizes, and weights used for every heading, label, and line of text.

## When to use

Use a step of the type scale and one of the weights whenever you set text on screen. Find the text's role, such as page
title, card title, or body, under Roles in an Aperia app, and use the step and weight it names.

## What is available

Typography has one font, Inter, a type scale, and a set of weights. The library offers the whole scale and every weight below.
An Aperia app uses a few of them, one pair for each role.

### Type scale

The type scale has thirteen steps, from XS (`text-xs`) through SM, Base, LG, XL, and 2XL to 9XL (`text-9xl`). Each step
sets a font size and the line height that goes with it. An Aperia app uses four steps, XS, SM, Base, and 2XL, and SM
for most text. The live table on this page shows each step's size and line height as the browser reads them.

### Weights

The library offers four weights. Regular (`font-normal`) is for text people read, such as body text and values. Medium
(`font-medium`) is for controls and labels, such as buttons, tabs, and table headings. Semibold (`font-semibold`) is for
headings, titles, and figures. Bold (`font-bold`) appears only in the initials of the sidebar's app logo.

### Roles in an Aperia app

Each role uses one step and one weight.

| Role | Step | Weight |
|---|---|---|
| Page title | 2XL, on a taller line | Semibold |
| A stat tile's figure | 2XL | Semibold |
| Card title | Base (SM in a small card) | Semibold |
| Dialog and sheet titles | Base | Medium |
| The breadcrumb in the top bar | Base | Medium |
| Body text, muted text, and figures | SM | Regular |
| Buttons, labels, tabs, and table headings | SM | Medium |
| What a person types in a field | Base on a phone, SM on a larger screen | Regular |
| Badges and tooltips | XS | Medium |

## How it looks and behaves

The page title is the largest text on a page. Card titles are smaller, at Base. All other text is body text, with muted
text for labels and descriptions. Most text uses SM, which keeps tables and forms compact.

Names, such as titles and buttons, use Title Case, and sentences use sentence case. See [Copy](../foundations/copy.md)
for when to use each.

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

An app uses only the steps and weights the roles name. A step marked Not used is there for a need the roles do not
cover yet, and such a need is a proposal for this page.

## Works with

- See [Copy](../foundations/copy.md) for what the words say, and for the rule on Title Case and sentence case.
- See [Color](color.md) for text and muted text.
- See [Sizes](../foundations/sizes.md) for the heights the text sits in.

## In code

- `--font-sans` defaults to Inter, then the system font. The library loads no font file, so the app loads Inter, as
  [For Developers](../get-started/for-developers.md) shows. An app's own `--font-sans` wins.
- The scale and weights are Tailwind's defaults; `base.css` changes none of them. Roles as the components use them: page title `text-2xl leading-9 font-semibold tracking-tight` (`PageHeader`), stat
  figure `text-2xl font-semibold tabular-nums` (the stat tile on [Cards and Tiles](../patterns/cards-and-tiles.md)),
  card title `text-base font-semibold` (`CardTitle`, `text-sm` at `size="sm"`), dialog and sheet titles `text-base
  font-medium`, body `text-sm`, buttons, labels, tabs and table heads `text-sm font-medium`, inputs `text-base
  md:text-sm`, badges and tooltips `text-xs`.
- Use the components' own type; do not restyle headings per app. Use `tabular-nums` on figures in your own markup.
