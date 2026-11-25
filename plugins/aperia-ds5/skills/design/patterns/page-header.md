# Page Header

A page header tells people which page they are on, gives the page's key facts, and offers the page's actions, at the top of every page. See [App Shell](app-shell.md) for the breadcrumb that its title fills.

## Anatomy

A page header has seven parts. Only the title always shows. The picture, subtitle, actions, record actions,
properties, and people show only when the page has them. The parts are those of a record's header that has all seven.

1. **Picture** (optional). It is an image at the start of the title's line, on a record's page. A person's picture is a circle, and a company's or product's is a square.
2. **Title**. It is the page's name as a heading. It is also the last crumb of the breadcrumb in the top bar.
3. **Subtitle** (optional). It is one line of muted text under the title. A record's subtitle gives its kind and number, such as "Opportunity #659".
4. **Actions** (optional). They are the buttons at the end of the title's line, outline buttons first and the page's primary action last, such as Export Report.
5. **Record actions** (optional). They are the buttons and the More actions (…) menu that follow the actions on a record's page, such as Edit, Mark as Won, and Delete.
6. **Properties** (optional). They are a row of facts under the title. Each has a small muted label over its value, such as Owner over "Dana Whitfield".
7. **People** (optional). It is a stack of avatars that shows who works on the record, such as its sales reps. It sits in the subtitle or in a property.

## How it looks and behaves

A page header keeps one height for its title's line and one order for its parts. From start to end, the title's line holds the picture, the title with its subtitle, the actions, and the record actions. The properties sit in a row under that line.

Buttons on the title's line are `gap-2` apart. See [Sizes](../foundations/sizes.md) for the height of the title's line.

### The subtitle

A record with a number leads its subtitle with its kind and number. Its parent record follows, then its stacks of pictures, such as its products and its sales reps. An example is "Opportunity #659 · Northwind Merchant Services · (products) · (sales reps)". People in a header use the people stack. See [People and Pictures](people-and-pictures.md) for how the stack shows people and no one.

### Record actions

A record's actions follow the order and the limit on buttons in [Buttons and Actions](buttons-and-actions.md). On screens narrower than `--breakpoint-lg`, they fold into one More actions (…) button. Its menu keeps the same order, with a divider above the destructive actions.

An action that is blocked on this record still shows. It is disabled and gives its reason on hover and keyboard focus. An action that the person's role can never take is left out. See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for that choice and the words of each reason.

### On a phone

On a phone, the record actions stay on the title's line. The other buttons take a full-width row under it, with the primary action first. Properties sit in two columns. See [Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.

## Rules

### 1. Name the page once

A page's name is written in its header's title, and the breadcrumb takes its last crumb from that title, so the screen shows each name one time. A page may skip the page header when its own content already shows the record's name as a heading. That page still ends its breadcrumb with the record's name.

- **Don't:** Put the title in the top bar and again on the page, or repeat it on the first card.

### 2. Keep the header to the page's name, actions, and facts

The header holds the title, subtitle, actions, and properties. Tiles, toolbars, tabs, and cards come after it, so the header stays about the page. A list's filters and actions sit in its toolbar. See [List Toolbar](list-toolbar.md) for the toolbar.

- **Don't:** Put a filter in the header, such as a label over a field. Move it to the list's toolbar, so controls stay where people look for them.

### 3. Lead a record with its kind and number

A record's subtitle starts with its kind and number, so people know what they are looking at. A table column shows the bare number, so the column stays short.

- **Don't:** Write "Opportunity #659" in a table's column. Write "659".

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
