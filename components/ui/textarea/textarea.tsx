import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg bg-control shadow-sm ring-[0.5px] ring-input px-2.5 py-2 text-base transition-[color,background-color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:inset-ring-1 focus-visible:inset-ring-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-foreground/4 disabled:text-muted-foreground/70 disabled:placeholder:text-inherit dark:disabled:bg-control dark:disabled:text-foreground dark:disabled:opacity-50 aria-invalid:inset-ring-1 aria-invalid:inset-ring-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
