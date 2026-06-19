import figma from "@figma/code-connect"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./resizable"

figma.connect(
  ResizablePanelGroup,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17382-7210",
  {
    imports: [
      'import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "aperia-ds5"',
    ],
    props: {
      panel1: figma.slot("Panel 1#21360:13"),
      panel2: figma.slot("Panel 2#21360:12"),
    },
    example: ({ panel1, panel2 }) => (
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>{panel1}</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>{panel2}</ResizablePanel>
      </ResizablePanelGroup>
    ),
  },
)
