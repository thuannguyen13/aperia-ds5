import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select"
import figma from "@figma/code-connect"

// Select — trigger with placeholder, size, and state props
figma.connect(
  Select,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=345-11530",
  {
    imports: [
      'import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "aperia-ds5"',
    ],
    props: {
      placeholder: figma.string("Placeholder"),
      size: figma.enum("Size", {
        default: "default",
        sm: "sm",
      }),
      disabled: figma.enum("State", {
        Default: false,
        Focus: false,
        Filled: false,
        "Filled (Focus)": false,
        Invalid: false,
        Disabled: true,
      }),
      invalid: figma.enum("State", {
        Default: false,
        Focus: false,
        Filled: false,
        "Filled (Focus)": false,
        Invalid: true,
        Disabled: false,
      }),
    },
    example: ({ placeholder, size, disabled, invalid }) => (
      <Select>
        <SelectTrigger size={size} disabled={disabled} aria-invalid={invalid}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option-1">Option 1</SelectItem>
          <SelectItem value="option-2">Option 2</SelectItem>
          <SelectItem value="option-3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    ),
  }
)

// Select Menu / Item — individual option inside SelectContent
figma.connect(
  SelectItem,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=118-1541",
  {
    imports: ['import { SelectItem } from "aperia-ds5"'],
    props: {
      label: figma.string("Select Item Text"),
    },
    example: ({ label }) => (
      <SelectItem value="value">{label}</SelectItem>
    ),
  }
)

// Select Menu / Label — group label inside SelectContent
figma.connect(
  SelectLabel,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=118-1542",
  {
    imports: ['import { SelectLabel } from "aperia-ds5"'],
    props: {
      label: figma.string("Label Text"),
    },
    example: ({ label }) => (
      <SelectLabel>{label}</SelectLabel>
    ),
  }
)

// Select Menu / Separator — divider inside SelectContent
figma.connect(
  SelectSeparator,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21141-30439",
  {
    imports: ['import { SelectSeparator } from "aperia-ds5"'],
    example: () => <SelectSeparator />,
  }
)

// Select / Menu — Figma-only open-state component; SelectMenu Group slot holds the items
figma.connect(
  Select,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21473-104411",
  {
    imports: [
      'import { Select, SelectTrigger, SelectValue, SelectContent } from "aperia-ds5"',
    ],
    props: {
      children: figma.slot("SelectMenu Group"),
    },
    example: ({ children }) => (
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        {/* Paste SelectContent after SelectTrigger inside your <Select> */}
        <SelectContent>
          {children}
        </SelectContent>
      </Select>
    ),
  }
)
