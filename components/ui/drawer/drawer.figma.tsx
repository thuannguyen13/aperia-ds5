import React from "react"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer"
import { Button } from "@/components/ui/button"
import figma from "@figma/code-connect"

figma.connect(
  Drawer,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=244-2831",
  {
    imports: [
      'import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "aperia-ds5"',
    ],
    props: {
      title: figma.string("Title Text"),
      description: figma.string("Description Text"),
      direction: figma.enum("Direction", {
        bottom: "bottom",
        top: "top",
        right: "right",
        left: "left",
      }),
      content: figma.slot("DrawerContent"),
      footer: figma.slot("Drawer Footer"),
    },
    example: ({ title, description, direction, content, footer }) => (
      <Drawer direction={direction}>
        <DrawerTrigger asChild>
          <Button>Open</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          {content}
          <DrawerFooter>{footer}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    ),
  }
)
