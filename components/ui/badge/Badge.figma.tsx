import { Badge } from "./badge"
import figma from "@figma/code-connect"

// Badge — text/label badge
figma.connect(
  Badge,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=26-169",
  {
    imports: ['import { Badge } from "aperia-ds5"'],
    props: {
      variant: figma.enum("Variant", {
        Default: "default",
        Secondary: "secondary",
        Outline: "outline",
        Destructive: "destructive",
        Ghost: "ghost",
        Verified: "default", // no dedicated code variant; falls back to default
      }),
      label: figma.string("Badge Text"),
    },
    example: ({ variant, label }) => (
      <Badge variant={variant}>{label}</Badge>
    ),
  }
)

// Badge Number — numeric badge (same component, number as children)
figma.connect(
  Badge,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17100-10130",
  {
    imports: ['import { Badge } from "aperia-ds5"'],
    props: {
      variant: figma.enum("Variant", {
        Default: "default",
        Secondary: "secondary",
        Outline: "outline",
        Destructive: "destructive",
        Ghost: "ghost",
      }),
      label: figma.string("Badge Text"),
    },
    example: ({ variant, label }) => (
      <Badge variant={variant}>{label}</Badge>
    ),
  }
)
