import { cn } from "@/lib/utils"

type Status = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "PAST_DUE" | "DEFERRED" | "CANCELLED"

const styles: Record<Status, string> = {
  PLANNED: "bg-gray-100 text-gray-700",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  PAST_DUE: "bg-red-100 text-red-800",
  DEFERRED: "bg-slate-100 text-slate-700",
  CANCELLED: "bg-slate-100 text-slate-500",
}

const labels: Record<Status, string> = {
  PLANNED: "Planned",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  PAST_DUE: "Past Due",
  DEFERRED: "Deferred",
  CANCELLED: "Cancelled",
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", styles[status])}>
      {labels[status]}
    </span>
  )
}
