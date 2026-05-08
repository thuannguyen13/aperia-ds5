// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=65-533
// source=components/ui/input/input.tsx
// component=Input
import figma from 'figma'
const instance = figma.selectedInstance

const placeholder = instance.getString('Placeholder Text')

const type = instance.getEnum('Variant', {
  'Default': '',
  'Password': 'password',
  'File': 'file',
})

const state = instance.getEnum('State', {
  'Default': 'default',
  'Focus': 'default',
  'Filled': 'default',
  'Disabled': 'disabled',
  'Invalid': 'invalid',
})

export default {
  example: figma.code`<Input
  ${type ? figma.code`type="${type}"` : ''}
  placeholder="${placeholder}"
  ${state === 'disabled' ? 'disabled' : ''}
  ${state === 'invalid' ? 'aria-invalid' : ''}
/>`,
  imports: ['import { Input } from "aperia-ds5"'],
  id: 'input',
  metadata: { nestable: true },
}
