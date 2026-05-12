import type { Meta, StoryObj } from "@storybook/react-vite"
import { toast } from "sonner"
import { Toaster } from "./sonner"
import { Button } from "../button/button"

const meta: Meta<typeof Toaster> = {
  title: "UI/Sonner",
  component: Toaster,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Toaster>

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        variant="outline"
        onClick={() => toast("Event has been created.")}
      >
        Show toast
      </Button>
    </>
  ),
}

export const Success: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Changes saved successfully.", {
            description: "Your profile has been updated.",
          })
        }
      >
        Success toast
      </Button>
    </>
  ),
}

export const Error: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast.error("Something went wrong.", {
            description: "Failed to save changes. Please try again.",
          })
        }
      >
        Error toast
      </Button>
    </>
  ),
}

export const Warning: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Approaching rate limit.", {
            description: "You have used 90% of your API quota.",
          })
        }
      >
        Warning toast
      </Button>
    </>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => toast("Default message")}>
          Default
        </Button>
        <Button variant="outline" onClick={() => toast.success("Saved!")}>
          Success
        </Button>
        <Button variant="outline" onClick={() => toast.error("Error!")}>
          Error
        </Button>
        <Button variant="outline" onClick={() => toast.warning("Warning!")}>
          Warning
        </Button>
        <Button variant="outline" onClick={() => toast.info("FYI")}>
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.loading("Processing...", { duration: 3000 })
          }
        >
          Loading
        </Button>
      </div>
    </>
  ),
}
