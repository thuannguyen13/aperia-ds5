"use client"

import { useState } from "react"
import { Download, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input/input"
import { KpiCard } from "@/components/dashboard/KpiCard"
import { SeverityBadge } from "@/components/dashboard/SeverityBadge"
import { PageHeaderSetter } from "@/components/layout/PageHeaderSetter"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

type Severity = "LOW" | "MODERATE" | "HIGH" | "CRITICAL"
type IssueStatus = "OPEN" | "IN_REMEDIATION" | "PENDING_VALIDATION" | "CLOSED"
type IssueType = "DIRECT" | "INDIRECT" | "CAAS"

interface Issue {
  id: string
  name: string
  severity: Severity
  lob: string
  type: IssueType
  source: string
  status: IssueStatus
  opened: string
  dueDate: string
  daysPastDue: number
  owner: string
}

const issues: Issue[] = [
  { id: "ISS-45608", name: "Critical Operational Risk — Issuer Processing Gap", severity: "CRITICAL", lob: "Issuer Solutions", type: "DIRECT", source: "Internal Audit", status: "OPEN", opened: "Dec 10, 2024", dueDate: "Oct 22, 2025", daysPastDue: 183, owner: "John Smith" },
  { id: "ISS-45807", name: "AML Transaction Monitoring Deficiency", severity: "CRITICAL", lob: "Issuer Solutions", type: "DIRECT", source: "2nd Line", status: "IN_REMEDIATION", opened: "Feb 20, 2025", dueDate: "Feb 21, 2026", daysPastDue: 61, owner: "Jane Doe" },
  { id: "ISS-45957", name: "Policy Documentation Gap — Corporate", severity: "LOW", lob: "Corporate & Other", type: "INDIRECT", source: "Business ID", status: "OPEN", opened: "Mar 5, 2025", dueDate: "Mar 10, 2026", daysPastDue: 44, owner: "Mark Wilson" },
  { id: "ISS-45953", name: "Regulatory Compliance Risk — Policy Alignment", severity: "MODERATE", lob: "Corporate & Other", type: "DIRECT", source: "Business ID", status: "OPEN", opened: "Mar 1, 2025", dueDate: "Apr 22, 2026", daysPastDue: 1, owner: "Sara Brown" },
  { id: "ISS-46001", name: "Customer Data Handling Deficiency", severity: "HIGH", lob: "Financial Solutions", type: "DIRECT", source: "Internal Audit", status: "OPEN", opened: "Jan 15, 2026", dueDate: "May 15, 2026", daysPastDue: 0, owner: "Alice Park" },
  { id: "ISS-46002", name: "KYC Process Control Weakness", severity: "CRITICAL", lob: "Financial Solutions", type: "DIRECT", source: "2nd Line", status: "IN_REMEDIATION", opened: "Feb 1, 2026", dueDate: "Apr 30, 2026", daysPastDue: 0, owner: "Derek Lane" },
  { id: "ISS-46003", name: "GDPR Data Retention Non-Compliance", severity: "HIGH", lob: "EMEA", type: "DIRECT", source: "External", status: "OPEN", opened: "Jan 20, 2026", dueDate: "May 5, 2026", daysPastDue: 0, owner: "Boris Klein" },
  { id: "ISS-46004", name: "Sanctions Screening Gap — EMEA Ops", severity: "MODERATE", lob: "EMEA", type: "INDIRECT", source: "2nd Line", status: "OPEN", opened: "Feb 10, 2026", dueDate: "May 20, 2026", daysPastDue: 0, owner: "Elena Ford" },
  { id: "ISS-46005", name: "Vendor Due Diligence Shortfall", severity: "LOW", lob: "Merchant Solutions", type: "DIRECT", source: "Business ID", status: "PENDING_VALIDATION", opened: "Mar 1, 2026", dueDate: "Jun 10, 2026", daysPastDue: 0, owner: "Carla Nunes" },
  { id: "ISS-46006", name: "Fair Lending Assessment Gap", severity: "HIGH", lob: "Corporate & Other", type: "DIRECT", source: "Internal Audit", status: "OPEN", opened: "Feb 15, 2026", dueDate: "May 5, 2026", daysPastDue: 0, owner: "Elena Ford" },
  { id: "ISS-46007", name: "Privacy Notice Update Needed", severity: "MODERATE", lob: "EMEA", type: "INDIRECT", source: "2nd Line", status: "OPEN", opened: "Mar 5, 2026", dueDate: "May 30, 2026", daysPastDue: 0, owner: "Frank Moore" },
  { id: "ISS-46008", name: "AML Model Validation Overdue", severity: "HIGH", lob: "Financial Solutions", type: "DIRECT", source: "Internal Audit", status: "OPEN", opened: "Jan 10, 2026", dueDate: "Apr 28, 2026", daysPastDue: 0, owner: "Alice Park" },
  { id: "ISS-46009", name: "Consumer Complaints Handling Process", severity: "MODERATE", lob: "Merchant Solutions", type: "DIRECT", source: "2nd Line", status: "IN_REMEDIATION", opened: "Feb 20, 2026", dueDate: "Jun 15, 2026", daysPastDue: 0, owner: "Carla Nunes" },
  { id: "ISS-46010", name: "ICT Risk Control Gap — APAC", severity: "MODERATE", lob: "APAC", type: "INDIRECT", source: "2nd Line", status: "OPEN", opened: "Mar 10, 2026", dueDate: "Jun 25, 2026", daysPastDue: 0, owner: "Grace Xu" },
  { id: "ISS-46011", name: "CDD Periodic Review Backlog", severity: "LOW", lob: "LATAM", type: "DIRECT", source: "Business ID", status: "OPEN", opened: "Mar 15, 2026", dueDate: "Jul 1, 2026", daysPastDue: 0, owner: "Hugo Cruz" },
  { id: "ISS-46012", name: "Financial Reporting Discrepancy", severity: "CRITICAL", lob: "Financial Solutions", type: "CAAS", source: "External", status: "OPEN", opened: "Apr 1, 2026", dueDate: "Apr 30, 2026", daysPastDue: 0, owner: "Derek Lane" },
]

const lobChartData = [
  { lob: "Financial Solutions", low: 22, moderate: 10, high: 2, critical: 6 },
  { lob: "Corporate & Other",  low: 10, moderate: 19, high: 8,  critical: 1 },
  { lob: "EMEA",               low: 6,  moderate: 23, high: 8,  critical: 1 },
  { lob: "Merchant Solutions", low: 5,  moderate: 13, high: 2,  critical: 0 },
  { lob: "APAC",               low: 0,  moderate: 2,  high: 0,  critical: 0 },
  { lob: "LATAM",              low: 0,  moderate: 0,  high: 1,  critical: 0 },
]

const sourceData = [
  { name: "Business ID", value: 21, color: "#3b82f6" },
  { name: "2nd Line",    value: 50, color: "#f97316" },
  { name: "Internal Audit", value: 56, color: "#8b5cf6" },
  { name: "External",    value: 12, color: "#10b981" },
]

type SortKey = keyof Issue
type SortDir = "asc" | "desc" | null

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey | null; sortDir: SortDir }) {
  if (sortKey !== col) return <ChevronsUpDown className="ml-1 inline size-3 text-slate-300" />
  return sortDir === "asc"
    ? <ChevronUp className="ml-1 inline size-3 text-blue-600" />
    : <ChevronDown className="ml-1 inline size-3 text-blue-600" />
}

