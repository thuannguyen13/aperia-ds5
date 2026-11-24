import { useState } from "react"
import { PlusIcon, UploadIcon } from "lucide-react"
import {
  Button,
  ListPager,
  ListToolbar,
  UNSORTED,
  type FilterField,
  type FilterRule,
  type SortOption,
} from "aperia-ds5"
import { Anatomy } from "../anatomy"

// The Anatomy drawings of the pattern pages. Each part list lives in the page's Markdown; these are the live examples
// it is drawn on, with each part marked in the order of that list.

const FIELDS: FilterField[] = [
  {
    id: "stage",
    label: "Stage",
    type: "enum",
    options: ["Discovery", "Proposal", "Negotiation"].map((stage) => ({
      value: stage,
      text: stage,
    })),
  },
  { id: "volume", label: "Monthly Volume", type: "money" },
]

const SORTS: SortOption[] = [
  { value: "name", label: "Name" },
  { value: "volume", label: "Monthly Volume", starts: "desc" },
]

function ToolbarDrawing() {
  const [query, setQuery] = useState("")
  const [rules, setRules] = useState<FilterRule[]>([])
  const [sort, setSort] = useState(UNSORTED)
  return (
    <div className="w-[52rem] max-w-full">
      <ListToolbar
        search={{
          placeholder: "Search prospects",
          value: query,
          onChange: setQuery,
        }}
        filters={{ fields: FIELDS, value: rules, onChange: setRules }}
        sort={{ fields: SORTS, value: sort, onChange: setSort }}
        actions={
          <span data-anatomy="4" className="flex items-center gap-2">
            <Button variant="outline">
              <UploadIcon data-icon="inline-start" />
              Import
            </Button>
            <Button>
              <PlusIcon data-icon="inline-start" />
              Add Prospect
            </Button>
          </span>
        }
      />
    </div>
  )
}

export const listToolbarAnatomy = (
  <Anatomy
    targets={{
      1: { selector: "[data-slot=input-group]", side: "top" },
      // The Filter button on a desktop, and the Filter icon button on a phone.
      2: {
        selector: "button[aria-haspopup=dialog], button[aria-label^=Filter]",
        side: "bottom",
      },
      // The Sort button on a desktop, and the Sort icon button on a phone.
      3: { selector: "button[aria-label^=Sort]", side: "bottom" },
    }}
  >
    <ToolbarDrawing />
  </Anatomy>
)

function PagerDrawing() {
  const [page, setPage] = useState(7)
  return (
    <ListPager
      page={page}
      total={312}
      noun={["merchant", "merchants"]}
      onPageChange={setPage}
      className="w-[40rem] max-w-full"
    />
  )
}

export const pagingAnatomy = (
  <Anatomy
    targets={{
      1: { selector: "[data-slot=list-pager] > p", side: "top" },
      2: { selector: '[aria-label="Go to previous page"]', side: "bottom" },
      3: {
        selector:
          '[data-slot=pagination-link][aria-label^="Page "]:not([aria-current=page])',
        side: "bottom",
      },
      4: { selector: "[aria-current=page]", side: "bottom" },
      5: { selector: "[data-slot=pagination-ellipsis]", side: "bottom" },
      6: { selector: '[aria-label="Go to next page"]', side: "bottom" },
    }}
  >
    <PagerDrawing />
  </Anatomy>
)

export const appShellAnatomy = (
  <Anatomy
    story="design-language-examples-anatomy--app-shell"
    title="An app shell on a record's page"
    width={800}
    height={520}
    targets={{
      1: { selector: "[data-slot=sidebar-inner]", side: "top" },
      2: { selector: "[data-slot=sidebar-header]", side: "left" },
      3: {
        selector: "[data-slot=sidebar-menu-item]:has([aria-label=Search])",
        side: "left",
      },
      4: {
        selector:
          "[data-slot=sidebar-menu-item]:has([aria-label^=Notifications])",
        side: "left",
      },
      5: {
        selector: '[data-slot=sidebar-menu-item]:has(a[href="/dashboard"])',
        side: "left",
      },
      6: { selector: "[data-slot=sidebar-footer]", side: "left" },
      7: { selector: "[data-slot=sidebar-inset] > header", side: "top" },
      8: { selector: "[data-slot=breadcrumb]", side: "top" },
      9: { selector: "#content", side: "right" },
    }}
  />
)
