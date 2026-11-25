import { CheckIcon, Trash2Icon } from "lucide-react"
import { Button } from "aperia-ds5"
import { DoDont } from "../blocks"

// Live pairs of the Buttons and Actions page that no other page shares. The page's other pairs are `buttonExamples`
// (examples/button.tsx).

export const buttonsAndActionsExamples = {
  "Order record actions the same on every record page": (
    <DoDont
      good={
        <>
          <Button variant="outline">Edit</Button>
          <Button variant="outline">
            <CheckIcon />
            Mark as Won
          </Button>
          <Button variant="destructive">
            <Trash2Icon />
            Delete
          </Button>
        </>
      }
      bad={
        <>
          <Button variant="destructive">
            <Trash2Icon />
            Delete
          </Button>
          <Button variant="outline">Edit</Button>
          <Button variant="outline">
            <CheckIcon />
            Mark as Won
          </Button>
        </>
      }
    />
  ),
}
