import type { Meta, StoryObj } from "@storybook/react-vite"
import { AspectRatio } from "./aspect-ratio"

const meta: Meta<typeof AspectRatio> = {
  title: "UI/Aspect Ratio",
  component: AspectRatio,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof AspectRatio>

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg bg-muted">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop"
          alt="Mountain landscape"
          className="size-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  render: () => (
    <div className="w-48">
      <AspectRatio ratio={1} className="overflow-hidden rounded-lg bg-muted">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop"
          alt="Abstract art"
          className="size-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

export const Portrait: Story = {
  render: () => (
    <div className="w-48">
      <AspectRatio ratio={3 / 4} className="overflow-hidden rounded-lg bg-muted">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop"
          alt="Portrait photo"
          className="size-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

export const Placeholder: Story = {
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={16 / 9} className="flex items-center justify-center rounded-lg bg-muted">
        <span className="text-sm text-muted-foreground">16 / 9</span>
      </AspectRatio>
    </div>
  ),
}
