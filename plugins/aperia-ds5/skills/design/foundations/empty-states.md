# Empty States

Empty states tell people that a list, a card, or a value has nothing in it, and what they can do about it. See [Copy](copy.md) and [Message Templates](copy-templates.md) for the words.

## Anatomy

An empty state has four parts. The line and the action show only in some cases. Most empty states sit in a card that
has no records, so the parts are those of an empty state in a card.

1. **Icon.** It is a small picture on a rounded square that shows what is missing, such as an inbox for no tasks or a magnifying glass for no results.
2. **Title.** It is a short line of text that says what is empty, such as "No Tasks".
3. **Line** (optional). It is a sentence of muted text under the title that says what the title cannot, such as whose or which records are missing.
4. **Action** (optional). It is a button that fills the empty place or gets the user out of it, such as Add Task, Clear Filters, or Try Again.

## What is available

Each case below says what is empty and what shows in its place.

### A missing value

One value in a table cell, a detail row, or a header is missing, left empty, or hidden from this user. A muted mark shows where the value would be, in one of three forms:

| Form | Shows |
|---|---|
| Missing value | A muted em dash (—) with no spaces around it. It is different from 0. |
| Empty optional field | "No [field]" in muted text, such as "No priority" or "No assignee". |
| Hidden amount | "$XX,XXX" in muted text, for an amount this user may not see. The column keeps its width, and a screen reader says the amount is hidden. In a sentence or a summary the amount can be left out instead. See [Money and Numbers](money-and-numbers.md) for that case. |

### An empty container

A card, a list, or a page has no records yet, its content did not load, or the page cannot show. Each one shows an empty state, a block with an icon of what is missing, a title, an optional line of text, and an optional button. Each case fills the block differently:

| Case | Title | Line | Action |
|---|---|---|---|
| No records yet | "No [Items]", such as No Tasks or No Contacts | Only when it says what the title cannot. It can say whose, such as "No tasks assigned to you." It can say which, such as "No lost opportunities in this range." | Every button that adds records, such as Add Task, or Import and Add Prospect on a list, when the user can add one |
| Could not load | "Failed to Load", with no item name, because the card or list around it already names the item | None, because the Try Again button says it | Try Again, or a way home when trying again cannot help |
| Dead end | Why the page cannot show, such as a record that is not found, a page the user cannot reach, or an error | Only when it says what the title cannot | A way home |

### No matches

A search or a set of filters matches nothing. The list shows an empty state with a search icon:

| Part | Content |
|---|---|
| Title | "No Results" |
| Line and action | "No matching results." and Clear Filters, only where there are filters to clear. A search with no filters shows the title alone. |

The app-wide search dialog shows the same title. See [Global Search](../patterns/global-search.md) for when it shows.

## How it looks and behaves

An empty state sits in the place of the content it replaces and fills the space the records would have taken. A page's own empty state is a surface that fills the page.

In an empty list, the app's own controls in the toolbar's slot, such as a Board / Table switch, do not show.

A screen reader skips the icon, because the title and the line carry the meaning. The action is an ordinary button. A keyboard user reaches it with **Tab**.

## Rules

### 1. Use the empty state, never bare text

Where records would be and there are none, show the empty state, so an empty place never reads as broken and every screen looks the same.

- **Do:** Use the empty state for a card, a list, and a page, with the same layout on every screen.
- **Don't:** Write a bare "No data" or "No results", or give a screen its own layout.

### 2. Keep the card in its place

A card with no records stays on the page with an empty state inside it, so nothing shifts when records arrive.

- **Do:** Keep the Tasks card and show No Tasks inside it.
- **Don't:** Remove a card because it is empty.

### 3. Move Add into an empty card

While a card is empty, its Add button moves from the card's header into the empty state, so the one way to fill the card sits where people look.

- **Do:** Show Add Task in the middle of the empty Tasks card.
- **Don't:** Leave Add in the header while the card is empty.

### 4. Show an empty list as an empty state alone

A list with no records at all shows an empty state in place of the toolbar and the table, because there is nothing to search, filter, or sort. The empty state holds every action that adds records, in the toolbar's order.

- **Do:** Put Import and Add Prospect in the empty state, left to right as the toolbar has them.
- **Don't:** Keep the toolbar above an empty list.

### 5. Keep the toolbar when nothing matches

A search or a set of filters that matches nothing keeps the list toolbar, so people can change the search or the filters. The list shows "No Results" in place of the table, and the footer with the count and the pages is gone.

- **Do:** Show "No Results" under the toolbar, with Clear Filters when filters are on.
- **Don't:** Show the empty state of a list with no records, such as "No Prospects", for a search that matches nothing.

### 6. Say only what helps

A line under the title appears only when it says something the title does not, so no one reads the same thing twice.

- **Do:** Show "No Tasks" alone when the title says it all.
- **Don't:** Repeat the title, such as "No tasks yet." under "No Tasks".

### 7. Never say who to ask

An empty state says only that nothing is there. It never hints at permissions or says who to ask, so no one chases access they cannot act on.

- **Do:** Say "No Tasks" and stop.
- **Don't:** Write "Ask your administrator for access to see tasks."

### 8. Give every dead end a way out

A page that cannot show says why and offers a way home, so no one is stranded.

- **Do:** Say why the page cannot show, such as not found, no access, or an error, and add a button home.
- **Don't:** Leave a blank page, or a message with nowhere to go.

### 9. Show every empty value the same way

A missing value shows as a muted em dash. An optional field that the user left empty shows "No [field]". People then tell a value that is not there from a field left empty by choice, and read both the same way in every table, detail row, and header.

- **Do:** Show — for a missing website, and "No priority" for a priority left empty.
- **Don't:** Use "-", "N/A", "None", "0", or a blank cell.

## In code

- `EmptyState` from `aperia-ds5` for an empty card, list, or page: `icon`, `title`, `description`, `action`,
  `actionClassName` for buttons side by side, and `className` to place it (a page's own `surface flex-1`, nothing
  inside a card, `p-4` in a picker). It is built from `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`,
  `EmptyDescription`, and `EmptyContent` in `aperia-ds5`.
- `icon` takes the icon (`icon={InboxIcon}`) or an element (`icon={<InboxIcon />}`). A server component passes the
  element, because aperia-ds5's components are client components and only an element can reach them from the server.
- An empty list renders `EmptyState` in place of both `ListToolbar` and the table, with the list's adding actions as
  its `action` and `actionClassName="flex-row flex-wrap justify-center"`.
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
