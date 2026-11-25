import { useEffect } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Button,
  CardContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Field,
  FieldLabel,
  Input,
} from "aperia-ds5"
import { TitledCard } from "../recipes"

// A card on the page with its Edit menu open, drawn in its own frame for an Anatomy drawing (anatomy.tsx, `story`)
// because the menu renders outside an inline drawing. Hidden from the sidebar.

const meta: Meta = {
  title: "Design Language/Examples/Anatomy Surfaces and Layers",
  tags: ["!dev", "!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

function Layers() {
  // The open menu takes the keyboard focus into this frame. Hand it back to the docs page around the frame.
  useEffect(() => {
    const release = setTimeout(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur()
      ;(window.frameElement as HTMLElement | null)?.blur()
    }, 100)
    return () => clearTimeout(release)
  }, [])
  return (
    <div data-layers-page className="bg-background p-6">
      <TitledCard
        title="Details"
        action={
          <DropdownMenu defaultOpen modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Edit</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Details</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      >
        <CardContent className="pb-4">
          <Field className="max-w-xs">
            <FieldLabel htmlFor="layers-owner">Owner</FieldLabel>
            <Input id="layers-owner" defaultValue="Dana Whitfield" />
          </Field>
        </CardContent>
      </TitledCard>
    </div>
  )
}

/** A Details card on the page, with a field in it and the Edit button's menu open over it. */
export const SurfacesAndLayers: Story = {
  render: () => <Layers />,
}
