# Button Best Practices

Where buttons go and which type each one is, on a page, a card, a sheet and a dialog. The button types themselves are
in [Button](../components/button.md).

## Hierarchy

- **Primary** (blue) is the main action of its area, the one the user came to do. An area has one at most.
- **Outline** is every other action: Cancel, Edit, Export, Add in a card.
- **Ghost** is a quiet action that repeats or sits inside a component: icon buttons on rows, a toolbar, a close (×).
- **Destructive** (red) deletes or removes. It's kept apart from the primary action.

An area with no main action has no blue button. Its actions are all Outline.

## On a page

- The page's actions sit on the title's line, in the page header, never in the top bar.
- A record's actions are Edit, then the rest, then Delete in red.
- On screens narrower than 1024px they fold into one More actions (…) button.

## On a card

- Add sits at the right of the card header.
- While the card is empty, Add moves to the middle of the empty state and the header has none.
- A list worked from a card, such as tasks, shows an Edit button on each row when the pointer or focus is on it, and
  always on touch screens.

## In a sheet

- The footer stays at the bottom while the form scrolls.
- Cancel, then Save, at the right.
- A record's Delete sits at the footer's start, on the left, away from Save.

## In a dialog

- Cancel, then the action, at the bottom right. The action is named after the change: "Delete Project", not OK.
- A destructive action is red.
- On a phone the buttons stack, with the action on top.

## In a table

- No buttons to open, view or edit a row. The row opens its record; Edit and Delete are on the record's page.

## Labels

- A verb and the thing it acts on, in Title Case: Add Member, Delete Note.
- Precise verbs for destructive actions: Delete, Remove, Revoke.
- Change of state says Change: "Change to In Progress".

## Disabled buttons

- Prefer a button that stays enabled and, when pressed, says in place what's missing.
- A button that must be disabled for a reason stays reachable, and its tooltip gives the reason.
