import React from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
  InputGroupText,
} from "./input-group"
import figma from "@figma/code-connect"

// ─── Main InputGroup (node 18672-226415) ─────────────────────────────────────

const mainUrl =
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-226415"

const imports = [
  'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
]

figma.connect(InputGroup, mainUrl, {
  variant: { Type: "Input" },
  imports,
  props: {
    placeholder: figma.string("Placeholder Text"),
    disabled: figma.enum("State", {
      Default: false, Focus: false, Filled: false, Disabled: true, Invalid: false,
    }),
    invalid: figma.enum("State", {
      Default: false, Focus: false, Filled: false, Disabled: false, Invalid: true,
    }),
  },
  example: ({ placeholder, disabled, invalid }) => (
    <InputGroup>
      <InputGroupInput placeholder={placeholder} disabled={disabled} aria-invalid={invalid} />
    </InputGroup>
  ),
})

figma.connect(InputGroup, mainUrl, {
  variant: { Type: "Textarea" },
  imports,
  props: {
    placeholder: figma.string("Placeholder Text"),
    disabled: figma.enum("State", {
      Default: false, Focus: false, Filled: false, Disabled: true, Invalid: false,
    }),
    invalid: figma.enum("State", {
      Default: false, Focus: false, Filled: false, Disabled: false, Invalid: true,
    }),
  },
  example: ({ placeholder, disabled, invalid }) => (
    <InputGroup>
      <InputGroupTextarea placeholder={placeholder} disabled={disabled} aria-invalid={invalid} />
    </InputGroup>
  ),
})

// ─── Addon Inline (node 18677-9902) ──────────────────────────────────────────

const inlineUrl =
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18677-9902"


figma.connect(InputGroup, inlineUrl, {
  variant: { Variant: "Text" },
  imports,
  props: { text: figma.string("Text") },
  example: ({ text }) => (
    <InputGroup>
      <InputGroupAddon><InputGroupText>{text}</InputGroupText></InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
})

figma.connect(InputGroup, inlineUrl, {
  variant: { Variant: "Button" },
  imports,
  props: { button: figma.instance("Button") },
  example: ({ button }) => (
    <InputGroup>
      <InputGroupAddon>{button}</InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
})

figma.connect(InputGroup, inlineUrl, {
  variant: { Variant: "Icon" },
  imports,
  props: { icon: figma.instance("IconPlaceholder") },
  example: ({ icon }) => (
    <InputGroup>
      <InputGroupAddon>{icon}</InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
})

figma.connect(InputGroup, inlineUrl, {
  variant: { Variant: "Kbd" },
  imports,
  props: { icon: figma.instance("IconPlaceholder") },
  example: ({ icon }) => (
    <InputGroup>
      <InputGroupAddon>{icon}</InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
})

figma.connect(InputGroup, inlineUrl, {
  variant: { Variant: "Spinner" },
  imports,
  props: { icon: figma.instance("IconPlaceholder") },
  example: ({ icon }) => (
    <InputGroup>
      <InputGroupAddon>{icon}</InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
})

figma.connect(InputGroup, inlineUrl, {
  variant: { Variant: "Check Circle" },
  imports,
  props: { icon: figma.instance("IconPlaceholder") },
  example: ({ icon }) => (
    <InputGroup>
      <InputGroupAddon>{icon}</InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
})

figma.connect(InputGroup, inlineUrl, {
  variant: { Variant: "Tooltip" },
  imports,
  props: { icon: figma.instance("IconPlaceholder") },
  example: ({ icon }) => (
    <InputGroup>
      <InputGroupAddon>{icon}</InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
})

figma.connect(InputGroup, inlineUrl, {
  variant: { Variant: "Dropdown" },
  imports,
  props: { icon: figma.instance("IconPlaceholder") },
  example: ({ icon }) => (
    <InputGroup>
      <InputGroupAddon>{icon}</InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
})

// ─── Addon Block (node 18677-10743) ──────────────────────────────────────────

const blockUrl =
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18677-10743"


figma.connect(InputGroup, blockUrl, {
  variant: { Align: "Start" },
  imports,
  props: { addonContent: figma.children("*") },
  example: ({ addonContent }) => (
    <InputGroup>
      <InputGroupAddon align="block-start">{addonContent}</InputGroupAddon>
      <InputGroupInput placeholder="..." />
    </InputGroup>
  ),
})

figma.connect(InputGroup, blockUrl, {
  variant: { Align: "End" },
  imports,
  props: { addonContent: figma.children("*") },
  example: ({ addonContent }) => (
    <InputGroup>
      <InputGroupInput placeholder="..." />
      <InputGroupAddon align="block-end">{addonContent}</InputGroupAddon>
    </InputGroup>
  ),
})
