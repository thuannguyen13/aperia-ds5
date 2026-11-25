# Accessibility

Accessibility rules let people use every screen with a keyboard, a screen reader, or a touch screen, and with settings
such as reduced motion.

## How it looks and behaves

The library's components keep the keyboard, focus, and reduced-motion behavior below. The app keeps every other behavior, with
the rules at the end of the page.

### Keyboard

A keyboard reaches every action in the order people read the screen, from top to bottom and left to right. Tab moves
between controls, Enter or Space uses one, and Escape closes the panel that is open. When a dialog or a sheet closes,
focus goes back to the control that opened it. Every menu, dialog, sheet, popover, and picker in the library does this.

A row that opens a record is one Tab stop and opens with Enter or Space. A table that scrolls sideways takes focus too,
so a keyboard can scroll it. See [Tables](../patterns/tables.md) for the scroll table that an app builds.

### Focus

A control shows its focus line and halo only when a keyboard moves to it. A click does not show them. Every control in
the library draws them. See [Border and Radius](../styles/border-and-radius.md) for the line.

### Names

A screen reader hears a name for every control. A button's name is its text, an icon-only button's name is its tooltip,
and a field's name is its label. See [Button](../components/button.md) for the icon-only button and
[Forms in Sheets](../patterns/forms-in-sheets.md) for a field's label.

A control that cannot be used stays focusable, so a screen reader still reaches it and hears why. See
[Disabled With a Reason](disabled-with-a-reason.md) for the reason.

### Touch screens

A finger cannot hover, so a tap shows what a hover shows on a desktop:

- A tap on a disabled control shows its reason. The reason stays open until a tap elsewhere.
- A tap on a relative time, such as "3d ago", shows its exact date.
- A tap on a stack of people's pictures opens the card with each person's name.

Five pieces of the library open on a tap. They are `ReasonTooltip`, a blocked menu item, a blocked button in a record's
header actions, Delete in `SheetDelete`, and `RelativeTime`. A plain `Tooltip` or `HoverCard` opens on hover and keyboard focus
only, so a tap shows nothing. See [Disabled With a Reason](disabled-with-a-reason.md), [History](../patterns/history.md),
and [People and Pictures](../patterns/people-and-pictures.md) for each case.

A touch screen has no hover to show what responds, so a contact link is in the Link color at rest. It reads as a link
without the underline that a hover adds. See [Details](../patterns/details.md) for contact links, and
[Surfaces and Layers](../styles/surfaces-and-layers.md) for showing what responds before the pointer reaches it.

### Reduced motion

When a person turns on reduced motion in their device settings, panels fade but no longer scale or slide. See
[Motion](../styles/motion.md) for the motion of panels.

### Beyond these rules

An app can add accessibility work beyond these rules, such as a "Skip to content" link to the page's content. It never
removes one of the behaviors above.

## Rules

### 1. Never use color as the only signal

A badge, dot, row, or chart series that differs only by color is unreadable to people who cannot tell the colors apart.
Each carries a word, an icon, or a legend as well. See [Color](../styles/color.md) for the status and chart colors.

- **Do:** Pair every colored badge, dot, or chart series with a word, an icon, or a legend, such as the word Overdue in
  a red badge.
- **Don't:** Mark a state with color alone, such as a red row with no word.

### 2. Keep every action reachable by keyboard

Every action is a button, a link, a menu item, or a row built with `opensOnClick`, so Tab reaches it and Enter or Space
uses it.

- **Do:** Open a record from a table row with `opensOnClick`.
- **Don't:** Put a click on a plain element, such as a `div` that opens a record.

### 3. Keep the focus line

Every control keeps the focus line and halo that the components draw, so keyboard users always see where they are.

- **Do:** Leave the focus line and halo that a button draws when a keyboard reaches it, and give a control the app builds a `focus-visible` ring.
- **Don't:** Remove the outline or the ring in the app's CSS, such as `outline-none` with no ring in its place.

### 4. Name every control

Every field has a label and every icon-only button has a name, so a screen reader says what each control does instead
of "edit text" or "button".

- **Do:** Give a field a label, such as Phone above the box.
- **Don't:** Rely on a placeholder or an icon alone to name a control.

### 5. Show on a tap what a hover shows

A finger cannot hover, so anything that a hover explains, such as a reason or an exact time, also opens on a tap.

- **Do:** Show a reason with `ReasonTooltip` and a time with `RelativeTime`, which open on a tap.
- **Don't:** Put a reason or an exact time only in a plain `Tooltip` or `HoverCard`, which a tap never opens.

## In code

- The components come from Radix, which handles keyboard use, focus, and ARIA roles. Use them as they are.
- `opensOnClick(label, open)` makes a table row focusable and opens it with Enter or Space.
- A disabled control that says why uses `aria-disabled` instead of `disabled`, so it stays focusable.
- `ReasonTooltip`, `BlockedMenuItem`, a blocked `RecordActions` button, `SheetDelete` and `RelativeTime` already open
  on a tap, through one internal hook, `useTapOpen`, that the package does not export. Radix's own `Tooltip` and
  `HoverCard` open on hover and focus only, so a tooltip or card the app adds also opens on a tap. On a pointer down
  with `pointerType === "touch"`, toggle it open, as the people stack on
  [People and Pictures](../patterns/people-and-pictures.md) does.
- `prefers-reduced-motion` turns off the scale and slide of panels in `base.css`. Panels still fade.
