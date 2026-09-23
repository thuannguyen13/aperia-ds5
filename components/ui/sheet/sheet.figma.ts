// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=220-4633
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/sheet/sheet.tsx
// component=Sheet

import figma from "figma"

const title = figma.selectedInstance.getString("Title Text")
const description = figma.selectedInstance.getString("Description Text")
const side = figma.selectedInstance.getEnum("Position", {
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom",
})
const showCloseButton = figma.selectedInstance.getBoolean("Show Close Button")
const items = figma.properties.slot("Items")
const footer = figma.properties.slot("_SheetFooter")

export default {
  id: "Sheet",
  imports: [
    'import { Button, Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "aperia-ds5"',
  ],
  example: figma.code`<Sheet>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent${figma.helpers.react.renderProp(
          "side",
          side,
        )}${figma.helpers.react.renderProp("showCloseButton", showCloseButton)}>
          <SheetHeader>
            <SheetTitle>${figma.helpers.react.renderChildren(
              title,
            )}</SheetTitle>
            <SheetDescription>${figma.helpers.react.renderChildren(
              description,
            )}</SheetDescription>
          </SheetHeader>
          ${figma.helpers.react.renderChildren(items)}
          <SheetFooter>${figma.helpers.react.renderChildren(
            footer,
          )}</SheetFooter>
        </SheetContent>
      </Sheet>`,
  metadata: { nestable: true },
}
