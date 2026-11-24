# Errors and Validation

Errors and validation set when the app checks what people enter, where each error shows, and how its message reads.
See [Message Templates](copy-templates.md) for failures, successes, and confirmations.

## When to use

Use this page for every form, every control that saves on change, and every action that can fail. Use it also when a
page or a card cannot load its content.

## What is available

An error is a problem that stops people or the app. Each error shows where the action happened, so people see what
went wrong at the place they were working. Find the situation in this table:

| Situation | Where the error shows | Why |
|---|---|---|
| A field holds a missing or wrong value | A message under the field, and the field's border turns red | People fix the value where they typed it. |
| A form or a dialog is refused, and no one field is at fault | A message above the buttons. No field turns red. The form or dialog stays open with what was typed. | Nothing typed is lost, and no field is blamed for a problem it did not cause. |
| A control that saves on change is refused, such as a switch in a grid | The control returns to its saved value, and an alert above the grid names the row, such as "Pipeline: Email could not be saved. Try again." | The control shows what is saved, and the message stays beside the work. |
| A confirmed action fails, such as a delete | A message inside the confirmation, which stays open. See [Confirmations and Delete](../patterns/confirmations-and-delete.md). | People can try again without starting over. |
| A file is refused in a drop zone | A message under the drop zone, beside the refused file | It stays where the file was dropped until it is read. |
| A card or a list cannot load its content | The empty state "Failed to Load" in its place, with Try Again. See [Empty States](empty-states.md). | The rest of the page still works. |
| Something holds for the whole page, such as an outage | A banner alert under the page header. See [Banner Alerts](../patterns/banner-alerts.md). | People read it before they start working on the page. |
| An action fails and nothing on screen holds it, such as a background job or a page the person has left | A toast that stays until it is closed with its close button (×), names what failed, and offers the fix, such as "Report export failed. Try again." | No place is left on screen to show it. |

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

Every error message follows three rules:

- Write one message for each known cause, never one vague message for several causes.
- State the problem in the third person and the passive voice. State the fix in the active imperative. Use the present
  tense for both.
- A dialog that stops an operation has **Cancel**. A dialog that only informs has **Close**.

## How it looks and behaves

### When the app checks

The app checks a form when people press its save button, and never while they type. The save button stays enabled,
because pressing it is what shows people what is missing.

1. Pressing save checks every field. Each field in error shows its message, and focus moves to the first field in
   error.
2. A message under a field goes away as soon as the value changes.
3. When people leave that field, the app checks it again, and the message comes back if the value is still wrong.
4. A check that needs the server, such as whether a name is already in use, runs with the save. Its message shows
   under the field it names, or above the buttons when it names no field.
5. A form with every field correct saves, and the app shows the result as
   [Saving and Feedback](saving-and-feedback.md) says.

### Prevent the error first

A control that cannot hold a wrong value needs no error message. The app prevents an error before it reports one:

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

### Check on save, not while people type

- **Do:** Check a form when its save button is pressed, and check a field again as people leave it after it showed an
  error, so people finish typing before anything turns red.
- **Don't:** Show "Enter a valid email address." after the first letter. Wait for the save, so no one is told they are
  wrong halfway through typing.

### Keep the save button enabled

- **Do:** Keep the save button enabled, and show each missing value under its field when it is pressed, so people learn
  what to fix.
- **Don't:** Disable the save button until every field is filled. Keep it enabled, so no one is left guessing why
  nothing happens.

### Name the field and the fix

- **Do:** Write the fix with the field's name, such as "Enter a valid email address.", so people know what to change.
- **Don't:** Write "Invalid input." or "Something went wrong." Name the field and the fix, so the message helps.

### Turn a field red only when it is at fault

- **Do:** Show a refusal that no field caused above the buttons, such as "The email or password is incorrect.", and
  leave every field as it was, so no field is blamed.
- **Don't:** Turn the email and the password fields both red. Show one message above the buttons, so people are not
  sent to fix a field that is not wrong.

### Prevent an error instead of reporting it

- **Do:** Disable the dates outside the allowed range in a date picker, so a wrong date cannot be picked.
- **Don't:** Accept any date and refuse it when the form saves. Prevent it in the control, so people do not have to
  start again.

### Show an error where the action happened

- **Do:** Show an error under its field, above a form's buttons, or above the grid that holds the control, so people
  see what went wrong where they were working.
- **Don't:** Show a toast that disappears while the form, grid, or file is still on screen. Show the error in place, so
  no one misses it or thinks the change was saved.

## When you can do it differently

A check that needs the server and saves people real work may run when they leave the field, before the save. An
example is whether a merchant ID is already in use on a long form. Its message shows like any field error.

## Works with

- See [Message Templates](copy-templates.md) for failures, successes, and Discard Changes?.
- See [Copy](copy.md) for the voice of every message and the words that never appear in one.
- See [Forms in Sheets](../patterns/forms-in-sheets.md) for the sheet that stays open when a save is refused.
- See [Saving and Feedback](saving-and-feedback.md) for the working state of a save and for where toasts show.
- See [Disabled With a Reason](disabled-with-a-reason.md) for a control that cannot be used yet.
- See [Banner Alerts](../patterns/banner-alerts.md) for a message about the whole page.

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
