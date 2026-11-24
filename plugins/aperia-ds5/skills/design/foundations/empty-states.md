# Empty States

Empty states take the place of content that does not exist, such as a missing value, an empty list, or a search that
matches nothing.

## When to use

Use an empty state wherever content does not exist. Find the case first, because each case has its own form:

| Case | Where it happens | What shows |
|---|---|---|
| A missing value | One value in a table cell, a detail row, or a header is missing, left empty, or hidden from this user. | A muted mark where the value would be, such as — or "No priority" |
| An empty container | A card, a list, or a page has no records yet, its content did not load, or the page cannot show. | The empty state, with an icon of what is missing, a title, and an action when there is one |
| No matches | A search or a set of filters matches nothing. | The empty state titled "No Results" |

## What is available

Each case has its own forms, set out below in the same order as the cases.

### A missing value

A missing value takes one of three forms, each shown where the value would be:

| Form | Shows |
|---|---|
| Missing value | A muted em dash (—) with no spaces around it. It is different from 0. |
| Empty optional field | "No [field]" in muted text, such as "No priority" or "No assignee". |
| Hidden amount | "$XX,XXX" in muted text, for an amount this user may not see. The column keeps its width, and a screen reader says the amount is hidden. |

### An empty container

An empty card, list, or page shows an empty state. An empty state has four parts, which are an icon of what is
missing, a title, an optional line, and an optional action. Each case fills the parts differently:

| Case | Title | Line | Action |
|---|---|---|---|
| No records yet | "No [Items]", such as No Tasks or No Contacts | Only when it says what the title cannot. It can say whose, such as "No tasks assigned to you." It can say which, such as "No lost opportunities in this range." | The button that fills it, such as Add Task, when the user can add one |
| Could not load | "Failed to Load", with no item name, because the card or list around it already names the item | None, because the Try Again button says it | Try Again, or a way home when trying again cannot help |
| Dead end | Why the page cannot show, such as a record that is not found, a page the user cannot reach, or an error | Only when it says what the title cannot | A way home |

### No matches

A search or a set of filters that matches nothing shows an empty state with a search icon:

| Part | Content |
|---|---|
| Title | "No Results" |
| Line and action | "No matching results." and Clear Filters, only where there are filters to clear |

## How it looks and behaves

An empty state sits in the place of the content it replaces and fills the space its records would have taken. The
card or the table stays where it was, so nothing shifts when records arrive.

While a card is empty, its Add button moves from the card's header to the middle of the empty state.

The second line, when there is one, says what the title cannot. It says whose records are missing ("No tasks assigned
to you.") or which records are missing ("No lost opportunities in this range.").

In a search, "No Results" shows only once typing has paused, not while the user is still typing.

A screen reader skips the icon, because the title and the line carry the meaning. The action is an ordinary button. A
keyboard user reaches it with **Tab**.

## Rules

### Show a missing value as a dash

- **Do:** Show a muted em dash (—) where a value is missing, so empty cells look intentional.
- **Don't:** Use "-", "N/A", "None", "0", or a blank cell. Use the em dash, so missing reads the same everywhere.

### Say "No [field]" for an empty optional field

- **Do:** Show "No [field]" in muted text where the value would show (such as "No priority"), so people see the field
  was left empty by choice.
- **Don't:** Leave an empty space, or a dash, when the user chose to leave a field empty. Say "No [field]", so the
  choice is clear.

### Use the empty state, never bare text

- **Do:** Use the empty state, with its icon, title, and line in the same place on every screen, so people recognize
  it at once.
- **Don't:** Write a bare "No data" or "No results", or give each screen its own layout. Use the empty state, so no
  one mistakes empty for broken.

### Say only what helps

- **Do:** Show "No Tasks" alone when the title says it all, so people take it in at a glance.
- **Don't:** Repeat the title ("No tasks yet." under "No Tasks"). Add a second line only when it says something new, so
  no one reads it twice.

### Leave out permission hints

- **Do:** Say only that there are none ("No Tasks"), so people see it is empty and move on.
- **Don't:** Hint at permissions ("Ask your administrator for access to see tasks."). Say only what is empty, so no one
  chases access they cannot act on.

### Keep the place

- **Do:** Let the empty state fill the card or table it replaces, so nothing shifts when records arrive.
- **Don't:** Let a card disappear when it is empty. Keep the card with the empty state inside, so the page does not
  jump.

### Give every dead end a way out

- **Do:** Say why the page cannot show (not found, no access, an error) and offer a way home, so no one is stranded.
- **Don't:** Leave a blank page, or a message with nowhere to go. Give a way out, so people can carry on.

## When you can do it differently

A search with no filters on shows "No Results" alone, without "No matching results." and Clear Filters.

A whole page shows an empty state when it has nothing on it. The empty state fills the page and offers a way home.

An amount that the user may not see can be left out of a sentence or a summary. See
[Money and Numbers](money-and-numbers.md) for that case.

## Works with

- See [Cards and Tiles](../patterns/cards-and-tiles.md) for an empty card and where its Add button sits.
- See [Tables](../patterns/tables.md) for a missing value in a table, and for a table with no rows.
- See [Filters](../patterns/filters.md) for Clear Filters, and [Global Search](../patterns/global-search.md) for a search
  across the app that finds nothing.
- See [Copy](copy.md) and [Message Templates](copy-templates.md) for the fixed phrases for missing, empty, and hidden
  values.
- See [Money and Numbers](money-and-numbers.md) for a hidden amount.

## In code

- `EmptyState` from `aperia-ds5` for an empty card, list, or page: `icon`, `title`, `description`, `action`,
  `actionClassName` for buttons side by side, and `className` to place it (a page's own `surface flex-1`, nothing
  inside a card, `p-4` in a picker). It is built from `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`,
  `EmptyDescription`, and `EmptyContent` in `aperia-ds5`.
- `icon` takes the icon (`icon={InboxIcon}`) or an element (`icon={<InboxIcon />}`). A server component passes the
  element, because aperia-ds5's components are client components and only an element can reach them from the server.
- `NoResults` from `aperia-ds5` when nothing matches. `onClear` adds "No matching results." and Clear Filters.
- Build the empty value and the "No [field]" text in the app as muted spans. Use them in tables, detail rows, and
  headers alike.

```tsx
{/* A missing value: an em dash with no spaces around it. Different from 0. */}
<span className="text-muted-foreground">—</span>

{/* An optional field left empty, where its value would show. */}
<span className="text-muted-foreground">No priority</span>
```

- Show 0 as 0. The em dash means the value is missing, not that it is zero.
- Build a hidden amount as the hidden value recipe on [Money and Numbers](money-and-numbers.md).

### Specs

| Part | Value |
|---|---|
| Icon | 16px, on a 32px square in the muted color with the Large corner |
| Title | 14px, medium weight |
| Line | 14px, muted text |
| Width | Up to 384px, centered |

See [Border and Radius](../styles/border-and-radius.md) for the corner the Specs name.
