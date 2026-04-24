import { Badge } from "@/components/ui/badge/badge"
import { cn } from "@/lib/utils"

type Severity = "LOW" | "MODERATE" | "HIGH" | "CRITICAL"

const severityClass: Record<Severity, string> = {
  LOW:      "border-transparent bg-slate-100 text-slate-700 hover:bg-slate-100",
  MODERATE: "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100",
  HIGH:     "border-transparent bg-orange-100 text-orange-800 hover:bg-orange-100",
  CRITICAL: "border-transparent bg-red-100 text-red-800 hover:bg-red-100",
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <Badge variant="outline" className={cn("uppercase font-semibold", severityClass[severity])}>
      {severity}
    </Badge>
  )
}
