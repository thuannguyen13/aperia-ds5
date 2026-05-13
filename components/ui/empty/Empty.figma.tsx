import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "./empty"
import figma from "@figma/code-connect"

figma.connect(
  Empty,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-2962",
  {
    imports: ['import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "aperia-ds5"'],
    props: {
      media: figma.boolean("Show Media", {
        true: figma.instance("Empty / Media"),
        false: undefined,
      }),
      titleText: figma.string("Title Text"),
      descriptionText: figma.string("Description Text"),
    },
    example: ({ media, titleText, descriptionText }) => (
      <Empty>
        <EmptyHeader>
          {media}
          <EmptyTitle>{titleText}</EmptyTitle>
          <EmptyDescription>{descriptionText}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          {/* action buttons */}
        </EmptyContent>
      </Empty>
    ),
  }
)
