import type { Meta, StoryObj } from "@storybook/react-vite"
import { DirectionProvider } from "./direction"
import { Slider } from "../slider/slider"

const meta: Meta<typeof DirectionProvider> = {
  title: "UI/Direction",
  component: DirectionProvider,
  tags: ["autodocs"],
  args: {
    dir: "ltr",
  },
  argTypes: {
    dir: {
      control: "select",
      options: ["ltr", "rtl"],
    },
  },
  render: ({ dir }) => (
    <DirectionProvider dir={dir}>
      {/* The provider only feeds Radix context; the DOM still needs dir for text and flex order. */}
      <div dir={dir} className="flex w-64 flex-col gap-3">
        <p className="text-sm text-muted-foreground">Volume</p>
        <Slider defaultValue={[30]} />
      </div>
    </DirectionProvider>
  ),
}

export default meta
type Story = StoryObj<typeof DirectionProvider>

export const Default: Story = {}

export const RightToLeft: Story = { args: { dir: "rtl" } }
