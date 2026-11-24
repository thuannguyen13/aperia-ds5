"use client"

import { useState } from "react"
import { UploadIcon } from "lucide-react"

import { describedBy, useFieldNote } from "../field-note/field-note"
import { cn } from "@/lib/utils"

/**
 * Where a file is picked: dropped on it, or chosen by clicking it. The one look of picking a file across every app;
 * what happens to the file (read in the browser, uploaded) stays with its caller. `multiple` takes several at once.
 * `hint` says what it accepts, under the zone; disabled with a `reason`, the reason shows there instead.
 */
export function FileDrop({
  id,
  label,
  accept,
  multiple = false,
  disabled = false,
  reason,
  hint,
  onFiles,
  className,
}: {
  /** The file input's id, for a field label. */
  id: string
  /** What the input is for, read out by a screen reader. */
  label: string
  accept?: string
  multiple?: boolean
  disabled?: boolean
  /** Why the zone takes no file while it is disabled, in place of the hint. */
  reason?: string | null
  /** What may be picked, such as its types and size, under the zone. */
  hint?: React.ReactNode
  onFiles: (files: File[]) => void
  className?: string
}) {
  const [over, setOver] = useState(false)
  const under = useFieldNote({ disabled, reason, description: hint })

  function take(list: FileList | null) {
    const files = [...(list ?? [])]
    if (files.length > 0) onFiles(multiple ? files : files.slice(0, 1))
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        data-disabled={disabled || undefined}
        onDragOver={(event) => {
          if (disabled) return
          event.preventDefault()
          setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(event) => {
          event.preventDefault()
          setOver(false)
          if (!disabled) take(event.dataTransfer.files)
        }}
        className={cn(
          // A dashed hairline, as an attachment waiting to be picked has: an outline, since a ring cannot be dashed.
          "flex cursor-pointer flex-col items-center gap-1 rounded-xl bg-control px-4 py-6 text-center outline-[0.5px] outline-input transition-[color,background-color,box-shadow] outline-dashed hover:bg-muted/50 has-focus-visible:ring-3 has-focus-visible:inset-ring-1 has-focus-visible:ring-ring/50 has-focus-visible:inset-ring-ring",
          over && "bg-muted/50 outline-ring",
          // Disabled as a field is: recessed in Light, faded in Dark, not-allowed over all of it.
          disabled &&
            "cursor-not-allowed bg-foreground/4 text-muted-foreground/70 hover:bg-foreground/4 dark:bg-control dark:text-foreground dark:opacity-50 dark:hover:bg-control"
        )}
      >
        <span className="mb-2 flex size-10 items-center justify-center rounded-lg bg-muted">
          <UploadIcon className="size-4" aria-hidden />
        </span>
        <span className="text-sm font-medium">
          {multiple ? "Drop files here" : "Drop a file here"}
        </span>
        <span className="text-sm text-muted-foreground">
          or click to browse
        </span>
        <input
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          aria-label={label}
          aria-describedby={describedBy(under.describes)}
          className="sr-only"
          onChange={(event) => {
            take(event.target.files)
            // Cleared, so picking the same file again still reports it.
            event.target.value = ""
          }}
        />
      </label>
      {under.note}
    </div>
  )
}
