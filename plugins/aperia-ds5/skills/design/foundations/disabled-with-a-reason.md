# Disabled With a Reason

Disabled With a Reason tells people why a control cannot be used right now, and when to leave an action out instead of
disabling it. See [Message Templates](copy-templates.md) for the words of a reason.

## Anatomy

A disabled control with its reason has four parts in two pairs. A button, switch, row, or chip has a control and a
tooltip, and a field has the field itself and a line under it. The tooltip and the line show only while their control
is disabled. The parts are those of a task's page with a blocked Delete and a Contact field that waits on a Prospect.

1. **Disabled control**. It is a button, switch, row, or chip that cannot be used right now. The control shows faded.
2. **Reason tooltip** (optional). It is a small box that opens over the control and gives the reason in one sentence.
3. **Disabled field**. It is a text field, select, or picker that cannot be used right now. The field keeps its
   placeholder, which says what goes in it.
4. **Field note** (optional). It is a line of text under the field that gives the reason, in place of the field's usual
   description.

## When to use

Whether people see an action depends on why they cannot take it. A role that can never take an action does not see it.
A person who cannot take it on this record, or at this moment, sees it disabled with the reason. Find the situation in
this table:

| Situation | Choice | Why |
|---|---|---|
| The person's role can never take the action, such as a role that never deletes prospects | Leave the action out everywhere it would show, such as a header button, a menu item, an Add row in a picker, or Add in an empty state | Nothing on screen offers what the person can never do. |
| The action is blocked on this record or at this moment, such as a record in use, a field that waits on another, or a closed record | Show the control disabled, with its reason | People learn what stands in the way, and the control works again once it clears. |
| A rule stops this one person, such as an admin taking Roles away from their own role | Show the control locked, with its reason, such as "You cannot remove your own role's access to Roles." | The same control works on other rows, so it stays and says why it does not work here. |
| A form's save, or an import with no row set to import, waits on input | Keep the button enabled, and refuse in place when it is pressed. See [Errors and Validation](errors-and-validation.md). | Pressing the button shows people what is missing. |
| The person's role may read a record but never change or delete it | Show the record with no Edit, no Delete, and no banner | People read the record like anyone else, and nothing offers a change the role can never make. |
| The person may delete a small record but not change it, such as an option | Its sheet opens read-only, with Delete | People reach Delete, and the fields show that nothing in them changes. |
| The person may neither change nor delete an option, and its row shows everything about it | The row does not open | The sheet would hold nothing the person can use. |
| The person reaches an action anyway, such as through a link or after their role changed | The save is refused in place with "You do not have access to \<action\>." | The message is the same for everyone. See [Message Templates](copy-templates.md). |

A value that a person may not see is hidden by its shape instead, such as $XX,XXX. See
[Money and Numbers](money-and-numbers.md) for a hidden amount. An empty state never hints at permissions. See
[Empty States](empty-states.md) for what it shows.

## What is available

A reason shows in one of three places:

| Place | Where it sits | Used for |
|---|---|---|
| Tooltip | Over the control | A disabled button, picker row, chip, or switch |
| Tooltip beside a menu item | Beside the item | A blocked item in a menu, such as Delete in a record's More actions menu |
| Line under a field | Under the field, in place of its usual description | A disabled field |

## How it looks and behaves

A disabled control looks disabled and shows its reason until the reason clears:

1. The control looks disabled. A disabled button or switch shows at reduced opacity in both modes. In Light, a disabled
   field has a muted fill and muted text. In Dark, a disabled field shows at reduced opacity. Text fields and selects
   look the same when disabled.
2. A disabled field, a switch, a blocked menu item, and a blocked action button show the not-allowed pointer.
3. Hovering over, focusing, or tapping a button, row, chip, or switch opens the reason in a tooltip. On a touch screen
   a tap opens it, and it stays open until a tap elsewhere closes it, because a finger cannot hover. A tooltip built
   without that tap behavior opens on hover and focus only.
