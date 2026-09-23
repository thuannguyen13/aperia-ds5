import React from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
  InputGroupText,
} from "./input-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu/dropdown-menu"
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
  props: { button: figma.children("Button") },
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
  props: {
    icon: figma.nestedProps("IconPlaceholder", { icon: figma.instance("Lucide Icon") }),
  },
  example: ({ icon }) => (
    <InputGroup>
      <InputGroupAddon>{icon.icon}</InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
})

figma.connect(InputGroup, inlineUrl, {
  variant: { Variant: "Kbd" },
  imports,
  props: { kbd: figma.children("KbdGroup") },
  example: ({ kbd }) => (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">{kbd}</InputGroupAddon>
    </InputGroup>
  ),
})

figma.connect(InputGroup, inlineUrl, {
  variant: { Variant: "Spinner" },
  imports,
  props: { spinner: figma.children("Spinner") },
  example: ({ spinner }) => (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">{spinner}</InputGroupAddon>
    </InputGroup>
  ),
})

figma.connect(InputGroup, inlineUrl, {
  variant: { Variant: "Check Circle" },
  imports,
  props: {
    icon: figma.nestedProps("IconPlaceholder", { icon: figma.instance("Lucide Icon") }),
  },
  example: ({ icon }) => (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">{icon.icon}</InputGroupAddon>
    </InputGroup>
  ),
})

figma.connect(InputGroup, inlineUrl, {
  variant: { Variant: "Tooltip" },
  imports: [
    'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
    'import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "aperia-ds5"',
  ],
  props: {
    icon: figma.nestedProps("IconPlaceholder", { icon: figma.instance("Lucide Icon") }),
    tooltip: figma.nestedProps("Tooltip", { content: figma.string("Tooltip Text") }),
  },
  example: ({ icon, tooltip }) => (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton size="icon-xs">{icon.icon}</InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>{tooltip.content}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </InputGroupAddon>
    </InputGroup>
  ),
})

figma.connect(InputGroup, inlineUrl, {
  variant: { Variant: "Dropdown" },
  imports: [
    'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea, InputGroupText, InputGroupButton } from "aperia-ds5"',
    'import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "aperia-ds5"',
  ],
  props: { button: figma.children("Button") },
  example: ({ button }) => (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </InputGroupAddon>
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
