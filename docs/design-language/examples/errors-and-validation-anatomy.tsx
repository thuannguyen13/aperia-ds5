import { Button, Field, FieldError, FieldLabel, Input } from "aperia-ds5"
import { Anatomy } from "../anatomy"

// The Anatomy drawing of the Errors and Validation page: one field in error, the way a form shows it after Save. Each
// part is marked in the order of the part list in errors-and-validation.md.

function FieldInErrorDrawing() {
  return (
    <div className="flex w-72 max-w-full flex-col gap-4">
      <Field data-invalid>
        <FieldLabel htmlFor="errors-anatomy-email">Email</FieldLabel>
        <Input
          id="errors-anatomy-email"
          defaultValue="dana@north"
          aria-invalid
        />
        <FieldError>Enter a valid email address.</FieldError>
      </Field>
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}

export const errorsAndValidationAnatomy = (
  <Anatomy
    targets={{
      1: { selector: "[data-slot=field-label]", side: "top" },
      2: { selector: "[data-slot=input]", side: "right" },
      3: { selector: "[data-slot=field-error]", side: "right" },
    }}
  >
    <FieldInErrorDrawing />
  </Anatomy>
)
