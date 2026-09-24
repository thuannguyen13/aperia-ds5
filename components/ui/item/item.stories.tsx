import type { Meta, StoryObj } from "@storybook/react-vite"
import { BadgeCheck, ChevronRight, FileText, ShieldAlert } from "lucide-react"
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
} from "./item"
import { Button } from "../button/button"

const meta: Meta<typeof Item> = {
  title: "UI/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "[View in Figma](https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-198607)",
      },
    },
  },
  args: {
    variant: "default",
    size: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "muted"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "xs"],
    },
  },
  render: ({ variant, size }) => (
    <Item variant={variant} size={size} className="w-96">
      <ItemContent>
        <ItemTitle>Statement ready</ItemTitle>
        <ItemDescription>The May statement for account 4021 is available to review.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Review
        </Button>
      </ItemActions>
    </Item>
  ),
}

export default meta
type Story = StoryObj<typeof Item>

export const Default: Story = {}

export const Outline: Story = { args: { variant: "outline" } }

export const Muted: Story = { args: { variant: "muted" } }

export const Sizes: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-2">
      {(["default", "sm", "xs"] as const).map((size) => (
        <Item key={size} variant="outline" size={size}>
          <ItemMedia variant="icon">
            <BadgeCheck />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Profile verified ({size})</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRight className="size-4" />
          </ItemActions>
        </Item>
      ))}
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Item variant="outline" className="w-96">
      <ItemMedia variant="icon">
        <ShieldAlert />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Security alert</ItemTitle>
        <ItemDescription>New sign-in detected from an unrecognized device.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Review
        </Button>
      </ItemActions>
    </Item>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Item variant="outline" className="w-96">
      <ItemMedia variant="image">
        <img src="https://github.com/shadcn.png" alt="shadcn" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>shadcn</ItemTitle>
        <ItemDescription>Invited you to the Billing workspace.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm">Accept</Button>
      </ItemActions>
    </Item>
  ),
}

export const AsLink: Story = {
  render: () => (
    <Item variant="outline" asChild className="w-96">
      <a href="#">
        <ItemMedia variant="icon">
          <FileText />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Billing policy</ItemTitle>
          <ItemDescription>Read how late fees and grace periods are applied.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRight className="size-4" />
        </ItemActions>
      </a>
    </Item>
  ),
}

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Item variant="outline" className="w-96">
      <ItemHeader>
        <span className="text-xs text-muted-foreground">Invoice #1042</span>
        <span className="text-xs text-muted-foreground">Due Jun 1</span>
      </ItemHeader>
      <ItemContent>
        <ItemTitle>Acme Corp</ItemTitle>
        <ItemDescription>Monthly service fee for May.</ItemDescription>
      </ItemContent>
      <ItemFooter>
        <span className="font-medium">$1,250.00</span>
        <Button size="sm">Pay now</Button>
      </ItemFooter>
    </Item>
  ),
}

export const Group: Story = {
  render: () => (
    <ItemGroup className="w-96">
      <Item>
        <ItemMedia variant="icon">
          <FileText />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>April statement</ItemTitle>
          <ItemDescription>Closed Apr 30</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia variant="icon">
          <FileText />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>May statement</ItemTitle>
          <ItemDescription>Closed May 31</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
}
