# Border and Radius

Border and radius define the hairline border and the corner radius of cards, controls, and panels.

## When to use

Use these borders and radii for every card, control, and panel.

## What is available

Border and radius come in two sets, radii and borders.

Radii come in five steps. Every step is worked out from one base radius, set once in the library. The live samples
on this page show each radius as the browser reads it.

| Step | Where you see it |
|---|---|
| Small | The smallest square picture |
| Medium | Menu items and search (⌘K) rows, tooltips, small and extra-small buttons, and loading placeholders |
| Large (the base) | Buttons, fields, dropdowns, menus, and popovers |
| Extra large | Cards, dialogs, sheets, and empty states |
| Round | People's pictures, switches, and badges (a pill) |

A square picture, such as a company, product, or team picture, takes its radius from its size. It uses Large at the
default size and larger, Medium when small, and Small when extra small. A checkbox has a tighter radius of its own.

Borders come in four kinds. Every hairline border has the same width, set once in the library.

| Border | What it outlines | Color |
|---|---|---|
| Border | Cards, tables, dialogs, and sheets | The Border color |
| Input | Fields, outline buttons, checkboxes, radios, and the chosen tab | The Input color, a little stronger than Border |
| Focus | Any control while it has keyboard focus | A thin primary line inside, plus a primary halo |
| Invalid | A field with an error | The same line and halo in the destructive red |

## How it looks and behaves

A hairline border and a small shadow outline a box in place of a thick gray border. Larger boxes have larger radii, so
a card is rounder than the button inside it.

Borders never change the size of a box. Every hairline border sits outside the box, so it never moves the box's text.

Focus and error lines draw inside and around the control, so nothing shifts when they appear.

A picture has a thin see-through line inside its border and no other frame.

## Rules

### Use the hairline border

- **Do:** Give cards, fields, and tables the hairline border and a small shadow, so the box shows on any fill.
- **Don't:** Put thick gray borders on cards, fields, and tables. Use the hairline border, so the content has the
  most contrast.

### Take the radius from the component

- **Do:** Keep the radius each component already has, so the same thing looks the same on every screen.
- **Don't:** Pick a radius per screen, or square a picture with a radius class by hand. Use the Avatar's square shape
  instead, so every picture's radii match.

## When you can do it differently

Border and radius have no exceptions. Every app uses these borders and radii.

## Works with

- See [Surfaces and Layers](surfaces-and-layers.md) for which parts take the surface edge and which take the control
  edge.
- See [Elevation](elevation.md) for the shadow that goes with each border.
- See [Color](color.md) for the Border and Input roles.
- See [Sizes](../foundations/sizes.md) for the heights these boxes come in.

## In code

- Radii are `rounded-sm`, `rounded-md`, `rounded-lg` and `rounded-xl`, all derived from `--radius` in
  `styles/base.css`; `rounded-lg` is `--radius` itself.
- Borders are `ring-[0.5px]`, never a 1px `border`: `ring-border` on surfaces and panels, `ring-input` on controls. The
  `surface` utility (`rounded-xl bg-card shadow-sm ring-[0.5px] ring-border`) and the `control` utility
  (`bg-control shadow-sm ring-[0.5px] ring-input`) are for your own markup that should look like a card or a field.
- `--default-border-width` in `styles/base.css` sets the hairline, so a plain `border` is a hairline too. Hairlines
  that stay borders: the Toggle `outline` (a joined toggle group relies on it), Badge, Input OTP slots and the Switch
  track.
- Focus is `focus-visible:inset-ring-1 inset-ring-ring ring-3 ring-ring/50`; invalid is the same in `destructive`.
- A square picture is `<Avatar shape="square">`, never a `rounded-*` class on the avatar or its parts.
