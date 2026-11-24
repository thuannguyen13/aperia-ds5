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

A page header that shows people shows up to three avatars, then "+N" for the rest. Hovering, focusing, or tapping them
opens a card. The card lists everyone, each with their avatar, name, and role.

## How it looks and behaves

A picture loads in two steps. The initials show at once. The photo or logo then fades in over them once it loads.
Wherever the photo or logo fails to load, the initials stay.

Every picture looks the same across the app. Initials and monograms take the app's colors. The colors are picked by
the record, so they never change between pages. A square's corners get smaller with its size, so a small square never
reads as a circle. A picture has an inner hairline and no other edge.

A screen reader skips a picture that sits beside its name. A picture that stands alone is named.

## Rules

### Show people as circles and companies, products, and teams as squares

- **Do:** Show people in circles and companies, products, and teams in squares (such as Dana Whitfield and Acme Foods),
  so people tell them apart at a glance.
- **Don't:** Make every picture a circle, or round a circle's corners by hand for a square. Use the shared shapes, so
  the kind reads at once.

### Show a picture without a frame

- **Do:** Show the picture as it is, with its inner hairline, so it looks the same on any surface.
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
- People in a header are `PeopleStack` (`people`, `title`, `empty`, `size`), each person passed as data from that
  adapter; companies and products are `shape: "square"`.
