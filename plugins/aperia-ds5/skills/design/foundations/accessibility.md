# Accessibility

Accessibility rules make every screen usable with a keyboard, a screen reader, and settings such as reduced motion. See
each linked page for the rule it owns.

## When to use

Use these rules on every screen. The components already meet most of them, so an app keeps them by using the
components as they are and by following the few rules that depend on its own content.

## What is available

The library and the app share the work:

| What | Who does it | Where it is set |
|---|---|---|
| Keyboard reach, focus order, and Escape to close panels | The components | Every menu, dialog, sheet, popover, and picker |
| A visible focus line and halo on every control | The components | See [Border and Radius](../styles/border-and-radius.md). |
| Less motion when a person turns on reduced motion in their device settings | The components | See [Motion](../styles/motion.md). |
| A name for every icon-only button | The app, from the icon button recipe | See [Button](../components/button.md). |
| A reason for every control that cannot be used | The app, with `ReasonTooltip` or a field note | See [Disabled With a Reason](disabled-with-a-reason.md). |
| What a hover shows, also on a tap | The app, for each tooltip and card it adds | This page |
| Words, icons, or a legend beside every color | The app | This page |
| Labels on every field | The app, with `Field` and `FieldLabel` | See [Forms in Sheets](../patterns/forms-in-sheets.md). |

## How it looks and behaves

A keyboard reaches every action in the order people read the screen, from top to bottom and left to right. Tab moves
between controls, Enter or Space uses one, and Escape closes the panel that is open. When a dialog or a sheet closes,
focus goes back to the control that opened it.

A row that opens a record takes focus and opens with Enter or Space. A table that scrolls sideways takes focus too, so
a keyboard can scroll it. See [Tables](../patterns/tables.md) for that table.

A control shows its focus line only when a keyboard moves to it. A click does not show the line.

A screen reader hears a name for every control. A button's name is its text, an icon-only button's name is its tooltip,
and a field's name is its label. A control that cannot be used stays focusable, so a screen reader still reaches it
and hears why.

On a touch screen, a tap shows what a hover shows on a desktop, because a finger cannot hover:

- A tap on a disabled control shows its reason.
- A tap on a relative time, such as "3d ago", shows its exact date.
- A tap on a stack of pictures opens the card that lists everyone.

A contact link is in the Link color at rest, so it reads as a link without the underline that a hover adds. See
[Surfaces and Layers](../styles/surfaces-and-layers.md) for showing what responds before the pointer reaches it.

## Rules

### Never use color as the only signal

- **Do:** Pair every colored badge, dot, or chart series with a word, an icon, or a legend, such as the word on the
  Overdue badge, so people who cannot tell the colors apart read the same thing.
- **Don't:** Mark a state with color alone, such as a red row with no word. Add the word, so the state does not depend
  on seeing color.

### Keep every action reachable by keyboard

- **Do:** Build actions from the library's buttons, menus, and rows, so Tab reaches them and Enter uses them.
- **Don't:** Put a click on a plain element, such as a `div` that opens a record. Use a button, a link, or
  `opensOnClick`, so a keyboard can reach it.

### Keep the focus line

- **Do:** Leave the focus line and halo that the components draw, so keyboard users see where they are.
- **Don't:** Remove the outline or the ring in the app's CSS. Keep it, so focus never disappears.

### Name every control

- **Do:** Give every field a label and every icon-only button a name, so a screen reader says what each control does.
- **Don't:** Rely on a placeholder or an icon alone to name a control. Add the label or the name, so the control is not
  read as "button" or "edit text".

## When you can do it differently

An app can add accessibility work beyond these rules, such as a skip link to the main content. It never removes one
of them.

## Works with

- See [Color](../styles/color.md) for the status and chart colors that need a word beside them.
- See [Disabled With a Reason](disabled-with-a-reason.md) for controls that cannot be used.
- See [Sizes](sizes.md) for the size of every control.
- See [History](../patterns/history.md) and [Details](../patterns/details.md) for the dates and contact links that a
  tap shows.

## In code

- The components come from Radix, which handles keyboard use, focus, and ARIA roles. Use them as they are.
- `opensOnClick(label, open)` makes a table row focusable and opens it with Enter or Space.
- A disabled control that says why uses `aria-disabled` instead of `disabled`, so it stays focusable.
- Radix's `Tooltip` and `HoverCard` open on hover and focus only. A part whose hover shows something also opens it on a
  tap. On a pointer down with `pointerType === "touch"`, toggle it open, as the people stack on
  [People and Pictures](../patterns/people-and-pictures.md) does.
- `prefers-reduced-motion` turns off the scale and slide of panels in `base.css`. Panels still fade.
