# Errors and Validation

Errors and validation tell people what went wrong, in the place they were working, so they can fix it. See
[Message Templates](copy-templates.md) for failures, successes, and confirmations, and [Copy](copy.md) for the voice of
every message.

## Anatomy

A field in error has three parts. The message shows only while the field is in error, and the control's red border shows
with it.

1. **Label**. It is a line of text above the control that names the field, such as "Email".
2. **Control**. It is the input, select, or other control where people enter the value. While the field is in error, its
   border turns red and a red halo surrounds it.
3. **Error message** (optional). It is a line of text under the control that says what to enter. It goes away as soon as
   the value changes.

## What is available

An error is a problem that stops people or the app. Each error shows where the action happened, so people see what
went wrong at the place they were working. Find the situation in this table:

| Situation | Where the error shows | Why |
|---|---|---|
| A field holds a missing or wrong value | A message under the field, and the field's border turns red | People fix the value where they typed it. |
| A form or a dialog is refused, and no one field is at fault | A message above the buttons. No field turns red. The form or dialog stays open with what was typed. See [Forms in Sheets](../patterns/forms-in-sheets.md). | Nothing typed is lost, and no field is blamed for a problem it did not cause. |
| A control that saves on change is refused, such as a switch in a grid | The control returns to its saved value, and an alert above the grid names the row, such as "Pipeline: Email could not be saved. Try again." | The control shows what is saved, and the message stays beside the work. |
| A confirmed action fails, such as a delete | A message inside the confirmation, which stays open. See [Confirmations and Delete](../patterns/confirmations-and-delete.md). | People can try again without starting over. |
| A file is refused in a drop zone | A message under the drop zone, beside the refused file | It stays where the file was dropped until it is read. |
| A card or a list cannot load its content | The empty state "Failed to Load" in its place, with Try Again. See [Empty States](empty-states.md). | The rest of the page still works. |
| Something holds for the whole page, such as an outage | A banner alert under the page header. See [Banner Alerts](../patterns/banner-alerts.md). | People read it before they start working on the page. |
| An action fails and nothing on screen holds it, such as a background job or a page the person has left | A toast that stays until it is closed with its close button (×), names what failed, and offers the fix, such as "Report export failed. Try again." See [Saving and Feedback](saving-and-feedback.md) for toasts in general. | No place is left on screen to show it. |

### Messages for a field

A field's message says what to enter, in a few words that name the field. Each kind of problem has one template:

| Problem | Template | Example |
|---|---|---|
| A required field that people type in is empty | Enter \<a or the\> \<field\>. | Enter a name. |
| A required pick is empty, such as a select, a date, a radio, or a file | Pick \<a or the\> \<field\>. | Pick a stage. |
| A group of checkboxes needs at least one | Pick at least one \<field\>. | Pick at least one channel. |
| A common format is wrong, such as an email address or a phone number | Enter a valid \<field\>. | Enter a valid email address. |
| A format of the app's own is wrong | Enter \<the field\> as \<pattern\>. | Enter the routing number as 9 digits. |
| A value is too short | Enter at least \<N\> characters. | Enter at least 8 characters. |
| A value is outside a limit | \<Field\> must be \<limit\>. | Logo must be 2 MB or smaller. |
| A value breaks a rule | The rule, stated neutrally | Merchant IDs only include letters and numbers. |
| Two fields must match | \<Fields\> do not match. | Passwords do not match. |
| A value is already in use | A \<record\> with this \<field\> already exists. | A contact with this email already exists. |

### Messages for a form or an action

A message that no field holds says what happened and how to recover. It adds why, or how to avoid the problem, only
when people need it.

| Problem | Template | Example |
|---|---|---|
| The form is refused, and the app cannot tell which field is wrong | The problem, with no field blamed | The email or password is incorrect. |
| Something people cannot do | You cannot \<action\>. Then who can act, only when the user can reach that person in the app. | You cannot deactivate yourself. · You cannot move yourself to a role without Settings. Ask another admin. |
| No access | You do not have access to \<action\>. The same message for everyone. | You do not have access to change rates. |
| The app or a device is the cause | The problem, then the fix | The file service is not responding. Try again in a few minutes. |
| An action did not complete | A failure message. See [Message Templates](copy-templates.md). | Failed to save changes. Try again. |

Every message follows Errors and Validation 9, 10, and 11.

## How it looks and behaves

### When the app checks

A form is checked in this order:

1. Pressing save checks every field. Each field in error shows its message, and focus moves to the first field in
   error.
2. A message under a field goes away as soon as the value changes.
3. When people leave that field, the app checks it again, and the message comes back if the value is still wrong.
4. A check that needs the server, such as whether a name is already in use, runs with the save. Its message shows
   under the field it names, or above the buttons when it names no field. On a long form, a check that saves people real
   work may run when they leave the field, before the save. Whether a merchant ID is in use is an example.
