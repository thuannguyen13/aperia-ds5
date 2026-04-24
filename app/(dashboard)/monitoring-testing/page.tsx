"use client"

import { useState } from "react"
import { CheckCircle2, Search, Filter, Eye, Check } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input/input"
import { KpiCard } from "@/components/dashboard/KpiCard"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import { MonthlyVelocityChart } from "@/components/dashboard/MonthlyVelocityChart"
import { RegionalCompletionChart } from "@/components/dashboard/RegionalCompletionChart"
import { PageHeaderSetter } from "@/components/layout/PageHeaderSetter"

type Status = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "PAST_DUE" | "DEFERRED" | "CANCELLED"
type ActivityType = "MONITORING" | "TESTING"

interface Activity {
  id: string
  region: string
  lob: string
  name: string
  type: ActivityType
  frequency: string
  owner: string
  targetDate: string
  status: Status
  evidenceUploaded: boolean
}

const activities: Activity[] = [
  { id: "EMEA-2025-061", region: "EMEA", lob: "FIG", name: "Daily Sanctions Upload Review", type: "MONITORING", frequency: "Monthly", owner: "Richard Pooley", targetDate: "Mar 31, 2026", status: "COMPLETED", evidenceUploaded: true },
  { id: "FCC-2025-075", region: "North America", lob: "FCC", name: "I-9 Monitoring", type: "MONITORING", frequency: "Quarterly", owner: "Jason Hollingsworth", targetDate: "Mar 31, 2026", status: "COMPLETED", evidenceUploaded: true },
  { id: "MER-2025-032", region: "Merchant", lob: "Merchant", name: "Clover Capital - CA Annual Reporting", type: "TESTING", frequency: "Annually", owner: "Jo-Ann Teng", targetDate: "Mar 31, 2026", status: "COMPLETED", evidenceUploaded: true },
  { id: "PRIV-2025-018", region: "Global", lob: "Privacy", name: "Privacy Incident QA", type: "TESTING", frequency: "Quarterly", owner: "Kelly Thewes", targetDate: "Mar 31, 2026", status: "COMPLETED", evidenceUploaded: false },
  { id: "FIG-2025-033", region: "North America", lob: "FIG", name: "Monitoring of Regulatory Client Inquiries", type: "MONITORING", frequency: "Monthly", owner: "Ed Friedman", targetDate: "Mar 31, 2026", status: "COMPLETED", evidenceUploaded: true },
  { id: "FIG-2025-041", region: "North America", lob: "FIG", name: "FIG Annual Product Family Review", type: "TESTING", frequency: "Annually", owner: "Ed Friedman", targetDate: "Feb 28, 2026", status: "PAST_DUE", evidenceUploaded: false },
  { id: "FIG-2025-042", region: "EMEA", lob: "FIG", name: "EMEA Financial Crime Assessment", type: "TESTING", frequency: "Annually", owner: "Richard Pooley", targetDate: "Jan 31, 2026", status: "PAST_DUE", evidenceUploaded: false },
  { id: "FCC-2026-001", region: "North America", lob: "FCC", name: "Sanctions Screening Calibration", type: "MONITORING", frequency: "Monthly", owner: "Jason Hollingsworth", targetDate: "Apr 30, 2026", status: "IN_PROGRESS", evidenceUploaded: false },
  { id: "PRIV-2026-002", region: "Global", lob: "Privacy", name: "Cookie Consent Audit", type: "TESTING", frequency: "Annually", owner: "Kelly Thewes", targetDate: "Jun 30, 2026", status: "PLANNED", evidenceUploaded: false },
  { id: "APAC-2026-001", region: "APAC", lob: "APAC", name: "AML Quarterly Review", type: "MONITORING", frequency: "Quarterly", owner: "Mei Lin", targetDate: "Jun 30, 2026", status: "PLANNED", evidenceUploaded: false },
  { id: "LATAM-2026-001", region: "LATAM", lob: "LATAM", name: "CDD Annual Review", type: "TESTING", frequency: "Annually", owner: "Carlos Rivera", targetDate: "Sep 30, 2026", status: "PLANNED", evidenceUploaded: false },
  { id: "EMEA-2026-004", region: "EMEA", lob: "EMEA", name: "GDPR Compliance Check", type: "MONITORING", frequency: "Quarterly", owner: "Richard Pooley", targetDate: "Jun 30, 2026", status: "IN_PROGRESS", evidenceUploaded: false },
]

const tabs = ["All", "My Activities", "Past Due", "Planned"] as const
type Tab = typeof tabs[number]

