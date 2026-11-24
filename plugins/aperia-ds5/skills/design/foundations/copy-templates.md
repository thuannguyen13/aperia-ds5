# Message Templates

Message templates give fixed wording for confirmations, errors, successes, empty states, and other messages.

These templates are built on Aperia's User Interface Style Guide V4.3. See [Copy](copy.md) for the rules behind the
wording.

## When to use

Use a template whenever the app asks, warns, refuses, fails, succeeds, or has nothing to show.

## What is available

Templates come in eight groups, one per subsection below. Examples such as "Acme Renewal" stand for any record.

Angle brackets mark what you fill in. \<Item\> is the record as people name it in the app, which is its glossary word
and never a table or column name. \<Action\> is a present-tense verb.

Every message is a complete sentence with its full stop, or a question with its question mark. A message uses plain
words, with no capitals for emphasis, no contractions, no "please", and no exclamation mark. A message's title is in
Title Case like any heading.

### Confirmations

Use a confirmation for an action that is hard to undo, or for an action that changes something people cannot see. A
confirmation has three parts.

| Part | Template | Example |
|---|---|---|
| Title | \<Action\> \<Item\>? | Delete Contact? · Change to Demo? |
| Message | The record and what happens to it, plus a consequence only when people must know it first (data lost, cannot be undone, other records affected) | You are changing Acme Renewal from Discovery to Demo. · This permanently deletes Acme Renewal and its 4 tasks. |
| Buttons | Cancel · \<Action\> \<Item\> | Cancel · Delete Contact · Cancel · Change to Demo |

A confirmation follows four rules.

- The message names the record, so a wrong pick shows.
- A deletion says "This permanently deletes \<the record\>[ and \<what goes with it\>]."
- When the count is known, the title and message match it, as in "Delete the 12 selected merchants?"
- The action uses the destructive color when it removes something or cannot be taken back. An action that adds, such as
  Apply Template, uses the primary color.

### Unsaved changes

Use these words exactly, even when part of the work already saved. The message never names the form, what saved, or
how people left it.

| Case | Title | Message | Buttons |
|---|---|---|---|
| One form, with its record visible behind it | Discard Changes? | What you entered in this form is lost. | Continue Editing · Discard Changes |
| Several records are open, and the changed one may be hidden | Discard Changes? | You have unsaved changes in a \<Name\>. This will close all \<Names\> without saving. Do you want to discard your changes? | Continue Editing · Discard Changes |
| Several records are open, and which ones changed is unknown | Discard Changes? | This will close all \<Names\> without saving. Do you want to discard any changes you may have in a \<Name\>? | Continue Editing · Discard Changes |

### Errors and validation

An error is a problem that stops people or the app. The message says what happened and how to recover. It adds why,
or how to avoid the problem, only when people need it.

| Situation | Template | Example |
|---|---|---|
| A required value is missing | The fix | Pick a stage. · Write a message before you send. |
| A value is outside a limit | \<Field\> must be \<limit\>. | Logo must be 2 MB or smaller. |
| A value breaks a rule | The rule, stated neutrally | Merchant IDs only include letters and numbers. · Alert Message only supports these special characters: |
| A format is wrong | What to enter | Enter a valid email address. |
| Something people cannot do | You cannot \<action\>. Then who can act, only when the user can reach that person in the app, such as another admin who can change their role. | You cannot deactivate yourself. · You cannot move yourself to a role without Settings. Ask another admin. |
| No access | You do not have access to \<action\>. The same message for everyone. | You do not have access to change rates. |
| The app or a device is the cause | The problem, then the fix | The file service is not responding. Try again in a few minutes. |

An error message follows three rules.

- Write one message for each known cause, never one vague message for several causes.
- State the problem in the third person and the passive voice. State the fix in the active imperative. Use the present
  tense for both.
- A dialog that stops an operation has **Cancel**. A dialog that only informs has **Close**.

See "A toast, an alert, or a message on the field" under How it looks and behaves for where an error shows.

### Failures

A failure message says that an action, the person's or the app's, did not complete. An error message, above, is for a
problem that stops people or the app.

| Template | Example |
|---|---|
| \<Action\> failed. | Request failed. |
| \<Item\> failed to \<action\>. | Profile failed to update. |
| Failed to \<action\>. | Failed to download document. |
| With an instruction, when people must act | Request failed. Resubmit the request. · Failed to save changes. Try again. |
| With a known cause, passive, between them | Failed to save notification settings. The server could not be reached. Try again. |
| As the title of an empty state, Failed to \<Action\>, with no item, since the card or list around it names the item | Failed to Load |

Add a time stamp, as in "Request failed on 10/13/2020 02:40:32 PM.", only when asked for.

### Successes

A success message names the item and the action done to it.

| Template | Example |
|---|---|
| \<Item\> \<past-tense action\>. | Note added. · Case created. · Card status updated. · Transaction removed. |

