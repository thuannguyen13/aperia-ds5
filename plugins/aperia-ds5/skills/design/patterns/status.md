# Status

A status shows the state a record is in, such as Draft, Active, or Overdue, as a word in a badge.

## When to use

Use a status wherever a record has a state that people check, filter by, or act on, such as a prospect's stage or a
task that is overdue. A value that is not a state, such as an amount or a date, shows as plain text.

## What is available

A status comes in three forms:

| Form | Look | Use when |
|---|---|---|
| Plain badge | The state's word in a pill with the outline look, in the body color | A state with no color of its own, such as one stage among many |
| Colored badge | The state's word in a pill with the state's pale fill and deep text | A state people must notice, such as Overdue, Active, or Closed |
| Dot and word | A small dot in the state's deep color, then the word in body text | A condition inside a line of text or a dense cell, such as "2 failed" in an import's summary |

A status sits in one of four places, and each place has one form of it:

| Place | How the status shows |
|---|---|
| Table | Its own column, named after the field, such as Stage or Status, with a badge in each cell |
| Page header | A property under the title, with its label over the badge |
| Card | A badge after the item's name, such as a task's Overdue |
| Board | A badge in each column's header, since every card in the column shares the state |

## How it looks and behaves

A status always names the state in a word. The color helps people find a state at a glance, and the word says what it
is. See [Accessibility](../foundations/accessibility.md) for why color is never the only signal.

Each state has one word, one color, and one form in the whole app. A table, the record's page header, a card, and a
board column show the same badge for the same state. Overdue, for example, is always its badge, never red text or a red
date.

An app colors only the states that need attention and shows the others as plain badges. It picks one status pair for
each colored state by what the state means, as in these examples:

| Status pair | Example states |
|---|---|
| Gray | Draft, Not Started, Closed |
| Blue | In Progress, Scheduled |
| Green | Active, Won, Done |
| Amber | Needs Review, Expiring |
| Red | Overdue, Failed, Lost |

The app sets its status pairs and their Dark values. The library ships none. See [Color](../styles/color.md) for what an
app can change.

A status that people can change sits beside a small button that opens the change. The badge itself never acts as a
button. See [Button](../components/button.md) for a state shown as a badge.

## Rules

### Use one word and one color for each state

- **Do:** Show a state with the same word and color on every screen, such as a red "Overdue" in a table and a header,
  so people learn it once.
- **Don't:** Write "Overdue" in one place and "Late" in another, or show Active green in the table and blue on the board.
  Keep one word and one color, so a state never looks like two.

### Use status color only for state

- **Do:** Show a state as a badge in the app's status colors that names it ("In Progress"), so a status color always
  means a state.
- **Don't:** Tint a card, a heading, or an icon with a status color to decorate it. Keep decoration neutral, so no one
  reads a state that is not there.

### Give the status its own column or property

- **Do:** Show the status in its own table column and as its own property in the page header, so people find it in the
  same place on every record.
- **Don't:** Write the status into the record's name or subtitle, such as "Acme Renewal (Closed)". Give it its own
  place, so the name stays the name and the status can be sorted and filtered.

## When you can do it differently

An option list that admins edit can let them pick a color for each option, such as each stage of a pipeline. The
picked colors still come from the app's status pairs.

## Works with

- See [Color](../styles/color.md) for the status colors an app sets.
- See [Surfaces and Layers](../styles/surfaces-and-layers.md) for where a status color can sit.
- See [Accessibility](../foundations/accessibility.md) for pairing every color with a word.
- See [Tables](tables.md) for the status column.
- See [Page Header](page-header.md) for the status as a property.
- See [Copy](../foundations/copy.md) for how a status is worded.

## In code

- Define the status pairs once, in the app's brand file, from [assets/brand.example.css](../assets/brand.example.css).
  Each pair is a fill and its text, such as `--color-status-green` and `--color-status-green-foreground`, with Dark
  values under `.dark`.
- Map each state to its word and its classes in one place in the app, and render `Badge` from `aperia-ds5` from that
  map on every screen. Never wrap `Badge` in a component of the app's own.

```tsx
const STAGE: Record<Stage, { label: string; className?: string }> = {
  active: { label: "Active", className: "bg-status-green text-status-green-foreground" },
  overdue: { label: "Overdue", className: "bg-status-red text-status-red-foreground" },
  proposal: { label: "Proposal" },
}

const { label, className } = STAGE[record.stage]
<Badge variant={className ? "default" : "outline"} className={className}>{label}</Badge>
```

- A plain badge is `<Badge variant="outline">`. A colored badge sets its fill and text through `className`, which wins
  over the variant's colors.
- In a page header, pass the badge as a `properties` value, such as `["Stage", <Badge …>]`.

### Status dot

Build the status dot in the app from a `span`, for a condition inside a line of text or a dense cell.

```tsx
<span className="inline-flex items-center gap-1.5">
  <span aria-hidden className="size-1.5 rounded-full bg-status-red-foreground" />
  2 failed
</span>
```

- The dot takes the pair's deep color, and the word stays in the body color. The dot is hidden from screen readers,
  because the word says the state.
