# Color

Color gives each part of a screen its fill, text, edge, or dim by role, with one value for Light mode and one for Dark
mode. See [Surfaces and Layers](surfaces-and-layers.md) for which fill each part sits on.

## What is available

Color has seventeen roles, each named by its job, such as muted text or control fill. The role names are the same in
Figma and in code. Each role has a Light value and a Dark value, set once in the library. In Storybook, the In Light
and In Dark columns show each color live, with the value the browser reads.

| Tokens | Role | In Light | In Dark |
|---|---|---|---|
| **Background** `--background` | The page behind the cards, and the fill of dialogs and sheets | A light cool gray | A dark cool gray |
| **Foreground** `--foreground` | Body text and headings | Near black | Near white |
| **Card** `--card` | Cards, and tables or empty states that sit on the page | White | A step lighter than the page |
| **Popover** `--popover` | Menus, popovers, and lists that open over the page | White | A step lighter than a card |
| **Control** `--control` | The fill of fields, outline buttons, checkboxes, radios, and the chosen tab | White, the same as a card | Between a card and a popover, so fields show on both |
| **Primary** `--primary` | The main button, and the mark of a chosen option, such as a ticked checkbox, a picked radio, or a switch that is on | The shared Aperia blue, with white text | The same blue, with white text |
| **Link** `--link` | Links in running text and the Link button | The primary blue | A lighter blue, so a link reads on the Dark page |
| **Secondary** `--secondary` | Secondary buttons | A pale gray | A dark gray |
| **Muted** `--muted` | Recessed fills, such as an outline button on hover, a highlighted menu row, and a card footer at half strength. A highlighted menu row uses Accent, another name for Muted. | A pale gray | A mid gray |
| **Muted foreground** `--muted-foreground` | Labels, descriptions, hints, and a missing value (—) | A mid gray | A light gray |
| **Destructive** `--destructive` | Delete actions and errors | A deep red | A light red |
| **Border** `--border` | The border of cards, tables, and panels, and the dividers between rows | A see-through share of the text color | The same share of the Dark text color |
| **Input** `--input` | The border of controls | A slightly stronger share than Border | The same, in Dark |
| **Ring** `--ring` | The focus line | The primary blue | A lighter blue, so the line shows on the Dark page |
| **Overlay** `--overlay` | The dim behind dialogs, sheets, and drawers | A light black tint | A deeper black tint |
| **Sidebar** `--sidebar` | The sidebar's fill | The Aperia navy, the same in every app | The darkest neutral |
| **Chart 1 to 6** `--chart-1` … `--chart-6` | A chart's series, in order | The app's chart palette | The same, with Chart 6 lightened |

The neutrals are cool grays of one hue. The page, cards, fills, and text all use them. See
[Typography](typography.md) for which text is foreground and which is muted, and [Border and Radius](border-and-radius.md)
for where Border and Input draw.

Status colors, such as the colors for In Progress and Overdue, are not in this table. Each app sets its own. See "What
an app can change" below.

## How it looks and behaves

Color frames content with neutral grays, thin borders, and one accent color, the primary blue. Content therefore has
the most contrast on screen. The primary color is the same blue in Light and in Dark, with white text on it. Links and
the focus line use the same blue in Light and a lighter blue in Dark.

A color is never the only signal for a state or a chart series. See [Accessibility](../foundations/accessibility.md)
(rule 1) for the words and icons that go with a color.

Every role has a Dark value, and the whole screen switches between Light and Dark at once. Shadows deepen in Dark. See
[Elevation](elevation.md) for the shadow steps and the overlay.

Muted text, the destructive red, and links reach a contrast of 4.5:1 on the page, on a muted fill, and on a highlighted
menu row, not only on white. The focus line reaches 3:1 against every fill it sits on, in Light and in Dark.

Edges and the overlay are see-through. Each is a share of the text color or of black, so it looks the same on any
fill.

