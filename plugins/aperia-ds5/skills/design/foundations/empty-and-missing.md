# Empty and Missing

Empty and missing states replace content that does not exist, such as an empty list, a search with no match, a missing
value, or a page that cannot be reached.

## When to use

Use an empty or missing state in four cases:

- A list, a card, or a page has no records yet.
- A search or a set of filters matches nothing.
- A single value is missing, empty, or hidden from this user.
- A page is a dead end, such as a record that is not found, a page the user cannot reach, or content that did not load.

## What is available

Six states cover content that does not exist:

| State | Shows |
|---|---|
| No records yet | The empty state, with an icon of what is missing and "No [Items]" (such as "No Tasks"). A second line appears only when it adds something. The button that fills it follows, such as Add Task. See [Empty State](empty-state.md). |
| No results | The same empty state with a search icon, titled "No Results". "No matching results." and Clear Filters appear only where there are filters to clear. |
| Missing value | A muted em dash (—) with no spaces around it. It is different from 0. |
| Empty optional field | "No [field]" in muted text, such as "No priority" or "No assignee". |
| Hidden amount | "$XX,XXX" in muted text, for an amount this user may not see. The column keeps its width, and a screen reader says the amount is hidden. |
| Dead end | A message that says why the page cannot show, and a way home. |

## How it looks and behaves

An empty state fills the space its records would have taken. The card or the table stays where it was, so nothing
shifts when records arrive.

While a card is empty, its Add button moves from the card's header to the middle of the empty state.

In a search, "No Results" shows only once typing has paused, not while the user is still typing.

The second line, when there is one, says what the title cannot. It says whose records are missing ("No tasks assigned
to you."), which records are missing ("No lost opportunities in this range."), or what to do ("Try again.").

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

- **Do:** Use the empty state with its icon and "No [Items]", the same on every screen, so people recognize it at once.
- **Don't:** Write a bare "No data" or "No results", or a second line that repeats the title. Use the empty state, so
  every screen says it the same way.

### Give every dead end a way out

- **Do:** Say why the page cannot show (not found, no access, an error) and offer a way home, so no one is stranded.
- **Don't:** Leave a blank page, or a message with nowhere to go. Give a way out, so people can carry on.

## When you can do it differently

A search with no filters on shows "No Results" alone, without "No matching results." and Clear Filters.

An amount the user may not see is left out of a sentence or a summary, where nothing lines up with it. In a table it
reads $XX,XXX, so the column keeps its place.

## Works with

- See [Empty State](empty-state.md) for the parts, cases, and copy of the empty state itself.
- See [Filters](../patterns/filters.md) for Clear Filters when nothing matches.
- See [Copy](copy.md) for the fixed phrases for missing, empty, and hidden values.

## In code

- `EmptyState` from `aperia-ds5` (`icon`, `title`, `description`, `action`, `className` to place it: a page's own
  `flex-1` surface, nothing inside a card, `p-4` in a picker) and `NoResults` (`onClear` adds the line and Clear
  Filters).
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
