import figma from "@figma/code-connect"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb"

figma.connect(
  Breadcrumb,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=109-947",
  {
    imports: [
      'import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "aperia-ds5"',
    ],
    example: () => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
  },
)

figma.connect(
  BreadcrumbItem,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=195-1993",
  {
    variant: { Variant: "Link" },
    imports: [
      'import { BreadcrumbItem, BreadcrumbLink } from "aperia-ds5"',
    ],
    props: {
      label: figma.string("Breadcrumb Text"),
    },
    example: ({ label }) => (
      <BreadcrumbItem>
        <BreadcrumbLink href="#">{label}</BreadcrumbLink>
      </BreadcrumbItem>
    ),
  },
)

figma.connect(
  BreadcrumbItem,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=195-1993",
  {
    variant: { Variant: "Link Current" },
    imports: [
      'import { BreadcrumbItem, BreadcrumbPage } from "aperia-ds5"',
    ],
    props: {
      label: figma.string("Breadcrumb Text"),
    },
    example: ({ label }) => (
      <BreadcrumbItem>
        <BreadcrumbPage>{label}</BreadcrumbPage>
      </BreadcrumbItem>
    ),
  },
)
