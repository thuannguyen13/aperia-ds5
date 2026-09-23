// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=28-1540
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/aspect-ratio/aspect-ratio.tsx
// component=AspectRatio

import figma from "figma"

const ratio = figma.selectedInstance.getEnum("Ratio", {
  "1 / 1": "1 / 1",
  "4 / 3": "4 / 3",
  "3 / 4": "3 / 4",
  "5 / 4": "5 / 4",
  "4 / 5": "4 / 5",
  "3 / 2": "3 / 2",
  "2 / 3": "2 / 3",
  "16 / 10": "16 / 10",
  "10 / 16": "10 / 16",
  "16 / 9": "16 / 9",
  "9 / 16": "9 / 16",
  "2 / 1": "2 / 1",
  "1 / 2": "1 / 2",
  "1.618 / 1": "1.618 / 1",
  "1 / 1.618": "1 / 1.618",
  "21 / 9": "21 / 9",
  "9 / 21": "9 / 21",
})

export default {
  id: "AspectRatio",
  imports: ['import { AspectRatio } from "aperia-ds5"'],
  example: figma.code`<AspectRatio ratio={${ratio}}>
        <img src="image.jpg" alt="" className="size-full object-cover"/>
      </AspectRatio>`,
  metadata: { nestable: true },
}
