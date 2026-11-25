# Typography

Typography sets the font, size, and weight of every heading, label, and line of text, from one scale. See
[Copy](../foundations/copy.md) for what the words say and how they are capitalized, and [Sizes](../foundations/sizes.md)
for the heights the text sits in.

## What is available

Typography has one font, a type scale, and a set of weights. The font is Inter when the app loads it, and a sans serif font
the device provides when it does not. The library offers the whole scale and every weight below. An Aperia app uses a few of
them, one pair for each role.

### Type scale

The type scale has thirteen steps, from XS through SM, Base, LG, XL, and 2XL to 9XL. Each step sets a font size and the
line height that goes with it. The tokens are `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`,
`text-3xl`, `text-4xl`, `text-5xl`, `text-6xl`, `text-7xl`, `text-8xl`, and `text-9xl`.

An Aperia app uses four steps, XS, SM, Base, and 2XL, and SM for most text. The other nine steps are not used.

### Weights

The library offers four weights. Regular (`font-normal`) is for text people read, such as body text and values. Medium
(`font-medium`) is for controls and labels, such as buttons, tabs, and table headings. Semibold (`font-semibold`) is for
headings, titles, and figures. Bold (`font-bold`) appears only in the initials of the sidebar's app logo.

### Roles in an Aperia app

A role is a kind of text, such as a page title or a button's label. Each role uses one step and one weight. To set text,
find its role and use the step and weight the role names.

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

The page title is the largest text on a page. Most text is body text at SM, which keeps tables and forms compact.

Muted text, in gray, is for labels, descriptions, and hints. Values a person reads use the body color. See
[Color](color.md) for the muted text color.

## Rules

### 1. Use only the steps and weights the roles name

Every piece of text takes the step and weight of its role, so the same kind of text looks the same on every screen. A
need the roles do not cover is a proposal for this page, not a size set in one place.

- **Do:** Set a label in SM and Medium, as a button's or a tab's label is.
- **Don't:** Set a label in LG or Bold, or write a size outside the scale, such as `text-[13px]`.

### 2. Set card titles a step below the page title

A card title is semibold and sits one step below the page title among the steps an app uses. The page then has one top
heading.

- **Do:** Set a card title in Base and semibold, under a page title in 2XL.
- **Don't:** Make a card title as large as the page title, or set it in Medium.

### 3. Line up figures

Figures in tables and tiles use tabular numbers, which are digits of equal width, so amounts in a column sit under each
other and people can compare them.

- **Do:** Set a column of amounts in tabular numbers, such as $1,111,111 above $8,000,000.
- **Don't:** Leave figures in proportional digits, whose widths differ, so the amounts drift out of line.

## In code

- `--font-sans` defaults to Inter, then the system font. The library loads no font file, so the app loads Inter, as
  [For Developers](../get-started/for-developers.md) shows. An app's own `--font-sans` wins.
- The scale and weights are Tailwind's defaults; `base.css` changes none of them. Roles as the components use them: page title `text-2xl leading-9 font-semibold tracking-tight` (`PageHeader`), stat
  figure `text-2xl font-semibold tabular-nums` (the stat tile on [Cards and Tiles](../patterns/cards-and-tiles.md)),
  card title `text-base font-semibold` (`CardTitle`, `text-sm` at `size="sm"`), dialog and sheet titles `text-base
  font-medium`, body `text-sm`, buttons, labels, tabs and table heads `text-sm font-medium`, inputs `text-base
  md:text-sm`, badges and tooltips `text-xs`.
- Use the components' own type; do not restyle headings per app. Use `tabular-nums` on figures in your own markup.
