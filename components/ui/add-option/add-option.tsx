import { PlusIcon } from "lucide-react"

/**
 * The Add row's face in a picker's list, after the items: a plus and what it adds ("Add Prospect", "Add
 * jane@acme.com"). Put it inside the picker's item, so the row is picked like any other and opens the add form.
 */
export function AddOption({ label }: { label: string }) {
  return (
    <>
      <PlusIcon aria-hidden />
      {label}
    </>
  )
}
