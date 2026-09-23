// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=210-2036
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/navigation-menu/navigation-menu.tsx
// component=NavigationMenu

import figma from "figma"

export default {
  id: "NavigationMenu",
  imports: [
    'import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "aperia-ds5"',
  ],
  example: figma.code`<NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Link</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>`,
}
