// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=241-1368
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/carousel/carousel.tsx
// component=Carousel

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Orientation") === "Horizontal") {
  const items = figma.properties.slot("CarouselItems Wrapper")

  template = {
    id: "Carousel",
    imports: [
      'import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "aperia-ds5"',
    ],
    example: figma.code`<Carousel>
        <CarouselContent>${figma.helpers.react.renderChildren(
          items,
        )}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>`,
    metadata: { nestable: true },
  }
} else if (
  figma.selectedInstance.getPropertyValue("Orientation") === "Vertical"
) {
  const items = figma.properties.slot("CarouselItems Wrapper")

  template = {
    id: "Carousel",
    imports: [
      'import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "aperia-ds5"',
    ],
    example: figma.code`<Carousel orientation="vertical">
        <CarouselContent>${figma.helpers.react.renderChildren(
          items,
        )}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>`,
    metadata: { nestable: true },
  }
} else {
  const items = figma.properties.slot("CarouselItems Wrapper")

  template = {
    id: "Carousel",
    imports: [
      'import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "aperia-ds5"',
    ],
    example: figma.code`<Carousel orientation="vertical">
        <CarouselContent>${figma.helpers.react.renderChildren(
          items,
        )}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>`,
    metadata: { nestable: true },
  }
}

export default template
