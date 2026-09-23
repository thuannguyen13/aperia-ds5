// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=83-122
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/alert-dialog/alert-dialog.tsx
// component=AlertDialog

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Destructive") === "No") {
  const titleText = figma.selectedInstance.getString("Title Text")
  const descriptionText = figma.selectedInstance.getString("Description Text")
  const size = figma.selectedInstance.getEnum("Size", {
    sm: "sm",
    default: "default",
  })

  template = {
    id: "AlertDialog",
    imports: [
      'import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "aperia-ds5"',
    ],
    example: figma.code`<AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent${figma.helpers.react.renderProp("size", size)}>
          <AlertDialogHeader>
            <AlertDialogTitle>${figma.helpers.react.renderChildren(
              titleText,
            )}</AlertDialogTitle>
            <AlertDialogDescription>${figma.helpers.react.renderChildren(
              descriptionText,
            )}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" size="default">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="default" size="default">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Destructive") === "Yes") {
  const titleText = figma.selectedInstance.getString("Title Text")
  const descriptionText = figma.selectedInstance.getString("Description Text")
  const size = figma.selectedInstance.getEnum("Size", {
    sm: "sm",
    default: "default",
  })

  template = {
    id: "AlertDialog",
    imports: [
      'import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "aperia-ds5"',
    ],
    example: figma.code`<AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent${figma.helpers.react.renderProp("size", size)}>
          <AlertDialogHeader>
            {/* Add <AlertDialogMedia> here when Show Media is enabled */}
            <AlertDialogTitle>${figma.helpers.react.renderChildren(
              titleText,
            )}</AlertDialogTitle>
            <AlertDialogDescription>${figma.helpers.react.renderChildren(
              descriptionText,
            )}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" size="default">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" size="default">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>`,
    metadata: { nestable: true },
  }
} else {
  const titleText = figma.selectedInstance.getString("Title Text")
  const descriptionText = figma.selectedInstance.getString("Description Text")
  const size = figma.selectedInstance.getEnum("Size", {
    sm: "sm",
    default: "default",
  })

  template = {
    id: "AlertDialog",
    imports: [
      'import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "aperia-ds5"',
    ],
    example: figma.code`<AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent${figma.helpers.react.renderProp("size", size)}>
          <AlertDialogHeader>
            {/* Add <AlertDialogMedia> here when Show Media is enabled */}
            <AlertDialogTitle>${figma.helpers.react.renderChildren(
              titleText,
            )}</AlertDialogTitle>
            <AlertDialogDescription>${figma.helpers.react.renderChildren(
              descriptionText,
            )}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" size="default">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" size="default">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>`,
    metadata: { nestable: true },
  }
}

export default template
