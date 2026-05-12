"use client"

import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible"
import { Button } from "../button/button"
import { ChevronDownIcon } from "lucide-react"

const meta: Meta<typeof Collapsible> = {
  title: "UI/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-72">
        <div className="flex items-center justify-between rounded-lg border px-3 py-2">
          <span className="text-sm font-medium">Advanced settings</span>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <ChevronDownIcon
                className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-1 pt-1">
          <div className="rounded-md border px-3 py-2 text-sm">
            Enable debug mode
          </div>
          <div className="rounded-md border px-3 py-2 text-sm">
            Show verbose logs
          </div>
          <div className="rounded-md border px-3 py-2 text-sm">
            Disable cache
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  },
}

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-72">
      <div className="flex items-center justify-between rounded-lg border px-3 py-2">
        <span className="text-sm font-medium">Repository files</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <ChevronDownIcon className="size-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-1 pt-1">
        <div className="rounded-md border px-3 py-2 font-mono text-sm">
          package.json
        </div>
        <div className="rounded-md border px-3 py-2 font-mono text-sm">
          tsconfig.json
        </div>
        <div className="rounded-md border px-3 py-2 font-mono text-sm">
          README.md
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}
