import figma from "@figma/code-connect"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel"

figma.connect(
  Carousel,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=241-1368",
  {
    variant: { Orientation: "Horizontal" },
    imports: [
      'import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "aperia-ds5"',
    ],
    props: {
      items: figma.slot("CarouselItems Wrapper"),
    },
    example: ({ items }) => (
      <Carousel>
        <CarouselContent>{items}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    ),
  },
)

figma.connect(
  Carousel,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=241-1368",
  {
    variant: { Orientation: "Vertical" },
    imports: [
      'import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "aperia-ds5"',
    ],
    props: {
      items: figma.slot("CarouselItems Wrapper"),
    },
    example: ({ items }) => (
      <Carousel orientation="vertical">
        <CarouselContent>{items}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    ),
  },
)

figma.connect(
  CarouselItem,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=239-1214",
  {
    imports: ['import { CarouselItem } from "aperia-ds5"'],
    example: () => (
      <CarouselItem>
        {/* Place carousel slide content here */}
      </CarouselItem>
    ),
  },
)
