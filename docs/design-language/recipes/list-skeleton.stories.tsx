import type { Meta, StoryObj } from "@storybook/react-vite"
import { ListSkeleton } from "./list-skeleton"
import { AppContent } from "@/components/ui/app-shell/app-content"

const meta: Meta<typeof ListSkeleton> = {
  title: "Design Language/Recipes/ListSkeleton",
  component: ListSkeleton,
  tags: ["!dev"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A list page while it loads, in the page's own shape so nothing moves when it lands: the title and its buttons, any stat tiles, the toolbar (search, filters, count and Sort), then the table's header and rows at their real heights, or a board's columns. Render it inside `AppContent`, as the page would be (in Next.js, the route's `loading.tsx`), and pass the page's own sizes: its title's width, its filters, its columns' shares, its row height, and `fullWidth` when the page renders `<FullWidth />`. A screen reader hears \"Loading\".",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-[720px] flex-col bg-background">
        <AppContent>
          <Story />
        </AppContent>
      </div>
    ),
  ],
  args: {
    title: 112,
    actions: 1,
    filters: 2,
    sort: true,
    rows: 10,
    rowHeight: 53,
    tiles: 0,
    board: false,
    fullWidth: false,
  },
  argTypes: {
    columns: { control: "object" },
  },
}

export default meta
type Story = StoryObj<typeof ListSkeleton>

/** The Prospects list: two filters, a Sort, and its seven columns at their shares. */
export const Table: Story = {
  args: { columns: [278, 120, 139, 98, 154, 114, 192] },
}

/** Requests: one-line rows, four filters, full width. */
export const OneLineRows: Story = {
  args: {
    title: 170,
    filters: 4,
    sort: false,
    rowHeight: 37,
    columns: [74, 108, 194, 144, 136, 99, 136, 102],
    fullWidth: true,
  },
}

/** The Pipeline board: its tiles, the Board and Table switch, and a column per stage. */
export const Board: Story = {
  args: { title: 92, tiles: 6, board: true, fullWidth: true },
}
