import React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import figma from "@figma/code-connect"

figma.connect(
  Table,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=325-388",
  {
    imports: [
      'import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "aperia-ds5"',
    ],
    props: {
      caption: figma.string("Caption Text"),
    },
    example: ({ caption }) => (
      <Table>
        <TableCaption>{caption}</TableCaption>
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
      </Table>
    ),
  }
)
