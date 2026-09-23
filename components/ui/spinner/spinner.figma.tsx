import { Spinner } from "./spinner"
import figma from "@figma/code-connect"

// "Spin Degree" only exists to animate the Figma prototype; code spins with animate-spin.
figma.connect(
  Spinner,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18665-25956",
  {
    imports: ['import { Spinner } from "aperia-ds5"'],
    props: {
      className: figma.enum("Size", {
        "8": "size-8",
        "6": "size-6",
        "5": "size-5",
        "4": undefined,
        "3": "size-3",
      }),
    },
    example: ({ className }) => <Spinner className={className} />,
  },
)
