# Forms in Sheets

A form in a sheet is a panel that slides in from the right to add or edit a record.

## When to use

Use a form in a sheet to add a record or change one, such as Add Contact or Edit Prospect. Open it from anywhere the
record is added or edited, such as its list, its page, a card, or a picker in another form.

Do not use a sheet to show a record. A record is read on its own page. Tables show records, and sheets edit them.

## What is available

Each record has one form. The same form adds and edits the record, wherever that happens.

A form in a sheet has four parts, listed from top to bottom:

| Part | Content |
|---|---|
| Header | The title, such as "Add Contact" or "Edit Prospect" |
| Fields | The form's fields, under the header |
| Sections | Titled parts of a long form, such as Details or Portfolio, each with a line across the whole sheet above its title |
| Footer | Cancel, then the save button (such as "Save Changes" or "Add Contact"), at the right. On an existing record, Delete sits at the left. See [Confirmations and Delete](confirmations-and-delete.md). |

A read-only sheet serves someone who may not change the record. Its fields stay disabled. Its footer holds Close, plus
Delete when the person may delete.

## How it looks and behaves

A form in a sheet goes through these steps, from opening to closing:

1. The sheet slides in from the right, set 16px in from the window, with a 56px header. On a phone it fills the
   screen.
2. The fields scroll between the header and the footer. The footer never scrolls away.
3. While the save runs, every field is disabled, and the save button keeps its label beside a spinner. Closing waits
   until the save is done.
4. A save that goes through closes the sheet.
5. A save that is refused leaves the sheet open with everything that was typed. The message sits under the field it
   names, such as "A contact with this email already exists." When no field shows it, the message sits above the
   buttons. Focus moves to the first field in error.
6. A message under a field goes away as soon as the value changes. It comes back when the field loses focus, if the
   value is still wrong.
7. Closing a sheet after typing in it first asks "Discard Changes?" with the line "What you entered in this form is
   lost." The dialog offers Continue Editing and Discard Changes. Cancel, the ×, Escape, and a click outside all count
   as closing. An untouched sheet closes at once.
8. Closing forgets what was typed. The next opening starts fresh.

## Rules

### Use one form for each record

- **Do:** Open the same add form from a picker as from the record's list page (such as Add Prospect), so people learn
  one form for each record.
- **Don't:** Add a smaller "quick add" form beside the full one. Reuse the full form, so no record is saved half-filled.

### Show errors in place, and keep the sheet open

- **Do:** Show the error under its field ("Enter a valid email address.") and keep the sheet open with what was typed,
  so people fix it in place.
- **Don't:** Show a toast saying the save failed, or close the sheet and lose the user's work. Keep the sheet open, so
  nothing typed is lost.

### Mark optional fields, not required ones

- **Do:** Mark only optional fields ("Phone (Optional)"), so required ones need no marker.
- **Don't:** Put a red asterisk on every required field. Mark the optional ones, so the form carries fewer marks.

### Give every field a short label

- **Do:** Name the field in a short label ("Start Date") and use a placeholder only for an example ("name@example.com"),
  so the label stays visible while typing.
- **Don't:** Leave a field with only a placeholder, or write "Please enter the start date" as its label. Use a short
  label, so people know what goes there.

### Split a long form with sections

- **Do:** Split a long form with a section title and a line across the sheet (Details, Portfolio), so it reads as parts.
- **Don't:** Put boxes or cards inside the sheet to group fields. Use section titles, so the sheet stays flat and easy
  to scan.

### Discard a closed form's input

- **Do:** Let a closed sheet forget what was typed, asking first if something was typed, so no one loses work by
  accident.
- **Don't:** Reopen a sheet with last week's half-finished form. Start fresh each time, so people do not save stale
  data.

## When you can do it differently

Three cases use another form:

- Changing a record's status with a reason is not a record form. From the status in a table row, it opens in a small
  panel under the status. From the record's page, it opens in a dialog.
- Rows of amounts that add up, such as an opportunity's line items, are edited in one wider sheet, with a titled card
  per group.
- A settings sheet of on/off switches, such as Notification Settings, saves each switch as it is flipped and has no
  Save button. See [Switches in a Grid](switches-in-a-grid.md) for the switches.

## Works with

- See [Confirmations and Delete](confirmations-and-delete.md) for Delete at the footer's start and for Discard Changes?.
- See [Pickers](pickers.md) for fields that pick a record, and for adding a missing one from the picker.
- See [Disabled With a Reason](disabled-with-a-reason.md) for a field that waits on another.
- See [Buttons and Actions](buttons-and-actions.md) for the footer's buttons.

## In code

- `FormSheet` (the sheet: `open`, `onOpenChange`, `title`, optional `description`) around `SheetForm` (body and
  footer: `form`, `onSubmit`, `pending`, `submit` for the save's label, `start` for Delete, `beside` for a step before
  saving such as Preview, `readOnly`), with `useSheetForm` for the draft and its messages and `useSheet` to key each
  opening. All from `aperia-ds5`.
- Check with `form.check(schema, draft)` before saving; pass a refusal (`{ error, field? }`) to `form.refused(result)`.
  Close with `onOpenChange(false)` only when the save went through. Never build the sheet, footer or error handling
  yourself, and never show an error in a toast.
- Sections are `FormSection` (`title`). A long text field shows `LengthCount` under it once 90% of its limit is used.
- An optional field's label ends with "(Optional)".
- The wider sheet for line items is `FormSheet` with `className="data-[side=right]:sm:max-w-6xl"` (a bare
  `max-w-6xl` loses to the sheet's own width) and a `TitledCard` per group.
