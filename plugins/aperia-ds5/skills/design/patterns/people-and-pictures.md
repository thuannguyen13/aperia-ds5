# People and Pictures

A picture beside a record's name tells people which person, company, product, or team the record is. See
[Files and Images](files-and-images.md) for choosing and uploading a picture.

## Anatomy

People and pictures have five parts. The empty picture and the count show only sometimes. The parts are those of an
opportunity record with its company's picture, an owner, an assignee that is empty, and a stack of sales reps.

1. **Record picture**. It is a square avatar for a company, product, or team. The square shows the logo, or a monogram
   when there is no logo.
2. **Person picture**. It is a circle avatar that sits beside a person's name. It holds the photo, or the person's
   initials when there is no photo.
3. **Empty picture** (optional). It is an avatar with a dashed outline that stands for no one. "No [role]" sits beside it.
4. **People stack**. It is a button that holds up to three overlapping avatars of the people on a record. It opens a card
   that lists everyone.
5. **Count** (optional). It is a circle at the end of the stack that reads "+N", the number of people the stack leaves
   out.

## What is available

Each kind of record has its own shape and content:

| Record | Shape | Content |
|---|---|---|
| Person | Circle | Their photo, or else their initials |
| Company, product, or team | Square with rounded corners | A company or product shows its logo on white, or else a monogram. The white keeps a transparent logo visible in Dark. |
| No one | Empty avatar with a dashed outline | "No [role]" beside it, such as "No assignee" |

Pictures come in five sizes:

| Size | Token | Use |
|---|---|---|
| Extra small | `size-5` | A picker row |
| Small | `size-6` | Beside a name |
| Default | `size-8` | The account entry in the sidebar |
| Large | `size-10` | A logo preview in an image picker |
| Extra large | `size-12` | A page header |

A picture smaller than `size-5`, such as one in a `size-4` chip, is sized by the app.

## How it looks and behaves

A picture sits beside a record's name wherever the name shows, such as a picker row (see [Pickers](pickers.md)), a table
cell, a page header, or a list of people.

A picture loads in two steps. The initials show at once. The photo or logo then fades in over them once it loads.
Wherever the photo or logo fails to load, the initials stay.

Initials and monograms take the app's avatar colors, a short set of fill and text pairs that the app sets. The record's
id picks the pair. See [Color](../styles/color.md) for the colors an app sets.

A square's corners get smaller with its size, so a small square never reads as a circle. A picture has a thin inner
border. In a stack, the avatars overlap, and each one has a ring in the page's background color that separates it from
the next.

A screen reader skips a picture that sits beside its name. A picture that stands alone is named.

On a phone, pictures keep the sizes they have on a desktop. See [Screen Sizes](../foundations/screen-sizes.md) for every
part on a phone.

### A stack of people

A page header that shows people shows a stack of up to three avatars, then "+N" for the people it leaves out. Hovering
or focusing the stack opens a card, and so does a tap. The card has one row for each person, with their avatar, name, and role.
A table cell does not hold a stack. See [Table](../components/table.md) for how it shows several names.

## Rules

### 1. Show people as circles and companies, products, and teams as squares

A person's picture is a circle and a company's, product's, or team's is a square, so people tell the kind of record at a
glance.

- **Do:** Show Dana Whitfield in a circle and Acme Foods in a square.
- **Don't:** Put a company in a circle, or round a circle's corners by hand to make a square.

### 2. Show a picture without a frame

A picture has its thin inner border and no other edge, so it looks the same on any surface.

- **Don't:** Add a ring, border, or shadow, such as a ring to mark the signed-in user.

### 3. Use one picture for a record everywhere

A record has the same picture, initials, and colors on every page and in every picker, so people recognize it anywhere.

- **Do:** Pick the colors from the record's id, so a person's initials have one color on every page.
- **Don't:** Pick the colors by position in a list or by the page, which gives one person two colors.

### 4. Show no one as no one

When a role has no one, show the empty avatar with "No [role]" beside it, so a blank does not look like a picture that
failed to load.

- **Do:** Name the role in the words, such as "No assignee" beside an empty avatar.
- **Don't:** Leave a blank space where the picture goes.

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
