// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21133-27311
// source=components/ui/tabs/tabs.tsx
// component=Tabs
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  'Default': 'default',
  'Line': 'line',
})

const orientation = instance.getEnum('Orientation', {
  'Default': 'horizontal',
  'Vertical': 'vertical',
})

const items = instance.getSlot('Items')

export default {
  example: figma.code`<Tabs defaultValue="tab1"${orientation === 'vertical' ? figma.code` orientation="vertical"` : ''}>
  <TabsList${variant === 'line' ? figma.code` variant="line"` : ''}>
    ${items}
  </TabsList>
  <TabsContent value="tab1">Content</TabsContent>
</Tabs>`,
  imports: ['import { Tabs, TabsList, TabsTrigger, TabsContent } from "aperia-ds5"'],
  id: 'tabs',
}
