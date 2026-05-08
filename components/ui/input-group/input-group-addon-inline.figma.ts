// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18677-9902
// source=components/ui/input-group/input-group.tsx
// component=InputGroup
import figma from 'figma'
const instance = figma.selectedInstance

const addonText = instance.getString('Text')

const variant = instance.getEnum('Variant', {
  'Icon': 'icon',
  'Text': 'text',
  'Kbd': 'kbd',
  'Spinner': 'spinner',
  'Check Circle': 'check-circle',
  'Button': 'button',
  'Tooltip': 'tooltip',
  'Dropdown': 'dropdown',
})

const buttonInstance = instance.findInstance('Button', { traverseInstances: true })
let buttonCode
if (buttonInstance && buttonInstance.type === 'INSTANCE') {
  buttonCode = buttonInstance.executeTemplate().example
}

const spinnerInstance = instance.findInstance('Spinner', { traverseInstances: true })
let spinnerCode
if (spinnerInstance && spinnerInstance.type === 'INSTANCE') {
  spinnerCode = spinnerInstance.executeTemplate().example
}

let addonInner
if (variant === 'text') {
  addonInner = figma.code`<InputGroupText>${addonText}</InputGroupText>`
} else if (variant === 'button' && buttonCode) {
  addonInner = buttonCode
} else if (variant === 'spinner' && spinnerCode) {
  addonInner = spinnerCode
}

export default {
  example: figma.code`<InputGroup>
  <InputGroupAddon>${addonInner}</InputGroupAddon>
  <InputGroupInput placeholder="Search..." />
</InputGroup>`,
  imports: [
    'import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupButton } from "aperia-ds5"',
  ],
  id: 'input-group-addon-inline',
  metadata: { nestable: false },
}
