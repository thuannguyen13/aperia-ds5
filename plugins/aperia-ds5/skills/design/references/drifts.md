# Drifts

What an agent produces when left to shadcn/ui defaults or its own taste. Check a finished screen against each row.

| Drift | Instead |
|---|---|
| 1px grey borders on cards, fields and tables | The aperia-ds5 components as they are; `surface` or `control` on your own markup |
| A table boxed inside a card, border inside border | The table flush in the card, running to its edges |
| A line between a card's header and its table (`border-t`, a `Separator`, or a header with `border-b`) | No top border: the column headings sit straight under the card header |
| Space between a composition's parts from a `gap` or `space-y` on the parent, or padding added back when a part hides | Each part owns its space: the card header's own 56px, the content's own padding |
| A missing value shown as `-`, N/A, None or blank | An em dash (—) in muted text; "No [field]" for an empty optional pick |
| Phone numbers, emails and websites as blue underlined links | Plain text in the body colour; on a record's page a `tel:` / `mailto:` / website link, underlined only on hover |
| Zebra-striped table rows | Hairline separators and a muted hover |
| Blurred backdrop, or a different overlay per panel | One overlay (10% / 50%), no blur |
| Dialogs and sheets that look different | Dialogs, alerts and sheets alike: page fill, 0.5px edge, large shadow |
| Panels that pop in or snap shut, or linear 200ms motion | 220ms in on the ease-out curve, 150ms out, a dialog from 97% |
| Section titles as loud as the page title, or medium weight | Semibold card titles in `TitledCard`, a step below the page title |
| Tabs floating outside the card they switch | Tabs inside the card, under its header |
| Small solid-primary buttons as status pills or row actions | A status badge in its status colour; actions on the record page or header |
| Text links scattered through a table's cells | The row opens its record; references use the app's record link style |
| Bare "No data", "No results" or a description repeating the title | `EmptyState`, title only unless the line adds something |
| Initials or logos drawn ad hoc, with rings or borders | The ds5 `Avatar`, no frame |
| A company or product avatar squared by hand (`rounded-lg`, `rounded-md` on `Avatar` or its parts) | `shape="square"`: the corner follows the size, and the inner line, image and fallback follow the shape |
| Icon buttons with no tooltip | `IconButton` with its label |
| A pale, disabled-looking primary button waiting for input | An enabled button that refuses with a reason in place; or a disabled one whose tooltip says why |
| Toasts for errors | The error beside its field, the form open with what was typed |
| Primary or brand colour used as decoration (headings, icons) | Primary only for the main action, focus, links and selected state; brand only in the sidebar |
| Content in stacked containers starting a few pixels apart | One shared x, worked out from the classes and measured |
| Placeholder-only fields, "Please enter…" labels | A short label, a placeholder only for an example |
| A per-app restyle of neutrals, radius, shadows or a component (`[data-slot=…]` CSS) | Only the brand slots differ between apps; component fixes go to aperia-ds5 |
| A new control for a concept the app already shows | The app's existing pattern, or both converted to one |
