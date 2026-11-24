"use client"

import { useRef, useState } from "react"
import { ImageIcon } from "lucide-react"

import { Button } from "../button/button"
import { FieldError } from "../field/field"
import { describedBy, useFieldNote } from "../field-note/field-note"
import { cn } from "@/lib/utils"

/** What a picked image is stored as and what the picker offers. */
export type ImageFormat = {
  /** The stored type: a PNG keeps transparency, a JPEG holds a photo at a tenth of the size. */
  type: "image/png" | "image/jpeg"
  /** The longer edge it is resized to, in pixels. */
  side: number
  /** What the file input offers. */
  accept: string
  /** The offered types in words, for the error when a file can't be read: "PNG, JPEG, WebP or SVG". */
  formats: string
}

const ANY_IMAGE = {
  accept: "image/png,image/jpeg,image/webp,image/svg+xml",
  formats: "PNG, JPEG, WebP or SVG",
}

/**
 * The usual images. A logo is a mark, drawn at 48px at most: a PNG, which keeps transparency, 256px to stay sharp at 3x.
 * A cover is a picture across a card: a JPEG, 1200px to fill the card's width at 2x. An email's header or footer is a
 * picture across a 600px email, 1200px as a cover is, but a PNG, which keeps a logo's transparency, picked only as a
 * PNG or JPEG, since an SVG or WebP may draw differently once redrawn.
 */
export const IMAGE_FORMATS = {
  logo: { type: "image/png", side: 256, ...ANY_IMAGE },
  cover: { type: "image/jpeg", side: 1200, ...ANY_IMAGE },
  email: {
    type: "image/png",
    side: 1200,
    accept: "image/png,image/jpeg",
    formats: "PNG or JPEG",
  },
} satisfies Record<string, ImageFormat>

// A JPEG keeps a photo sharp at a tenth of a PNG's size at this quality.
const JPEG_QUALITY = 0.85

/**
 * An image file as a data URL of `type`, no larger than `side` on the longer edge, keeping its shape. A bitmap is only
 * shrunk, since enlarging it adds blur and no detail; an SVG is drawn at the full side, since it is vector and its
 * declared size, often a few dozen pixels, is no limit. A JPEG has no transparency, so it is drawn on white.
 */
export async function resizeImage(
  file: File,
  { type, side }: Pick<ImageFormat, "type" | "side">
): Promise<string> {
  const url = URL.createObjectURL(file)
  try {
    const image = new Image()
    image.src = url
    await image.decode()
    // An SVG without a width and height reports 0, so it is drawn square.
    const width = image.naturalWidth || side
    const height = image.naturalHeight || side
    const fit = side / Math.max(width, height)
    const scale = file.type === "image/svg+xml" ? fit : Math.min(1, fit)
    const canvas = document.createElement("canvas")
    canvas.width = Math.max(1, Math.round(width * scale))
    canvas.height = Math.max(1, Math.round(height * scale))
    const context = canvas.getContext("2d")
    if (context && type === "image/jpeg") {
      context.fillStyle = "#fff"
      context.fillRect(0, 0, canvas.width, canvas.height)
    }
    context?.drawImage(image, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL(type, JPEG_QUALITY)
  } finally {
    URL.revokeObjectURL(url)
  }
}

/**
 * An image's preview with Upload and, while one is uploaded, Remove. A picked file reaches `onChange` as a data URL
 * resized for its format (`IMAGE_FORMATS.logo`, `.cover`, `.email`, or the app's own); Remove sends null. The form
 * saves it with the rest. A file that can't be read says so under the buttons, in place. Read only, the preview alone.
 */
export function ImagePicker({
  id,
  noun = "Image",
  preview,
  uploaded,
  format = IMAGE_FORMATS.logo,
  readOnly = false,
  disabled = false,
  reason,
  onChange,
}: {
  /** The file input's id, for the field's label. */
  id: string
  /** What the image is, in Title Case, for the buttons: "Upload Logo", "Remove Logo". */
  noun?: string
  /** The image as it stands: an `Avatar` for a logo, an `ImagePreview` for a wider picture. */
  preview: React.ReactNode
  /** Whether an image is set, so Remove shows. */
  uploaded: boolean
  format?: ImageFormat
  readOnly?: boolean
  disabled?: boolean
  /** Why it can't be changed while it is disabled, under the buttons. */
  reason?: string | null
  onChange: (image: string | null) => void
}) {
  const picker = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const under = useFieldNote({ disabled, reason })
  if (readOnly) return <div className="flex items-center gap-3">{preview}</div>
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {preview}
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          aria-describedby={describedBy(under.describes)}
          onClick={() => picker.current?.click()}
        >
          Upload {noun}
        </Button>
        {uploaded && (
          <Button
            type="button"
            variant="ghost"
            disabled={disabled}
            onClick={() => {
              setError(null)
              onChange(null)
            }}
          >
            Remove {noun}
          </Button>
        )}
        <input
          ref={picker}
          id={id}
          type="file"
          accept={format.accept}
          disabled={disabled}
          tabIndex={-1}
          className="sr-only"
          onChange={async (event) => {
            const file = event.target.files?.[0]
            event.target.value = ""
            if (!file) return
            try {
              const image = await resizeImage(file, format)
              setError(null)
              onChange(image)
            } catch {
              setError(
                `${file.name} could not be read. Pick a ${format.formats}.`
              )
            }
          }}
        />
      </div>
      {under.note}
      {error && <FieldError>{error}</FieldError>}
    </div>
  )
}

/**
 * A wide picture, small, as its picker and its table show it, such as an email's header: 48px high, up to 192px
 * wide. Without one, a picture icon holds its place. A logo is an `Avatar` instead.
 */
export function ImagePreview({
  src,
  alt = "",
  className,
}: {
  src: string | null
  /** Empty while a label beside it names the picture. */
  alt?: string
  className?: string
}) {
  if (src)
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-12 max-w-48 shrink-0 rounded-md object-contain",
          className
        )}
      />
    )
  return (
    <span
      className={cn(
        "flex h-12 w-24 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground",
        className
      )}
    >
      <ImageIcon className="size-6" aria-hidden />
    </span>
  )
}
