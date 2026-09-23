// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=112-601
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/dialog/dialog.tsx
// component=Dialog

import figma from "figma"

const title = figma.selectedInstance.getString("Title Text")
const description = figma.selectedInstance.getString("Description Text")
const showCloseButton = figma.selectedInstance.getBoolean("Show Close Button")
const content = figma.properties.slot("Dialog Content")
const footer = figma.properties.slot("Dialog Footer")

export default {
  id: "Dialog",
  imports: [
    'import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "aperia-ds5"',
  ],
  example: figma.code`<Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent${figma.helpers.react.renderProp(
          "showCloseButton",
          showCloseButton,
        )}>
          <DialogHeader>
            <DialogTitle>${figma.helpers.react.renderChildren(
              title,
            )}</DialogTitle>
            <DialogDescription>${figma.helpers.react.renderChildren(
              description,
            )}</DialogDescription>
          </DialogHeader>
          ${figma.helpers.react.renderChildren(content)}
          <DialogFooter>${figma.helpers.react.renderChildren(
            footer,
          )}</DialogFooter>
        </DialogContent>
      </Dialog>`,
  metadata: { nestable: true },
}
