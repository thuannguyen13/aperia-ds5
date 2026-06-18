import React from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"
import { Button } from "@/components/ui/button"
import figma from "@figma/code-connect"

figma.connect(
  Sheet,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=220-4633",
  {
    imports: [
      'import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "aperia-ds5"',
    ],
    props: {
      title: figma.string("Title Text"),
      description: figma.string("Description Text"),
      side: figma.enum("Position", {
        left: "left",
        right: "right",
        top: "top",
        bottom: "bottom",
      }),
      showCloseButton: figma.boolean("Show Close Button"),
      items: figma.slot("Items"),
      footer: figma.slot("_SheetFooter"),
    },
    example: ({ title, description, side, showCloseButton, items, footer }) => (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent side={side} showCloseButton={showCloseButton}>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          {items}
          <SheetFooter>{footer}</SheetFooter>
        </SheetContent>
      </Sheet>
    ),
  }
)
