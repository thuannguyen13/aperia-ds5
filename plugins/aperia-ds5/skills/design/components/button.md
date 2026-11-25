# Button

A button lets people start an action on the current page, such as saving a form or opening a sheet. See [Buttons and
Actions](../patterns/buttons-and-actions.md) for where buttons go.

## Anatomy

A button has three parts, and its icon shows only sometimes. The parts are those of an Add Task button with an icon.

1. **Container**. It is the button's filled shape. It carries the type's fill, edge, and corners, and it is what people
   press.
2. **Label**. It is the text that names the action, such as "Add Task". An icon button has no label, and its tooltip
   names the action instead. See [Copy](../foundations/copy.md) for how to word it.
3. **Icon** (optional). It is a small symbol before the label, such as a plus, that hints at the action.

## When to use

Use a button for an action on the current page, such as Save, Add Contact, or Delete Note. To go to another page, use a
Link button or a link, or let a row open its record. To show a state such as Active or Overdue, use a badge (Button 2).

## What is available

A button comes in six types and four sizes. An icon button is a button with an icon and no text. See [Buttons and
Actions](../patterns/buttons-and-actions.md) for the questions that choose a type, and for what an area is.

### Primary

Use a Primary button for the one action that its area exists for, such as Save in a sheet.

### Outline

Use an Outline button for the other actions beside the Primary button, such as Cancel, Edit, or Export. Use it also where
no action is the main one, such as Add in a card header.

### Ghost

Use a Ghost button for an action that repeats or sits inside another component. Examples are an icon button on a row or
in a toolbar, and the close (×) of a dialog or sheet.

### Destructive

Use a Destructive button for an action that deletes or removes something, such as Delete, Remove, or Revoke.

### Link

Use a Link button for an action that reads as a destination, such as View All.

### Secondary

Use a Secondary button only for a filter chip. A filter chip is a small, round button that shows an active filter and
clears it when tapped.

### Sizes

A button has four sizes:

| Size | Height | Use |
|---|---|---|
| Default | `h-8` | Every action on a page, sheet, dialog, or card |
| Small | `h-7` | Inside a compact component, such as a filter chip |
| Extra small | `h-6` | Inside a compact component, when the component sets it |
| Large | `h-9` | No Aperia use yet. Use Default. |

### Icon button

An icon button shows an icon with no text. Use it for an action that repeats on many rows or has a well-known icon, such
as edit, delete, close, or more. An icon button is square and takes the height of the controls beside it. It is `size-8`
in a toolbar beside a field, and `size-7` on a row or in a card header.

### Specs

These specs hold for every type.

| | Default | Small | Extra small | Large |
|---|---|---|---|---|
| Corners | Large corner | Medium corner | Medium corner | Large corner |
| Text | `text-sm`, medium weight | `text-xs`, medium weight | `text-xs`, medium weight | `text-sm`, medium weight |
| Side padding | `px-2.5` | `px-2.5` | `px-2` | `px-2.5` |
| Side padding next to an icon | `px-2` on the icon's side | `px-1.5` on the icon's side | `px-1.5` on the icon's side | `px-2` on the icon's side |
| Icon | `size-4`, `gap-1.5` from the text | `size-3.5`, `gap-1` from the text | `size-3`, `gap-1` from the text | `size-4`, `gap-1.5` from the text |

A Small or Extra small button inside a button group takes the Large corner. Each type has its own colors, and the Disabled row applies to any type.

| Type | Fill | Text | Edge |
|---|---|---|---|
| Primary | Primary | Primary foreground | None |
| Outline | Control | Foreground | A border in the Input color and the Small shadow |
| Ghost | None. On hover, the ghost hover tint. | Foreground | None |
| Destructive | Destructive at 10% (20% in dark mode) | Destructive | None |
| Link | None | The Link color | None |
| Secondary | Secondary | Secondary foreground | None |
| Disabled | Any type at 50% opacity | | |

