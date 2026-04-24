import { Progress } from "@/components/ui/progress/progress"
import { cn } from "@/lib/utils"

interface SlaProgressBarProps {
  daysElapsed: number
  slaDays: number
  showLabel?: boolean
}

export function SlaProgressBar({ daysElapsed, slaDays, showLabel = false }: SlaProgressBarProps) {
  const pct = Math.min((daysElapsed / slaDays) * 100, 100)
  const overdue = daysElapsed > slaDays

  const indicatorClass =
    overdue      ? "bg-red-500" :
    pct >= 80    ? "bg-orange-500" :
    pct >= 50    ? "bg-amber-400" :
                   "bg-green-500"

  return (
    <div className="flex flex-col gap-1">
      <Progress value={pct} className="h-2 bg-slate-100" indicatorClassName={indicatorClass} />
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
