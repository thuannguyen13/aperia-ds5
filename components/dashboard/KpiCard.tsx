import { TrendingDown, TrendingUp, Minus, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KpiCardProps {
  label: string
  value: string | number
  subtitle?: string
  trend?: "up" | "down" | "flat"
  trendLabel?: string
  accentColor?: "blue" | "orange" | "red" | "green" | "slate"
  icon?: LucideIcon
  onClick?: () => void
}

const accentBorder: Record<string, string> = {
  blue: "border-l-blue-600",
  orange: "border-l-orange-500",
  red: "border-l-red-600",
  green: "border-l-green-500",
  slate: "border-l-slate-400",
}

const trendColor: Record<string, string> = {
  up: "text-red-500",
  down: "text-green-500",
  flat: "text-slate-400",
}

export function KpiCard({
  label,
  value,
  subtitle,
  trend,
  trendLabel,
  accentColor = "blue",
  icon: Icon,
  onClick,
}: KpiCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-border bg-white p-4 border-l-4 shadow-sm",
        accentBorder[accentColor],
        onClick && "cursor-pointer hover:shadow-md transition-shadow",
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</span>
        {Icon && <Icon className="size-4 text-slate-400" />}
      </div>
      <div className="text-3xl font-bold text-slate-900">{value}</div>
      <div className="flex items-center gap-1.5">
        {subtitle && <span className="text-sm text-slate-400">{subtitle}</span>}
        {trend && trendLabel && (
          <span className={cn("flex items-center gap-0.5 text-xs font-medium", trendColor[trend])}>
            <TrendIcon className="size-3" />
            {trendLabel}
          </span>
        )}
      </div>
    </div>
  )
}
