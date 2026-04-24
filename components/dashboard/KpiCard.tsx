import { TrendingDown, TrendingUp, Minus, type LucideIcon } from "lucide-react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card/card"

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

const accentVariants = cva("border-l-4", {
  variants: {
    accentColor: {
      blue:   "border-l-blue-600",
      orange: "border-l-orange-500",
      red:    "border-l-red-600",
      green:  "border-l-green-500",
      slate:  "border-l-slate-400",
    },
  },
  defaultVariants: { accentColor: "blue" },
})

const trendVariants = cva("flex items-center gap-0.5 text-xs font-medium", {
  variants: {
    trend: {
      up:   "text-red-500",
      down: "text-green-500",
      flat: "text-slate-400",
    },
  },
})

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
    <Card
      className={cn(
        accentVariants({ accentColor }),
        "gap-2 p-4 shadow-sm",
        onClick && "cursor-pointer hover:shadow-md transition-shadow"
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
          <span className={trendVariants({ trend })}>
            <TrendIcon className="size-3" />
            {trendLabel}
          </span>
        )}
      </div>
    </Card>
  )
}
