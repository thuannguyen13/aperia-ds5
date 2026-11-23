# Changelog

## 0.3.0 (release candidate: rc.2)

The shared Aperia look moves into the library, from Sales Portal's `globals.css`, and matches the Figma library
"Aperia Shadcn Library (Enhanced)". An app now sets only its brand slots.

### Upgrade an app

1. `npm install aperia-ds5@0.3.0`.
2. In `globals.css`, keep `@import "tailwindcss"`, `@import "aperia-ds5/base.css"` and the `@source` line. Delete every
   override of a shared token and every `[data-slot=…]` rule the library now covers (below). Keep only the brand slots:
   copy `plugins/aperia-ds5/skills/design/assets/brand.example.css`.
3. Install the agent skill from the `aperia` plugin marketplace and add its line to the app's `CLAUDE.md`: see README,
   Agent skill. Delete the `.claude/skills/aperia-app-design` link from rc.1: the skill is now `aperia-ds5:design`.
4. Compare the app before and after in Light, Dark and at phone width.

### Changed

- **Tokens** (`base.css`): Sales Portal's values. Page `oklch(0.975 0.002 286)`, cards white, darker muted and muted
  text (`#66666e`), destructive `#c10007` / `#ff8a8c`, accent equals muted, Dark surfaces on hue 286.
- **Primary** is `#0058cc` in both modes, white text. Light sidebar is the navy `--brand` (`#002f67`).
- **Sidebar steps follow `--brand`** (rc.2): in Light, `--sidebar-accent`, `--sidebar-border` and `--sidebar-ring` are
  white at 8%, 15% and 60% over the brand, so an app sets `--brand` alone. Before, `brand.example.css` set them under
  `:root`, which loads after `base.css` and so also won in Dark. Delete them from the app's brand file. On the navy
  they shift slightly (hover `#0d3f7f` → `#144073`); Figma's sidebar variables need the same aliases (white at that
  opacity).
- `--border` and `--input` are foreground at 12% and 16% mixed with `transparent`, so they composite the same on every
  surface. Every hairline is 0.5px (`--default-border-width`).
- **Shadows**: `shadow-sm` is two soft shadows that deepen in Dark; `md`, `lg` and `xl` include it.
- **Controls** (input, textarea, select, native select, input group, combobox chips, checkbox, radio, outline button,
  outline toggle, OTP slot, active tab, attachment): `control` fill (white in Light), 0.5px `input` edge, `shadow-sm`. No transparent
  border: focus and invalid are a 1px inner ring plus the 3px halo, so text no longer shifts. 40px tall below 640px.
- **Attachment** (rc.2): the control recipe instead of a 0.5px border on `card`. Idle draws a dashed outline with no
  shadow; error turns the edge destructive; focus is the control's inner ring plus halo.
- **`TitledCard`** (skill composition, rc.2): each part owns its space. The card has no gap or vertical padding; the
  header is 56px (12px around its 2rem row), a table follows it directly, and padded content brings its own
  (`<CardContent className="pb-4">`). A collapsed card is just its header, with no padding added back. An app with a
  copy re-copies it, drops `className="pb-0"` / `"pb-3"` from its cards, and moves padding onto the content.