A success message is usually a toast that closes on its own. It never uses "has been", "successfully", or more than
the result.

### Empty and no results

An empty message covers one of three situations.

| Situation | Template | Example |
|---|---|---|
| Nothing yet | The title is No \<Items\>. A second line, No \<items\> \<context\>, appears only when it adds whose, which, or what to do. | No Tasks · No tasks assigned to you. · No lost opportunities in this range. |
| A search or filter finds nothing | The title is No Results. When there are filters to clear, add "No matching results." and Clear Filters. | No Results |
| More than can be shown | Too many results to display. Narrow your criteria and search again. | |

Empty states never hint at permissions or who to ask.

### Locked and disabled

A locked or disabled item explains itself in one of four ways.

| Situation | Template |
|---|---|
| An item that cannot be deleted, changed, or removed | This item is in use and cannot be \<deleted / changed / removed\>. Use these words exactly, with no "so" clause, and without naming what uses the item. On a disabled button, this line is the tooltip. |
| A disabled option, row, or chip | Its reason in a tooltip on hover. The reason is the locked-item line, or else an instruction. |
| The cause is not on screen | The field's hint says what to do, as in "To remove a product, first remove its line items." |
| The cause is in view | Nothing more. |

### Values and working states

Values and working states use the fixed wording in this table.

| Situation | Write |
|---|---|
| A missing value | — (an em dash, in gray) |
| An empty optional pick | No \<field\>, as in No priority |
| A hidden amount | $XX,XXX |
| A button or file at work | Its own label, disabled, with a spinner. No "Saving…" or "Uploading…". |
| Logging in and out | Log In, Login (the page), and Log Out. An app that signs in through Microsoft writes "Log In with Microsoft" on the button. Never Sign In or Sign Out. |

## How it looks and behaves

### A toast, an alert, or a message on the field

An error or a failure shows where the action happened, so people see what went wrong at the place they were working. A
result that needs nothing more from people shows as a toast. Find the situation in this table:

| Situation | Choice | Why |
|---|---|---|
| A field in a form or a dialog holds a wrong or missing value | A message beside the field it names | People fix the value where they typed it. |
| A form or a dialog is refused, with no one field at fault | A message above the buttons. The form or dialog stays open with what was typed. | Nothing typed is lost, and people try again in place. |
| A control that saves on change is refused, such as a switch in a grid | The control returns to its saved value, and an alert above the grid names the row, such as "Pipeline: Email could not be saved. Try again." | The control shows what is saved, and the message stays beside the work. |
| A file is refused in a drop zone | A message under the drop zone, beside the refused file | It stays where the file was dropped until it is read. |
| An action fails and nothing on screen holds it, such as a background job, a closed menu, or a page the person has left | A toast that stays until it is closed, names what failed, and offers the fix, such as "Report export failed. Try again." | No place is left on screen to show it. |
| An action succeeds | A toast that closes on its own, with the result, such as "Note added." | People see what happened at a glance and carry on. |
| A change saves at once and can be taken back, such as a ticked task or a status change | A toast with the result and Undo, such as "Changed to Demo." | People see the change take effect and can take it back. |
| A new notification arrives | A toast with the notification's sentence that links to its record, three at most. See [Notifications](../patterns/notifications.md). | People see it on any page, and the page stays usable. |

A toast that closes on its own is only for a success. An error is never a toast while its place is still on screen.

## Rules

### Fill in the template

- **Do:** Build the message from \<Item\> \<past-tense action\> ("Note added."), so people see what happened at a
  glance.
- **Don't:** Write "Your note has been successfully added!" Fill in the template and stop, so the message stays quick to
  read.

### Show an error where the action happened

- **Do:** Show an error beside its field, above a form's buttons, or above the grid that holds the control, so people
  see what went wrong where they were working.
- **Don't:** Show a toast that disappears while the form, grid, or file is still on screen. Show the error in place, so
  no one misses it or thinks the change was saved.

## When you can do it differently

A screen may depart from a template only for a business reason the app has recorded.

## Works with

- See [Copy](copy.md) for voice, case, punctuation, and formats. Copy also holds the rules for naming the action on a
  button and for asking with the action's name.

## In code

- `ConfirmDialog` from aperia-ds5: `title` ("Delete Contact?"), `action` ("Delete Contact"), `cancel`, the message as
  children, and `variant="default"` for an action that adds.
- `SheetForm` asks Discard Changes? itself, with the one-form wording above.
- `EmptyState` (`title`, `description`) and `NoResults` (`onClear` adds the line and Clear Filters).
- `ReasonTooltip`, and the icon button recipe's reason on [Button](../components/button.md), for why something is
  disabled; `FieldError` beside a field; `Spinner`
  in a working button that keeps its label; `HIDDEN_MONEY` from `aperia-ds5/format`.
