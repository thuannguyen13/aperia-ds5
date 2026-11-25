# Forms in Sheets

A form in a sheet lets people add or edit a record without leaving the page they are on. See [Tables](tables.md) for which records open in a sheet and which open on a page.

## Anatomy

A form in a sheet has nine parts. The section and Delete show only sometimes. The parts are those of the sheet that
edits a contact, open over the contacts list.

1. **Sheet**. It is a panel that slides in from the right over the page, with the page dimmed behind it. It holds a header, the form, and a footer.
2. **Title**. It is the text in the sheet's header that names the task, such as "Add Contact" or "Edit Prospect". A line under the header separates it from the fields.
3. **Close button**. It is an icon button (×) at the end of the header that closes the sheet, the same as Cancel.
4. **Section** (optional). It is a titled group of fields in a long form, such as Details or Portfolio. A line across the whole sheet sits above its title. The first section has no line, because the header already draws one.
5. **Label**. It is the text above a field's control that names what goes there, such as "Email". An optional field's label ends with "(Optional)". See [Copy](../foundations/copy.md) for how a label and a placeholder read.
6. **Control**. It is the input where people enter or pick the value, such as a text field or a text area.
7. **Delete** (optional). It is a destructive button at the start of the footer. A small record that has no page of its own shows it. See [Confirmations and Delete](confirmations-and-delete.md).
8. **Cancel**. It is a button without a fill at the right of the footer that closes the sheet. A read-only sheet shows Close in its place.
9. **Save button**. It is the primary button at the end of the footer. Its label is a verb and its object, such as "Save Changes" or "Add Contact".

## When to use

A task opens in a sheet, a dialog, or a page of its own, depending on what people do in it. Find the situation in this table:

| Situation | Choice | Why |
|---|---|---|
| Adding or editing a record, such as Add Contact or Edit Prospect | A form in a sheet from the right | Each record has one form, the same wherever the record is added or edited. |
| Reading a record with its own related content, such as a prospect with contacts and activity | The record's own page, never a sheet or a dialog | The whole record is in view on one page of cards. |
| Reading a small record, such as an option, a note, a line item, or a task | Its sheet, read-only when the person may not change it | The record is a few fields, so one panel holds it. |
| Deleting or removing something, or a step whose consequence people must know first | A confirmation, which is a dialog. See [Confirmations and Delete](confirmations-and-delete.md). | It must be answered before the change happens. |
| A short question that needs an answer before people go on | A dialog. See [Dialog](../components/dialog.md) for the four kinds of dialog. | It holds one decision and closes. |
| Changing a record's status with a reason | A small panel under the status from a table row, or the reason dialog from the record's page or a board drop | A status change is not a record form, so it never opens a sheet. |
| Turning settings on and off, such as Notification Settings | A sheet of switches with no save button. See [Switches in a Grid](switches-in-a-grid.md). | Each switch saves as it is flipped. |
| Bringing records in from a file | A small panel under the Import button, then the review dialog | The review saves nothing, and the list refreshes when the dialog closes. |

## What is available

A form in a sheet comes in three kinds:

| Kind | Used for | What differs |
|---|---|---|
| Form sheet | Adding or editing a record | The footer holds Cancel and the save button, and Delete on a small record. |
| Read-only sheet | A small record that the person may read but not change | The fields stay disabled. The footer holds Close in place of Cancel and the save button, plus Delete when the person may delete. See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for when a sheet opens read-only. |
| Wider sheet | Editing rows of amounts that add up, such as an opportunity's line items | It holds a titled card for each group of lines. The record's page shows the lines read-only, so no one changes an amount by accident. |

## How it looks and behaves

A form in a sheet goes through these steps, from opening to closing:

1. The sheet slides in from the right and sits in from the edges of the window, with rounded corners. On a phone the sheet takes the full width and height. See [Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.
2. The fields scroll between the header and the footer. The footer never scrolls away.
3. Pressing the save button checks the form. See [Errors and Validation](../foundations/errors-and-validation.md) for when the form is checked and where each message shows.
4. While the save runs, the fields and the save button show the working state on [Saving and Feedback](../foundations/saving-and-feedback.md).
5. A save that goes through closes the sheet, and a toast states the result.
6. A save that is refused leaves the sheet open with everything that was typed.
7. Closing after typing asks "Discard Changes?" first, and closing forgets what was typed. See [Saving and Feedback](../foundations/saving-and-feedback.md) for every way a sheet closes.

## Rules

### 1. Use one form for each record

Each record has one form. It adds and edits the record wherever that happens, such as a list, a page, or a picker, so people learn one form for each record.

- **Do:** Open the same add form from a Prospect picker as from the prospects list.
- **Don't:** Add a smaller "quick add" form beside the full one, so no record is saved half-filled.

### 2. Split a long form with sections

A long form groups its fields under section titles, each with a line across the sheet, so the sheet stays flat and people find a group by its title. A sheet of line items is the one exception, and it uses a titled card for each group (see Wider sheet under What is available).

- **Do:** Put a section title and a line across the sheet over each group, such as Details and Portfolio.
- **Don't:** Put boxes or cards inside the sheet to group fields.

## In code

- `FormSheet` (the sheet: `open`, `onOpenChange`, `title`, optional `description`) around `SheetForm` (body and
  footer: `form`, `onSubmit`, `pending`, `submit` for the save's label, `start` for Delete, `beside` for a step before
  saving such as Preview, `readOnly`), with `useSheetForm` for the draft and its messages and `useSheet` to key each
  opening. All from `aperia-ds5`. Never build a form sheet from a raw `Sheet`.
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
