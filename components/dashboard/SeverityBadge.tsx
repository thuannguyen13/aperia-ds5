import { cn } from "@/lib/utils"

type Severity = "LOW" | "MODERATE" | "HIGH" | "CRITICAL"

const styles: Record<Severity, string> = {
  LOW: "bg-slate-100 text-slate-700",
  MODERATE: "bg-amber-100 text-amber-800",
  HIGH: "bg-orange-100 text-orange-800",
  CRITICAL: "bg-red-100 text-red-800",
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold uppercase", styles[severity])}>
      {severity}
    </span>
  )
}
