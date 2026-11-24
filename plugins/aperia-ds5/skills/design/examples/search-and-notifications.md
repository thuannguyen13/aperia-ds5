# Search and Notifications

Search and notifications are two panels that open from the sidebar to find records and review recent changes.

## When to use

Each panel serves its own condition:

| Panel | Use when |
|---|---|
| Search | People jump to a record from anywhere without opening its list first, such as a prospect, a contact, or an opportunity. |
| Notifications | People see what others did to their records and open the record it happened to. |

## How it looks and behaves

### Search

Search opens in a panel over the page. Selecting Search at the top of the sidebar opens it, and so does pressing ⌘K.

The field says what it searches, such as "Search prospects, contacts and opportunities".

Results come in groups, one per kind of record, such as Prospects, Contacts, and Opportunities. The groups come in an
order the app fixes, so each kind of record is always in the same place. A kind with no matches does not show.

Each result has the record's picture, its name with the matched part in bold, and a muted line of detail under it.

While someone types, the panel behaves in three ways:

- The search runs once typing pauses for a moment.
- The last results stay, faded, while new ones load.
- "No Results", with a search icon, shows only once typing has paused.

A line of key hints sits at the foot of the panel. The hints are ↑ ↓ Move, ↵ Open, ⌘↵ Open in New Tab, and Esc Close. A
phone hides the hints.

Opening a result closes the panel. On a phone, it closes the sidebar too. Closing the panel clears what was typed.

### Notifications

Notifications open in a panel beside the sidebar. Selecting Notifications in the sidebar opens the panel. The sidebar
entry shows how many notifications are unread. The panel is up to 24rem wide and never wider than the screen. Opening it
with a click draws no focus ring on its first tab.

The panel's header is one 48px row. It contains three parts, from left to right:

| Part | Content |
|---|---|
| Tabs | Unread first, with its count, then All. |
| Mark All as Read | A button, grayed out when nothing is unread. |
| Settings | A settings button named "Notification Settings". |

Each notification is one row that opens its record. A row contains four parts:

| Part | Content |
|---|---|
| Picture | A picture of who did it, or a bell when the app did it. |
| Sentence | Muted text, with the person's name and the record's name in the foreground color and a heavier weight. |
| Time | How long ago, under the sentence. |
| Unread dot | A dot while the notification is unread. A screen reader reads it as "Unread". |

Opening a notification marks it read at once, closes the panel, and goes to the record.

An empty tab shows an empty state with a bell, such as "No Unread Notifications" or "No Notifications".

New notifications also pop up at the corner of the screen, with the same sentence and picture. Selecting one opens the
record. At most three show. Past three, one more pop-up says how many others came, such as "4 more new notifications."

## Before and after

- **Before:** Search is a page of its own, with a results table and no pictures. Notifications are a plain list, with
  every name in the same weight and "No data" when empty.
- **After:** Search opens over the page, grouped by kind, with pictures and the match in bold. Notifications have Unread
  and All tabs, pictures, and names in a heavier weight. An empty tab reads "No Unread Notifications".

## Rules

Each panel's rules live on its pattern page, listed under Which patterns it uses.

## When you can do it differently

Search and notifications have no exceptions.

## Which patterns it uses

- See [Search](../patterns/search.md) for the search panel, its results, and its keys.
- See [Notifications](../patterns/notifications.md) for the panel, its rows, and its pop-ups.
- See [App Shell](../patterns/app-shell.md) for the sidebar entries both panels open from.
- See [Switches in a Grid](../patterns/switches-in-a-grid.md) for Notification Settings, which the settings button
  opens.

## In code

The app builds both, once, from aperia-ds5 parts:

- **Search:** `AppSidebarSearch` in `AppSidebar`'s `search` opens it on a click and on ⌘K. Build the panel from
  `CommandDialog` and `Command` with `shouldFilter={false}`, since the server already matched. One `CommandGroup` per
  kind, in a fixed order, only for kinds with matches; each `CommandItem` holds the app's `Avatar` adapter, the name
  with the match (`matchRange`) in `font-semibold`, and a muted detail line. Search after a short pause, keep the last
  results faded while new ones load, and show `NoResults` only once typing has paused. The footer's hints are `Kbd`s,
  hidden on a phone. Opening a result closes the dialog (and the sidebar on a phone, `setOpenMobile(false)`); closing
  clears the query.
- **Notifications:** `AppSidebarNotifications` (with `unread`) is the trigger of a `Popover`
  (`side="right"`, `align="start"`, `w-[min(24rem,calc(100vw-1rem))]`). The content takes focus itself
  (`tabIndex={-1}`, focused in `onOpenAutoFocus`). The header is a 48px row: `Tabs` with `TabsList variant="line"`, a
  ghost Mark All as Read, and an icon button "Notification Settings" (the recipe from
  [Button](../components/button.md)). Each notification is an `Item size="sm"` as a link,
  with an `Avatar` (a `BellIcon` for the system), the sentence, `RelativeTime`, and an unread dot with
  `aria-label="Unread"`. Empty tabs use `EmptyState` with `BellIcon`. New ones are also toasts with the same sentence
  and avatar: three at most, then one "N more new notifications." toast.
