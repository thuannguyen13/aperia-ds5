import figma from "@figma/code-connect"
import { Skeleton } from "./skeleton"

figma.connect(
  Skeleton,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=295-462",
  {
    imports: ['import { Skeleton } from "aperia-ds5"'],
    example: () => (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    ),
  }
)
