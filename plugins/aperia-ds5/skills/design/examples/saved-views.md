# Saved Views

A saved view stores a person's own column setup for a list so they can switch to it from the toolbar.

## When to use

Use saved views on a list or grid with many columns, where each person wants their own columns, in their own order.

## How it looks and behaves

Saved views have two parts. A picker sits in the list's toolbar. A sheet edits or creates a view.

The picker comes first in the list's toolbar, after a report date when the list has one. It is an outlined button that
reads "View" in muted text, then the current view's name. Selecting it opens a menu of the views, with a check beside
the current one. Edit View and Create View follow under a line.

The sheet opens from the right, titled "Edit View" or "Create View". It contains three parts, from top to bottom:

| Part | Content |
|---|---|
| View Name | A text field for the view's name. |
| Default | A "Set as My Default View" checkbox. |
| Columns | Reset to Default, a search for columns, and how many are shown, such as "8 of 20 shown". |

Columns are a list with a grip and a checkbox on each row. Columns that cannot be hidden come first, each with a lock,
and they do not move. The other rows reorder by dragging the grip, or from the keyboard through the grip.

The sheet's footer has Cancel, then Save View or Create View. When editing, Delete View sits at the footer's start.

Each person has one default view, which opens when the page loads. Deleting a person's default view makes the first view
in their list, such as the shared Default View, their default again.

The last view in a person's list cannot be deleted, so they always have a view to open. Its Delete is grayed out, and
pointing at it says "This item is in use and cannot be deleted."

A view needs a name. Saving with the name empty is refused beside the field, with "Enter a view name."

## Before and after

- **Before:** The app builds its own "View:" label, a dropdown, and an Edit View link beside it. A view saved with no
  name appears as "Untitled view".
- **After:** One outlined button, such as "View My Queue", opens the views and Edit View. An empty name is refused
  beside the field, and nothing saves.

## Rules

### Put views in one picker

- **Do:** Put the picker at the start of the toolbar, with the views, Edit View, and Create View in its menu, so every
  view is in one place.
- **Don't:** Show views as tabs above the table, add a Save As button, or change columns from the column headings. Keep
  it all in the picker, so people always know what is saved.

### Refuse an empty name

- **Do:** Show "Enter a view name." under View Name, with the sheet still open, so people fix it without losing their
  columns.
- **Don't:** Save the view as "Untitled view". Refuse an empty name beside the field, so every view can be told apart.

### Say why the last view cannot go

- **Do:** Gray out Delete View with a reason ("This item is in use and cannot be deleted." when pointed at), so people
  know why the last view cannot go.
- **Don't:** Gray out Delete with no reason, or let Delete remove the last view. Keep the last view and say why, so no
  one is left with no view.

## When you can do it differently

Saved views have no exceptions.

## Which patterns it uses

- See [List Toolbar](../patterns/list-toolbar.md) for the toolbar the picker starts.
- See [Forms in Sheets](../patterns/forms-in-sheets.md) for the Edit View sheet, its footer, and its refusals.
- See [Confirmations and Delete](../patterns/confirmations-and-delete.md) for Delete View, which asks first.
- See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for the last view's Delete.

## In code

The app builds it from aperia-ds5 parts:

- The picker goes in `ListToolbar`'s `start`: an outline `Button` (`<span className="text-muted-foreground">View</span>`
  and the name) opening a `DropdownMenu` with a `DropdownMenuCheckboxItem` per view, a `DropdownMenuSeparator`, then
  Edit View and Create View.
- The sheet is `FormSheet` with `SheetForm` (`submit="Save View"` or `"Create View"`), checked with `useSheetForm`.
- Columns are a `SortableList` of `SortableRow`s, each with its handle and a `Checkbox`; locked columns render first,
  outside the list, with `LockIcon`.
- `SheetDelete` goes in `SheetForm`'s `start` (title "Delete View?", action "Delete View"), with
  `reason={IN_USE_DELETE}` when it's the last view.
