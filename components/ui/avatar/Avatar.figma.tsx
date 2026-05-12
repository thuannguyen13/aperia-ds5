import React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"
import figma from "@figma/code-connect"

const url =
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17100-29935"

const imports = ['import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "aperia-ds5"']

figma.connect(Avatar, url, {
  variant: { Type: "Image" },
  imports,
  props: {
    size: figma.enum("Size", {
      xl: "lg",
      lg: "lg",
      default: "default",
      sm: "sm",
      xs: "sm",
    }),
    badge: figma.boolean("Show Badge", {
      true: figma.instance("Badge"),
      false: undefined,
    }),
  },
  example: ({ size, badge }) => (
    <Avatar size={size}>
      <AvatarImage src="..." alt="..." />
      {badge}
    </Avatar>
  ),
})

figma.connect(Avatar, url, {
  variant: { Type: "Fallback" },
  imports,
  props: {
    size: figma.enum("Size", {
      xl: "lg",
      lg: "lg",
      default: "default",
      sm: "sm",
      xs: "sm",
    }),
    fallback: figma.string("Fallback Text"),
    badge: figma.boolean("Show Badge", {
      true: figma.instance("Badge"),
      false: undefined,
    }),
  },
  example: ({ size, fallback, badge }) => (
    <Avatar size={size}>
      <AvatarFallback>{fallback}</AvatarFallback>
      {badge}
    </Avatar>
  ),
})

figma.connect(Avatar, url, {
  variant: { Type: "Icon" },
  imports,
  props: {
    size: figma.enum("Size", {
      xl: "lg",
      lg: "lg",
      default: "default",
      sm: "sm",
      xs: "sm",
    }),
    icon: figma.instance("IconPlaceholder"),
    badge: figma.boolean("Show Badge", {
      true: figma.instance("Badge"),
      false: undefined,
    }),
  },
  example: ({ size, icon, badge }) => (
    <Avatar size={size}>
      <AvatarFallback>{icon}</AvatarFallback>
      {badge}
    </Avatar>
  ),
})
