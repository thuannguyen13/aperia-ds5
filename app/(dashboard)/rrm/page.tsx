"use client"

import { useState } from "react"
import { FileText, Eye } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { KpiCard } from "@/components/dashboard/KpiCard"
import { SlaProgressBar } from "@/components/dashboard/SlaProgressBar"
import { TopNav } from "@/components/layout/TopNav"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

type Priority = "CRITICAL" | "HIGH" | "STANDARD" | "LOW"
type AlertStatus = "NEW" | "IN_REVIEW" | "ASSESSED" | "CLOSED"

interface RegulatoryAlert {
  id: string
  title: string
  jurisdiction: string
  priority: Priority
  received: string
  effectiveDate: string
  daysElapsed: number
  slaDays: number
  status: AlertStatus
  linkedIssues: number
  assignee: string
  pageCount?: number
}

const alerts: RegulatoryAlert[] = [
  { id: "RRM-001", title: "CFPB Regulation F Update", jurisdiction: "US", priority: "HIGH", received: "Mar 25, 2026", effectiveDate: "Jun 1, 2026", daysElapsed: 28, slaDays: 30, status: "IN_REVIEW", linkedIssues: 3, assignee: "Lena Capalbo", pageCount: 47 },
  { id: "RRM-002", title: "EU AI Act Compliance Requirements", jurisdiction: "EU", priority: "CRITICAL", received: "Apr 10, 2026", effectiveDate: "May 1, 2026", daysElapsed: 13, slaDays: 15, status: "NEW", linkedIssues: 0, assignee: "Richard Pooley", pageCount: 112 },
  { id: "RRM-003", title: "PSD2 Fraud Reporting Update", jurisdiction: "EMEA", priority: "STANDARD", received: "Feb 20, 2026", effectiveDate: "Sep 1, 2026", daysElapsed: 45, slaDays: 45, status: "ASSESSED", linkedIssues: 2, assignee: "Richard Pooley", pageCount: 28 },
  { id: "RRM-004", title: "KNF IT/IS KRI Reporting Changes", jurisdiction: "Poland", priority: "STANDARD", received: "Apr 1, 2026", effectiveDate: "Jul 1, 2026", daysElapsed: 22, slaDays: 45, status: "NEW", linkedIssues: 1, assignee: "Lena Capalbo", pageCount: 15 },
  { id: "RRM-005", title: "FCA Consumer Duty Amendment", jurisdiction: "UK", priority: "HIGH", received: "Mar 10, 2026", effectiveDate: "May 20, 2026", daysElapsed: 43, slaDays: 30, status: "IN_REVIEW", linkedIssues: 4, assignee: "Richard Pooley", pageCount: 63 },
  { id: "RRM-006", title: "BACEN Resolution on Data Privacy", jurisdiction: "Brazil", priority: "STANDARD", received: "Mar 15, 2026", effectiveDate: "Aug 1, 2026", daysElapsed: 38, slaDays: 45, status: "IN_REVIEW", linkedIssues: 0, assignee: "Lena Capalbo", pageCount: 22 },
  { id: "RRM-007", title: "SEC Cybersecurity Disclosure Rule", jurisdiction: "US", priority: "HIGH", received: "Apr 5, 2026", effectiveDate: "Jun 15, 2026", daysElapsed: 18, slaDays: 30, status: "NEW", linkedIssues: 2, assignee: "Ed Friedman", pageCount: 89 },
  { id: "RRM-008", title: "EBA Guidelines on ICT Risk", jurisdiction: "EU", priority: "STANDARD", received: "Jan 20, 2026", effectiveDate: "Dec 1, 2026", daysElapsed: 60, slaDays: 45, status: "ASSESSED", linkedIssues: 1, assignee: "Richard Pooley", pageCount: 34 },
  { id: "RRM-009", title: "RBI Digital Lending Framework", jurisdiction: "India", priority: "STANDARD", received: "Apr 8, 2026", effectiveDate: "Sep 30, 2026", daysElapsed: 15, slaDays: 45, status: "NEW", linkedIssues: 0, assignee: "Mei Lin", pageCount: 41 },
  { id: "RRM-010", title: "ASIC Reportable Situation Update", jurisdiction: "Australia", priority: "LOW", received: "Apr 12, 2026", effectiveDate: "Dec 31, 2026", daysElapsed: 11, slaDays: 60, status: "NEW", linkedIssues: 0, assignee: "Mei Lin", pageCount: 19 },
]

