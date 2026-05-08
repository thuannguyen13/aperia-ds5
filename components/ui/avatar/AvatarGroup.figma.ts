// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17100-83077
// source=components/ui/avatar/avatar.tsx
// component=AvatarGroup
import figma from 'figma'
const instance = figma.selectedInstance

const items = instance.getSlot('Items')

export default {
  example: figma.code`<AvatarGroup>${items}</AvatarGroup>`,
  imports: ['import { AvatarGroup } from "aperia-ds5"'],
  id: 'avatar-group',
}
