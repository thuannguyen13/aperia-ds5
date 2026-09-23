import { Kbd, KbdGroup } from "./kbd"
import figma from "@figma/code-connect"

// Background=Primary has no code prop: Kbd restyles itself inside TooltipContent.
figma.connect(
  Kbd,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18665-781",
  {
    imports: ['import { Kbd } from "aperia-ds5"'],
    props: {
      text: figma.string("Text"),
    },
    example: ({ text }) => <Kbd>{text}</Kbd>,
  },
)

const groupUrl = "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18665-995"

figma.connect(KbdGroup, groupUrl, {
  variant: { Type: "Default" },
  imports: ['import { Kbd, KbdGroup } from "aperia-ds5"'],
  props: {
    keys: figma.children("Kbd"),
  },
  example: ({ keys }) => <KbdGroup>{keys}</KbdGroup>,
})

figma.connect(KbdGroup, groupUrl, {
  variant: { Type: "+ Separated" },
  imports: ['import { Kbd, KbdGroup } from "aperia-ds5"'],
  props: {
    keys: figma.children("Kbd"),
  },
  example: ({ keys }) => (
    <KbdGroup>
      {/* put <span>+</span> between each Kbd */}
      {keys}
    </KbdGroup>
  ),
})
