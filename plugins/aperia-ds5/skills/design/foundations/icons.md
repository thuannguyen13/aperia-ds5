# Icons

Icons are line symbols from one shared set that help people recognize actions and objects next to their names.

## When to use

Use an icon when people know an action by its picture, such as edit, delete, close, or more. Use an icon to show the
kind of thing an empty state is missing. Use an icon only where it helps someone read or act, never as decoration.

## What is available

Icons come in three sizes. The components set these sizes, and the live samples on this page print each one as the
browser reads it.

| Where | Icon size |
|---|---|
| Buttons, fields, menus, and most controls | The default icon size |
| Small buttons | A step smaller |
| Extra small buttons | Smaller again |

An empty state shows its icon at the default size, on a Muted tile.

Every icon comes from Lucide, in Figma and in code. In code, the stroke stays Lucide's own. In Figma, every icon's
stroke is bound to one stroke-width variable, so the stroke is the same at every size.

An icon takes the color of the text beside it.

## How it looks and behaves

An icon-only button shows a tooltip that names its action. A screen reader reads the same name. When the button is
disabled for a reason, the tooltip says the reason instead.

## Rules

### Name every icon-only button

- **Do:** Show an icon button's name when the pointer is over it or it has focus ("Delete Note"), so people can check
  before they click.
- **Don't:** Use an icon with no name. Give every icon-only button a name, so people and screen readers can tell what it
  does.

### Pair an icon with a word

- **Do:** Pair an icon with a word, a badge, or a tooltip that says what it means, so everyone reads it the same way.
- **Don't:** Use a colored dot or icon as the only sign of a state. Add the word, so people who miss the color or the
  icon still get it.

## When you can do it differently

Icons have no exceptions. Every app uses the Lucide set at these sizes.

## Works with

- See [Color](color.md) for the text color icons take, and for the rule on the primary color.
- See [Sizes](sizes.md) for icon button sizes.

## In code

- Import icons from `lucide-react` (`import { PlusIcon } from "lucide-react"`). Do not set `strokeWidth`: code keeps
  Lucide's default, and Figma binds the `stroke-width/stroke-[1-25]` variable.
- `Button` sizes the icon (`size-4`, `size-3.5` at `sm`, `size-3` at `xs`); mark its side with
  `data-icon="inline-start"` or `"inline-end"` for the tighter padding.
- Icon-only buttons are `IconButton` with `label` (the tooltip and the accessible name) and `reason` (why it is
  disabled). An `aria-label` can name the record too.
- In Figma, the icons connect to `lucide-react` through their own Code Connect templates (`components/ui/icon/`),
  published with `npm run publish:icons`.
