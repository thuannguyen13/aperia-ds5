# Banner Alerts

A banner alert is an alert under the page header about something that affects the whole page, such as a read-only
record or an outage.

## When to use

Use a banner alert when something holds for the whole page while people are on it. Find the situation in this table:

| Situation | Example |
|---|---|
| The record is read-only for this user | "You do not have access to change opportunities." |
| The record is closed or locked, so it cannot be changed | "Closed opportunities cannot be changed." |
| A warning affects every figure or record on the page | "Volume figures are from 11/22/2026. Today's figures arrive after 6:00 AM." |
| A service the page needs is down | "The file service is not responding. Try again in a few minutes." |

Use something other than a banner when the message belongs to one action or one place. A result that needs nothing
more is a toast. A wrong value is a message beside its field. See [Message Templates](../foundations/copy-templates.md)
for choosing a toast, an alert, or a message on the field.

## What is available

A banner alert comes in three types, one for each weight of message:

| Type | Look | Use for |
|---|---|---|
| Information | The card fill, the body text, and an info icon | A read-only or closed record, and other states that limit what people can do |
| Warning | The app's amber status pair, and a warning icon | A risk to what the page shows, such as figures that are out of date |
| Error | The destructive text, and an error icon | An outage or a failure that stops work on the page |

## Anatomy

A banner alert has four parts, listed from start to end.

1. **Icon**. It shows the type at a glance, beside the title.
2. **Title**. It names the situation in a few words, in Title Case, such as "Read Only" or "Service Outage".
3. **Description** (optional). One or two sentences say what happened and what people can do.
4. **Action** (optional). One button at the end, such as Try Again or a close button (×).

## How it looks and behaves

A banner alert is a section of its own, under the page header and above the page's content, 20px from each. On a list
page, it sits between the page header and the list toolbar. A banner alert runs the full width of the page column.

A page shows one banner alert at a time. When two apply, the page shows the one that stops the most work, with an
error first, then a warning, then information.

A banner alert about a state that lasts, such as a closed record or an outage, has no close button. The banner goes
away when the state ends. A banner alert about something people only need to read once can have a close button named "Close".
Once closed, it stays closed until its message changes.

A banner alert that shows when the page opens is read by a screen reader with the page. One that appears while people
work, such as an outage, is announced at once.

## Rules

### Show one banner alert, under the page header

- **Do:** Put one banner alert under the page header and above the content, so people read it before they start
  working.
- **Don't:** Stack two banners, or put one in the top bar, above the page header, or inside a card. Show the most
  important one in its place, so the page keeps one message at its top.

### Keep a banner alert for the whole page

- **Do:** Use a banner alert for a state that holds for the whole page, such as a read-only record, so people know why
  the page behaves as it does.
- **Don't:** Use a banner alert for a saved change ("Note added.") or for one field's error. Use a toast or a message
  on the field, so a banner always means the whole page.

### Match the type to how much it stops

- **Do:** Use information for a read-only record, a warning for figures at risk, and an error for an outage, so the
  color says how much the message stops.
- **Don't:** Show a read-only notice in the destructive color, or an outage in the card fill. Match the type, so red
  always means that something is broken.

### Keep a lasting state's banner alert open

- **Do:** Leave out the close button while the state lasts, such as on a closed record, so people always see why they
  cannot change it.
- **Don't:** Let people close the banner on a record they still cannot change. Keep it on screen, so no one forgets the
  record is read-only.

## When you can do it differently

An alert can also sit inside a section of the page, above the part it is about. A switch in a grid that could not be
saved is one such case. That alert is not a banner. See
[Message Templates](../foundations/copy-templates.md) for where an error shows.

## Works with

- See [Page Header](page-header.md) for the header above the banner alert.
- See [Message Templates](../foundations/copy-templates.md) for the wording and for choosing a toast, an alert, or a
  message on the field.
- See [Status](status.md) for the status pairs that color a warning.
- See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for a single control that cannot be used.

## In code

- `Alert`, `AlertTitle`, `AlertDescription`, and `AlertAction` from `aperia-ds5`, as a direct child of `AppContent`
  between `PageHeader` and the content. Put a Lucide icon first inside `Alert`.

```tsx
<Alert role="status">
  <InfoIcon />
  <AlertTitle>Read Only</AlertTitle>
  <AlertDescription>Closed opportunities cannot be changed.</AlertDescription>
</Alert>
```

- Information is `<Alert>` with `InfoIcon`. An error is `<Alert variant="destructive">` with `CircleAlertIcon`. A
  warning takes the app's amber status pair through `className`, with `TriangleAlertIcon`:
  `<Alert className="bg-status-amber text-status-amber-foreground *:data-[slot=alert-description]:text-status-amber-foreground">`.
- `Alert` has `role="alert"`, which a screen reader announces at once. Pass `role="status"` for a banner alert that
  shows when the page opens. Keep `role="alert"` for one that appears while people work.
- A close button goes in `AlertAction`, as the icon button recipe on [Button](../components/button.md) with the
  tooltip "Close".
