import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FormSheet,
  Input,
  SheetDelete,
  SheetForm,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  useSheetForm,
} from "aperia-ds5"
import { FormSection } from "../recipes"

// A form in a sheet, open over its list, drawn in its own frame for an Anatomy drawing (anatomy.tsx, `story`). The
// sheet renders outside an inline drawing. Hidden from the sidebar.

const meta: Meta = {
  title: "Design Language/Examples/Anatomy Forms in Sheets",
  tags: ["!dev", "!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

type Contact = { name: string; email: string; phone: string; notes: string }

const DANA: Contact = {
  name: "Dana Whitfield",
  email: "dana.whitfield@harborfreightpay.com",
  phone: "",
  notes: "",
}

const CONTACTS = [
  { id: 1, name: "Dana Whitfield", role: "Finance Director" },
  { id: 2, name: "Marcus Lee", role: "Operations Lead" },
  { id: 3, name: "Priya Raman", role: "Controller" },
]

function ContactForm({ onDone }: { onDone: () => void }) {
  const form = useSheetForm(DANA)
  const { draft, set } = form
  return (
    <SheetForm
      form={form}
      onSubmit={onDone}
      pending={false}
      submit="Save Changes"
      start={
        <SheetDelete
          title="Delete Contact?"
          action="Delete Contact"
          onDelete={onDone}
        >
          This permanently deletes {DANA.name}.
        </SheetDelete>
      }
    >
      <FieldGroup>
        <FormSection title="Details">
          <Field>
            <FieldLabel htmlFor="anatomy-name">Name</FieldLabel>
            <Input
              id="anatomy-name"
              value={draft.name}
              onChange={(event) => set("name", event.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="anatomy-email">Email</FieldLabel>
            <Input
              id="anatomy-email"
              type="email"
              value={draft.email}
              onChange={(event) => set("email", event.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="anatomy-phone">Phone (Optional)</FieldLabel>
            <Input
              id="anatomy-phone"
              type="tel"
              placeholder="(555) 555-0100"
              value={draft.phone}
              onChange={(event) => set("phone", event.target.value)}
            />
          </Field>
        </FormSection>
        <FormSection title="Notes">
          <Field>
            <FieldLabel htmlFor="anatomy-notes">Notes (Optional)</FieldLabel>
            <Textarea
              id="anatomy-notes"
              rows={3}
              placeholder="e.g. Prefers email before calls."
              value={draft.notes}
              onChange={(event) => set("notes", event.target.value)}
            />
          </Field>
        </FormSection>
      </FieldGroup>
    </SheetForm>
  )
}

function EditSheet() {
  const [open, setOpen] = useState(true)
  // The sheet takes the keyboard focus into this frame. Hand it back to the docs page around the frame.
  useEffect(() => {
    const release = setTimeout(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur()
      ;(window.frameElement as HTMLElement | null)?.blur()
    }, 300)
    return () => clearTimeout(release)
  }, [])
  return (
    <div className="p-6">
      <h2 className="mb-4 text-lg font-semibold">Contacts</h2>
      <div className="overflow-clip surface">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CONTACTS.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="pl-4">{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <FormSheet
        open={open}
        onOpenChange={setOpen}
        title={<span data-anatomy="2">Edit Contact</span>}
      >
        <ContactForm onDone={() => setOpen(false)} />
      </FormSheet>
    </div>
  )
}

/** The sheet that edits a contact, open over the contacts list, with its Delete at the footer's start. */
export const FormsInSheets: Story = {
  render: () => <EditSheet />,
}
