# Switches in a Grid

Switches in a grid let people set many on or off choices in one table, with a row for each thing and a column for each
option.

## Anatomy

A grid of switches has five parts. The parts are those of notification settings, with one row for each event and one
column for each channel. The locked switch shows only when a choice cannot change.

1. **Grid**. It is a table on a surface that holds every switch, with one row for each thing and one column for each
   option.
2. **Column heading**. It is a title above one column that names the option, such as "Email".
3. **Row label**. It is the text at the start of a row that names the thing the row sets, such as "Deal changed stage".
4. **Switch**. It is an on or off control with "Yes" or "No" beside it. The switch and its word are one target.
5. **Locked switch** (optional). It is a switch that cannot change. It is faded, with a lock icon after its word.

## When to use

Use switches in a grid for choices that fall into rows and columns. Pick the control by the shape of the choices:

| Situation | Use |
|---|---|
| Many on or off choices, one row for each thing and one column for each option, such as In App, Email, and Teams | Switches in a grid |
| One on or off choice on a form | A switch or a checkbox with its label |
| A cell with more than two levels, such as None, Owned, and All | A list picker in the cell. See [Pickers](pickers.md). |

## How it looks and behaves

A switch and its word act as one control:

1. The switch and its word are one target. The whole target highlights on hover, as a short list picker does when a
   grid holds one.
2. Selecting anywhere on the target, or pressing Space, flips the switch.
3. A screen reader reads the full name of the switch. The name is the row followed by the column, such as "Pipeline:
   Opportunity assignment, Email".
4. A locked switch can still be reached by the keyboard, so its reason is heard too.

A grid of switches has no Save button. See [Saving and Feedback](../foundations/saving-and-feedback.md) for how a
switch saves as it is flipped, and [Errors and Validation](../foundations/errors-and-validation.md) for where a refused
save shows.

A switch that is on fills with the primary color, the one "on" color in every grid and every app. See
[Color](../styles/color.md) for what the primary color marks.

On a phone, every switch keeps its size. A grid wider than its card scrolls sideways inside the card. See
[Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.

### States

A switch in a grid has three states:

| State | Look | Reason |
|---|---|---|
| On or off | A small switch with "Yes" or "No" beside it. "No" shows in muted text. | None |
| Locked | Disabled, with a lock icon after its word | Shown in a tooltip on hover, focus, and a tap, such as "You cannot remove your own role's access to Roles." See [Disabled With a Reason](../foundations/disabled-with-a-reason.md). |
| Waiting | Disabled, while the saved values load | None |

## Rules

### 1. Show the word, not only the color

Every switch in a grid has "Yes" or "No" beside it, so its state reads without relying on color.

- **Do:** Put "Yes" or "No" beside the switch.
- **Don't:** Show a bare switch or a colored dot with no word.

### 2. Keep the switch's own colors

A switch is on in the primary color and off in the neutral color, in every grid and every app. On and off are not states
of a record, so a status color would say something the switch does not mean.

- **Do:** Leave the switch's colors as they are.
- **Don't:** Color a switch green when it is on and red when it is off, or pass an app color in its `className`.

## In code

Build the flag switch in the app from `Switch` and `ReasonTooltip` from `aperia-ds5`, with `LockIcon` from
`lucide-react`. The switch and its Yes or No form one `label`, which is one target.

```tsx
const locked = disabled || Boolean(reason)

<label
  htmlFor={id}
  className={cn(
    "flex h-7 w-fit items-center gap-1.5 rounded-md px-1.5 text-sm",
    locked ? "opacity-50" : "cursor-pointer hover:bg-muted/50 in-[tr]:hover:bg-foreground/6"
  )}
>
  <Switch
    id={id}
    size="sm"
    checked={on}
    aria-label={reason ? `${label}. ${reason}` : label}
    disabled={locked}
    onCheckedChange={onChange}
    className="data-disabled:opacity-100"
  />
  <span className={cn(!on && "text-muted-foreground")}>{on ? "Yes" : "No"}</span>
  {reason && <LockIcon className="size-3.5 text-muted-foreground" aria-hidden />}
</label>
```

- Wrap the label in `<span className="-mx-1.5 flex h-8 w-fit items-center">`, so the switch lines up with its column's
  name and only the hover reaches past it.
- Inside that span, wrap the label in `<ReasonTooltip reason={reason}>`. It shows the reason on hover, on focus, and
  on a tap. A disabled switch takes no pointer or focus, so `ReasonTooltip` takes them. With no reason it renders the
  label as it is.
- The switch's `aria-label` is the full name a screen reader reads, such as "Sales Rep: Prospects, Delete", plus the
  reason while it is locked.
- Lock it with `disabled` while it saves or loads. The label fades the whole target, so the switch keeps
  `data-disabled:opacity-100` and does not fade twice.
- The switch keeps its own colors. Never pass a status color or an app's own color in its `className`.
