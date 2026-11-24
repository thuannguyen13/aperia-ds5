# Buttons and Actions

Action placement defines where buttons go and which button type to use in pages, cards, sheets, dialogs, and tables. See
[Button](../components/button.md) for the button itself.

## When to use

Use these rules whenever a screen offers an action, such as saving, adding, editing, deleting, or changing a state.

Two cases do not use a button. A row in a list opens its record, so opening a record needs no button. A state shows as
a badge, not a button.

## What is available

Actions use six button types, and each area has at most one Primary button. An area is a part of the screen with its
own actions, which is a page header, a card, a sheet, or a dialog. A list toolbar belongs to its page header's area. A
list page therefore has one Primary across its header and its toolbar, which is the toolbar's Add.

Choose a button's type by asking these questions in order. Stop at the first question whose answer is yes:

| Question, in order | Type | Example |
|---|---|---|
| 1. Is it the one action that this area exists for? | Primary | Save, Add Prospect |
| 2. Does it delete, remove, or revoke? | Destructive | Delete, Remove Member, Revoke Access |
| 3. Does it take people somewhere else? | Link | View All |
| 4. Is it repeated on every row, or part of another control? | Ghost | A row's Edit icon, the close (×) of a dialog or sheet |
| 5. Is it a removable filter chip? | Secondary | A filter chip on a phone |
| 6. None of the above | Outline | Cancel, Edit, Export, and Add in a card header |

An area with no main action has no Primary button, so its other actions are Outline. See
[Button](../components/button.md) for how each type looks.

Any action can show as an icon alone. An icon button always has a tooltip that names the action, such as a pencil with
the tooltip "Edit Task". See [Button](../components/button.md) for an icon button's height beside other controls.

## How it looks and behaves

Where an action goes depends on its container:

| Container | Where actions go |
|---|---|
| Page | The page's actions sit on the title's line, in the page header, never in the top bar. A list's actions sit in its toolbar instead. A record's actions are Edit first, then the record's other actions. Actions that close the record's work, such as Close as Lost, come next in the destructive color. Delete comes last. At most three record actions show as buttons. With four or more, Edit and the next action stay buttons, and a More actions (…) button holds every action after them in the same order. On screens narrower than 1024px, every record action folds into More actions. |
| List | The list's actions, such as Import and Add Prospect, sit at the right end of its toolbar, after Sort, with the primary action last. While the list is empty, every action that adds moves to the middle of the empty state. See [List Toolbar](list-toolbar.md). |
| Card | Add sits at the right of the card header. While the card is empty, Add moves to the middle of the empty state, and the header has none. A row in a card shows a button only when the row's click is already taken, such as a task's Edit beside its checkbox. See [Tables](tables.md) for those rows. |
| Sheet | The footer stays at the bottom while the form scrolls. Cancel, then Save, sit at the right. A small record's Delete sits at the start of the footer, on the left, away from Save. |
| Dialog | Cancel, then the action, sit at the bottom right. The action is named after the change, such as "Delete Project", not OK. A destructive action uses the destructive color. On a phone, the buttons stack with the action on top. |
| Table | No buttons open, view, or edit a row. The row opens its record. Edit and Delete are where the record opens, on its page or in its sheet. |

See [Screen Sizes](../foundations/screen-sizes.md) for where each container's buttons go on a phone.

## Rules

### Use one primary button per area

- **Do:** Make the area's main action (such as Save) its one primary button, with every other action in outline, so
  the main action is obvious.
- **Don't:** Put two primary buttons side by side, or a primary button in an area with no main action. Keep one primary
  per area, so people's eyes land on the right choice.

### Choose the type by asking the questions in order

- **Do:** Ask the questions in order and stop at the first yes, so Cancel beside Save is Outline and View All is a
  Link.
- **Don't:** Pick a type for its look, such as Secondary for Cancel or Ghost for Export in a page header. Ask the
  questions, so the same action gets the same type on every screen.

### Show at most three record actions as buttons

- **Do:** Show Edit and up to two more record actions as buttons, and put the others in More actions (…), so the
  title's line stays short.
- **Don't:** Line up five or six record actions across the header. Keep three at most, so the title keeps its room.

## When you can do it differently

A confirmation's action is Destructive when it deletes, removes, or revokes, though it is the one action of its dialog.
The destructive color warns before the click. See [Confirmations and Delete](confirmations-and-delete.md) for that case.

A reorder grip is an icon button with no tooltip. A tooltip would stay behind where the drag began. The grab pointer
shows what the grip does. A screen reader still hears the grip's name. See [Reordering](reordering.md) for the grip.

## Works with

Buttons work with seven other pages:

- See [Button](../components/button.md) for the button types, sizes, and states, for icon-button tooltips, and for
  showing a state as a badge.
- See [Copy](../foundations/copy.md) for naming the action on a button.
- See [Color](../styles/color.md) for pairing every color with a word or an icon.
- See [Confirmations and Delete](confirmations-and-delete.md) for destructive actions and their confirmation.
- See [Forms in Sheets](forms-in-sheets.md) for the footer of a sheet.
- See [Cards and Tiles](cards-and-tiles.md) for Add in a card header.
- See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for saying why a button is disabled.

## In code

- `Button` from `aperia-ds5` (`variant`: `default` for Primary, `destructive`, `link`, `ghost`, `secondary`, and
  `outline`, in the order of the questions).
- Build icon-only buttons in the app as the icon button recipe on [Button](../components/button.md): the label is the
  tooltip and the accessible name, and the reason is the tooltip while disabled (it stays focusable with
  `aria-disabled`).
- A record's page actions are `RecordActions` in `PageHeader`'s `menu`, which shows three buttons at most; a sheet's
  footer is `SheetForm`; a dialog's buttons come with `ConfirmDialog`.
