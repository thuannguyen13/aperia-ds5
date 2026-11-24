# Switches in a Grid

Switches in a grid show on or off choices inside a table, each labeled Yes or No.

## When to use

Use switches in a grid for many on or off choices laid out with one row per thing and one column per option, such as
In App, Email, and Teams.

For a single choice on a form, use a switch or a checkbox with its label instead.

## What is available

A switch in a grid has three states:

| State | Look | Reason |
|---|---|---|
| On or off | A small switch with "Yes" or "No" beside it. "No" shows in muted text. | None |
| Locked | Disabled, with a lock icon | Shown on hover and focus, such as "You cannot remove your own role's access to Roles." |
| Waiting | Disabled, while the saved values load | None |

## How it looks and behaves

A switch and its word act as one control:

1. The switch and its word are one target. The whole target highlights on hover, as a short list picker does when a
   grid holds one.
2. Selecting anywhere on the target, or pressing Space, flips the switch.
3. A screen reader reads the full name of the switch. The name is the row followed by the column, such as "Pipeline:
   Opportunity assignment, Email".
4. A locked switch can still be reached by the keyboard, so its reason is heard too.
5. A settings sheet of switches saves each switch as it is flipped and has no Save button.
6. A refused save flips the switch back. The reason shows in place, above the table, with no toast.

## Rules

### Show the word, not only the color

- **Do:** Put Yes or No beside a switch, so its state reads without color.
- **Don't:** Show a bare switch whose state is only its color, or a colored dot. Add the word, so everyone can read it.

### Lock with a reason

- **Do:** Show a locked switch disabled, with a lock that says why on hover, so people know it cannot change.
- **Don't:** Hide the switch, or let it flip back without saying why. Show it locked with a reason, so nothing seems
  broken.

## When you can do it differently

A cell whose choice has more than two levels, such as None, Owned, and All, uses a short list picker instead.

## Works with

Switches in a grid work with three other patterns:

- See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for the lock and its tooltip.
- See [Pickers](pickers.md) for a cell with more than on and off.
- See [Forms in Sheets](forms-in-sheets.md) for the sheet that a settings grid opens in.

## In code

Build the flag switch in the app from `Switch`, `Tooltip`, `TooltipTrigger`, and `TooltipContent` from `aperia-ds5`,
with `LockIcon` from `lucide-react`. The switch and its Yes or No form one `label`, which is one target.

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

- Wrap the label in `<span className="-mx-1.5 flex h-8 items-center">`, so the switch lines up with its column's name
  and only the hover reaches past it.
- With a reason, wrap it in a `Tooltip` instead. The trigger is `<span tabIndex={0} className="-mx-1.5 flex h-8 w-fit
  items-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50">`, and the tooltip shows the
  reason. A disabled switch takes no pointer or focus, so the span takes them.
- The switch's `aria-label` is the full name a screen reader reads, such as "Sales Rep: Prospects, Delete", plus the
  reason while it is locked.
- Lock it with `disabled` while it saves or loads. The label fades the whole target, so the switch keeps
  `data-disabled:opacity-100` and does not fade twice.
- An app's own "on" color goes in the switch's `className`.
