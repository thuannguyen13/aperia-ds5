# Reordering

Reordering lets people change the order of rows by dragging a grip or using the keyboard.

## When to use

Use reordering for a list whose order the user chooses, such as the stages of a pipeline, the items of a template, or
the columns of a view.

Do not use reordering to sort a list for reading. Sorting changes how rows show, not their saved order. See
[Sort](sort.md) for sorting.

## What is available

Reordering comes in two layouts:

| Layout | What moves | Example |
|---|---|---|
| Reorderable table | Each row, by a grip in its first column | The stages of a pipeline |
| Reorderable list on a form | Each row, which edits in place and moves by its grip | The items of a task template |

## How it looks and behaves

A row moves by pointer or by keyboard, and it stays inside its own list:

1. Each row has a grip at its start, shown as two columns of dots, with the grab pointer.
2. Dragging the grip moves the row up or down within its own list.
3. From the keyboard, Tab reaches the grip. Space picks the row up. The arrow keys move it. Space drops it. Escape puts
   it back.
4. A screen reader names the grip, such as "Reorder Demo", and reads out each step.
5. A held row stops at the edge of its list. It never slides sideways or over another list.
6. Escape while a row is held only puts the row back. The sheet or dialog around the list stays open with its edits.

## Rules

### Drag by the grip, or move from the keyboard

- **Do:** Give each row a grip that a pointer drags and the keyboard picks up, so everyone can reorder.
- **Don't:** Add Move Up and Move Down buttons, or arrows on every row. Use the grip, so rows stay uncluttered.

### Let a row's place set its order

- **Do:** Let the row's place in the list be its order, so what people see is what is saved.
- **Don't:** Add an Order or Position number field the user types into. Let them drag, so the order never falls out of
  sync.

### Say "Move" only for moving

- **Do:** Name the grip with Reorder and the row's name (such as "Reorder Demo"), and use Move only for an action that
  puts an item in another list or place, so each word means one thing.
- **Don't:** Use "Move" for changing a state. Write Change ("Change to Demo"), so the word matches what happens.

## When you can do it differently

Two cases change how reordering works.

Rows that cannot move come first. Each one has a lock icon and no grip. An example is a column that cannot be hidden
in a view.

A list of options in settings saves its new order at once and confirms with "Order saved." On a form, the order saves
with the form.

## Works with

Reordering works with two other patterns:

- See [Forms in Sheets](forms-in-sheets.md) for a reorderable list inside a form.
- See [Buttons and Actions](buttons-and-actions.md) for buttons in general. A reorderable row has no Move Up or Move
  Down buttons.

## In code

- `SortableList` from `aperia-ds5` (`ids`, `name` for what a screen reader calls each row, `onMove(from, to)`) holding
  `SortableRow`s (`id`; render `(row, handle) => …`, spread `row` on the row element and place `handle(label)`,
  such as `handle("Reorder Demo")`). Apply a move with `moveItem(items, from, to)`.
- In a table, put the list in its own `TableBody`.