5. A form with every field correct saves, and the app shows the result as
   [Saving and Feedback](saving-and-feedback.md) says.

### Prevent the error first

A control stops a wrong value in these ways:

- A pick replaces typing wherever the values are a known list.
- A date picker disables the dates outside the allowed range.
- A field with a length limit stops at the limit and shows its count. A note under the field says
  "\<Field\> is limited to \<N\> characters." when people try to type past it.
- A field that allows only some characters ignores the others, and a note under it says which it allows, such as
  "Only letters and numbers."
- A number typed outside its range returns to the nearest allowed value when people leave the field.

### Spaces around a value

The app removes spaces at the start and the end of a value before it checks the value and before it saves it. A
password keeps its spaces. The field still shows what was typed until the save goes through, so nothing jumps while
people type.

## Rules

### 1. Check on save, not while people type

The app checks a form when its save button is pressed, and checks a field again as people leave it after it showed an
error. It never checks while people type, so no one is told they are wrong halfway through typing.

- **Do:** Leave a field plain while someone types, such as "dana@north".
- **Don't:** Show "Enter a valid email address." after the first letter.

### 2. Keep the save button enabled

The save button stays enabled, because pressing it is what shows people each missing value under its field.

- **Do:** Press Save Changes with the field empty, and show what is missing under the field.
- **Don't:** Disable the save button until every field is filled. People are left guessing why nothing happens.

### 3. Prevent an error instead of reporting it

A control stops a wrong value where it can, so people never have to read an error for it.

- **Do:** Disable the dates outside the allowed range in a date picker.
- **Don't:** Accept any date and refuse it when the form saves.

### 4. Show an error where the action happened

An error shows under its field, above a form's or a dialog's buttons, or above the grid for a control that saves on
change. People see what went wrong where they were working.

- **Do:** Name the row in an alert above a grid, such as "Pipeline: Email could not be saved. Try again."
- **Don't:** Show a toast that disappears while the form, grid, or file is still on screen. People miss it or think the
  change was saved.

### 5. Turn a field red only when it is at fault

A refusal that no field caused shows as one message above the buttons, and every field stays as it was. People are not
sent to fix a field that is not wrong.

- **Do:** Show "The email or password is incorrect." above the buttons, and leave both fields plain.
- **Don't:** Turn the email and the password fields both red for one refusal.

### 6. Keep a refused form open with what was typed

A form or a dialog that is refused stays open with everything people typed, so they fix the problem without starting
again.

- **Do:** Keep the sheet open, with its values, when the server refuses the save.
- **Don't:** Close the form or clear its fields after a refusal.

### 7. Use a toast only when nothing on screen holds the error

A toast shows an error only when no place on screen is left for it, such as a background job or a page the person has
left. The toast stays until it is closed, so no one misses it.

- **Do:** Name what failed and offer the fix, such as "Report export failed. Try again."
- **Don't:** Let an error toast close on its own.

### 8. Name the field and the fix

A field's message names the field and says what to enter, so people know what to change.

- **Do:** Write "Enter a valid email address."
- **Don't:** Write "Invalid input." or "Something went wrong."

### 9. Write one message for each known cause

Each known cause has its own message, so people learn what happened and not only that something did.

- **Don't:** Show one message for several causes, such as "Something went wrong." for a refused file and a service that
  is down.

### 10. Write the problem and the fix in set voices

A message states the problem in the third person and the passive voice, and the fix in the active imperative. Both use
the present tense, so every error reads the same way and the fix is a command.

- **Do:** Write "The server could not be reached. Try again."
- **Don't:** Write "You entered the wrong password."

### 11. Name a dialog's exit by what it does

A dialog that stops an operation has **Cancel**. A dialog that only informs has **Close**, so the button says what it
does.

- **Don't:** Put Cancel on a dialog that only informs, since it has nothing to cancel.

## In code

- Check with `form.check(schema, draft)` from `useSheetForm` when the save is pressed. It shows each field's first
  message, moves focus to the first field in error, and checks those fields again on blur.
- Pass the server's refusal to `form.refused({ error, field? })`. With `field` it shows under that field; without it,
  above the buttons.
- A field in error has `aria-invalid` on its control and `FieldError` under it, inside its `Field`. The control draws
  the red border and halo itself.
- Leave `SheetForm`'s `ready` at its default, so the save button stays enabled.
- Trim text values with `.trim()` in the schema (zod's `z.string().trim()`), except a password.
- A confirmation that fails: `ConfirmDialog`'s `onConfirm` returns a Promise that rejects, and the dialog shows `error`.
- An error that nothing on screen holds: `toast.error(message)` from `aperia-ds5`, which stays until it is closed.
- A page-wide problem: `Alert` with `variant="destructive"`, as on [Banner Alerts](../patterns/banner-alerts.md).
