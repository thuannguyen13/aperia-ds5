import { EmptyMedia } from "./empty"
import figma from "@figma/code-connect"

const url = "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-1781"

figma.connect(EmptyMedia, url, {
  variant: { Type: "Icon" },
  imports: ['import { EmptyMedia } from "aperia-ds5"'],
  props: {
    icon: figma.nestedProps("IconPlaceholder", {
      icon: figma.instance("Lucide Icon"),
    }),
  },
  example: ({ icon }) => (
    <EmptyMedia variant="icon">
      {icon.icon}
    </EmptyMedia>
  ),
})

figma.connect(EmptyMedia, url, {
  variant: { Type: "Avatar" },
  imports: ['import { EmptyMedia } from "aperia-ds5"'],
  props: {
    avatar: figma.children("Avatar"),
  },
  example: ({ avatar }) => (
    <EmptyMedia>
      {avatar}
    </EmptyMedia>
  ),
})

figma.connect(EmptyMedia, url, {
  variant: { Type: "AvatarGroup" },
  imports: ['import { EmptyMedia } from "aperia-ds5"'],
  props: {
    avatarGroup: figma.children("Avatar Group"),
  },
  example: ({ avatarGroup }) => (
    <EmptyMedia>
      {avatarGroup}
    </EmptyMedia>
  ),
})
