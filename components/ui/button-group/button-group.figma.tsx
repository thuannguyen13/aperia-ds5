import React from "react"
import { ButtonGroup } from "./button-group"
import { Button } from "../button/button"
import { Input } from "../input/input"
import figma from "@figma/code-connect"

figma.connect(
  ButtonGroup,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-224279",
  {
    imports: ['import { ButtonGroup } from "aperia-ds5"'],
    props: {
      // Figma's Variant prop styles the child Buttons, not the group itself
      orientation: figma.enum("Orientation", {
        Horizontal: "horizontal",
        Vertical: "vertical",
      }),
      items: figma.slot("Items"),
    },
    example: ({ orientation, items }) => (
      <ButtonGroup orientation={orientation}>{items}</ButtonGroup>
    ),
  }
)

figma.connect(
  ButtonGroup,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18707-209306",
  {
    imports: ['import { ButtonGroup, Button, Input } from "aperia-ds5"'],
    props: {
      content: figma.enum("ButtonGroup Placement", {
        Start: (
          <>
            <Button variant="outline">Button</Button>
            <Input placeholder="Placeholder" />
          </>
        ),
        End: (
          <>
            <Input placeholder="Placeholder" />
            <Button variant="outline">Button</Button>
          </>
        ),
        Both: (
          <>
            <Button variant="outline">Button</Button>
            <Input placeholder="Placeholder" />
            <Button variant="outline">Button</Button>
          </>
        ),
      }),
    },
    example: ({ content }) => <ButtonGroup>{content}</ButtonGroup>,
  }
)
