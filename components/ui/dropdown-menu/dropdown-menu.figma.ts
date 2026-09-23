// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=336-5077
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/dropdown-menu/dropdown-menu.tsx
// component=DropdownMenu

import figma from "figma"

export default {
  id: "DropdownMenu",
  imports: [
    'import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "aperia-ds5"',
    'import { Button } from "aperia-ds5"',
  ],
  example: figma.code`<DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Label</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Item</DropdownMenuItem>
          <DropdownMenuItem>Item</DropdownMenuItem>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>`,
}
