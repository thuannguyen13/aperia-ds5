# Disabled With a Reason

A disabled control cannot be used at the moment and shows the reason why.

## When to use

Disable a control and give its reason in three cases:

- A button, row, chip, or switch cannot be used, and the user should know why. An example reason is "This item is in
  use and cannot be deleted."
- A field waits on another field. An example reason is "Pick a prospect first."
- A record or option is locked because something uses it.

## What is available

A reason shows in one of two places:

| Place | Where it shows | Used for |
|---|---|---|
| Tooltip | Over the control, on hover and focus | A disabled button, picker row, chip, or switch |
| Line under a field | Under the field, in place of its usual description | A disabled field |

A control with a tooltip stays reachable from the keyboard, so keyboard and screen reader users get the reason too. A
disabled field keeps its placeholder, which says what goes in it.

Three fixed phrases cover a record or option that something uses. Use them word for word:

- "This item is in use and cannot be deleted."
- "This item is in use and cannot be changed."
- "This item is in use and cannot be removed."

## How it looks and behaves

A disabled control looks disabled and shows its reason until the reason clears:

1. The control looks disabled. The not-allowed pointer shows over the whole control.
2. In Light, a disabled field has a muted fill and muted text. In Dark, a disabled field shows at reduced opacity.
   Every kind of field looks the same when disabled. A disabled button or switch shows at reduced opacity in both
   modes.
3. Hovering or focusing a button, row, chip, or switch shows the reason in a tooltip. A field shows its reason under
   it at all times.
4. Once the reason clears, such as when the field it waits on is filled, the control is enabled. The line under it
   goes away.
5. A control with no reason to give renders as it is, with no tooltip.

## Rules

### Say why, every time

- **Do:** Give every disabled control its reason (such as "This item is in use and cannot be deleted." on a disabled
  Delete), so people know why it is off.
- **Don't:** Leave a disabled button with no explanation. Say what is missing, so people do not have to guess.

### Prefer an enabled button that refuses in place

- **Do:** Keep Save enabled and, when it is pressed with a field missing, show the message beside that field, so
  people see what to fix.
- **Don't:** Show a disabled primary button waiting for input. Keep it enabled, so people learn what is
  missing by pressing it.

### Use the fixed phrase as it is

- **Do:** Use "This item is in use and cannot be deleted." exactly, with nothing added, so the reason reads the same
  everywhere.
- **Don't:** Write "This item cannot be deleted because it is used by 3 opportunities", add a "so" clause, or name what
  uses it. Use the fixed phrase, so it stays short and consistent.

### Put a field's reason under it

- **Do:** Put a field's reason under it (such as a disabled Contact field with the placeholder "Pick a contact" and
  "Pick a prospect first." below it), so people see what to do first.
- **Don't:** Write the reason into the placeholder, or disable a field with nothing said. Put it under the field, so it
  stays readable.

## When you can do it differently

Two cases show no reason on the control.

A sheet that someone may not change opens read-only. Its fields stay disabled. Close replaces Save. No field shows its
own reason.

A switch whose value is still loading is disabled with no reason to give. See
[Switches in a Grid](switches-in-a-grid.md) for the loading state.

## Works with

A disabled control works with four other patterns:

- See [Confirmations and Delete](confirmations-and-delete.md) for a Delete that cannot be used.
- See [Pickers](pickers.md) for rows and chips that cannot be picked or removed.
- See [Switches in a Grid](switches-in-a-grid.md) for a locked switch.
- See [Buttons and Actions](buttons-and-actions.md) for icon buttons and their tooltips.

## In code

- `ReasonTooltip` (`reason`) around anything that can't be picked, removed or changed; with no reason it renders its
  content as it is.
- `IconButton` takes `reason` (the tooltip while disabled). `SheetDelete` and `RecordActions` block Delete with
  `IN_USE_DELETE`. These stay focusable through `aria-disabled` rather than `disabled`.
- A field's line is `useFieldNote` (returns the note and the id for `aria-describedby`); `EntityPicker`, `PickField`,
  `MoneyField`, `FileDrop`, `FilePicker` and `ImagePicker` take `reason` themselves.
- `FlagSwitch` and `EntityPicker` items (`reason`, `kept`) carry their own reasons.
- `IN_USE_DELETE` is exported; write the changed and removed phrases as they are above.
