import figma from "@figma/code-connect"
import { Toaster } from "./sonner"

// Represents a single toast notification. Place <Toaster /> at the app root,
// then trigger toasts anywhere with: toast("Title", { description: "..." })
figma.connect(
  Toaster,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18482-48401",
  {
    imports: [
      'import { Toaster } from "aperia-ds5"',
      'import { toast } from "sonner"',
    ],
    example: () => (
      <Toaster />
    ),
  },
)
