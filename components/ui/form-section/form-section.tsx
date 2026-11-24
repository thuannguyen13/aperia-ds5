import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "../field/field"
import { cn } from "@/lib/utils"

/**
 * One titled part of a sheet's form, such as a prospect's Details or Portfolio: a line across the whole sheet, its
 * padding included, then a title that reads above the field labels, then its fields. The first part of a form has no
 * line, as the sheet's header already draws one.
 */
export function FormSection({
  title,
  description,
  className,
  children,
}: {
  title: string
  description?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    // The sheet's form is padded 1rem a side (SheetForm), so the line reaches its edges by stepping out of it.
    <div className="-mx-4 border-t px-4 pt-5 first:border-t-0 first:pt-0">
      <FieldSet>
        {/* A legend sits outside the fieldset's flex gap, so it keeps its own space to the fields. */}
        <FieldLegend variant="legend" className="mb-4 font-semibold">
          {title}
        </FieldLegend>
        {description && (
          <FieldDescription className="-mt-3">{description}</FieldDescription>
        )}
        <FieldGroup className={cn(className)}>{children}</FieldGroup>
      </FieldSet>
    </div>
  )
}
