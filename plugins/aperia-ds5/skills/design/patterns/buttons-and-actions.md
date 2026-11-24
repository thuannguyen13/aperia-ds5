# Buttons and Actions

Action placement defines where buttons go and which button type to use in pages, cards, sheets, dialogs, and tables. See
[Button](../components/button.md) for the button itself.

## When to use

Use these rules whenever a screen offers an action, such as saving, adding, editing, deleting, or changing a state.

Two cases do not use a button. A row in a list opens its record, so opening a record needs no button. A state shows as
a badge, not a button.

## What is available

Actions use four button types:

| Type | Use for | Example |
|---|---|---|
| Primary | The main action of its area, which the user came to do. An area has one at most. | Save |
| Outline | Every other action | Cancel, Edit, Export, and Add in a card |
| Ghost | An action that repeats or sits inside a component | Icon buttons on rows, a toolbar, and a close button (×) |
| Destructive | An action that deletes or removes. It is kept apart from the primary action. | Delete |

Any action can show as an icon alone. An icon button always has a tooltip that names the action, such as a pencil with
the tooltip "Edit Task".

An area with no main action has no primary button. All its actions are Outline.

## How it looks and behaves

Where an action goes depends on its container:

| Container | Where actions go |
|---|---|
| Page | The page's actions sit on the title's line, in the page header, never in the top bar. A list's actions sit in its toolbar instead. A record's actions are Edit first, then the record's other actions. Actions that close the record's work, such as Close as Lost, come next in the destructive color. Delete comes last. On screens narrower than 1024px, they fold into one More actions (…) button. |
| List | The list's actions, such as Import and Add Prospect, sit at the right end of its toolbar, after Sort, with the primary action last. While the list is empty, Add moves to the middle of the empty state. See [List Toolbar](list-toolbar.md). |
| Card | Add sits at the right of the card header. While the card is empty, Add moves to the middle of the empty state, and the header has none. A list that people edit inside a card, such as tasks, shows an Edit button on a row when the pointer or focus is on it. On touch screens, the Edit button always shows. |
| Sheet | The footer stays at the bottom while the form scrolls. Cancel, then Save, sit at the right. A record's Delete sits at the start of the footer, on the left, away from Save. |
| Dialog | Cancel, then the action, sit at the bottom right. The action is named after the change, such as "Delete Project", not OK. A destructive action uses the destructive color. On a phone, the buttons stack with the action on top. |
| Table | No buttons open, view, or edit a row. The row opens its record. Edit and Delete are on the record's page. |

## Rules

### Use one primary button per area

- **Do:** Make the area's main action (such as Save) its one primary button, with every other action in outline, so
  the main action is obvious.
- **Don't:** Put two primary buttons side by side, or a primary button in an area with no main action. Keep one primary
  per area, so people's eyes land on the right choice.

## When you can do it differently

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

- `Button` from `aperia-ds5` (`variant`: `default` for Primary, `outline`, `ghost`, `destructive`).
- Build icon-only buttons in the app as the icon button recipe on [Button](../components/button.md): the label is the
  tooltip and the accessible name, and the reason is the tooltip while disabled (it stays focusable with
  `aria-disabled`).
- A record's page actions are `RecordActions` in `PageHeader`'s `menu`; a sheet's footer is `SheetForm`; a dialog's
  buttons come with `ConfirmDialog`.
