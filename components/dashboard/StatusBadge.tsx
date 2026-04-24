import { Badge } from "@/components/ui/badge/badge"
import { cn } from "@/lib/utils"

type Status = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "PAST_DUE" | "DEFERRED" | "CANCELLED"

const statusClass: Record<Status, string> = {
  PLANNED:     "border-transparent bg-gray-100 text-gray-700 hover:bg-gray-100",
  IN_PROGRESS: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100",
  COMPLETED:   "border-transparent bg-green-100 text-green-800 hover:bg-green-100",
  PAST_DUE:    "border-transparent bg-red-100 text-red-800 hover:bg-red-100",
  DEFERRED:    "border-transparent bg-slate-100 text-slate-700 hover:bg-slate-100",
  CANCELLED:   "border-transparent bg-slate-100 text-slate-500 hover:bg-slate-100",
}

const labels: Record<Status, string> = {
  PLANNED:     "Planned",
  IN_PROGRESS: "In Progress",
  COMPLETED:   "Completed",
  PAST_DUE:    "Past Due",
  DEFERRED:    "Deferred",
  CANCELLED:   "Cancelled",
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge variant="outline" className={cn(statusClass[status])}>
      {labels[status]}
    </Badge>
  )
}
