# Empty State

An empty state shows where content would be when there's none: a card with no tasks, a search with no results. It says
what's missing and, when there's one, what to do about it.

## Cases

### No records yet

Nothing has been added.

- **Title:** "No [Items]": No Tasks, No Contacts.
- **Line:** only when it says what the title can't. Whose: "No tasks assigned to you." Which: "No lost opportunities in
  this range."
- **Action:** the button that fills it, such as Add Task, when the user can add one.

### No results

A search or filter matched nothing.

- **Title:** "No Results", with a search icon.
- **Line and action:** "No matching results." and Clear Filters, only where there are filters to clear.

### Something went wrong

The content couldn't load.

- **Title and line:** say what happened, and what to do: "Try again."
- **Action:** a way out, such as Try Again or a way home.

## Rules

### Say only what helps

- **Do:** "No Tasks", alone, when the title says it all.
- **Don't:** "No tasks yet." under "No Tasks", repeating the title.

### Always the same component

- **Do:** the icon, the title and the line, in the same place every time.
- **Don't:** bare text such as "No data", or a different layout per screen.

### No permission hints

- **Do:** "No Tasks."
- **Don't:** "Ask your administrator for access to see tasks."

### Keep the place

- **Do:** the empty state fills the card or table it replaces, so nothing shifts when records arrive.
- **Don't:** a card that disappears when it's empty.

## Works with

- **Card:** fills an empty card. While a card is empty, its Add button moves from the header into the empty state.
- **Table:** shown in place of the rows.
- **Search and filters:** "No Results" with Clear Filters.
- **Pages:** a page with nothing on it, or one the user can't reach, says why and offers a way home.

## Accessibility

- The icon is decoration; the title and line carry the meaning.
- The action is an ordinary button, reached with **Tab**.

## Specs

| Part | Value |
|---|---|
| Icon | 16px, on a 32px grey square with 10px corners |
| Title | 14px, medium weight |
| Line | 14px, muted text |
| Width | Up to 384px, centred |

## In code

- `EmptyState` (`assets/components/empty-state.tsx`): `icon`, `title`, `description`, `action`. It's built from
  `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription` and `EmptyContent` in `aperia-ds5`.
