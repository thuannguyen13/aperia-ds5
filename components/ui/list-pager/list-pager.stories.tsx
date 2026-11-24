import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { ListPager } from "./list-pager"

const meta: Meta<typeof ListPager> = {
  title: "Pattern Components/ListPager",
  // Shown on its pattern page's Code tab (site.ts), not in the sidebar or the Components index.
  component: ListPager,
  tags: ["!dev"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          'The footer under a list: its count, and its pages when the rows run past one: Previous, the page numbers (the first, the last, and the page shown with one either side, with an ellipsis for each run left out), and Next, so people can jump to any page. One page reads "6 merchants"; more read "26–50 of 312 merchants". `href` gives each page its address. `total` counts the rows the search and filters leave. Keep `page` in the URL, go back to page 1 when the search, a filter or the sort changes, and cut the rows with `pageRows(rows, page)` from `aperia-ds5/list`, on the server or the client. Pages hold 25 rows (`PAGE_SIZE`). With no rows it renders nothing, since the list shows `NoResults`.',
      },
    },
  },
  argTypes: { onPageChange: { control: false } },
}

export default meta
type Story = StoryObj<typeof ListPager>

/** A long list on its second page: the range, then Previous, the page numbers, and Next. */
export const Pages: Story = {
  render: function Render() {
    const [page, setPage] = useState(2)
    return (
      <ListPager
        page={page}
        total={312}
        noun={["merchant", "merchants"]}
        onPageChange={setPage}
      />
    )
  },
}

/** Deep in a long list: the first and last pages stay, with an ellipsis for each run left out. */
export const MiddlePage: Story = {
  render: function Render() {
    const [page, setPage] = useState(7)
    return (
      <ListPager
        page={page}
        total={312}
        noun={["merchant", "merchants"]}
        onPageChange={setPage}
      />
    )
  },
}

/** The first page: Previous is disabled and says why. */
export const FirstPage: Story = {
  render: function Render() {
    const [page, setPage] = useState(1)
    return (
      <ListPager
        page={page}
        total={312}
        noun={["merchant", "merchants"]}
        onPageChange={setPage}
      />
    )
  },
}

/** A list that fits one page: the count alone. */
export const OnePage: Story = {
  args: { page: 1, total: 6, noun: ["merchant", "merchants"] },
}
