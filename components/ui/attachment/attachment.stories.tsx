import type { Meta, StoryObj } from "@storybook/react-vite"
import { FileTextIcon, FileSpreadsheetIcon, XIcon, RotateCwIcon, CircleAlertIcon } from "lucide-react"
import {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
} from "./attachment"
import { Spinner } from "../spinner/spinner"

const meta: Meta<typeof Attachment> = {
  title: "UI/Attachment",
  component: Attachment,
  tags: ["autodocs"],
  args: {
    state: "done",
    size: "default",
    orientation: "horizontal",
  },
  argTypes: {
    state: {
      control: "select",
      options: ["idle", "uploading", "processing", "error", "done"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "xs"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Attachment>

export const Default: Story = {
  render: ({ state, size, orientation }) => (
    <Attachment state={state} size={size} orientation={orientation}>
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>Q3-statement.pdf</AttachmentTitle>
        <AttachmentDescription>PDF, 2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ),
}

export const States: Story = {
  render: ({ size, orientation }) => (
    <div className="flex flex-col gap-3">
      <Attachment state="idle" size={size} orientation={orientation}>
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Q3-statement.pdf</AttachmentTitle>
          <AttachmentDescription>Ready to upload</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="uploading" size={size} orientation={orientation}>
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Q3-statement.pdf</AttachmentTitle>
          <AttachmentDescription>Uploading, 64%</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="processing" size={size} orientation={orientation}>
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Q3-statement.pdf</AttachmentTitle>
          <AttachmentDescription>Reading document</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error" size={size} orientation={orientation}>
        <AttachmentMedia>
          <CircleAlertIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Q3-statement.pdf</AttachmentTitle>
          <AttachmentDescription>Upload failed</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Retry">
            <RotateCwIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="done" size={size} orientation={orientation}>
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Q3-statement.pdf</AttachmentTitle>
          <AttachmentDescription>PDF, 2.4 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </div>
  ),
}

export const Sizes: Story = {
  render: ({ state }) => (
    <div className="flex flex-col gap-3">
      {(["default", "sm", "xs"] as const).map((size) => (
        <Attachment key={size} state={state} size={size}>
          <AttachmentMedia>
            <FileSpreadsheetIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>transactions-march.csv</AttachmentTitle>
            <AttachmentDescription>{size}</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </div>
  ),
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: ({ state, size, orientation }) => (
    <Attachment state={state} size={size} orientation={orientation}>
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>Q3-statement.pdf</AttachmentTitle>
        <AttachmentDescription>PDF, 2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ),
}

export const ImagePreview: Story = {
  render: ({ state, size, orientation }) => (
    <Attachment state={state} size={size} orientation={orientation}>
      <AttachmentMedia variant="image">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop"
          alt="Uploaded receipt"
        />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>receipt.jpg</AttachmentTitle>
        <AttachmentDescription>JPG, 840 KB</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  ),
}

export const Clickable: Story = {
  render: ({ state, size, orientation }) => (
    <Attachment state={state} size={size} orientation={orientation}>
      <AttachmentTrigger aria-label="Open Q3-statement.pdf" />
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>Q3-statement.pdf</AttachmentTitle>
        <AttachmentDescription>PDF, 2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ),
}

export const Group: Story = {
  render: ({ size, orientation }) => (
    <AttachmentGroup className="max-w-md">
      <Attachment size={size} orientation={orientation}>
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Q3-statement.pdf</AttachmentTitle>
          <AttachmentDescription>PDF, 2.4 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment size={size} orientation={orientation}>
        <AttachmentMedia>
          <FileSpreadsheetIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>transactions-march.csv</AttachmentTitle>
          <AttachmentDescription>CSV, 312 KB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="uploading" size={size} orientation={orientation}>
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>dispute-letter.pdf</AttachmentTitle>
          <AttachmentDescription>Uploading, 30%</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </AttachmentGroup>
  ),
}