const statusStyle: Record<IssueStatus, string> = {
  OPEN: "bg-gray-100 text-gray-700",
  IN_REMEDIATION: "bg-blue-100 text-blue-800",
  PENDING_VALIDATION: "bg-amber-100 text-amber-800",
  CLOSED: "bg-green-100 text-green-800",
}

const PAGE_SIZE = 10

export default function IssuesPage() {
  const [search, setSearch]           = useState("")
  const [severityF, setSeverityF]     = useState("All")
  const [lobF, setLobF]               = useState("All")
  const [typeF, setTypeF]             = useState("All")
  const [statusF, setStatusF]         = useState("All")
  const [pastDueOnly, setPastDueOnly] = useState(false)
  const [sortKey, setSortKey]         = useState<SortKey | null>(null)
  const [sortDir, setSortDir]         = useState<SortDir>(null)
  const [page, setPage]               = useState(1)

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      const next = sortDir === "asc" ? "desc" : null
      setSortDir(next)
      if (!next) setSortKey(null)
    } else {
      setSortKey(key); setSortDir("asc")
    }
    setPage(1)
  }

  const lobs = ["All", ...Array.from(new Set(issues.map(i => i.lob)))]

  const filtered = issues
    .filter(i => severityF === "All" || i.severity === severityF)
    .filter(i => lobF === "All" || i.lob === lobF)
    .filter(i => typeF === "All" || i.type === typeF)
    .filter(i => statusF === "All" || i.status === statusF)
    .filter(i => !pastDueOnly || i.daysPastDue > 0)
    .filter(i => !search || i.id.toLowerCase().includes(search.toLowerCase()) || i.name.toLowerCase().includes(search.toLowerCase()) || i.owner.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (!sortKey || !sortDir) return 0
      return String(a[sortKey]).localeCompare(String(b[sortKey])) * (sortDir === "asc" ? 1 : -1)
    })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function exportCsv() {
    const rows = [["ID","Name","Severity","LOB","Type","Source","Status","Opened","Due Date","Days PD","Owner"],
      ...filtered.map(i => [i.id, i.name, i.severity, i.lob, i.type, i.source, i.status, i.opened, i.dueDate, String(i.daysPastDue), i.owner])]
    const blob = new Blob([rows.map(r => r.join(",")).join("\n")], { type: "text/csv" })
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "issues.csv" })
    a.click()
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeaderSetter title="Issues" breadcrumb={["Programs", "Issues"]} />

      {/* KPI row */}
      <div className="grid grid-cols-5 gap-4">
        <KpiCard label="Open Issues"    value={139} subtitle="+2 vs last mo." trend="up"   trendLabel="+1.5%" accentColor="orange" />
        <KpiCard label="Critical + High" value={29} subtitle="20.9% of open"  trend="down" trendLabel="-41%"  accentColor="red"    />
        <KpiCard label="Moderate"        value={67} subtitle="48.2% of open"  accentColor="slate"  />
        <KpiCard label="Past Due"         value={4}  subtitle="2.9% of open"  accentColor="red"    />
        <KpiCard label="Avg Days Past Due" value="72.3" subtitle="↓ from 243 last yr" trend="down" trendLabel="-70%" accentColor="green" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 rounded-xl border border-border bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Issues by LOB and Severity</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={lobChartData} layout="vertical" margin={{ top: 4, right: 24, left: 16, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis dataKey="lob" type="category" tick={{ fontSize: 11, fill: "#64748b" }} width={130} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="low"      stackId="a" fill="#94a3b8" name="Low"      />
              <Bar dataKey="moderate" stackId="a" fill="#fbbf24" name="Moderate" />
              <Bar dataKey="high"     stackId="a" fill="#f97316" name="High"     />
              <Bar dataKey="critical" stackId="a" fill="#dc2626" name="Critical" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="col-span-2 rounded-xl border border-border bg-white p-4">
          <h2 className="mb-2 text-sm font-semibold text-slate-800">Issues by Source</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={sourceData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} dataKey="value">
                {sourceData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-1 flex flex-wrap justify-center gap-3">
            {sourceData.map(d => (
              <div key={d.name} className="flex items-center gap-1">
                <div className="size-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-xs text-slate-600">{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Issue table */}
      <div className="rounded-xl border border-border bg-white p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h2 className="mr-2 text-sm font-semibold text-slate-800">All Issues</h2>
          <Input size="sm" placeholder="Search…" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} className="w-44" />
          {[
            { val: severityF, set: setSeverityF, opts: ["All","CRITICAL","HIGH","MODERATE","LOW"], label: "Severity" },
            { val: lobF,      set: setLobF,      opts: lobs,                                       label: "LOB"      },
            { val: typeF,     set: setTypeF,     opts: ["All","DIRECT","INDIRECT","CAAS"],          label: "Type"     },
            { val: statusF,   set: setStatusF,   opts: ["All","OPEN","IN_REMEDIATION","PENDING_VALIDATION","CLOSED"], label: "Status" },
          ].map(({ val, set, opts }) => (
            <select key={opts[0]} className="rounded-lg border border-border bg-white px-2 py-1.5 text-xs text-slate-700"
              value={val} onChange={e => { set(e.target.value); setPage(1) }}>
              {opts.map(o => <option key={o}>{o}</option>)}
            </select>
          ))}
          <label className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-600">
            <input type="checkbox" checked={pastDueOnly} onChange={e => { setPastDueOnly(e.target.checked); setPage(1) }} className="size-3.5" />
            Past due only
          </label>
          <div className="ml-auto flex gap-2">
            <span className="text-xs text-slate-400">{filtered.length} results</span>
            <Button variant="outline" size="sm" onClick={exportCsv}><Download className="size-3.5" />Export CSV</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {(["id","name","severity","lob","type","source","opened","dueDate","daysPastDue","owner"] as SortKey[]).map(col => (
                  <th key={col} onClick={() => toggleSort(col)}
                    className="cursor-pointer select-none pb-2 pr-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500 hover:text-slate-700 whitespace-nowrap">
                    {col === "id" ? "Issue ID" : col === "dueDate" ? "Due Date" : col === "daysPastDue" ? "Days PD" : col.charAt(0).toUpperCase() + col.slice(1)}
                    <SortIcon col={col} sortKey={sortKey} sortDir={sortDir} />
                  </th>
                ))}
                <th className="pb-2 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map(issue => (
                <tr key={issue.id} className={`cursor-pointer transition-colors hover:bg-slate-50 ${issue.daysPastDue >= 91 ? "bg-red-50/40" : issue.daysPastDue > 0 ? "bg-amber-50/30" : ""}`}>
                  <td className="py-2.5 pr-4 font-mono text-xs text-slate-700">{issue.id}</td>
                  <td className="py-2.5 pr-4 max-w-[200px]"><p className="truncate text-xs font-medium text-slate-800">{issue.name}</p></td>
                  <td className="py-2.5 pr-4"><SeverityBadge severity={issue.severity} /></td>
                  <td className="py-2.5 pr-4 text-xs text-slate-600 whitespace-nowrap">{issue.lob}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500">{issue.type}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500">{issue.source}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500 whitespace-nowrap">{issue.opened}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-600 whitespace-nowrap">{issue.dueDate}</td>
                  <td className="py-2.5 pr-4">
                    {issue.daysPastDue > 0
                      ? <span className="text-xs font-semibold text-red-600">{issue.daysPastDue}d</span>
                      : <span className="text-xs text-slate-400">—</span>}
                  </td>
                  <td className="py-2.5 pr-4 text-xs text-slate-600">{issue.owner}</td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-1">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle[issue.status]}`}>{issue.status.replace("_"," ")}</span>
                      <Button variant="ghost" size="xs">View</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-10 text-center text-sm text-slate-400">No issues match the current filters.</div>}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-slate-400">Page {page} of {totalPages || 1}</span>
          <div className="flex gap-1">
            <Button variant="outline" size="xs" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
            <Button variant="outline" size="xs" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
