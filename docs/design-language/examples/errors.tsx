import { useState } from "react"
import { Button, Field, FieldError, FieldLabel, Input } from "aperia-ds5"
import { DoDont } from "../blocks"

// Live examples for Errors and Validation, keyed by the page's headings.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const check = (next: string) =>
  !next.trim()
    ? "Enter an email address."
    : EMAIL.test(next.trim())
      ? null
      : "Enter a valid email address."

/**
 * One email field that checks on Save, or on every keystroke for the Don't. `initial` is what is typed when the page
 * opens, and `saved` opens it as if Save had just been pressed, so each preview shows its state before anyone types.
 */
function EmailForm({
  id,
  eager = false,
  initial = "",
  saved = false,
}: {
  id: string
  eager?: boolean
  initial?: string
  saved?: boolean
}) {
  const [value, setValue] = useState(initial)
  const [error, setError] = useState<string | null>(
    eager || saved ? check(initial) : null
  )
  const [shown, setShown] = useState(saved)
  return (
    <form
      className="flex w-full max-w-60 flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        setShown(true)
        setError(check(value))
      }}
    >
      <Field data-invalid={Boolean(error) || undefined}>
        <FieldLabel htmlFor={id}>Email</FieldLabel>
        <Input
          id={id}
          value={value}
          aria-invalid={Boolean(error) || undefined}
          placeholder="name@example.com"
          onChange={(event) => {
            const next = event.target.value
            setValue(next)
            setError(eager ? check(next) : null)
          }}
          onBlur={() => shown && setError(check(value))}
        />
        {error && <FieldError>{error}</FieldError>}
      </Field>
      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  )
}

/** A login form refused as a whole: the message above the buttons, or both fields red for the Don't. */
function Refused({ blameFields = false }: { blameFields?: boolean }) {
  const prefix = blameFields ? "dont" : "do"
  return (
    <div className="flex w-full max-w-60 flex-col gap-4">
      <Field>
        <FieldLabel htmlFor={`${prefix}-login-email`}>Email</FieldLabel>
        <Input
          id={`${prefix}-login-email`}
          defaultValue="dana@northwind.example"
          aria-invalid={blameFields || undefined}
        />
        {blameFields && <FieldError>Email is incorrect.</FieldError>}
      </Field>
      <Field>
        <FieldLabel htmlFor={`${prefix}-login-password`}>Password</FieldLabel>
        <Input
          id={`${prefix}-login-password`}
          type="password"
          defaultValue="password"
          aria-invalid={blameFields || undefined}
        />
        {blameFields && <FieldError>Password is incorrect.</FieldError>}
      </Field>
      {!blameFields && (
        <p role="alert" className="text-sm text-destructive">
          The email or password is incorrect.
        </p>
      )}
      <div className="flex justify-end">
        <Button>Log In</Button>
      </div>
    </div>
  )
}

export const errorsExamples = {
  "Check on save, not while people type": (
    <DoDont
      good={<EmailForm id="errors-do-email" initial="dana@north" />}
      goodNote="still typing, so nothing is red yet"
      bad={<EmailForm id="errors-dont-email" initial="d" eager />}
      badNote="one letter typed, and it is already wrong"
    />
  ),
  "Keep the save button enabled": (
    <DoDont
      good={<EmailForm id="errors-enabled-email" saved />}
      goodNote="Save Changes pressed: the field says what is missing"
      bad={
        <div className="flex w-full max-w-60 flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="errors-disabled-email">Email</FieldLabel>
            <Input id="errors-disabled-email" placeholder="name@example.com" />
          </Field>
          <div className="flex justify-end">
            <Button disabled>Save Changes</Button>
          </div>
        </div>
      }
      badNote="a disabled button that never says what is missing"
    />
  ),
  "Turn a field red only when it is at fault": (
    <DoDont
      good={<Refused />}
      goodNote="one message, no field blamed"
      bad={<Refused blameFields />}
      badNote="both fields red for one refusal"
    />
  ),
}
