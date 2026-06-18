import React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import figma from "@figma/code-connect"

figma.connect(
  Tooltip,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17103-809",
  {
    imports: ['import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "aperia-ds5"'],
    props: {
      side: figma.enum("Side", {
        Top: "top",
        Bottom: "bottom",
        Left: "left",
        Right: "right",
      }),
      content: figma.string("Tooltip Text"),
    },
    example: ({ side, content }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent side={side}>{content}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  }
)
