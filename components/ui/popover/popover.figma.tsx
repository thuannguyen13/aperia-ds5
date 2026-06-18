import figma from "@figma/code-connect"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover"

figma.connect(
  Popover,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=195-1621",
  {
    variant: { "Show Header": true },
    imports: ['import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "aperia-ds5"'],
    props: {
      title: figma.string("Title Text"),
      description: figma.string("Description Text"),
      items: figma.slot("Items"),
    },
    example: ({ title, description, items }) => (
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>{title}</PopoverTitle>
            <PopoverDescription>{description}</PopoverDescription>
          </PopoverHeader>
          {/* Add your content here */}
          {items}
        </PopoverContent>
      </Popover>
    ),
  }
)

figma.connect(
  Popover,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=195-1621",
  {
    variant: { "Show Header": false },
    imports: ['import { Popover, PopoverContent, PopoverTrigger } from "aperia-ds5"'],
    props: {
      items: figma.slot("Items"),
    },
    example: ({ items }) => (
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          {/* Add your content here */}
          {items}
        </PopoverContent>
      </Popover>
    ),
  }
)
