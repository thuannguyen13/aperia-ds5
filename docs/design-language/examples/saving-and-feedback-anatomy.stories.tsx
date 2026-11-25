import { useEffect } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Toaster, toast } from "aperia-ds5"

// A toast drawn in its own frame for an Anatomy drawing (anatomy.tsx, `story`): a toast renders in a portal at the
// corner of the window, outside an inline drawing. Hidden from the sidebar.

const meta: Meta = {
  title: "Design Language/Examples/Anatomy Saving and Feedback",
  tags: ["!dev", "!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

function ToastAtTheCorner() {
  // The toast opens once on load and stays, so the drawing shows every part: the icon of a typed toast, its message,
  // an Undo action, and the close button that a toast with no time limit carries.
  useEffect(() => {
    const id = toast.success("Task completed.", {
      id: "anatomy-toast",
      duration: Infinity,
      closeButton: true,
      action: { label: "Undo", onClick: () => {} },
    })
    // The toast takes no keyboard focus, but hand it back to the docs page around the frame in any case.
    const release = setTimeout(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur()
      ;(window.frameElement as HTMLElement | null)?.blur()
    }, 100)
    return () => {
      clearTimeout(release)
      toast.dismiss(id)
    }
  }, [])
  return <Toaster />
}

/** A success toast at the top right of the window, with its message, Undo, and a close button. */
export const SavingAndFeedback: Story = {
  render: () => <ToastAtTheCorner />,
}
