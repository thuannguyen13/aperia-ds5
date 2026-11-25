# Icons

Icons are line symbols from one shared set that let people recognize an action or an object by its picture. See
[Color](color.md) for the color an icon takes and [Sizes](../foundations/sizes.md) for the size of an icon button.

## When to use

Use an icon alone for an action that people know by its picture, such as edit, delete, close, or more. That icon sits in
an icon button, and [Button](../components/button.md) says how the button is named.

Use an icon with a word when the picture is not widely known, or when the icon shows a state. A button can hold an icon
before its label.

Use an icon in an empty state to show the kind of thing that is missing. See [Empty States](../foundations/empty-states.md).

## What is available

Every icon comes from one set, Lucide, in code and in Figma.

Icons come in three sizes, set by the components, so an app never sizes an icon itself. Buttons, fields, menus, and most
controls take the default size, `size-4`. A small button takes `size-3.5`, and an extra small button takes `size-3`. A
badge's icon is `size-3`. An empty state shows its icon at the default size, on a Muted tile.

## How it looks and behaves

An icon takes the color of the text beside it. A disabled control dims its icon with its text.

In code, the stroke stays Lucide's own, a width of 2 on the icon's 24-unit grid that scales with the icon. In Figma,
every icon's stroke is bound to one stroke-width variable, `stroke-width/stroke-[1-25]`. Figma does not scale a stroke when
an icon is resized, so that variable gives the same stroke at every size.

## Rules

### 1. Use an icon only where it helps

An icon that people cannot read or act on adds a shape to scan and nothing to learn. Every icon is there to help someone
read or act.

- **Do:** Put a pencil on an edit button, a picture people know.
- **Don't:** Put the same icon beside every heading to fill the space.

### 2. Pair a state's icon with a word

An icon alone shows a state to people who know the picture and to nobody else, and a screen reader skips it. A word
beside the icon says the same thing to everyone.

- **Do:** Show a state as an icon with a word, such as a warning icon with "Payment Failed" in a badge.
- **Don't:** Show a state with only an icon or a colored dot.

## In code

- Import icons from `lucide-react` (`import { PlusIcon } from "lucide-react"`). Do not set `strokeWidth`: code keeps
  Lucide's default, and Figma binds the `stroke-width/stroke-[1-25]` variable.
- `Button` sizes the icon (`size-4`, `size-3.5` at `sm`, `size-3` at `xs`); mark its side with
  `data-icon="inline-start"` or `"inline-end"` for the tighter padding.
- Build icon-only buttons in the app as the icon button recipe on [Button](../components/button.md), with a label
  (the tooltip and the accessible name) and a reason when disabled. An `aria-label` can name the record too.
- In Figma, the icons connect to `lucide-react` through their own Code Connect templates (`components/ui/icon/`),
  published with `npm run publish:icons`.
