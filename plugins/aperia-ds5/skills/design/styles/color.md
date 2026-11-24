# Color

Color tokens name each color by its role and hold one value for Light mode and one for Dark mode.

## When to use

Use a color role whenever something on screen needs a color, such as text, a fill, an edge, or a dim. Pick the role
by its job, such as "muted text" or "control fill", not by how a color looks. The role names are the same in Figma and
in code.

## What is available

Color has sixteen roles. Each role has a Light value and a Dark value, set once in the library. In Storybook, the In
Light and In Dark columns show each color live, with the value the browser reads.

| Tokens | Role | In Light | In Dark |
|---|---|---|---|
| **Background** `--background` | The page behind the cards, and the fill of dialogs and sheets | A light cool gray | A dark cool gray |
| **Foreground** `--foreground` | Body text and headings | Near black | Near white |
| **Card** `--card` | Cards, and tables or empty states that sit on the page | White | A step lighter than the page |
| **Popover** `--popover` | Menus, popovers, and lists that open over the page | White | A step lighter than a card |
| **Control** `--control` | The fill of fields, outline buttons, checkboxes, radios, and the chosen tab | White, the same as a card | Between a card and a popover, so fields show on both |
| **Primary** `--primary` | The main button, focus, links, and the selected item | The shared Aperia blue, with white text | The same blue, with white text |
| **Secondary** `--secondary` | Secondary buttons | A pale gray | A dark gray |
| **Muted** `--muted` | Recessed fills, such as an outline button on hover, a highlighted menu row, and a card footer at half strength. A highlighted menu row uses Accent, another name for Muted. | A pale gray | A mid gray |
| **Muted foreground** `--muted-foreground` | Labels, descriptions, hints, and a missing value (—) | A mid gray | A light gray |
| **Destructive** `--destructive` | Delete actions and errors | A deep red | A light red |
| **Border** `--border` | The hairline edge of cards, tables, and panels | A see-through share of the text color | The same share of the Dark text color |
| **Input** `--input` | The hairline edge of controls | A slightly stronger share than Border | The same, in Dark |
| **Ring** `--ring` | The focus line | The primary blue | The primary blue |
| **Overlay** `--overlay` | The dim behind dialogs, sheets, and drawers | A light black tint | A deeper black tint |
| **Sidebar** `--sidebar` | The sidebar's fill | The Aperia navy, the same in every app | The darkest neutral |
| **Chart 1 to 6** `--chart-1` … `--chart-6` | A chart's series, in order | The app's chart palette | The same, with Chart 6 lightened |

The neutrals are cool grays of one hue. The page, cards, fills, and text all use them.

Status colors, such as the colors for In Progress and Overdue, are not in this table. Each app sets its own. See "What
an app can change" below.

## How it looks and behaves

Color frames content with neutral grays, hairline edges, and one accent color, the primary color. Content therefore
has the most contrast on screen.

Every role has a Dark value, and the whole screen switches between Light and Dark at once. Shadows deepen in Dark. See
[Elevation](elevation.md) for the shadow steps.

Muted text and the destructive red reach a contrast of 4.5:1 on the page, on a muted fill, and on a highlighted menu
row, not only on white.

Edges and the overlay are see-through. Each is a share of the text color or of black, so it looks the same on any
fill.

In Light, the sidebar is the Aperia navy with white text. Its selected item is white with navy text. Its hover,
divider, and focus line are white tints over the navy. In Dark, the sidebar is the darkest neutral, not the navy.

A ghost button's hover is a tint of the text color. The tint is a little stronger in Dark, so it shows on any fill.

## Rules

### Use the primary color only for what it marks

- **Do:** Use the primary color for the main action, the focus line, links, and the selected item, so people see what
  they can act on.
- **Don't:** Color a heading or an icon with the primary color, or show a status as a small primary button. Keep them
  neutral, so the real action stands out.

### Use status color only for state

- **Do:** Show a state as a badge in the app's status colors that names it ("In Progress"), so a status color always
  means a state.
- **Don't:** Tint a card, a heading, or an icon with a status color to decorate it. Keep decoration neutral, so no one
  reads a state that is not there.

### Pair every color with a word or an icon

- **Do:** Pair every colored count, dot, or cell with a word, an icon, or a legend ("3 Overdue"), so it reads without
  color.
- **Don't:** Rely on color alone, such as a red "3". Add the word that says what it counts, so everyone can read it.

### Pick the role, not a fixed value

- **Do:** Take every hover, edge, and fill from its role (a highlighted row uses Muted), so it works in Light, in Dark,
  and on any surface.
- **Don't:** Pick a gray by eye for a highlight. Use the role's color instead, so it keeps its contrast in Dark.

## What an app can change

An app sets only two kinds of color. Every other value on this page is shared by all apps.

| What | Who decides | How it is used |
|---|---|---|
| Status colors | The app, one pair per state | A pale fill with deep text, each with its own Dark pair, on badges and alerts. The library ships none. |
| Chart colors | The app | Its series, Chart 1 to 6. Check them against the status colors, so a series never reads as a state. |

An app also sets its own logo and product name. See [App Shell](../patterns/app-shell.md) for where they sit.

Every other value is shared by all apps, in two groups.

| Shared | Values |
|---|---|
| Colors | The sidebar color, the primary color, the page and card fills, the control and panel fills, the neutrals, muted text, the destructive color, and the overlay |
| Other foundations | Radius, shadows, edges, motion, type weights, and control heights |

The primary color is the same in both modes, with white text on it. An app that wants a shared value changed raises it
in an issue on aperia-ds5. The change then applies to every app, not to one app alone.

## When you can do it differently

An app changes the sidebar color only after the design system team agrees to the change in an issue on aperia-ds5.
An app never changes it only to look different. No other shared color changes per app.

## Works with

- See [Surfaces and Layers](surfaces-and-layers.md) for which fill each part of a screen sits on, and where a status
  color goes.
- See [Elevation](elevation.md) for shadows and the overlay.
- See [Border and Radius](border-and-radius.md) for where Border and Input draw.
- See [Typography](typography.md) for which text is foreground and which is muted.

## In code

- The roles are CSS variables in `aperia-ds5/base.css` (source `styles/base.css`), used as Tailwind classes:
  `bg-background`, `bg-card`, `bg-popover`, `bg-control`, `bg-primary text-primary-foreground`, `bg-muted`,
  `text-muted-foreground`, `text-destructive`, `ring-border`, `ring-input`, `bg-overlay`, `bg-sidebar`, `bg-chart-1` …
  `bg-chart-6`. A ghost hover is `hover:bg-(--ghost-hover)`.
- The tokens are shadcn's, with Aperia's values. An app never sets `--primary`, `--ring` or a `--sidebar-*` variable;
  it sets only its status and chart colors.
- The app's colors live in one file, imported after the library:

  ```css
  @import "tailwindcss";
  @import "aperia-ds5/base.css";
  @import "./brand.css"; /* copy assets/brand.example.css and change the values */
  ```

- [assets/brand.example.css](../assets/brand.example.css) holds Sales Portal's values as the model: copy it, change the
  values, keep the names, and delete any line whose value equals the library's. Status pairs go on `Badge` and `Alert`
  through `className` (`bg-status-green text-status-green-foreground`).
