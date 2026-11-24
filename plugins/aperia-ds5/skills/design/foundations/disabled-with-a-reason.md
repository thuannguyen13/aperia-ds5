# Disabled With a Reason

A disabled control cannot be used at the moment and shows the reason why.

## When to use

Disable a control and give its reason in three cases:

- A button, row, chip, or switch cannot be used, and the user should know why. An example reason is "This item is in
  use and cannot be deleted."
- A field waits on another field. An example reason is "Pick a prospect first."
- A record or option is locked because something uses it.

An action that a person's role can never take is not disabled. It is left out, as the table below sets out.

### Hide, disable, or show read-only

Whether people see an action depends on why they cannot take it. A role that can never take an action does not see
it. A person who cannot take it on this record, or at this moment, sees it disabled with the reason. Find the situation
in this table:

| Situation | Choice | Why |
|---|---|---|
| The person's role can never take the action, such as a role that never deletes prospects | Leave the action out everywhere it would show, such as a header button, a menu item, an Add row in a picker, or Add in an empty state | Nothing on screen offers what the person can never do. |
| The action is blocked on this record or at this moment, such as a record in use, a field that waits on another, or a closed record | Show the control disabled, with its reason | People learn what stands in the way, and the control works again once it clears. |
| A rule stops this one person, such as an admin taking Roles away from their own role | Show the control locked, with its reason, such as "You cannot remove your own role's access to Roles." | The same control works on other rows, so it stays and says why it does not work here. |
| The person's role may read a record but never change or delete it | Show the record with no Edit, no Delete, and no banner | People read the record like anyone else, and nothing offers a change the role can never make. |
| The person may delete a small record but not change it, such as an option | Its sheet opens read-only, with Delete | People reach Delete, and the fields show that nothing in them changes. |
| The person may neither change nor delete an option, and its row shows everything about it | The row does not open | The sheet would hold nothing the person can use. |
| The person reaches an action anyway, such as through a link or after their role changed | The save is refused in place with "You do not have access to \<action\>." | The message is the same for everyone. See [Message Templates](copy-templates.md). |

A value that a person may not see is hidden by its shape instead, such as $XX,XXX. See
[Money and Numbers](money-and-numbers.md) for a hidden amount.

## What is available

A reason shows in one of three places:

| Place | Where it shows | Used for |
|---|---|---|
| Tooltip | Over the control, on hover and focus | A disabled button, picker row, chip, or switch |
| Tooltip beside a menu item | Beside the item, on hover and as the keyboard lands on it | A blocked item in a menu, such as Delete in a record's More actions menu |
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
4. A blocked menu item stays in its place in the menu, in muted text. The keyboard still lands on it, and selecting it
   does nothing.
5. Once the reason clears, such as when the field it waits on is filled, the control is enabled. The line under it
   goes away.
6. A control with no reason to give renders as it is, with no tooltip.

An action that is left out leaves no gap. The actions around it close up and keep their order.

## Rules

### Say why, every time

- **Do:** Give every disabled control its reason (such as "This item is in use and cannot be deleted." on a disabled
  Delete), so people know why it is off.
- **Don't:** Leave a disabled button with no explanation. Say what is missing, so people do not have to guess.

### Prefer an enabled button that refuses in place

- **Do:** Keep Save enabled and, when it is pressed with a field missing, show the message beside that field, so
  people see what to fix. An import button with no row set to import also stays enabled and refuses above the
  buttons.
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

### Leave out what a role can never do

- **Do:** Leave Delete out of the record's actions for a role that never deletes, so the screen offers only what the
  person can do.
- **Don't:** Show a disabled Delete that says "You do not have access to delete prospects." on every record, or a
  banner that says the record is read-only. Leave both out, so no one keeps meeting an action that never works for
  them.

### Show a record read-only to someone who cannot change it

- **Do:** Open a small record's sheet with its fields disabled and Close in place of Save, so people read the record and see that it
  does not change here.
- **Don't:** Open an editable form that refuses the save ("You do not have access to edit contacts."). Open it
  read-only, so no one types a change that cannot be saved.

## When you can do it differently

Two cases show no reason on the control.

A read-only sheet shows no reason on its fields. Close in place of Save says that nothing in it changes.

A switch whose value is still loading is disabled with no reason to give. See
[Switches in a Grid](../patterns/switches-in-a-grid.md) for the loading state.

## Works with

A disabled control works with these other pages:

- See [Confirmations and Delete](../patterns/confirmations-and-delete.md) for a Delete that cannot be used.
- See [Page Header](../patterns/page-header.md) for a record's actions and its More actions menu.
- See [Pickers](../patterns/pickers.md) for rows and chips that cannot be picked or removed.
- See [Switches in a Grid](../patterns/switches-in-a-grid.md) for a locked switch.
- See [Buttons and Actions](../patterns/buttons-and-actions.md) for icon buttons and their tooltips.
- See [Forms in Sheets](../patterns/forms-in-sheets.md) for the read-only sheet.
- See [Empty States](empty-states.md) for an empty state, which never hints at permissions.
- See [Message Templates](copy-templates.md) for the words of a no-access message.

## In code

- `ReasonTooltip` (`reason`) around anything that cannot be picked, removed or changed; with no reason it renders its
  content as it is.
- An icon button shows its reason as the tooltip while disabled (the icon button recipe on
  [Button](../components/button.md)). `SheetDelete` and `RecordActions` block Delete with
  `IN_USE_DELETE`. These stay focusable through `aria-disabled` rather than `disabled`.
- A field's line is `useFieldNote` (returns the note and the id for `aria-describedby`); `EntityPicker`, `PickField`,
  `MoneyField`, `FileDrop`, `FilePicker` and `ImagePicker` take `reason` themselves.
- `EntityPicker` items (`reason`, `kept`) carry their own reasons. A switch in a grid shows its reason with a lock, as
  the flag switch recipe on [Switches in a Grid](../patterns/switches-in-a-grid.md) does.
- `IN_USE_DELETE` is exported; write the changed and removed phrases as they are above.
- Leave out what a role can never do: `RecordActions` without `onEdit` or `onDelete`, a `false` entry in its `actions`,
  `EntityPicker` without `add`, and `EmptyState` without `action`. An option row spreads nothing instead of
  `opensOnClick` when the sheet would hold nothing for the viewer.
- Block what cannot happen now: `RecordActions`' `deleteBlocked`, or `blocked` (the reason) on an action.
  `BlockedMenuItem` (`reason`) is a blocked item in any `DropdownMenu`; it stays focusable through `aria-disabled` and
  refuses its own select.
- A read-only sheet is `SheetForm` with `readOnly`: the fieldset is disabled, the footer holds Close and `start`, and
  closing never asks Discard Changes?.
