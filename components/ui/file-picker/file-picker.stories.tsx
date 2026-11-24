import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  FilePicker,
  storedFile,
  type PickedFile,
  type UploadFile,
} from "./file-picker"
import { fileSize } from "./file-size"
import { Field, FieldDescription, FieldLabel } from "../field/field"

const MB = 1024 * 1024

const meta: Meta<typeof FilePicker> = {
  title: "Patterns/FilePicker",
  component: FilePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Files on a form, listed as `Attachment`s above a `FileDrop`. Each picked file uploads at once, one at a time, through `upload`, which returns the stored file or the reason it was refused: an uploading file shows a spinner and holds the save back (`isUploading`), a refused one stays in the list with its reason in red, a stored one downloads from anywhere on it and comes off with its trash button. `maxSize` and `max` refuse a file before it goes up. Read only, or without `upload`, it lists the downloads alone, or `none` when there are none. `inline` lays them out as small chips where height is short. Helpers: `storedFile` lists a saved file, `storedIds` and `stagedIds` give what a save sends and what a closed form throws away, and `fileSize` writes a size in words.",
      },
    },
  },
  argTypes: {
    files: { control: false },
    onChange: { control: false },
    upload: { control: false },
    href: { control: false },
    onRemove: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof FilePicker>

let nextId = 100
/** A stand-in upload: a second on the way, and a refusal for any file named with "virus". */
const upload: UploadFile = (file) =>
  new Promise((done) =>
    setTimeout(
      () =>
        done(
          /virus/i.test(file.name)
            ? `${file.name} was refused by the scanner.`
            : { id: nextId++, name: file.name, size: file.size }
        ),
      1000
    )
  )

const href = () => "#"

const SAVED = [
  storedFile({
    id: 1,
    name: "Northwind-processing-statement.pdf",
    size: 812_400,
  }),
  storedFile({ id: 2, name: "Northwind-W9.pdf", size: 164_000 }),
]

export const Default: Story = {
  render: function Render() {
    const [files, setFiles] = useState<PickedFile[]>(SAVED)
    return (
      <Field className="w-96">
        <FieldLabel htmlFor="deliverable-files">Files</FieldLabel>
        <FilePicker
          id="deliverable-files"
          label="Deliverable"
          files={files}
          onChange={setFiles}
          max={10}
          maxSize={4 * MB}
          hint="Any file, up to 4 MB each."
          upload={upload}
          href={href}
        />
      </Field>
    )
  },
}

export const Empty: Story = {
  render: function Render() {
    const [files, setFiles] = useState<PickedFile[]>([])
    return (
      <Field className="w-96">
        <FieldLabel htmlFor="answer-logo">Merchant Logo</FieldLabel>
        <FilePicker
          id="answer-logo"
          label="Merchant Logo"
          files={files}
          onChange={setFiles}
          max={1}
          maxSize={4 * MB}
          accept="image/*"
          hint="An image, up to 4 MB."
          upload={upload}
          href={href}
        />
      </Field>
    )
  },
}

/** One on its way, one refused before it went up, one refused by the server. */
export const States: Story = {
  render: function Render() {
    const [files, setFiles] = useState<PickedFile[]>([
      SAVED[0],
      {
        key: "uploading",
        name: "Q3-volume-report.xlsx",
        size: 2_400_000,
        state: "uploading",
        staged: false,
      },
      {
        key: "big",
        name: "site-walkthrough.mov",
        size: 48 * MB,
        state: "failed",
        staged: false,
        error: "site-walkthrough.mov is over 4 MB.",
      },
      {
        key: "refused",
        name: "invoice.exe",
        size: 90_000,
        state: "failed",
        staged: false,
        error: "invoice.exe could not be uploaded.",
      },
    ])
    return (
      <Field className="w-96">
        <FieldLabel htmlFor="request-files">Files</FieldLabel>
        <FilePicker
          id="request-files"
          label="Files"
          files={files}
          onChange={setFiles}
          max={10}
          maxSize={4 * MB}
          upload={upload}
          href={href}
        />
      </Field>
    )
  },
}

export const Full: Story = {
  render: function Render() {
    const [files, setFiles] = useState<PickedFile[]>(SAVED.slice(0, 1))
    return (
      <Field className="w-96">
        <FieldLabel htmlFor="contract">Signed Contract</FieldLabel>
        <FilePicker
          id="contract"
          label="Signed Contract"
          files={files}
          onChange={setFiles}
          max={1}
          upload={upload}
          href={href}
        />
      </Field>
    )
  },
}

export const DisabledWithReason: Story = {
  render: function Render() {
    const [files, setFiles] = useState<PickedFile[]>([])
    return (
      <Field className="w-96">
        <FieldLabel htmlFor="onboarding-files">Files</FieldLabel>
        <FilePicker
          id="onboarding-files"
          label="Files"
          files={files}
          onChange={setFiles}
          max={10}
          disabled
          reason="Pick a merchant first."
          upload={upload}
          href={href}
        />
      </Field>
    )
  },
}

export const ReadOnly: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      <Field>
        <FieldLabel>Files</FieldLabel>
        <FilePicker
          id="read-files"
          label="Files"
          files={SAVED}
          onChange={() => {}}
          max={10}
          readOnly
          href={href}
        />
      </Field>
      <Field>
        <FieldLabel>Attachments</FieldLabel>
        <FilePicker
          id="read-none"
          label="Files"
          files={[]}
          onChange={() => {}}
          max={10}
          readOnly
          none="No attachments"
          href={href}
        />
      </Field>
    </div>
  ),
}

/** An email's attachments: small chips that wrap, with the total under them. */
export const Inline: Story = {
  render: () => {
    const files = [
      ...SAVED,
      storedFile({ id: 3, name: "Pricing-proposal-v2.pdf", size: 1_350_000 }),
    ]
    const total = files.reduce((sum, file) => sum + file.size, 0)
    return (
      <Field className="w-[28rem]">
        <FieldLabel>Attachments</FieldLabel>
        <FilePicker
          id="email-files"
          label="Attachments"
          files={files}
          onChange={() => {}}
          max={10}
          readOnly
          inline
          href={href}
        />
        <FieldDescription>
          {fileSize(total)} of {fileSize(15 * MB)}
        </FieldDescription>
      </Field>
    )
  },
}