const jurisdictionData = [
  { name: "US", count: 2 },
  { name: "EU", count: 2 },
  { name: "UK", count: 1 },
  { name: "Poland", count: 1 },
  { name: "Brazil", count: 1 },
  { name: "India", count: 1 },
  { name: "Australia", count: 1 },
  { name: "EMEA", count: 1 },
]

const priorityBadge: Record<Priority, string> = {
  CRITICAL: "bg-red-100 text-red-800",
  HIGH: "bg-orange-100 text-orange-800",
  STANDARD: "bg-blue-100 text-blue-800",
  LOW: "bg-slate-100 text-slate-700",
}

const statusBadge: Record<AlertStatus, string> = {
  NEW: "bg-gray-100 text-gray-700",
  IN_REVIEW: "bg-blue-100 text-blue-800",
  ASSESSED: "bg-green-100 text-green-800",
  CLOSED: "bg-slate-100 text-slate-500",
}

const slaByPriority = [
  { priority: "Critical", withinSla: 1, overdue: 0, total: 1, slaDays: 15 },
  { priority: "High", withinSla: 2, overdue: 1, total: 3, slaDays: 30 },
  { priority: "Standard", withinSla: 4, overdue: 1, total: 5, slaDays: 45 },
  { priority: "Low", withinSla: 1, overdue: 0, total: 1, slaDays: 60 },
]

