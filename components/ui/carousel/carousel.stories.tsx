import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel"

const meta: Meta<typeof Carousel> = {
  title: "UI/Carousel",
  component: Carousel,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Carousel>

export const Default: Story = {
  render: () => (
    <div className="px-14">
      <Carousel className="w-full max-w-sm">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="flex aspect-square items-center justify-center rounded-lg bg-muted p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

export const MultipleItems: Story = {
  render: () => (
    <div className="px-14">
      <Carousel
        opts={{ align: "start" }}
        className="w-full max-w-lg"
      >
        <CarouselContent>
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/3">
              <div className="flex aspect-square items-center justify-center rounded-lg bg-muted p-4">
                <span className="text-2xl font-semibold">{index + 1}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="py-12">
      <Carousel orientation="vertical" className="w-full max-w-xs">
        <CarouselContent className="h-48">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="flex h-full items-center justify-center rounded-lg bg-muted p-4">
                <span className="text-2xl font-semibold">Slide {index + 1}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}
