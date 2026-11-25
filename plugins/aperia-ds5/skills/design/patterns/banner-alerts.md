# Banner Alerts

A banner alert tells people about a state of the whole page, such as a closed record or an outage, until that state
ends.

## Anatomy

A banner alert has four parts, listed from start to end. The description and the action show only sometimes. A banner
alert with all four sits under the page header, above the page's content.

1. **Icon**. It is a small picture at the start of the banner alert. It shows the type at a glance.
2. **Title**. It is a line of text, in Title Case, that names the situation in a few words, such as "Closed Opportunity"
   or "Service Outage".
3. **Description** (optional). It is one or two sentences of text under the title. It says what happened and what people
   can do.
4. **Action** (optional). It is one button at the end of the banner alert, such as Try Again, or a close button (×).

## When to use

Use a banner alert when a message is about the whole page and people need to read it while they work on the page. A
message about one action or one place goes where that action or place is, so a banner alert always means the whole page.
Find the message in this table:

| Message | Use |
|---|---|
| A state holds for the whole page, such as a closed record, figures that are out of date, or a service that is down | A banner alert. |
| The result of an action that needs nothing more, such as "Note added." | A toast. See [Saving and Feedback](../foundations/saving-and-feedback.md). |
| One field holds a wrong value | A message under the field. See [Errors and Validation](../foundations/errors-and-validation.md). |
| A control that saves on change is refused, such as a switch in a grid | An alert above the grid that names the row. It is an alert in one section, not a banner alert. See [Errors and Validation](../foundations/errors-and-validation.md). |
| A role may read a record but never change it | Nothing. The record shows without Edit or Delete. See [Disabled With a Reason](../foundations/disabled-with-a-reason.md). |

## What is available

A banner alert comes in three types, one for each weight of message. Apps set their own warning colors, so the library
ships no warning look. See [Status](status.md) for the color pairs an app sets.

| Type | Look | Use for |
|---|---|---|
| Information | The card fill, the body text, and an info icon | A state that limits what people can do, such as a closed or locked record: "Closed opportunities cannot be changed." |
| Warning | A color pair the app sets for warnings, and a warning icon | A risk to what the page shows, such as figures that are out of date: "Volume figures are from 11/22/2026. Today's figures arrive after 6:00 AM." |
| Error | The destructive text, and an error icon | An outage or a failure that stops work on the page: "The file service is not responding. Try again in a few minutes." |

## How it looks and behaves

A banner alert is a section of its own, under the page header and above the page's content, `gap-5` from each. On a list
page, it sits between the page header and the list toolbar. A banner alert runs the full width of the page column.

A banner alert about something people only need to read once can have a close button named "Close". Once closed, it
stays closed until its message changes. A banner alert about a state that lasts has none (Banner Alerts 3).

A banner alert that shows when the page opens is read by a screen reader with the page. One that appears while people
work, such as an outage, is announced at once.

## Rules

### 1. Show one banner alert, under the page header

A page shows one banner alert, under the page header and above the content, so people read it before they start
working. When two apply, show the one that stops the most work. An error comes before a warning, and a warning comes
before information.

- **Do:** Show only the outage when a record is closed and the file service is down.
- **Don't:** Stack two banner alerts, or put one in the top bar, above the page header, or inside a card.

### 2. Match the type to how much it stops

Use information for a limit on changes and a warning for a risk to what the page shows. Use an error only for something
that is broken, so people can trust the error color.

- **Do:** Show a closed opportunity as information.
- **Don't:** Show a closed opportunity in the error type.

### 3. Keep a lasting state's banner alert open

A banner alert about a state that lasts, such as a closed record, has no close button. It goes away when the state ends,
so people always see why the page behaves as it does.

- **Don't:** Add a close button to the banner alert of a closed record. The record still cannot be changed, and people
  who closed it forget why.

## In code

- `Alert`, `AlertTitle`, `AlertDescription`, and `AlertAction` from `aperia-ds5`, as a direct child of `AppContent`
  between `PageHeader` and the content. Put a Lucide icon first inside `Alert`.

```tsx
<Alert role="status">
  <InfoIcon />
  <AlertTitle>Closed Opportunity</AlertTitle>
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
