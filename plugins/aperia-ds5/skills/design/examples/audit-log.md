# Audit Log

An audit log is a read-only list of changes that shows who changed what and when.

## When to use

Use an audit log when admins need to check who changed a record, what changed, and when.

## How it looks and behaves

An audit log has a toolbar and a table under it.

The toolbar contains a search, filters, and a count. The filters usually cover the record, the person, the action, and
the day, such as Record, Who, Action, and Day. The count shows how many entries match, such as "12 of 500 entries".

The table sits in a box with the card fill on the page. The newest entry comes first. The table has three columns:

| Column | Content |
|---|---|
| When | How long ago the change happened, in muted text ("3h ago"). Pointing at it shows the exact date and time. |
| Who | The person who made the change. |
| What | The action as a sentence in medium weight. Each change follows on its own line in small muted text ("Stage: Demo → Proposal"). When the entry holds more changes than it lists, the list ends with a count of the rest, such as "and 3 more". |

Selecting anywhere on a row opens the record the entry is about, while that record still exists.

The log is read-only. No entry can be edited or deleted.

When nothing is logged, the box says "No Entries". When the search and filters match nothing, the box says so and offers
Clear Filters.

## Before and after

- **Before:** Only the sentence is a link, the time is a full timestamp, and each row ends with Edit and Delete.
- **After:** The whole row opens the record. The time reads "3h ago", and pointing at it shows the exact time. No entry
  can be changed.

## Rules

### Keep the log read-only

- **Do:** Let rows only open their record (no buttons on them), so the log stays a true account of who changed what.
- **Don't:** Put Edit or Delete on an entry. Keep every entry read-only, so the log still proves who changed what.

## When you can do it differently

A row does not open when the record it is about no longer exists.

## Which patterns it uses

- See [List Toolbar](../patterns/list-toolbar.md) for the toolbar and the count.
- See [Filters](../patterns/filters.md) for the Record, Who, Action, and Day filters.
- See [Table](../components/table.md) for the whole row that opens its record.

## In code

The app builds it from aperia-ds5 parts:

- `ListToolbar` with `search`, `filters` (`form: "simple"`: Record, Who and Action as `enum` fields, Day as a `day`
  field, which shows From and To), `shown`, `total` and `noun={["entry", "entries"]}`.
- The `Table` in a `surface` box. When: `RelativeTime` in `text-muted-foreground`. What: the sentence in `font-medium`,
  then a list in `text-xs text-muted-foreground`.
- Rows whose record exists spread `opensOnClick(label, open)`.
- `EmptyState` titled "No Entries" when nothing is logged; `NoResults` with `onClear` when nothing matches.
