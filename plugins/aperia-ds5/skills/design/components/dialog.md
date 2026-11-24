# Dialog

A dialog is a small window over the page for a short task or a question that needs an answer first.

## When to use

Use a dialog in three cases:

| Case | Example |
|---|---|
| Confirmation | "Delete Project?" with Cancel and the action |
| Short task | One or two choices, such as picking a reason |
| Global search | The search panel opened from the sidebar or ⌘K |

See [Forms in Sheets](../patterns/forms-in-sheets.md) for choosing a sheet, a dialog, or a page of its own, such as for
a form that adds or edits a record.

### Dialog or alert dialog?

An alert dialog is a dialog that must be answered. It has no close (×), and clicking outside it does not close it. Use
an alert dialog for a confirmation, above all a destructive one. Use a plain dialog for everything else.

## What is available

A dialog has five parts, listed from top to bottom:

| Part | Content |
|---|---|
| Title | A short title naming the change or the task, such as "Delete Project?" |
| Close (×) | A close button at the top right, in a plain dialog only |
| Description | One line on the consequence the user must know, such as "This permanently deletes the project and its files." |
| Content | Any content the task needs, when there is any |
| Footer | Cancel and the action at the bottom right, on a band in the muted color at 50% |

### Specs

| Part | Value |
|---|---|
| Width | Up to 384px on desktop. On phones, the screen width less 16px a side. |
| Corners | Extra large corner |
| Padding | 16px |
| Fill | Page background, Border hairline edge, and the Large shadow |
| Title | 16px, medium weight |
| Footer | Muted at 50%, under the hairline. Buttons at the right, stacked on phones. |
| Overlay | The overlay, with no blur |
| Motion | The panel opening and closing timings, growing from slightly under full size |

## How it looks and behaves

A dialog opens over a dimmed page, holds focus while it is open, and closes back to the page.

1. The overlay dims the page behind the dialog. The page never blurs.
2. The dialog fades in and grows from slightly under full size, over the panel opening timing. With reduced motion,
   it only fades.
3. Focus moves into the dialog. A screen reader reads the title, then the description.
4. **Tab** moves between the dialog's controls and never leaves the dialog while it is open.
5. An error shows in the dialog, above the buttons, and the dialog stays open. See
   [Message Templates](../foundations/copy-templates.md) for where errors show.
6. Cancel, the close (×), or the **Escape** key closes the dialog. Clicking outside closes a plain dialog, never an
   alert dialog.
7. The dialog closes over the shorter closing timing. Focus goes back to the button that opened it.

A screen reader names the close (×) "Close".

On a phone, the footer buttons stack, with the action on top.

### States

A dialog has three states. Its buttons have their own states. See [Button](button.md) for those.

| State | Look |
|---|---|
| Open | The title, the description, and Cancel and the action, ready to answer. |
| Working | The action shows a spinner beside its label, and both buttons are disabled until the action ends. |
| Error | The error shows above the buttons in the destructive color, and both buttons work again. |

## Rules

### Open forms in a sheet

- **Do:** Open a form in a sheet (Add Contact opens the contact form in a sheet), so people have room to fill it in.
- **Don't:** Squeeze a long form into a dialog. Open it in a sheet, so no one scrolls inside a small box.

### Open one dialog at a time

- **Do:** Finish or close one dialog before another opens, so people know which question they are answering.
- **Don't:** Open a dialog from a dialog. Close the first dialog before the next one opens, so people keep their place.

## When you can do it differently

- An alert dialog has no close (×) and stays open when someone clicks outside it, because it must be answered.

## Works with

| Component | How it works with a dialog |
|---|---|
| Button | Cancel is Outline. The action is Primary, or Destructive when the action is destructive. |
| Sheet | A sheet holds forms and record editing. A dialog and a sheet look alike, with the page fill, the hairline edge, and the Large shadow. |
| Toast | A dialog's error shows in the dialog, not in a toast. |
| Command | Global search is a command list inside a dialog. |

See [Forms in Sheets](../patterns/forms-in-sheets.md) for the one form each record has, used everywhere it is added or
edited.

See [Confirmations and Delete](../patterns/confirmations-and-delete.md) for naming the change and its consequence in a
confirmation, and for the destructive color on removal. See [Copy](../foundations/copy.md) for asking with the action's
name. See [Border and Radius](../styles/border-and-radius.md), [Elevation](../styles/elevation.md), and
[Motion](../styles/motion.md) for the corner, edge, shadow, overlay, and timings the Specs name.

## In code

- `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`,
  `DialogClose` from `aperia-ds5`. `showCloseButton={false}` drops the ×.
- Confirmations use `AlertDialog` with `AlertDialogAction variant="destructive"` for a destructive action.
- Forms use `Sheet` (side `right`, the default).
