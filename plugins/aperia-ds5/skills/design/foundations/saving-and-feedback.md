# Saving and Feedback

Saving and feedback decide when each change is saved and how the app tells people that it went through or failed. See
[Message Templates](copy-templates.md) for the words of each message.

## Anatomy

A toast is the small message that appears at the corner of the screen after a change. It has four parts, and three of
them show only sometimes.

1. **Icon** (optional). It is a small picture before the message that shows the kind of toast, such as success, warning,
   or error. A plain toast has none.
2. **Message**. It is a line of text that states the result, such as "Task completed."
3. **Action** (optional). It is a button at the end of the toast. It runs a step on the change that was just made, such as
   Undo.
4. **Close button** (optional). It is a round × button on the toast's top corner. A toast that stays until it is closed
   has one.

## When to use

A change saves at once when the control that makes it also shows it. A change waits for a button when it needs a form, a
reason, or a decision first. Find the change in this table:

| Change | When it saves | Why |
|---|---|---|
| A filter, a sort, or a search on a list | It applies at once, with no button to apply. It is kept in the page's address, not saved to a record. | The list is the result, and it changes as people choose. See [Filters](../patterns/filters.md). |
| A switch in a grid, such as a notification setting | At once, as it is flipped | The grid has no Save button. See [Switches in a Grid](../patterns/switches-in-a-grid.md). |
| A pick in a grid, such as a role's level | At once, as it is picked | The grid has no Save button. |
| A ticked task | At once, as the box is ticked | Ticking a task is one click and easy to take back. |
| A new order of options | At once, as the row is dropped. Inside a form, it saves with the form. | What people see is the saved order. See [Reordering](../patterns/reordering.md). |
| A card dropped on another column of a board | At once, as the card is dropped, with Undo. A new status that needs a reason asks for it first. | A move is one drag and easy to take back. |
| A status change with a reason | When its button is pressed, in a small panel or a dialog | It waits for the reason. |
| A delete, or another step whose consequence people must know first | When the confirmation's action is pressed | It cannot be taken back. See [Confirmations and Delete](../patterns/confirmations-and-delete.md). |
| Adding or editing a record | When the save button is pressed, in a form in a sheet | No record is saved half-filled. See [Forms in Sheets](../patterns/forms-in-sheets.md). |
| A setting that is not a list, such as the app's default currency | When Save Changes is pressed, in the sheet that Edit opens from the setting's card | Its values change together, so they save together. |
| A file on a form | It uploads as soon as it is picked, and it is saved with the form. | See [Files and Images](../patterns/files-and-images.md). |

## How it looks and behaves

Each moment of a change has its own feedback. A working state shows while a save runs. A toast shows when the change goes
through. A message in place shows when the save is refused. A Discard Changes? dialog shows when a sheet closes after
typing in it.

### While it saves

Each kind of change shows its working state in its own place:

| Change | Working state |
|---|---|
| A form in a sheet | Every field is disabled, and the save button shows a spinner beside its label. |
| A status change, or another dialog that saves | The action shows a spinner beside its label, and Cancel is disabled. The panel or dialog stays open until the save ends. |
| A switch in a grid | The switch shows its new value and is disabled until the save ends. |
| A ticked task | The box shows ticked straight away. |
| A file | Its row shows a spinner while it uploads. The form cannot be saved until every file is done. |

A page or a card that waits for its data shows a loading state instead. See [Loading](loading.md) for that state.

### When it goes through

What confirms a save depends on whether the screen already shows the change:

| Change | What confirms it |
|---|---|
| A filter, a sort, a search, a switch in a settings sheet, or a new order of options | Nothing more, because the list or the switch shows the change |
| A form in a sheet | The sheet closes, and a toast states the result, such as "Note added." |
| A ticked task, a status change, a card dropped on a board, or a pick in a roles grid | A toast with the result and Undo, such as "Changed to Demo." |

### Where toasts show

Toasts sit at the top right of the screen on a desktop and across the top of the screen on a phone. Save confirmations,
errors, and new notifications share one stack. Three toasts show at most. Past three, one toast says how many more
arrived, such as "4 more new notifications."

A toast closes on its own, except an error toast. An error toast stays until it is closed, so it has a close button (×).

### Undo

Undo sits in the toast of a change that saved without a form. A ticked task, a status change, a card dropped on a board,
and a pick in a roles grid each offer Undo. Pressing Undo puts back everything that the change did, such as every
permission that one pick changed. A status change offers Undo only when the change can be reversed.

### When it is refused

A refused save shows where the change was made, and nothing that people typed or chose is lost. The message sits beside
the field, above the buttons, or above the grid that holds the control. A form keeps what was typed. A control that saved
at once returns to its saved value. An error that nothing on screen holds is a toast that stays until it is closed. See
[Errors and Validation](errors-and-validation.md) for where each kind of failure shows.

### When a sheet closes before it saves

A sheet guards what was typed in it in four steps:

1. Cancel, the ×, Escape, and a click outside all count as closing.
2. An untouched sheet closes at once, and so does a read-only sheet.
3. A sheet with typed input first asks "Discard Changes?" in a dialog. Continue Editing keeps the sheet as it was, and
   Discard Changes closes it.
4. While a save runs, closing waits until the save is done.

Several records open at once use other words for Discard Changes?. See [Message Templates](copy-templates.md) for that
wording.

## Rules

### 1. Save a choice where it is made

A switch or a pick in a grid saves the moment it changes. The grid has no Save button, so no one leaves with choices
that were never saved.

- **Do:** Let a switch in a notification grid save as it is flipped, and show it disabled until the save ends.
- **Don't:** Put a Save Changes button under a grid of switches.

### 2. Offer Undo instead of asking first

A change that can be taken back saves at once and offers Undo. A change that cannot be taken back, such as a delete, asks
first and offers no Undo, so a confirmation always means the change is permanent.

- **Do:** Save a ticked task at once and offer Undo in its toast ("Task completed.").
- **Don't:** Ask "Mark Task as Done?" before a change that can be taken back.

### 3. Keep the label and the sheet while it saves

A save button keeps its label beside a spinner. The sheet stays open until the save ends, so a refusal still has a place
to show.

- **Do:** Keep "Save Changes" beside the spinner.
- **Don't:** Change the label to "Saving…", or close the sheet before the save is done.

### 4. Confirm only what the screen does not show

A toast states a result that the screen does not already show, so every toast tells people something new. A change that
offers Undo is the one exception, because its toast holds Undo.

- **Do:** Show "Note added." after a sheet saves and closes, and nothing after a switch flips or a row moves.
- **Don't:** Show "Setting saved.", "Filters applied.", or "Order saved." when the screen already shows the change.

### 5. Discard a closed form's input

Closing a form discards what was typed, including files uploaded for the form, so the next opening starts fresh and no
one saves stale data by mistake. A sheet with typed input asks first, as the steps above describe.

- **Do:** Type in Add Note, press Escape, and let the sheet reopen empty after Discard Changes.
- **Don't:** Keep the draft outside the sheet, so it closes without asking and reopens with last week's text.

### 6. Show every toast in the one stack

Save confirmations, errors, and new notifications all show in one stack, so toasts from different causes never cover
each other and no more than three show at once.

- **Do:** Send a new-notification toast through the same stack as a save confirmation.
- **Don't:** Mount a second stack, or draw a toast of your own, for one kind of message.

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
