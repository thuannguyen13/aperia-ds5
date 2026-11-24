# Button

A button starts an action, such as saving a form or opening a sheet. See [Buttons and
Actions](../patterns/buttons-and-actions.md) for where buttons go.

## When to use

Use a button for an action on the current page, such as Save, Add Contact, or Delete Note.

Use something else in two cases:

| Need | Use instead |
|---|---|
| Go to another page | A Link button or a link, such as View All, or a row that opens its record |
| Show a state, such as Active or Overdue | A badge |

## What is available

A button comes in six types and four sizes. An icon button is a button with an icon and no text.

### Primary

A Primary button has a solid Primary fill. It is the main action of a page, a sheet, or a dialog, the one the user came
to do. A page, a sheet, or a dialog has one Primary button at most. A page's Primary button sits at the end of the page
header, after its Outline buttons. A sheet or a dialog puts it at the end of the footer, after Cancel.

### Outline

An Outline button has the control fill and the Input hairline edge. Use it for every other action beside the Primary
button, such as Cancel, Edit, or Export, and the other actions in a page header. Use it also where no action is the
main one, such as Add in a card header.

### Ghost

A Ghost button has no fill until the pointer is over it. Use it for an action that repeats or sits inside another
component. Examples are an icon button on a row or in a toolbar, and the close (×) of a dialog or sheet.

### Destructive

A Destructive button has Destructive text on a Destructive fill at 10%. Use it for an action that deletes or removes
something, such as Delete, Remove, or Revoke.

### Link

A Link button has Primary text, underlined when the pointer is over it. Use it for an action that reads as a
destination, such as View All.

### Secondary

A Secondary button has the Secondary fill. Use it for a filter chip on a phone. A filter chip is a small, round button
that shows an active filter and clears it when tapped.

### Sizes

A button has four sizes:

| Size | Height | Use |
|---|---|---|
| Default | 32px | Every action on a page, sheet, dialog, or card |
| Small | 28px | Inside a compact component, such as a filter chip |
| Extra small | 24px | Inside a compact component, when the component sets it |
| Large | 36px | No Aperia use yet. Use Default. |

### Icon button

An icon button shows an icon with no text. Use it for an action that repeats on many rows or has a well-known icon, such
as edit, delete, close, or more. An icon button is square and 28px. It always has a tooltip that names the
action.

### Specs

| | Default | Small |
|---|---|---|
| Height | 32px | 28px |
| Corners | Large corner | Medium corner |
| Text | 14px, medium weight | 13px, medium weight |
| Side padding | 10px | 10px |
| Icon | 16px, 6px from the text | 14px, 4px from the text |

| Type | Fill | Text | Edge |
|---|---|---|---|
| Primary | Primary | Primary foreground | None |
| Outline | Control | Foreground | Input hairline edge and the Small shadow |
| Ghost | None. On hover, the ghost hover tint. | Foreground | None |
| Destructive | Destructive at 10% (20% in dark mode) | Destructive | None |
| Disabled | Any type at 50% opacity | | |

## Anatomy

A button needs its container and its label. Its icon is optional. An icon button has the icon alone, with a tooltip
that names the action.

1. Container
2. Label
3. Icon (optional)

## How it looks and behaves

A person reaches a button, presses it, and the action runs. A keyboard user reaches a button with **Tab** and presses
it with **Enter** or **Space**. The focus line always shows for keyboard users and is never removed.

A screen reader reads an icon button's tooltip label as its name.

A button disabled for a reason stays reachable. Its tooltip says why it is disabled, so keyboard and screen reader
users get the reason too.

A button is 32px tall, and an icon button is 28px, on every screen.

On a phone, a dialog's buttons stack, with the action on top.

### States

A button has five states. Each type shows them in its own colors.

| State | Look |
|---|---|
| Default | The type's own fill, text, and edge. |
| Hover | Outline fills with the muted color. Ghost fills with the ghost hover tint. Destructive fill rises to 20% (30% in dark mode). Secondary fill fades to 80%. Link text is underlined. Primary keeps its fill. |
| Focus, from the keyboard | The focus edge, a line inside the button and a halo around it. |
| Pressed | The button moves down by one pixel. |
| Disabled | The button shows at 50% opacity. |

## Rules

### Give every icon button a tooltip

- **Do:** Give an icon button a tooltip naming the action (Edit Task), so people can check before they click.
- **Don't:** Show an icon alone, which some users cannot read. Add a tooltip that names the action, so everyone knows
  what it does.

### Show a state as a badge, not a button

- **Do:** Show a state as a badge in the state's color (Active, Overdue), so no one mistakes it for an action.
- **Don't:** Use a small Primary button as a status pill. Show every state as a badge, so no one clicks it expecting an
  action.

## When you can do it differently

- While a card is empty, its Add button moves from the card header to the middle of the empty state.
- On screens narrower than 1024px, a page header's actions fold into a More actions (…) menu. See [Page
  Header](../patterns/page-header.md) for that menu.

## Works with

| Component | How it works with a button |
|---|---|
| Dialog | Cancel, then the action, sit at the bottom right. The action repeats the dialog's verb, such as "Delete Project", not OK. |
| Sheet | A fixed footer holds Cancel and Save. A record's Delete sits at the start of the footer, away from Save. |
| Page header | The page's actions sit on the title's line. A record's actions are Edit, then the record's other actions, then Delete in the Destructive type. |
| Card | Add sits in the card header. |
| Table | A row has no Open, View, or Edit button. The whole row opens its record, and editing happens there. |
| Tooltip | Every icon button has a tooltip. |
| Badge | A badge shows a state. A button never does. |
| Alert Dialog | An alert dialog asks before an action that cannot be undone. Its action button is Destructive when the action removes something or cannot be taken back, and Primary otherwise. |

See [Buttons and Actions](../patterns/buttons-and-actions.md) for where buttons go on a page, a sheet, and a dialog, and
for using one primary button per area. See [Copy](../foundations/copy.md) for naming the action on a button. See
[Disabled With a Reason](../foundations/disabled-with-a-reason.md) for saying why a button is disabled. See [Border and
Radius](../styles/border-and-radius.md) and [Elevation](../styles/elevation.md) for the corners, edges, and
shadows the Specs name.

## In code

- `Button` from `aperia-ds5`: `variant` is `default` (Primary), `outline`, `ghost`, `destructive`, `link` or
  `secondary`; `size` is `default`, `sm`, `xs`, `lg`, or `icon`, `icon-sm`, `icon-xs`, `icon-lg` for icon buttons.
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
