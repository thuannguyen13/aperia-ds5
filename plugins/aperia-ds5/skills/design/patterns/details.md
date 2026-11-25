# Details

Details let people read the facts that describe one record, such as its owner, stage, phone number, and start date, as labels with their values. See [Card](../components/card.md) for the card that holds them.

## Anatomy

A details card with two blocks of detail rows has seven parts. The block heading and the empty value show only sometimes. A row's label and value repeat in every row. A fact has only a label and a value, so it has no parts of its own.

1. **Card**. It is the panel that holds the details, with a border and a small shadow.
2. **Card title**. It is the heading in the card's header. It names what the card holds, such as Prospect.
3. **Block heading** (optional). It is a short heading over one block of rows, such as Details or Billing. A card shows one when it holds more than one block. Inside a tab, the tab names the block, so the block has no heading.
4. **Detail row**. It is one fact, with its label and its value side by side.
5. **Label**. It is muted text that names the fact, such as Owner.
6. **Value**. It is text in the body color that gives the fact. A phone number, email, or website is a link.
7. **Empty value** (optional). It is a muted em dash (—) that stands where a value is missing.

## When to use

Use details for the facts of one record. A list of many records shows its facts as table columns instead, and one record's values are never put in a table. See [Tables](tables.md) for the table.

## What is available

Details come in two forms:

| Form | What it shows | Where it goes |
|---|---|---|
| Detail rows | A label and its value side by side, the values lined up in one column so they read down | A details card, or a block inside any card |
| Facts | A small label over its value, side by side in a row | A page header's facts, or a short row inside a card |

See [Page Header](page-header.md) for facts in a record's header.

## How it looks and behaves

Every label sits in one column and every value in the column after it. Every row in a block uses the same label width, so the values sit close to their labels and line up down the block. A narrow block makes the label column narrower.

A value that is missing shows the empty value, never a blank. See [Empty States](../foundations/empty-states.md) for missing values and [Money and Numbers](../foundations/money-and-numbers.md) for amounts.

A phone number, email, or website in details is a link. Selecting it calls, writes, or opens the website in a new tab. The link is in the Link color, so it reads as a link at rest, and it is underlined only under the pointer. In a table, the same values are plain text. See [Table](../components/table.md) for values in a table, and [Accessibility](../foundations/accessibility.md) for contact links on a touch screen.

On a phone, each label stays beside its value. A long value wraps inside its own column, so the values still line up down the block. See [Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.

## Rules

### 1. Line the values up in one column

Every row in a block uses the same label column, so the values start at one left edge and read down as one list.

- **Do:** Build each block from detail rows, so Stage and Last Contacted give values that start at the same edge.
- **Don't:** Write a fact as "Label: value" text, or let each value start where its label ends.

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
- A contact value is a `tel:` / `mailto:` / website link (`target="_blank"` for the website), with
  `text-link hover:underline`.
