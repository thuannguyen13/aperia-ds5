import React from "react"
import { AvatarBadge } from "./avatar"
import figma from "@figma/code-connect"

const url =
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21122-16180"

const imports = ['import { AvatarBadge } from "aperia-ds5"']

figma.connect(AvatarBadge, url, {
  variant: { Type: "Default" },
  imports,
  example: () => <AvatarBadge />,
})

figma.connect(AvatarBadge, url, {
  variant: { Type: "Icon" },
  imports,
  props: {
    icon: figma.instance("IconPlaceholder"),
  },
  example: ({ icon }) => <AvatarBadge>{icon}</AvatarBadge>,
})