export default function RRMPage() {
  const [assessingId, setAssessingId] = useState<string | null>(null)

  const totalAlerts = alerts.length
  const inReview = alerts.filter((a) => a.status === "IN_REVIEW").length
  const overdueSla = alerts.filter((a) => a.daysElapsed > a.slaDays).length
  const avgDays = Math.round(alerts.reduce((s, a) => s + a.daysElapsed, 0) / alerts.length * 10) / 10
  const linkedIssuesTotal = alerts.reduce((s, a) => s + a.linkedIssues, 0)

  return (
    <div className="flex flex-col gap-6">
      <TopNav title="RRM — Regulatory Rules Management" breadcrumb={["Programs", "RRM"]} />

      {/* Row 1 — KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        <KpiCard label="Total Alerts" value={totalAlerts} subtitle="This month" accentColor="blue" />
        <KpiCard label="In Review" value={inReview} subtitle="Within SLA" accentColor="blue" />
        <KpiCard label="Past SLA" value={overdueSla} subtitle="Overdue" accentColor="red" />
        <KpiCard label="Avg Review Days" value={avgDays} subtitle={`vs 45-day SLA`} accentColor="slate" />
        <KpiCard label="Linked Issues" value={linkedIssuesTotal} subtitle="Downstream impact" accentColor="orange" />
      </div>

      {/* Row 2 — Charts */}
      <div className="grid grid-cols-2 gap-4">
        {/* Jurisdiction bar */}
        <div className="rounded-xl border border-border bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Alert Volume by Jurisdiction</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={jurisdictionData} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} allowDecimals={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} formatter={(v) => [v, "Alerts"]} />
              <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* SLA health */}
        <div className="rounded-xl border border-border bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">SLA Health by Priority</h2>
          <div className="flex flex-col gap-4 pt-2">
            {slaByPriority.map((row) => {
              const pct = Math.round((row.withinSla / row.total) * 100)
              return (
                <div key={row.priority} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{row.priority}</span>
                    <span className="text-slate-500">{row.withinSla}/{row.total} within SLA ({row.slaDays}d)</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${pct === 100 ? "bg-green-500" : pct >= 70 ? "bg-amber-400" : "bg-red-500"}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{pct}% within SLA</span>
                    {row.overdue > 0 && <span className="text-red-600 font-medium">{row.overdue} overdue</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Row 3 — Regulation Tracker Table */}
      <div className="rounded-xl border border-border bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">Unified Regulation Tracker</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Alert ID", "Title", "Jurisdiction", "Priority", "Received", "Effective Date", "SLA Progress", "Status", "Linked Issues", "Assignee", "Actions"].map((h) => (
                  <th key={h} className="pb-2 text-left text-xs font-medium uppercase tracking-wider text-slate-500 pr-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {alerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 font-mono text-xs text-slate-700 pr-3">{alert.id}</td>
                  <td className="py-2.5 pr-3 max-w-[200px]">
                    <p className="truncate text-xs font-medium text-slate-800">{alert.title}</p>
                  </td>
                  <td className="py-2.5 text-xs text-slate-600 pr-3">{alert.jurisdiction}</td>
                  <td className="py-2.5 pr-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold uppercase ${priorityBadge[alert.priority]}`}>
                      {alert.priority}
                    </span>
                  </td>
                  <td className="py-2.5 text-xs text-slate-500 pr-3 whitespace-nowrap">{alert.received}</td>
                  <td className="py-2.5 text-xs text-slate-500 pr-3 whitespace-nowrap">{alert.effectiveDate}</td>
                  <td className="py-2.5 pr-3 w-28">
                    <SlaProgressBar daysElapsed={alert.daysElapsed} slaDays={alert.slaDays} showLabel />
                  </td>
                  <td className="py-2.5 pr-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge[alert.status]}`}>
                      {alert.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3">
                    {alert.linkedIssues > 0 ? (
                      <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-800">
                        {alert.linkedIssues}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-2.5 text-xs text-slate-600 pr-3">{alert.assignee}</td>
                  <td className="py-2.5">
                    <div className="flex gap-1">
                      <Button variant="outline" size="xs" onClick={() => setAssessingId(alert.id === assessingId ? null : alert.id)}>
                        Assess
                      </Button>
                      <Button variant="ghost" size="icon-xs">
                        <Eye className="size-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4 — AI Feed + Data Quality */}
      <div className="grid grid-cols-2 gap-4">
        {/* AI applicability feed */}
        <div className="rounded-xl border border-border bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Recent Alert Summaries</h2>
          <div className="flex flex-col gap-3">
            {alerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className="flex gap-3 rounded-lg bg-slate-50 p-3">
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-800">{alert.title}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                    <span>{alert.jurisdiction}</span>
                    {alert.pageCount && (
                      <span className="flex items-center gap-0.5">
                        <FileText className="size-3" />
                        {alert.pageCount}
                      </span>
                    )}
                    <span>{alert.received}</span>
                  </div>
                </div>
                <span className={`shrink-0 self-start rounded-full px-2 py-0.5 text-xs font-semibold ${
                  alert.status === "ASSESSED" ? "bg-green-100 text-green-700" :
                  alert.status === "IN_REVIEW" ? "bg-blue-100 text-blue-700" :
                  "bg-gray-100 text-gray-600"
                }`}>
                  {alert.status === "ASSESSED" ? "Applicable" : alert.status === "IN_REVIEW" ? "Under Review" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Data quality flags */}
        <div className="rounded-xl border border-border bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Data Quality Flags</h2>
          <div className="flex flex-col gap-2">
            {alerts
              .filter((a) => !a.effectiveDate || a.linkedIssues === 0)
              .slice(0, 5)
              .map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 rounded-lg border border-amber-100 bg-amber-50 p-3">
                  <div className="mt-0.5 size-1.5 rounded-full bg-amber-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-800">{alert.title}</p>
                    <p className="text-xs text-amber-700 mt-0.5">
                      {alert.linkedIssues === 0 ? "No linked issues — review applicability" : "Missing effective date"}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-slate-400">{alert.id}</span>
                </div>
              ))}
            {alerts.filter((a) => !a.effectiveDate || a.linkedIssues === 0).length === 0 && (
              <div className="py-8 text-center text-sm text-slate-400">No data quality issues detected.</div>
            )}
          </div>
        </div>
      </div>

      {/* Assessment drawer overlay */}
      {assessingId && (
        <div className="fixed inset-0 z-50 flex items-end justify-end" onClick={() => setAssessingId(null)}>
          <div className="h-full w-96 border-l border-border bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-base font-semibold text-slate-900">Assess Alert</h2>
            <p className="mt-1 text-xs text-slate-500 font-mono">{assessingId}</p>
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700">Verdict</label>
                <select className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-slate-700">
                  <option>Applicable</option>
                  <option>Not Applicable</option>
                  <option>Needs Further Review</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700">Notes</label>
                <textarea
                  className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400"
                  rows={4}
                  placeholder="Add assessment notes…"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="sm" className="flex-1" onClick={() => setAssessingId(null)}>
                  Submit Assessment
                </Button>
                <Button variant="outline" size="sm" onClick={() => setAssessingId(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
