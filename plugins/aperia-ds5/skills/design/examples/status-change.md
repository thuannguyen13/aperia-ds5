# Status Change With a Reason

A status change with a reason asks people to record why a record moved to a new state.

## When to use

Use a status change with a reason when a record's state changes and the change must say why, such as a stage move or a
disposition. A status change is not a record form, so it never opens a sheet.

## How it looks and behaves

A status change opens in one of two places, depending on where it starts:

| Starts from | Opens as |
|---|---|
| A status in a table row | A small panel under the status badge. A chevron button beside the badge opens it. The button's tooltip names the change and the record, such as "Change Disposition for Harbor Lane Bistro LLC". |
| A record's page, or a card dropped on another column of a board | A dialog in the middle of the screen. |

The panel or dialog shows the change as the old status badge, an arrow, and the new status badge.

Every choice stays in view as a list of radio buttons, not behind a dropdown. A move to a state that has its own list of
reasons, such as Lost, also asks for one from that list.

The reason is a box labeled "Reason for Change". Focus starts in the box. Near the length limit, a count shows under it,
such as "1,850 / 2,000".

The title asks the change as a question, such as "Change to Lost?". The button states the change, such as "Change to
Lost".

The change then moves through these moments, in order:

| Moment | What happens |
|---|---|
| Pressing with no reason | The button stays enabled. "Enter a reason for the change." shows under the box. |
| Saving | The button shows a spinner, Cancel is grayed out, and the panel stays open. |
| Refused | The refusal shows inside the panel. What was typed stays, and focus goes back to the reason. |
| Closing | Focus goes back to what opened the change. After a board drop, that is the card. |
| Changed | A message at the corner of the screen states the result, such as "Changed to Demo.", with Undo when the change can be reversed. |

## Before and after

- **Before:** Each status is a solid colored button with a dropdown arrow. Its panel has no reason, and its Submit
  button stays grayed out until something is picked.
- **After:** The status is a badge, with a small chevron button beside it. The panel shows the change, such as "Unworked
  → Contact Merchant", and asks for the reason. Its button names the change, such as "Change to Contact Merchant".

## Rules

### Show status as a badge

- **Do:** Show the status badge, with a chevron button beside it that opens the change, so the status reads as a state.
- **Don't:** Show the status as a solid colored button. Show a badge with a small chevron, so the status does not
  compete with the real actions.

### Keep the button enabled

- **Do:** Keep the button enabled and refuse a missing reason in place ("Enter a reason for the change."), so people
  learn what is missing the moment they press.
- **Don't:** Gray out the button until the user types. Keep it enabled and say what is missing, so no one wonders why it
  will not press.

### Keep every choice in view

- **Do:** Show every choice as a radio button, so people see all the options at once.
- **Don't:** Hide the choices behind a dropdown. Show the choices as radio buttons, so no one has to open a list to see
  them.

## When you can do it differently

A status change has no exceptions.

## Which patterns it uses

- See [Confirmations and Delete](../patterns/confirmations-and-delete.md) for the dialog's title and button.
- See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for why the button stays enabled.
- See [Tables](../patterns/tables.md) for the status in a row.
- See [Record Page](record-page.md) for where the dialog starts on a record.
- See [Copy](../foundations/copy.md) for naming the action on a button and asking with the action's name.

## In code

The app builds it from aperia-ds5 parts and the recipes on the pattern and component pages:

- From a row: a `Popover` anchored to the status `Badge` (`PopoverAnchor`), opened by an icon button (the recipe from
  [Button](../components/button.md)) with a chevron and the label "Change Disposition for …". From a record page or a
  board drop: an `AlertDialog`.
- The change: two `Badge`s and an arrow icon. The choices: `RadioGroup` in a `FieldSet`. The reason: `Textarea` with
  `maxLength` and the length count from [Forms in Sheets](../patterns/forms-in-sheets.md), `autoFocus`ed, and
  `FieldError` for the refusal.
- While saving: `Spinner` in the action (`data-icon="inline-start"`) and Cancel `disabled`; ignore the close while
  pending. After: `toast("Changed to Demo.", { action: { label: "Undo", onClick } })`.
- After a board drop, return focus to the card in `onCloseAutoFocus`.
