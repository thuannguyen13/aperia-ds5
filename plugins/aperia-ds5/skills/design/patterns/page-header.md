# Page Header

A page header sits at the top of every page and holds its title, subtitle, actions, and key facts.

## When to use

Use a page header at the top of every page, as its first section. A record's page uses it for the record too, with the
record's picture, kind and number, people, and record actions.

## What is available

A page header has seven parts, listed from start to end and top to bottom:

| Part | Position | Content |
|---|---|---|
| Picture | Before the title, on a record's page | A 48px picture. A person is a circle, and a company or product is a square. |
| Title | Start of the title's line | The page's name in 24px semibold. It also fills the last crumb of the breadcrumb in the top bar. |
| Actions | End of the title's line | Other actions as outline buttons, then the page's primary action, such as Export Report. A list's actions, such as Add Prospect, sit in its toolbar instead. |
| Record actions | End of the title's line, on a record's page | Edit, the record's other actions, then the destructive ones and Delete. |
| Subtitle | Under the title | One line of muted text. |
| Properties | Row under the title | A small muted label over each value, such as Owner or Stage. |
| People | Subtitle's line, or a property | A stack of avatars. |

## How it looks and behaves

A page header keeps one height for its title's line and one order for its actions.

The title's line is at least a button's height, so a page without actions lines up with a page that has them. Buttons
are 8px apart.

A record with a number leads its subtitle with its kind and number, then its parent record, then its stacks of
pictures, such as its products and its sales reps. An example is "Opportunity #659 · Northwind Merchant Services ·
(products) · (sales reps)". Tables keep the bare number, such as "659".

People show as three avatars at most, then "+N". Pointing at the stack, focusing it, or tapping it opens a card. The
card lists everyone with their picture, name, and role. When no one is assigned, the stack shows an empty avatar and
"No [role]", such as "No assignee".

On screens 1024px and wider, record actions are buttons. Edit comes first, then the record's other actions. Actions
that close the record's work, such as Close as Lost, come next, set apart in the destructive color. Delete comes last.
On narrower screens, the record actions fold into one More actions (…) button. Its menu keeps the same order, with a
line above the destructive actions.

An action the user cannot take still shows. It is disabled and says why on hover and keyboard focus. A Delete that the
record cannot have says "This item is in use and cannot be deleted."

On a phone, the record actions stay on the title's line. The other buttons take a full-width row under it, with the
primary action first. Properties sit in two columns. See [Screen Sizes](../foundations/screen-sizes.md) for every
part on a phone.

## Rules

### Name the page once

- **Do:** Put the page's title in its header and let the breadcrumb take its last crumb from that title, so the name is
  written in one place.
- **Don't:** Put the title in the top bar and again on the page, or repeat it on the first card. Name the page once, so
  the screen shows each name one time.

### Keep the header to the page's name, actions, and facts

- **Do:** Keep the header to the title, subtitle, actions, and properties, with tiles, toolbars, filters, and tabs
  after it, so the header stays about the page.
- **Don't:** Put a filter in the header, such as a label over a field. Move it to the list's toolbar, so controls stay
  where people look for them.

### Lead a record with its kind and number

- **Do:** Lead the record's subtitle with its kind and number ("Opportunity #659"), so people know what they are
  looking at.
- **Don't:** Write "Opportunity #659" in a table's column. Show the bare number, so the column stays short.

### Show people as one stack

- **Do:** Show three avatars, then "+N", opening a card that lists everyone, so the header stays compact.
- **Don't:** Leave a blank space when no one is assigned. Show the empty avatar and "No assignee", so people know no one
  is on it.

### Put record actions in one order

- **Do:** Put Edit, the record's other actions, then the destructive ones and Delete in the header, folding into More
  actions on small screens, so actions keep one order.
- **Don't:** Put Edit and Delete on table rows, or record actions in the top bar. Keep them in the header, so people
  find them in one place.

### Show a blocked action and say why

- **Do:** Keep a blocked Delete in place, disabled, with "This item is in use and cannot be deleted." on hover, so
  people know why.
- **Don't:** Let Delete disappear without a word when the record cannot be deleted. Show it disabled with its reason,
  so nothing seems missing.

## When you can do it differently

A page may skip the page header when its own content already shows the record's name as a heading. That page still
ends its breadcrumb with the record's name.

## Works with

- See [App Shell](app-shell.md) for the breadcrumb the title fills.
- See [Cards and Tiles](cards-and-tiles.md) for the tiles and cards under a record's header.
- See [Buttons and Actions](buttons-and-actions.md) for which type each action is.

## In code

- `PageHeader` from `aperia-ds5`: `title`, `subtitle`, `media` (`<Avatar size="xl">`, `shape="square"` for a company or
  product), `actions` (outline buttons, then the primary), `menu` (`RecordActions`) and `properties` (an array of
  `[label, value]` pairs; a `false` entry is left out). `parents` replaces the route's crumbs for a record that sits
  under another one. `PageProperty` is one label over its value, for any row of facts.
- A page that names its record in its content renders `PageCrumb` (`title`, `parents`) instead of `PageHeader`.
- `RecordActions`: `onEdit`, `onDelete`, `deleteBlocked` (`true` for `IN_USE_DELETE`, or the reason as a string) and
  `actions` (`{ label, icon, onSelect, destructive?, disabled?, blocked? }`; `blocked` is the reason it shows).
  `BlockedMenuItem` is a menu item the viewer cannot take, with its reason.
- People go in the `subtitle` or a `properties` value as the people stack recipe on
  [People and Pictures](people-and-pictures.md), built in the app: named by their role here (such as "Sales Reps"),
  pictures from the app's picture adapter (`shape="square"` for companies and products), "No assignee" when empty, and
  `size="xs"` for a denser line.
- A list's actions go in `ListToolbar`'s `actions`, never in `PageHeader`'s `actions`. A dashboard's date range is a
  control on its own row under the header.
