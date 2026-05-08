// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18677-10743
// source=components/ui/input-group/input-group.tsx
// component=InputGroup
import figma from 'figma'
const instance = figma.selectedInstance

const align = instance.getEnum('Align', {
  'Start': 'block-start',
  'End': 'block-end',
})

const showAddon1Start = instance.getBoolean('Addon 1 (start)')
const showAddon2Start = instance.getBoolean('Addon 2 (start)')
const showAddon1End = instance.getBoolean('Addon 1 (end)')
const showAddon2End = instance.getBoolean('Addon 2 (end)')

// Resolve nested Addon Inline instances
const addonInstances = instance.findConnectedInstances(
  (n) => n.codeConnectId() === 'input-group-addon-inline'
)
const addon1 = addonInstances[0]
let addon1Code
if (addon1 && addon1.type === 'INSTANCE') {
  addon1Code = addon1.executeTemplate().example
}
const addon2 = addonInstances[1]
let addon2Code
if (addon2 && addon2.type === 'INSTANCE') {
  addon2Code = addon2.executeTemplate().example
}

export default {
  example: figma.code`<InputGroup>
  ${showAddon1Start ? figma.code`<InputGroupAddon align="block-start">${addon1Code}</InputGroupAddon>` : ''}
  ${showAddon2Start ? figma.code`<InputGroupAddon align="block-start">${addon2Code}</InputGroupAddon>` : ''}
  <InputGroupInput placeholder="..." />
  ${showAddon1End ? figma.code`<InputGroupAddon align="block-end">${addon1Code}</InputGroupAddon>` : ''}
  ${showAddon2End ? figma.code`<InputGroupAddon align="block-end">${addon2Code}</InputGroupAddon>` : ''}
</InputGroup>`,
  imports: [
    'import { InputGroup, InputGroupAddon, InputGroupInput } from "aperia-ds5"',
  ],
  id: 'input-group-addon-block',
  metadata: { nestable: false },
}
