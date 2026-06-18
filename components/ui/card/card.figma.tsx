import figma from "@figma/code-connect"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card"

figma.connect(
  Card,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21123-292666",
  {
    imports: [
      'import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "aperia-ds5"',
    ],
    props: {
      content: figma.slot("Card Content"),
      footer: figma.slot("Card Footer"),
    },
    example: ({ content, footer }) => (
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>{content}</CardContent>
        <CardFooter>{footer}</CardFooter>
      </Card>
    ),
  }
)
