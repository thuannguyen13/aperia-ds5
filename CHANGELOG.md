# Changelog

## 0.3.0 (release candidate: rc.2)

The shared Aperia look moves into the library, from Sales Portal's `globals.css`, and matches the Figma library
"Aperia Shadcn Library (Enhanced)". An app now sets only its status and chart colors.

### Upgrade an app

1. `npm install aperia-ds5@0.3.0`.
2. In `globals.css`, keep `@import "tailwindcss"`, `@import "aperia-ds5/base.css"` and the `@source` line. Delete every
   override of a shared token and every `[data-slot=…]` rule the library now covers (below). Keep only the app's status and chart colors:
   copy `plugins/aperia-ds5/skills/design/assets/brand.example.css`.
3. Run `npx aperia-ds5 init` in the app and commit what it writes: it enables the `aperia-ds5:design` skill for Claude
   Code, adds the lines to `CLAUDE.md` and `AGENTS.md`, and removes rc.1's `.claude/skills/aperia-app-design` link. Each
   teammate installs the plugin once: README, Agent skill.
4. Compare the app before and after in Light, Dark and at phone width.

### Changed

- **Tokens** (`base.css`): Sales Portal's values. Page `oklch(0.975 0.002 286)`, cards white, darker muted and muted
  text (`#66666e`), destructive `#c10007` / `#ff8a8c`, accent equals muted, Dark surfaces on hue 286.
- **Primary** is `#0058cc` in both modes, white text. The Light sidebar is the navy `#002f67`, set on `--sidebar` itself.
- **One sidebar, shadcn's tokens** (rc.2): there's no `--brand` token any more. `--sidebar` and
  `--sidebar-primary-foreground` hold the navy themselves, and in Light `--sidebar-accent`, `--sidebar-border` and
  `--sidebar-ring` are white at 8%, 15% and 60% over it. Every app has the same sidebar: delete `--brand` and any
  `--sidebar-*` from the app's CSS (Titan's `#002454` goes). On the navy the steps shift slightly (hover `#0d3f7f` →
  `#144073`).
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
  - `colors={{ fill, text }}` colors the fallback inline (the app picks them, for example by record id); `empty` draws
    a dashed outline for no one.
  - **Behavior change:** an avatar is hidden from screen readers unless it has `label`, which makes it `role="img"`
    with that name. One beside its name needs nothing; one standing alone needs `label` (an `alt` on `AvatarImage` no
    longer names it).
- **Disabled fields**: Light keeps full opacity with a 4% foreground fill and muted text; Dark fades to 50%.
- **Card**: 0.5px edge plus `shadow-sm`; title semibold.
- **Panels**: dialogs, alert dialogs, sheets and drawers use `background`, a 0.5px edge and `shadow-lg`. One overlay,
  black 10% / 50%, no blur. They open over 220ms and close over 150ms; dialogs scale from 97%; reduced motion only fades.
- **Sheet** (right side): floats 16px from the window, `rounded-xl`, 56px header, full screen below 640px.
- **Menus and popovers**: 0.5px `border` edge instead of `ring-foreground/10`.
- **Switch** thumb is white in both modes with the control edge.
- **Outline badge** has the control fill. **Ghost button** hovers with a 5% (Dark 10%) tint of the text color.
- **Choice cards** (`FieldLabel` around a `Field`): control fill and edge; checked mixes 5% primary into the fill and 30%
  into the edge (Dark 10% and 20%).
- Separators are 0.5px. Avatars draw a 10% inner line instead of a blended border. Table header rows don't hover.
  Command items use `rounded-md`. Chart tooltips sit on `card`.
- Pointer cursor on everything clickable, including menu items and options. Number fields have no spin arrows.

### Added

- Tokens `--control`, `--overlay`, `--ghost-hover`, `--shadow-color`, `--shadow-depth`, `--shadow-base`,
  `--panel-in`, `--panel-out`, `--rail-duration`, `--rail-ease`; utilities `bg-control`, `bg-overlay`.
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
- **One structure for every app** (rc.2): every Aperia app has the same sidebar and primary; an app sets only its
  status and chart colors. `brand.example.css` holds just those.
