// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17100-29935
// source=components/ui/avatar/avatar.tsx
// component=Avatar
import figma from 'figma'
const instance = figma.selectedInstance

const type = instance.getEnum('Type', {
  'Image': 'image',
  'Fallback': 'fallback',
  'Icon': 'icon',
})

// Figma has xl/xs which don't exist in code — map to nearest available size
const size = instance.getEnum('Size', {
  'xl': 'lg',
  'lg': 'lg',
  'default': 'default',
  'sm': 'sm',
  'xs': 'sm',
})

const fallbackText = instance.getString('Fallback Text')
const showBadge = instance.getBoolean('Show Badge')

const iconPlaceholder = type === 'icon' ? instance.findInstance('IconPlaceholder') : null
let iconCode
if (iconPlaceholder && iconPlaceholder.type === 'INSTANCE') {
  iconCode = iconPlaceholder.executeTemplate().example
}

const badgeInstance = showBadge ? instance.findConnectedInstance('avatar-badge') : null
let badgeCode
if (badgeInstance && badgeInstance.type === 'INSTANCE') {
  badgeCode = badgeInstance.executeTemplate().example
}

export default {
  example: figma.code`
    <Avatar${size !== 'default' ? figma.code` size="${size}"` : ''}>
      ${type === 'image' ? figma.code`<AvatarImage src="..." alt="..." />` : ''}
      ${type === 'icon'
        ? figma.code`<AvatarFallback>${iconCode}</AvatarFallback>`
        : figma.code`<AvatarFallback>${fallbackText}</AvatarFallback>`}
      ${showBadge ? badgeCode : ''}
    </Avatar>
  `,
  imports: ['import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "aperia-ds5"'],
  id: 'avatar',
  metadata: { nestable: true },
}
