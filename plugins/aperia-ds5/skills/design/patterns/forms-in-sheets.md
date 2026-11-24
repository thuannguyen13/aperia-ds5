# Forms in Sheets

A form in a sheet is a panel that slides in from the right to add or edit a record.

## When to use

Use a form in a sheet to add a record or change one, such as Add Contact or Edit Prospect. Open it from anywhere the
record is added or edited, such as its list, its page, a card, or a picker in another form.

### A sheet, a dialog, or a page of its own

Where a task opens depends on what people do in it. Tables show records, sheets edit them, and dialogs ask a short
question. Find the situation in this table:

| Situation | Choice | Why |
|---|---|---|
| Adding or editing a record, such as Add Contact or Edit Prospect | A form in a sheet from the right | Each record has one form, the same wherever the record is added or edited. |
| Reading a record | The record's own page, never a sheet or a dialog | The whole record is in view on one page of cards. |
| Deleting or removing something, or a step whose consequence people must know first | A confirmation, which is a dialog | It must be answered before the change happens. See [Confirmations and Delete](confirmations-and-delete.md). |
| Closing a sheet after typing in it | "Discard Changes?" in a dialog over the sheet | No one loses what they typed by accident. |
| A short task, such as one or two choices | A dialog | It needs an answer before people go on. See [Dialog](../components/dialog.md). |
| Changing a record's status with a reason | A small panel under the status from a table row, or a dialog from the record's page or a board | A status change is not a record form, so it never opens a sheet. See [Status Change With a Reason](../examples/status-change.md). |
| Editing rows of amounts that add up, such as an opportunity's line items | One wider sheet, with a titled card per group | The page shows the lines read-only, so no one changes an amount by accident. See [Line Items With Totals](../examples/line-items.md). |
| Turning settings on and off, such as Notification Settings | A sheet of switches with no Save button | Each switch saves as it is flipped. See [Switches in a Grid](switches-in-a-grid.md). |
| Bringing records in from a file | A small panel under the Import button, then one large dialog for the review | The review saves nothing, and the list refreshes when the dialog closes. See [Import Wizard](../examples/import.md). |

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
Delete when the person may delete. See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for when a
sheet opens read-only.

## How it looks and behaves

A form in a sheet goes through these steps, from opening to closing:

1. The sheet slides in from the right, set 16px in from the window, with a 56px header. On a phone it fills the
   screen.
2. The fields scroll between the header and the footer. The footer never scrolls away.
3. While the save runs, the fields and the save button show the working state on
   [Saving and Feedback](../foundations/saving-and-feedback.md).
4. A save that goes through closes the sheet.
5. A save that is refused leaves the sheet open with everything that was typed. The message sits under the field it
   names, such as "A contact with this email already exists." When no field shows it, the message sits above the
   buttons. Focus moves to the first field in error.
6. A message under a field goes away as soon as the value changes. It comes back when the field loses focus, if the
   value is still wrong.
7. Closing after typing asks "Discard Changes?" first, and closing forgets what was typed. See
   [Saving and Feedback](../foundations/saving-and-feedback.md) for every way a sheet closes.

## Rules

See [Saving and Feedback](../foundations/saving-and-feedback.md) for discarding a closed form's input.

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

## When you can do it differently

A status change with a reason, rows of amounts that add up, and a settings sheet of switches each use another form.
Each one is a row of the table under When to use.

## Works with

- See [Confirmations and Delete](confirmations-and-delete.md) for Delete at the footer's start and for Discard Changes?.
- See [Pickers](pickers.md) for fields that pick a record, and for adding a missing one from the picker.
- See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for a field that waits on another.
- See [Buttons and Actions](buttons-and-actions.md) for the footer's buttons.
- See [Message Templates](../foundations/copy-templates.md) for choosing a toast, an alert, or a message on the field.
- See [Saving and Feedback](../foundations/saving-and-feedback.md) for the working state, the toast after a save, and
  Discard Changes?.

## In code

- `FormSheet` (the sheet: `open`, `onOpenChange`, `title`, optional `description`) around `SheetForm` (body and
  footer: `form`, `onSubmit`, `pending`, `submit` for the save's label, `start` for Delete, `beside` for a step before
  saving such as Preview, `readOnly`), with `useSheetForm` for the draft and its messages and `useSheet` to key each
  opening. All from `aperia-ds5`.
- Check with `form.check(schema, draft)` before saving; pass a refusal (`{ error, field? }`) to `form.refused(result)`.
  Close with `onOpenChange(false)` only when the save went through. Never build the sheet, footer or error handling
  yourself, and never show an error in a toast.
- An optional field's label ends with "(Optional)".
- The wider sheet for line items is `FormSheet` with `className="data-[side=right]:sm:max-w-6xl"` (a bare
  `max-w-6xl` loses to the sheet's own width) and one card per group. Build each card's header as the titled card
  recipe on [Card](../components/card.md).

### Form section

Build a form section in the app from `FieldSet`, `FieldLegend`, `FieldDescription`, and `FieldGroup` from
`aperia-ds5`.

```tsx
<div className="-mx-4 border-t px-4 pt-5 first:border-t-0 first:pt-0">
  <FieldSet>
    <FieldLegend variant="legend" className="mb-4 font-semibold">Portfolio</FieldLegend>
    <FieldDescription className="-mt-3">Optional line under the title</FieldDescription>
    <FieldGroup>{/* the section's fields */}</FieldGroup>
  </FieldSet>
</div>
```

- The line above each section reaches the sheet's edges, because `-mx-4 px-4` steps out of the form's 16px padding.
- The first section has no line, because the sheet's header already draws one.
- A legend sits outside the fieldset's gap, so it keeps its own `mb-4` to the fields.

### Length count

Build the length count in the app from `FieldDescription` from `aperia-ds5`, under the field it counts.

```tsx
{max !== undefined && value.length >= max * 0.9 && (
  <FieldDescription className="text-right tabular-nums">
    {value.length.toLocaleString("en-US")} / {max.toLocaleString("en-US")}
  </FieldDescription>
)}
```

- The count shows only once 90% of the limit is used, so a short note carries no number.
- Give the input or textarea the same `maxLength`, so the limit stops typing instead of refusing the save.
