// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-2962
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/empty/empty.tsx
// component=Empty

import figma from "figma"

const media = figma.selectedInstance.getBoolean("Show Media", {
  true: figma.properties.children(["Empty / Media"]),
  false: undefined,
})
const titleText = figma.selectedInstance.getBoolean("Show Title", {
  true: figma.selectedInstance.getString("Title Text"),
  false: undefined,
})
const descriptionText = figma.selectedInstance.getBoolean("Show Description", {
  true: figma.selectedInstance.getString("Description Text"),
  false: undefined,
})
const content = figma.properties.slot("Empty Content")

export default {
  id: "Empty",
  imports: [
    'import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "aperia-ds5"',
  ],
  example: figma.code`<Empty>
        <EmptyHeader>
          ${figma.helpers.react.renderChildren(media)}
          <EmptyTitle>${figma.helpers.react.renderChildren(
            titleText,
          )}</EmptyTitle>
          <EmptyDescription>${figma.helpers.react.renderChildren(
            descriptionText,
          )}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>${figma.helpers.react.renderChildren(
          content,
        )}</EmptyContent>
      </Empty>`,
  metadata: { nestable: true },
}
