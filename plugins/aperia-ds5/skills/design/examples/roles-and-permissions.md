# Roles and Permissions

Roles and permissions set what each role may do, in a grid of pickers and switches that save on change.

## When to use

The grid serves two screens, each for its own condition. Both screens use the same layout.

| Screen | Use when |
|---|---|
| Roles and Permissions | An admin sets what each role may do. |
| Notification Settings | A person chooses how each event reaches them, in the app, by email, or both. |

## How it looks and behaves

### Roles

Roles sit in a card titled "Roles". Add Role sits at the right of the card's header. The card holds a table that runs to
the card's edges.

Each permission is a row, and each role is a column. Rows are grouped by area under a muted band, such as "Prospects" or
"Settings".

Each cell holds the role's level for that row. A cell is one of two controls:

| Control | Choices |
|---|---|
| Picker | A choice of levels, such as None, Owned, and All. |
| Switch | On and off, with Yes or No beside it. |

Use a picker when a permission has levels, and a switch when it is only on or off.

Each pick saves at once. A message shows at the bottom of the screen with Undo. A pick can change several permissions at
once, so Undo puts back everything the pick changed. The grid has no Save button.

A level that cannot change shows a lock that says why when pointed at or reached by keyboard. For example, an admin
cannot take Settings away from their own role.

Add Role opens a sheet that copies another role's permissions. Edit Role renames a role in the same sheet.

Deleting a role asks first, with the title "Delete Role?" and the description "This permanently deletes Sales Manager."
A role that has users cannot be deleted. Its Delete says "This item is in use and cannot be deleted."

### Notification Settings

Notification settings sit in a sheet titled "Notification Settings". The sheet opens from the notifications panel's
settings button and from the account menu.

The sheet holds a table laid out like Roles. Each event is a row, and rows are grouped by feature under a muted band.
Each channel is a column, such as In App or Email. Each cell is a switch, named in full for screen readers, such as
"Pipeline: Opportunity assignment, Email".

Each switch saves at once. The sheet has no Save button. The choices are read again each time the sheet opens.

A refused save flips the switch back and shows the reason above the table. No message shows at the bottom of the screen.

## Before and after

- **Before:** A grid of unnamed checkboxes has a Save Changes button under it. A red message shows at the bottom of the
  screen when the save fails.
- **After:** Each cell says its level or Yes and No, and saves the moment it changes. A refused change is explained
  above the table, with the switch back where it was.

## Rules

See [Saving and Feedback](../foundations/saving-and-feedback.md) for saving each choice as it is made, with Undo.

### Lay out choices the same way

- **Do:** Lay out rows for what is being set, grouped by area, and a column per role, or per channel, so people who
  learn one grid can read the other.
- **Don't:** Use a different layout for permissions and notifications, or a list of checkboxes with no names. Use one
  layout and name every row and column, so no one guesses what a box means.

### Explain what cannot change

- **Do:** Mark a locked cell with a lock that says why when pointed at or reached by keyboard, so people see it is
  locked by design.
- **Don't:** Gray out a cell with no reason. Add a lock that says why, so no one thinks it is broken.

## When you can do it differently

Show one role at a time, picked above the table, when the space is too narrow for every role's column.

## Which patterns it uses

- See [Cards and Tiles](../patterns/cards-and-tiles.md) for the Roles card and its flush table.
- See [Tables](../patterns/tables.md) for the grouped rows.
- See [Switches in a Grid](../patterns/switches-in-a-grid.md) for each on/off cell.
- See [Notifications](../patterns/notifications.md) for where Notification Settings opens from.
- See [Forms in Sheets](../patterns/forms-in-sheets.md) for Add Role and Edit Role.
- See [Confirmations and Delete](../patterns/confirmations-and-delete.md) for Delete Role.
- See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for a level that cannot change and a role in
  use.
- See [Message Templates](../foundations/copy-templates.md) for where a refused save shows.
- See [Saving and Feedback](../foundations/saving-and-feedback.md) for a pick or a switch that saves at once.

## In code

The app builds both from aperia-ds5 parts and the recipes on the pattern and component pages:

- Roles: the titled card from [Card](../components/card.md) (titled Roles, Add Role as its action) holding a flush
  `Table`. Each area is headed by the table group row from [Tables](../patterns/tables.md). A level cell is a `Select`
  of None, Owned, and All; an on/off cell is the flag switch from [Switches in a
  Grid](../patterns/switches-in-a-grid.md) with a full label. A cell that cannot change shows its reason (the flag
  switch's lock) or sits in `ReasonTooltip`. Each pick calls `toast(…, { action: { label: "Undo", … } })`.
- Add Role and Edit Role: `FormSheet` with `SheetForm`. Delete Role: `ConfirmDialog`, or `BlockedMenuItem` with
  `IN_USE_DELETE` for a role with users.
- Notification Settings: a `Sheet` (no form, nothing to save) holding a flush `Table` with table group rows and a
  flag switch per channel. A refused save sets the switch back and shows an `Alert` (`variant="destructive"`) above
  the table.
