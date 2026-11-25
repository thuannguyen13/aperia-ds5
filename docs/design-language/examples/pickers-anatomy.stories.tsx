import { useEffect, useRef, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  EntityPicker,
  Field,
  FieldLabel,
  type EntityItem,
  type EntityPicture,
} from "aperia-ds5"

// A record picker with its list open, drawn in its own frame for an Anatomy drawing (anatomy.tsx, `story`). Hidden
// from the sidebar.

const meta: Meta = {
  title: "Design Language/Examples/Anatomy Pickers",
  tags: ["!dev", "!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

// A logo with a transparent ground: it sits on white, so it shows in Dark too.
const logo = (color: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="${color}"/><rect x="23" y="26" width="18" height="12" rx="2" fill="#fff"/></svg>`
  )

const square = (
  fallback: string,
  fill: string,
  text: string,
  src?: string
): EntityPicture => ({
  shape: "square",
  src: src ?? null,
  fallback,
  colors: { fill, text },
})

const PROSPECTS: EntityItem[] = [
  {
    id: 1,
    name: "First National Bank",
    picture: square("FNB", "", "", logo("#0f766e")),
    detail: "Omaha, NE",
  },
  {
    id: 2,
    name: "Harbor Freight Payments",
    picture: square("HFP", "oklch(0.93 0.05 250)", "oklch(0.45 0.12 250)"),
    detail: "Chicago, IL",
    badge: "Customer",
  },
  {
    id: 3,
    name: "Lakeview Credit Union",
    picture: square("LCU", "oklch(0.94 0.05 80)", "oklch(0.48 0.1 70)"),
    detail: "Madison, WI",
  },
]

function OpenPicker() {
  const [value, setValue] = useState("1")
  // The drawing shows the list, so it opens once on load. It is the real picker: a pick changes the field.
  const root = useRef<HTMLDivElement>(null)
  const opened = useRef(false)
  useEffect(() => {
    if (opened.current) return
    opened.current = true
    root.current
      ?.querySelector<HTMLButtonElement>(
        "[data-slot=entity-picker-anchor] button"
      )
      ?.click()
    // The open list takes the keyboard focus into this frame. Hand it back to the docs page around the frame.
    const release = setTimeout(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur()
      ;(window.frameElement as HTMLElement | null)?.blur()
    }, 100)
    return () => clearTimeout(release)
  }, [])
  return (
    <div ref={root} className="p-10">
      <Field className="w-[28rem] max-w-full">
        <FieldLabel htmlFor="anatomy-prospect">Prospect</FieldLabel>
        <EntityPicker
          id="anatomy-prospect"
          items={PROSPECTS}
          value={value}
          placeholder="Pick a prospect"
          add={{ label: "Add Prospect", form: null }}
          onChange={setValue}
        />
      </Field>
    </div>
  )
}

/** A record picker with First National Bank picked and its list open, ending in the Add Prospect row. */
export const Pickers: Story = {
  render: () => <OpenPicker />,
}
