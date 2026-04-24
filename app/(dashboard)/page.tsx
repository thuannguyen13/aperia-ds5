"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AlertTriangle, TrendingUp, CheckCircle2, Clock, Bell, FileText,
  ChevronRight, ArrowUp, ArrowDown, CalendarDays, Globe,
} from "lucide-react"
import { KpiCard } from "@/components/dashboard/KpiCard"
import { MonthlyVelocityChart } from "@/components/dashboard/MonthlyVelocityChart"
import { SeverityDonutChart } from "@/components/dashboard/SeverityDonutChart"
import { IssueSourceBarChart } from "@/components/dashboard/IssueSourceBarChart"
import { RegionalCompletionChart } from "@/components/dashboard/RegionalCompletionChart"
import { SeverityBadge } from "@/components/dashboard/SeverityBadge"
import { PageHeaderSetter } from "@/components/layout/PageHeaderSetter"
import { Badge } from "@/components/ui/badge/badge"
import { Card, CardContent } from "@/components/ui/card/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select"

const recentCompletions = [
  { id: "EMEA-2025-061", name: "Daily Sanctions Upload Review",              officer: "Richard Pooley",      region: "EMEA",          date: "Mar 28, 2026" },
  { id: "FCC-2025-075",  name: "I-9 Monitoring",                             officer: "Jason Hollingsworth", region: "North America",  date: "Mar 27, 2026" },
  { id: "PRIV-2025-018", name: "Privacy Incident QA",                        officer: "Kelly Thewes",        region: "Global",         date: "Mar 26, 2026" },
  { id: "FIG-2025-033",  name: "Monitoring of Regulatory Client Inquiries",  officer: "Ed Friedman",         region: "North America",  date: "Mar 25, 2026" },
  { id: "MER-2025-032",  name: "Clover Capital - CA Annual Reporting",        officer: "Jo-Ann Teng",         region: "Merchant",       date: "Mar 24, 2026" },
  { id: "APAC-2025-044", name: "AML Transaction Monitoring Review",           officer: "Mei Lin",             region: "APAC",           date: "Mar 22, 2026" },
  { id: "LATAM-2025-011",name: "CDD Periodic Review",                         officer: "Carlos Rivera",       region: "LATAM",          date: "Mar 21, 2026" },
  { id: "FCC-2026-001",  name: "Sanctions Screening Calibration",             officer: "Jason Hollingsworth", region: "North America",  date: "Mar 20, 2026" },
  { id: "EMEA-2026-003", name: "GDPR Data Mapping Review",                    officer: "Richard Pooley",      region: "EMEA",           date: "Mar 18, 2026" },
  { id: "PRIV-2026-002", name: "Cookie Consent Audit",                        officer: "Kelly Thewes",        region: "Global",         date: "Mar 15, 2026" },
]

const pastDueItems = [
  { id: "ISS-45608",  type: "Issue",    severity: "CRITICAL" as const, label: "Issuer Solutions — Operational Risk",       daysPastDue: 183, href: "/issues/ISS-45608"  },
  { id: "ISS-45807",  type: "Issue",    severity: "CRITICAL" as const, label: "Issuer Solutions — AML Transaction Monitoring", daysPastDue: 61, href: "/issues/ISS-45807" },
  { id: "FIG-PAST-01",type: "Activity", severity: "MODERATE" as const, label: "FIG: Product Review Monitoring",             daysPastDue: 45, href: "/monitoring-testing/FIG-2025-041" },
  { id: "ISS-45957",  type: "Issue",    severity: "LOW"      as const, label: "Corporate — Regulatory Compliance Risk",     daysPastDue: 44, href: "/issues/ISS-45957"  },
  { id: "FIG-PAST-02",type: "Activity", severity: "MODERATE" as const, label: "FIG: Financial Crime Assessment",            daysPastDue: 32, href: "/monitoring-testing/FIG-2025-042" },
  { id: "ISS-45953",  type: "Issue",    severity: "MODERATE" as const, label: "Corporate — Regulatory Compliance Risk",     daysPastDue: 1,  href: "/issues/ISS-45953"  },
]

