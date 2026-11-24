--- name: design description: The shared design language of Aperia's internal apps built on aperia-ds5 (shadcn/ui on
Tailwind v4): its look, motion, layout patterns and UI copy, one structure for every app (the same sidebar, primary,
shell and patterns), each app keeping only its logo, name, charts and status colors. Use whenever building, changing or
reviewing any screen, component, page or style in an Aperia app, before writing the UI, and again before calling a UI
change done. ---

# Aperia App Design

Every Aperia app shares one structure and one design language: the same sidebar, primary, shell, patterns and
interactions. Apps differ in their features, not their look. This skill tells you what is shared and the little an app
sets for itself. Defaults from shadcn/ui are not this language: where this skill and a default differ, this skill
wins.

**Version.** This skill is written for **aperia-ds5 0.3.x** (0.3.0-rc.2 and later). It is delivered separately from the
library, so first read `version` in the app's `node_modules/aperia-ds5/package.json`. If it is older, or a component
this skill names (such as `AppSidebar` or `opensOnClick`) is not exported, tell the user to upgrade aperia-ds5 before you
follow the component guidance; the look, copy and review rules still apply.

## Spirit

- **Calm and dense.** It is a work tool used all day. Content is the loudest thing on screen. Chrome is quiet: hairline
  edges, soft shadows, muted labels, one accent color: the shared blue primary.
- **One way to do each thing.** The same concept gets the same control everywhere in the app.
- **Nothing moves unexpectedly.** Layouts do not shift when data lands, panels ease in and out, and empty cards keep
  their place.
- **Say only what the user needs to act.** No narrative, no explaining the system, no marketing tone.
- **Alignment is the taste.** Content and box edges line up across containers, to the pixel.

When a case is not covered here, choose what keeps these five true.

## What the app owns

An app sets **only** these ([styles/color.md](styles/color.md), What an app can change).

- Its **logo and product name**, in the sidebar's top row. The sidebar itself is the shared Aperia navy.
- Its **chart palette**, if it draws charts.
- Its **status colors**, if it shows states: tinted pairs applied to `Badge` and `Alert` through `className`.

Everything else is shared and comes from `aperia-ds5`: the primary, neutrals, surfaces, edges, shadows, overlay, motion,
density, alignment, patterns and copy. Do not restyle these per app. If the app's CSS overrides one, that override is
drift.

## The pages

Every rule lives on one page; read the page before placing what it covers. Values live only in `aperia-ds5/base.css`.
The pages are in six sections, the same as the Storybook sidebar.

- **Get Started**: [Overview](overview.md), [For Designers](get-started/for-designers.md) and
  [For Developers](get-started/for-developers.md).
- **Foundations** (rules across every screen): [Accessibility](foundations/accessibility.md); Layout: [Page
  Layout](foundations/page-layout.md), [Spacing](foundations/spacing.md), [Sizes](foundations/sizes.md); Content Design:
  [Copy](foundations/copy.md), [Message Templates](foundations/copy-templates.md), [Money and
  Numbers](foundations/money-and-numbers.md); States: [Loading](foundations/loading.md), [Empty
  States](foundations/empty-states.md), [Disabled With a Reason](foundations/disabled-with-a-reason.md).
- **Styles** (the visual values): [Color](styles/color.md), [Typography](styles/typography.md),
  [Border and Radius](styles/border-and-radius.md), [Elevation](styles/elevation.md), [Motion](styles/motion.md),
  [Icons](styles/icons.md).
- **Components** (one building block in depth; every other building block's props and live examples are in
  Storybook): [Button](components/button.md), [Card](components/card.md), [Dialog](components/dialog.md),
  [Table](components/table.md). A pattern's components (such as `ListToolbar` or `ReasonTooltip`) are on that pattern's
  page.
- **Patterns** (how components combine into the parts of a screen; whole screens are in Examples): Navigation:
  [App Shell](patterns/app-shell.md), [Search](patterns/search.md), [Notifications](patterns/notifications.md); Content:
  [Page Header](patterns/page-header.md), [Cards and Tiles](patterns/cards-and-tiles.md), [Details](patterns/details.md),
  [History](patterns/history.md), [People and Pictures](patterns/people-and-pictures.md); Lists:
  [List Toolbar](patterns/list-toolbar.md), [Filters](patterns/filters.md), [Sort](patterns/sort.md), [Paging](patterns/paging.md),
  [Tables](patterns/tables.md), [Reordering](patterns/reordering.md); Editing:
  [Buttons and Actions](patterns/buttons-and-actions.md), [Forms in Sheets](patterns/forms-in-sheets.md),
  [Pickers](patterns/pickers.md), [Confirmations and Delete](patterns/confirmations-and-delete.md),
  [Files and Images](patterns/files-and-images.md), [Switches in a Grid](patterns/switches-in-a-grid.md).
