// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=183-532
// source=components/ui/tabs/tabs.tsx
// component=TabsTrigger
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Tab Text')
const showIcon = instance.getBoolean('Show Icon')
const disabled = instance.getEnum('State', {
  'Default': false,
  'Hover': false,
  'Focus': false,
  'Disabled': true,
})

let iconCode
if (showIcon) {
  const iconPlaceholder = instance.findInstance('IconPlaceholder')
  if (iconPlaceholder && iconPlaceholder.type === 'INSTANCE') {
    iconCode = iconPlaceholder.executeTemplate().example
  }
}

export default {
  example: figma.code`<TabsTrigger value="..."${disabled ? figma.code` disabled` : ''}>${showIcon && iconCode ? iconCode : ''}${label}</TabsTrigger>`,
  imports: ['import { TabsTrigger } from "aperia-ds5"'],
  id: 'tabs-trigger',
  metadata: { nestable: true },
}
