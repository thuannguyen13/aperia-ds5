# Selecting Rows

Selecting rows lets people tick several records in a table and act on all of them at once, such as Export Selected,
Edit Selected, or Delete Selected. See [Tables](tables.md) for the table itself.

## Anatomy

A list with selection has four parts, from the top of the list to its rows. The selection bar shows only while a row is
selected.

1. **Selection bar** (optional). It sits at the toolbar's right end, in the place of the list's actions. It holds the
   count, such as "3 selected", then Clear Selection, then the actions on the selected rows.
2. **Select all**. It is a checkbox in the column headings. It selects or clears every row on the page shown.
3. **Row checkbox**. It is a checkbox at the start of each row. It selects or clears that row.
4. **Selected row**. It is a row whose checkbox is ticked, with the Muted fill of the table's Selected state.

## When to use

Use row selection on a list whose records people often act on together, such as exporting a set of merchants, moving
several to one stage, or deleting old drafts.

Selection is for some of a list's records. To act on every record the search and filters leave, use the list's own
action in the toolbar, such as Export. See [List Toolbar](list-toolbar.md) for the list's actions.

## What is available

Row selection adds two parts to a list, a checkbox column and a selection bar. The selection bar offers up to three
actions on the selected rows:

| Action | What it does | The selection afterward |
|---|---|---|
| Export Selected | Downloads the selected records | Kept, so people can take another action on the same rows |
| Edit Selected | Opens a sheet that sets one field to one value on every selected record | Kept, so people can take another action on the same rows |
| Delete Selected | Asks first, then deletes the selected records | Cleared, because the records are gone |

## How it looks and behaves

Ticking the first row swaps the list's own actions for the selection bar. Clearing the last row brings the list's
actions back. The toolbar keeps its height, so the table under it does not move.

A checkbox keeps its own clicks. Ticking it never opens the row's record, and a click anywhere else on the row still
opens the record. See [Table](../components/table.md) for the row's Selected state.

Select all has three looks:

| Look | When it shows |
|---|---|
| Empty | No row on the page shown is selected. |
| Dash | Some rows on the page shown are selected. |
| Ticked | Every row on the page shown is selected. |

Selection works with paging, the search, and the filters in three ways:

- The selection stays while people move between pages. The bar's count includes the selected rows on other pages.
- A new search or a new filter clears the selection.
- A new sort keeps the selection, because the list holds the same records.

A list that people work through one page at a time, such as a queue of records to review, can clear the selection on a
new page too. The bar's count then always matches the rows in view.

Edit Selected opens a sheet titled with the count, such as "Edit 3 Merchants". The sheet holds two fields:

1. **Field** picks what to change, from the fields that can take one value on many records, such as Stage or Owner.
2. The second field takes the new value, with the same control that the record's own sheet uses for that field.

Save Changes sets the value on every selected record. A toast then says what happened, such as "3 merchants updated."
See [Forms in Sheets](forms-in-sheets.md) for the sheet.

Delete Selected asks first, with the count in the question, such as "Delete 3 Merchants?". Once the records are gone,
the selection clears. A toast then says what happened, such as "3 merchants deleted." See
[Confirmations and Delete](confirmations-and-delete.md) for the confirmation. See
[Message Templates](../foundations/copy-templates.md) for the words of the confirmation and the toast.

When some of the selected records cannot be deleted, Delete Selected stays in the bar, disabled. Its reason shows on
hover and focus, and it says how many of the records are blocked:

| Blocked records | Reason |
|---|---|
| One | "1 of the selected merchants is in use and cannot be deleted." |
| More than one | "2 of the selected merchants are in use and cannot be deleted." |

People clear the blocked rows to delete the other records. See
[Disabled With a Reason](../foundations/disabled-with-a-reason.md) for how a reason shows.

On a phone, the checkbox column stays first. The selection bar takes the toolbar's first row, in the place of the
list's actions. The count and Clear Selection sit on one line, and the actions wrap onto the next when they do not fit.
The search, Filter, and Sort keep their row under the selection bar.

A screen reader hears each row checkbox by its record's name, such as "Select Harbor Coffee".

## Rules

### 1. Add checkboxes only for an action on several rows

