# Reordering

Reordering lets people set the order of a list's rows by hand, by dragging a grip or using the keyboard.

## Anatomy

Reordering has three parts, a list, the rows in it, and a grip on each row that can move.

1. **List**. It is the group of rows that move among one another, such as a table body or a stack of form rows. A row
   never leaves its list.
2. **Row**. It is one item of the list, such as a pipeline stage. A row holds its own content and its grip.
3. **Grip**. It is an icon button at the start of a row. People drag it with a pointer or pick it up with the keyboard.

## When to use

Use reordering for a list whose order people choose, such as the stages of a pipeline, the items of a template, or the
columns of a view.

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

1. The grip is drawn as two columns of dots, with the grab pointer.
2. Dragging the grip lifts the row with a shadow and moves it up or down within its own list.
3. From the keyboard, Tab reaches the grip. Space picks the row up. The arrow keys move it. Space drops it. Escape puts
   it back.
4. A screen reader reads out each step, such as "Demo dropped at position 2 of 5."
5. A held row stops at the edge of its list. It never slides sideways or over another list.
6. Escape while a row is held only puts the row back. The sheet or dialog around the list stays open with its edits.

Rows that cannot move come first. Each one has a lock icon and no grip. An example is a column that cannot be hidden in
a view.

A list of options in settings saves its new order at once, and the list itself shows the change, so no toast follows.
On a form, the order saves with the form. See [Forms in Sheets](forms-in-sheets.md) for a reorderable list inside a
form.

On a phone, a finger on the grip drags the row, and the page holds still while the row moves. A swipe anywhere else
on the row still scrolls the page. See [Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.

## Rules

### 1. Drag by the grip, or move from the keyboard

Every row has one grip that a pointer drags and the keyboard picks up, so everyone can reorder and rows stay
uncluttered.

- **Do:** Give each row a grip and nothing else for moving.
- **Don't:** Add Move Up and Move Down buttons, or arrows on every row.

### 2. Let a row's place set its order

A row's place in the list is its order, so what people see is what is saved.

- **Don't:** Add an Order or Position number field that people type into. Typed numbers can clash or skip, and the
  order falls out of sync with the rows.

### 3. Say "Move" only for moving

The grip's name is Reorder and the row's name, so a screen reader says what the grip does. Move is for an action that
puts an item in another list or place, so each word means one thing.

- **Do:** Name the grip "Reorder Demo".
- **Don't:** Use "Move" for changing a state. Write "Change to Demo".

## In code

- `SortableList` from `aperia-ds5` (`ids`, `name` for what a screen reader calls each row, `onMove(from, to)`) holding
  `SortableRow`s (`id`; render `(row, handle) => …`, spread `row` on the row element and place `handle(label)`,
  such as `handle("Reorder Demo")`). Apply a move with `moveItem(items, from, to)`.
- In a table, put the list in its own `TableBody`.
