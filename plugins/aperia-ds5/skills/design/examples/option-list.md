# Editable Option List

An option list is an editable set of choices, such as stages or priorities, that other fields in the app use.

## When to use

Use an option list for the choices people pick elsewhere in the app, when an admin adds to, renames, reorders, and
removes them.

## How it looks and behaves

Each option list has its own card. The count sits beside the card's title. An add button sits at the right of the card's
header. The button is named with a verb and the item, such as Add Stage or Add Priority.

The card holds a table that runs to the card's edges. The table has three columns:

| Column | Content |
|---|---|
| Grip | A handle for dragging, shown when the order matters. |
| Name | The option's name, shown as the app's colored badge when the option has a color. |
| In Use | How many records use the option, aligned right. |

Selecting a row opens the option's sheet, so every action on an option is in one place. Rows carry no edit or delete
buttons. The same form adds and edits an option. Delete sits at the start of the sheet's footer. While anything uses the
option, Delete is grayed out and says "This item is in use and cannot be deleted."

People reorder options by dragging the grip, or from the keyboard through the grip. The new order saves at once, with
the message "Order saved."

Options may fall into groups, such as Open and Closed stages. Each group sits under a muted band. Options reorder only
within their group.

Someone who may only delete gets the sheet with its fields read-only, so they can still reach Delete. Someone who may
neither edit nor delete gets rows that do not open.

## Before and after

- **Before:** Each row carries its own pencil and bin buttons, and up and down arrows to reorder. The bin on an option
  in use is grayed out with no reason.
- **After:** The row opens its sheet, and a grip reorders it. The sheet's Delete says why it cannot be used.

## Rules

### Reorder with the grip

- **Do:** Drag the grip, or pick it up from the keyboard, and save the new order at once ("Order saved."), so moving an
  option takes one step.
- **Don't:** Put up and down arrows on every row. Use a grip that drags, so moving an option far does not take many
  clicks.

### Say why an option cannot be deleted

- **Do:** Gray out Delete in the sheet with a reason ("This item is in use and cannot be deleted."), so people know why
  the option cannot go.
- **Don't:** Gray out Delete with no reason, or refuse a Delete after it is pressed. Say why while Delete is grayed out,
  so no one has to try it to find out.

## When you can do it differently

Leave out the grip column when the order does not matter.

## Which patterns it uses

- See [Cards and Tiles](../patterns/cards-and-tiles.md) for one card per list, its count, and its add button.
- See [Table](../components/table.md) for the whole row that opens its record.
- See [Tables](../patterns/tables.md) for the grouped rows and In Use aligned right.
- See [Forms in Sheets](../patterns/forms-in-sheets.md) for the option's sheet, read-only for someone who may only
  delete.
- See [Disabled With a Reason](../patterns/disabled-with-a-reason.md) for Delete while the option is in use.

## In code

The app builds it from aperia-ds5 parts:

- `TitledCard` per list, the count as `figure` and Add Stage as `action`, holding a flush `Table`.
- Each group is its own `TableBody`, headed by `TableGroupRow`, holding a `SortableList` of `SortableRow`s (the handle
  in the first cell). Save the new order at once and `toast("Order saved.")`.
- Each row spreads `opensOnClick(`Open ${name}`, edit)`, or nothing for someone who may neither edit nor delete.
- The sheet is `FormSheet` with `SheetForm` (`readOnly` for someone who may only delete) and `SheetDelete` in `start`,
  with `reason={IN_USE_DELETE}` while the option is in use.