export default function MonitoringTestingPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All")
  const [search, setSearch] = useState("")
  const [regionFilter, setRegionFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = activities.filter((a) => {
    if (activeTab === "Past Due" && a.status !== "PAST_DUE") return false
    if (activeTab === "Planned" && a.status !== "PLANNED") return false
    if (activeTab === "My Activities" && a.owner !== "Susie Officer") return false
    if (regionFilter !== "All" && a.region !== regionFilter) return false
    if (typeFilter !== "All" && a.type !== typeFilter) return false
    if (statusFilter !== "All" && a.status !== statusFilter) return false
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.id.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const regions = ["All", ...Array.from(new Set(activities.map((a) => a.region)))]
  const completed = activities.filter((a) => a.status === "COMPLETED").length
  const inProgress = activities.filter((a) => a.status === "IN_PROGRESS").length
  const pastDue = activities.filter((a) => a.status === "PAST_DUE").length

  return (
    <div className="flex flex-col gap-6">
      <PageHeaderSetter title="Monitoring & Testing" breadcrumb={["Programs", "M&T"]} />

      {/* Row 1 — KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Total Activities" value={711} subtitle="FY 2025–2026" accentColor="blue" />
        <KpiCard label="Completed" value={705} subtitle="99.2%" trend="up" trendLabel="+0.8%" accentColor="green" icon={CheckCircle2} />
        <KpiCard label="In Progress" value={inProgress} subtitle="Active now" accentColor="blue" />
        <KpiCard label="Past Due" value={6} subtitle="FIG region" accentColor="red" />
      </div>

      {/* Row 2 — Charts */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl border border-border bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Monthly Completion Velocity</h2>
          <MonthlyVelocityChart />
        </div>
        <div className="rounded-xl border border-border bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Activity Type Breakdown</h2>
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">Monitoring</span>
                <span className="text-slate-500">413 / 711</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-blue-400" style={{ width: "58%" }} />
              </div>
              <span className="text-xs text-slate-400">58.1%</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">Testing</span>
                <span className="text-slate-500">298 / 711</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-violet-400" style={{ width: "41.9%" }} />
              </div>
              <span className="text-xs text-slate-400">41.9%</span>
            </div>
            <div className="mt-4 rounded-lg bg-slate-50 p-3 text-center">
              <div className="text-2xl font-bold text-slate-900">99.2%</div>
              <div className="text-xs text-slate-500">Overall completion rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3 — Regional completion */}
      <div className="rounded-xl border border-border bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">LOB Completion Status</h2>
        <RegionalCompletionChart />
      </div>

      {/* Row 4 — Activity Table */}
      <div className="rounded-xl border border-border bg-white p-4">
        {/* Tabs */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Input size="sm" placeholder="Search…" leftIcon={<Search />} value={search} onChange={(e) => setSearch(e.target.value)} className="w-44" />
            <select className="rounded-lg border border-border bg-white px-2 py-1.5 text-xs" value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
              {regions.map((r) => <option key={r}>{r}</option>)}
            </select>
            <select className="rounded-lg border border-border bg-white px-2 py-1.5 text-xs" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              {["All", "MONITORING", "TESTING"].map((t) => <option key={t}>{t}</option>)}
            </select>
            <select className="rounded-lg border border-border bg-white px-2 py-1.5 text-xs" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              {["All", "PLANNED", "IN_PROGRESS", "COMPLETED", "PAST_DUE"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Ref ID", "Region", "LOB", "Activity Name", "Type", "Frequency", "Owner", "Target Date", "Status", "Evidence", "Actions"].map((h) => (
                  <th key={h} className="pb-2 text-left text-xs font-medium uppercase tracking-wider text-slate-500 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((a) => (
                <tr key={a.id} className={`hover:bg-slate-50 transition-colors ${a.status === "PAST_DUE" ? "bg-red-50/50" : ""}`}>
                  <td className="py-2.5 font-mono text-xs text-slate-700 pr-4">{a.id}</td>
                  <td className="py-2.5 text-xs text-slate-600 pr-4">{a.region}</td>
                  <td className="py-2.5 text-xs text-slate-600 pr-4">{a.lob}</td>
                  <td className="py-2.5 pr-4">
                    <span className="line-clamp-1 text-xs font-medium text-slate-800">{a.name}</span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <span className={`text-xs font-medium ${a.type === "MONITORING" ? "text-blue-700" : "text-violet-700"}`}>{a.type}</span>
                  </td>
                  <td className="py-2.5 text-xs text-slate-500 pr-4">{a.frequency}</td>
                  <td className="py-2.5 text-xs text-slate-600 pr-4">{a.owner}</td>
                  <td className="py-2.5 text-xs text-slate-600 pr-4">{a.targetDate}</td>
                  <td className="py-2.5 pr-4"><StatusBadge status={a.status} /></td>
                  <td className="py-2.5 pr-4">
                    {a.evidenceUploaded ? (
                      <span className="text-xs font-medium text-green-700">Uploaded</span>
                    ) : (
                      <span className="text-xs text-slate-400">Pending</span>
                    )}
                  </td>
                  <td className="py-2.5">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon-xs" title="View">
                        <Eye className="size-3" />
                      </Button>
                      {a.status !== "COMPLETED" && (
                        <Button variant="ghost" size="icon-xs" title="Complete">
                          <Check className="size-3" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-10 text-center text-sm text-slate-400">No activities match the current filters.</div>
          )}
        </div>
      </div>
    </div>
  )
}
