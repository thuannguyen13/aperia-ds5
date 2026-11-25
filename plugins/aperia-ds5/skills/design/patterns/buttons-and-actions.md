# Buttons and Actions

Buttons and Actions sets where each action sits and which button type it uses, so people find the same action in the same place everywhere. See [Button](../components/button.md) for the button itself.

## Anatomy

Buttons and actions have six parts, and each shows only when the screen has that kind of action. The parts are those
of a record's page with a card, with the More actions menu open.

1. **Primary action** (optional). It is the solid button at the end of the page's actions in the page header, such as
   Send Proposal. It is the one action that the page exists for.
2. **Record action** (optional). It is an outline button after the page's actions that works on the whole record, such
   as Edit or Send Email.
3. **More actions button** (optional). It is an outline icon button with three dots. It opens a menu of the record
   actions that do not show as buttons.
4. **More actions menu** (optional). It is a list of the folded record actions, such as Mark as Won, Close as Lost, and
   Delete, in the same order as the buttons. A divider sets the destructive actions apart.
5. **Add** (optional). It is an outline button at the right end of a card's header, such as Add Task, that adds a record to the card's list.
6. **Row action** (optional). It is a ghost icon button at the end of a row, such as the Edit pencil beside a task's
   checkbox.

## What is available

Actions use six button types. An area is a part of the screen with its own actions, which is a page header, a card, a
sheet, or a dialog. A list toolbar belongs to its page header's area, so a list page has one Primary across its header
and its toolbar, which is the toolbar's Add.

Choose a button's type by asking these questions in order. Stop at the first question whose answer is yes:

| Question, in order | Type | Example |
|---|---|---|
| 1. Is it the one action that this area exists for? | Primary | Save, Add Prospect |
| 2. Does it delete, remove, or revoke? | Destructive | Delete, Remove Member, Revoke Access |
| 3. Does it take people somewhere else? | Link | View All |
| 4. Is it repeated on every row, or part of another control? | Ghost | A row's Edit icon, the close (×) of a dialog or sheet |
| 5. Is it a removable filter chip? | Secondary | A filter chip on a phone |
| 6. None of the above | Outline | Cancel, Edit, Export, and Add in a card header |

A confirmation dialog is the one exception to the order. Its action is the dialog's one action, yet it is Destructive
when it deletes, removes, or revokes, because the destructive color warns before the click. See [Confirmations and
Delete](confirmations-and-delete.md) for that case. See [Button](../components/button.md) for how each type looks.

## How it looks and behaves

Where an action goes depends on its container:

| Container | Where actions go |
|---|---|
| Page | The page header's title line, with the page's actions first, the primary action last, and the record actions after them. See Record actions below. |
| List | The list's actions, such as Import and Add Prospect, sit at the right end of its toolbar, after Sort, with the primary action last. While the list is empty, every action that adds moves to the middle of the empty state. See [List Toolbar](list-toolbar.md). |
| Card | Add sits at the right of the card header. While the card is empty, Add moves to the middle of the empty state, and the header has none. A row in a card shows a button only when the row's click is already taken, such as a task's Edit beside its checkbox. See [Tables](tables.md) for those rows. |
| Sheet | Cancel, then Save, sit at the right of the footer. A small record's Delete sits at the start of the footer, on the left, away from Save. See [Forms in Sheets](forms-in-sheets.md). |
| Dialog | Cancel, then the action, sit at the bottom right. The action is named after the change, such as "Delete Project", not OK. See [Confirmations and Delete](confirmations-and-delete.md) for a destructive action. |
| Table | A row holds no button to open, view, or edit it. The row opens its record, and Edit and Delete sit where the record opens, on its page or in its sheet. See [Tables](tables.md). |

See [Screen Sizes](../foundations/screen-sizes.md) for where each container's buttons go on a phone.

### Record actions

Record actions work on the whole record, such as Edit, Mark as Won, and Delete. They follow the page's actions on the
title's line. Their order and their limit on buttons are set by Buttons and Actions 3 and 4.

On screens narrower than `--breakpoint-lg`, every record action folds into the More actions button, however few there
are. In the menu, a divider sets the destructive actions apart from the others.

A record action that is blocked on this record still shows, disabled, and gives its reason on hover and keyboard focus.
See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for that choice and the words of each reason.

### Icon buttons

Every icon button has a tooltip, as [Button](../components/button.md) says. A reorder grip is the exception. It has no tooltip, because a tooltip would stay behind where the drag began, and its grab pointer shows
what it does. A screen reader still reads the grip's name. See [Reordering](reordering.md) for the grip.

## Rules

### 1. Use one primary button per area

An area has one Primary button at most, so people see the action that the area exists for at once. An area with no main
action has no Primary button, and its other actions are Outline.

- **Do:** Make Save the one Primary button of a sheet, with Cancel in Outline.
- **Don't:** Put two Primary buttons side by side, such as Save and Save and Add Another, or a Primary button in a card
  whose only action is Add.

### 2. Choose the type by asking the questions in order

Each button's type comes from the questions in What is available, stopped at the first yes, so the same action has the
same type on every screen.

- **Do:** Make Cancel beside Save an Outline button and View All a Link button.
- **Don't:** Pick a type for its look, such as Secondary for Cancel or Ghost for Export in a page header.

### 3. Order record actions the same on every record page

A record's actions run in one order, so people find each action in the same place on every record. Edit comes first,
then the record's other actions. Actions that close the record's work, such as Close as Lost, come next in the
Destructive type. Delete comes last, away from Edit.

- **Do:** Order a prospect's actions as Edit, Mark as Won, Close as Lost, then Delete.
- **Don't:** Put Delete beside Edit or ahead of the other actions, where a slip lands on the action people use most.

### 4. Fold extra record actions into More actions

A record page shows three record actions or fewer as buttons. With four or more, the first two stay buttons. Every other
action, Delete included, goes into the More actions (…) menu in the same order, so the title keeps its line.

- **Do:** With Edit, Send Email, Convert, Close as Lost, and Delete, show Edit and Send Email as buttons and put the
  other three in More actions.
- **Don't:** Line up five record actions across the header.

### 5. Keep a page's actions on the title's line

A page's actions sit on the title's line in its page header, never in the top bar. The top bar holds only the sidebar
button and the breadcrumb, so every page has one place for its actions.

- **Do:** Put a record's Edit and Delete in its page header.
- **Don't:** Put an action in the top bar beside the breadcrumb.

## In code

- `Button` from `aperia-ds5` (`variant`: `default` for Primary, `destructive`, `link`, `ghost`, `secondary`, and
  `outline`, in the order of the questions).
- Build icon-only buttons in the app as the icon button recipe on [Button](../components/button.md): the label is the
  tooltip and the accessible name, and the reason is the tooltip while disabled (it stays focusable with
  `aria-disabled`).
- A record's page actions are `RecordActions` in `PageHeader`'s `menu`, which shows three buttons at most; a sheet's
  footer is `SheetForm`; a dialog's buttons come with `ConfirmDialog`.