- **Avatar** (rc.2), from Sales Portal's `EntityAvatar`:
  - `shape="square"` for companies, products and teams (default `circle`, so existing avatars don't change). The root
    owns the radius (`rounded-lg`, `md` at `sm`, `sm` at `xs`) and the inner line, image and fallback inherit it. Drop
    any `rounded-*` classes that squared one by hand.
  - Sizes `xs` (20px) and `xl` (48px), matching the Figma Avatar; Code Connect maps every size one-to-one and renders
    `shape` from Figma's `Shape` property.
  - `AvatarImage` is a plain `img` over the fallback: the initials show at once, the picture fades in once loaded and
    the initials go, and a picture that fails leaves them. Give a logo `className="bg-white object-contain"`.
  - `colors={{ fill, text }}` colours the fallback inline (the app picks them, for example by record id); `empty` draws
    a dashed outline for no one.
  - **Behaviour change:** an avatar is hidden from screen readers unless it has `label`, which makes it `role="img"`
    with that name. One beside its name needs nothing; one standing alone needs `label` (an `alt` on `AvatarImage` no
    longer names it).
- **Disabled fields**: Light keeps full opacity with a 4% foreground fill and muted text; Dark fades to 50%.
- **Card**: 0.5px edge plus `shadow-sm`; title semibold.
- **Panels**: dialogs, alert dialogs, sheets and drawers use `background`, a 0.5px edge and `shadow-lg`. One overlay,
  black 10% / 50%, no blur. They open over 220ms and close over 150ms; dialogs scale from 97%; reduced motion only fades.
- **Sheet** (right side): floats 16px from the window, `rounded-xl`, 56px header, full screen below 640px.
- **Menus and popovers**: 0.5px `border` edge instead of `ring-foreground/10`.
- **Switch** thumb is white in both modes with the control edge.
- **Outline badge** has the control fill. **Ghost button** hovers with a 5% (Dark 10%) tint of the text colour.
- **Choice cards** (`FieldLabel` around a `Field`): control fill and edge; checked mixes 5% primary into the fill and 30%
  into the edge (Dark 10% and 20%).
- Separators are 0.5px. Avatars draw a 10% inner line instead of a blended border. Table header rows don't hover.
  Command items use `rounded-md`. Chart tooltips sit on `card`.
- Pointer cursor on everything clickable, including menu items and options. Number fields have no spin arrows.

### Added

- Tokens `--brand`, `--control`, `--overlay`, `--ghost-hover`, `--shadow-color`, `--shadow-depth`, `--shadow-base`,
  `--panel-in`, `--panel-out`, `--rail-duration`, `--rail-ease`; utilities `bg-control`, `bg-overlay`, `bg-brand`.
- Utilities `surface` and `control` for app markup.
- `aperia-ds5:design`, the design language for coding agents. From rc.2 it's the `design` skill of the `aperia-ds5`
  Claude Code plugin in this repo's marketplace (`.claude-plugin/marketplace.json`, `plugins/aperia-ds5`), updated by
  merging to `main` with no library release; the npm package keeps a copy under `plugins/` for Codex and Cursor. rc.1
  shipped it as `skills/aperia-app-design`, linked into `.claude/skills/`.
- **App shell** (rc.2), ported from Sales Portal, so no app's agent rebuilds it: `AppSidebar` (brand, `AppSidebarSearch`
  with ⌘K, pages, `AppSidebarNotifications`, account menu), `AppHeader` (sidebar toggle and breadcrumb only),
  `PageHeader` (title that fills the last crumb, subtitle, actions, `properties`), `PageCrumb`, `PageProperty`,
  `RecordActions` (header buttons that fold into More actions below lg) and `BlockedMenuItem`. Routes, the router's
  `link` and the user come in as props; nothing imports Next.js. Stories: UI/App Shell.
- `opensOnClick` and `openable` (rc.2): props that make a `TableRow` open its record; `[data-opens]` gets the pointer.
- Skill (rc.2): the shell components replace the shell prose; rules against internal labels (MVP, Demo Data), colour
  as the only signal, Show / Hide buttons (`TitledCard` gets `collapsible`) and a line between a card's header and its
  table; a screenshot review in `SKILL.md`.
- Skill (rc.2): component pages written for everyone, not only developers, in the style of the DS4 documentation:
  `components/` (Button, Card, Dialog, Empty State, Table: when to use, types, Do / Don't, what each works with,
  accessibility, specs) and `practices/buttons.md` (Button Best Practices). Agents read them before placing that
  component.
- Storybook **Design Language** section (rc.2): the skill's `SKILL.md` and references rendered from the skill files,
  with live examples under the rules (the app shell under Pages, the compositions under Cards, Forms and more).
- Skill (rc.2), from Sales Portal's blind test: a missing value is an em dash (—), not `-` (UI Style Guide V4.3,
  p.11); phone numbers, emails and websites read as plain text in the body colour, links only where tapping does
  something (`tel:`, `mailto:`, the website), underlined on hover.
- Storybook renders in Inter, the font Aperia apps set through `--font-sans`, instead of Storybook's own Nunito Sans
  (rc.2). The library still sets no font: apps keep setting `--font-sans`, and the skill's Foundations now says so.

### Not in the library

Status colours, the amber warning alert and access-level colours stay in each app (style `Badge` and `Alert` through
`className`). Sales Portal also keeps, for now: the segmented toggle-group track, read-only fields, stacked sheets, sidebar
fine-tuning, destructive button colours in Dark.

### Figma

Code Connect points at "Aperia Shadcn Library (Enhanced)" (`uXivJU4N3R0LWu0mbimHWt`). Removed from the Figma library
because the code has no such prop (Swap library keeps working for everything else): menu `Color=Inverted` and
`Appearance=Translucent`, item `State=Hover (Translucent)`, Badge `Variant=Verified`, Alert `Variant=Warning`, Accordion
`Variant=Border`, ButtonGroup `Variant`, Toggle Group `Type=Fill`, and the status-colour variables.
