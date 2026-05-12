import React from "react"
import { Tabs, TabsList, TabsContent } from "./tabs"
import figma from "@figma/code-connect"

figma.connect(
  Tabs,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21133-27311",
  {
    imports: ['import { Tabs, TabsList, TabsTrigger, TabsContent } from "aperia-ds5"'],
    props: {
      orientation: figma.enum("Orientation", {
        Default: "horizontal",
        Vertical: "vertical",
      }),
      variant: figma.enum("Variant", {
        Default: "default",
        Line: "line",
      }),
      items: figma.children("*"),
    },
    example: ({ orientation, variant, items }) => (
      <Tabs defaultValue="tab1" orientation={orientation}>
        <TabsList variant={variant}>{items}</TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>
    ),
  },
)
