import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./navigation-menu"

const meta: Meta<typeof NavigationMenu> = {
  title: "UI/Navigation Menu",
  component: NavigationMenu,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof NavigationMenu>

const components: { title: string; description: string }[] = [
  { title: "Dashboard", description: "Overview of your metrics and KPIs." },
  { title: "Issues", description: "Track and resolve open issues." },
  { title: "Reports", description: "Generate and export reports." },
  { title: "Settings", description: "Configure your workspace." },
]

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-72 gap-1 p-1">
              {components.map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink href="#">
                    <div className="font-medium">{item.title}</div>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-56 gap-1 p-1">
              <li>
                <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">API Reference</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Changelog</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

export const NoViewport: Story = {
  render: () => (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>File</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-1">
              <li>
                <NavigationMenuLink href="#">New</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Open</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Save</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
