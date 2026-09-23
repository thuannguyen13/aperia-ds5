// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=244-2831
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/drawer/drawer.tsx
// component=Drawer

import figma from "figma"

const title = figma.selectedInstance.getString("Title Text")
const description = figma.selectedInstance.getString("Description Text")
const direction = figma.selectedInstance.getEnum("Direction", {
  bottom: "bottom",
  top: "top",
  right: "right",
  left: "left",
})
const content = figma.properties.slot("DrawerContent")
const footer = figma.properties.slot("Drawer Footer")

export default {
  id: "Drawer",
  imports: [
    'import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, Button } from "aperia-ds5"',
  ],
  example: figma.code`<Drawer${figma.helpers.react.renderProp(
    "direction",
    direction,
  )}>
        <DrawerTrigger asChild>
          <Button>Open</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>${figma.helpers.react.renderChildren(
              title,
            )}</DrawerTitle>
            <DrawerDescription>${figma.helpers.react.renderChildren(
              description,
            )}</DrawerDescription>
          </DrawerHeader>
          ${figma.helpers.react.renderChildren(content)}
          <DrawerFooter>${figma.helpers.react.renderChildren(
            footer,
          )}</DrawerFooter>
        </DrawerContent>
      </Drawer>`,
  metadata: { nestable: true },
}
