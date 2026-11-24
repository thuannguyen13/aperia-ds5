# Settings Page

A settings page holds the options that an admin sets for the whole app, in one titled card for each set of options.

## When to use

Use this layout for a page where an admin sets what the rest of the app uses, such as its stages, its lost reasons, or
what each role may do.

Settings that belong to one person, such as Notification Settings, do not go on this page. They open in a sheet from
the account menu. See [Roles and Permissions](roles-and-permissions.md) for that sheet.

## How it looks and behaves

A settings page has a page header and one card for each set of options, 20px apart. The cards sit in one column, so
each set of options has the page's full width.

| Section | Content |
|---|---|
| Page header | The title, "Settings", and a one-line subtitle that says what the page sets |
| A card for each set | The set's name as the card's title, such as Stages or Roles. A list of options shows its count beside the title and its Add button in the header. |

Each card works as its own example page describes. A list of options, such as Stages, is an editable option list. A
row opens the option's sheet, and a grip reorders the options when their order matters. A grid of what each role may
do is the roles grid, and each pick saves at once with Undo.

The page has no Save button. Each change saves where it is made. A new order, a pick, and a switch save at once, and an
option's sheet saves its own form.

On a phone, the cards keep one column. A grid too wide for the screen, such as Roles, shows one role at a time, picked
above the table.

## Before and after

- **Before:** Every setting is a field in one long form under page tabs, such as General, Stages, and Roles. One Save
  Changes button at the end saves them all, and a change is lost when people switch tabs.
- **After:** Each set of options has its own titled card on one page. Each change saves where it is made, and an
  option opens its own sheet.

## Rules

Each part's rules live on its example or pattern page, listed under Which patterns it uses. One rule belongs to the
settings page itself.

### Give each set of options its own card

- **Do:** Put each set of options in its own titled card (Stages, Lost Reasons, Roles), so people find a set by its
  title.
- **Don't:** Put every setting in one form with one Save Changes button at the end. Give each set its own card, so a
  change to one set never waits on another.

## When you can do it differently

This page has no exceptions of its own. Each set's exceptions are on its example page.

## Which patterns it uses

- See [Page Header](../patterns/page-header.md) for the title and the subtitle.
- See [Editable Option List](option-list.md) for a list of options, its sheet, and its grip.
- See [Roles and Permissions](roles-and-permissions.md) for the roles grid and Notification Settings.
- See [Cards and Tiles](../patterns/cards-and-tiles.md) for the titled card, its count, its Add button, and one page of
  cards instead of page tabs.
- See [Page Layout](../foundations/page-layout.md) for the 20px between sections.

## In code

The app builds the page from aperia-ds5 parts and the recipes on the pattern and component pages, inside
`AppContent`:

- `PageHeader` with `title="Settings"` and a `subtitle`.
- Each set is the titled card from [Card](../components/card.md), a direct child of `AppContent`. A list of options
  holds a flush `Table`, built as on [Editable Option List](option-list.md). The roles grid is built as on
  [Roles and Permissions](roles-and-permissions.md).
- Changes save on their own: `toast` from sonner confirms a new order or a pick, with Undo where the page offers it.
  No `SheetForm` or Save button wraps the page.