type RagStatus = "RED" | "AMBER" | "GREEN"

interface KpiSnapshot {
  openIssues: number; criticalHigh: number
  mtDone: number;     mtTotal: number
  pastDue: number
  rrmAlerts: number;  rrmInSla: number; rrmOverdue: number
  policiesDue: number
}

// Per-period × per-region KPI lookup (prototype mock data)
const kpiData: Record<string, Record<string, KpiSnapshot>> = {
  "Mar 2026 – MTD": {
    "All Regions / LOB": { openIssues: 139, criticalHigh: 29, mtDone: 705, mtTotal: 711, pastDue: 4, rrmAlerts: 9,  rrmInSla: 8,  rrmOverdue: 1, policiesDue: 3 },
    "North America":     { openIssues: 58,  criticalHigh: 14, mtDone: 218, mtTotal: 219, pastDue: 2, rrmAlerts: 3,  rrmInSla: 3,  rrmOverdue: 0, policiesDue: 1 },
    "EMEA":              { openIssues: 41,  criticalHigh: 9,  mtDone: 187, mtTotal: 187, pastDue: 0, rrmAlerts: 4,  rrmInSla: 3,  rrmOverdue: 1, policiesDue: 1 },
    "APAC":              { openIssues: 22,  criticalHigh: 4,  mtDone: 131, mtTotal: 133, pastDue: 1, rrmAlerts: 1,  rrmInSla: 1,  rrmOverdue: 0, policiesDue: 0 },
    "LATAM":             { openIssues: 11,  criticalHigh: 2,  mtDone: 89,  mtTotal: 91,  pastDue: 1, rrmAlerts: 1,  rrmInSla: 1,  rrmOverdue: 0, policiesDue: 1 },
    "Global":            { openIssues: 7,   criticalHigh: 0,  mtDone: 80,  mtTotal: 80,  pastDue: 0, rrmAlerts: 0,  rrmInSla: 0,  rrmOverdue: 0, policiesDue: 0 },
    "Merchant":          { openIssues: 0,   criticalHigh: 0,  mtDone: 0,   mtTotal: 1,   pastDue: 0, rrmAlerts: 0,  rrmInSla: 0,  rrmOverdue: 0, policiesDue: 0 },
  },
  "Feb 2026": {
    "All Regions / LOB": { openIssues: 147, criticalHigh: 35, mtDone: 698, mtTotal: 711, pastDue: 6, rrmAlerts: 11, rrmInSla: 9,  rrmOverdue: 2, policiesDue: 5 },
    "North America":     { openIssues: 62,  criticalHigh: 16, mtDone: 215, mtTotal: 219, pastDue: 3, rrmAlerts: 4,  rrmInSla: 3,  rrmOverdue: 1, policiesDue: 2 },
    "EMEA":              { openIssues: 44,  criticalHigh: 11, mtDone: 184, mtTotal: 187, pastDue: 1, rrmAlerts: 5,  rrmInSla: 4,  rrmOverdue: 1, policiesDue: 2 },
    "APAC":              { openIssues: 24,  criticalHigh: 5,  mtDone: 129, mtTotal: 133, pastDue: 1, rrmAlerts: 1,  rrmInSla: 1,  rrmOverdue: 0, policiesDue: 0 },
    "LATAM":             { openIssues: 12,  criticalHigh: 3,  mtDone: 88,  mtTotal: 91,  pastDue: 1, rrmAlerts: 1,  rrmInSla: 1,  rrmOverdue: 0, policiesDue: 1 },
    "Global":            { openIssues: 5,   criticalHigh: 0,  mtDone: 82,  mtTotal: 80,  pastDue: 0, rrmAlerts: 0,  rrmInSla: 0,  rrmOverdue: 0, policiesDue: 0 },
    "Merchant":          { openIssues: 0,   criticalHigh: 0,  mtDone: 0,   mtTotal: 1,   pastDue: 0, rrmAlerts: 0,  rrmInSla: 0,  rrmOverdue: 0, policiesDue: 0 },
  },
  "Jan 2026": {
    "All Regions / LOB": { openIssues: 152, criticalHigh: 38, mtDone: 680, mtTotal: 711, pastDue: 7, rrmAlerts: 13, rrmInSla: 10, rrmOverdue: 3, policiesDue: 6 },
    "North America":     { openIssues: 64,  criticalHigh: 18, mtDone: 210, mtTotal: 219, pastDue: 3, rrmAlerts: 5,  rrmInSla: 4,  rrmOverdue: 1, policiesDue: 2 },
    "EMEA":              { openIssues: 46,  criticalHigh: 12, mtDone: 181, mtTotal: 187, pastDue: 2, rrmAlerts: 5,  rrmInSla: 4,  rrmOverdue: 1, policiesDue: 2 },
    "APAC":              { openIssues: 25,  criticalHigh: 5,  mtDone: 127, mtTotal: 133, pastDue: 1, rrmAlerts: 2,  rrmInSla: 1,  rrmOverdue: 1, policiesDue: 1 },
    "LATAM":             { openIssues: 12,  criticalHigh: 3,  mtDone: 84,  mtTotal: 91,  pastDue: 1, rrmAlerts: 1,  rrmInSla: 1,  rrmOverdue: 0, policiesDue: 1 },
    "Global":            { openIssues: 5,   criticalHigh: 0,  mtDone: 78,  mtTotal: 80,  pastDue: 0, rrmAlerts: 0,  rrmInSla: 0,  rrmOverdue: 0, policiesDue: 0 },
    "Merchant":          { openIssues: 0,   criticalHigh: 0,  mtDone: 0,   mtTotal: 1,   pastDue: 0, rrmAlerts: 0,  rrmInSla: 0,  rrmOverdue: 0, policiesDue: 0 },
  },
  "Q1 2026": {
    "All Regions / LOB": { openIssues: 139, criticalHigh: 29, mtDone: 705, mtTotal: 711, pastDue: 4, rrmAlerts: 9,  rrmInSla: 8,  rrmOverdue: 1, policiesDue: 3 },
    "North America":     { openIssues: 58,  criticalHigh: 14, mtDone: 218, mtTotal: 219, pastDue: 2, rrmAlerts: 3,  rrmInSla: 3,  rrmOverdue: 0, policiesDue: 1 },
    "EMEA":              { openIssues: 41,  criticalHigh: 9,  mtDone: 187, mtTotal: 187, pastDue: 0, rrmAlerts: 4,  rrmInSla: 3,  rrmOverdue: 1, policiesDue: 1 },
    "APAC":              { openIssues: 22,  criticalHigh: 4,  mtDone: 131, mtTotal: 133, pastDue: 1, rrmAlerts: 1,  rrmInSla: 1,  rrmOverdue: 0, policiesDue: 0 },
    "LATAM":             { openIssues: 11,  criticalHigh: 2,  mtDone: 89,  mtTotal: 91,  pastDue: 1, rrmAlerts: 1,  rrmInSla: 1,  rrmOverdue: 0, policiesDue: 1 },
    "Global":            { openIssues: 7,   criticalHigh: 0,  mtDone: 80,  mtTotal: 80,  pastDue: 0, rrmAlerts: 0,  rrmInSla: 0,  rrmOverdue: 0, policiesDue: 0 },
    "Merchant":          { openIssues: 0,   criticalHigh: 0,  mtDone: 0,   mtTotal: 1,   pastDue: 0, rrmAlerts: 0,  rrmInSla: 0,  rrmOverdue: 0, policiesDue: 0 },
  },
  "Full Year 2025": {
    "All Regions / LOB": { openIssues: 176, criticalHigh: 50, mtDone: 684, mtTotal: 720, pastDue: 11, rrmAlerts: 18, rrmInSla: 14, rrmOverdue: 4, policiesDue: 8 },
    "North America":     { openIssues: 74,  criticalHigh: 22, mtDone: 212, mtTotal: 222, pastDue: 5,  rrmAlerts: 7,  rrmInSla: 5,  rrmOverdue: 2, policiesDue: 3 },
    "EMEA":              { openIssues: 52,  criticalHigh: 16, mtDone: 180, mtTotal: 190, pastDue: 3,  rrmAlerts: 7,  rrmInSla: 6,  rrmOverdue: 1, policiesDue: 3 },
    "APAC":              { openIssues: 28,  criticalHigh: 8,  mtDone: 126, mtTotal: 136, pastDue: 2,  rrmAlerts: 3,  rrmInSla: 2,  rrmOverdue: 1, policiesDue: 1 },
    "LATAM":             { openIssues: 15,  criticalHigh: 4,  mtDone: 87,  mtTotal: 93,  pastDue: 1,  rrmAlerts: 1,  rrmInSla: 1,  rrmOverdue: 0, policiesDue: 1 },
    "Global":            { openIssues: 7,   criticalHigh: 0,  mtDone: 79,  mtTotal: 79,  pastDue: 0,  rrmAlerts: 0,  rrmInSla: 0,  rrmOverdue: 0, policiesDue: 0 },
    "Merchant":          { openIssues: 0,   criticalHigh: 0,  mtDone: 0,   mtTotal: 0,   pastDue: 0,  rrmAlerts: 0,  rrmInSla: 0,  rrmOverdue: 0, policiesDue: 0 },
  },
}

