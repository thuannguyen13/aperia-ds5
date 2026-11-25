import { Badge, Button, Field, FieldLabel, Input } from "aperia-ds5"
import { DoDont } from "../blocks"
import { forceState, useForcedStates } from "../states"
import { AppStatusColors, STATES } from "./app-status"

// Live pairs for the Accessibility page, keyed by the page's rule names.

/** A button drawn focused, as the library draws it; `bare` takes the focus line away, as the Don't does. */
function FocusedButton({ bare = false }: { bare?: boolean }) {
  useForcedStates()
  return (
    <Button
      {...forceState("focus")}
      className={
        bare ? "focus-visible:ring-0 focus-visible:inset-ring-0" : undefined
      }
    >
      Save
    </Button>
  )
}

export const accessibilityExamples = {
  "Never use color as the only signal": (
    <DoDont
      good={
        <>
          <AppStatusColors />
          <Badge className={STATES.overdue.className}>Overdue</Badge>
        </>
      }
      bad={
        <>
          <AppStatusColors />
          <span className="bg-status-red-foreground size-2.5 rounded-full" />
        </>
      }
    />
  ),
  "Keep the focus line": (
    <DoDont good={<FocusedButton />} bad={<FocusedButton bare />} />
  ),
  "Name every control": (
    <DoDont
      good={
        <Field className="w-56">
          <FieldLabel htmlFor="a11y-do-phone">Phone</FieldLabel>
          <Input id="a11y-do-phone" placeholder="(555) 010-0123" />
        </Field>
      }
      bad={
        <Field className="w-56">
          <Input aria-label={undefined} placeholder="Phone" />
        </Field>
      }
    />
  ),
}