- **Examples** (screens an app builds from the patterns, with before and after): Lists: [List
  Page](examples/list-page.md), [Board of Cards](examples/board.md), [Audit
  Log](examples/audit-log.md), [Search and Notifications](examples/search-and-notifications.md); Records: [Record
  Page](examples/record-page.md), [Notes on a Record](examples/notes.md), [Task Checklist](examples/task-checklist.md),
  [Status Change With a Reason](examples/status-change.md), [Line Items With Totals](examples/line-items.md); Settings:
  [Roles and Permissions](examples/roles-and-permissions.md), [Editable Option List](examples/option-list.md); Data and
  Charts: [Import Wizard](examples/import.md), [Date Range](examples/date-range.md), [Funnel
  Chart](examples/funnel-chart.md).

## Order of work

1. **Check the app's CSS:** `aperia-ds5/base.css` imported after Tailwind, then the app's brand file
   ([assets/brand.example.css](assets/brand.example.css) is the model) and nothing else that restyles shared tokens or
   `data-slot`s. Fix that first.
2. **Find the sibling.** Before adding any control, find where the app already shows the same concept (an empty list, a
   delete, a picker, a person, a status). Use that pattern. If two differ, propose one and convert both.
3. **Use the shell and the compositions**, not raw primitives. The shell ships in aperia-ds5: `AppSidebar`,
   `AppHeader`, `AppContent` (the page column, 20px between sections), `PageHeader` with `RecordActions`, and
   `opensOnClick` for rows (wiring in [App Shell](patterns/app-shell.md)). Never rebuild the sidebar, top bar or page
   header. The system-wide patterns ship in aperia-ds5 too, each named in its pattern page's In code:
   - cards and values: `EmptyState`, `NoResults`, `RelativeTime`;
   - lists: `ListToolbar` (search, filters, Sort, the list's actions), `SortControl`, `ListPager` (the count and pages), `DayRangeFields`;
   - forms and confirms: `FormSheet`, `SheetForm`, `SheetDelete`, `ConfirmDialog`, `EntityPicker`, `PickField`,
     `DraftField`, `AddOption`, `MoneyInput`, `FileDrop`, `FilePicker`, `ImagePicker`, `SortableList`, `ReasonTooltip`;
   - formatters in `aperia-ds5/format` (dates, times, money, "3d ago"), and sorting, filtering and paging in
     `aperia-ds5/list`.
   Use them; never rebuild or copy one in the app. When the app needs a system-wide pattern the library lacks, raise
   it on aperia-ds5.
   Everything else is a recipe the app builds from plain aperia-ds5 components, written on its owner page:
   - the titled card on [Card](components/card.md) and the icon button on [Button](components/button.md);
   - the stat tile on [Cards and Tiles](patterns/cards-and-tiles.md), and the form section and length count on
     [Forms in Sheets](patterns/forms-in-sheets.md);
   - the empty value and "No [field]" text on [Empty States](foundations/empty-states.md), and the money value
     and hidden value on [Money and Numbers](foundations/money-and-numbers.md);
   - the detail section, detail row, and fact on [Details](patterns/details.md), and the timeline and history card on
     [History](patterns/history.md);
   - the scroll table and table group row on [Tables](patterns/tables.md), the people stack on
     [People and Pictures](patterns/people-and-pictures.md), the list skeleton on [Loading](foundations/loading.md), and
     the flag switch on [Switches in a Grid](patterns/switches-in-a-grid.md).
   Build a recipe once in the app and reuse it on every screen; never import it from aperia-ds5, which does not ship
   it. Feature patterns (status changes, notes, boards, import wizards, settings lists) are
   built in the app from these parts, the way the Examples pages show.
4. **Apply the invariants** below, and the page for what you are placing: its pattern page, and its component page when
   there is one. [Buttons and Actions](patterns/buttons-and-actions.md) says where buttons go.
5. **Write the copy** by [Copy](foundations/copy.md), with the fixed wording in
   [Message Templates](foundations/copy-templates.md).
6. **Measure alignment** in the browser (`getBoundingClientRect`). Check both themes and phone width.
7. **Review a screenshot** of every screen you changed, in Light and Dark, against the screenshot review below.
8. **Run the checklist** at the end. Each pattern page's Don'ts are the mistakes to look for.

## Invariants

1. **No 1px borders on surfaces.** Cards, fields, outline buttons and the selected tab have a 0.5px edge plus two soft
   shadow. The aperia-ds5 components already have it; for your own markup use the `surface` (cards, a table or empty
   state on the page) and `control` utilities. Never put a bordered box inside a bordered card: a table sits flush in
   its card.
2. **The page is light gray and cards are white.** Sheets and dialogs share one fill.
3. **One overlay for every floating panel** (`--overlay`). **Never blur.** Dialogs, alerts and sheets look alike.
4. **Motion eases out:** panels open and close on the shared timing ([Motion](styles/motion.md)), a dialog growing
   slightly as it opens. Reduced motion only fades. Nothing pops in or snaps shut.
5. **Card headers come from one recipe**, the titled card on [Card](components/card.md): title, optional figure and
   action on one 2rem row, so every card's first line aligns. The header, content and footer each hold their own
   space (the header its height, the content its padding), never a gap on the card. Card titles are semibold and smaller than the page title.
6. **Empty means `EmptyState`:** an icon and "No [Items]". A second line only when it says what the title cannot (whose,
   which range, what to do). Never bare text, and never a line that repeats the title.
7. **Every record's picture is the ds5 `Avatar`.** People are circles; companies, products and teams are
   `shape="square"`. A photo or logo goes in `AvatarImage`, the initials in `AvatarFallback`. Pictures have no frame
   (no ring, border or shadow), and never a `rounded-*` class to square one by hand.
8. **Icon-only buttons always have a tooltip** naming the action (the icon button recipe on
   [Button](components/button.md)). A disabled button with a reason stays
   focusable and its tooltip says why.
9. **Status color means state,** from the app's tinted pairs (a pale fill with deep text). Never use it to decorate,
   and never use solid primary buttons as status pills.
10. **Tables show, sheets edit.** A row opens its record. Edit and Delete live on the record page, not the row.
11. **Errors in place:** an error shows where its action happened, such as beside its field, above a form's or dialog's
    buttons, or above the grid for a control that saves on change. The form stays open with what was typed. A toast
    shows an error only when nothing on screen holds it, and then it stays until closed. See Message Templates.
12. **Title Case** for titles, headings, tabs, table headers, labels and buttons. Sentence case for sentences,
    descriptions and values.
13. **Everything clickable shows the pointer,** rows and menu items included.
14. **Controls keep their size on a phone** (32px, icon buttons 28px), and sheets fill the screen.
15. **Vertical alignment holds across containers:** icons, pictures, headings, text and footers in one column share an
    x. A card's content starts on its title's line; a part with its own padding (a hover row, a ghost button) takes an
    equal negative margin to stay on it. Indents only show hierarchy ([Page Layout](foundations/page-layout.md)).
16. **Use aperia-ds5 components directly.** Do not wrap them, copy them in, or restyle them with `data-slot` CSS. A look
    that is wrong everywhere is fixed in aperia-ds5 (an issue there), not in the app.

## Screenshot review

Take a screenshot of the screen, in Light and in Dark, and look at it as a user would. Each line must hold before the
screen is done; fix what fails and look again.

Run the app (`npm run dev`) and take the screenshots with any browser you can drive: Chrome or Chromium headless
(`--headless=new --screenshot=out.png --window-size=1440,1000 <url>`, adding
`--blink-settings=preferredColorScheme=0` for Dark, since `ThemeProvider` follows the system), or Playwright if the project has it. Take one at phone width (390px) too. If no browser can run
where you work, do not call the screen done: end your reply by saying the screenshot review did not run, and list the
lines below for the user to check in their browser.

- [ ] **The top bar holds the breadcrumb only** (and the sidebar toggle on a phone): no title, status chips, dates,
      filters or buttons.
- [ ] **One title.** The page names itself once, in `PageHeader`; it is not repeated in the top bar or a card.
- [ ] **Rows open records.** A click anywhere on a row opens it. No per-row "Open" or "View" button, and no row whose
      name alone is a link.
- [ ] **Cards use the titled card recipe.** No card draws its own header, and a collapsible card uses its disclosure,
      not Show / Hide text buttons. A table in a card starts with its column headings, not a line.
- [ ] **No internal labels.** Nothing says MVP, Not in MVP, Phase, Demo Data or Mock.
- [ ] **Color is not the only signal.** Every colored count, dot or cell also has a word, icon or badge, or a legend.
- [ ] **Light and Dark both checked**, and the screen holds at phone width.

## Checklist before calling UI done

- [ ] The only colors the app sets are its status and chart colors, and no app CSS restyles an aperia-ds5 component.
- [ ] No 1px border on a surface, and no bordered box inside a card.
- [ ] Every empty or no-match state is `EmptyState`, and its second line adds something.
- [ ] Every icon-only button has a tooltip.
- [ ] Every record picture comes from the one picture component, with no frame.
- [ ] Panels use the shared overlay and motion, with no blur.
- [ ] Shared lines are measured in the browser, not eyeballed. Both themes and phone width are checked.
- [ ] Copy has no narrative, uses the app's words and is Title Case where it should be.
- [ ] The concept matches its sibling elsewhere in the app; no new control for a concept the app already shows.
- [ ] No app-built or copied version of a library pattern (its own card header, empty state, toolbar, sort, sheet form,
      confirm, picker, money field or "x days ago"): the aperia-ds5 component instead.
- [ ] UI text follows [Copy](foundations/copy.md): no contractions, "No [Items]", confirms as questions, amounts in
      full.
