import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./context-menu"
import figma from "@figma/code-connect"

const itemUrl =
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=419-4521"

figma.connect(
  ContextMenu,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21473-105823",
  {
    imports: [
      'import { ContextMenu, ContextMenuTrigger, ContextMenuContent } from "aperia-ds5"',
    ],
    props: {
      items: figma.slot("Items"),
    },
    example: ({ items }) => (
      <ContextMenu>
        <ContextMenuTrigger>Right click here</ContextMenuTrigger>
        <ContextMenuContent>{items}</ContextMenuContent>
      </ContextMenu>
    ),
  }
)

figma.connect(ContextMenuItem, itemUrl, {
  variant: { Variant: "Default" },
  imports: ['import { ContextMenuItem, ContextMenuShortcut } from "aperia-ds5"'],
  props: {
    label: figma.string("ContextMenu Text"),
    icon: figma.boolean("Show Icon", {
      true: figma.nestedProps("IconPlaceholder", {
        icon: figma.instance("Lucide Icon"),
      }),
      false: { icon: undefined },
    }),
    shortcut: figma.boolean("Show Shortcut Text", {
      true: figma.string("Shortcut Text"),
      false: undefined,
    }),
    disabled: figma.enum("State", {
      Default: false,
      Hover: false,
      "Hover (Translucent)": false,
      Disabled: true,
    }),
  },
  example: ({ label, icon, shortcut, disabled }) => (
    <ContextMenuItem disabled={disabled}>
      {icon.icon}
      {label}
      <ContextMenuShortcut>{shortcut}</ContextMenuShortcut>
    </ContextMenuItem>
  ),
})

figma.connect(ContextMenuItem, itemUrl, {
  variant: { Variant: "Destructive" },
  imports: ['import { ContextMenuItem, ContextMenuShortcut } from "aperia-ds5"'],
  props: {
    label: figma.string("ContextMenu Text"),
    icon: figma.boolean("Show Icon", {
      true: figma.nestedProps("IconPlaceholder", {
        icon: figma.instance("Lucide Icon"),
      }),
      false: { icon: undefined },
    }),
    shortcut: figma.boolean("Show Shortcut Text", {
      true: figma.string("Shortcut Text"),
      false: undefined,
    }),
  },
  example: ({ label, icon, shortcut }) => (
    <ContextMenuItem variant="destructive">
      {icon.icon}
      {label}
      <ContextMenuShortcut>{shortcut}</ContextMenuShortcut>
    </ContextMenuItem>
  ),
})

// The Radio variant's IconPlaceholder is the checked indicator, which ContextMenuRadioItem renders itself
figma.connect(ContextMenuRadioItem, itemUrl, {
  variant: { Variant: "Radio" },
  imports: ['import { ContextMenuRadioItem } from "aperia-ds5"'],
  props: {
    label: figma.string("ContextMenu Text"),
    disabled: figma.enum("State", {
      Default: false,
      Hover: false,
      "Hover (Translucent)": false,
      Disabled: true,
    }),
  },
  example: ({ label, disabled }) => (
    <ContextMenuRadioItem value="value" disabled={disabled}>
      {label}
    </ContextMenuRadioItem>
  ),
})

figma.connect(
  ContextMenuLabel,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=419-4517",
  {
    imports: ['import { ContextMenuLabel } from "aperia-ds5"'],
    props: {
      label: figma.string("Title Text"),
    },
    example: ({ label }) => <ContextMenuLabel>{label}</ContextMenuLabel>,
  }
)

figma.connect(
  ContextMenuSeparator,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=249-5008",
  {
    imports: ['import { ContextMenuSeparator } from "aperia-ds5"'],
    example: () => <ContextMenuSeparator />,
  }
)

figma.connect(
  ContextMenuSubTrigger,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=419-4534",
  {
    imports: [
      'import { ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent } from "aperia-ds5"',
    ],
    props: {
      label: figma.string("SubTrigger Text"),
    },
    example: ({ label }) => (
      <ContextMenuSub>
        <ContextMenuSubTrigger>{label}</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          {/* submenu items */}
        </ContextMenuSubContent>
      </ContextMenuSub>
    ),
  }
)
