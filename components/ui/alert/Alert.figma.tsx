import React from "react"
import { Alert, AlertTitle, AlertDescription, AlertAction } from "./alert"
import figma from "@figma/code-connect"

figma.connect(
  Alert,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=26-160",
  {
    imports: ['import { Alert, AlertTitle, AlertDescription, AlertAction } from "aperia-ds5"'],
    props: {
      variant: figma.enum("Variant", {
        Default: "default",
        Destructive: "destructive",
      }),
      icon: figma.boolean("Icon", {
        true: figma.instance("IconPlaceholder"),
        false: undefined,
      }),
      title: figma.string("Title Text"),
      description: figma.string("Description Text"),
    },
    example: ({ variant, icon, title, description }) => (
      <Alert variant={variant}>
        {icon}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    ),
  },
)
