import { useState } from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  FileDrop,
  FilePicker,
  Field,
  FieldLabel,
  IMAGE_FORMATS,
  ImagePicker,
  ImagePreview,
  storedFile,
  type PickedFile,
} from "aperia-ds5"
import { Anatomy } from "../anatomy"
import { DoDont } from "../blocks"

// The Anatomy drawing of the Files and Images page: a form with an image picker for a logo and files on a form that hold
// one saved file, drawn inline since nothing opens a panel. Each part is marked in the order of the part list in
// files-and-images.md. The page's rule examples sit here too.

const MB = 1024 * 1024

const LOGO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="#0f766e"/><path d="M20 34h24M32 22v24" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>'
  )

function Logo({ src }: { src: string | null }) {
  return (
    <Avatar size="lg" shape="square">
      {src && <AvatarImage src={src} className="bg-white object-contain" />}
      <AvatarFallback>NM</AvatarFallback>
    </Avatar>
  )
}

const href = () => "#"
const upload = async () => "Not uploaded in the docs."

function Form() {
  const [logo, setLogo] = useState<string | null>(LOGO)
  const [files, setFiles] = useState<PickedFile[]>([
    storedFile({
      id: 1,
      name: "Northwind-processing-statement.pdf",
      size: 812_400,
    }),
  ])
  return (
    <div className="flex w-[28rem] flex-col gap-6 surface p-6">
      <Field>
        <FieldLabel htmlFor="anatomy-logo">Merchant Logo</FieldLabel>
        <div id="anatomy-logo-picker">
          <ImagePicker
            id="anatomy-logo"
            noun="Logo"
            format={IMAGE_FORMATS.logo}
            uploaded={logo !== null}
            onChange={setLogo}
            preview={<Logo src={logo} />}
          />
        </div>
      </Field>
      <Field>
        <FieldLabel htmlFor="anatomy-files">Attachments</FieldLabel>
        <div id="anatomy-file-picker">
          <FilePicker
            id="anatomy-files"
            label="Attachments"
            files={files}
            onChange={setFiles}
            max={5}
            maxSize={4 * MB}
            hint="PDF or XLSX, up to 4 MB each."
            upload={upload}
            href={href}
          />
        </div>
      </Field>
    </div>
  )
}

const LOGO_PICKER = "#anatomy-logo-picker"
const FILE_PICKER = "#anatomy-file-picker"

export const filesAndImagesAnatomy = (
  <Anatomy
    targets={{
      1: { selector: `${LOGO_PICKER} [data-slot=avatar]`, side: "left" },
      2: {
        selector: `${LOGO_PICKER} button:nth-of-type(1)`,
        side: "bottom",
        align: "end",
      },
      3: { selector: `${LOGO_PICKER} button:nth-of-type(2)`, side: "right" },
      4: { selector: `${FILE_PICKER} [data-slot=attachment]`, side: "left" },
      5: {
        selector: `${FILE_PICKER} [data-slot=attachment-action]`,
        side: "right",
      },
      6: { selector: `${FILE_PICKER} label`, side: "left" },
      7: {
        selector: `${FILE_PICKER} [data-slot=field-description]`,
        side: "bottom",
      },
    }}
  >
    <div className="px-10 py-4">
      <Form />
    </div>
  </Anatomy>
)

const narrow = "w-full max-w-60"

// A refused file and a saved one, as files on a form list them; no upload, so no drop zone.
const listed: PickedFile[] = [
  {
    key: "refused",
    name: "Q3 report.pdf",
    size: 6 * MB,
    state: "failed",
    staged: false,
    error: "Q3 report.pdf is over 4 MB.",
  },
]

export const filesAndImagesExamples = {
  "Say what the drop zone accepts": (
    <DoDont
      good={
        <div className={narrow}>
          <FileDrop
            id="do-drop"
            label="Import file"
            hint="CSV or XLSX, up to 5,000 rows."
            onFiles={() => {}}
          />
        </div>
      }
      bad={
        <div className={narrow}>
          <FileDrop id="dont-drop" label="Import file" onFiles={() => {}} />
        </div>
      }
    />
  ),
  "Keep a refused file in the list, with its reason": (
    <DoDont
      good={
        <div className={narrow}>
          <FilePicker
            id="do-refused"
            label="Files"
            files={listed}
            onChange={() => {}}
            max={5}
            href={href}
            readOnly
          />
        </div>
      }
      bad={
        <div className={narrow}>
          <div className="rounded-lg bg-popover px-3 py-2 text-sm shadow-md ring-[0.5px] ring-border">
            Upload failed.
          </div>
        </div>
      }
    />
  ),
  "Name the image on its buttons": (
    <DoDont
      good={
        <div className="flex flex-col gap-3">
          <ImagePicker
            id="do-header"
            noun="Header"
            format={IMAGE_FORMATS.email}
            uploaded={false}
            onChange={() => {}}
            preview={<ImagePreview src={null} />}
          />
          <ImagePicker
            id="do-footer"
            noun="Footer"
            format={IMAGE_FORMATS.email}
            uploaded={false}
            onChange={() => {}}
            preview={<ImagePreview src={null} />}
          />
        </div>
      }
      bad={
        <div className="flex flex-col gap-3">
          <ImagePicker
            id="dont-header"
            format={IMAGE_FORMATS.email}
            uploaded={false}
            onChange={() => {}}
            preview={<ImagePreview src={null} />}
          />
          <ImagePicker
            id="dont-footer"
            format={IMAGE_FORMATS.email}
            uploaded={false}
            onChange={() => {}}
            preview={<ImagePreview src={null} />}
          />
        </div>
      }
    />
  ),
  "Hold the save while a file uploads": (
    <DoDont
      good={
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">Uploading</span>
          <Button disabled>Save</Button>
        </div>
      }
      bad={
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">Uploading</span>
          <Button>Save</Button>
        </div>
      }
    />
  ),
}
