"use client"

import { useRef } from "react"
import { FileIcon, Trash2Icon } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "../attachment/attachment"
import { FileDrop } from "../file-drop/file-drop"
import { Spinner } from "../spinner/spinner"
import { draftKey } from "@/lib/draft-key"
import { plural } from "@/lib/format"
import { cn } from "@/lib/utils"
import { fileRefusal, fileSize } from "./file-size"

/** A stored file's id, as the app's store gives it. */
export type FileId = string | number

/**
 * A file on a form. Stored: it has an id and downloads. Uploading: on its way, so the form cannot save yet. Failed: it
 * was refused, with the reason; it is not part of the answer. `staged` is a file uploaded since the form opened and not
 * yet saved with it: taking it off the form deletes it at once, where one already saved goes only when the form saves.
 */
export type PickedFile = {
  key: string
  id?: FileId
  name: string
  size: number
  state: "stored" | "uploading" | "failed"
  staged: boolean
  error?: string
  /** A picture of an image picked in this browser, shown until the page leaves. */
  preview?: string
}

/** A file as the app's store holds it. */
export type StoredFile = { id: FileId; name: string; size: number }

/** Whether a file is an image the browser draws, by its name: a stored file keeps only that. */
const IMAGE = /\.(png|jpe?g|gif|webp|avif|svg)$/i
const isImage = (name: string) => IMAGE.test(name)

/** A file already saved, as the picker lists it. */
export const storedFile = (file: StoredFile): PickedFile => ({
  key: draftKey("file"),
  ...file,
  state: "stored",
  staged: false,
})

/** Whether a file is still on its way, which holds the save back. */
export const isUploading = (files: PickedFile[]) =>
  files.some((file) => file.state === "uploading")

/** The ids a save sends: the files that are in. */
export const storedIds = (files: PickedFile[]) =>
  files.flatMap((file) =>
    file.state === "stored" && file.id !== undefined ? [file.id] : []
  )

/** Files uploaded and not yet saved, for a form that closes without saving to throw away. */
export const stagedIds = (files: PickedFile[]) =>
  files.flatMap((file) =>
    file.staged && file.id !== undefined ? [file.id] : []
  )

/** Uploads one file: the stored file, or the reason it was refused. */
export type UploadFile = (file: File) => Promise<StoredFile | string>

/** A change as a function of the files, since an upload finishes after the form has moved on. */
export type FilePickerChange = (
  update: (files: PickedFile[]) => PickedFile[]
) => void

/**
 * Files on a form, as attachments: each downloads, each can be taken off, and more are dropped or chosen in a
 * `FileDrop` up to `max`. Uploads go one at a time as they are picked, through `upload`, which returns the stored file
 * or the reason it was refused; a refused file stays in the list with its reason, in place. Read only, it lists the
 * downloads alone.
 */
