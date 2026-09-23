import React from "react"
import { TabsTrigger } from "./tabs"
import figma from "@figma/code-connect"

figma.connect(
  TabsTrigger,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=183-532",
  {
    imports: ['import { TabsTrigger } from "aperia-ds5"'],
    props: {
      label: figma.string("Tab Text"),
      disabled: figma.enum("State", {
        Default: false,
        Hover: false,
        Focus: false,
        Disabled: true,
      }),
      icon: figma.boolean("Show Icon", {
        true: figma.nestedProps("IconPlaceholder", {
          icon: figma.instance("Lucide Icon"),
        }),
        false: { icon: undefined },
      }),
      badge: figma.boolean("Badge", {
        true: figma.children("Badge Number"),
        false: undefined,
      }),
    },
    example: ({ label, disabled, icon, badge }) => (
      <TabsTrigger value="..." disabled={disabled}>
        {icon.icon}
        {label}
        {badge}
      </TabsTrigger>
    ),
  },
)
