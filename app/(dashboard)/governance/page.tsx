"use client"

import { useState } from "react"
import { Download, CheckCircle, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input/input"
import { KpiCard } from "@/components/dashboard/KpiCard"
import { SeverityBadge } from "@/components/dashboard/SeverityBadge"
import { PageHeaderSetter } from "@/components/layout/PageHeaderSetter"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts"

// ── Mock Data ─────────────────────────────────────────────────────────────────

const lobData = [
  { lob: "Financial Solutions", low: 22, moderate: 10, high: 2, critical: 6 },
  { lob: "Corporate & Other", low: 10, moderate: 19, high: 8, critical: 1 },
  { lob: "EMEA", low: 6, moderate: 23, high: 8, critical: 1 },
  { lob: "Merchant Solutions", low: 5, moderate: 13, high: 2, critical: 0 },
  { lob: "APAC", low: 0, moderate: 2, high: 0, critical: 0 },
  { lob: "LATAM", low: 0, moderate: 0, high: 1, critical: 0 },
]

const sourceData = [
  { name: "Business ID", value: 21, color: "#3b82f6" },
  { name: "2nd Line", value: 50, color: "#f97316" },
  { name: "Internal Audit", value: 56, color: "#8b5cf6" },
  { name: "External", value: 12, color: "#10b981" },
]

const pastDueIssues = [
  { id: "ISS-45608", severity: "CRITICAL" as const, lob: "Issuer Solutions", daysPastDue: 183, dueDate: "Oct 22, 2025", owner: "John Smith", type: "Direct" },
  { id: "ISS-45807", severity: "CRITICAL" as const, lob: "Issuer Solutions", daysPastDue: 61, dueDate: "Feb 21, 2026", owner: "Jane Doe", type: "Direct" },
  { id: "ISS-45957", severity: "LOW" as const, lob: "Corporate", daysPastDue: 44, dueDate: "Mar 10, 2026", owner: "Mark Wilson", type: "Indirect" },
  { id: "ISS-45953", severity: "MODERATE" as const, lob: "Corporate", daysPastDue: 1, dueDate: "Apr 22, 2026", owner: "Sara Brown", type: "Direct" },
]

type SortDir = "asc" | "desc" | null
type SortKey = "id" | "severity" | "lob" | "daysPastDue" | "dueDate" | "owner" | "type"

const allIssues = [
  ...pastDueIssues,
  { id: "ISS-45001", severity: "HIGH" as const, lob: "Financial Solutions", daysPastDue: 0, dueDate: "May 15, 2026", owner: "Alice Park", type: "Direct" },
  { id: "ISS-45002", severity: "MODERATE" as const, lob: "EMEA", daysPastDue: 0, dueDate: "May 30, 2026", owner: "Boris Klein", type: "Indirect" },
  { id: "ISS-45003", severity: "LOW" as const, lob: "Merchant Solutions", daysPastDue: 0, dueDate: "Jun 10, 2026", owner: "Carla Nunes", type: "Direct" },
  { id: "ISS-45004", severity: "CRITICAL" as const, lob: "Financial Solutions", daysPastDue: 0, dueDate: "Apr 30, 2026", owner: "Derek Lane", type: "Direct" },
  { id: "ISS-45005", severity: "HIGH" as const, lob: "Corporate & Other", daysPastDue: 0, dueDate: "May 5, 2026", owner: "Elena Ford", type: "Direct" },
  { id: "ISS-45006", severity: "MODERATE" as const, lob: "EMEA", daysPastDue: 0, dueDate: "May 20, 2026", owner: "Frank Moore", type: "Indirect" },
  { id: "ISS-45007", severity: "LOW" as const, lob: "APAC", daysPastDue: 0, dueDate: "Jun 25, 2026", owner: "Grace Xu", type: "Direct" },
  { id: "ISS-45008", severity: "MODERATE" as const, lob: "LATAM", daysPastDue: 0, dueDate: "Jul 1, 2026", owner: "Hugo Cruz", type: "Indirect" },
]

const PAGE_SIZE = 8

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey | null; sortDir: SortDir }) {
  if (sortKey !== col) return <ChevronsUpDown className="ml-1 inline size-3 text-slate-300" />
  if (sortDir === "asc") return <ChevronUp className="ml-1 inline size-3 text-blue-600" />
  return <ChevronDown className="ml-1 inline size-3 text-blue-600" />
}

