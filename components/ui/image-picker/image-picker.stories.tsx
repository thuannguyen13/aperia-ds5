import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { IMAGE_FORMATS, ImagePicker, ImagePreview } from "./image-picker"
import { Avatar, AvatarFallback, AvatarImage } from "../avatar/avatar"
import { Field, FieldDescription, FieldLabel } from "../field/field"
import { initials } from "@/lib/format"

const meta: Meta<typeof ImagePicker> = {
  title: "Pattern Components/ImagePicker",
  // Shown on its pattern page's Code tab (site.ts), not in the sidebar or the Components index.
  component: ImagePicker,
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component:
          "An image on a form, such as a prospect's logo or an email's header: its preview, then Upload and, while one is set, Remove. A picked file is resized in the browser for its `format` (`IMAGE_FORMATS.logo`, a 256px PNG; `.cover`, a 1200px JPEG; `.email`, a 1200px PNG from a PNG or JPEG; or the app's own) and reaches `onChange` as a data URL; Remove sends null. The form saves it with the rest. The preview is the caller's: an `Avatar` (`shape=\"square\"` for a company) for a logo, `ImagePreview` for a wider picture. A file that can't be read says so under the buttons. Read only, the preview alone.",
      },
    },
  },
  args: { noun: "Logo", readOnly: false, disabled: false },
  argTypes: {
    noun: { control: "text" },
    readOnly: { control: "boolean" },
    disabled: { control: "boolean" },
    reason: { control: "text" },
    preview: { control: false },
    format: { control: false },
    onChange: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof ImagePicker>

const LOGO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="#0f766e"/><path d="M20 34h24M32 22v24" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>'
  )

const HEADER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 120"><rect width="600" height="120" fill="#002f67"/><text x="32" y="74" font-family="Inter, sans-serif" font-size="40" font-weight="600" fill="#fff">Aperia</text></svg>'
  )

function Logo({ src, name }: { src: string | null; name: string }) {
  return (
    <Avatar size="lg" shape="square">
      {src && <AvatarImage src={src} className="bg-white object-contain" />}
      <AvatarFallback>{initials(name)}</AvatarFallback>
    </Avatar>
  )
}

/** A prospect's logo, with the monogram in its place until one is picked. Pick any image to see it resized. */
export const Default: Story = {
  render: function Render(args) {
    const [logo, setLogo] = useState<string | null>(null)
    return (
      <Field className="w-96">
        <FieldLabel htmlFor="prospect-logo">Logo</FieldLabel>
        <ImagePicker
          {...args}
          id="prospect-logo"
          format={IMAGE_FORMATS.logo}
          uploaded={logo !== null}
          onChange={setLogo}
          preview={<Logo src={logo} name="Northwind Payments" />}
        />
        <FieldDescription>
          Square PNG, JPEG, WebP or SVG, 256 × 256 px or larger.
        </FieldDescription>
      </Field>
    )
  },
}

export const Uploaded: Story = {
  render: function Render(args) {
    const [logo, setLogo] = useState<string | null>(LOGO)
    return (
      <Field className="w-96">
        <FieldLabel htmlFor="merchant-logo">Logo</FieldLabel>
        <ImagePicker
          {...args}
          id="merchant-logo"
          uploaded={logo !== null}
          onChange={setLogo}
          preview={<Logo src={logo} name="Harbor Dental Group" />}
        />
      </Field>
    )
  },
}

/** An email template's header: a wide picture in `ImagePreview`, a picture icon in its place without one. */
export const EmailHeader: Story = {
  args: { noun: "Header" },
  render: function Render(args) {
    const [header, setHeader] = useState<string | null>(HEADER)
    return (
      <div className="flex w-[28rem] flex-col gap-6">
        <Field>
          <FieldLabel htmlFor="template-header">Header</FieldLabel>
          <ImagePicker
            {...args}
            id="template-header"
            format={IMAGE_FORMATS.email}
            uploaded={header !== null}
            onChange={setHeader}
            preview={<ImagePreview src={header} />}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="template-footer">Footer</FieldLabel>
          <ImagePicker
            id="template-footer"
            noun="Footer"
            format={IMAGE_FORMATS.email}
            uploaded={false}
            onChange={() => {}}
            preview={<ImagePreview src={null} />}
          />
        </Field>
      </div>
    )
  },
}

export const DisabledWithReason: Story = {
  args: {
    disabled: true,
    reason: "Only admins change the queue's logo.",
  },
  render: (args) => (
    <Field className="w-96">
      <FieldLabel htmlFor="queue-logo">Logo</FieldLabel>
      <ImagePicker
        {...args}
        id="queue-logo"
        uploaded
        onChange={() => {}}
        preview={<Logo src={LOGO} name="Onboarding" />}
      />
    </Field>
  ),
}

export const ReadOnly: Story = {
  args: { readOnly: true },
  render: (args) => (
    <Field className="w-96">
      <FieldLabel>Logo</FieldLabel>
      <ImagePicker
        {...args}
        id="read-logo"
        uploaded
        onChange={() => {}}
        preview={<Logo src={LOGO} name="Harbor Dental Group" />}
      />
    </Field>
  ),
}