4. A field shows its reason under it at all times while it is disabled.
5. A blocked menu item stays in its place in the menu, in muted text. Its reason opens beside it, on hover, as the
   keyboard lands on it, and on a tap. Selecting it does nothing, and the menu stays open.
6. A Delete that is blocked stays where it would be. That is a header button, a More actions menu item, or the Delete in
   a sheet. See [Confirmations and Delete](../patterns/confirmations-and-delete.md) and
   [Page Header](../patterns/page-header.md).
7. A locked switch is disabled, with a lock icon after its word and its reason in a tooltip. See
   [Switches in a Grid](../patterns/switches-in-a-grid.md).
8. A picker row or chip that cannot be picked or removed keeps its place and shows its reason in a tooltip. See
   [Pickers](../patterns/pickers.md).
9. A field that waits on another pick is disabled. Its placeholder stays. Its note says what to do first, such as
   "Pick a prospect first." Once the pick is made, the field is enabled and its note goes away.
10. A control with no reason to give renders as it is, with no tooltip. A read-only sheet shows no reason on its fields,
    because Close in place of the save button says that nothing in it changes. A switch whose value is still loading is
    disabled with no reason. See [Forms in Sheets](../patterns/forms-in-sheets.md) and
    [Switches in a Grid](../patterns/switches-in-a-grid.md).

An action that is left out leaves no gap. The actions around it close up and keep their order.

## Rules

### 1. Say why, every time

Every disabled control gives its reason, so people know what stands in the way.

- **Do:** Give a disabled Delete the reason "This item is in use and cannot be deleted."
- **Don't:** Leave a disabled Save button with no explanation. People have to guess what is missing.

### 2. Keep a blocked control reachable

A control that has a reason takes the pointer and the keyboard focus, so a keyboard or screen reader user hears the
reason too. A control disabled the plain way takes neither, so a tooltip placed on it never opens.

- **Do:** Show the reason through the library's own piece for it, such as the icon button's `reason`, so the control stays
  focusable.
- **Don't:** Put a plain tooltip on a button that has the `disabled` attribute. See [In code](#in-code) for the pieces.

### 3. Use the fixed phrase as it is

Three fixed phrases cover a record or option that something uses. Use them word for word, with nothing added, so the
reason reads the same everywhere:

- "This item is in use and cannot be deleted."
- "This item is in use and cannot be changed."
- "This item is in use and cannot be removed."

When some of several selected records cannot be deleted, Delete Selected is disabled. Its reason gives the count of
blocked records, in one of these two forms:

- "1 of the selected merchants is in use and cannot be deleted."
- "2 of the selected merchants are in use and cannot be deleted."

The count tells people how many to clear from the selection. See [Selecting Rows](../patterns/selecting-rows.md).

- **Do:** Write "This item is in use and cannot be deleted." exactly.
- **Don't:** Write "This item cannot be deleted because it is used by 3 opportunities", or add a "so" clause that names
  what uses it.

### 4. Put a field's reason under it

A field's reason goes in a line under the field, so people read it with the field and the placeholder keeps saying what
goes in it.

- **Do:** Show "Pick a prospect first." under a disabled Contact field with the placeholder "Pick a contact".
- **Don't:** Write the reason into the placeholder, or disable a field with nothing said.

### 5. Leave out what a role can never do

An action that a role can never take is left out everywhere it would show, so no one keeps meeting an action that never
works for them.

- **Do:** Leave Delete out of the record's actions for a role that never deletes.
- **Don't:** Show a disabled Delete that says "You do not have access to delete prospects." on every record, or a banner
  that says the record is read-only.

### 6. Show a record read-only to someone who cannot change it

A small record that a person may read but not change opens in a read-only sheet. Its fields are disabled and Close takes
the place of the save button, so no one types a change that cannot be saved.

- **Do:** Open a small record's sheet with its fields disabled and Close in place of Save.
- **Don't:** Open an editable form that refuses the save with "You do not have access to edit contacts."

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
