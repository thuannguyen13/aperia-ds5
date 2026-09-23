// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17382-7210
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/resizable/resizable.tsx
// component=ResizablePanelGroup

import figma from "figma"

const panel1 = figma.properties.slot("Panel 1#21360:13")
const panel2 = figma.properties.slot("Panel 2#21360:12")

export default {
  id: "ResizablePanelGroup",
  imports: [
    'import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "aperia-ds5"',
  ],
  example: figma.code`<ResizablePanelGroup direction="horizontal">
        <ResizablePanel>${figma.helpers.react.renderChildren(
          panel1,
        )}</ResizablePanel>
        <ResizableHandle withHandle/>
        <ResizablePanel>${figma.helpers.react.renderChildren(
          panel2,
        )}</ResizablePanel>
      </ResizablePanelGroup>`,
  metadata: { nestable: true },
}
