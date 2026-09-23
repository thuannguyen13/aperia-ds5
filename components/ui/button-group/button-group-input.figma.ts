// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18707-209306
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/button-group/button-group.tsx
// component=ButtonGroup

import figma from "figma"

const content = figma.selectedInstance.getEnum("ButtonGroup Placement", {
  Start: figma.code`
        <Button variant="outline">Button</Button>
        <Input placeholder="Placeholder" />
      `,
  End: figma.code`
        <Input placeholder="Placeholder" />
        <Button variant="outline">Button</Button>
      `,
  Both: figma.code`
        <Button variant="outline">Button</Button>
        <Input placeholder="Placeholder" />
        <Button variant="outline">Button</Button>
      `,
})

export default {
  id: "ButtonGroup",
  imports: ['import { ButtonGroup, Button, Input } from "aperia-ds5"'],
  example: figma.code`<ButtonGroup>${content}</ButtonGroup>`,
  metadata: { nestable: true },
}
