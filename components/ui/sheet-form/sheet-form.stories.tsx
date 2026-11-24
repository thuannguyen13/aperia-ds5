import { useEffect, useTransition } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "../button/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "../field/field"
import { FormSection } from "@/docs/design-language/recipes/form-section"
import { Input } from "../input/input"
import { Textarea } from "../textarea/textarea"
import { IN_USE_DELETE, SheetDelete } from "../sheet-delete/sheet-delete"
import { FormSheet, SheetForm } from "./sheet-form"
import { useSheet } from "./use-sheet"
import { useSheetForm, type FormSchema } from "./use-sheet-form"

type Contact = { name: string; email: string; phone: string; notes: string }

const EMPTY: Contact = { name: "", email: "", phone: "", notes: "" }
const DANA: Contact = {
  name: "Dana Whitfield",
  email: "dana.whitfield@harborfreightpay.com",
  phone: "(312) 555-0148",
  notes: "Decides on processing. Prefers email before calls.",
}

// An app checks with zod; any schema with safeParse fits, so the story writes a small one by hand.
const contactSchema: FormSchema<Contact> = {
  safeParse(input) {
    const value = input as Contact
    const issues: { path: PropertyKey[]; message: string }[] = []
    if (!value.name.trim())
      issues.push({ path: ["name"], message: "Enter the contact's name." })
    if (!/^\S+@\S+\.\S+$/.test(value.email))
      issues.push({ path: ["email"], message: "Enter a valid email address." })
    return issues.length > 0
      ? { success: false, error: { issues } }
      : { success: true, data: value }
  },
}

const wait = (ms: number) => new Promise((done) => setTimeout(done, ms))

/** What the app's server action returns: ok, or a refusal naming a field or not. */
type Result = { ok: true } | { ok: false; error: string; field?: string }

/**
 * The contact form as an app writes it: `useSheetForm` for the draft and messages, `SheetForm` for the body and
 * footer. `save` stands in for the server action.
 */
function ContactForm({
  contact,
  save,
  onDone,
  pending: held = false,
  readOnly = false,
  deleteReason,
  submitOnMount = false,
}: {
  contact: Contact | null
  save: (contact: Contact) => Promise<Result>
  onDone: () => void
  pending?: boolean
  readOnly?: boolean
  deleteReason?: string
  submitOnMount?: boolean
}) {
  const form = useSheetForm(contact ?? EMPTY)
  const { draft, set, errors, check } = form
  const [saving, startTransition] = useTransition()
  const pending = held || saving

  function submit() {
    const parsed = check(contactSchema, draft)
    if (!parsed) return
    startTransition(async () => {
      const result = await save(parsed)
      if (result.ok) onDone()
      else form.refused(result)
    })
  }

  // Shows the messages a save with nothing typed gets, for the story.
  useEffect(() => {
    if (submitOnMount) submit()
  }, [])

  return (
    <SheetForm
      form={form}
      onSubmit={submit}
      pending={pending}
      submit={contact ? "Save Changes" : "Add Contact"}
      ready={Boolean(draft.name.trim())}
      readOnly={readOnly}
      start={
        contact && (
          <SheetDelete
            title="Delete Contact?"
            action="Delete Contact"
            onDelete={onDone}
            pending={pending}
            reason={deleteReason}
          >
            This permanently deletes {contact.name}.
          </SheetDelete>
        )
      }
    >
      {/* The group spaces the sections, as it spaces fields. */}
      <FieldGroup>
        <FormSection title="Details">
          <Field data-invalid={Boolean(errors.name)}>
            <FieldLabel htmlFor="contact-name">Name</FieldLabel>
            <Input
              id="contact-name"
              autoFocus
              placeholder="e.g. Dana Whitfield"
              value={draft.name}
              aria-invalid={Boolean(errors.name)}
              onChange={(event) => set("name", event.target.value)}
            />
            <FieldError>{errors.name}</FieldError>
          </Field>
          <Field data-invalid={Boolean(errors.email)}>
            <FieldLabel htmlFor="contact-email">Email</FieldLabel>
            <Input
              id="contact-email"
              type="email"
              placeholder="name@example.com"
              value={draft.email}
              aria-invalid={Boolean(errors.email)}
              onChange={(event) => set("email", event.target.value)}
            />
            <FieldError>{errors.email}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="contact-phone">Phone (Optional)</FieldLabel>
            <Input
              id="contact-phone"
              type="tel"
              placeholder="(555) 555-0100"
              value={draft.phone}
              onChange={(event) => set("phone", event.target.value)}
            />
          </Field>
        </FormSection>
        <FormSection title="Notes">
          <Field>
            <FieldLabel htmlFor="contact-notes">Notes (Optional)</FieldLabel>
            <Textarea
              id="contact-notes"
              rows={4}
              placeholder="e.g. Decides on processing."
              value={draft.notes}
              onChange={(event) => set("notes", event.target.value)}
            />
          </Field>
        </FormSection>
      </FieldGroup>
    </SheetForm>
  )
}

