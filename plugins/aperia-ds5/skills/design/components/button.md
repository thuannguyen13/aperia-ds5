# Button

A button does something on the page: it saves a form, adds a record or opens a sheet. Its label says what will happen
when it's pressed.

## When to use

- To act on this page: Save, Add Contact, Delete Note.
- Not to go somewhere else. Going to another page is a link (View All), or a row that opens its record.
- Not to show a state. A state such as Active or Overdue is a badge.

## Types

### Primary

Solid blue. The main action of a page, a sheet or a dialog: the one the user came to do. An area has one at most.

### Outline

White, with a fine edge. Every other action beside the primary, such as Cancel, Edit or Export, and actions where none
is the main one, such as the actions in a page header or Add in a card header.

### Ghost

No fill until the pointer is over it. A quiet action that repeats or sits inside another component: an icon button on a
row or in a toolbar, the close (×) of a dialog or sheet.

### Destructive

Red text on a pale red fill. An action that deletes or removes something: Delete, Remove, Revoke.

### Link

Blue text, underlined when the pointer is over it. An action that reads as a destination, such as View All.

### Secondary

Grey fill. A filter chip on a phone: a small, round button showing an active filter, which clears it when tapped.

## Sizes

| Size | Height | Use |
|---|---|---|
| Default | 32px, 40px on phones | Every action on a page, sheet, dialog or card |
| Small | 28px | Inside a compact component, such as a filter chip |
| Extra small | 24px | Inside a compact component, when the component sets it |
| Large | 36px | No Aperia use yet; use Default |

## Icon button

An icon with no text, for an action that repeats on many rows or has a well-known icon (edit, delete, close, more). It's
square, 28px (40px on phones), and always has a tooltip that names the action.

## States

- **Hover:** Outline fills grey, Ghost fills with a faint tint, Destructive deepens.
- **Pressed:** moves down by one pixel.
- **Focus** (from the keyboard): a blue line and a soft blue halo.
- **Disabled:** faded to half strength. When there's a reason it's disabled, the button can still be reached and its
  tooltip says why.

## Rules

### Name the action

The label is a verb and the thing it acts on, in Title Case.

- **Do:** Add Member, Delete Note, Change to Demo.
- **Don't:** Submit, OK, Continue, Manage, Click Here.

### One primary per area

A page, sheet or dialog has one main action, in blue. Everything beside it is Outline.

- **Do:** Save in blue, with Cancel in outline.
- **Don't:** two blue buttons side by side.

### Say why a button is disabled

- **Do:** keep the button reachable and put the reason in its tooltip: "This item is in use and can't be deleted."
- **Don't:** a pale, disabled button with no reason, waiting for the user to guess what's missing.

### An icon button always has a tooltip

- **Do:** a tooltip naming the action, such as Edit Task.
- **Don't:** an icon alone, which some users can't read.

### A state is a badge, not a button

- **Do:** a badge in the state's colour: Active, Overdue.
- **Don't:** a small blue button used as a status pill.

## Works with

- **Dialog:** Cancel, then the action, at the bottom right. The action repeats the dialog's verb: "Delete Project", not
  OK. On a phone they stack, with the action on top.
- **Sheet:** a fixed footer with Cancel and Save. A record's Delete sits at the footer's start, away from Save.
- **Page header:** the page's actions sit on the title's line. A record's actions are Edit, then the rest, then Delete
  in red. On screens narrower than 1024px they fold into a More actions (…) menu.
- **Card:** Add sits in the card header. While the card is empty, Add moves to the middle of the empty state instead.
- **Table:** no Open, View or Edit button on a row. The whole row opens its record, and editing happens there.
- **Tooltip:** every icon button has one.
- **Badge:** shows a state; a button never does.
- **Alert Dialog:** asks before an action that can't be undone, and its action button is red.

See [Button Best Practices](../practices/buttons.md) for where buttons go on a page, a sheet and a dialog.

## Accessibility

- **Tab** reaches the button; **Enter** or **Space** presses it.
- The focus line always shows for keyboard users. Never remove it.
- An icon button's name is its tooltip label, which a screen reader reads.
- A button disabled for a reason stays focusable, so keyboard and screen reader users get the reason too.
- Targets are 32px on desktop and 40px on phones.

## Specs

| | Default | Small |
|---|---|---|
| Height | 32px (40px below 640px wide) | 28px |
| Corners | 10px | 8px |
| Text | 14px, medium weight | 13px, medium weight |
| Side padding | 10px | 10px |
| Icon | 16px, 6px from the text | 14px, 4px from the text |

| Type | Fill | Text | Edge |
|---|---|---|---|
| Primary | Primary blue `#0058cc` | White | None |
| Outline | Control (white in light mode) | Foreground | 0.5px input edge and a small shadow |
| Ghost | None; hover 5% of the text colour (10% in dark mode) | Foreground | None |
| Destructive | Destructive at 10% (20% in dark mode) | Destructive | None |
| Disabled | Any type at 50% opacity | | |

## In code

- `Button` from `aperia-ds5`: `variant` is `default` (Primary), `outline`, `ghost`, `destructive`, `link` or
  `secondary`; `size` is `default`, `sm`, `xs`, `lg`, or `icon`, `icon-sm`, `icon-xs`, `icon-lg` for icon buttons.
- Icon buttons use `IconButton` (`assets/components/icon-button.tsx`): `label` is the tooltip and the accessible name,
  and `reason` is the tooltip while it's disabled.
- A record's header actions use `RecordActions` from `aperia-ds5`.
