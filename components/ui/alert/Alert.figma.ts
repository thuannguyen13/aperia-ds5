// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=26-160
// source=components/ui/alert/alert.tsx
// component=Alert
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  'Default': 'default',
  'Destructive': 'destructive',
})

const showTitle = instance.getBoolean('Title')
const titleText = instance.getString('Title Text')
const showDescription = instance.getBoolean('Description')
const descriptionText = instance.getString('Description Text')
const showIcon = instance.getBoolean('Icon')
const showButton = instance.getBoolean('Button')

const iconInstance = showIcon ? instance.findInstance('IconPlaceholder') : null
let iconCode
if (iconInstance && iconInstance.type === 'INSTANCE') {
  iconCode = iconInstance.executeTemplate().example
}

const buttonInstance = showButton ? instance.findInstance('Button') : null
let buttonCode
if (buttonInstance && buttonInstance.type === 'INSTANCE') {
  buttonCode = buttonInstance.executeTemplate().example
}

export default {
  example: figma.code`
    <Alert${variant !== 'default' ? figma.code` variant="${variant}"` : ''}>
      ${iconCode}
      ${showTitle ? figma.code`<AlertTitle>${titleText}</AlertTitle>` : ''}
      ${showDescription ? figma.code`<AlertDescription>${descriptionText}</AlertDescription>` : ''}
      ${showButton ? figma.code`<AlertAction>${buttonCode}</AlertAction>` : ''}
    </Alert>
  `,
  imports: ['import { Alert, AlertTitle, AlertDescription, AlertAction } from "aperia-ds5"'],
  id: 'alert',
}
