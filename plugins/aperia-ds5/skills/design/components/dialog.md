# Dialog

A dialog lets people answer one question, search, or review many rows over the page, and it closes before they go on.
See [Forms in Sheets](../patterns/forms-in-sheets.md) for choosing a sheet, a dialog, or a page of its own.

## Anatomy

A review dialog opens over a list page and has seven parts. The close button shows only in a plain dialog, and the
content only when the task needs it.

1. **Overlay**. It is a dimmed layer over the page behind the dialog. It never blurs the page.
2. **Panel**. It is the box in the middle of the screen that holds every other part.
3. **Title**. It is a short heading that names the change or the task, such as "Review Import".
4. **Close button** (optional). It is an icon button with an × at the top right that closes the dialog. An alert
   dialog has none.
5. **Description**. It is a line of muted text below the title that says what will happen, such as "2 of 3 rows are ready
   to save."
6. **Content** (optional). It is whatever the task needs, such as a table of rows to review, a field, or a list of
   results.
7. **Footer**. It is a band across the bottom, in the muted color at 50%, that holds the buttons. Cancel comes first
   and the action last, both at the right.

## When to use

Use a dialog for a question that must be answered before people go on, for global search, or for reviewing many rows
before they save. Every dialog is one of the four kinds under What is available.

### Dialog or alert dialog?

An alert dialog is a dialog that must be answered. It has no close (×), and clicking outside it does not close it. A
confirmation and a reason dialog are alert dialogs. Global search and a review are plain dialogs.

## What is available

A dialog comes in four kinds. Each kind has its own width, its own layout on a phone, and its own component.

| Kind | Use for | Type | Width | On a phone | Component |
|---|---|---|---|---|---|
| Confirmation | Asking before a delete, a removal, or a step whose consequence people must know first, such as "Delete Project?" | Alert dialog | Up to `max-w-sm` | `max-w-xs` wide, in the middle of the screen, with its buttons stacked | `ConfirmDialog`. See [Confirmations and Delete](../patterns/confirmations-and-delete.md). |
| Reason | Picking a new status and writing the reason for it, such as "Change to Lost?" | Alert dialog | Up to `max-w-sm` | `max-w-xs` wide, in the middle of the screen, with its buttons stacked | The reason dialog that the app builds. |
| Search | Finding any record in the app from the sidebar or ⌘K | Plain dialog | Up to `max-w-xl`, a third of the way down the screen | Fills the screen | The app's search dialog, a command list inside a dialog. See [Global Search](../patterns/global-search.md). |
| Review | Checking many rows in a wide table before they save, such as the rows of an imported file | Plain dialog | Up to `max-w-6xl` | Fills the screen | One dialog for every step. |

A search dialog and a review dialog fill the screen on a phone because their lists need the whole height.

### Specs

| Part | Value |
|---|---|
| Width | Set by the dialog's kind, in the table above |
| Corners | Extra large corner |
| Padding | `p-4` |
| Fill | Page background, a border in the Border color, and the Large shadow. A sheet has the same fill, border, and shadow. |
| Title | `text-base`, medium weight |
| Footer | Muted at 50%, under a divider. Buttons at the right, stacked on phones. |
| Overlay | The overlay, with no blur |
| Motion | The panel opening and closing timings, growing from slightly under full size |

## How it looks and behaves

A dialog opens over a dimmed page, holds focus while it is open, and closes back to the page.

1. The overlay dims the page behind the dialog. The page never blurs.
2. The panel opens in the middle of the screen, except for global search, which sits a third of the way down. It fades
   in and grows from slightly under full size over the panel opening timing. With reduced motion, it only fades. See
   [Motion](../styles/motion.md) for the timings.
3. Focus moves into the dialog. A screen reader reads the title, then the description.
4. **Tab** moves between the dialog's controls and never leaves the dialog while it is open.
5. Cancel is an Outline button. The action is Primary, or Destructive when it removes something. See
   [Button](button.md) for the variants.
6. On a phone, the footer buttons stack in a column with the action first, and Cancel under it.
7. An error shows in the dialog, above the buttons, and the dialog stays open. It never moves to a toast. See
   [Errors and Validation](../foundations/errors-and-validation.md) for where each error shows.
8. Cancel, the close button, or the **Escape** key closes the dialog. Clicking outside closes a plain dialog and never
   an alert dialog, which must be answered.
9. The dialog closes over the shorter closing timing. Focus goes back to the button that opened it.
10. A screen reader names the close button "Close".

### States

A dialog has three states. Its buttons have their own states. See [Button](button.md) for those.

| State | Look |
|---|---|
| Open | The title, the description, and Cancel and the action, ready to answer. |
| Working | The action shows a spinner beside its label, and both buttons are disabled until the action ends. |
| Error | The error shows above the buttons in the destructive color, and both buttons work again. |

## Rules

### 1. Open forms in a sheet

A dialog holds one decision and has no scrolling of its own, so a form with several fields runs past the screen. A
sheet keeps its title and footer in place while its fields scroll. See [Forms in Sheets](../patterns/forms-in-sheets.md)
for which records open in a sheet.

- **Do:** Open Add Contact in a sheet, so its four fields have room and Save stays in view.
- **Don't:** Put Add Contact's four fields in a dialog.

### 2. Open one dialog at a time

A second dialog opened from a dialog stacks another dimmed layer and panel over the first, so people lose which
question they are answering.

- **Do:** Close the first dialog, then open the next.
- **Don't:** Open a confirmation from inside a review dialog while the review is still open.

## In code

- `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`,
  `DialogClose` from `aperia-ds5`. `showCloseButton={false}` drops the ×.
- A confirmation is `ConfirmDialog` from `aperia-ds5`, never an `AlertDialog` built in the app. Its `variant` is
  `"destructive"` by default.
- A reason dialog is an `AlertDialog` that the app builds, with the reason field above its buttons.
- A search dialog is `CommandDialog` with `className="sm:max-w-xl"`, as on [Global Search](../patterns/global-search.md).
- A review dialog is one `DialogContent` for every step, full screen below `sm`.
- A form is `FormSheet` with `SheetForm` from `aperia-ds5`, never a raw `Sheet` or a dialog.
