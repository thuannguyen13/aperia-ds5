# Details

Details show a record's facts as labels with their values, in a card or in a page header.

## When to use

Use details for the facts that describe one record, such as its owner, stage, phone number, and start date. A list of
many records shows its facts as table columns instead. See [Tables](tables.md) for the table.

## What is available

Details come in two forms:

| Form | What it shows | Where it goes |
|---|---|---|
| Detail rows | A label and its value side by side, the values lined up in one column so they read down | A details card, or a block inside any card |
| Facts | A small label over its value, side by side in a row | A page header's facts, or a short row inside a card |

A block of detail rows can have a heading, such as Details or Billing. Inside a tab, the tab names the block, so the
block has no heading.

## How it looks and behaves

The labels are muted, and the values use the body color. The label column is never wider than it needs to be, so the
values sit close to their labels and line up down the block.

A value that is missing shows the empty value, a muted em dash (—), never a blank. See
[Empty and Missing](../foundations/empty-and-missing.md) for missing values.

A phone number, email, or website in details is a link. Selecting it calls, writes, or opens the website in a new tab.
The link uses the body color and is underlined only under the pointer. In a table, the same values are plain text. See
[Table](../components/table.md) for values in a table.

## Rules

### Line the values up in one column

- **Do:** Give every row in a block the same label column, so the values line up and read down as one list.
- **Don't:** Let each value start where its label ends. Use one label column, so people scan the values without
  hunting.

## When you can do it differently

Details have no exceptions. Every record shows its facts as detail rows or as facts.

## Works with

- See [Card](../components/card.md) for the card that holds the details.
- See [Page Header](page-header.md) for facts in a record's header.
- See [Empty and Missing](../foundations/empty-and-missing.md) for the empty value.

## In code

Build detail rows in the app from a description list (`dl`, `dt`, `dd`). A detail section is a block of rows under an
optional heading.

```tsx
<section className="flex flex-col gap-1">
  <h3 className="text-sm font-semibold">Details</h3>
  <dl className="text-sm">
    <div className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)] items-baseline gap-4 py-1">
      <dt className="text-muted-foreground">Owner</dt>
      <dd className="min-w-0">Maria Chen</dd>
    </div>
  </dl>
</section>
```

A fact is a small label over its value, for a row of facts in a `dl`, such as a header's properties.

```tsx
<div className="flex min-w-0 flex-col gap-1">
  <dt className="text-xs text-muted-foreground">Stage</dt>
  <dd className="flex min-h-5 items-center">Proposal</dd>
</div>
```

- The label column is at most 9rem, so the values line up in one column and read down.
- A contact value is a `tel:` / `mailto:` / website link (`target="_blank"` for the website), body color,
  `hover:underline`.
