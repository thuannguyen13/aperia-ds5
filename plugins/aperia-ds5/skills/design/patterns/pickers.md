# Pickers

Pickers are fields for choosing a record or an option from a list.

## When to use

Choose the picker by what is being picked:

| Choice | Use |
|---|---|
| A record, such as a person, a company, a product, or a prospect | Record picker |
| An option that is not a record, such as a stage, a reason, or a queue | Short fixed list |
| A yes or no | A checkbox or a switch, not a picker |

## What is available

Pickers come in seven forms:

| Form | What it shows |
|---|---|
| One record | A field to type in. Its list shows each record's picture, name, a line of detail in muted text, and a badge. The picked record's picture shows at the start of the field. |
| Several records | The picks show as chips in one field, each with its picture. Typing narrows the list. |
| Grouped | The list is split under labels, such as owners under their teams (Enterprise, Mid-Market). |
| Short fixed list | A field that opens the options by name, or by their own look, such as a priority with its flag. |
| Optional | A clear button shows while something is picked. An empty field reads "No [field]", such as "No priority". |
| Add from the picker | The list ends in an Add row, such as "Add Prospect", for people who may add a record. |
| Waiting on a new record | The list offers only its Add row. The item is saved with the record being added. |

## How it looks and behaves

A picker has six behaviors, listed in the order people meet them:

1. Typing narrows the list in the same way as search everywhere else. Matching ignores case, accents, and punctuation.
   The list shows about 14 rows before it scrolls.
2. A row that cannot be picked stays in place and looks disabled. Hovering it shows the reason.
3. In a field of several records, a chip that cannot come off has no remove button (×). Hovering it shows the reason.
4. When nothing matches, the list says so. Before anything is typed, an empty list says there is nothing yet. A short
   fixed list says where its options are added, such as "No lost reasons yet. Add them in Settings." It never says who
   to ask, so no one chases access they cannot act on.
5. Add opens the record's own form in a sheet over the form that holds the picker. The new record's name starts as
   what was typed. Once the record is saved, the picker picks it and focus returns to the picker. The form underneath
   keeps its input.
6. A picker that waits on another pick is disabled and keeps its placeholder. A line under it says why, such as "Pick a
   prospect first."

On a phone, the list is as wide as the field and never taller than the space left on the screen. Add opens the
record's form in a sheet that fills the screen. See [Screen Sizes](../foundations/screen-sizes.md)
for every part on a phone.

## Rules

### Show each record's picture

- **Do:** Show each record's logo or initials beside its name, with a line of detail, so people pick the right one.
- **Don't:** Use a plain dropdown of names, or list record names in a short-list field. Use the record picker, so
  similar names are easy to tell apart.

### Use the record picker for records and the list field for short lists

- **Do:** Use the record picker for records (such as Prospect) and the list field for short fixed lists (such as
  Stage), so each choice looks like what it is.
- **Don't:** Pick a stage from a record picker with pictures, or a record from a plain dropdown. Match the picker to
  the data, so people know what they are choosing.

### Offer "All …" as its own choice

- **Do:** When a picker can mean every record, such as the owners a report covers, offer "All owners" as its own
  choice and let empty mean nothing picked, so the choice is explicit.
- **Don't:** Let an empty picker silently mean "all". Add the "All …" choice, so no one gets everything by accident.

### Add a missing record from the picker

- **Do:** End the list with an Add row (such as Add Prospect) that opens the record's own form and then picks the new
  record, so people never leave the task.
- **Don't:** Put a smaller add form in the picker, or send the user away to add it. Open the same form, so the user
  stays in their task.

### Say why a row or chip cannot be used

- **Do:** Show a blocked row disabled, with its reason on hover ("Away until 12/01/2026. Pick someone else."), and make a
  chip with no remove button say "This item is in use and cannot be removed.", so people know why.
- **Don't:** Make rows disappear, or do nothing when they are selected. Show them with their reason, so people do not
  think the app is broken.

## When you can do it differently

Two cases change how a picker works.

A form opened from a picker's Add row has no Add row in its own pickers, so forms never stack on forms.

An item that can exist only once its record exists is drafted from the picker's Add row. An example is the first
opportunity of a new prospect. The item is saved with the record. After the save, the field reads "Added. Edit it on
its own page."

## Works with

Pickers work with three other patterns:

- See [Forms in Sheets](forms-in-sheets.md) for the form that every Add row opens.
- See [People and Pictures](people-and-pictures.md) for the picture on every row.
- See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for rows, chips, and fields that cannot be
  used.

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
