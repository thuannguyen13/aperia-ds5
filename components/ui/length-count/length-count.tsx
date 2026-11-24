import { FieldDescription } from "../field/field"

/**
 * How much of a long field's limit is used, once 90% of it is: "1,850 / 2,000". With the input's `maxLength`, the
 * limit is met while typing rather than refused after the save. Hidden before, so a short note carries no number.
 */
export function LengthCount({
  value,
  max,
}: {
  value: string
  max: number | undefined
}) {
  if (max === undefined || value.length < max * 0.9) return null
  return (
    <FieldDescription className="text-right tabular-nums">
      {value.length.toLocaleString("en-US")} / {max.toLocaleString("en-US")}
    </FieldDescription>
  )
}
