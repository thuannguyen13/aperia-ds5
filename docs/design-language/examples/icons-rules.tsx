import { AlertCircleIcon, PencilIcon, StarIcon } from "lucide-react"
import { Badge } from "aperia-ds5"
import { DoDont } from "../blocks"
import { IconButton } from "./shared"

// The live pairs of the Icons page's rules. The size table is `iconsExamples` in foundations.tsx.
export const iconsRuleExamples = {
  "Use an icon only where it helps": (
    <DoDont
      good={
        <IconButton label="Edit Note">
          <PencilIcon />
        </IconButton>
      }
      bad={
        <div className="flex flex-col gap-2 font-medium">
          {["Overview", "Members", "Billing"].map((title) => (
            <span key={title} className="flex items-center gap-1.5">
              <StarIcon className="size-4" />
              {title}
            </span>
          ))}
        </div>
      }
      goodNote="A pencil on an edit button."
      badNote="The same star beside every heading."
    />
  ),
  "Pair a state's icon with a word": (
    <DoDont
      good={
        <Badge variant="destructive">
          <AlertCircleIcon data-icon="inline-start" />
          Payment Failed
        </Badge>
      }
      bad={<AlertCircleIcon className="size-4 text-destructive" />}
      goodNote="A warning icon with the word Payment Failed."
      badNote="A warning icon alone."
    />
  ),
}
