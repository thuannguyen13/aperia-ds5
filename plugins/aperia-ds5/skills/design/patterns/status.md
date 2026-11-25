# Status

Status shows which state a record is in, such as Draft, Active, or Overdue. See [Color](../styles/color.md) for the
colors an app sets for it.

## Anatomy

A status has three parts. A state shows as one of them, so each part is optional. The parts are those of a table of
prospects with a Stage column, a Status column, and an Import column.

1. **Plain badge** (optional). It is a pill with the state's word, drawn with the outline look and the body text color,
   for a state with no color of its own.
2. **Colored badge** (optional). It is a pill with the state's word, drawn with one of the app's status pairs, for a
   state that people must notice.
3. **Dot and word** (optional). It is a small dot in the state's deep color, followed by the word in body text, for a
   condition inside a line of text or a dense cell.

## When to use

Use a status for a state that people check, filter by, or act on, such as a prospect's stage or a task that is
overdue. A value that is not a state, such as an amount or a date, shows as plain text.

## What is available

A status comes in three forms. Find the state's situation in this table to choose the form:

| Form | Look | Use when |
|---|---|---|
| Plain badge | The state's word in a pill with the outline look, in the body color | A state with no color of its own, such as one stage among many |
| Colored badge | The state's word in a pill with one of the app's status pairs, a pale fill and deep text | A state people must notice, such as Overdue, Active, or Closed |
| Dot and word | A small dot in the pair's deep color, then the word in body text | A condition inside a line of text or a dense cell, such as "2 failed" in an import's summary |

## How it looks and behaves

A status always names the state in a word. The color helps people find a state at a glance, and the word says what it
is. See [Accessibility](../foundations/accessibility.md) for why color is never the only signal. See
[Copy](../foundations/copy.md) for how the word is written.

### Where a status shows

A status sits in one of four places, and each place has one form of it:

| Place | How the status shows |
|---|---|
| Table | Its own column, named after the field, such as Stage or Status, with a badge in each cell. See [Tables](tables.md). |
| Page header | A property under the title, with its label over the badge. See [Page Header](page-header.md). |
| Card | A badge after the item's name, such as a task's Overdue |
| Board | A badge in each column's header, since every card in the column shares the state |

### Status colors

The library ships no status colors. Each app defines its own status pairs and their Dark values, and a colored badge
takes its fill and text from one pair. See [Color](../styles/color.md) for what an app can change.

An app colors only the states that need attention and shows the others as plain badges. It gives each colored state one
pair, chosen by what the state means. An app that defines a gray, blue, green, amber, and red pair could map its states
like this:

| Status pair | Example states |
|---|---|
| Gray | Draft, Not Started, Closed |
| Blue | In Progress, Scheduled |
| Green | Active, Won, Done |
| Amber | Needs Review, Expiring |
| Red | Overdue, Failed, Lost |

An option list that admins edit can let them pick a color for each option, such as each stage of a pipeline. The picked
colors still come from the app's status pairs.

### Changing a status

A status that people can change sits beside a small button that opens the change. The badge itself never acts as a
button. See [Button](../components/button.md) for a state shown as a badge.

## Rules

### 1. Use one word and one color for each state

A state has one word, one color, and one form in the whole app, so people learn it once and a state never looks like
two. A table, the record's page header, a card, and a board column show the same badge for the same state.

- **Do:** Show Overdue as the same red badge in a table and in a page header.
- **Don't:** Write "Overdue" in one place and "Late" in another, or show Active green in the table and blue on the board.
  Show Overdue as a badge, never as red text or a red date.

### 2. Use status color only for state

A status color means a state and nothing else, so no one reads a state that is not there.

- **Do:** Show a state as a badge in the app's status colors that names it ("In Progress").
- **Don't:** Tint a heading or an icon with a status color to decorate it. Keep decoration neutral.

### 3. Give the status its own column or property

A status has its own place on a screen, so the record's name stays the name and the status can be sorted and filtered.

- **Do:** Show the status in its own Status column.
- **Don't:** Write the status into the record's name or subtitle, such as "Acme Renewal (Closed)".

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
