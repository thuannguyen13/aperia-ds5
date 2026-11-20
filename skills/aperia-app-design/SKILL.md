---
name: aperia-app-design
description: The shared design language of Aperia's internal apps built on aperia-ds5 (shadcn/ui on Tailwind v4): its look, motion, layout patterns and UI copy, with each app keeping its own brand (sidebar colour, logo, charts, status colours). Use whenever building, changing or reviewing any screen, component, page or style in an Aperia app, before writing the UI, and again before calling a UI change done.
---

# Aperia App Design

Every Aperia app speaks one design language and wears its own brand. This skill tells you what is shared and what an
app may set for itself. Defaults from shadcn/ui are not this language: where this skill and a default differ, this skill
wins.

## Spirit

- **Calm and dense.** It's a work tool used all day. Content is the loudest thing on screen. Chrome is quiet: hairline
  edges, soft shadows, muted labels, one accent colour: the shared blue primary.
- **One way to do each thing.** The same concept gets the same control everywhere in the app.
- **Nothing moves unexpectedly.** Layouts don't shift when data lands, panels ease in and out, and empty cards keep their
  place.
- **Say only what the user needs to act.** No narrative, no explaining the system, no marketing tone.
- **Alignment is the taste.** Content and box edges line up across containers, to the pixel.

When a case isn't covered here, choose what keeps these five true.

## What the app owns: its brand

An app sets **only** these. The full list and how to set them are in
[references/brand-slots.md](references/brand-slots.md).

- The **brand colour** (`--brand`), which fills the sidebar in light mode, and the sidebar's logo and product name.
- Its **chart palette**, if it draws charts.
- Its **status colours**, if it shows states: tinted pairs applied to `Badge` and `Alert` through `className`.

Everything else is shared and comes from `aperia-ds5`: the primary (`#0058cc` in both modes), neutrals, surfaces, edges,
shadows, overlay, motion, density, alignment, patterns and copy. Don't restyle these per app. If the app's CSS overrides one, that override is drift.

## Order of work

1. **Check the app's CSS:** `aperia-ds5/base.css` imported after Tailwind, then the app's brand file
   ([assets/brand.example.css](assets/brand.example.css) is the model) and nothing else that restyles shared tokens or
   `data-slot`s. Fix that first.
2. **Find the sibling.** Before adding any control, find where the app already shows the same concept (an empty list, a
   delete, a picker, a person, a status). Use that pattern. If two differ, propose one and convert both.
3. **Use the compositions**, not raw primitives. `assets/components/` has portable ones (`EmptyState`, `IconButton`,
   `TitledCard`, `StatTile`, `FormSection`). Copy them in if the app lacks them.
4. **Apply the invariants** below. The detail is in [references/foundations.md](references/foundations.md) and
   [references/patterns.md](references/patterns.md).
5. **Write the copy** by [references/copy.md](references/copy.md).
6. **Measure alignment** in the browser (`getBoundingClientRect`). Check both themes and phone width.
7. **Run the checklist** at the end, and the drift table in [references/drifts.md](references/drifts.md).

## Invariants

1. **No 1px borders on surfaces.** Cards, fields, outline buttons and the selected tab have a 0.5px edge plus two soft
   shadow. The aperia-ds5 components already have it; for your own markup use the `surface` (cards, a table or empty
   state on the page) and `control` utilities. Never put a bordered box inside a bordered card: a table sits flush in
   its card.
2. **The page is light grey and cards are white.** Sheets and dialogs share one fill.
3. **One overlay for every floating panel:** 10% black, 50% in dark mode. **Never blur.** Dialogs, alerts and sheets look
   alike.
4. **Motion eases out:** panels open over 220ms on `cubic-bezier(0.32, 0.72, 0, 1)` and close over 150ms, a dialog
   growing from 97%. Reduced motion only fades. Nothing pops in or snaps shut.
5. **Card headers come from one component** (`TitledCard`): title, optional figure and action on one 2rem row, so every
   card's first line aligns. Card titles are semibold and smaller than the page title.
6. **Empty means `EmptyState`:** an icon and "No [Items]". A second line only when it says what the title can't (whose,
   which range, what to do). Never bare text, and never a line that repeats the title.
7. **Every record's picture comes from one component:** a person their photo or initials in a circle, a company or
   product its logo or monogram on a rounded square. Pictures have no frame (no ring, border or shadow).
8. **Icon-only buttons always have a tooltip** naming the action (`IconButton`). A disabled button with a reason stays
   focusable and its tooltip says why.
9. **Status colour means state,** from the app's tinted pairs (a pale fill with deep text). Never use it to decorate,
   and never use solid primary buttons as status pills.
10. **Tables show, sheets edit.** A row opens its record. Edit and Delete live on the record page, not the row.
11. **Errors in place:** a refused save shows beside its field, or above the buttons. The form stays open with what was
    typed. No toast for errors.
12. **Title Case** for titles, headings, tabs, table headers, labels and buttons. Sentence case for sentences,
    descriptions and values.
13. **Everything clickable shows the pointer,** rows and menu items included.
14. **Phones get 40px targets** (32px on desktop), and sheets fill the screen.
15. **Vertical alignment holds across containers:** icons, pictures, headings, text and footers in one column share an x.
16. **Use aperia-ds5 components directly.** Don't wrap them, copy them in, or restyle them with `data-slot` CSS. A look
    that's wrong everywhere is fixed in aperia-ds5 (an issue there), not in the app.

## Checklist before calling UI done

- [ ] The only colours the app overrides are its brand slots, and no app CSS restyles an aperia-ds5 component.
- [ ] No 1px border on a surface, and no bordered box inside a card.
- [ ] Every empty or no-match state is `EmptyState`, and its second line adds something.
- [ ] Every icon-only button has a tooltip.
- [ ] Every record picture comes from the one picture component, with no frame.
- [ ] Panels use the shared overlay and motion, with no blur.
- [ ] Shared lines are measured in the browser, not eyeballed. Both themes and phone width are checked.
- [ ] Copy has no narrative, uses the app's words and is Title Case where it should be.
- [ ] The concept matches its sibling elsewhere in the app.
