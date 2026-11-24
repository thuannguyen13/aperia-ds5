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
| End | Who did it and the day, or when it is due, then an Edit button with a pencil icon. |

Edit shows when the row is pointed at or reached by keyboard, and always on a touch screen. Only tasks not yet done have
Edit. Edit opens the same sheet as the task's own page, with Delete at the start of its footer.

Ticking a box saves at once, and the box shows ticked straight away. A message at the bottom of the screen names the
task, such as "Done: Send Proposal", with Undo. In a row that opens a record, ticking does not open the record. A closed
record's boxes are grayed out and say why when pointed at, so no one changes work on a closed record.

A late task says so in words, in the destructive color, such as "Overdue, was due 11/18/2026". Color is never the only
signal.

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
- **After:** A checkbox starts each row. A late task says "Overdue, was due 11/18/2026". Edit is a small pencil that
  appears when the row is pointed at.

## Rules

### Tick in place

- **Do:** Put a checkbox at the start of the row that saves at once, with a "Done: Send Proposal" message and Undo, so
  ticking a task is one click and easy to take back.
- **Don't:** Put a solid Done button on every row. Use a checkbox at the start of the row, so the rows carry no primary
  buttons and the tasks are what people read first.

### Say late in words

- **Do:** Say it is late in words, in the destructive color ("Overdue, was due 11/18/2026"), so even people who cannot
  see the color know.
- **Don't:** Show the due date alone, colored red. Say "Overdue" in words, so it does not read as an ordinary date.

### Show Edit only when it is needed

- **Do:** Show Edit as a pencil on pointing, keyboard focus, and touch, on tasks not yet done, so the rows show only the
  task until people reach for Edit.
- **Don't:** Show Edit and Delete buttons on every row, or Edit on a task that is done. Show a pencil on open tasks
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
- See [Forms in Sheets](../patterns/forms-in-sheets.md) for the Edit sheet and its Delete.
- See [List Toolbar](../patterns/list-toolbar.md) for the task page's toolbar.
- See [Saving and Feedback](../foundations/saving-and-feedback.md) for a tick that saves at once and offers Undo.

## In code

The app builds it from aperia-ds5 parts and the recipes on the pattern and component pages:

- The titled card from [Card](../components/card.md), titled "Tasks", with the progress as its figure and Apply Template
  and Add Task as its action. With no tasks, `EmptyState` ("No Tasks", `actionClassName="flex-row flex-wrap
  justify-center"`) holds both buttons instead.
- Rows are `Item`s in an `ItemGroup` (`gap-0`, a `@container`), each `rounded-none border-0 px-4 not-first:border-t`:
  `ItemMedia` holds the `Checkbox` (`aria-labelledby` the title's id), `ItemContent` the title and type, `ItemActions`
  who and when and an icon button "Edit" (the recipe from [Button](../components/button.md)) (`opacity-0
  group-hover/item:opacity-100 focus-visible:opacity-100 pointer-coarse:opacity-100`). Under `@min-[40rem]`, who and
  when move into `ItemDescription`.
- The tick saves at once and calls `toast("Done: Send Proposal", { action: { label: "Undo", … } })` from sonner.
- Edit opens a `FormSheet` with `SheetForm` and `SheetDelete` in its `start`.
- To Do: stat tiles from [Cards and Tiles](../patterns/cards-and-tiles.md), `ListToolbar` (filters kept in the URL), and
  a titled card per group.
