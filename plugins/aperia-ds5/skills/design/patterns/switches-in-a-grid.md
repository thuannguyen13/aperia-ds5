# Switches in a Grid

Switches in a grid show on or off choices inside a table, each labeled Yes or No.

## When to use

Use switches in a grid for many on or off choices laid out with one row per thing and one column per option, such as
In App, Email, and Teams.

For a single choice on a form, use a switch or a checkbox with its label instead.

## What is available

A switch in a grid has three states:

| State | Look | Reason |
|---|---|---|
| On or off | A small switch with "Yes" or "No" beside it. "No" shows in muted text. | None |
| Locked | Disabled, with a lock icon | Shown on hover and focus, such as "You cannot remove your own role's access to Roles." |
| Waiting | Disabled, while the saved values load | None |

## How it looks and behaves

A switch and its word act as one control:

1. The switch and its word are one target. The whole target highlights on hover, as a short list picker does when a
   grid holds one.
2. Selecting anywhere on the target, or pressing Space, flips the switch.
3. A screen reader reads the full name of the switch. The name is the row followed by the column, such as "Pipeline:
   Opportunity assignment, Email".
4. A locked switch can still be reached by the keyboard, so its reason is heard too.
5. A settings sheet of switches saves each switch as it is flipped and has no Save button.
6. A refused save flips the switch back. The reason shows in place, above the table, with no toast.

## Rules

### Show the word, not only the color

- **Do:** Put Yes or No beside a switch, so its state reads without color.
- **Don't:** Show a bare switch whose state is only its color, or a colored dot. Add the word, so everyone can read it.

### Lock with a reason

- **Do:** Show a locked switch disabled, with a lock that says why on hover, so people know it cannot change.
- **Don't:** Hide the switch, or let it flip back without saying why. Show it locked with a reason, so nothing seems
  broken.

## When you can do it differently

A cell whose choice has more than two levels, such as None, Owned, and All, uses a short list picker instead.

## Works with

Switches in a grid work with three other patterns:

- See [Disabled With a Reason](disabled-with-a-reason.md) for the lock and its tooltip.
- See [Pickers](pickers.md) for a cell with more than on and off.
- See [Forms in Sheets](forms-in-sheets.md) for the sheet that a settings grid opens in.

## In code

- `FlagSwitch` from `aperia-ds5`: `on`, `onChange`, `label` (the full name a screen reader reads, such as "Sales Rep:
  Prospects, Delete"), `reason` to lock it, `disabled` while loading. `className` goes on the switch, for an app's
  own "on" color.
