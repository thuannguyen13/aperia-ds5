# Brand Slots

What an Aperia app sets for itself. Anything not on this list is shared language, already set by `aperia-ds5/base.css`,
and isn't overridden per app.

| Slot | CSS variables | Rule |
|---|---|---|
| Brand colour | `--brand` | The app's own colour. It fills the sidebar in light mode and nothing else. It isn't the primary. |
| Sidebar | `--sidebar`, `--sidebar-foreground`, `--sidebar-primary(-foreground)`, `--sidebar-accent(-foreground)`, `--sidebar-border`, `--sidebar-ring` | Light mode: the brand colour, with white text and a white selected item in brand text. Dark mode: the darkest neutral, not the brand. `base.css` already does this from `--brand`; set the others only when the brand needs different steps. |
| Logo and name | The sidebar header | The app's own mark and product name, in the sidebar's top row. |
| Chart palette | `--chart-1` to `--chart-6` | The app's series colours. Check them against the app's status colours so a series never reads as a state. |
| Status colours | The app's own, for example `--color-status-*` | Pairs of a pale fill and deep text, each with a dark-mode pair, applied to `Badge` and `Alert` through `className`. The library ships none. |

## Shared, not brand

The **primary is shared**: `#0058cc` in both modes, white text on it. It marks the primary button, the focus ring, links
and the selected state in every app. Don't set `--primary` or `--ring` per app.

Also shared, set by `base.css`:

- the page grey, card white, control fill and panel fill;
- the neutrals, muted text and destructive red;
- radius, shadows and 0.5px edges;
- the overlay;
- motion timing;
- type weights;
- control heights.

An app that wants one of them changed raises it for every app (an issue on aperia-ds5), not just itself.

## How to set them

One file, imported after the library:

```css
@import "tailwindcss";
@import "aperia-ds5/base.css";
@import "./brand.css"; /* copy assets/brand.example.css and change the values */
```

`assets/brand.example.css` holds the Sales Portal's values as a model: copy it, change the values, keep the names. Delete
any line whose value equals the library's.
