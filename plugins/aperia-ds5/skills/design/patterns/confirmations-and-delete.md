# Confirmations and Delete

A confirmation is a small dialog that asks before a change that cannot be undone, such as a delete.

## When to use

Use a confirmation in three cases:

- Before deleting or removing something, such as Delete Prospect, Remove Member, or Revoke Access.
- Before a step whose consequence the user must know first, such as Apply Template, which replaces lines already there.
- Before dropping what was typed in a form, with the question "Discard Changes?".

Do not use a confirmation for a save. A save goes through, or is refused in place.

## What is available

A confirmation has a title, one line on the consequence, and two buttons. The title names the change as a question,
such as "Delete Prospect?". The line states the consequence, such as "This permanently deletes the prospect and its
files." Cancel and the named action follow, such as "Delete Prospect".

A confirmation comes in two types:

| Type | Action color | Use when |
|---|---|---|
| Destructive | Destructive | The usual case, because most confirmations guard something that cannot be undone |
| Non-destructive | Primary | A step that changes content without deleting a record, such as Apply Template |

Delete has one place on each record, and the confirmation repeats it as its action. A record with its own page has
Delete last in its page header. A small record, which opens in a sheet, has Delete at the start of the sheet's footer,
in the destructive color and away from Save. See [Tables](tables.md) for which records have a page.

## How it looks and behaves

A confirmation opens, waits for a choice, and closes in this order:

1. The dialog opens centered over a dimmed page and grows in slightly.
2. Cancel, then the action, sit at the bottom right. On a phone the buttons stack, with the action on top.
   See [Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.
3. While the delete runs, the action shows a spinner beside its label, and Cancel is disabled. The confirmation stays
   open.
4. A failed delete shows its error above the buttons, such as "Prospect failed to delete. Try again." The
   confirmation stays open, so people can try again or cancel.
5. A delete that goes through closes the confirmation, and a toast states the result, such as "Prospect deleted."
6. After a delete from a record's page, people land on the list that the record came from.
7. A confirmation opened from a small record's sheet sits over the sheet, which stays as it was under it. Once the
   record is deleted, the sheet closes too.
8. Closing the confirmation by Cancel or Escape puts focus back on what opened it.

A Delete that cannot be used stays on screen. It says why on hover and focus, with "This item is in use and cannot be
deleted."

## Rules

### Name the change, as a question

- **Do:** Ask the change as a question ("Delete Prospect?") with a matching action ("Delete Prospect"), so people know
  exactly what they are confirming.
- **Don't:** Write "Are you sure?", "Confirm Delete Prospect", or a bare "Delete", "OK", or "Yes". Name the change, so
  people read what will happen.

### Say the consequence in one line

- **Do:** Say the consequence in one line ("This permanently deletes the note."), so people decide at a glance.
- **Don't:** Write a paragraph about what the app does next, or skip the line when the delete also removes related
  items (such as files). Keep one plain line, so people read it.

### Use the destructive color for removal

- **Do:** Use the destructive color on Delete, Remove, and Revoke, and the primary color on a step that deletes no
  record, so the color warns before the click.
- **Don't:** Put Delete in the primary color, or Apply Template in the destructive color. Match the color to the action,
  so the destructive color always means removal.

### Keep Delete on the record

- **Do:** Put Delete last in a record page's header, or first in a small record's sheet footer, so it is deliberate and
  easy to find.
- **Don't:** Put Delete on every table row, or beside Save in the sheet's footer. Keep it on the record, so no one
  deletes by accident.

### Keep the confirmation open when a delete fails

- **Do:** Show the error inside the confirmation, above its buttons ("Prospect failed to delete. Try again."), and keep
  it open, so people can try again where they started.
- **Don't:** Close the confirmation and show the failure in a toast, or close it with no word. Keep it open with the
  error, so no one believes the record is gone.

### Say why a record cannot be deleted

- **Do:** Keep a Delete on screen that says "This item is in use and cannot be deleted." on hover and focus, so people
  know why.
- **Don't:** Make Delete disappear without a word, or offer one that then fails. Keep it with its reason, so nothing
  surprises people.

## When you can do it differently

An entry that someone wrote inside a card, such as a note, can be deleted by its author from the entry itself, with a
small delete icon. The icon shows on hover or focus, and always on touch screens. It still asks first, such as with
"Delete Note?".

A status change with a reason uses the reason dialog, with the change shown and a reason to fill in. Its action is
named after the change, such as "Change to Lost". See [Dialog](../components/dialog.md) for the reason dialog.

## Works with

- See [Forms in Sheets](forms-in-sheets.md) for Delete in the sheet's footer and for Discard Changes?, which guards what
  was typed. Forms in Sheets also holds the choice between a sheet, a dialog, and a page of its own.
- See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for the in-use phrases.
- See [Buttons and Actions](buttons-and-actions.md) for button types and labels.
- See [Dialog](../components/dialog.md) for the dialog itself.
- See [Saving and Feedback](../foundations/saving-and-feedback.md) for a change that offers Undo instead of asking.

## In code

- `ConfirmDialog` from `aperia-ds5`: `title` (the question), `action` (the named action), the one line on the
  consequence as `children`, `variant` (`"destructive"` by default, `"default"` for a step that deletes no record, such
  as Apply Template), `onConfirm`, and `cancel` to rename Cancel. Its buttons are `type="button"`, so it never submits a
  form it opens in, and it returns focus to its opener. Never build a confirmation from a raw `AlertDialog`.
- `onConfirm` may return a Promise. While it runs, `ConfirmDialog` shows the action's spinner and disables Cancel.
  When it fails, the dialog stays open and shows the error above its buttons.
- After a delete from a record's page, navigate to the list the record came from, then `toast("Prospect deleted.")`.
- A record sheet's Delete is `SheetDelete` in `SheetForm`'s `start`, with its own confirm. Close the sheet yourself
  once the delete went through. When it cannot be deleted pass `reason` (`IN_USE_DELETE` for one in use); it stays
  focusable through `aria-disabled` and its tooltip says why.
- A record page's Delete is the last of `RecordActions`; `deleteBlocked` blocks it with `IN_USE_DELETE` or a reason.
