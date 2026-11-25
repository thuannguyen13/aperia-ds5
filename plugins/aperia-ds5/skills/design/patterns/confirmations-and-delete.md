# Confirmations and Delete

A confirmation makes people approve a change that cannot be undone before the app makes it, and it is how a record is
deleted. See [Dialog](../components/dialog.md) for the dialog it is built on.

## Anatomy

A confirmation has five parts, the dialog and the four parts inside it. A delete confirmation opens over a record's page
and asks before the record is deleted. After a failed delete, an error line also shows above the buttons.

1. **Dialog**. It is a small alert dialog, centered over a dimmed page, that holds focus until people choose.
2. **Title**. It is the question that names the change, such as "Delete Prospect?".
3. **Consequence**. It is one line of text under the title that says what will happen, such as "This permanently
   deletes Harbor Lane Bistro and its 3 contacts."
4. **Cancel**. It is a button that closes the dialog and changes nothing.
5. **Action**. It is the button that makes the change. Its label names the change, such as "Delete Prospect".

## When to use

Use a confirmation in three cases:

- Before deleting or removing something, such as Delete Prospect, Remove Member, or Revoke Access.
- Before a step whose consequence people must know first, such as Apply Template, which replaces lines already there.
- Before dropping what was typed in a form, with the question "Discard Changes?".

Do not use a confirmation for a save, which goes through or is refused in place. Do not use one for a change that people
can take back either, which saves at once and offers Undo. See
[Saving and Feedback](../foundations/saving-and-feedback.md) for Undo.

A status change that needs a reason uses the reason dialog, not a confirmation. It shows the change and a field for the
reason, and its action is named after the change, such as "Change to Lost". See [Dialog](../components/dialog.md) for
the reason dialog.

## What is available

A confirmation comes in two types:

| Type | Use when | Example |
|---|---|---|
| Destructive | The change removes something or cannot be taken back. Most confirmations are this type. | Delete Prospect, Remove Member |
| Non-destructive | The step changes content without deleting a record. | Apply Template |

## How it looks and behaves

A confirmation opens from the button that starts the change, and nothing changes until people press its action. See
[Dialog](../components/dialog.md) for how the dialog opens, holds focus, closes, and stacks its buttons on a phone. See
[Message Templates](../foundations/copy-templates.md) for the words of the title, the line, and the buttons.

1. While the change runs, the action shows a spinner beside its label, and Cancel is disabled. Escape does not close
   the confirmation either.
2. A failed change shows its error above the buttons, such as "Prospect failed to delete. Try again." The confirmation
   stays open. People can try again or cancel (Confirmations and Delete 4).
3. A change that goes through closes the confirmation, and a toast states the result, such as "Prospect deleted." See
   [Saving and Feedback](../foundations/saving-and-feedback.md) for toasts.
4. After a delete from a record's page, people land on the list that the record came from.
5. A confirmation opened from a small record's sheet sits over the sheet, which stays as it was under it. Once the
   record is deleted, the sheet closes too.
6. A Delete that cannot be used stays on screen and says why on hover and focus. See
   [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for when a Delete is blocked and for its words.

## Rules

### 1. Name the change, as a question

The title asks the change as a question, and the action repeats it, so people read what will happen before they press.

- **Do:** Ask "Delete Project?" and label the action "Delete Project".
- **Don't:** Write "Are you sure?", "Confirm Delete Project", or a bare "Delete", "OK", or "Yes".

### 2. Use the destructive color for removal

The action's color shows the kind of change before people press it. Delete, Remove, and Revoke use the destructive
color, and a step that deletes no record, such as Apply Template, uses the primary color. The destructive color then
always means removal.

- **Do:** Show Delete Project in the destructive color.
- **Don't:** Show Delete in the primary color, or Apply Template in the destructive color.

### 3. Keep Delete on the record

A record has one Delete, where the record opens, so no one deletes it by accident from a list. A record with its own
page has Delete last of its page header's actions, inside the More actions menu when there are four or more actions. A
small record, which opens in a sheet, has Delete at the start of the sheet's footer, in the destructive color and away
from Save. See [Tables](tables.md) for which records have a page.

An entry written inside a card, such as a note, is the exception. Its author deletes it from the entry, and it still
asks first, such as with "Delete Note?". See [Tables](tables.md) for that button.

- **Don't:** Put a Delete button on every table row, or beside Save in the sheet's footer.

### 4. Keep the confirmation open when a delete fails

A failed delete shows its error inside the confirmation, so people can try again where they started. A closed
confirmation tells people the record is gone.

- **Do:** Show "Project failed to delete. Try again." above the buttons, with the confirmation still open.
- **Don't:** Close the confirmation and show the failure in a toast, or close it with no word.

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
