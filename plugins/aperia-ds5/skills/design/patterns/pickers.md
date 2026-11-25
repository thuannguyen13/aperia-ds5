# Pickers

Pickers let people choose a record, such as a person or a company, or an option from a short list, in a form field.

## Anatomy

A record picker has nine parts. The picked picture, the detail, the badge, the chosen mark, and the Add row show only
sometimes. The parts are those of a record picker, the picker most forms have, with its list open. See [People and
Pictures](people-and-pictures.md) for the picture of each kind of record.

1. **Field**. It is a text field with a chevron at its end. Typing narrows the list, and its placeholder says what to
   pick, such as "Pick a prospect".
2. **Picked picture** (optional). It is the avatar at the start of the field. It shows the picture of the record that
   is picked, so it shows only once a record is picked.
3. **List**. It is a panel that opens under the field and holds one row for each record. It shows about 14 rows before
   it scrolls.
4. **Row**. It is one line of the list for one record. It holds the record's picture, name, detail, and badge.
5. **Row picture**. It is the record's avatar at the start of the row.
6. **Detail** (optional). It is a line of muted text after the name, such as the record's city.
7. **Badge** (optional). It is a small gray label after the detail, such as "Customer".
8. **Chosen mark** (optional). It is a check at the end of the row of the record that is picked.
9. **Add row** (optional). It is the last row of the list, under a divider. It holds a plus and what it adds, such as
   "Add Prospect", and shows only when the app gives the picker a form to add with.

## What is available

Three pickers cover every field. Find what is being picked in this table to choose one.

| Picker | Use it for | What people see |
|---|---|---|
| Record picker | A record, such as a person, a company, a product, or a prospect | A field to type in. Its list shows each record's picture, name, a line of detail, and a badge. |
| Short list | An option that is not a record, such as a stage, a reason, or a queue | A field that opens the options by name, or by their own look, such as a priority with its flag. It has no search. |
| Drafted item | An item that can exist only once its record exists, such as the first opportunity of a new prospect | A field whose list offers only an Add row. The item shows in the field once it is drafted. |

A yes or no is a checkbox or a switch, not a picker.

The record picker comes in three variations:

| Variation | What people see |
|---|---|
| Several records | The picks show as chips in one field, each with its picture. Typing narrows the list. |
| Grouped | The list is split under labels, such as owners under their teams (Enterprise, Mid-Market). |
| Optional | A clear button (×) shows while a record is picked. An empty field reads "No [field]", such as "No priority". |

## How it looks and behaves

### Finding a record

Typing narrows the list in the same way as search everywhere else. Matching ignores case, accents, and punctuation. See
[Motion](../styles/motion.md) for how a list that changes while people type behaves.

When nothing matches, the list reads "Nothing matches." Before anything is typed, an empty list reads "None yet."

A field with no options to pick says where options are added, in a line under it. An example is "No lost reasons yet.
Add them in Settings." See [Empty States](../foundations/empty-states.md) for what an empty state never
says.

### Adding a record

The Add row stays in the list whatever is typed. Picking it opens the record's own form in a sheet over the form that
holds the picker, and the new record's name starts as what was typed. Once the record is saved, the picker picks it and
focus returns to the picker. The form underneath keeps its input. See [Forms in Sheets](forms-in-sheets.md) for the
form.

A form that was opened from an Add row has no Add row in its own pickers, so forms never stack on forms.

### A drafted item

A drafted item is saved with the record being added, so its list offers only its Add row. Once the item is drafted, the
list offers Edit and Remove rows for it. After the record is saved, the field is disabled and a line under it reads
"Added. Edit it on its own page."

### A picker that cannot be used yet

A picker that waits on another pick is disabled and keeps its placeholder. A line under it says why, such as "Pick a
prospect first." See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for the reasons of controls in
general.

### On a phone

On a phone, the list is as wide as the field and never taller than the space left on the screen. Add opens the
record's form in a sheet that fills the screen. See [Screen Sizes](../foundations/screen-sizes.md) for every part on a
phone.

## Rules

### 1. Show each record's picture

A record's row shows its picture and a line of detail, so people tell records with similar names apart.

- **Do:** Use the record picker for prospects, so each shows its logo, or its monogram, and its city.
- **Don't:** Use a plain dropdown of names for records.

### 2. Match the picker to the data

A record is picked in the record picker and an option that is not a record in the short list, so each choice looks like
what it is.

- **Do:** Use the short list for Stage and the record picker for Prospect.
- **Don't:** Pick a stage in the record picker, whose rows are built for pictures and details that a stage does not have.

### 3. Offer "All …" as its own choice

A picker that can mean every record offers "All …" as its own choice, and an empty field means nothing is picked, so no
one gets every record by accident.

- **Do:** Offer "All owners" in the owner picker of a report.
- **Don't:** Let an empty owner picker mean all owners.

### 4. Add a missing record from the picker

A record picker that may add a record ends its list in an Add row. The row opens the record's own form and then picks
the new record, so people never leave the task.

- **Do:** Open the same Add Prospect form that the Prospects page uses.
- **Don't:** Put a smaller add form inside the picker, or send people to another page to add the record.

### 5. Say why a row or chip cannot be used

A row that cannot be picked stays in the list, looks disabled, and shows its reason on hover. A chip that cannot be
removed has no remove button (×) and shows its reason on hover, so people do not think the app is broken.

- **Do:** Show "Away until 12/01/2026. Pick someone else." on a row, and "This item is in use and cannot be removed."
  on a chip.
- **Don't:** Take a row out of the list, or leave a row or chip with nothing to say on hover.

## In code

- `EntityPicker` from `aperia-ds5` for every record: `items` (or `groups`), `value`, `onChange`, `placeholder`,
  `multiple` for chips, `clearable` for an optional pick, `add` for the Add row, `disabled` with `reason` for the line
  under it. Each item takes `reason` (why it cannot be picked) and `kept` (why its chip cannot come off). Put it in a
  `Field` with `FieldLabel htmlFor={id}` and `FieldError`.
- `PickField` for a short fixed list (`none` says what an empty list means). Records are never a `PickField`.
- Add: pass `add={{ label: "Add Prospect", form: <ProspectForm /> }}` (a `PickerAdd`, built by the feature that owns
  the record, for whoever may add one). The form is the record's one form; it reads `useAdded()` for what was typed
  (`name`) and hands back the new id with `then`. The picker opens it in a sheet and picks the new record. A custom
  list's Add row uses `AddOption` as its face.
- An item that waits on the record being added is a `DraftField` (`draft`, `shown`, `add` with the item's form,
  `onChange`); once saved with the record pass `saved`, and it reads `SAVED`.
