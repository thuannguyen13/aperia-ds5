import figma from "@figma/code-connect"
import { Separator } from "./separator"

figma.connect(
  Separator,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=118-2690",
  {
    imports: ['import { Separator } from "aperia-ds5"'],
    props: {
      orientation: figma.enum("Orientation", {
        Horizontal: "horizontal",
        Vertical: "vertical",
      }),
    },
    example: ({ orientation }) => <Separator orientation={orientation} />,
  }
)
