# Notifications

Notifications tell people about changes to their records, in a panel that opens from the sidebar and in a toast for each new one. See [Saving and Feedback](../foundations/saving-and-feedback.md) for toasts about saves and errors, and [Banner Alerts](banner-alerts.md) for banners.

## Anatomy

Notifications have nine parts, the sidebar entry, the panel it opens, and seven parts inside the panel. The panel has a header row over a list of notifications. The unread dot shows only on a notification that is unread.

1. **Notifications entry**. It is a button in the sidebar that opens the panel. It shows the unread count in a destructive badge.
2. **Panel**. It is a popover that opens beside the sidebar and holds the header row and the list of notifications.
3. **Tabs**. They are two tabs at the start of the header row. The Unread tab comes first with its count, then the All tab.
4. **Mark All as Read**. It is a button at the end of the header row that marks every notification read.
5. **Notification Settings**. It is an icon button at the end of the header row that opens the notification settings.
6. **Picture**. It is the avatar of the person who made the change, or a bell for a notice from the app.
7. **Sentence**. It is a line of text that says what changed. It is in muted text, with the person and the record's name in the foreground color at medium weight.
8. **Time**. It is a line of text under the sentence that says how long ago the change happened, such as "3d ago".
9. **Unread dot** (optional). It is a small destructive-color dot at the end of a notification that is unread.

## How it looks and behaves

The panel opens from the sidebar, and each notification leads to its record:

1. Past 99 unread, the count on the entry reads "99+". On the collapsed rail, the count sits on the corner of the bell.
2. The panel opens beside the sidebar. It is up to `max-w-popover-lg` wide and never wider than the screen. Its header row is `h-12` high.
3. The panel takes focus as it opens, so the first tab shows no focus ring after a click.
4. Mark All as Read is disabled while nothing is unread.
5. Opening a notification marks it read at once. It also closes the panel and opens its record.
6. A tab with no notifications shows a bell with "No Unread Notifications" on the Unread tab, or "No Notifications" on the All tab.
7. A new notification also shows as a toast, with the same picture and sentence, that links to its record. It joins the one stack of toasts that save confirmations and errors use. See [Saving and Feedback](../foundations/saving-and-feedback.md) for where the stack sits and how many toasts it shows.
8. Notification Settings opens from the settings button in the panel and from the account menu. See [Switches in a Grid](switches-in-a-grid.md) for the settings grid.

On a phone, Notifications sits in the sidebar's panel, which the button at the start of the top bar opens. A new notification's toast runs across the top of the screen. See [Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.

## Rules

### 1. Open the record from the whole notification

A notification is one link to its record, so people reach the record with one click anywhere on it.

- **Do:** Make the picture, the sentence, and the time part of the same link.
- **Don't:** Show only text with a separate link or button inside the notification to reach the record.

### 2. Mark unread with more than color

An unread notification shows a dot with the text "Unread" for screen readers, so people who do not see color still find what is new.

- **Don't:** Show unread only with a tinted background.

## In code

- `AppSidebarNotifications` (`icon`, `unread`, `label`) in `AppSidebar`'s `notifications`, wrapped by the app's
  `PopoverTrigger asChild`; `notificationsAfter` places it after a page.
- The panel is a `Popover` (`side="right"`, `align="start"`), up to `w-96` (24rem) and never wider than the screen,
  that focuses itself on open. Header: `Tabs` `variant="line"`, a ghost Mark All as Read, and an icon button
  "Notification Settings" (the icon button recipe on [Button](../components/button.md)).
- Each notification is an `Item` (`size="sm"`) linking to its record: `Avatar`, the sentence in `text-muted-foreground`
  with names `text-foreground font-medium`, `RelativeTime` under it, and the unread dot with an sr-only "Unread".
- Empty tabs are `EmptyState` with a bell icon.
- A new notification calls `toastNotification({ media, message, label, onOpen, onMore })` from `aperia-ds5`, which
  shows it in the app's one `Toaster` (top right, three at most). Past three, it shows one toast instead, such as
  "4 more new notifications.".
