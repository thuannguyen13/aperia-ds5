// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21122-16180
// source=components/ui/avatar/avatar.tsx
// component=AvatarBadge
import figma from 'figma'
const instance = figma.selectedInstance

const type = instance.getEnum('Type', {
  'Default': 'default',
  'Icon': 'icon',
})

const iconPlaceholder = type === 'icon' ? instance.findInstance('IconPlaceholder') : null
let iconCode
if (iconPlaceholder && iconPlaceholder.type === 'INSTANCE') {
  iconCode = iconPlaceholder.executeTemplate().example
}

export default {
  example: type === 'icon'
    ? figma.code`<AvatarBadge>${iconCode}</AvatarBadge>`
    : figma.code`<AvatarBadge />`,
  imports: ['import { AvatarBadge } from "aperia-ds5"'],
  id: 'avatar-badge',
  metadata: { nestable: true },
}