/** The page's Add Contact button and the sheet it opens, keyed per opening by `useSheet`. */
function ContactSheet({
  contact = null,
  save = async () => {
    await wait(1200)
    return { ok: true }
  },
  ...rest
}: {
  contact?: Contact | null
  save?: (contact: Contact) => Promise<Result>
  pending?: boolean
  readOnly?: boolean
  deleteReason?: string
  submitOnMount?: boolean
}) {
  const sheet = useSheet<Contact | null>(contact)
  // Open on load, so the story shows the sheet.
  useEffect(() => {
    sheet.show(contact)
  }, [])
  return (
    <>
      <Button variant="outline" onClick={() => sheet.show(contact)}>
        {contact ? "Edit Contact" : "Add Contact"}
      </Button>
      <FormSheet
        open={sheet.open}
        onOpenChange={sheet.onOpenChange}
        title={sheet.record ? "Edit Contact" : "Add Contact"}
      >
        <ContactForm
          key={sheet.key}
          contact={sheet.record}
          save={save}
          onDone={() => sheet.onOpenChange(false)}
          {...rest}
        />
      </FormSheet>
    </>
  )
}

const meta: Meta<typeof SheetForm> = {
  title: "Pattern Components/SheetForm",
  // Shown on its pattern page's Code tab (site.ts), not in the sidebar or the Components index.
  component: SheetForm,
  subcomponents: { FormSheet },
  tags: ["!dev"],
  parameters: {
    layout: "padded",
    docs: {
      story: { inline: false, height: "640px" },
      description: {
        component:
          "The sheet every record is added or edited in. `FormSheet` is the sheet: from the right, a 56px header with the title, and the check before closing: it waits while a save runs and asks Discard Changes? once something was typed. `SheetForm` is its body and footer: the fields scroll, the footer holds Cancel and the save, a save in progress disables the fields and shows a spinner beside the save's label. `useSheetForm` holds the draft and the messages: a failed check or a refusal shows beside its field and moves focus there, a refusal no field shows sits above the buttons, and the sheet stays open with what was typed. No toast for an error. `useSheet` keys each opening, so every opening is a fresh form.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SheetForm>

/** Add a contact. Type a name, then press Escape: the sheet asks before discarding it. */
export const AddContact: Story = {
  render: () => <ContactSheet />,
}

/** Save with nothing typed: each message sits under its field, and focus moves to the first. */
export const FieldErrors: Story = {
  render: () => <ContactSheet submitOnMount />,
}

/** The server refuses the save: the message sits under the field it names, and the sheet keeps what was typed. */
export const RefusedByServer: Story = {
  render: () => (
    <ContactSheet
      contact={DANA}
      save={async () => {
        await wait(800)
        return {
          ok: false,
          error: "A contact with this email already exists.",
          field: "email",
        }
      }}
    />
  ),
}

/** A refusal no field shows sits above the buttons. Press Save Changes. */
export const RefusedAboveButtons: Story = {
  render: () => (
    <ContactSheet
      contact={DANA}
      save={async () => {
        await wait(800)
        return {
          ok: false,
          error:
            "This prospect was changed by someone else. Close the sheet and open it again.",
        }
      }}
    />
  ),
}

/** While the save runs: the fields are disabled and the save shows a spinner beside its label. */
export const Saving: Story = {
  render: () => <ContactSheet contact={DANA} pending />,
}

/** An existing record: its Delete sits at the footer's start and asks first. */
export const EditWithDelete: Story = {
  render: () => <ContactSheet contact={DANA} />,
}

/** A record in use: Delete stays focusable and says why on hover or focus. */
export const DeleteBlocked: Story = {
  render: () => <ContactSheet contact={DANA} deleteReason={IN_USE_DELETE} />,
}

/** For someone who may not change it: the fields are disabled, and the footer holds Close and Delete. */
export const ReadOnly: Story = {
  render: () => <ContactSheet contact={DANA} readOnly />,
}
