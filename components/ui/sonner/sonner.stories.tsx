import type { Meta, StoryObj } from "@storybook/react-vite"
import { Toaster, toast, toastNotification } from "./sonner"
import { Avatar, AvatarFallback } from "../avatar/avatar"
import { Button } from "../button/button"

const meta: Meta<typeof Toaster> = {
  title: "Components/Communication/Toast",
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

/** An error stays until it is closed, so it has a close button. */
export const Error: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        variant="outline"
        onClick={() => toast.error("Report export failed. Try again.")}
      >
        Error toast
      </Button>
    </>
  ),
}

const people = [
  ["Dana Whitfield", "DW", "Harbor Coffee"],
  ["Luis Ortega", "LO", "Parkway Auto"],
  ["Mia Chen", "MC", "Lumen Pharmacy"],
  ["Sam Patel", "SP", "Orbit Electronics"],
] as const

/**
 * New notifications share the one stack. Three show at most; past three, one toast counts the rest. Press the button
 * several times.
 */
export const Notifications: Story = {
  render: () => {
    let at = 0
    return (
      <>
        <Toaster />
        <Button
          variant="outline"
          onClick={() => {
            const [name, initials, record] = people[at++ % people.length]
            toastNotification({
              media: (
                <Avatar size="sm">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              ),
              message: (
                <>
                  <span className="font-medium text-foreground">{name}</span>{" "}
                  assigned you{" "}
                  <span className="font-medium text-foreground">{record}</span>.
                </>
              ),
              label: `${name} assigned you ${record}.`,
              onOpen: () => {},
              onMore: () => {},
            })
          }}
        >
          New notification
        </Button>
      </>
    )
  },
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
          onClick={() => toast.loading("Processing...", { duration: 3000 })}
        >
          Loading
        </Button>
      </div>
    </>
  ),
}
