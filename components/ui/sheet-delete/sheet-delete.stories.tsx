import type { Meta, StoryObj } from "@storybook/react-vite"
import { IN_USE_DELETE, SheetDelete } from "./sheet-delete"

const meta: Meta<typeof SheetDelete> = {
  title: "Pattern Components/SheetDelete",
  // Shown on its pattern page's Code tab (site.ts), not in the sidebar or the Components index.
  component: SheetDelete,
  tags: ["!dev"],
  parameters: {
    docs: {
      story: { inline: false, height: "320px" },
      description: {
        component:
          "A record sheet's Delete, for `SheetForm`'s `start`, with the confirm it asks first. `onDelete` runs on the confirm's action; the caller closes the sheet once the delete went through. `reason` blocks it, such as `IN_USE_DELETE` (\"This item is in use and can't be deleted.\", word for word): it stays focusable, so hover and the keyboard both reach the tooltip that says why. See SheetForm's Edit With Delete story for it in a sheet.",
      },
    },
  },
  args: {
    title: "Delete Merchant?",
    action: "Delete Merchant",
    children: "This permanently deletes Lakeside Grocers and its 3 locations.",
    pending: false,
  },
  argTypes: {
    reason: { control: "text" },
    onDelete: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof SheetDelete>

/** Press it: the confirm opens over the sheet. */
export const Default: Story = {}

/** In use: hover or focus it for the reason. */
export const Blocked: Story = {
  args: { reason: IN_USE_DELETE },
}

/** While the sheet's save or the delete runs. */
export const Pending: Story = {
  args: { pending: true },
}
