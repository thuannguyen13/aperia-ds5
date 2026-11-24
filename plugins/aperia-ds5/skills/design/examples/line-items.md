# Line Items With Totals

Line items are rows of amounts on a record that add up to a total.

## When to use

Use line items on a record that holds rows of amounts grouped under something, with a subtotal per group and a total. An
opportunity's lines grouped by product are one example.

## How it looks and behaves

Line items show read-only on the record's page and change in a sheet.

On the page, a card titled "Line Items" holds a table that runs to the card's edges. The table contains three kinds of
row:

| Row | Content |
|---|---|
| Group band | A band with the muted fill, holding the group's picture, its name, and its subtotal at the right. |
| Line | One row for each line in the group, under its band. |
| Total | The total, whose figure ends on the same edge as the Subtotal column. |

A band and its lines repeat for every group. The Total row comes last. Figures are right-aligned, with digits of equal
width, so columns line up.

Edit sits in the card's header. While there are no rows, Edit sits in the middle of the empty card instead.

Selecting Edit opens one wide sheet from the right. The sheet holds a card per group. Each card's title carries the
group's total. Add Line sits at the right of each card's header, after Apply Template when the app offers line
templates. Each row holds small fields, which are text fields, amount fields with a $, and choices from a list. A group
with no rows shows the same buttons in the middle of its empty card.

Subtotals update as the user types. The sheet works them out with the same rules the saved record uses, so the subtotal
shown is the one that saves. A subtotal that cannot be worked out yet reads "—".

Remove is an icon button at the end of a row. It shows when the row is pointed at or focused, and always on a touch
screen. A row's fields take its clicks, so Remove is one of the row buttons that Tables allows.

A refused field is marked in the destructive color. Its message shows on a line under the row, across the whole table.
Nothing saves until Save. A save is refused if someone else changed the rows since the sheet opened, so one save does
not overwrite another. The refusal asks the person to reopen the sheet and try again, such as "These lines changed after
you opened them. Reopen Edit Line Items and try again."

Some viewers may not see some amounts. A hidden amount is left out, or reads $XX,XXX where the cell must keep its place.

## Before and after

- **Before:** The page holds the fields themselves, amounts sit on the left, and a missing rate reads "-".
- **After:** The page only shows the lines, with a band per group, figures on the right, and a Total that lines up with
  them. Edit opens the sheet. A missing value reads "—".

## Rules

### Show on the page, change in the sheet

- **Do:** Show the lines in a read-only card on the page, with Edit opening one wide sheet for every group, so no one
  changes an amount by accident.
- **Don't:** Put fields on the record's page. Show the lines read-only and change them in the sheet, so the sums stay
  easy to read.

### Line figures up on the right

- **Do:** Right-align rates, quantities, subtotals, and the Total (the Total ending on the Subtotal column's edge), so
  digits line up and add by eye.
- **Don't:** Put amounts on the left, or float a total under the table. Right-align every figure, so people see which
  column the total adds.

### Hide amounts without faking them

- **Do:** Leave a hidden amount out, or show $XX,XXX where the cell must keep its place, so people see an amount is
  there but hidden.
- **Don't:** Show a hidden amount as "—" or $0. Use $XX,XXX or leave it out, so no one reads it as missing ("—") or as
  an amount (0).

## When you can do it differently

Line items have no exceptions.

## Which patterns it uses

- See [Cards and Tiles](../patterns/cards-and-tiles.md) for the Line Items card and its empty state.
- See [Tables](../patterns/tables.md) for group bands, figures on the right, and a table that runs to the card's edges.
- See [Forms in Sheets](../patterns/forms-in-sheets.md) for the wide Edit sheet, refused fields, and the save.
- See [Cards and Tiles](../patterns/cards-and-tiles.md) for where the card sits on the record.

## In code

The app builds it from aperia-ds5 parts and the recipes on the pattern and component pages:

- The page: the titled card from [Card](../components/card.md) ("Line Items") with the `Table` flush, the table group
  row from [Tables](../patterns/tables.md) per group (the picture before the name, the subtotal at the end), then the
  rows, then a Total row whose last cell is `pr-4 text-right tabular-nums`. Edit is the card's action; with no rows it
  goes in `EmptyState`'s `action`.
- The sheet: `FormSheet` with `className="data-[side=right]:sm:max-w-6xl"`, a titled card per group (its figure the
  group total, its action Apply Template and Add Line), rows of `Input`, `MoneyInput` and `Select`, and Remove as an
  icon button (the recipe from [Button](../components/button.md)). Work subtotals out with the same function the server
  uses; show the empty value from [Empty States](../foundations/empty-states.md) when one cannot be.
- A hidden amount: leave the column out, or the hidden value ($XX,XXX) from [Money and
  Numbers](../foundations/money-and-numbers.md). `MoneyInput` takes `amountHidden`.
