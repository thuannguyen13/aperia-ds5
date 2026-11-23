# Dialog

A dialog is a small window over the page for a short task or a question the user must answer before going on, such as
confirming a delete. The page stays in view behind it, dimmed.

## When to use

- **A confirmation:** "Delete Project?" with Cancel and the action.
- **A short task:** one or two choices, such as picking a reason.
- **Global search:** the search panel opened from the sidebar or ⌘K.

## When to use something else

### Dialog or sheet?

- **A form that adds or edits a record** opens in a **sheet** from the right, never a dialog. A record has one form,
  used everywhere it's added or edited.
- **Reading a record** is its own page, not a dialog.
- **A confirmation or a short question** is a **dialog**.

### Dialog or alert dialog?

An **alert dialog** is a dialog that must be answered: it has no close (×), and clicking outside doesn't close it. Use
it for a confirmation, above all a destructive one. Use a plain dialog for everything else.

## Parts

- **Title:** short, naming the change or the task: "Delete Project?"
- **Description:** one line on the consequence the user must know: "This permanently deletes the project and its
  files."
- **Content**, when there is any.
- **Footer:** Cancel and the action, at the bottom right, on a light grey band.
- **Close (×)** at the top right, in a plain dialog only.

## Behaviour

- **Overlay:** the page dims behind the dialog: 10% black in light mode, 50% in dark mode. It never blurs.
- **Opening and closing:** the dialog fades in and grows from 97% over 220ms, and closes faster, over 150ms. With
  reduced motion it only fades.
- **Closing:** Cancel, the close (×) or the Escape key. Clicking outside closes a plain dialog, never an alert dialog.
- **Focus:** moves into the dialog when it opens, stays inside while it's open, and goes back to the button that
  opened it.
- **Errors** show in the dialog, above the buttons, and the dialog stays open. Never a toast.

## Rules

### Name the consequence

- **Do:** "Delete Project?" / "This permanently deletes the project and its files." / **Delete Project** · Cancel.
- **Don't:** "Are you sure?" / OK, when the consequence can be named.

### A destructive action is red

- **Do:** the action button in red, named with a precise verb: Delete, Remove, Revoke.
- **Don't:** a blue Delete, or a vague Confirm.

### Forms open in a sheet

- **Do:** Add Contact opens the contact form in a sheet.
- **Don't:** a long form squeezed into a dialog.

### One dialog at a time

- **Do:** finish or close one dialog before another opens.
- **Don't:** a dialog opened from a dialog. When a form needs a missing record, it's added in a sheet stacked on the
  first.

## Works with

- **Button:** Cancel in outline, then the action in blue, or red when it's destructive.
- **Sheet:** forms and record editing. Dialogs and sheets look alike: the page fill, a fine edge and a large shadow.
- **Toast:** never for an error; the error shows in the dialog.
- **Command:** global search is a command list inside a dialog.

## Accessibility

- The title is read when the dialog opens; the description is read after it.
- **Tab** moves between the dialog's controls and never leaves it while it's open.
- **Escape** closes it, and focus returns to the button that opened it.
- The close (×) is named "Close" for screen readers.

## Specs

| Part | Value |
|---|---|
| Width | Up to 384px on desktop; the screen less 16px a side on phones |
| Corners | 14px |
| Padding | 16px |
| Fill | Page background, 0.5px border edge, large shadow |
| Title | 16px, medium weight |
| Footer | Light grey band (muted at 50%) under a hairline; buttons at the right, stacked on phones |
| Overlay | Black 10% (light), 50% (dark), no blur |
| Motion | In 220ms, out 150ms, from 97% |

## In code

- `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`,
  `DialogClose` from `aperia-ds5`. `showCloseButton={false}` drops the ×.
- Confirmations use `AlertDialog` with `AlertDialogAction variant="destructive"` for a destructive action.
- Forms use `Sheet` (side `right`, the default).
