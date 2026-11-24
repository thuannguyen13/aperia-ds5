# Titan and Sales Portal

This example sets three screens of two Aperia apps, Titan and Sales Portal, as each app styles them today beside the
same screens built from aperia-ds5.

## When to use

Use this page to see what aperia-ds5 changes in an existing app, and to show a team why its app moves to it. Each
screen below shows the two apps before, styled on their own, and after, built from the library. After, the two apps
share one sidebar, one page header, one toolbar, and one table, and each keeps only its own name, logo, pages, and
data.

## How it looks and behaves

Each comparison shows one kind of screen in one app at a time, its Before above its After. Titan and Sales Portal switch
the app, and Desktop and Phone switch the width. On a phone, Before and After sit side by side. Selecting a frame opens
it at full size.

### The home screen

Titan opens on Queue View, a table of detection queues. Sales Portal opens on its Dashboard, a row of figures and a
pipeline chart. After, both pages start with the same page header, and their figures and tables sit in the same cards
and boxes.

### A list

Titan's Merchant View and Sales Portal's Prospects are both a list of records. After, both use the list toolbar, with the
search and filters on the left and Sort on the right. Their rows open the record, and the count and pages sit under the
table.

### A record

Titan's merchant page and Sales Portal's prospect page both show one record. After, both use the record's page header
with its picture, title, facts, and actions, and their details sit in titled cards.

## Before and after

- **Before:** Titan puts a "Report Date:" label, a "View:" picker, and an Edit View link in the toolbar. Its names are
  blue links with a "DQ Details" pill, its table has a sticky Actions column that hides the last figures, and its pager
  adds Rows per page. On a phone, its search runs off the screen and the record's button overflows the header.
- **Before:** Sales Portal shows its count in the toolbar and its Add Prospect in the page header. On a phone, its
  amounts overflow the dashboard's tiles and the funnel's labels overlap.
- **After:** Both apps share one sidebar, one page header, one list toolbar, and titled cards. The list's actions sit at
  the toolbar's right end, rows open their record, and the count and pages sit under the list. On a phone, every
  screen fits its width.

## Rules

Each part's rules live on its pattern page, listed under Which patterns it uses.

## When you can do it differently

An app keeps a control that only it needs, such as Titan's report date, outside the list toolbar, on its own row
under the page header.

## Which patterns it uses

- See [Scaffold](../foundations/scaffold.md) for where each part of a screen goes.
- See [App Shell](../patterns/app-shell.md) and [Page Header](../patterns/page-header.md) for the frame and the header.
- See [List Toolbar](../patterns/list-toolbar.md), [Paging](../patterns/paging.md), and
  [Tables](../patterns/tables.md) for the lists.
- See [Cards and Tiles](../patterns/cards-and-tiles.md) for the figures and the cards.

## In code

- The Before frames are screenshots in `docs/design-language/assets/before/`: Titan on aperia-ds5 0.2 with its demo
  data, and Sales Portal on aperia-ds5 0.3.0-rc.1 with its seed data, its contacts replaced by demo names.
- The After frames are live stories in the app shell: `titan-screens.stories.tsx` for Titan, and `screens.stories.tsx`
  for Sales Portal, built only from `aperia-ds5` and the recipes on the pages above.