function deriveIssueRag(k: KpiSnapshot): RagStatus {
  if (k.pastDue >= 2 && k.criticalHigh > 0) return "RED"
  if (k.pastDue > 0) return "AMBER"
  return "GREEN"
}
function deriveMtRag(k: KpiSnapshot): RagStatus {
  if (k.mtTotal === 0) return "GREEN"
  const pct = (k.mtDone / k.mtTotal) * 100
  if (pct >= 99) return "GREEN"
  if (pct >= 95) return "AMBER"
  return "RED"
}
function deriveRrmRag(k: KpiSnapshot): RagStatus {
  if (k.rrmOverdue >= 2) return "RED"
  if (k.rrmOverdue > 0) return "AMBER"
  return "GREEN"
}

const ragCfg: Record<RagStatus, { bar: string; bg: string; border: string; text: string; dot: string; label: string }> = {
  GREEN: { bar: "bg-green-500", bg: "bg-green-50", border: "border-green-200", text: "text-green-800", dot: "bg-green-500", label: "GREEN" },
  AMBER: { bar: "bg-amber-400", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", dot: "bg-amber-400", label: "AMBER" },
  RED:   { bar: "bg-red-500",   bg: "bg-red-50",   border: "border-red-200",   text: "text-red-800",   dot: "bg-red-500",   label: "RED"   },
}

const timePeriods = [
  "Mar 2026 – MTD",
  "Feb 2026",
  "Jan 2026",
  "Q1 2026",
  "Full Year 2025",
]

// Regions present in the completions feed; used for View by filter
const regionOptions = ["All Regions / LOB", ...Array.from(new Set(recentCompletions.map(c => c.region)))]


export default function UnifiedDashboard() {
  const [timePeriod, setTimePeriod] = useState("Mar 2026 – MTD")
  const [viewBy, setViewBy]         = useState("All Regions / LOB")
  const [sortDir, setSortDir]       = useState<"desc" | "asc">("desc")

  // Resolve KPI snapshot for current scope
  const kpi = kpiData[timePeriod]?.[viewBy] ?? kpiData["Mar 2026 – MTD"]["All Regions / LOB"]
  const mtPct = kpi.mtTotal > 0 ? ((kpi.mtDone / kpi.mtTotal) * 100).toFixed(1) + "%" : "—"
  const critPct = kpi.openIssues > 0 ? ((kpi.criticalHigh / kpi.openIssues) * 100).toFixed(1) + "%" : "0%"

  // Derive RAG status from live KPI values
  const ragItems = [
    {
      key: "issues", title: "Issues", href: "/issues",
      status: deriveIssueRag(kpi),
      label: kpi.pastDue > 0 ? `${kpi.pastDue} past due, ${kpi.criticalHigh} critical` : "No past-due issues",
      detail: `${kpi.openIssues} open · ${kpi.criticalHigh} critical/high`,
    },
    {
      key: "mt", title: "M&T Activities", href: "/monitoring-testing",
      status: deriveMtRag(kpi),
      label: `${mtPct} completion`,
      detail: `${kpi.mtDone} / ${kpi.mtTotal} activities complete`,
    },
    {
      key: "rrm", title: "RRM / Regulatory", href: "/rrm",
      status: deriveRrmRag(kpi),
      label: kpi.rrmOverdue > 0 ? `${kpi.rrmOverdue} alert${kpi.rrmOverdue > 1 ? "s" : ""} past SLA` : "All alerts in-SLA",
      detail: `${kpi.rrmAlerts} alerts · ${kpi.rrmInSla} in-SLA · ${kpi.rrmOverdue} overdue`,
    },
  ] as const

  // Global "View by" drives the completions feed
  const filteredCompletions = recentCompletions
    .filter(c => viewBy === "All Regions / LOB" || c.region === viewBy)
    .sort((a, b) => {
      const da = new Date(a.date).getTime()
      const db = new Date(b.date).getTime()
      return sortDir === "desc" ? db - da : da - db
    })

  return (
    <div className="flex flex-col">
      <PageHeaderSetter title="Compliance Dashboard" breadcrumb={["Home"]} />
      <div className="grid gap-4">

        {/* Global Scope Bar */}
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-white px-4 py-2.5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <CalendarDays className="size-3.5 text-slate-400" />
            Time Period
          </div>
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger size="sm" className="w-40 border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timePeriods.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>

          <div className="mx-1 h-4 w-px bg-border" />

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Globe className="size-3.5 text-slate-400" />
            View by
          </div>
          <Select value={viewBy} onValueChange={setViewBy}>
            <SelectTrigger size="sm" className="w-44 border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {regionOptions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>

          <p className="ml-auto hidden text-[11px] text-slate-400 lg:block">All KPIs update with scope selection</p>
        </div>

        {/* RAG Roll-up Banner */}
        <div className="grid grid-cols-3 gap-3">
          {ragItems.map(item => {
            const cfg = ragCfg[item.status]
            return (
              <Link key={item.key} href={item.href}>
                <Card className={`p-0 border ${cfg.border} hover:shadow-md transition-shadow`}>
                  <div className={`h-1.5 w-full rounded-t-xl ${cfg.bar}`} />
                  <CardContent className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-500">{item.title}</p>
                      <p className="mt-0.5 text-sm font-semibold text-slate-900 truncate">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.detail}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <Badge variant="outline" className={`border-transparent ${cfg.bg} ${cfg.text} font-semibold text-[10px]`}>
                        <span className={`mr-1 inline-block size-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </Badge>
                      <ChevronRight className="size-3.5 text-slate-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Row 1 — KPI Cards (clickable drill-downs) */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <Link href="/issues"><KpiCard label="Open Issues" value={kpi.openIssues} subtitle="All statuses" accentColor="orange" icon={AlertTriangle} /></Link>
          <Link href="/issues"><KpiCard label="Critical / High" value={kpi.criticalHigh} subtitle={`${critPct} of total`} accentColor="red" icon={TrendingUp} /></Link>
          <Link href="/monitoring-testing"><KpiCard label="M&T Completion" value={mtPct} subtitle={`${kpi.mtDone} / ${kpi.mtTotal}`} accentColor="green" icon={CheckCircle2} /></Link>
          <Link href="/issues"><KpiCard label="Past Due" value={kpi.pastDue} subtitle={`${kpi.openIssues > 0 ? ((kpi.pastDue / kpi.openIssues) * 100).toFixed(1) : 0}% of total`} accentColor="red" icon={Clock} /></Link>
          <Link href="/rrm"><KpiCard label="RRM Alerts" value={kpi.rrmAlerts} subtitle={`In-SLA: ${kpi.rrmInSla} · Overdue: ${kpi.rrmOverdue}`} accentColor="blue" icon={Bell} /></Link>
          <Link href="/policies"><KpiCard label="Policies Due for Review" value={kpi.policiesDue} subtitle="Next 30 days" accentColor="slate" icon={FileText} /></Link>
        </div>

        {/* Row 2 — Charts */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="col-span-1 p-0 md:col-span-2">
            <CardContent className="p-4">
              <h2 className="mb-3 text-sm font-semibold text-slate-800">M&T Monthly Velocity</h2>
              <MonthlyVelocityChart />
            </CardContent>
          </Card>
          <Card className="p-0">
            <CardContent className="p-4">
              <h2 className="mb-1 text-sm font-semibold text-slate-800">Issues by Severity</h2>
              <SeverityDonutChart />
            </CardContent>
          </Card>
          <Card className="p-0">
            <CardContent className="p-4">
              <h2 className="mb-1 text-sm font-semibold text-slate-800">Issues by Source</h2>
              <IssueSourceBarChart />
            </CardContent>
          </Card>
        </div>

        {/* Row 3 — Regional Completion */}
        <Card className="p-0">
          <CardContent className="p-4">
            <h2 className="mb-3 text-sm font-semibold text-slate-800">Regional M&T Completion by LOB</h2>
            <RegionalCompletionChart />
          </CardContent>
        </Card>

        {/* Row 4 — Feed + Past Due */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {/* Recent completions */}
          <Card className="p-0 lg:col-span-3">
            <CardContent className="p-4">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-semibold text-slate-800">Recent Activity Completions</h2>
                {viewBy !== "All Regions / LOB" && (
                  <Badge variant="outline" className="border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100">{viewBy}</Badge>
                )}
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")}
                    className="flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    {sortDir === "desc" ? <ArrowDown className="size-3" /> : <ArrowUp className="size-3" />}
                    Date
                  </button>
                </div>
              </div>
              <div className="divide-y divide-border">
                {filteredCompletions.length === 0 && (
                  <p className="py-6 text-center text-sm text-slate-400">No completions match filter.</p>
                )}
                {filteredCompletions.map((item) => (
                  <Link key={item.id} href={`/monitoring-testing/${item.id}`} className="flex items-center gap-3 py-2.5 hover:bg-slate-50 rounded-lg px-1 -mx-1 transition-colors">
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
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Past Due Alerts */}
          <Card className="p-0 lg:col-span-2">
            <CardContent className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">Past-Due Alerts</h2>
                <Badge variant="outline" className="border-transparent bg-red-100 text-red-700 font-semibold hover:bg-red-100">
                  {pastDueItems.length} items
                </Badge>
              </div>
              <div className="flex flex-col gap-2">
                {pastDueItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`rounded-lg border p-3 transition-shadow hover:shadow-sm ${
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
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <span className={`text-xs font-semibold ${item.daysPastDue >= 91 ? "text-red-700" : item.daysPastDue >= 31 ? "text-amber-700" : "text-yellow-700"}`}>
                        {item.daysPastDue}d past due
                      </span>
                      <span className="text-xs text-slate-400">{item.type} <ChevronRight className="inline size-3" /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