In Light, the sidebar is the Aperia navy with white text. Its selected item is white with navy text. Its hover,
divider, and focus line are white tints over the navy. In Dark, the sidebar is the darkest neutral, not the navy.

A ghost button's hover is a tint of the text color. The tint is a little stronger in Dark, so it shows on any fill.

A selected row or a pressed toggle takes the Muted fill, not the primary color. See
[Surfaces and Layers](surfaces-and-layers.md) for every selected and current look.

## Rules

### 1. Use the primary color only for what it marks

The primary color marks the main button and a chosen option, such as a ticked checkbox, so people see what they can
act on. Links take the Link color.

- **Do:** Use the primary color for the one main button, such as Add Task, and keep the heading neutral.
- **Don't:** Color a heading or an icon with the primary color, or show a status as a small primary button. They pull
  attention from the real action.

### 2. Pick the role, not a fixed value

Every fill, edge, and text color comes from the role that matches its job, so it works in Light, in Dark, and on any
surface.

- **Do:** Take the highlight of a hovered row from Muted.
- **Don't:** Pick a gray by eye for a highlight, such as `#ececec`. A fixed value keeps its Light look and loses its
  contrast in Dark.

## What an app can change

An app sets only three kinds of color. Every other value on this page is shared by all apps.

| What | Who decides | How it is used |
|---|---|---|
| Status colors | The app, one pair per state | A pale fill with deep text, each with its own Dark pair, on badges and alerts. The library ships none. See [Status](../patterns/status.md). |
| Chart colors | The app | Its series, Chart 1 to 6. Check them against the status colors, so a series never reads as a state. See [Charts](../patterns/charts.md). |
| Avatar colors | The app, a short set of fill and text pairs | The initials and monograms of pictures, picked by the record, each pair with its own Dark pair. See [People and Pictures](../patterns/people-and-pictures.md). |

An app also sets its own logo and product name. See [App Shell](../patterns/app-shell.md) for where they sit. An app loads
the shared font itself. See [Typography](typography.md) for the font.

Every other value is shared by all apps, in two groups.

| Shared | Values |
|---|---|
| Colors | The sidebar color, the primary color, the link color, the focus line, the page and card fills, the control and panel fills, the neutrals, muted text, the destructive color, and the overlay |
| Other foundations | Radius, shadows, edges, motion, type weights, and control heights |

An app that wants a shared value changed raises it in an issue on aperia-ds5. The change then applies to every app, not
to one app alone. The sidebar color is the one shared color an app may change for itself, and only after the design
system team agrees to the change in that issue. An app never changes it only to look different.

## In code

- The roles are CSS variables in `aperia-ds5/base.css` (source `styles/base.css`), used as Tailwind classes:
  `bg-background`, `bg-card`, `bg-popover`, `bg-control`, `bg-primary text-primary-foreground`, `text-link`, `bg-muted`,
  `text-muted-foreground`, `text-destructive`, `ring-border`, `ring-input`, `bg-overlay`, `bg-sidebar`, `bg-chart-1` …
  `bg-chart-6`. A ghost hover is `hover:bg-(--ghost-hover)`.
- The tokens are shadcn's with Aperia's values, plus the library's own `--control`, `--overlay`, and `--link`. An app never sets `--primary`, `--link`, `--ring` or a `--sidebar-*`
  variable. It sets only its status and chart colors in CSS, and its avatar colors in its picture adapter.
- The app's colors live in one file, imported after the library:

  ```css
  @import "tailwindcss";
  @import "aperia-ds5/base.css";
  @import "./brand.css"; /* copy assets/brand.example.css and change the values */
  ```

- [assets/brand.example.css](../assets/brand.example.css) holds Sales Portal's values as the model: copy it, change the
  values, keep the names, and delete any line whose value equals the library's. See [Status](../patterns/status.md)
  for the status pairs on `Badge`, and [Banner Alerts](../patterns/banner-alerts.md) for a warning `Alert`.