- **Aperia patterns in the library** (rc.2): the patterns every app built for itself now ship in aperia-ds5, so apps
  import them instead of building or copying their own. Ported from Sales Portal:
  - `TitledCard`, `StatTile`, `EmptyState`, `IconButton`, `FormSection`, which the skill used to have apps copy in
    from `assets/components` (gone). An app with a copy deletes it and imports from `aperia-ds5`.
  - `EmptyValue` (a muted —), `NoneText` ("No priority"), `HiddenValue` ("$XX,XXX" for a hidden amount),
    `ReasonTooltip` (why something can't be used), `useFieldNote` and `describedBy`, `LengthCount`, `Fact`,
    `DetailRow`, `DetailSection`, `ScrollTable`, `TableGroupRow`.
  - `aperia-ds5/format`: `formatDate` (09/22/2026), `formatMoment` (with the zone), `ago` ("3d ago"),
    `dayRangeLabel`, `money`, `percent`, `plural`, `listed`, `initials` and day helpers, in Dallas time by default.
  - Sheets and confirms: `FormSheet` and `SheetForm` (errors beside their fields, a save spinner, Discard Changes?
    before closing a typed form), `useSheetForm`, `useSheet`, `combineForms`, `SheetDelete` (its own confirm, a reason
    when it can't delete), `ConfirmDialog` (named by its action, returns focus), and the focus helpers
    `returnFocus`, `useReturnFocus`, `OpenerReturnsFocus`, `keepScroll`, `useEscapeClosesList`.
  - Records: `RelativeTime` ("3d ago", the full date on hover), `Timeline` with `TimelineEntry`, `TimelineSaid` and
    `TimelineWhen`, `RecordActivity` (the latest ten, View All in a sheet), `PeopleStack` (three avatars, then +N).
  - Inputs and files: `MoneyInput` and `MoneyField`, `FileDrop`, `FilePicker` (built on `Attachment`) with
    `fileSize` and `fileRefusal`, `ImagePicker` and `ImagePreview`, `FlagSwitch`, `SortableList` and `SortableRow`
    (adds `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`), `draftKey`.
  - Lists: `ListToolbar`, a list's one toolbar (scope slot, search, filters, count, Sort). Filters use one model
    (`FilterField`, `FilterRule`, `filterRows`) in two forms: chips the user builds by column, operator and value
    (the default, "MC Band is High, Critical"), or fixed dropdowns for a list with few filters. On a phone they become
    a Filters button with a sheet and clearable chips. `NoResults` ships beside it. `SortControl` with `sortRows` and
    `UNSORTED` (one Sort per list; empty values sort lowest; `size="sm"` in a card's header, before Add, and
    `TitledCard`'s `action` now spaces several actions), `DayRangeFields`, and `ListSkeleton` (the page's
    loading state in its own shape). The pure sort and filter helpers are also in `aperia-ds5/list` for server pages.
  - `MoneyValue`: an amount as V4.3 shows it: tabular, a negative in red parentheses, an em dash for none.
  - Pickers: `EntityPicker` (records with their `Avatar`, search, reasons, Add from inside the picker),
    `PickField`, `DraftField`, `AddOption`, and `useAdded`, `useAdding`, `useRefusedDraft` so one record form works
    on its page and from a picker.
- **UI copy follows the UI Style Guide V4.3** (rc.2): no contractions in UI text (`IN_USE_DELETE` reads "This item is
  in use and cannot be deleted."), `money()` writes a negative in parentheses ("($125.50)") and shows cents only when the amount has
  them ("$1,250", "$12.50"; `cents: true` or `false` forces one form, and `MoneyValue` follows it), and `listed()` uses
  the serial comma ("Acme, Globex, and Initech"). The design skill's Foundations › Copy page is now the one source for UI copy.
- `AppContent` and `FullWidth` (rc.2), from Sales Portal's layout: the page's scroll and column inside `AppHeader`, 20px
  around it, centered up to 1440px, 20px between the page's sections; `<FullWidth />` lets a board fill the pane. The
  skill gains DS4's spacing system (Foundations, Spacing). Found in the blind test, where agents copied the README's
  bare `p-5` wrapper and stacked the title, search and table with no space.
- Skill (rc.2), from the blind test: content in a card starts on the title's line, a part with its own padding takes
  an equal negative margin to stay on it (`<Item className="-mx-3">`), and indents only show hierarchy.
- `opensOnClick` and `openable` (rc.2): props that make a `TableRow` open its record; `[data-opens]` gets the pointer.
- Skill (rc.2): the shell components replace the shell prose; rules against internal labels (MVP, Demo Data), color
  as the only signal, Show / Hide buttons (`TitledCard` gets `collapsible`) and a line between a card's header and its
  table; a screenshot review in `SKILL.md`.
- **Design language docs** (rc.2), written for designers, POs and PMs first and agents second, and the one source of
  truth: the skill's pages are what Storybook's Design Language section shows and what agents read.
  - **Foundations:** Color (with what an app can change, replacing Brand Slots), Typography, Spacing, Shape and Edges,
    Elevation, Motion, Sizes, Icons, Copy and Message Templates (the one source for UI copy, built on the UI Style
    Guide V4.3). Values are shown live from `base.css`, never copied into the text.
  - **Patterns:** one page each for how things fit and behave: App Shell, Page Layout, Page Header, List Page, Filters,
    Sort, Tables, Loading, Empty and Missing, Record Page, Forms in Sheets, Confirmations and Delete, Pickers, Disabled
    With a Reason, Money and Numbers, Files and Images, Reordering, Switches in a Grid, Buttons and Actions (replacing
    Button Best Practices), Cards and Tiles, People and Pictures, Search, Notifications.
  - **Components:** Button, Card, Dialog, Empty State, Table.
  - **Examples:** screens apps build from the patterns, each with a before / after: List Page, Record Page, Saved Views,
    Status Change With a Reason, Notes, Board, Line Items, Import, Date Range, Task Checklist, Roles and Permissions,
    Option List, Audit Log, Funnel Chart, Search and Notifications.
  - Every page: what it is, when to use it, what's available, how it looks and behaves, rules as Do / Don't, when you
    can do it differently, works with, then In code. The old references, Brand Slots, Drifts and Best Practices pages
    are gone; their rules moved to these pages, and each mistake is a Don't on its page.
- Skill (rc.2), from Sales Portal's blind test: a missing value is an em dash (—), not `-` (UI Style Guide V4.3,
  p.11); phone numbers, emails and websites read as plain text in the body color, links only where tapping does
  something (`tel:`, `mailto:`, the website), underlined on hover.
- `npx aperia-ds5 init` (rc.2): sets an app up for coding agents (plugin settings, `CLAUDE.md`, `AGENTS.md`), adding only
  what is missing. The package description, README and type definitions tell agents to run it and read the skill.
- Storybook renders in Inter, the font Aperia apps set through `--font-sans`, instead of Storybook's own Nunito Sans
  (rc.2). The library still sets no font: apps keep setting `--font-sans`, and the skill's Foundations now says so.

### Not in the library

Status colors, the amber warning alert and access-level colors stay in each app (style `Badge` and `Alert` through
`className`). Sales Portal also keeps, for now: the segmented toggle-group track, read-only fields, stacked sheets, sidebar
fine-tuning, destructive button colors in Dark.

### Figma

Code Connect points at "Aperia Shadcn Library (Enhanced)" (`uXivJU4N3R0LWu0mbimHWt`). Removed from the Figma library
because the code has no such prop (Swap library keeps working for everything else): menu `Color=Inverted` and
`Appearance=Translucent`, item `State=Hover (Translucent)`, Badge `Variant=Verified`, Alert `Variant=Warning`, Accordion
`Variant=Border`, ButtonGroup `Variant`, Toggle Group `Type=Fill`, and the status-color variables.
