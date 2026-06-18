import React from "react"
import { Slider } from "./slider"
import figma from "@figma/code-connect"

// Single thumb slider
figma.connect(
  Slider,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17382-13106",
  {
    variant: { Range: "No" },
    imports: ['import { Slider } from "aperia-ds5"'],
    props: {
      disabled: figma.enum("State", {
        Default: false,
        Disabled: true,
      }),
    },
    example: ({ disabled }) => (
      <Slider defaultValue={[50]} min={0} max={100} disabled={disabled} />
    ),
  }
)

// Range slider (two thumbs)
figma.connect(
  Slider,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17382-13106",
  {
    variant: { Range: "Yes" },
    imports: ['import { Slider } from "aperia-ds5"'],
    props: {
      disabled: figma.enum("State", {
        Default: false,
        Disabled: true,
      }),
    },
    example: ({ disabled }) => (
      <Slider defaultValue={[25, 75]} min={0} max={100} disabled={disabled} />
    ),
  }
)
