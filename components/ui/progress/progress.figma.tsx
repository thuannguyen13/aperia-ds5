import React from "react"
import { Progress } from "./progress"
import figma from "@figma/code-connect"

figma.connect(
  Progress,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=296-4740",
  {
    imports: ['import { Progress } from "aperia-ds5"'],
    props: {
      value: figma.enum("Percent", {
        "0%": 0,
        "Custom": 50,
        "100%": 100,
      }),
    },
    example: ({ value }) => (
      <Progress value={value} />
    ),
  }
)
