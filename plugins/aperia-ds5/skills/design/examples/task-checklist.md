# Task Checklist

A task checklist lists the steps of a record's work and lets people tick each one off in place.

## When to use

Use a task checklist on a record whose work is a list of steps. Use it again on a page that gathers one person's tasks
across all their records, such as To Do.

## How it looks and behaves

On a record, the tasks sit in a card titled "Tasks". The task progress sits beside the title. Add Task sits at the right
of the card's header, after Apply Template when the app offers task templates. With no tasks, the card shows "No Tasks"
with the same buttons centered under it.

Each task is a row directly under the card's header. Rows run to the card's edges, with a divider between them. Each
row's content lines up with the card's title. A row contains three parts, from left to right:

| Part | Content |
|---|---|
| Checkbox | A checkbox, named by the task's title for screen readers. |
| Title | The task's title, with a detail line under it, such as its type. |
| End | Who did it and the day, or when it is due, then an icon button with a pencil, named "Edit Task". |

Edit Task shows when the row is pointed at or reached by keyboard, and always on a touch screen. Only tasks not yet done
have Edit Task. It opens the same sheet as the task's own page, with Delete at the start of its footer.

Ticking a box saves at once, and the box shows ticked straight away. A toast at the top right names the task, such as
"Done: Send Proposal", with Undo. In a row that opens a record, ticking does not open the record. A closed record's
boxes are grayed out and say why on hover, focus, or a tap, so no one changes work on a closed record.

A late task shows the Overdue badge before its due date, such as "Due 11/18/2026". The badge names the state in a
word, so color is never the only signal. See [Status](../patterns/status.md) for the badge.

When the card is narrower than 40rem, who and when move from the row's end to under the title.

A page of one person's tasks across their records, such as To Do, contains four parts:

| Part | Content |
|---|---|
| Tiles | A number tile for each count people act on, such as Overdue, Due Today, and Done Today. Done Today shows a progress bar of what is done against what was due. |
| Toolbar | Search and the filters that fit the tasks, such as Status, Stage, Type, and a range of days, all kept in the page's address. |
| Cards | One card per due-date group, such as Overdue, Due Today, Upcoming, and Done, with fixed columns so the cards line up as one list. |
| Rows | Each row opens its record, and its box ticks the task. |

## Before and after

- **Before:** A table of tasks has a solid primary Done button on every row and a text Edit button that always shows. A
  late task shows only its date, in the destructive color.
- **After:** A checkbox starts each row. A late task shows the Overdue badge beside its due date. Edit Task is a small
  pencil that appears when the row is pointed at.

## Rules

### Tick in place

- **Do:** Put a checkbox at the start of the row that saves at once, with a "Done: Send Proposal" message and Undo, so
  ticking a task is one click and easy to take back.
- **Don't:** Put a solid Done button on every row. Use a checkbox at the start of the row, so the rows carry no primary
  buttons and the tasks are what people read first.

### Mark a late task with the Overdue badge

- **Do:** Show the app's Overdue badge beside the due date, so a late task looks the same as Overdue on every other
  screen.
- **Don't:** Show the due date alone in red, or write "Overdue" as red text. Use the badge, so Overdue looks one way
  across the app.

### Show Edit Task only when it is needed

- **Do:** Show Edit Task as a pencil on pointing, keyboard focus, and touch, on tasks not yet done, so the rows show
  only the task until people reach for it.
- **Don't:** Show Edit and Delete buttons on every row, or Edit Task on a task that is done. Show a pencil on open tasks
  only, so the list shows only the tasks and done work stays done.

### Run rows to the card's edges

- **Do:** Run rows straight under the header, divided by dividers to the card's edges, with their content on the
  title's line, so tasks and card read as one list.
- **Don't:** Box or indent the rows inside the card. Let the rows run to the card's edges, so there is no frame inside a
  frame.

## When you can do it differently

A task checklist has no exceptions.

## Which patterns it uses

- See [Cards and Tiles](../patterns/cards-and-tiles.md) for the Tasks card, its figure, its empty state, and the task
  page's tiles.
- See [Cards and Tiles](../patterns/cards-and-tiles.md) for where the Tasks card sits, beside Notes.
- See [Forms in Sheets](../patterns/forms-in-sheets.md) for the Edit Task sheet and its Delete.
- See [List Toolbar](../patterns/list-toolbar.md) for the task page's toolbar.
- See [Status](../patterns/status.md) for the Overdue badge.
- See [Saving and Feedback](../foundations/saving-and-feedback.md) for a tick that saves at once and offers Undo.

## In code

The app builds it from aperia-ds5 parts and the recipes on the pattern and component pages:

- The titled card from [Card](../components/card.md), titled "Tasks", with the progress as its figure and Apply Template
  and Add Task as its action. With no tasks, `EmptyState` ("No Tasks", `actionClassName="flex-row flex-wrap
  justify-center"`) holds both buttons instead.
- Rows are `Item`s in an `ItemGroup` (`gap-0`, a `@container`), each `rounded-none border-0 px-4 not-first:border-t`:
  `ItemMedia` holds the `Checkbox` (`aria-labelledby` the title's id), `ItemContent` the title and type, `ItemActions`
  who and when and an icon button "Edit Task" (the recipe from [Button](../components/button.md)) (`opacity-0
  group-hover/item:opacity-100 focus-visible:opacity-100 pointer-coarse:opacity-100`). Under `@min-[40rem]`, who and
  when move into `ItemDescription`.
- The tick saves at once and calls `toast("Done: Send Proposal", { action: { label: "Undo", … } })` from sonner.
- A late task shows the app's Overdue `Badge` from its one map of states, the same badge as in a table. See
  [Status](../patterns/status.md) for the map.
- Edit Task opens a `FormSheet` with `SheetForm` and `SheetDelete` in its `start`.
- To Do: stat tiles from [Cards and Tiles](../patterns/cards-and-tiles.md), `ListToolbar` (filters kept in the URL), and
  a titled card per group.
