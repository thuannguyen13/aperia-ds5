# Notifications

Notifications tell people about changes to their records through a panel in the sidebar and through toasts.

## When to use

Use notifications in every app that tells people about changes to their records. They sit behind the Notifications
entry in the sidebar.

## What is available

Notifications have five parts:

| Part | Content |
|---|---|
| Sidebar entry | Notifications, with the unread count in a destructive badge. Past 99, the count reads "99+". On the collapsed rail, the count sits on the corner of the bell. |
| Panel header | One row with two tabs, Mark All as Read, and a settings button named "Notification Settings". The Unread tab comes first with its count, then All. |
| Notification | The picture of who did it, or a bell for a notice from the app. The sentence in muted text, with the person and the record's name in the foreground color at medium weight. The time under the sentence, such as "3d ago". A dot while it is unread. |
| Empty tab | A bell and "No Unread Notifications" or "No Notifications". |
| Toast | The same sentence and picture as the notification, for each new notification. |

## How it looks and behaves

The panel opens from the sidebar, and each notification leads to its record:

1. The panel opens beside the sidebar. It is up to 384px wide and never wider than the screen. Its header row is 48px
   high.
2. The panel takes focus as it opens, so the first tab shows no focus ring after a click.
3. Mark All as Read is disabled while nothing is unread.
4. Opening a notification marks it read at once. It also closes the panel and opens its record.
5. A new notification also shows as a toast that links to its record. It joins the one stack of toasts at the top
   right, with save confirmations and errors. Three toasts show at most. Past three, one toast says how many more
   arrived, such as "4 more new notifications."
6. Notification Settings opens from the settings button in the panel and from the account menu. See
   [Switches in a Grid](switches-in-a-grid.md) for the settings grid.

On a phone, Notifications sits in the sidebar's panel, which the button at the start of the top bar opens. The
stack of toasts runs across the top of the screen, 16px from each side. See [Screen Sizes](../foundations/screen-sizes.md)
for every part on a phone.

## Rules

### Open the record from the whole notification

- **Do:** Let a click anywhere on a notification mark it read and open the record, so one click gets people there.
- **Don't:** Show only text, with a separate link or button to reach the record. Make the whole notification open it,
  so it is easy to hit.

### Mark unread with more than color

- **Do:** Mark unread with a dot that screen readers hear as "Unread" and an Unread tab with its count, so everyone sees
  what is new.
- **Don't:** Show unread only by a tinted background. Add the dot, so it reads without color.

### Keep toasts to three

- **Do:** Show three toasts at most in the one stack, then one "4 more new notifications.", so the page stays usable.
- **Don't:** Give notifications a stack of their own, or let toasts cover the page when many arrive. Keep one stack of
  three, so people can keep working.

## When you can do it differently

This pattern has no exceptions.

## Works with

Notifications work with four other pages:

- See [App Shell](app-shell.md) for the sidebar entry that opens the panel.
- See [Switches in a Grid](switches-in-a-grid.md) for Notification Settings.
- See [Empty States](../foundations/empty-states.md) for the empty tabs.
- See [Message Templates](../foundations/copy-templates.md) for when a message is a toast.

## In code

- `AppSidebarNotifications` (`icon`, `unread`, `label`) in `AppSidebar`'s `notifications`, wrapped by the app's
  `PopoverTrigger asChild`; `notificationsAfter` places it after a page.
- The panel is a `Popover` (`side="right"`, `align="start"`), up to `w-96` (24rem) and never wider than the screen,
  that focuses itself on open. Header: `Tabs` `variant="line"`, a ghost Mark All as Read, and an icon button
  "Notification Settings" (the icon button recipe on [Button](../components/button.md)).
- Each notification is an `Item` (`size="sm"`) linking to its record: `Avatar`, the sentence in `text-muted-foreground`
  with names `text-foreground font-medium`, `RelativeTime` under it, and the unread dot with an sr-only "Unread".
- Empty tabs are `EmptyState` with a bell icon.
- A new notification calls `toast()` from sonner, through the app's one `Toaster` (`position="top-right"`), which
  shows three at most (`visibleToasts`, 3 by default). Past three, the app replaces the waiting ones with one toast,
  "4 more new notifications.".
