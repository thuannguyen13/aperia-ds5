# Message Templates

Message templates give fixed wording for confirmations, errors, successes, empty states, and other messages.
See [Copy](copy.md) for the rules behind the wording.

## When to use

Use a template whenever the app asks, warns, refuses, fails, succeeds, or has nothing to show.

These templates are built on Aperia's User Interface Style Guide V4.3.

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
- When the count is known, the title and message match it. The title is in Title Case, as in "Delete 3 Merchants?",
  and the message is "This permanently deletes 3 merchants."
- The action uses the destructive color when it removes something or cannot be taken back. An action that changes
  content without deleting a record uses the primary color, such as Apply Template, which replaces the lines already
  there.

### Unsaved changes

Use these words exactly, even when part of the work already saved. The message never names the form, what saved, or
how people left it.

| Case | Title | Message | Buttons |
|---|---|---|---|
| One form, with its record visible behind it | Discard Changes? | What you entered in this form is lost. | Continue Editing · Discard Changes |
| Several records are open, and the changed one may be hidden | Discard Changes? | You have unsaved changes in a \<Name\>. This will close all \<Names\> without saving. Do you want to discard your changes? | Continue Editing · Discard Changes |
| Several records are open, and which ones changed is unknown | Discard Changes? | This will close all \<Names\> without saving. Do you want to discard any changes you may have in a \<Name\>? | Continue Editing · Discard Changes |

### Errors

The words of every error, where each one shows, and when the app checks a form are on
[Errors and Validation](errors-and-validation.md).

### Failures

A failure message says that an action, the person's or the app's, did not complete.

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

A locked or disabled item explains itself in one of these ways.

| Situation | Template |
|---|---|
| An item that cannot be deleted, changed, or removed | This item is in use and cannot be \<deleted / changed / removed\>. Use these words exactly, with no "so" clause, and without naming what uses the item. On a disabled button, this line is the tooltip. |
| Several selected items, some of which cannot be deleted | \<N\> of the selected \<items\> are in use and cannot be deleted. With one, "1 of the selected \<items\> is in use and cannot be deleted." The count tells people how many to clear from the selection. |
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

A toast that closes on its own is only for a success. Every toast shows in one stack at the top right of the screen.
See [Errors and Validation](errors-and-validation.md) for where an error or a failure shows, and
[Saving and Feedback](saving-and-feedback.md) for where toasts show on a phone and how many show at once.

## Rules

### Fill in the template

- **Do:** Build the message from \<Item\> \<past-tense action\> ("Note added."), so people see what happened at a
  glance.
- **Don't:** Write "Your note has been successfully added!" Fill in the template and stop, so the message stays quick to
  read.

## When you can do it differently

A screen may depart from a template only for a business reason the app has recorded.

## Works with

- See [Errors and Validation](errors-and-validation.md) for the words of every error and where each one shows.
- See [Copy](copy.md) for voice, case, punctuation, and formats. Copy also holds the rules for naming the action on a
  button and for asking with the action's name.
- See [Saving and Feedback](saving-and-feedback.md) for when a change saves, its working state, and when it offers
  Undo.
- See [Disabled With a Reason](disabled-with-a-reason.md) for when an action is left out instead of disabled.
- See [Banner Alerts](../patterns/banner-alerts.md) for where a message about the whole page sits.

## In code

- `ConfirmDialog` from aperia-ds5: `title` ("Delete Contact?"), `action` ("Delete Contact"), `cancel`, the message as
  children, and `variant="default"` for a step that deletes no record, such as Apply Template.
- `SheetForm` asks Discard Changes? itself, with the one-form wording above.
- `EmptyState` (`title`, `description`) and `NoResults` (`onClear` adds the line and Clear Filters).
- `ReasonTooltip`, and the icon button recipe's reason on [Button](../components/button.md), for why something is
  disabled; `Spinner`
  in a working button that keeps its label; `HIDDEN_MONEY` from `aperia-ds5/format`.
