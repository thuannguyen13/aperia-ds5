# Empty State

An empty state replaces missing content and says what is missing and what to do next.

## When to use

Use an empty state in place of content that is missing, in three cases:

- Nothing has been added yet.
- A search or filter matched nothing.
- The content could not load.

## What is available

An empty state has an icon, a title, an optional line, and an optional action. Each case fills them differently.

### No records yet

This case applies when nothing has been added.

| Part | Content |
|---|---|
| Title | "No [Items]", such as No Tasks or No Contacts |
| Line | Only when it says what the title cannot. It can say whose, such as "No tasks assigned to you." It can say which, such as "No lost opportunities in this range." |
| Action | The button that fills it, such as Add Task, when the user can add one |

### No results

This case applies when a search or filter matched nothing.

| Part | Content |
|---|---|
| Title | "No Results", with a search icon |
| Line and action | "No matching results." and Clear Filters, only where there are filters to clear |

### Could not load

This case applies when the content could not load.

| Part | Content |
|---|---|
| Title | What failed, as Failed to Load [Items], such as Failed to Load Tasks |
| Line | What to do, such as "Try again." |
| Action | A way out, such as Try Again or a way home |

### Specs

| Part | Value |
|---|---|
| Icon | 16px, on a 32px square in the muted color with the Large corner |
| Title | 14px, medium weight |
| Line | 14px, muted text |
| Width | Up to 384px, centered |

## How it looks and behaves

An empty state sits in the place of the content it replaces. A screen reader skips the icon, because the title and the
line carry the meaning.

The action is an ordinary button. A keyboard user reaches it with **Tab**.

## Rules

### Say only what helps

- **Do:** Show "No Tasks" alone when the title says it all, so people take it in at a glance.
- **Don't:** Repeat the title ("No tasks yet." under "No Tasks"). Add a second line only when it says something new, so
  no one reads it twice.

### Use the same component every time

- **Do:** Show the icon, the title, and the line in the same place every time, so people recognize an empty state at
  once.
- **Don't:** Show bare text ("No data") or a different layout per screen. Use the empty state, so no one mistakes empty
  for broken.

### Leave out permission hints

- **Do:** Say only that there are none ("No Tasks"), so people see it is empty and move on.
- **Don't:** Hint at permissions ("Ask your administrator for access to see tasks."). Say only what is empty, so no one
  chases access they cannot act on.

### Keep the place

- **Do:** Let the empty state fill the card or table it replaces, so nothing shifts when records arrive.
- **Don't:** Let a card disappear when it is empty. Keep the card with the empty state inside, so the page does not
  jump.

## When you can do it differently

A whole page shows an empty state when it has nothing on it. It offers a way home. See [Empty and
Missing](empty-and-missing.md) for a page the user cannot reach.

## Works with

| Component | How it works with an empty state |
|---|---|
| Card | An empty state fills an empty card. While a card is empty, its Add button moves from the header into the empty state. |
| Table | An empty state shows in place of the rows. |
| Search and filters | A search or filter with no match shows "No Results" with Clear Filters. |

See [Border and Radius](../styles/border-and-radius.md) for the corner the Specs name.

## In code

- `EmptyState` from aperia-ds5: `icon`, `title`, `description`, `action`. It's built from
  `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription` and `EmptyContent` in `aperia-ds5`.
- `icon` takes the icon (`icon={InboxIcon}`) or an element (`icon={<InboxIcon />}`). A server component passes the
  element, because aperia-ds5's components are client components and only an element can reach them from the server.
