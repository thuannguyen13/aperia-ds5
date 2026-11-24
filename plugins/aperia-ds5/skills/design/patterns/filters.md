# Filters

Filters narrow a list to matching rows and appear in the list's toolbar as chips or dropdowns.

## When to use

Use filters on a list page, in its toolbar, when people need to narrow the list by its columns.

## What is available

Filters come in two forms:

| Form | Use when | Content |
|---|---|---|
| Chips | By default | Each filter that is on is a chip that reads as a sentence, such as "MC Band is High, Critical". |
| Dropdowns | The list has four filters or fewer, and each one picks from a list of choices, is yes or no, or is a date | Each filter is a fixed control on the toolbar, such as an "All products" select, a switch, or a From and To date. |

Each kind of column offers its own ways to compare:

| Column type | Ways to compare |
|---|---|
| Text | contains, does not contain, is, starts with, ends with |
| Numbers and amounts | =, ≠, >, ≥, <, ≤ |
| Choices | is, is not |
| Dates | is, is before, is after, is between |
| Yes or No | is |

## How it looks and behaves

### Chips

People add, change, and remove a chip in this order:

1. The "Add Filter" button opens a list of the columns that are not filtered yet. It is an outline button with a
   filter icon. The list has a search at its top, and each column has a small mark for the kind of value it holds.
2. Picking a column adds its chip with its values already open, so people choose the values next.
3. The chip reads as a sentence, with the column, then how it compares, then its values. The comparison and the values
   each open where they are changed. Every change applies at once.
4. Past two values, the chip shows a count, such as "High, Critical +1".
5. A filter with no value yet shows a muted "—" and narrows nothing.
6. The **×** on a chip removes that filter. **"Clear All"** removes every filter.

Choices are a list, with a search when there are many. Picking several choices matches any of them. "Is between" takes
a From and a To. Either one can stay empty to leave that end open.

Filters add up, so a row must pass every one. Each column has one filter at most. Text matches without regard to
capitals, so "acme" finds "Acme Payments".

### Dropdowns

Every dropdown filter is always on the toolbar. A select's first choice narrows nothing, such as "All products". A
switch is on or off. From and To narrow the list by a span of days.

### On a phone

On a phone, both forms move behind one button. The toolbar shows the search, then a **Filters** button with the number
of filters that are on.

The Filters button opens a sheet from the bottom. The sheet holds every filter's controls, the count (such as "12 of 40
prospects"), Clear All, and a button that closes it (such as "Show 12 Prospects").

The filters that are on show as chips under the search. A tap on a chip clears it.

### When nothing matches

When nothing matches, the list shows "No Results", with "No matching results." and Clear Filters. See
[Empty and Missing](empty-and-missing.md) for the empty state.

## Rules

### Read a filter as a sentence

- **Do:** Show each filter as a chip that reads as a sentence ("MC Band is High, Critical"), changed in place and
  removed with ×, so people see what is on.
- **Don't:** Build the app its own filter panel or row. Use the chips, so filters read and clear the same on every list.

### Keep filters in the toolbar

- **Do:** Put the filters between the search and the count in the list's one toolbar, so people find them in the same
  place.
- **Don't:** Put a filter in the page header (a report date as a label over a field). Move it into the toolbar, so the
  header stays the page's name.

### Show active filters on a phone too

- **Do:** Show a Filters button that counts the filters that are on, with those filters as chips that clear on a tap,
  so a phone user knows the list is narrowed.
- **Don't:** Narrow a list by filters hidden in a sheet, with nothing on screen. Show them as chips, so no one thinks
  records are missing.

## When you can do it differently

Use dropdowns instead of chips when a list has four filters or fewer and every filter picks from a list of choices, is
yes or no, or is a date. Examples are an "All products" select, a switch, or a From and To date. The limit is four
because four dropdowns, the search, and Sort fit in one toolbar row on a desktop. A fifth filter, or any filter on text,
a number, or an amount, means chips. Dropdowns count, clear, and go behind the Filters button on a phone the same way
chips do.

## Works with

- See [List Page](list-page.md) for the toolbar the filters sit in.
- See [Sort](sort.md) for the control at the toolbar's right end.
- See [Empty and Missing](empty-and-missing.md) for "No Results" when nothing matches.

## In code

- `ListToolbar`'s `filters`: `{ fields, value, onChange, form }`. `form` is `"chips"` (the default) or
  `"dropdowns"`.
- A `FilterField` is `{ id, label, type, options?, all?, read? }`, `type` one of `text`, `number`, `money`, `enum`,
  `day`, `boolean`. `label` is Title Case, as a column heading. `all` names a dropdown's choice that narrows nothing
  ("All products"). `read` gives a row's value; a list filtered on the server leaves it out.
- A `FilterRule` is `{ field, operator, values }`, all strings, so the filters fit in the page's address. Apply them
  with `filterRows(rows, fields, rules)` from `aperia-ds5/list`, or send them to the server.
- When nothing matches, render `NoResults` with `onClear` (Clear Filters). Pass `shown`, `total` and `noun` so the count
  and the phone's sheet read right.
- A day span for a list is a `day` filter; a report date (one day) goes in `start` instead.
