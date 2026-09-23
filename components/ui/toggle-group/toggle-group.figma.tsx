import React from "react"
import { ToggleGroup } from "./toggle-group"
import figma from "@figma/code-connect"

figma.connect(
  ToggleGroup,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18707-214048",
  {
    imports: ['import { ToggleGroup, ToggleGroupItem } from "aperia-ds5"'],
    props: {
      orientation: figma.enum("Orientation", {
        Horizontal: "horizontal",
        Vertical: "vertical",
      }),
      spacing: figma.enum("Type", {
        Default: 0,
        Fill: 0,
        "With Spacing": 2,
      }),
      items: figma.slot("Items"),
    },
    example: ({ orientation, spacing, items }) => (
      <ToggleGroup orientation={orientation} spacing={spacing}>
        {items}
      </ToggleGroup>
    ),
  }
)
