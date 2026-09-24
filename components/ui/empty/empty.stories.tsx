import type { Meta, StoryObj } from "@storybook/react-vite"
import { FolderOpen, Plus } from "lucide-react"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "./empty"
import { Avatar, AvatarImage, AvatarFallback } from "../avatar/avatar"
import { Button } from "../button/button"

const meta: Meta<typeof Empty> = {
  title: "UI/Empty",
  component: Empty,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "[View in Figma](https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18672-2962)",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Empty>

export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>Create a project to start tracking accounts and statements.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button size="sm">
            <Plus />
            New project
          </Button>
          <Button variant="outline" size="sm">
            Import
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  ),
}

export const Outline: Story = {
  render: () => (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>
        <EmptyTitle>No files uploaded</EmptyTitle>
        <EmptyDescription>Drop statements here or browse to upload.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Browse files
        </Button>
      </EmptyContent>
    </Empty>
  ),
}

export const AvatarMedia: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>User offline</EmptyTitle>
        <EmptyDescription>This user is currently offline. Leave a message and they will be notified.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Leave message</Button>
      </EmptyContent>
    </Empty>
  ),
}
