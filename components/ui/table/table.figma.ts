// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=325-388
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/table/table.tsx
// component=Table

import figma from "figma"

const caption = figma.selectedInstance.getString("Caption Text")

export default {
  id: "Table",
  imports: [
    'import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "aperia-ds5"',
  ],
  example: figma.code`<Table>
        <TableCaption>${figma.helpers.react.renderChildren(
          caption,
        )}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Column</TableHead>
            <TableHead>Column</TableHead>
            <TableHead>Column</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
            <TableCell>Cell</TableCell>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>`,
  metadata: { nestable: true },
}
