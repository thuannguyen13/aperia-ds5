import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "./item"
import figma from "@figma/code-connect"

figma.connect(Item, "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-198607", {
  imports: ['import { Item, ItemContent, ItemTitle, ItemDescription } from "aperia-ds5"'],
  props: {
    variant: figma.enum("Variant", {
      Default: "default",
      Outline: "outline",
      Muted: "muted",
    }),
    size: figma.enum("Size", {
      default: "default",
      sm: "sm",
      xs: "xs",
    }),
    header: figma.boolean("Show Header", {
      true: figma.instance("Swap Header"),
      false: undefined,
    }),
    media: figma.boolean("Show Media", {
      true: figma.children("Item / Media"),
      false: undefined,
    }),
    title: figma.string("Title Text"),
    description: figma.string("Description Text"),
    actions: figma.boolean("Show Actions", {
      true: figma.children("Item / Actions"),
      false: undefined,
    }),
  },
  example: ({ variant, size, header, media, title, description, actions }) => (
    <Item variant={variant} size={size}>
      {header}
      {media}
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      {actions}
    </Item>
  ),
})

// Figma draws "Icon" and "Icon (Simple)" differently; code has one icon style.
figma.connect(ItemMedia, "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-6043", {
  imports: ['import { ItemMedia } from "aperia-ds5"'],
  props: {
    variant: figma.enum("Variant", {
      Icon: "icon",
      "Icon (Simple)": "icon",
      Image: "image",
      Avatar: "default",
      AvatarGroup: "default",
    }),
    content: figma.children("*"),
  },
  example: ({ variant, content }) => <ItemMedia variant={variant}>{content}</ItemMedia>,
})

const actionsUrl = "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-218310"

figma.connect(ItemActions, actionsUrl, {
  variant: { Type: "Buttons" },
  imports: ['import { ItemActions } from "aperia-ds5"'],
  props: {
    first: figma.instance("Instance 1"),
    second: figma.boolean("Show Instance 2", {
      true: figma.instance("Instance 2"),
      false: undefined,
    }),
  },
  example: ({ first, second }) => (
    <ItemActions>
      {first}
      {second}
    </ItemActions>
  ),
})

figma.connect(ItemActions, actionsUrl, {
  variant: { Type: "Text + Button" },
  imports: ['import { ItemActions } from "aperia-ds5"'],
  props: {
    text: figma.string("Text"),
    button: figma.instance("Instance 1"),
  },
  example: ({ text, button }) => (
    <ItemActions>
      <span className="text-sm text-muted-foreground">{text}</span>
      {button}
    </ItemActions>
  ),
})

figma.connect(ItemActions, actionsUrl, {
  variant: { Type: "Icon" },
  imports: ['import { ItemActions } from "aperia-ds5"'],
  props: {
    icon: figma.nestedProps("IconPlaceholder", {
      glyph: figma.instance("Lucide Icon"),
    }),
  },
  example: ({ icon }) => <ItemActions>{icon.glyph}</ItemActions>,
})

figma.connect(ItemGroup, "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-218902", {
  imports: ['import { ItemGroup } from "aperia-ds5"'],
  props: {
    items: figma.slot("Items"),
  },
  example: ({ items }) => <ItemGroup>{items}</ItemGroup>,
})
