// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18482-48401
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/sonner/sonner.tsx
// component=Toaster

import figma from "figma"

// Represents a single toast notification. Place <Toaster /> at the app root,
// then trigger toasts anywhere with: toast("Title", { description: "..." })
export default {
  id: "Toaster",
  imports: [
    'import { Toaster } from "aperia-ds5"',
    'import { toast } from "sonner"',
  ],
  example: figma.code`<Toaster />`,
}
