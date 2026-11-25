# Paging

Paging shows how many records a list holds and splits a long list into pages, in a footer under the list.

## Anatomy

A footer has up to six parts. The count is always there. Parts 2 to 6 appear only when the list has more than one page.

1. **Count**. It is a line of text at the left end of the footer. It shows the records on this page and the records in
   all, such as "26–50 of 312 merchants".
2. **Previous** (optional). It is a button that opens the page before the one shown.
3. **Page number** (optional). It is a button that opens its page.
4. **Page shown** (optional). It is the page number of the page on screen, with an outline.
5. **Ellipsis** (optional). It is a mark (…) that stands for a run of pages left out. It shows only when the list has
   more than seven pages.
6. **Next** (optional). It is a button that opens the page after the one shown.

## When to use

Give the footer to every table of records, so people always see how many there are. Its pages appear once the records
run past one page.

A timeline, such as a record's history, has no pages. It shows its latest entries and View All. See
[History](history.md) for that.

A list that people read as a whole, such as the lines of an order, shows every record with no pages.

## How it looks and behaves

A list that fits one page shows its count alone, such as "6 merchants". A longer list shows its count at the left end
of the footer and its pages at the right end.

A page holds 25 records. The numbers show the first page, the last page, and the page shown with one page either side.
An ellipsis stands for each run of pages left out, such as "1 … 6 7 8 … 13". A list of seven pages or fewer shows every
number.

The footer sits under the list, `gap-5` from it. On a phone, the pages move to a line under the count, and Previous and
Next show their arrows without words. See [Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.

The count tells how many records the search and the filters leave, not how many the list holds before them. The
Filter sheet on a phone also shows the total before the filters, such as "4 merchants of 6". See
[Filters](filters.md) for that sheet.

The page number is part of the page's address, so a link or the browser's Back button returns to the same page.

On the first page, Previous is disabled and says "This is the first page." when people point at it. On the last page,
Next says "This is the last page." When nothing matches, the footer is gone and the list shows No Results. See
[Empty States](../foundations/empty-states.md) for that state.

## Rules

### 1. Show the count under the list

The footer holds the only count of the list, so people find it in one place on every list and two counts never
disagree.

- **Do:** Write the count with the list's noun, such as "1–25 of 312 merchants".
- **Don't:** Show a second count in the toolbar or the page header.

### 2. Let people jump to a page

A list with more than one page shows page numbers between Previous and Next, so people can go straight to a page, such
as the last one.

- **Don't:** Show Previous and Next alone under a long list, or every number of a 40-page list. The footer stays one
  line.

### 3. Start again at page 1

A new search, a filter, or a new sort goes back to page 1. People then see the top of what they asked for, never a page
that is empty or out of order.

- **Don't:** Keep people on page 4 of a new set of results.

## In code

- `ListPager` from `aperia-ds5` draws the footer from the `Pagination` parts: `page` (from 1), `total` (the rows the
  search and filters leave), `noun` (`["merchant", "merchants"]`), `onPageChange`, and `href` (each page's address,
  such as `` (page) => `?page=${page}` ``, so a page opens in a new tab). With no rows it renders nothing.
- `pageRows(rows, page)` from `aperia-ds5/list` cuts one page of rows, after `filterRows` and `sortRows`, on the server
  or the client. `PAGE_SIZE` is 25.
- Keep `page` in the URL's search params, and leave it out for page 1.
- `DataTable` draws the same footer under its rows. Pass its `noun`.
