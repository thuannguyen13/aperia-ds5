// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21123-292666
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/card/card.tsx
// component=Card

import figma from "figma"

const content = figma.properties.slot("Card Content")
const footer = figma.properties.slot("Card Footer")

export default {
  id: "Card",
  imports: [
    'import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "aperia-ds5"',
  ],
  example: figma.code`<Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>${figma.helpers.react.renderChildren(
          content,
        )}</CardContent>
        <CardFooter>${figma.helpers.react.renderChildren(footer)}</CardFooter>
      </Card>`,
  metadata: { nestable: true },
}
