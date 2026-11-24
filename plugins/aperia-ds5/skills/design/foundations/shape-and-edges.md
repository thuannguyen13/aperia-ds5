# Shape and Edges

Shape and edges define the corner radius and the hairline edge of cards, controls, and panels.

## When to use

Use these corners and edges for every card, control, and panel.

## What is available

Shape and edges come in two sets, corners and edges.

Corners come in five steps. Every step is worked out from one base radius, set once in the library. The live samples
on this page show each corner as the browser reads it.

| Step | Where you see it |
|---|---|
| Small | The smallest square picture |
| Medium | Menu items and search (⌘K) rows, tooltips, small and extra-small buttons, and loading placeholders |
| Large (the base) | Buttons, fields, dropdowns, menus, and popovers |
| Extra large | Cards, dialogs, sheets, and empty states |
| Round | People's pictures, switches, and badges (a pill) |

A square picture, such as a company, product, or team picture, takes its corner from its size. It uses Large at the
default size and larger, Medium when small, and Small when extra small. A checkbox has a tighter corner of its own.

Edges come in four kinds. Every hairline has the same width, set once in the library.

| Edge | What it outlines | Color |
|---|---|---|
| Border | Cards, tables, dialogs, and sheets | The Border color |
| Input | Fields, outline buttons, checkboxes, radios, and the chosen tab | The Input color, a little stronger than Border |
| Focus | Any control while it has keyboard focus | A thin primary line inside, plus a primary halo |
| Invalid | A field with an error | The same line and halo in the destructive red |

## How it looks and behaves

A hairline edge and a small shadow outline a box in place of a gray border. Larger boxes have larger corners, so a
card is rounder than the button inside it.

Edges never change the size of a box. Every hairline edge sits outside the box, so it never moves the box's text.

Focus and error lines draw inside and around the control, so nothing shifts when they appear.

A picture has a thin see-through line inside its edge and no other frame.

## Rules

### Use the hairline, not a border

- **Do:** Give cards, fields, and tables the hairline edge and a small shadow, so the box shows on any fill.
- **Don't:** Put thick gray borders on cards, fields, and tables. Use the hairline edge, so the content has the most
  contrast.

### Take the corner from the component

- **Do:** Keep the corner each component already has, so the same thing looks the same on every screen.
- **Don't:** Pick a corner per screen, or square a picture with a corner class by hand. Use the Avatar's square shape
  instead, so every picture's corners match.

## When you can do it differently

Shape and edges have no exceptions. Every app uses these corners and edges.

## Works with

- See [Elevation](elevation.md) for the shadow that goes with each edge.
- See [Color](color.md) for the Border and Input roles.
- See [Sizes](sizes.md) for the heights these shapes come in.

## In code

- Corners are `rounded-sm`, `rounded-md`, `rounded-lg` and `rounded-xl`, all derived from `--radius` in
  `styles/base.css`; `rounded-lg` is `--radius` itself.
- Edges are `ring-[0.5px]`, never a 1px `border`: `ring-border` on surfaces and panels, `ring-input` on controls. The
  `surface` utility (`rounded-xl bg-card shadow-sm ring-[0.5px] ring-border`) and the `control` utility
  (`bg-control shadow-sm ring-[0.5px] ring-input`) are for your own markup that should look like a card or a field.
- `--default-border-width` in `styles/base.css` sets the hairline, so a plain `border` is a hairline too. Hairlines
  that stay borders: the Toggle `outline` (a joined toggle group relies on it), Badge, Input OTP slots and the Switch
  track.
- Focus is `focus-visible:inset-ring-1 inset-ring-ring ring-3 ring-ring/50`; invalid is the same in `destructive`.
- A square picture is `<Avatar shape="square">`, never a `rounded-*` class on the avatar or its parts.
