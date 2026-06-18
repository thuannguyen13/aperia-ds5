import figma from "@figma/code-connect"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog"
figma.connect(
  AlertDialog,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=83-122",
  {
    variant: { Destructive: "No" },
    imports: [
      'import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "aperia-ds5"',
    ],
    props: {
      titleText: figma.string("Title Text"),
      descriptionText: figma.string("Description Text"),
      size: figma.enum("Size", { sm: "sm", default: "default" }),
    },
    example: ({ titleText, descriptionText, size }) => (
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent size={size}>
          <AlertDialogHeader>
            <AlertDialogTitle>{titleText}</AlertDialogTitle>
            <AlertDialogDescription>{descriptionText}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" size="default">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="default" size="default">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
)

figma.connect(
  AlertDialog,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=83-122",
  {
    variant: { Destructive: "Yes" },
    imports: [
      'import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "aperia-ds5"',
    ],
    props: {
      titleText: figma.string("Title Text"),
      descriptionText: figma.string("Description Text"),
      size: figma.enum("Size", { sm: "sm", default: "default" }),
    },
    example: ({ titleText, descriptionText, size }) => (
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent size={size}>
          <AlertDialogHeader>
            {/* Add <AlertDialogMedia> here when Show Media is enabled */}
            <AlertDialogTitle>{titleText}</AlertDialogTitle>
            <AlertDialogDescription>{descriptionText}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" size="default">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" size="default">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
)
