# Saving and Feedback

Saving and feedback set when a change is saved, what shows while it saves, and what tells people that it went through
or failed. See [Message Templates](copy-templates.md) for the words of each message.

## When to use

Use this page whenever people change something, such as a filter, a switch, a task, or a record. Each kind of change
saves at its own moment, so find the change in the table below first.

### Save at once or wait for a button

A change saves at once when the control that makes it also shows it. A change waits for a button when it needs a form,
a reason, or a decision first. Find the change in this table:

| Change | When it saves | Why |
|---|---|---|
| A filter, a sort, or a search on a list | It applies at once, with no button to apply. It is kept in the page's address, not saved to a record. | The list is the result, and it changes as people choose. See [Filters](../patterns/filters.md). |
| A switch in a grid, such as a notification setting | At once, as it is flipped | The grid has no Save button. See [Switches in a Grid](../patterns/switches-in-a-grid.md). |
| A pick in a grid, such as a role's level | At once, as it is picked | The grid has no Save button. |
| A ticked task | At once, as the box is ticked | Ticking a task is one click and easy to take back. |
| A new order of options | At once, as the row is dropped | What people see is the saved order. See [Reordering](../patterns/reordering.md). |
| A card dropped on another column of a board | At once, as the card is dropped, with Undo. A new status that needs a reason asks for it first. | A move is one drag and easy to take back. |
| A status change with a reason | When its button is pressed, in a small panel or a dialog | It waits for the reason. |
| A delete, or another step whose consequence people must know first | When the confirmation's action is pressed | It cannot be taken back. See [Confirmations and Delete](../patterns/confirmations-and-delete.md). |
| Adding or editing a record | When the save button is pressed, in a form in a sheet | No record is saved half-filled. See [Forms in Sheets](../patterns/forms-in-sheets.md). |
| A setting that is not a list, such as the app's default currency | When Save Changes is pressed, in the sheet that Edit opens from the setting's card | Its values change together, so they save together. |
| A file on a form | It uploads as soon as it is picked, and it is saved with the form. | See [Files and Images](../patterns/files-and-images.md). |

## What is available

Feedback comes in four forms, one for each moment of a change:

| Form | Moment | What people see |
|---|---|---|
| Working state | While a save that waits for a button runs | The button keeps its label beside a spinner. The sheet, panel, or dialog stays open. |
| Toast | After a save goes through | A message at the top right of the screen that states the result and closes on its own. It offers Undo when the change can be taken back. |
| Message in place | After a save is refused | A message beside the field, above the buttons, or above the grid that holds the control |
| Discard Changes? | When a sheet closes after typing in it | A dialog over the sheet that asks before what was typed is lost |

A change that the screen already shows, such as a filter, a switch, or a new order, needs no message when it goes
through. A change that offers Undo is the one exception, because its toast holds Undo.

## How it looks and behaves

### While it saves

Each kind of change shows its working state in its own place:

| Change | Working state |
|---|---|
| A form in a sheet | Every field is disabled, and the save button keeps its label beside a spinner. Closing waits until the save is done. |
| A status change, or another dialog that saves | The action shows a spinner beside its label, and Cancel is disabled. The panel or dialog stays open until the save ends. |
| A switch in a grid | The switch shows its new value and is disabled until the save ends. |
| A ticked task | The box shows ticked straight away. |
| A file | Its row shows a spinner while it uploads. The form cannot be saved until every file is done. |

A button's label never changes to say what is happening, such as "Saving…". A page or a card that waits for its data
shows a loading state instead. See [Loading](loading.md) for that state.

### When it goes through

What confirms a save depends on whether the screen already shows the change:

| Change | What confirms it |
|---|---|
| A filter, a sort, a search, a switch in a settings sheet, or a new order of options | Nothing more, because the list or the switch shows the change |
| A form in a sheet | The sheet closes, and a toast states the result, such as "Note added." |
| A ticked task, a status change, a card dropped on a board, or a pick in a roles grid | A toast with the result and Undo, such as "Changed to Demo." |

### Where toasts show

Toasts sit at the top right of the screen on a desktop and across the top of the screen on a phone. Save
confirmations, errors, and new notifications share one stack. Three toasts show at most. Past three, one toast says how
many more arrived, such as "4 more new notifications." A toast that stays until it is closed has a close button (×).

### Undo

Undo sits in the toast of a change that saved without a form. A ticked task, a status change, a card dropped on a board,
and a pick in a roles grid each offer Undo. Pressing Undo puts back everything that the change did, such as every permission
that one pick changed. A status change offers Undo only when the change can be reversed.

A change that cannot be taken back, such as a delete, asks first instead and offers no Undo.

### When it is refused

