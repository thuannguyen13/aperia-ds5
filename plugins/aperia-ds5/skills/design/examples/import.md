# Import Wizard

An import wizard brings records in from a file in steps and shows a review before anything is saved.

## When to use

Use an import wizard for a list whose records people bring in from a CSV or XLSX file, such as a list of sales leads.

## How it looks and behaves

An import has four steps. Upload happens in a small panel. Review, Importing, and Result share one large dialog.

The import opens from the list's Import [Items] button, such as Import Prospects. The button sits with the list's other
buttons, so every way to add records sits together. It is outlined, with an upload icon. Selecting it opens a small
panel under it. The panel contains three parts, from top to bottom:

| Part | Content |
|---|---|
| Drop zone | What the zone accepts, such as "CSV or XLSX, up to 5,000 rows." |
| Refusal | Why the file was refused, shown under the drop zone when a file is refused. |
| Templates | "Need a template?" with CSV and XLSX download buttons, under a line. |

The dialog is titled after the import, such as "Import Prospects". On a phone, the dialog fills the screen. On larger
screens, it is up to 72rem wide. Its header and footer stay in place while its body scrolls.

Review saves nothing. Counts sit above the table as badges with words, such as "12 New" and "3 Duplicate". Selecting a
count shows only those rows. The table lists each row of the file with its row number, its fields, a Match badge, and an
Action. The Action says what happens to the row. Its choices depend on the row's match, such as Add, Fill Empty Fields,
Add as New, or Skip. A wide table scrolls sideways.

The Review footer has Choose Another File and an import button that names the count, such as "Import 12 Prospects". The
import button is grayed out when no row is set to import, and pointing at it says why ("Set at least one row to
import.").

Importing shows a progress bar and a count, such as "Importing 120 of 400". The dialog cannot be closed while the import
runs.

Result shows one tile per outcome, such as New Added, Existing Updated, Skipped, and Failed. When rows failed, the step
offers Download Failed Rows. Done closes the dialog. The list refreshes when anything was saved.

## Before and after

- **Before:** A dialog lists the rows as plain text with a Submit button. A toast says "Import failed" after the fact.
- **After:** Review shows what happens to each row before anything saves. It shows counts with words, an Action per row,
  and a button that names how many rows it imports.

## Rules

### Review before anything saves

- **Do:** Add a Review step that lists each row with its match and its action, and saves nothing, so people see what
  happens to each row before it does.
- **Don't:** Import as soon as the file is dropped. Save nothing until Review, so a wrong file or a duplicate never
  lands in the list.

### Say what the file must be and why it is refused

- **Do:** Write what the file must be under the drop zone ("CSV or XLSX, up to 5,000 rows."), with any refusal under it,
  so people see why a file was turned away where they dropped it.
- **Don't:** Show a toast for a refused file. Show the refusal under the drop zone, so it stays until it is read.

## When you can do it differently

An import wizard has no exceptions.

## Which patterns it uses

- See [Page Header](../patterns/page-header.md) for the import button's place among the page's buttons.
- See [Tables](../patterns/tables.md) for the wide Review table that scrolls sideways.
- See [Cards and Tiles](../patterns/cards-and-tiles.md) for the Result counts.
- See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for the import button at zero.
- See [Copy](../foundations/copy.md) for naming the action on a button.

## In code

The app builds it from aperia-ds5 parts and the recipes on the pattern and component pages:

- Upload: an outline `Button` with `UploadIcon` as a `PopoverTrigger`; the `PopoverContent` holds `FileDrop` (its `hint`
  the accepted types and size, `accept=".csv,.xlsx"`), the refusal under it, a `Separator`, then the template buttons.
- The dialog: one `DialogContent` for Review, Importing and Result, full screen below `sm` and
  `sm:max-w-[min(72rem,calc(100%-4rem))]` above, with the header and footer fixed and the body scrolling.
- Review: the counts as `Badge`s inside buttons (`aria-pressed`), the rows in the scroll table from
  [Tables](../patterns/tables.md) with a `Badge` per Match and a `Select` per Action; the footer's import `Button` is
  disabled at zero.
- Importing: `Progress`, and `onOpenChange` ignores closing while it runs. Result: a stat tile per count, the recipe
  from [Cards and Tiles](../patterns/cards-and-tiles.md).
