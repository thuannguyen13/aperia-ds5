# Changelog

## 0.3.0 (release candidate)

The shared Aperia look moves into the library, from Sales Portal's `globals.css`, and matches the Figma library
"Aperia Shadcn Library (Enhanced)". An app now sets only its brand slots.

### Upgrade an app

1. `npm install aperia-ds5@0.3.0`.
2. In `globals.css`, keep `@import "tailwindcss"`, `@import "aperia-ds5/base.css"` and the `@source` line. Delete every
   override of a shared token and every `[data-slot=…]` rule the library now covers (below). Keep only the brand slots:
   copy `skills/aperia-app-design/assets/brand.example.css`.
3. Link the agent skill: see README, Agent skill.
4. Compare the app before and after in Light, Dark and at phone width.

### Changed

- **Tokens** (`base.css`): Sales Portal's values. Page `oklch(0.975 0.002 286)`, cards white, darker muted and muted
  text (`#66666e`), destructive `#c10007` / `#ff8a8c`, accent equals muted, Dark surfaces on hue 286.
- **Primary** is `#0058cc` in both modes, white text. Light sidebar is the navy `--brand` (`#002f67`).
- `--border` and `--input` are foreground at 12% and 16% mixed with `transparent`, so they composite the same on every
  surface. Every hairline is 0.5px (`--default-border-width`).
- **Shadows**: `shadow-sm` is two soft shadows that deepen in Dark; `md`, `lg` and `xl` include it.
- **Controls** (input, textarea, select, native select, input group, combobox chips, checkbox, radio, outline button,
  outline toggle, OTP slot, active tab): `control` fill (white in Light), 0.5px `input` edge, `shadow-sm`. No transparent
  border: focus and invalid are a 1px inner ring plus the 3px halo, so text no longer shifts. 40px tall below 640px.
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
- `skills/aperia-app-design`: the design language for coding agents, shipped in the package.

### Not in the library

Status colours, the amber warning alert and access-level colours stay in each app (style `Badge` and `Alert` through
`className`). Sales Portal also keeps, for now: the segmented toggle-group track, read-only fields, stacked sheets, sidebar
fine-tuning, destructive button colours in Dark.

### Figma

Code Connect points at "Aperia Shadcn Library (Enhanced)" (`uXivJU4N3R0LWu0mbimHWt`). Removed from the Figma library
because the code has no such prop (Swap library keeps working for everything else): menu `Color=Inverted` and
`Appearance=Translucent`, item `State=Hover (Translucent)`, Badge `Variant=Verified`, Alert `Variant=Warning`, Accordion
`Variant=Border`, ButtonGroup `Variant`, Toggle Group `Type=Fill`, and the status-colour variables.
