# Global Search

Global search lets people find a record of any kind from one field that opens with ⌘K.

## Anatomy

Global search has four parts, all inside one dialog. The key hint is hidden on a phone.

1. **Search field**. It is a text field at the top of the dialog. A search icon sits at its start, and its placeholder
   names what it searches, such as "Search prospects, contacts, and opportunities".
2. **Kind heading**. It is a small muted title above each group of results, such as "Prospects", and names the kind of
   record the group holds.
3. **Result**. It is one row for one record. It holds the record's picture, its name with the matching part in bold,
   and a line of detail in muted text.
4. **Key hint** (optional). It is a line at the foot of the dialog. It reads ↑ ↓ Move, ↵ Open, ⌘↵ Open in New Tab, and
   Esc Close.

## When to use

Use global search to find a record of any kind, from any page. To narrow one list, use the search in that list's
toolbar instead. See [List Toolbar](list-toolbar.md) for the list search.

## How it looks and behaves

Global search opens as the search dialog over the dimmed page, up to `max-w-xl` wide. See
[Dialog](../components/dialog.md) for the four kinds of dialog and [Motion](../styles/motion.md) for how it opens and
closes.

A divider separates the key hint from the results.

Results are grouped by kind of record, in a fixed order that the app sets. Only kinds with matches show. A result
highlights like a menu item when the pointer or the arrow keys reach it.

The search runs after a short pause in typing. The list grows at once. It shrinks only after its height has held for
about 0.3 seconds.

When nothing matches, the dialog shows "No Results" with a search icon, once typing has paused for about 0.4 seconds. See
[Empty States](../foundations/empty-states.md) for the empty state.

Opening a result closes the dialog. On a phone, it also closes the sidebar. Closing the dialog clears what was typed.

On a phone, global search fills the screen and hides the key hint. See
[Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.

## Rules

### 1. Open global search from one place

Global search is one dialog that the Search entry in the sidebar and ⌘K both open, from any page, so people never leave
what they are doing. See [App Shell](app-shell.md) for the Search entry.

- **Don't:** Give global search a page of its own, or a second dialog for the same search.

### 2. Show each result with its picture

Each result shows the record's picture, its name with the match in bold, and a line of detail, so people tell similar
records apart.

- **Do:** Put the stage and owner in a prospect's detail line, such as "Proposal · Dana Whitfield".
- **Don't:** Show a plain list of names with no picture or detail.

### 3. Keep the results steady while typing

While new results load, the last results stay on screen at reduced opacity, so the list holds still while people type.

- **Don't:** Empty the list, or show "No Results", at every key.

## In code

- `AppSidebarSearch` (`onOpen`, `label`) in `AppSidebar`'s `search` opens the app's dialog on a click and on ⌘K
  (Ctrl K off a Mac).
- Build the dialog from `CommandDialog` (`className="sm:max-w-xl"`) and `Command` with `shouldFilter={false}`, since the server already matched:
  one `CommandGroup` per kind, each `CommandItem` with the app's `Avatar` adapter, the name with the match
  `font-semibold`, and a muted detail line. Use `NoResults` for nothing found. Do not filter the server's results again
  in the browser.
- Render new results in a React transition and memoize rows, so a frame never blocks; aim for 60fps.