A list has the checkbox column only when it has an action for the selected rows, such as Delete Selected, so a checkbox
always leads somewhere. A list with no such action has no checkboxes.

- **Do:** Bring up the actions on the selected rows as soon as a row is ticked.
- **Don't:** Add checkboxes to a list that has nothing to do with a ticked row.

### 2. Name the count in the selection bar

The selection bar says how many rows are selected, with Clear Selection and the actions beside the count, so people see
what they are about to act on.

- **Do:** Show the count and the actions together, such as "2 selected" beside Delete Selected.
- **Don't:** Keep Export and Delete in the toolbar, grayed out until a row is ticked, or show the count only in the
  footer. Nothing then says how many rows an action is about to change.

### 3. Keep the search, filters, and Sort in reach

The selection bar takes the place of the list's own actions and nothing else. The search, the filters, and Sort stay
beside the selection bar, so people can still narrow or reorder the list while rows are selected.

- **Do:** Show the selection bar at the toolbar's right end, with the search beside it.
- **Don't:** Swap the whole toolbar for the selection bar. A new search then means clearing the selection first.

### 4. Select the rows on the page shown

Select all ticks the rows on the page shown, so people can see every row they are about to act on.

- **Do:** Let Select all tick the rows in view, such as 4 of 57.
- **Don't:** Let one tick select all 57 records, most of them on pages no one has opened.

### 5. Clear the selection when the search or filters change

A new search or a new filter clears the selection, so every selected row is one people can see and the bar's count
matches the rows in view.

- **Do:** Clear the selection when a search narrows the list.
- **Don't:** Keep rows selected after a search or a filter hides them. Delete Selected would then remove records that
  no one can see.

## In code

- `useDataTable` from `aperia-ds5/data-table` holds the selection (`rowSelection`). Render the rows with
  `DataTableContent` and the footer with `DataTablePagination`. The ready `DataTable` has no selection bar, so build
  the list from these parts.
- The checkbox column is the first column, built from `Checkbox` from `aperia-ds5`:

  ```tsx
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select All on This Page"
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={`Select ${row.original.name}`}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }
  ```

- Clear the selection with `table.resetRowSelection()` in the search's and the filters' `onChange`. Count the
  selection with `table.getSelectedRowModel().rows`.
- A row that opens its record keeps `opensOnClick`, which ignores a click on the checkbox.
- Edit Selected opens `FormSheet` (`title` "Edit 3 Merchants") with `SheetForm` (`submit` "Save Changes"). Its first
  field is a `Select` of the fields that can change together. The second field is the control that the record's own
  sheet uses for the chosen field.
- Delete Selected opens `ConfirmDialog` with `title` "Delete 3 Merchants?", `action` "Delete 3 Merchants", and the
  line "This permanently deletes the 3 selected merchants." as `children`.
- A blocked Delete Selected is `disabled`, inside `ReasonTooltip` with the reason. Build the reason with `plural` from
  `aperia-ds5/format`, so one record reads "is" and several read "are".

### Selection bar

Build the selection bar in the app from `Button` and `ReasonTooltip` from `aperia-ds5`. Pass it to `ListToolbar` as
`actions` while a row is selected, in the place of the list's own actions. The `search`, `filters`, and `sort` stay as
they are.

```tsx
<ListToolbar
  search={search}
  filters={filters}
  sort={sort}
  actions={
    selected.length > 0 ? (
      <div role="toolbar" aria-label="Selected merchants" className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium tabular-nums">{selected.length} selected</span>
        <Button variant="ghost" onClick={() => table.resetRowSelection()}>
          Clear Selection
        </Button>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={exportSelected}>
            <DownloadIcon data-icon="inline-start" />
            Export Selected
          </Button>
          <Button variant="outline" onClick={() => setEditing(true)}>
            Edit Selected
          </Button>
          <ReasonTooltip reason={blocked}>
            <Button variant="destructive" disabled={Boolean(blocked)} onClick={() => setConfirming(true)}>
              Delete Selected
            </Button>
          </ReasonTooltip>
        </div>
      </div>
    ) : (
      listActions
    )
  }
/>
```

- The bar is one element, so on a phone it takes the toolbar's first row and its actions wrap under the count.
- The actions are Outline, and Delete Selected is Destructive. The bar has no Primary button.
