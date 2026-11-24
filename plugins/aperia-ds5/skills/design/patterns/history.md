# History

History lists what happened to a record, newest first, as a timeline in a card.

## When to use

Use history for the changes, notes, and events on one record, such as a stage change, a new note, or a finished task.
Use it on the record's page, in its own card. See [Notes on a Record](../examples/notes.md) for notes shown as history.

## What is available

History is built from two parts:

| Part | What it shows |
|---|---|
| Timeline | One entry per event, newest first. Each entry shows the icon of its kind, what happened, when, and who, then any note in a muted box of three lines at most. A line joins each icon to the next and stops at the last entry. |
| History card | A titled card, such as Activity, with the latest ten entries as a timeline. View All opens every entry in a sheet. |

## How it looks and behaves

The history card shows the latest ten entries. When there are more than ten, View All sits in the card's header and
opens every entry in a sheet that scrolls on its own. The card and the sheet draw the entries in the same way.

Each entry says when it happened in the short relative form, such as "3d ago", with the exact date on hover. See
[Copy](../foundations/copy.md) for how times are written.

An entry that the app made, such as an import, has no person. A card with no entries keeps its place, with an empty state
inside, such as "No Activity".

## Rules

### Show the latest ten entries, with View All

- **Do:** Show the latest ten in the history card, with View All opening every entry in a scrolling sheet, so the page
  stays short.
- **Don't:** Let a long history scroll inside its card, or run the page on for screens. Show ten and View All, so the
  page stays easy to scroll.

## When you can do it differently

Notes are the same card, titled Notes, with their own empty state. Its Add sits in the header beside View All while
there are entries, and inside the empty state while there are none.

## Works with

- See [Card](../components/card.md) for the titled card.
- See [Cards and Tiles](cards-and-tiles.md) for where the history card sits on a page.
- See [Copy](../foundations/copy.md) for relative times.

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
