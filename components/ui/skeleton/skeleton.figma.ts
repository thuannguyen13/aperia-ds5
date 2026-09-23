// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=295-462
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/skeleton/skeleton.tsx
// component=Skeleton

import figma from "figma"

export default {
  id: "Skeleton",
  imports: ['import { Skeleton } from "aperia-ds5"'],
  example: figma.code`<div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[250px]"/>
        <Skeleton className="h-4 w-[200px]"/>
      </div>`,
}
