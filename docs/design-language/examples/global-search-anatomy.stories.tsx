import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Kbd,
  KbdGroup,
  PageHeader,
} from "aperia-ds5"
import {
  Marked,
  Picture,
  serverSearch,
} from "./search-and-notifications.example"

// Global search with its dialog open over a page, drawn in its own frame for an Anatomy drawing (anatomy.tsx, `story`),
// because the dialog renders outside an inline drawing. Hidden from the sidebar.

const meta: Meta = {
  title: "Design Language/Examples/Anatomy Global Search",
  tags: ["!dev", "!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

const QUERY = "nor"

function OpenSearch() {
  // The dialog opens as the page loads. A `ready` flip after its opening animation makes the drawing measure again.
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const done = setTimeout(() => {
      setReady(true)
      // The open dialog takes the keyboard focus into this frame. Hand it back to the docs page around the frame.
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur()
      ;(window.frameElement as HTMLElement | null)?.blur()
    }, 400)
    return () => clearTimeout(done)
  }, [])
  return (
    <div data-ready={ready} className="flex flex-col gap-5 p-6">
      <PageHeader
        title="Prospects"
        subtitle="Card issuing and acquiring, Midwest region"
      />
      <CommandDialog
        open
        onOpenChange={() => {}}
        title="Search"
        description="Search for a record in the app"
      >
        <Command shouldFilter={false} label="Search" className="h-auto">
          <CommandInput
            value={QUERY}
            readOnly
            placeholder="Search prospects, contacts, and opportunities"
          />
          <CommandList>
            {serverSearch(QUERY).map((kind) => (
              <CommandGroup key={kind.key} heading={kind.heading}>
                {kind.rows.map((row) => (
                  <CommandItem key={row.id} value={`${kind.key}-${row.id}`}>
                    <Picture name={row.name} square={kind.square} />
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate">
                        <Marked text={row.name} query={QUERY} />
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {row.detail}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <div
            data-anatomy="4"
            className="flex flex-wrap items-center gap-3 border-t-[0.5px] px-3 py-1.5 text-[11px] text-muted-foreground max-sm:hidden"
          >
            <span className="flex items-center gap-1">
              <KbdGroup>
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
              </KbdGroup>
              Move
            </span>
            <span className="flex items-center gap-1">
              <Kbd>↵</Kbd>
              Open
            </span>
            <span className="flex items-center gap-1">
              <Kbd>⌘↵</Kbd>
              Open in New Tab
            </span>
            <span className="flex items-center gap-1">
              <Kbd>Esc</Kbd>
              Close
            </span>
          </div>
        </Command>
      </CommandDialog>
    </div>
  )
}

/** Global search open over a page, with "nor" typed: three kinds of record, one result in each. */
export const GlobalSearch: Story = {
  render: () => <OpenSearch />,
}
