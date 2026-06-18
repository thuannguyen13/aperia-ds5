import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Button } from "@/components/ui/button"
import figma from "@figma/code-connect"

figma.connect(
  Dialog,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=112-601",
  {
    imports: [
      'import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "aperia-ds5"',
    ],
    props: {
      title: figma.string("Title Text"),
      description: figma.string("Description Text"),
      showCloseButton: figma.boolean("Show Close Button"),
      content: figma.slot("Dialog Content"),
      footer: figma.slot("Dialog Footer"),
    },
    example: ({ title, description, showCloseButton, content, footer }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent showCloseButton={showCloseButton}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {content}
          <DialogFooter>{footer}</DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  }
)
