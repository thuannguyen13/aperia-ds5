# Money and Numbers

Number formats write amounts, counts, and percentages one way on every screen, so people read and compare figures the same way in fields, tables, and tiles.

## What is available

Five formats cover amounts, counts, and percentages:

| Format | How it reads | Example |
|---|---|---|
| Money field | A $ before the number, with commas in it. | "$1,234,567" |
| Money as text | The amount in full. A whole amount shows no cents, and an amount with cents shows two decimals. | "$1,840,000", "$12.50" |
| Hidden amount | The shape of a figure, for an amount the viewer may not see. | **$XX,XXX** |
| Percentage | Rounded to a whole number, with % and no space. With nothing to divide by, it is a missing value (—), not 0%. | "42%" |
| Count | A number and its noun. | "1 prospect", "3 prospects" |

## How it looks and behaves

- In a money field, the $ stays in front. Commas appear as the user types or pastes. Spaces, stray commas, and letters are dropped. The saved value is the plain number.
- A money field for a hidden amount is disabled and empty. It shows XX,XXX after the $, says to a screen reader that the amount is hidden, and gives the reason under it.
- Number fields have no up and down arrows.
- An amount under a dollar keeps its zero, as in $0.64.
- A missing amount is a muted em dash (—), never $0, because 0 is an amount. See [Empty States](empty-states.md) for how every missing value is shown.
- A money field in a table's column is right-aligned like every other number there.

## Rules

### 1. Write amounts in full

Write an amount in full, with commas and no shortening, so people read the exact figure.

- **Do:** Write $1,840,000 for a whole amount and $12.50 for an amount with cents.
- **Don't:** Write $1.8M, $1,840K, $12.5, or "1840000 dollars", because a shortened amount hides digits and a missing zero reads as a different amount.

### 2. Use the money field for money

Use the money field for every amount a person types. It shows $ and commas and saves plain digits, so every saved amount is a number.

- **Do:** Use the money field for Monthly Volume, so the user sees $1,250,000 and the app saves 1250000.
- **Don't:** Use a number field for money. It shows no $ or commas, and a field that saves "$1,234" stores text.

### 3. Hide an amount with its shape

An amount the viewer may not see reads $XX,XXX, so a column keeps its width and the cell never looks empty. In a sentence or a summary, where nothing lines up with the amount, it can be left out instead.

- **Do:** Show $XX,XXX in the cell, in muted text, for an amount this viewer may not see.
- **Don't:** Use a blank cell, "Hidden", or asterisks, which change the column's width or read as a missing value.

### 4. Line numbers up

Numbers in tables and tiles use tabular figures, so every digit has the same width and digits line up in a column. A number in a table is right-aligned, so the digits of the same place sit in one line.

- **Do:** Right-align amounts with tabular figures, so $48,500 sits over $1,840,000 digit for digit.
- **Don't:** Left-align a column of numbers or set it in proportional digits, because the digits shift from row to row.

### 5. Write a negative amount in parentheses

A negative amount is written in parentheses and in the destructive color. The parentheses carry the meaning, so it reads as negative without the color and without a minus sign.

- **Do:** Write ($125.50) in the destructive color.
- **Don't:** Write -$125.50, or show the destructive color on an amount with no parentheses.

## In code

- `MoneyInput` from `aperia-ds5` (`value` and `onChange` take plain digits, `amountHidden` hides it), or `MoneyField`
  with its label (`reason` hides the amount and puts the reason under it). Never `type="number"` for money.
- Format with `aperia-ds5/format`: `money(value)` shows cents only when the amount has them; `{ cents: true }` or
  `{ cents: false }` forces one form,
  `percent(part, whole)` (null when there is nothing to divide by: show the empty value from
  [Empty States](empty-states.md)), `plural(count, one, many)`.
- Numbers in tables and tiles carry `tabular-nums`.

### Money value

Build the money value in the app from a span and `money` from `aperia-ds5/format`, with `cn` for the classes.

```tsx
{value === null || value === undefined ? (
  <span className="text-muted-foreground">—</span>
) : (
  <span className={cn("tabular-nums", value < 0 && "text-destructive")}>
    {money(value)}
  </span>
)}
```

- `money` writes a negative amount in parentheses, such as ($125.50), and the span colors it destructive.
- An amount that is missing is the muted em dash, not $0.
- In a table, the cell that holds it is right-aligned.

### Hidden value

Build the hidden value in the app from a span and `HIDDEN_MONEY` from `aperia-ds5/format`.

```tsx
<span role="img" aria-label="Amount hidden" className="text-muted-foreground">
  {HIDDEN_MONEY}
</span>
```

- The shape of a figure ($XX,XXX) keeps a column's width.
- `role="img"` with its label makes a screen reader say that the amount is hidden, not read the letters.
