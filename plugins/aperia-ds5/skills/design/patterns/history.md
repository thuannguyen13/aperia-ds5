# History

History lets people see what happened to a record, such as a stage change, a new note, or a finished task, newest first.
See [Cards and Tiles](cards-and-tiles.md) for where the card sits on a record's page.

## Anatomy

A history card has ten parts. View All, Who, Note, and Line show only sometimes. The card is a record's Activity
card, with the first entries of a longer history.

1. **History card**. It is a titled card on the record's page that holds the latest entries as a timeline. See
   [Card](../components/card.md) for the card.
2. **Title**. It is the card's heading, such as "Activity".
3. **View All** (optional). It is an outline button at the right end of the card's header. It opens every entry in a
   sheet, and shows only when the history has more entries than the card shows (History 1).
4. **Entry**. It is one item of the timeline, for one thing that happened. Entries run newest first.
5. **Icon**. It is a small icon at the left of an entry that shows the kind of entry, such as an arrow for a stage
   change.
6. **What happened**. It is a sentence that says what changed, such as "Changed stage from Demo to Proposal".
7. **When**. It is the time since the entry happened, in short form such as "3d ago", on a line under the sentence.
8. **Who** (optional). It is the name of the person who made the change, after the When and a dot. An entry that the
   app made, such as an import, has no person.
9. **Note** (optional). It is a box with a muted fill under the entry that holds the text of a note, three lines at most.
10. **Line** (optional). It is a thin vertical divider under the icon that joins the icon to the next entry's icon. The
    last entry has none.

## How it looks and behaves

The card and the sheet that View All opens draw their entries in the same way.

Each entry says when it happened in the short relative form, such as "3d ago", with the exact date on hover and on a
tap. See [Copy](../foundations/copy.md) for how times are written, and [Accessibility](../foundations/accessibility.md)
for what a tap shows on a touch screen.

A card with no entries keeps its place, with an empty state inside, such as "No Activity". See
[Empty States](../foundations/empty-states.md) for the empty card.

On a phone, View All opens the sheet over the whole screen, and every entry keeps the layout it has on a desktop.
See [Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.

### Notes

A record's notes use the same card, titled Notes, with their own empty state, such as "No Notes". Each entry opens with
the note's box, then says when and who. The card's Add button sits in the header beside View All while there are
notes, and inside the empty state while there are none.

## Rules

### 1. Show the latest ten entries, with View All

The card shows the latest ten entries. When there are more, View All opens every entry in a sheet that scrolls on its
own, so the page keeps one scroll.

- **Don't:** Let a long history scroll inside its card, or run the page on for screens.

## In code

### Timeline

Build the timeline in the app from an `ol` and `RelativeTime` from `aperia-ds5`. Each entry is an icon on a line that
joins it to the next entry. The line stops at the last entry.

```tsx
<ol className="flex flex-col text-xs">
  <li className="flex gap-4">
    <div className="flex flex-col items-center">
      <span title="Stage change" className="relative flex size-5 shrink-0 items-center justify-center text-muted-foreground">
        <ArrowRightIcon className="size-3.5" aria-hidden />
      </span>
      {!last && <span aria-hidden className="mt-1 mb-0.5 w-px flex-1 bg-border" />}
    </div>
    <div className={cn("flex min-w-0 flex-1 flex-col items-start", !last && "pb-3")}>
      <span className="sr-only">Stage change: </span>
      <p className="text-sm leading-5 text-muted-foreground">Moved to Proposal</p>
      <div className="flex max-w-full min-w-0 items-center gap-1.5 leading-5 text-muted-foreground">
        <span className="shrink-0 first-letter:uppercase"><RelativeTime value={entry.at} /></span>
        <span aria-hidden>·</span>
        <span className="shrink-0">Maria Chen</span>
      </div>
    </div>
  </li>
</ol>
```

- The kind of entry is the icon's `title` on hover and an `sr-only` text that a screen reader reads first.
- Leave out the user and its dot when the app made the change, such as an import.
- A badge, such as a check on a finished task, sits over the icon's corner, out of the flow.
- When each entry opens with a box, as notes do, add `mt-2` to the icon and `-mb-1.5` to the line, so the icon centers
  on the first line of text inside the box.

### History card

Build the history card in the app as a titled card from [Card](../components/card.md), with a `Sheet` from
`aperia-ds5` for View All. The card shows the latest ten entries, newest first, as a timeline.

```tsx
<Card className="gap-0 py-0">
  {/* The titled card's header, titled Activity, with View All and Add as its action.
      ActivityTimeline is the app's own timeline, built from the recipe above. */}
  <CardContent className="pb-4">
    {items.length === 0 ? <EmptyState icon={ClockIcon} title="No Activity" /> : <ActivityTimeline items={items.slice(0, 10)} />}
  </CardContent>
  <Sheet open={open} onOpenChange={setOpen}>
    <SheetContent aria-describedby={undefined} side="right" className="data-[side=right]:sm:max-w-xl">
      <SheetHeader className="border-b"><SheetTitle>Activity</SheetTitle></SheetHeader>
      <div className="min-h-0 flex-1 overflow-y-auto p-4"><ActivityTimeline items={items} /></div>
    </SheetContent>
  </Sheet>
</Card>
```

- View All (`variant="outline"`, labeled "View All Activity") shows in the header only when there are more than ten
  entries. It opens the sheet, which scrolls on its own, so the page never nests a scroll.
- `RelativeTime` takes `value` (a YYYY-MM-DD day, an ISO moment or a Date) and `label`, in Dallas time by default.
  Never format a relative date by hand.
