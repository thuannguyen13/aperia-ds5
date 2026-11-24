import { HIDDEN_MONEY } from "@/lib/format"

/** A missing value: a muted em dash, no spaces around it, in tables, detail rows and headers alike. Different from 0. */
export function EmptyValue() {
  return <span className="text-muted-foreground">—</span>
}

/** An optional field's empty state where its value would show, such as "No priority": muted, so it reads as missing. */
export function NoneText({ children }: { children: string }) {
  return <span className="text-muted-foreground">{children}</span>
}

/**
 * An amount the viewer may not see: the shape of a figure ("$XX,XXX"), muted, so a column keeps its width, and a screen
 * reader hears that the amount is hidden rather than a number.
 */
export function HiddenValue({
  text = HIDDEN_MONEY,
  label = "Amount hidden",
}: {
  text?: string
  label?: string
}) {
  return (
    <span role="img" aria-label={label} className="text-muted-foreground">
      {text}
    </span>
  )
}
