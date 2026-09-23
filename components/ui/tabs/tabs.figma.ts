// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21133-27311
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/tabs/tabs.tsx
// component=Tabs

import figma from "figma"

const orientation = figma.selectedInstance.getEnum("Orientation", {
  Default: "horizontal",
  Vertical: "vertical",
})
const variant = figma.selectedInstance.getEnum("Variant", {
  Default: "default",
  Line: "line",
})
const items = figma.properties.slot("Items")

export default {
  id: "Tabs",
  imports: [
    'import { Tabs, TabsList, TabsTrigger, TabsContent } from "aperia-ds5"',
  ],
  example: figma.code`<Tabs defaultValue="tab1"${figma.helpers.react.renderProp(
    "orientation",
    orientation,
  )}>
        <TabsList${figma.helpers.react.renderProp(
          "variant",
          variant,
        )}>${figma.helpers.react.renderChildren(items)}</TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>`,
  metadata: { nestable: true },
}
