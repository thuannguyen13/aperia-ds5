// A record's facts: label and value rows in a detail sheet or card, and the label-over-value pair a header or a row of
// facts uses. Missing values are `EmptyValue`; an empty optional field is `NoneText` ("No priority").

/** A small label over its value, for a row of facts in a `<dl>`, such as a header's properties. */
export function Fact({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="flex min-h-5 items-center">{children}</dd>
    </div>
  )
}

/** One label and value, two columns, values left-aligned on one line so a column of them reads down. */
export function DetailRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)] items-baseline gap-4 py-1">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  )
}

/** A block of `DetailRow`s. Inside a tab, the tab names the block, so the heading is optional. */
export function DetailSection({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-1">
      {title && <h3 className="text-sm font-semibold">{title}</h3>}
      <dl className="text-sm">{children}</dl>
    </section>
  )
}
