import {
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Clock,
  Bell,
  FileText,
} from "lucide-react"
import { KpiCard } from "@/components/dashboard/KpiCard"
import { MonthlyVelocityChart } from "@/components/dashboard/MonthlyVelocityChart"
import { SeverityDonutChart } from "@/components/dashboard/SeverityDonutChart"
import { IssueSourceBarChart } from "@/components/dashboard/IssueSourceBarChart"
import { RegionalCompletionChart } from "@/components/dashboard/RegionalCompletionChart"
import { SeverityBadge } from "@/components/dashboard/SeverityBadge"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import { TopNav } from "@/components/layout/TopNav"

const recentCompletions = [
  { id: "EMEA-2025-061", name: "Daily Sanctions Upload Review", officer: "Richard Pooley", region: "EMEA", date: "Mar 28, 2026" },
  { id: "FCC-2025-075", name: "I-9 Monitoring", officer: "Jason Hollingsworth", region: "North America", date: "Mar 27, 2026" },
  { id: "PRIV-2025-018", name: "Privacy Incident QA", officer: "Kelly Thewes", region: "Global", date: "Mar 26, 2026" },
  { id: "FIG-2025-033", name: "Monitoring of Regulatory Client Inquiries", officer: "Ed Friedman", region: "North America", date: "Mar 25, 2026" },
  { id: "MER-2025-032", name: "Clover Capital - CA Annual Reporting", officer: "Jo-Ann Teng", region: "Merchant", date: "Mar 24, 2026" },
  { id: "APAC-2025-044", name: "AML Transaction Monitoring Review", officer: "Mei Lin", region: "APAC", date: "Mar 22, 2026" },
  { id: "LATAM-2025-011", name: "CDD Periodic Review", officer: "Carlos Rivera", region: "LATAM", date: "Mar 21, 2026" },
  { id: "FCC-2026-001", name: "Sanctions Screening Calibration", officer: "Jason Hollingsworth", region: "North America", date: "Mar 20, 2026" },
  { id: "EMEA-2026-003", name: "GDPR Data Mapping Review", officer: "Richard Pooley", region: "EMEA", date: "Mar 18, 2026" },
  { id: "PRIV-2026-002", name: "Cookie Consent Audit", officer: "Kelly Thewes", region: "Global", date: "Mar 15, 2026" },
]

const pastDueItems = [
  { id: "ISS-45608", type: "Issue", severity: "CRITICAL" as const, label: "Issuer Solutions — Operational Risk", daysPastDue: 183 },
  { id: "ISS-45807", type: "Issue", severity: "CRITICAL" as const, label: "Issuer Solutions — Operational Risk", daysPastDue: 61 },
  { id: "FIG-PAST-01", type: "Activity", severity: "MODERATE" as const, label: "FIG: Product Review Monitoring", daysPastDue: 45 },
  { id: "ISS-45957", type: "Issue", severity: "LOW" as const, label: "Corporate — Regulatory Compliance Risk", daysPastDue: 44 },
  { id: "FIG-PAST-02", type: "Activity", severity: "MODERATE" as const, label: "FIG: Financial Crime Assessment", daysPastDue: 32 },
  { id: "ISS-45953", type: "Issue", severity: "MODERATE" as const, label: "Corporate — Regulatory Compliance Risk", daysPastDue: 1 },
]

export default function UnifiedDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <TopNav title="Compliance Dashboard" breadcrumb={["Home"]} />

      {/* Row 1 — KPI Cards */}
      <div className="grid grid-cols-6 gap-4">
        <KpiCard
          label="Open Issues"
          value={139}
          subtitle="+2 vs last mo."
          trend="up"
          trendLabel="+1.5%"
          accentColor="orange"
          icon={AlertTriangle}
        />
        <KpiCard
          label="Critical / High"
          value={29}
          subtitle="20.9% of total"
          trend="down"
          trendLabel="-41%"
          accentColor="red"
          icon={TrendingUp}
        />
        <KpiCard
          label="M&T Completion"
          value="99.2%"
          subtitle="705 / 711"
          trend="up"
          trendLabel="+0.8%"
          accentColor="green"
          icon={CheckCircle2}
        />
        <KpiCard
          label="Past Due"
          value={4}
          subtitle="2.9% of total"
          accentColor="red"
          icon={Clock}
        />
        <KpiCard
          label="RRM Alerts"
          value={9}
          subtitle="In-SLA: 8 · Overdue: 1"
          accentColor="blue"
          icon={Bell}
        />
        <KpiCard
          label="Policies Due for Review"
          value={3}
          subtitle="Next 30 days"
          accentColor="slate"
          icon={FileText}
        />
      </div>

      {/* Row 2 — Charts */}
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 rounded-xl border border-border bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">M&T Monthly Velocity</h2>
          <MonthlyVelocityChart />
        </div>
        <div className="col-span-1 rounded-xl border border-border bg-white p-4">
          <h2 className="mb-1 text-sm font-semibold text-slate-800">Issues by Severity</h2>
          <SeverityDonutChart />
        </div>
        <div className="col-span-1 rounded-xl border border-border bg-white p-4">
          <h2 className="mb-1 text-sm font-semibold text-slate-800">Issues by Source</h2>
          <IssueSourceBarChart />
        </div>
      </div>

      {/* Row 3 — Regional Completion */}
      <div className="rounded-xl border border-border bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">Regional M&T Completion by LOB</h2>
        <RegionalCompletionChart />
      </div>

      {/* Row 4 — Feed + Past Due */}
      <div className="grid grid-cols-5 gap-4">
        {/* Recent completions */}
        <div className="col-span-3 rounded-xl border border-border bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Recent Activity Completions</h2>
          <div className="divide-y divide-border">
            {recentCompletions.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2.5">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="size-3.5 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.officer} · {item.region}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">{item.date}</p>
                  <p className="font-mono text-[10px] text-slate-400">{item.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Due Alerts */}
        <div className="col-span-2 rounded-xl border border-border bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Past-Due Alerts</h2>
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
              {pastDueItems.length} items
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {pastDueItems.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg border p-3 ${
                  item.daysPastDue >= 91 ? "border-red-200 bg-red-50" :
                  item.daysPastDue >= 31 ? "border-amber-200 bg-amber-50" :
                  "border-yellow-200 bg-yellow-50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-800">{item.label}</p>
                    <p className="font-mono text-[10px] text-slate-500">{item.id}</p>
                  </div>
                  <SeverityBadge severity={item.severity} />
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`text-xs font-semibold ${item.daysPastDue >= 91 ? "text-red-700" : item.daysPastDue >= 31 ? "text-amber-700" : "text-yellow-700"}`}>
                    {item.daysPastDue}d past due
                  </span>
                  <span className="text-xs text-slate-400">· {item.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
