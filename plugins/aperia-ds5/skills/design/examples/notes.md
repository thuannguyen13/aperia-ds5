# Notes on a Record

Notes are free text that people add to a record to keep a history of calls, decisions, and reasons.

## When to use

Notes take two forms, each for its own condition:

| Form | Use when |
|---|---|
| Notes card | A record keeps notes on its own page, such as a customer or an account. |
| Note preview | A note belongs to another entry, such as the reason under a stage change in Activity. |

## How it looks and behaves

### Notes card

A Notes card is titled "Notes". It does not repeat the record's kind, such as "Merchant Notes", because the page already
says whose notes they are.

Notes are listed newest first, on a line that threads them together. The card shows the latest ten. View All Notes opens
every note in a sheet.

Each note shows its whole text in a box with the muted fill. Under the box are when, who, and the record the note was
written on, such as "2h ago · Maria Chen · Opportunity #659". The record shows only when it is not this page's record.

Add Note sits in the card's header. While there are no notes, the card shows "No Notes" with Add Note in its middle
instead.

Add Note opens a sheet from the right, titled "Add Note", with one Note box. A count shows near the length limit, and ⌘↵
saves. When notes can be edited, Edit Note opens the same sheet.

The author can delete a note with a bin button. The button shows when the pointer is over the note or the note has
keyboard focus, and always on a touch screen. Selecting it asks first, with three parts:

| Part | Text |
|---|---|
| Title | "Delete Note?" |
| Description | "This permanently deletes the note." |
| Button | **Delete Note**, in the destructive color. |

### Note preview

A note preview sits in its box with the muted fill under the entry's sentence. Its text is 12px, at most three lines
tall.

A note that is cut short offers View Note. View Note opens the whole note in a sheet titled "Note". The sheet's
description says what happened, when, and who.

View Note shows only while the note is cut short at the column's current width.

## Before and after

- **Before:** A card is titled with the record's kind, such as "Merchant Notes". It has an always-open box and a
  grayed-out Add Note button at its top. Each note has a red bin that deletes at once, without asking. With no notes,
  the card reads "No notes yet."
- **After:** The card is titled "Notes", and Add Note in the header opens a sheet. The bin stays hidden until the note
  is pointed at, and it asks "Delete Note?" first.

## Rules

### Add in a sheet

- **Do:** Put Add Note in the card header, opening the Add Note sheet, so the card holds only the list of notes.
- **Don't:** Keep an add form always open in the card. Open the Add Note sheet from the header, so the notes are not
  pushed down.

### Show the whole note in the Notes card

- **Do:** Show each note whole, in its box, so people read it without another click.
- **Don't:** Show a three-line preview in the Notes card itself. Show the whole note, so no one has to open each one to
  read it.

### Open a cut-short preview in a sheet

- **Do:** Put View Note under a note that is cut short (the reason under a stage change), opening the whole note in a
  sheet, so people read the whole note without losing their place.
- **Don't:** Cut the note short with the full text in a tooltip, or expand it in place. Open the whole note in a sheet, so it
  is easy to read and nothing under it shifts.

## When you can do it differently

Offer Edit Note only when the app lets an author change a saved note.

## Which patterns it uses

- See [Cards and Tiles](../patterns/cards-and-tiles.md) for where the card sits, and [History](../patterns/history.md)
  for how history is listed.
- See [Forms in Sheets](../patterns/forms-in-sheets.md) for the Add Note sheet.
- See [Confirmations and Delete](../patterns/confirmations-and-delete.md) for asking before Delete Note removes a note.
- See [Tables](../patterns/tables.md) for a note as a small record, read in a sheet, and for its bin as a row's button.
- See [Cards and Tiles](../patterns/cards-and-tiles.md) for Add in the header or in the empty state.

## In code

The app builds it from aperia-ds5 parts and the recipes on the pattern and component pages:

- The card is the history card from [History](../patterns/history.md), titled Notes, with an outline Add Note
  `Button` as its action and `EmptyState` "No Notes" (with the same button as its `action`) when there are none. Its
  list is the timeline from the same page, each entry boxed, holding the note's box and then the when line (the date,
  the user, and the other record).
- Add Note is a `FormSheet` "Add Note" with `SheetForm` (`submit="Add Note"`), one `Textarea` with `maxLength` and
  the length count from [Forms in Sheets](../patterns/forms-in-sheets.md); ⌘↵ submits.
- Delete is an icon button "Delete Note" (the recipe from [Button](../components/button.md)) (`opacity-0` until
  `group-hover`, `group-focus-within`, and always under `pointer-coarse`), asking with `ConfirmDialog` (title "Delete
  Note?", action "Delete Note").
- The preview is the box with `line-clamp-3` (12px, `bg-muted/60`, `rounded-lg`). Measure `scrollHeight >
  clientHeight` in a `ResizeObserver`; when it is cut, View Note opens a `Sheet` titled "Note" whose
  `SheetDescription` says what, when and who.
