# Money and Numbers

Number formats define how amounts, counts, and percentages appear in fields, tables, and tiles.

## When to use

Use these formats whenever a screen shows or takes a dollar amount, a count, or a percentage.

## What is available

Five formats cover amounts, counts, and percentages:

| Format | How it reads | Example |
|---|---|---|
| Money field | A $ before the number, and commas in it as the user types. The saved value is the plain number. | "$1,234,567" |
| Hidden amount | The shape of a figure, so a column keeps its width. It shows when the viewer may not see an amount. | **$XX,XXX** |
| Money as text | The amount in full. A whole amount shows no cents, and an amount with cents shows two decimals. | "$1,840,000", "$12.50" |
| Percentage | Rounded to a whole number, with % and no space. With nothing to divide by, it is a missing value (—), not 0%. | "42%" |
| Count | A number and its noun. | "1 prospect", "3 prospects" |

A money field for a hidden amount is disabled. It shows $XX,XXX and says why under it.

## How it looks and behaves

Numbers follow five display rules, from typing to reading:

1. In a money field, the $ stays in front. Commas appear as the user types or pastes. Spaces and stray commas are
   dropped.
2. Number fields have no up and down arrows.
3. In tables and tiles, numbers use tabular figures, so digits line up in a column. Numbers align right in a table.
4. An amount under a dollar keeps its zero, as in $0.64. A negative amount shows in the destructive color and in
   parentheses, as in ($125.50).
5. A missing value reads — (an em dash) in muted text. A missing value is different from 0.

## Rules

### Write amounts in full

- **Do:** Write amounts in full ($1,840,000), so people read the exact figure.
- **Don't:** Write $1.8M, $1,840K, or "1840000 dollars". Write the full amount, so nothing is rounded or misread.

### Use the money field for money

- **Do:** Use the money field, which shows $ and commas and saves plain digits, so typing an amount is easy and every
  saved amount is a number.
- **Don't:** Use a plain number field with spin arrows, or one that saves "$1,234". Use the money field, so amounts save
  as numbers.

### Hide an amount with its shape

- **Do:** Show $XX,XXX where the viewer may not see the amount, so the column keeps its shape.
- **Don't:** Use a blank cell, "Hidden", or asterisks that change the column's width. Use $XX,XXX, so hidden amounts
  look intentional.

### Line numbers up

- **Do:** Use tabular figures, right-aligned ($48,500 over $1,840,000 digit for digit), so amounts compare at a glance.
- **Don't:** Set figures in proportional digits that wobble down a column. Use tabular figures, so digits line up.

## When you can do it differently

An amount that the viewer may not see can be left out of a sentence or a summary, where nothing lines up with it. In a
table, a hidden amount reads $XX,XXX.

## Works with

Numbers work with three other patterns:

- See [Forms in Sheets](../patterns/forms-in-sheets.md) for the money field in a form.
- See [Cards and Tiles](../patterns/cards-and-tiles.md) for a number on a tile.
- See [Disabled With a Reason](disabled-with-a-reason.md) for why the field of a hidden amount cannot be used.

## In code

- `MoneyInput` from `aperia-ds5` (`value` and `onChange` take plain digits, `amountHidden` hides it), or `MoneyField`
  with its label (`reason` hides the amount and puts the reason under it). Never `type="number"` for money.
- Format with `aperia-ds5/format`: `money(value)` shows cents only when the amount has them; `{ cents: true }` or
  `{ cents: false }` forces one form,
  `percent(part, whole)` (null when there's nothing to divide by: show the empty value from
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
