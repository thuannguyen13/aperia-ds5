import { cn } from "@/lib/utils"

interface SlaProgressBarProps {
  daysElapsed: number
  slaDays: number
  showLabel?: boolean
}

export function SlaProgressBar({ daysElapsed, slaDays, showLabel = false }: SlaProgressBarProps) {
  const pct = Math.min((daysElapsed / slaDays) * 100, 100)
  const overdue = daysElapsed > slaDays

  const barColor =
    overdue ? "bg-red-500" :
    pct >= 80 ? "bg-orange-500" :
    pct >= 50 ? "bg-amber-400" :
    "bg-green-500"

  return (
    <div className="flex flex-col gap-1">
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={cn("h-full rounded-full transition-all", barColor)} style={{ width: `${pct}%` }} />
      </div>
      {showLabel && (
        <span className={cn("text-xs", overdue ? "font-semibold text-red-600" : "text-slate-500")}>
          {overdue
            ? `${daysElapsed - slaDays} days overdue`
            : `${daysElapsed} of ${slaDays} days`}
        </span>
      )}
    </div>
  )
}
