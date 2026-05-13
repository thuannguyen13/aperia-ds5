import { EmptyMedia } from "./empty"
import figma from "@figma/code-connect"

const url = "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-1781"

figma.connect(EmptyMedia, url, {
  variant: { Type: "Icon" },
  imports: ['import { EmptyMedia } from "aperia-ds5"'],
  example: () => (
    <EmptyMedia variant="icon">
      {/* icon */}
    </EmptyMedia>
  ),
})

figma.connect(EmptyMedia, url, {
  variant: { Type: "Avatar" },
  imports: ['import { EmptyMedia } from "aperia-ds5"', 'import { Avatar, AvatarImage, AvatarFallback } from "aperia-ds5"'],
  props: {
    avatar: figma.instance("Avatar"),
  },
  example: ({ avatar }) => (
    <EmptyMedia>
      {avatar}
    </EmptyMedia>
  ),
})

figma.connect(EmptyMedia, url, {
  variant: { Type: "AvatarGroup" },
  imports: ['import { EmptyMedia } from "aperia-ds5"', 'import { Avatar, AvatarFallback, AvatarGroup } from "aperia-ds5"'],
  props: {
    avatarGroup: figma.instance("Avatar Group"),
  },
  example: ({ avatarGroup }) => (
    <EmptyMedia>
      {avatarGroup}
    </EmptyMedia>
  ),
})
