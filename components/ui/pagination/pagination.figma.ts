// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=208-1701
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/pagination/pagination.tsx
// component=Pagination

import figma from "figma"

export default {
  id: "Pagination",
  imports: [
    'import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "aperia-ds5"',
  ],
  example: figma.code`<Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#"/>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#"/>
          </PaginationItem>
        </PaginationContent>
      </Pagination>`,
}