A refused save shows where the change was made, and nothing that people typed or chose is lost. A form keeps what was
typed. A control that saved at once returns to its saved value. An error that nothing on screen holds is a toast that
stays until it is closed, with a close button (×). See
[Errors and Validation](errors-and-validation.md) for where each kind of failure shows.

### When a sheet closes before it saves

A sheet guards what was typed in it in five steps:

1. Cancel, the ×, Escape, and a click outside all count as closing.
2. An untouched sheet closes at once, and so does a read-only sheet.
3. A sheet with typed input first asks "Discard Changes?" in a dialog. Continue Editing keeps the sheet as it was,
   and Discard Changes closes it.
4. While a save runs, closing waits until the save is done.
5. Closing forgets what was typed, including files uploaded for the form. The next opening starts fresh.

Several records open at once use other words for Discard Changes?. See [Message Templates](copy-templates.md) for
that wording.

## Rules

### Save a choice where it is made

- **Do:** Save a switch or a pick in a grid the moment it changes, with no Save button, so people see the change take
  effect.
- **Don't:** Put a Save Changes button under a grid of switches. Save each choice as it is made, so no one leaves the
  page and loses their changes.

### Offer Undo instead of asking first

- **Do:** Save a ticked task at once and offer Undo in its toast ("Task completed."), so taking it back is one
  click.
- **Don't:** Ask "Mark Task as Done?" before a change that can be taken back. Keep questions for what cannot be undone,
  so a confirmation still means the change is permanent.

### Keep the label and the sheet while it saves

- **Do:** Keep the save button's label ("Save Changes") beside a spinner, and keep the sheet open until the save ends,
  so people see which action is running.
- **Don't:** Change the label to "Saving…", or close the sheet before the save is done. Keep both in place, so a
  refusal still has a place to show.

### Confirm only what the screen does not show

- **Do:** Show "Note added." after a sheet saves and closes, and nothing after a switch flips or a row moves, so every
  message tells people something new.
- **Don't:** Show "Setting saved.", "Filters applied.", or "Order saved." when the screen already shows the change.
  Leave it out, so toasts stay worth reading.

### Discard a closed form's input

- **Do:** Let a closed sheet forget what was typed, asking first if something was typed, so no one loses work by
  accident.
- **Don't:** Reopen a sheet with last week's half-finished form. Start fresh each time, so people do not save stale
  data.

## When you can do it differently

A new order inside a form saves with the form, not at once. See [Reordering](../patterns/reordering.md) for that case.

## Works with

- See [Forms in Sheets](../patterns/forms-in-sheets.md) for the sheet that holds a form and its save button.
- See [Switches in a Grid](../patterns/switches-in-a-grid.md) for a switch that saves as it is flipped.
- See [Confirmations and Delete](../patterns/confirmations-and-delete.md) for the changes that ask first.
- See [Message Templates](copy-templates.md) for the words of a toast, an error, and Discard Changes?.
- See [Disabled With a Reason](disabled-with-a-reason.md) for a save button that stays enabled and refuses in place.
- See [Loading](loading.md) for a page that waits for its data.

## In code

- A form: `FormSheet` around `SheetForm` from `aperia-ds5`. `pending` disables every field through the fieldset and
  shows a `Spinner` beside `submit`. While `pending`, `FormSheet` ignores a close. `useSheetForm`'s `dirty` makes it ask
  Discard Changes?, and `useSheet` keys each opening, so a closed form starts fresh. After the save, call
  `onOpenChange(false)`, then `toast("Note added.")`.
- A refusal: `form.refused({ error, field? })`. It shows under the field, or above the buttons, and the sheet stays
  open.
- A change that saves at once: `toast("Changed to Demo.", { action: { label: "Undo", onClick } })` from `sonner`. Mount
  `Toaster` from `aperia-ds5` once, at the app's root. It places the stack (top right, across the top on a phone) and
  shows three toasts at most. An error toast that stays is `toast.error(message, { duration: Infinity, closeButton:
  true })`.
- A confirmation that saves: `ConfirmDialog`'s `onConfirm` may return a Promise. While it runs, the action shows a
  spinner and Cancel is disabled. When it fails, the dialog stays open with the error above its buttons.
- The reason dialog of a status change is an `AlertDialog` built in the app, with `Spinner`
  (`data-icon="inline-start"`) in the action, Cancel `disabled`, and the close ignored while pending, as the reason dialog
  on [Dialog](../components/dialog.md) is built.
- A switch in a grid: the flag switch on [Switches in a Grid](../patterns/switches-in-a-grid.md), `disabled` while it
  saves. A refusal sets it back and shows an `Alert` (`variant="destructive"`) above the table.
- Files: hold the save while `isUploading(files)`, and delete `stagedIds(files)` when the form closes unsaved.
