# Paging

Paging splits a long list into pages and shows how many records the list holds, in a footer under the list.

## When to use

Use the footer under every table of records, so people always see how many there are. Its pages appear once the
records run past one page. A timeline, such as a record's history, has no pages. It shows its latest entries
and View All.

## What is available

The footer comes in two forms. A list that fits one page shows its count alone, such as "6 merchants". A longer list
shows its count at the left end and its pages at the right end. Its parts are listed under Anatomy.

A page holds 25 records. The numbers show the first page, the last page, and the page shown with one page either side.
An ellipsis (…) stands for each run of pages left out, such as "1 … 6 7 8 … 13". A list of seven pages or fewer shows
every number.

## Anatomy

A footer needs its count. The pages, parts 2 to 6, appear only when the list has more than one page.

1. **Count**. It shows the records on this page and the records in all, such as "26–50 of 312 merchants".
2. **Previous** (optional). It opens the page before the one shown.
3. **Page number** (optional). It opens its page.
4. **Page shown** (optional). Its number has an outline.
5. **Ellipsis** (optional). It stands for a run of pages left out.
6. **Next** (optional). It opens the page after the one shown.

## How it looks and behaves

The footer sits under the list, 20px from it. On a phone, the pages move to a line under the count, and Previous and
Next show their arrows without words. The count is the only count of the list.
The toolbar above the list has none.

The count tells how many records the search and the filters leave, not how many the list holds before them. The
Filter sheet on a phone also shows the total before the filters, such as "4 merchants of 6". See
[Filters](filters.md) for that sheet.

A new search, a filter, or a new sort starts again at page 1, so people see the top of what they asked for. The page
number is part of the page's address, so a link or the browser's Back button returns to the same page.

On the first page, Previous is disabled and says "This is the first page." when people point at it. On the last page,
Next says "This is the last page." When nothing matches, the footer is gone and the list shows No Results. See
[Empty and Missing](../foundations/empty-and-missing.md) for that state.

## Rules

### Show the count under the list

- **Do:** Put the count in the footer, such as "1–25 of 312 merchants", so people find it in one place on every list.
- **Don't:** Show a second count in the toolbar or the page header. Keep the footer's count only, so the two never
  disagree.

### Let people jump to a page

- **Do:** Show the page numbers between Previous and Next, so people can go straight to a page they remember, such as
  the last one.
- **Don't:** Show Previous and Next alone under a long list, or show every number of a 40-page list. Show the first,
  the last, and the pages around the one shown, so the footer stays one line.

### Start again at page 1

- **Do:** Go back to page 1 when the search, a filter, or the sort changes, so people see the first matches.
- **Don't:** Keep people on page 4 of a new set of results. Reset the page, so no one lands on a page that is empty or
  out of order.

## When you can do it differently

A list that people read as a whole, such as the lines of an order, shows every record with no pages.

## Works with

- See [List Toolbar](list-toolbar.md) for the controls above the list.
- See [Tables](tables.md) for the table the footer sits under.
- See [History](history.md) for a timeline's View All.

## In code

- `ListPager` from `aperia-ds5` draws the footer from the `Pagination` parts: `page` (from 1), `total` (the rows the
  search and filters leave), `noun` (`["merchant", "merchants"]`), `onPageChange`, and `href` (each page's address,
  such as `` (page) => `?page=${page}` ``, so a page opens in a new tab). With no rows it renders nothing.
- `pageRows(rows, page)` from `aperia-ds5/list` cuts one page of rows, after `filterRows` and `sortRows`, on the server
  or the client. `PAGE_SIZE` is 25.
- Keep `page` in the URL's search params, and leave it out for page 1.
- `DataTable` draws the same footer under its rows. Pass its `noun`.
