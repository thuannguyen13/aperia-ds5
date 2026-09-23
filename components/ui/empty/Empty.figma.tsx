import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "./empty"
import figma from "@figma/code-connect"

figma.connect(
  Empty,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-2962",
  {
    imports: ['import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "aperia-ds5"'],
    props: {
      media: figma.boolean("Show Media", {
        true: figma.children("Empty / Media"),
        false: undefined,
      }),
      titleText: figma.boolean("Show Title", {
        true: figma.string("Title Text"),
        false: undefined,
      }),
      descriptionText: figma.boolean("Show Description", {
        true: figma.string("Description Text"),
        false: undefined,
      }),
      content: figma.slot("Empty Content"),
    },
    example: ({ media, titleText, descriptionText, content }) => (
      <Empty>
        <EmptyHeader>
          {media}
          <EmptyTitle>{titleText}</EmptyTitle>
          <EmptyDescription>{descriptionText}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>{content}</EmptyContent>
      </Empty>
    ),
  }
)
