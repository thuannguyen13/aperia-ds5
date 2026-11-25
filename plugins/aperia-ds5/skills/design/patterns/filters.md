# Filters

Filters let people narrow a list to the rows that match, by setting a value on one or more of the list's columns. See
[List Toolbar](list-toolbar.md) for the toolbar they sit in.

## Anatomy

Filters come in two forms, simple filters on the toolbar and advanced filters behind a Filter button. Advanced filters
have nine parts, the button in the list's toolbar and the eight parts of the popover that the button opens. The count
shows only while a filter is on. Column, Operator, Value, and Remove repeat in every row. Simple filters have no parts
of their own, since each is a select, a switch, or a From and To on the toolbar.

1. **Filter button**. It is an outline button in the toolbar, with a filter icon. It opens the popover.
2. **Count** (optional). It is a badge on the Filter button that gives the number of filters that are on.
3. **Filters**. It is the popover's title, above the rows.
4. **Column**. It is the first select in a row. It names the column that the filter is on, and its list holds every
   column.
5. **Operator**. It is a select after the Column. It names how the column is compared, such as "is" or "≥".
6. **Value**. It is the control after the Operator. It holds what the column is compared to, as a field to type in or a
   list of choices.
7. **Remove**. It is the **×** icon button that ends a row. It removes that row.
8. **Add Filter**. It is a button at the bottom left of the popover. It adds an empty row.
9. **Remove All**. It is a button at the bottom right of the popover. It removes every filter.

## What is available

Filters come in two forms. A list uses one of them.

| Form | What people do |
|---|---|
| Simple filters | Change a value straight on the toolbar, in one click, such as picking a product from an "All products" select. |
| Advanced filters | Open the Filter button, then set each filter as a row of Column, Operator, and Value, such as MC Band, is, High, Critical. |

Find the list's situation in this table to choose the form:

| Situation | Form | Why |
|---|---|---|
| Four filters or fewer, each a pick from a short list, a yes or no, or a span of dates | Simple filters | Each filter stays on the toolbar, one click away. |
| A fifth filter | Advanced filters | The toolbar stays one short row however many filters are on. |
| A filter on text, a number, or an amount | Advanced filters | It needs a way to compare, such as contains or ≥, which only a row of Column, Operator, and Value offers. |
| A choice where people need several values at once, such as Stage is Demo or Proposal | Advanced filters | A simple filter picks one value. |
| A long list of choices that people need to search, such as every owner in a large team | Advanced filters | Its value list has a search, and a simple filter does not. |

## How it looks and behaves

Every change to a filter applies at once, in both forms and on a phone, so there is no button to apply or show results.

### Advanced filters

Headings named Column, Operator, and Value sit above the rows. Add Filter and Remove All both always show. Remove All is
disabled while no filter is on, and pointing at it says "No filters to remove."

People add, change, and remove a filter in this order:

1. With no filter on, the popover opens with one empty row. Its Column reads "Pick a column", and its Operator and
   Value wait until a column is picked.
2. Picking a column fills in the row, starting with that column's first way to compare and no value.
3. The Operator lists the ways that kind of column compares. The Value is a field to type in for text, numbers,
   amounts, and dates, or a list to pick from for choices.
4. Changing a row's Column starts that filter over on the new column, in the same place. The Column lists every column,
   so one column can hold several filters, such as MC Score ≥ 700 and MC Score ≤ 900.
5. A filter with no value yet narrows nothing, and the Count does not include it.
6. Add Filter adds an empty row at any time, so people can add several rows first and fill them in after. The **×** on
   a row removes that row, and **Remove All** removes every filter and leaves one empty row.

Each kind of column offers its own ways to compare:

| Column type | Ways to compare |
|---|---|
| Text | contains, does not contain, is, starts with, ends with |
| Numbers and amounts | =, ≠, >, ≥, <, ≤ |
| Choices | is, is not |
| Dates | is, is before, is after, is between |
| Yes or No | is |

Choices are a list, with a search when there are many. Picking several choices matches any of them. "Is between" takes
a From and a To. Either one can stay empty to leave that end open.

Filters add up, so a row must pass every one, including several filters on one column. Text matches without regard to
capitals, so "acme" finds "Acme Payments".

### Simple filters

A select's first choice narrows nothing, such as "All products". A yes or no filter is a switch with its label, such as
"Assigned to me". A span of dates is a From and a To. Either one can stay empty, so "before" and "after" need no other
control.

### Clearing filters

Both forms clear the same ways. A simple filter goes back to its first choice, such as "All products". Advanced filters
have Remove All. The count under the list follows both forms, such as "4 merchants". See [Paging](paging.md) for the
count.

### On a phone

On a phone, both forms move behind one Filter button, an icon button beside the search that shows the number of
filters that are on. The filters that are on show as chips on one line under the search (Filters 2). The line scrolls
sideways however many are on, so the list never moves down, and a tap on a chip's × clears it.

The Filter button opens a sheet from the bottom in two steps:

1. The sheet opens on a card that lists the filters, one line each with a divider between them. Each line shows the
   filter's name and, under it, what it is set to, such as MC Band, then "is High, Critical". Advanced filters list the filters that are on, each
   with × at its end to remove it, and Add Filter under them. Simple filters list every filter, and a yes or no filter
   is a switch on its line.
2. A tap on a line opens that filter alone, with a back arrow to the list. Its ways to compare are a row of toggles,
   such as "is" and "is not", and its value follows, with a search when there are many choices. Add Filter opens the
   list of columns first, and the column picked opens its filter.

The sheet's header holds the count, Clear All, and the close button. Clear All is disabled while no filter is on, and
says "No filters to clear." See [Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.

### When nothing matches

When nothing matches, the list shows "No Results", with "No matching results." and Clear Filters, which clears every
filter in either form. See [Empty States](../foundations/empty-states.md) for the empty state.

## Rules

### 1. Use the shared filters

A list's filters are the shared simple or advanced filters, so they read and clear the same on every list.

- **Don't:** Build the app its own filter panel or filter row.

### 2. Show active filters on a phone too

A narrowed list shows the filters that are on as chips on a phone, so no one thinks records are missing.

- **Don't:** Narrow a list by filters set in the sheet, with nothing on screen to show them.

### 3. Use one filter form per list

A list uses simple filters or advanced filters, never both, so people find every filter in one place. A list that
outgrows simple filters moves every filter to advanced filters.

- **Do:** Move Stage and Owner into the Filter button when a list gets its fifth filter.
- **Don't:** Put a Filter button beside simple filters on one toolbar.

## In code

- `ListToolbar`'s `filters`: `{ fields, value, onChange, form }`. `form` is `"advanced"` (the default) or
  `"simple"`.
- A `FilterField` is `{ id, label, type, options?, all?, read? }`, `type` one of `text`, `number`, `money`, `enum`,
  `day`, `boolean`. `label` is Title Case, as a column heading. `all` names a simple filter's choice that narrows
  nothing ("All products"). `read` gives a row's value; a list filtered on the server leaves it out.
- A `FilterRule` is `{ field, operator, values, id? }`, all strings, so the filters fit in the page's address. Advanced
  filters give each rule an `id`, so one column can hold several rules. Simple filters hold one rule per column. Apply
  them with `filterRows(rows, fields, rules)` from `aperia-ds5/list`, or send them to the server.
- When nothing matches, render `NoResults` with `onClear` (Clear Filters). Pass `shown`, `total` and `noun` so the phone's
  sheet reads right.
- A day span for a list is a `day` filter.
