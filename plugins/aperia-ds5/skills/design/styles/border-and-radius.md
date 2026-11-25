# Border and Radius

Border and radius outline every card, control, and panel in one way, so the same part looks the same on every screen. See
[Elevation](elevation.md) for the shadow that goes with each border.

## What is available

### Radius

Radii come in five steps, Small, Medium, Large, Extra large, and Round. Each is worked out from one base radius set once
in the library, and Large is the base.

- **Large** is for buttons, fields, dropdowns, menus, and popovers.
- **Extra large** is for cards, dialogs, sheets, and empty states.
- **Round** is for people's pictures, switches, and badges.
- **Medium** and **Small** are for the smaller parts that sit inside other boxes, such as menu items and tooltips.

Button and Toggle take Large at the default size and larger, and Medium at the small sizes. A button inside a button
group takes Large at every size.

A square picture, such as a company, product, or team picture, takes its radius from its size. A square picture uses
Large at the default size and larger, Medium when small, and Small when extra small. A checkbox has a tighter radius of
its own.

### Borders

Every border and divider has the same width, set once in the library. A border is the line around a card, a control, or
a panel. A divider is a line between rows or sections. See [Surfaces and Layers](surfaces-and-layers.md) for which parts
take the border of a surface and which take the border of a control, and where a divider runs.

Borders come in four kinds. See [Color](color.md) for the Border and Input roles.

- **Border** outlines cards, tables, dialogs, and sheets, and draws dividers.
- **Input** outlines fields, outline buttons, checkboxes, radios, and the chosen tab, a little stronger than Border.
- **Focus** draws a thin primary line inside any control that has keyboard focus, plus a primary halo.
- **Invalid** draws the same line and halo in the destructive red on a field with an error.

## How it looks and behaves

Larger boxes have larger radii, so a card is rounder than the button inside it.

Borders never change the size of a box. Every border sits outside the box, so it never moves the box's text. Focus and
error lines draw inside and around the control, so nothing shifts when they appear.

The outline Toggle, Badge, Input OTP slots, and the Switch track keep a real border. A joined toggle group relies on
the Toggle's border.

A picture has a thin see-through line along its outline and no other frame.

## Rules

### 1. Use the thin border

A card, a field, and a table take the thin border and a small shadow, so the box shows on any fill and its content keeps
the most contrast.

- **Do:** Give a card the thin border and a small shadow.
- **Don't:** Give a card a thick gray border, such as a plain `border-1`.

### 2. Take the radius from the component

Each component carries the radius that fits its size, so the same part looks the same on every screen.

- **Do:** Use the Avatar's square shape for a company picture.
- **Don't:** Pick a radius for one screen, or square a picture with a radius class by hand.

## In code

- Radii are `rounded-sm`, `rounded-md`, `rounded-lg` and `rounded-xl`, all derived from `--radius` in
  `styles/base.css`; `rounded-lg` is `--radius` itself.
- Borders are `ring-[0.5px]`, never a 1px `border`: `ring-border` on surfaces and panels, `ring-input` on controls. The
  `surface` utility (`rounded-xl bg-card shadow-sm ring-[0.5px] ring-border`) and the `control` utility
  (`bg-control shadow-sm ring-[0.5px] ring-input`) are for your own markup that should look like a card or a field.
- `--default-border-width` in `styles/base.css` sets the border width, so a plain `border` is thin too. Borders
  that stay borders: the Toggle `outline` (a joined toggle group relies on it), Badge, Input OTP slots and the Switch
  track.
- Focus is `focus-visible:inset-ring-1 inset-ring-ring ring-3 ring-ring/50`; invalid is the same in `destructive`.
- A square picture is `<Avatar shape="square">`, never a `rounded-*` class on the avatar or its parts.