export default function GovernancePage() {
  const [search, setSearch] = useState("")
  const [severityFilter, setSeverityFilter] = useState("All")
  const [pastDueOnly, setPastDueOnly] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)
  const [page, setPage] = useState(1)

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : sortDir === "desc" ? null : "asc")
      if (sortDir === "desc") setSortKey(null)
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
    setPage(1)
  }

  const filtered = allIssues
    .filter((i) => severityFilter === "All" || i.severity === severityFilter)
    .filter((i) => !pastDueOnly || i.daysPastDue > 0)
    .filter((i) =>
      search === "" ||
      i.id.toLowerCase().includes(search.toLowerCase()) ||
      i.lob.toLowerCase().includes(search.toLowerCase()) ||
      i.owner.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sortKey || !sortDir) return 0
      const av = a[sortKey]
      const bv = b[sortKey]
      const mul = sortDir === "asc" ? 1 : -1
      return String(av).localeCompare(String(bv)) * mul
    })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function exportCsv() {
    const rows = [
      ["Issue ID", "Severity", "LOB", "Type", "Days Past Due", "Due Date", "Owner"],
      ...filtered.map((i) => [i.id, i.severity, i.lob, i.type, String(i.daysPastDue), i.dueDate, i.owner]),
    ]
    const csv = rows.map((r) => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "governance-issues.csv"
    a.click()
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeaderSetter title="Governance Reporting" breadcrumb={["Programs", "Governance"]} />

      {/* Report selector */}
      <div className="flex items-center gap-3">
        <select className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
          <option>April 2026 Governance Forum</option>
          <option>March 2026 Governance Forum</option>
          <option>February 2026 Governance Forum</option>
        </select>
        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">DRAFT</span>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="size-3.5" />
            Export
          </Button>
          <Button variant="default" size="sm">
            <CheckCircle className="size-3.5" />
            Approve
          </Button>
        </div>
      </div>

      {/* Row 1 — KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        <KpiCard label="Open Issues" value={139} subtitle="↓ from 176 last year" trend="down" trendLabel="-21%" accentColor="orange" />
        <KpiCard label="Critical + High" value={29} subtitle="20.9% of open" trend="down" trendLabel="-41%" accentColor="red" />
        <KpiCard label="Past Due" value={4} subtitle="2.9% of open" accentColor="red" />
        <KpiCard label="Avg Days Past Due" value="72.25" subtitle="↓ from 243 last year" trend="down" trendLabel="-70%" accentColor="green" />
        <KpiCard label="vs Last Year" value="-21%" subtitle="176 → 139 open" trend="down" trendLabel="Improved" accentColor="green" />
      </div>

      {/* Row 2 — LOB Chart */}
      <div className="rounded-xl border border-border bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">Open Issues by LOB and Severity</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={lobData} layout="vertical" margin={{ top: 4, right: 24, left: 16, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis dataKey="lob" type="category" tick={{ fontSize: 11, fill: "#64748b" }} width={130} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="low" stackId="a" fill="#94a3b8" name="Low" />
            <Bar dataKey="moderate" stackId="a" fill="#fbbf24" name="Moderate" />
            <Bar dataKey="high" stackId="a" fill="#f97316" name="High" />
            <Bar dataKey="critical" stackId="a" fill="#dc2626" name="Critical" radius={[0, 2, 2, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Row 3 — Source donut + Past Due table */}
      <div className="grid grid-cols-5 gap-4">
        {/* Source donut */}
        <div className="col-span-2 rounded-xl border border-border bg-white p-4">
          <h2 className="mb-2 text-sm font-semibold text-slate-800">Issues by Source</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={sourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                {sourceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(val, name) => [val, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {sourceData.map((d) => (
              <div key={d.name} className="flex items-center gap-1">
                <div className="size-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-xs text-slate-600">{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Past Due table */}
        <div className="col-span-3 rounded-xl border border-border bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Past-Due Issues</h2>
          <table className="w-full text-sm">
            <thead>
              <tr>
                {["Issue ID", "Severity", "LOB", "Days Past Due", "Due Date", "Owner", "Type"].map((h) => (
                  <th key={h} className="pb-2 text-left text-xs font-medium uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pastDueIssues.map((issue) => (
                <tr
                  key={issue.id}
                  className={
                    issue.daysPastDue >= 91 ? "bg-red-50" :
                    issue.daysPastDue >= 31 ? "bg-amber-50" :
                    "bg-yellow-50"
                  }
                >
                  <td className="py-2 font-mono text-xs text-slate-700">{issue.id}</td>
                  <td className="py-2"><SeverityBadge severity={issue.severity} /></td>
                  <td className="py-2 text-xs text-slate-700">{issue.lob}</td>
                  <td className={`py-2 text-xs font-semibold ${issue.daysPastDue >= 91 ? "text-red-700" : issue.daysPastDue >= 31 ? "text-amber-700" : "text-yellow-700"}`}>
                    {issue.daysPastDue}d
                  </td>
                  <td className="py-2 text-xs text-slate-600">{issue.dueDate}</td>
                  <td className="py-2 text-xs text-slate-600">{issue.owner}</td>
                  <td className="py-2 text-xs text-slate-500">{issue.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4 — Full Issue Table */}
      <div className="rounded-xl border border-border bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800">All Issues</h2>
          <div className="flex items-center gap-2">
            <Input size="sm" placeholder="Search issues…" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} className="w-48" />
            <select
              className="rounded-lg border border-border bg-white px-2 py-1.5 text-xs text-slate-700"
              value={severityFilter}
              onChange={(e) => { setSeverityFilter(e.target.value); setPage(1) }}
            >
              {["All", "CRITICAL", "HIGH", "MODERATE", "LOW"].map((s) => <option key={s}>{s}</option>)}
            </select>
            <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
              <input type="checkbox" checked={pastDueOnly} onChange={(e) => { setPastDueOnly(e.target.checked); setPage(1) }} className="size-3.5" />
              Past due only
            </label>
            <Button variant="outline" size="sm" onClick={exportCsv}>
              <Download className="size-3.5" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {(["id", "severity", "lob", "type", "daysPastDue", "dueDate", "owner"] as SortKey[]).map((col) => (
                  <th
                    key={col}
                    className="cursor-pointer pb-2 text-left text-xs font-medium uppercase tracking-wider text-slate-500 hover:text-slate-700 select-none"
                    onClick={() => toggleSort(col)}
                  >
                    {col === "id" ? "Issue ID" : col === "lob" ? "LOB" : col === "daysPastDue" ? "Days PD" : col === "dueDate" ? "Due Date" : col.charAt(0).toUpperCase() + col.slice(1)}
                    <SortIcon col={col} sortKey={sortKey} sortDir={sortDir} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map((issue) => (
                <tr key={issue.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="py-2.5 font-mono text-xs text-slate-700">{issue.id}</td>
                  <td className="py-2.5"><SeverityBadge severity={issue.severity} /></td>
                  <td className="py-2.5 text-xs text-slate-700">{issue.lob}</td>
                  <td className="py-2.5 text-xs text-slate-500">{issue.type}</td>
                  <td className="py-2.5">
                    {issue.daysPastDue > 0 ? (
                      <span className="text-xs font-semibold text-red-600">{issue.daysPastDue}d</span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-2.5 text-xs text-slate-600">{issue.dueDate}</td>
                  <td className="py-2.5 text-xs text-slate-600">{issue.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-slate-400">{filtered.length} issues · page {page} of {totalPages || 1}</span>
          <div className="flex gap-1">
            <Button variant="outline" size="xs" disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</Button>
            <Button variant="outline" size="xs" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
