import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "./combobox"
import figma from "@figma/code-connect"

figma.connect(Combobox, "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21180-33376", {
  imports: ['import { Combobox } from "aperia-ds5"'],
  props: {
    parts: figma.children(["Combobox / Item", "Combobox / Combobox List"]),
  },
  example: ({ parts }) => (
    <Combobox>
      {/* pass items={...} to enable filtering */}
      {parts}
    </Combobox>
  ),
})

// "Combobox / Item" is the input field. Focus and Active are interaction states with no prop.
const inputUrl = "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=430-4114"

figma.connect(ComboboxInput, inputUrl, {
  variant: { Type: "Default" },
  imports: ['import { ComboboxInput } from "aperia-ds5"'],
  props: {
    placeholder: figma.string("Text"),
    disabled: figma.enum("State", {
      Default: false,
      Focus: false,
      Active: false,
      Disabled: true,
    }),
    addon: figma.boolean("Addon Inline", {
      true: figma.children("InputGroup / Addon Inline"),
      false: undefined,
    }),
  },
  example: ({ placeholder, disabled, addon }) => (
    <ComboboxInput placeholder={placeholder} disabled={disabled}>
      {addon}
    </ComboboxInput>
  ),
})

figma.connect(ComboboxInput, inputUrl, {
  variant: { Type: "Invalid" },
  imports: ['import { ComboboxInput } from "aperia-ds5"'],
  props: {
    placeholder: figma.string("Text"),
    disabled: figma.enum("State", {
      Default: false,
      Focus: false,
      Active: false,
      Disabled: true,
    }),
  },
  example: ({ placeholder, disabled }) => (
    <ComboboxInput placeholder={placeholder} disabled={disabled} aria-invalid />
  ),
})

figma.connect(ComboboxChips, inputUrl, {
  variant: { Type: "Multiple" },
  imports: ['import { ComboboxChips, ComboboxChip, ComboboxChipsInput } from "aperia-ds5"'],
  props: {
    chips: figma.slot("Multiple Selection Items"),
    placeholder: figma.string("Text"),
  },
  example: ({ chips, placeholder }) => (
    <ComboboxChips>
      {/* pass ref={useComboboxAnchor()} here and anchor={ref} to ComboboxContent */}
      {chips}
      <ComboboxChipsInput placeholder={placeholder} />
    </ComboboxChips>
  ),
})

// Color and Appearance (Inverted, Translucent) have no code props.
figma.connect(ComboboxList, "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21473-103072", {
  imports: ['import { ComboboxContent, ComboboxInput, ComboboxList } from "aperia-ds5"'],
  props: {
    search: figma.boolean("Search Input", {
      true: <ComboboxInput showTrigger={false} placeholder="Search" />,
      false: undefined,
    }),
    items: figma.slot("Items"),
  },
  example: ({ search, items }) => (
    <ComboboxContent>
      {search}
      <ComboboxList>{items}</ComboboxList>
    </ComboboxContent>
  ),
})

// Selected and hover are runtime state in code, so they are not mapped.
const menuItemUrl = "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17379-199232"

figma.connect(ComboboxItem, menuItemUrl, {
  variant: { Type: "Simple" },
  imports: ['import { ComboboxItem } from "aperia-ds5"'],
  props: {
    label: figma.string("Select Item"),
  },
  example: ({ label }) => <ComboboxItem value={label}>{label}</ComboboxItem>,
})

figma.connect(ComboboxItem, menuItemUrl, {
  variant: { Type: "Custom" },
  imports: [
    'import { ComboboxItem, Item, ItemContent, ItemTitle, ItemDescription } from "aperia-ds5"',
  ],
  props: {
    label: figma.string("Select Item"),
    description: figma.string("Select Description"),
  },
  example: ({ label, description }) => (
    <ComboboxItem value={label}>
      <Item size="xs" className="p-0">
        <ItemContent>
          <ItemTitle>{label}</ItemTitle>
          <ItemDescription>{description}</ItemDescription>
        </ItemContent>
      </Item>
    </ComboboxItem>
  ),
})

figma.connect(ComboboxLabel, "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21180-30836", {
  imports: ['import { ComboboxLabel } from "aperia-ds5"'],
  props: {
    label: figma.string("Select Label"),
  },
  example: ({ label }) => (
    <ComboboxLabel>
      {/* place inside a ComboboxGroup */}
      {label}
    </ComboboxLabel>
  ),
})

figma.connect(ComboboxSeparator, "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21180-30899", {
  imports: ['import { ComboboxSeparator } from "aperia-ds5"'],
  example: () => <ComboboxSeparator />,
})

figma.connect(ComboboxChip, "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21180-30054", {
  imports: ['import { ComboboxChip } from "aperia-ds5"'],
  props: {
    label: figma.string("Text"),
  },
  example: ({ label }) => <ComboboxChip>{label}</ComboboxChip>,
})
