# Search

Search finds any record in the app from one field that opens from the sidebar or with ⌘K.

## When to use

Use search to find any record in the app, across every kind of record. Every app offers it behind the Search entry in
the sidebar.

To narrow one list, use that list's own toolbar search instead. See [List Toolbar](list-toolbar.md) for the toolbar search.

## What is available

Search has four parts, listed from top to bottom:

| Part | Content |
|---|---|
| Field | A placeholder that names what it searches, such as "Search prospects, contacts, and opportunities". A search icon sits at its start, and a clear button (×) mirrors it at its end. |
| Results | Results grouped by kind of record, in a fixed order that the app sets. Only kinds with matches show. Each result has the record's picture, its name with the matching part in bold, and a line of detail in muted text. |
| Key hint | A line at the foot that reads ↑ ↓ Move, ↵ Open, ⌘↵ Open in New Tab, Esc Close. |
| No results | "No Results", with a search icon, when nothing matches. |

## How it looks and behaves

Search opens as a dialog, updates as the user types, and closes when a result opens:

1. Search opens as a dialog over the dimmed page.
2. The field is flush with the panel. It has no fill, edge, or ring of its own.
3. A hairline separates the key hint from the results.
4. A result highlights like a menu item when the pointer or the arrow keys reach it.
5. The search runs after a short pause in typing.
6. While new results load, the last results stay, shown at reduced opacity.
7. The list grows at once. It shrinks only after its height has held for about 300ms.
8. "No Results" shows only once typing has paused for about 400ms.
9. Opening a result closes the panel. On a phone, it also closes the sidebar.
10. Closing the panel clears what was typed.
11. On a phone, the panel fills the screen, and the key hint is hidden.

## Rules

### Search from one place

- **Do:** Let Search in the sidebar and ⌘K open the same panel from any page, so search is always one step away.
- **Don't:** Give search a page of its own. Use the shared panel, so people never leave what they are doing.

### Show each result with its picture

- **Do:** Show each result's picture, its name with the match in bold, and a line of detail, under a heading for its
  kind, so people spot the right one.
- **Don't:** Show a plain list of names with no pictures. Add the picture and detail, so similar names are easy to tell
  apart.

### Keep the results steady while typing

- **Do:** Keep the last results, at reduced opacity, until new ones arrive, and show "No Results" only after typing
  pauses, so the list stays steady.
- **Don't:** Let the list empty, jump, or flash "No Results" at every key. Keep the old results until new ones arrive,
  so the list holds still while people type.

## When you can do it differently

This pattern has no exceptions.

## Works with

Search works with three other pages:

- See [App Shell](app-shell.md) for the Search entry in the sidebar that opens it.
- See [Empty and Missing](../foundations/empty-and-missing.md) for "No Results".
- See [Motion](../styles/motion.md) for how the panel opens and closes.

## In code

- `AppSidebarSearch` (`onOpen`, `label`) in `AppSidebar`'s `search` opens the app's dialog on a click and on ⌘K
  (Ctrl K off a Mac).
- Build the dialog from `CommandDialog` and `Command` with `shouldFilter={false}`, since the server already matched:
  one `CommandGroup` per kind, each `CommandItem` with the app's `Avatar` adapter, the name with the match
  `font-semibold`, and a muted detail line. Use `NoResults` for nothing found. Don't filter the server's results again
  in the browser.
- Render new results in a React transition and memoize rows, so a frame never blocks; aim for 60fps.
