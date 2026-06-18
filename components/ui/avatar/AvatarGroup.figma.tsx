import React from "react"
import { AvatarGroup } from "./avatar"
import figma from "@figma/code-connect"

figma.connect(
  AvatarGroup,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17100-83077",
  {
    imports: ['import { Avatar, AvatarFallback, AvatarGroup } from "aperia-ds5"'],
    props: {
      items: figma.slot("Items"),
    },
    example: ({ items }) => <AvatarGroup>{items}</AvatarGroup>,
  },
)