export function FilePicker({
  id,
  label,
  files,
  onChange,
  max,
  maxSize,
  accept,
  hint,
  disabled = false,
  reason,
  upload,
  href,
  onRemove,
  readOnly = false,
  none,
  inline = false,
}: {
  /** The file input's id, for the field's label. */
  id: string
  /** What the field is called, so the drop zone says which field it is for. */
  label: string
  files: PickedFile[]
  /** Gets a change as a function of the files, since an upload finishes after the form has moved on. */
  onChange: FilePickerChange
  max: number
  /** The largest file taken, in bytes; a larger one is refused before it goes up. */
  maxSize?: number
  accept?: string
  /** What may be picked, under the drop zone, such as "PDF or XLSX, up to 4 MB each." */
  hint?: React.ReactNode
  disabled?: boolean
  /** Why no file can be added while it is disabled, under the drop zone. */
  reason?: string | null
  /** How a picked file goes up; left out, the list only takes files off. */
  upload?: UploadFile
  /** Where a stored file downloads from. */
  href: (id: FileId) => string
  /** Told as a file is taken off, so a waiting one can be deleted. */
  onRemove?: (file: PickedFile) => void
  readOnly?: boolean
  /** What a read-only list with no files says, such as "No attachments". */
  none?: string
  /** Lays the files out as small chips side by side, wrapping, a line each, where height is short. */
  inline?: boolean
}) {
  // Uploads one after another, however many were picked and however often.
  const queue = useRef(Promise.resolve())
  const counted = files.filter((file) => file.state !== "failed").length
  const full = counted >= max

  function settle(key: string, change: (file: PickedFile) => PickedFile) {
    onChange((current) =>
      current.map((file) => (file.key === key ? change(file) : file))
    )
  }

  function pick(picked: File[]) {
    let room = max - counted
    const added: PickedFile[] = []
    for (const file of picked) {
      const row: PickedFile = {
        key: draftKey("file"),
        name: file.name,
        size: file.size,
        state: "uploading",
        staged: false,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      }
      const refusal =
        room <= 0
          ? `Up to ${plural(max, "file", "files")}.`
          : file.size === 0
            ? fileRefusal.empty(file.name)
            : maxSize !== undefined && file.size > maxSize
              ? fileRefusal.tooBig(file.name, maxSize)
              : null
      if (refusal) {
        added.push({ ...row, state: "failed", error: refusal })
        continue
      }
      room -= 1
      added.push(row)
      queue.current = queue.current.then(async () => {
        let result: Awaited<ReturnType<UploadFile>>
        try {
          result = await upload!(file)
        } catch {
          result = fileRefusal.notUploaded(file.name)
        }
        settle(
          row.key,
          (current): PickedFile =>
            typeof result === "string"
              ? { ...current, state: "failed", error: result }
              : { ...current, ...result, state: "stored", staged: true }
        )
      })
    }
    onChange((current) => [...current, ...added])
  }

  const list = files.length > 0 && (
    <AttachmentGroup
      // The group scrolls sideways, clipping what reaches its edges, a file's shadow included; these lists wrap or
      // stack instead, so nothing needs to scroll.
      className={cn(
        "overflow-visible",
        inline ? "flex flex-wrap gap-2" : "flex flex-col items-stretch gap-2"
      )}
    >
      {files.map((file) => {
        const stored = file.state === "stored" && file.id !== undefined
        return (
          <Attachment
            key={file.key}
            state={
              file.state === "stored"
                ? "done"
                : file.state === "uploading"
                  ? "uploading"
                  : "error"
            }
            size={inline ? "xs" : "default"}
            // Inline, the picture keeps the same inset on every side: the two lines of text make the chip taller than it.
            className={
              inline
                ? "w-auto max-w-64 min-w-0 has-data-[slot=attachment-media]:p-1.5"
                : "w-full"
            }
          >
            <AttachmentMedia>
              {file.state === "failed" ? (
                <FileIcon />
              ) : file.preview || (stored && isImage(file.name)) ? (
                // A thumbnail: the picture picked here, else the stored image from its download.
                <img
                  src={file.preview ?? href(file.id!)}
                  alt=""
                  className="size-full object-cover"
                />
              ) : file.state === "uploading" ? (
                <Spinner />
              ) : (
                <FileIcon />
              )}
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{file.name}</AttachmentTitle>
              <AttachmentDescription
                className={
                  file.state === "failed" ? "text-destructive" : undefined
                }
              >
                {file.state === "uploading"
                  ? "Uploading"
                  : file.state === "failed"
                    ? (file.error ?? fileRefusal.notUploaded(file.name))
                    : fileSize(file.size)}
              </AttachmentDescription>
            </AttachmentContent>
            {/* A stored file downloads from anywhere on it; the Remove button stays above that. */}
            {stored && (
              <AttachmentTrigger asChild>
                <a href={href(file.id!)} aria-label={`Download ${file.name}`} />
              </AttachmentTrigger>
            )}
            {!readOnly && (
              <AttachmentActions>
                <AttachmentAction
                  // Not a submit button: Enter in any field of the form around it would press it, taking the file off.
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  disabled={file.state === "uploading"}
                  onClick={() => {
                    if (file.preview) URL.revokeObjectURL(file.preview)
                    onChange((current) =>
                      current.filter((each) => each.key !== file.key)
                    )
                    onRemove?.(file)
                  }}
                >
                  <Trash2Icon />
                </AttachmentAction>
              </AttachmentActions>
            )}
          </Attachment>
        )
      })}
    </AttachmentGroup>
  )

  // Without an upload the list only gives files up, as an email's attachments do: no place to drop more.
  if (readOnly || !upload)
    return (
      list ||
      (none ? <p className="text-sm text-muted-foreground">{none}</p> : null)
    )
  return (
    <div className="flex flex-col gap-2">
      {list}
      {full ? (
        <span className="text-sm text-muted-foreground">
          Up to {plural(max, "file", "files")}.
        </span>
      ) : (
        <FileDrop
          id={id}
          label={`${max > 1 ? "Upload files" : "Upload a file"} for ${label}`}
          accept={accept}
          multiple={max > 1}
          disabled={disabled}
          reason={reason}
          hint={hint}
          onFiles={pick}
        />
      )}
    </div>
  )
}
