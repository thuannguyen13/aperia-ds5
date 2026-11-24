// url=https://www.figma.com/design/uXivJU4N3R0LWu0mbimHWt/Aperia-Shadcn-Library--Enhanced-?node-id=18482-48401
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/sonner/sonner.tsx
// component=Toaster

import figma from "figma"

// Represents a single toast notification. Place <Toaster /> at the app root,
// then trigger toasts anywhere with: toast("Title", { description: "..." })
export default {
  id: "Toaster",
  imports: ['import { Toaster, toast } from "aperia-ds5"'],
  example: figma.code`<Toaster />`,
}
