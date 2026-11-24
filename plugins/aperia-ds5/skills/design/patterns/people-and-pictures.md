# People and Pictures

Pictures represent people as circles and companies, products, and teams as squares.

## When to use

Show a picture beside a record's name wherever the name shows, such as a picker row, a table cell, a page header, or a
list of people.

Show an empty picture for no one, such as an unassigned owner.

## What is available

Each kind of record has its own shape and content:

| Record | Shape | Content |
|---|---|---|
| Person | Circle | Their photo, or else their initials |
| Company, product, or team | Square with rounded corners | A company or product shows its logo on white, or else a monogram. The white keeps a transparent logo visible in Dark. |
| No one | Empty avatar with a dashed outline | "No [role]" beside it, such as "No assignee" |

Pictures come in five sizes:

| Size | Pixels | Use |
|---|---|---|
| Extra small | 20px | A picker row |
| Small | 24px | Beside a name |
| Default | 32px | The account entry in the sidebar |
| Large | 40px | A logo preview in an image picker |
| Extra large | 48px | A page header |

A page header that shows people shows up to three avatars, then "+N" for the people it leaves out. Hovering, focusing, or tapping them
opens a card. The card lists everyone, each with their avatar, name, and role.

## How it looks and behaves

A picture loads in two steps. The initials show at once. The photo or logo then fades in over them once it loads.
Wherever the photo or logo fails to load, the initials stay.

Every picture looks the same across the app. Initials and monograms take the app's colors. The colors are picked by
the record, so they never change between pages. A square's corners get smaller with its size, so a small square never
reads as a circle. A picture has a thin inner border and no other edge.

A screen reader skips a picture that sits beside its name. A picture that stands alone is named.

On a phone, pictures keep the sizes they have on a desktop. A tap on a stack of pictures opens the card that lists
everyone. See
[Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.

## Rules

### Show people as circles and companies, products, and teams as squares

- **Do:** Show people in circles and companies, products, and teams in squares (such as Dana Whitfield and Acme Foods),
  so people tell them apart at a glance.
- **Don't:** Make every picture a circle, or round a circle's corners by hand for a square. Use the shared shapes, so
  the kind reads at once.

### Show a picture without a frame

- **Do:** Show the picture as it is, with its thin inner border, so it looks the same on any surface.
- **Don't:** Put a ring, border, or shadow around a picture. Leave it unframed, so pictures look the same everywhere.

### Use one picture for a record everywhere

- **Do:** Use the same picture and colors for a record on every page and in every picker, so people recognize it
  anywhere.
- **Don't:** Draw initials or logos differently in one place, or change colors between pages. Use the shared picture,
  so a record never looks like two.

### Show no one as no one

- **Do:** Show the dashed empty avatar and "No assignee", so people see no one is assigned.
- **Don't:** Leave an empty space where the picture should be. Show the empty avatar, so it does not look broken.

## When you can do it differently

A picture smaller than 20px, such as one in a 16px chip, is sized by the app.

## Works with

Pictures work with two other patterns:

- See [Pickers](pickers.md) for the record's picture on every picker row.
- See [Files and Images](files-and-images.md) for picking a logo, which previews as the record's square.

## In code

- `Avatar` from `aperia-ds5`: `shape="square"` for companies, products and teams; `size` `xs`, `sm`, `default`, `lg`,
  `xl`; `colors={{ fill, text }}` picked by the record's id; `empty` for no one; `label` when no name sits beside it.
  A photo or logo is `AvatarImage` (a logo adds `className="bg-white object-contain"`), the initials `AvatarFallback`
  (`initials(name)` from `aperia-ds5/format`). Never a `rounded-*` class, ring, border or shadow on it.
- The app keeps one small adapter that maps a record to its picture (URL, letters, colors) and renders `Avatar`; every
  page calls that.

### People stack

Build the people stack in the app from `HoverCard`, `HoverCardTrigger`, `HoverCardContent`, `AvatarGroup`,
`AvatarGroupCount`, `ItemGroup`, `Item`, `ItemMedia`, `ItemContent`, and `ItemTitle` from `aperia-ds5`. Each avatar
comes from the app's picture adapter. Companies and products are square.

```tsx
<HoverCard open={open} onOpenChange={setOpen} openDelay={150} closeDelay={100}>
  <HoverCardTrigger asChild>
    <button type="button" aria-label="Sales Reps: Maria Chen (Lead), Sam Ortiz" className="flex cursor-pointer rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
      <AvatarGroup>
        {people.slice(0, 3).map((person) => <RecordAvatar key={person.id} record={person} size="sm" />)}
        {people.length > 3 && <AvatarGroupCount className="text-xs">+{people.length - 3}</AvatarGroupCount>}
      </AvatarGroup>
    </button>
  </HoverCardTrigger>
  <HoverCardContent align="start" className="w-auto min-w-56 p-1">
    <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Sales Reps</p>
    <ItemGroup role="list" className="gap-0 has-data-[size=xs]:gap-0">
      {people.map((person) => (
        <Item key={person.id} role="listitem" size="xs" className="gap-2.5 border-0 px-2 py-1.5">
          <ItemMedia><RecordAvatar record={person} size="sm" /></ItemMedia>
          <ItemContent className="min-w-0 gap-0">
            <ItemTitle className="truncate">{person.name}</ItemTitle>
            <span className="text-xs text-muted-foreground">{[person.role, person.detail].filter(Boolean).join(" · ")}</span>
          </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  </HoverCardContent>
</HoverCard>
```

- `RecordAvatar` in the snippet stands for the app's own picture adapter.
- The stack shows the first three avatars, then a count such as +2 for the people it leaves out.
- The button's accessible name lists every person and their role, so nothing hides behind the hover.
- The card opens on hover and on keyboard focus. A hover card ignores touch, so on a pointer down with
  `pointerType === "touch"`, remember whether it was open, and on click set it to the opposite. While a touch is in
  progress, ignore `onOpenChange`.
- With no one, the button holds `<Avatar size="sm" empty />`, its name reads "Sales Reps: No assignee", and the card
  shows the muted "No assignee" line in place of the list.
- The avatars are 24px (`sm`) in the header line, or 20px (`xs`) for a denser line. The card's rows stay 24px.
