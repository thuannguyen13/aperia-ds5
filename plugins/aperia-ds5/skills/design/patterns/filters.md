# Filters

Filters narrow a list to matching rows, set from fixed controls on the list's toolbar (simple filters) or from a Filter
button that opens a popover of rows (advanced filters).

## When to use

Use filters on a list page, in its toolbar, when people need to narrow the list by its columns.

## What is available

Filters come in two forms. Each list uses one of them, picked by what the list filters on, as set out under Simple or
advanced filters below.

| Form | What people do |
|---|---|
| Simple filters | Change a value straight on the toolbar, in one click, such as picking a product from an "All products" select. |
| Advanced filters | Open the Filter button, then set each filter as a row of Column, Operator, and Value, such as MC Band, is, High, Critical. |

Simple filters keep a short list of filters one click away. Advanced filters keep a list with many ways to filter in
one short toolbar.

Each kind of column offers its own ways to compare:

| Column type | Ways to compare |
|---|---|
| Text | contains, does not contain, is, starts with, ends with |
| Numbers and amounts | =, ≠, >, ≥, <, ≤ |
| Choices | is, is not |
| Dates | is, is before, is after, is between |
| Yes or No | is |

### Simple or advanced filters

Most lists fit one form at once. A list uses one form, never both, so simple filters never sit beside a Filter button.
Find the list's situation in this table:

| Situation | Choice | Why |
|---|---|---|
| Four filters or fewer, each a pick from a short list, a yes or no, or a span of dates | Simple filters | Each filter stays on the toolbar, one click away. |
| A fifth filter | Advanced filters, for the whole list | The toolbar stays one short row however many filters are on. |
| A filter on text, a number, or an amount | Advanced filters, for the whole list | It needs a way to compare, such as contains or ≥, which only a row of Column, Operator, and Value offers. |
| A choice where people need several values at once, such as Stage is Demo or Proposal | Advanced filters | A simple filter picks one value. |
| A long list of choices that people need to search, such as every owner in a large team | Advanced filters | Its value list has a search, and a simple filter does not. |
| Some filters fit simple filters and others do not | Advanced filters for every filter, never both forms | People find every filter in one place. |
| A yes or no filter among simple filters | A switch with its label on the toolbar, such as "Assigned to me" | It turns on or off in one click. |
| A span of dates | A From and a To | Either one can stay empty, so "before" and "after" need no other control. |

## How it looks and behaves

### Advanced filters

The toolbar shows one outline **Filter** button with a filter icon. When filters are on, the button adds their number in
a primary badge, so the toolbar stays one short row however many filters are on.

The button opens a popover titled "Filters". Each filter that is on is a row of three controls under the headings
Column, Operator, and Value, with a **×** at its end. **Add Filter** sits at the bottom left and **Remove All** at the
bottom right. Both always show. Remove All is disabled while no filter is on, and pointing at it says "No filters to
remove."

People add, change, and remove a filter in this order:

1. With no filter on, the popover opens with one empty row. Its Column reads "Pick a column", and its Operator and
   Value wait until a column is picked.
2. Picking a column fills in the row, starting with that column's first way to compare and no value.
3. The Operator lists the ways that kind of column compares. The Value is a field to type in for text, numbers,
   amounts, and dates, or a list to pick from for choices. Every change applies at once.
4. Changing a row's Column starts that filter over on the new column, in the same place. The Column lists every column,
   so one column can hold several filters, such as MC Score ≥ 700 and MC Score ≤ 900.
5. A filter with no value yet narrows nothing, and the button does not count it.
6. Add Filter adds an empty row at any time, so people can add several rows first and fill them in after. The **×** on
   a row removes that row, and **Remove All** removes every filter and leaves one empty row.

Choices are a list, with a search when there are many. Picking several choices matches any of them. "Is between" takes
a From and a To. Either one can stay empty to leave that end open.

Filters add up, so a row must pass every one, including several filters on one column. Text matches without regard to
capitals, so "acme" finds "Acme Payments".

### Simple filters

Every simple filter is always on the toolbar, so picking a value takes one click. A select's first choice narrows
nothing, such as "All products". A switch is on or off. From and To narrow the list by a span of days.

### Clearing filters

Both forms clear the same ways. A simple filter goes back to its first choice, such as "All products". Advanced
filters have Remove All. When nothing matches, Clear Filters clears every filter in either form. The count under the
list follows both forms, such as "4 merchants". See [Paging](paging.md) for the count.

### On a phone

On a phone, both forms move behind one Filter button, an icon button beside the search that shows the number of
filters that are on. Under the search, the filters that are on show on one line, as chips. The line scrolls
sideways however many are on, so the list never moves down, and a tap on a chip's × clears it.

The Filter button opens a sheet from the bottom in two steps:

1. The sheet opens on a list of the filters in a card, one line each with a line between them, and what the filter is
   set to under its name, such as MC Band, then "is High, Critical". Advanced filters list the filters that are on, each
   with × at its end to remove it, and Add Filter under them. Simple filters list every filter, and a yes or no filter
   is a switch on its line.
2. A tap on a line opens that filter alone, with a back arrow to the list. Its ways to compare are a row of toggles,
   such as "is" and "is not", and its value follows, with a search when there are many choices. Add Filter opens the
   list of columns first, and the column picked opens its filter.

Every change applies at once, so the sheet has no button to apply or show results. Its header holds the count, Clear
All, and the close button. Clear All is disabled while no filter is on, and says "No filters to clear."
See [Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.

### When nothing matches

When nothing matches, the list shows "No Results", with "No matching results." and Clear Filters. See
[Empty States](../foundations/empty-states.md) for the empty state.

## Rules

### Build each filter as a row

- **Do:** Show each advanced filter as a row of Column, Operator, and Value (MC Band, is, High, Critical),
  each changed in place and removed with ×, so people can change any part without starting over.
- **Don't:** Build the app its own filter panel or row. Use advanced filters, so filters read and clear the same on
  every list.

### Keep filters in the toolbar

- **Do:** Put the Filter button or the simple filters right after the search in the list's one toolbar, so people find
  them in the same place.
- **Don't:** Put a filter in the page header, such as a label over a field. Move it into the toolbar, so the header
  stays the page's name.

### Show active filters on a phone too

- **Do:** Show a Filter button that counts the filters that are on, with those filters as chips that clear on a tap,
  so a phone user knows the list is narrowed.
- **Don't:** Narrow a list by filters hidden in a sheet, with nothing on screen. Show them as chips, so no one thinks
  records are missing.

### Use one filter form per list

- **Do:** Use simple filters for a list with four filters or fewer, and advanced filters for any other list, so a
  simple list changes in one click and a large one keeps a short toolbar.
- **Don't:** Mix simple filters and a Filter button on one toolbar. Move the whole list to advanced filters when it
  outgrows simple filters, so people find every filter in one place.

## When you can do it differently

Filters have no other exceptions. Every list uses simple or advanced filters, as decided under "Simple or advanced
filters".

## Works with

- See [List Toolbar](list-toolbar.md) for the toolbar the filters sit in.
- See [Sort](sort.md) for the control at the toolbar's right end.
- See [Empty States](../foundations/empty-states.md) for "No Results" when nothing matches.

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