## How it looks and behaves

A person reaches a button, presses it, and the action runs. A keyboard user reaches a button with **Tab** and presses
it with **Enter** or **Space**. The focus line always shows for keyboard users and is never removed.

A screen reader reads an icon button's tooltip label as its name.

A button disabled for a reason stays reachable. Its tooltip says why it is disabled, so keyboard and screen reader
users get the reason too. See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for when a button
is disabled and the words of each reason.

A button is `h-8` tall on every screen. An icon button keeps the height of the controls beside it on every screen.

An alert dialog asks before an action that cannot be undone. Its action button is Destructive when the action removes
something or cannot be taken back, and Primary otherwise. See [Confirmations and
Delete](../patterns/confirmations-and-delete.md) for that choice.

The corners, edges, and shadows that the Specs name are on [Border and Radius](../styles/border-and-radius.md) and
[Elevation](../styles/elevation.md).

### States

A button has five states. Each type shows them in its own colors.

| State | Look |
|---|---|
| Default | The type's own fill, text, and edge. |
| Hover | Outline fills with the muted color. Ghost fills with the ghost hover tint. Destructive fill rises to 20% (30% in dark mode). Secondary fill fades to 80%. Link text is underlined. Primary keeps its fill. |
| Focus, from the keyboard | The focus edge, a line inside the button and a halo around it. |
| Pressed | The button moves down by one pixel. A button that opens a menu or a panel does not move. |
| Disabled | The button shows at 50% opacity and takes no pointer input. |

## Rules

### 1. Give every icon button a tooltip

An icon button has no text, so its tooltip is what names the action for people who cannot tell what the icon means. The
tooltip is also the button's name for a screen reader.

- **Do:** Give an icon button a tooltip that names the action, such as "Edit Task".
- **Don't:** Rely on an `aria-label` alone. It names the button for a screen reader, and sighted people get no name.

### 2. Show a state as a badge, not a button

A badge cannot be mistaken for an action, and a button can. A state drawn as a button gets clicked by people who expect
something to happen.

- **Do:** Show Active and Overdue as badges.
- **Don't:** Use a small Primary button as a status pill.

## In code

- `Button` from `aperia-ds5`: `variant` is `default` (Primary), `outline`, `ghost`, `destructive`, `link` or
  `secondary`; `size` is `default`, `sm`, `xs`, `lg`, or `icon`, `icon-sm`, `icon-xs`, `icon-lg` for icon buttons. An
  icon button is `icon` (32px) in a toolbar beside a field and `icon-sm` (28px) on a row or in a card header.
- Build an icon button in the app from `Button`, `Tooltip`, `TooltipTrigger`, and `TooltipContent` from
  `aperia-ds5`. Its label is both the tooltip and the accessible name. While it is disabled with a reason, the tooltip
  shows the reason instead.

```tsx
const why = disabled ? reason : null

<Tooltip>
  <TooltipTrigger asChild>
    <Button
      variant="ghost"
      size="icon-sm"
      type="button"
      aria-label="Edit Contact"
      disabled={disabled && !why}
      aria-disabled={why ? true : undefined}
      onClick={why ? (event) => event.preventDefault() : onEdit}
      className="aria-disabled:opacity-50 aria-disabled:hover:bg-transparent aria-disabled:active:translate-y-0 dark:aria-disabled:hover:bg-transparent"
    >
      <PencilIcon />
    </Button>
  </TooltipTrigger>
  <TooltipContent>{why || "Edit Contact"}</TooltipContent>
</Tooltip>
```

- A button disabled with a reason uses `aria-disabled`, not `disabled`, so keyboard and pointer users still reach the
  tooltip. Its click does nothing. A button disabled without a reason uses `disabled`.
- The button stays the same element when it becomes disabled, so focus stays on it.
- It is `type="button"`, so a button inside a form never submits the form.
- A record's header actions use `RecordActions` from `aperia-ds5`.
