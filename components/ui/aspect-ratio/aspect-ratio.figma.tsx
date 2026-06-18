import figma from "@figma/code-connect"
import { AspectRatio } from "./aspect-ratio"

figma.connect(
  AspectRatio,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=28-1540",
  {
    imports: ['import { AspectRatio } from "aperia-ds5"'],
    props: {
      ratio: figma.enum("Ratio", {
        "1 / 1": 1 / 1,
        "4 / 3": 4 / 3,
        "3 / 4": 3 / 4,
        "5 / 4": 5 / 4,
        "4 / 5": 4 / 5,
        "3 / 2": 3 / 2,
        "2 / 3": 2 / 3,
        "16 / 10": 16 / 10,
        "10 / 16": 10 / 16,
        "16 / 9": 16 / 9,
        "9 / 16": 9 / 16,
        "2 / 1": 2 / 1,
        "1 / 2": 1 / 2,
        "1.618 / 1": 1.618 / 1,
        "1 / 1.618": 1 / 1.618,
        "21 / 9": 21 / 9,
        "9 / 21": 9 / 21,
      }),
    },
    example: ({ ratio }) => (
      <AspectRatio ratio={ratio}>
        <img src="image.jpg" alt="" className="size-full object-cover" />
      </AspectRatio>
    ),
  },
)
