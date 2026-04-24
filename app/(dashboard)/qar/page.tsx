"use client"

import { useState } from "react"
import { Plus, Search, ScanSearch } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input/input"
import { SeverityBadge } from "@/components/dashboard/SeverityBadge"
import { TopNav } from "@/components/layout/TopNav"

type QarStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "FINDINGS_ISSUED" | "CLOSED"
type QarResult = "SATISFACTORY" | "NEEDS_IMPROVEMENT" | "UNSATISFACTORY" | "PENDING"

interface QarReview {
  id: string; title: string; scope: string; lob: string; region: string
  reviewer: string; status: QarStatus; result: QarResult
  scheduledDate: string; completedDate: string; findingsCount: number
}

const reviews: QarReview[] = [
  { id: "QAR-001", title: "FCC M&T Activities Quality Review — Q4 2025",           scope: "M&T Activities",   lob: "FCC",      region: "Global",        reviewer: "Thomas Bennington",   status: "COMPLETED",      result: "SATISFACTORY",      scheduledDate: "Jan 10, 2026", completedDate: "Jan 20, 2026", findingsCount: 2  },
  { id: "QAR-002", title: "EMEA Sanctions Screening Process Review",               scope: "Monitoring",       lob: "EMEA",     region: "EMEA",          reviewer: "Lena Capalbo",        status: "FINDINGS_ISSUED", result: "NEEDS_IMPROVEMENT", scheduledDate: "Feb 1, 2026",  completedDate: "Feb 15, 2026", findingsCount: 5  },
  { id: "QAR-003", title: "Privacy Program QAR — Global 2025",                    scope: "Privacy Controls", lob: "Privacy",  region: "Global",        reviewer: "Thomas Bennington",   status: "CLOSED",         result: "SATISFACTORY",      scheduledDate: "Mar 1, 2026",  completedDate: "Mar 10, 2026", findingsCount: 1  },
  { id: "QAR-004", title: "Merchant Compliance Controls Review — Q1 2026",        scope: "Controls Testing", lob: "Merchant", region: "North America", reviewer: "Ed Friedman",         status: "IN_PROGRESS",    result: "PENDING",           scheduledDate: "Apr 5, 2026",  completedDate: "—",            findingsCount: 0  },
  { id: "QAR-005", title: "APAC AML Process Quality Assessment",                  scope: "AML Processes",    lob: "APAC",     region: "APAC",          reviewer: "Lena Capalbo",        status: "SCHEDULED",      result: "PENDING",           scheduledDate: "May 1, 2026",  completedDate: "—",            findingsCount: 0  },
  { id: "QAR-006", title: "Financial Solutions Compliance Controls — H1 2026",    scope: "Controls Testing", lob: "FIG",      region: "North America", reviewer: "Thomas Bennington",   status: "SCHEDULED",      result: "PENDING",           scheduledDate: "Jun 1, 2026",  completedDate: "—",            findingsCount: 0  },
  { id: "QAR-007", title: "LATAM Regulatory Compliance QAR",                      scope: "Regulatory",       lob: "LATAM",    region: "LATAM",         reviewer: "Lena Capalbo",        status: "COMPLETED",      result: "SATISFACTORY",      scheduledDate: "Dec 1, 2025",  completedDate: "Dec 12, 2025", findingsCount: 3  },
  { id: "QAR-008", title: "Issue Remediation Quality Check — Q4 2025",            scope: "Issue Management", lob: "Corporate",region: "Global",        reviewer: "Thomas Bennington",   status: "FINDINGS_ISSUED", result: "UNSATISFACTORY",    scheduledDate: "Nov 10, 2025", completedDate: "Nov 22, 2025", findingsCount: 8  },
]

const statusStyle: Record<QarStatus, string> = {
  SCHEDULED:       "bg-gray-100 text-gray-700",
  IN_PROGRESS:     "bg-blue-100 text-blue-800",
  COMPLETED:       "bg-green-100 text-green-800",
  FINDINGS_ISSUED: "bg-amber-100 text-amber-800",
  CLOSED:          "bg-slate-100 text-slate-600",
}

const resultStyle: Record<QarResult, string> = {
  SATISFACTORY:     "text-green-700 font-medium",
  NEEDS_IMPROVEMENT:"text-amber-700 font-medium",
  UNSATISFACTORY:   "text-red-700 font-semibold",
  PENDING:          "text-slate-400",
}

export default function QARPage() {
  const [search, setSearch]   = useState("")
  const [statusF, setStatusF] = useState("All")
  const [lobF, setLobF]       = useState("All")

  const lobs = ["All", ...Array.from(new Set(reviews.map(r => r.lob)))]
  const filtered = reviews
    .filter(r => statusF === "All" || r.status === statusF)
    .filter(r => lobF    === "All" || r.lob    === lobF)
    .filter(r => !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.reviewer.toLowerCase().includes(search.toLowerCase()))

  const totalFindings = reviews.reduce((s, r) => s + r.findingsCount, 0)
  const openFindings  = reviews.filter(r => r.status === "FINDINGS_ISSUED").reduce((s, r) => s + r.findingsCount, 0)

  return (
    <div className="flex flex-col gap-6">
      <TopNav title="Quality Assurance Reviews" breadcrumb={["Tools", "QAR"]} />

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total QARs",       value: reviews.length,                                              color: "border-l-blue-600"  },
          { label: "In Progress",      value: reviews.filter(r => r.status === "IN_PROGRESS").length,     color: "border-l-blue-400"  },
          { label: "Open Findings",    value: openFindings,                                                color: "border-l-amber-500" },
          { label: "Total Findings",   value: totalFindings,                                               color: "border-l-slate-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className={`flex flex-col gap-1 rounded-lg border border-border bg-white p-4 border-l-4 shadow-sm ${color}`}>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</span>
            <span className="text-3xl font-bold text-slate-900">{value}</span>
          </div>
        ))}
      </div>

      {/* Open findings alert */}
      {openFindings > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">{openFindings} open findings require remediation action</p>
          <p className="mt-1 text-xs text-slate-600">
            {reviews.filter(r => r.status === "FINDINGS_ISSUED").map(r => r.id).join(", ")} — findings issued, pending officer response.
          </p>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-border bg-white p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Input size="sm" placeholder="Search reviews…" leftIcon={<Search />} value={search} onChange={e => setSearch(e.target.value)} className="w-52" />
          <select className="rounded-lg border border-border bg-white px-2 py-1.5 text-xs text-slate-700"
            value={statusF} onChange={e => setStatusF(e.target.value)}>
            {["All","SCHEDULED","IN_PROGRESS","COMPLETED","FINDINGS_ISSUED","CLOSED"].map(s => <option key={s}>{s.replace("_"," ")}</option>)}
          </select>
          <select className="rounded-lg border border-border bg-white px-2 py-1.5 text-xs text-slate-700"
            value={lobF} onChange={e => setLobF(e.target.value)}>
            {lobs.map(l => <option key={l}>{l}</option>)}
          </select>
          <div className="ml-auto">
            <Button variant="default" size="sm"><Plus className="size-3.5" />Schedule QAR</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["ID","Title","Scope","LOB","Region","Reviewer","Status","Result","Scheduled","Completed","Findings","Actions"].map(h => (
                  <th key={h} className="pb-2 pr-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(r => (
                <tr key={r.id} className={`hover:bg-slate-50 transition-colors ${r.status === "FINDINGS_ISSUED" ? "bg-amber-50/30" : ""}`}>
                  <td className="py-2.5 pr-3 font-mono text-xs text-slate-700">{r.id}</td>
                  <td className="py-2.5 pr-3 max-w-[200px]">
                    <div className="flex items-center gap-1.5">
                      <ScanSearch className="size-3.5 shrink-0 text-slate-400" />
                      <p className="truncate text-xs font-medium text-slate-800">{r.title}</p>
                    </div>
                  </td>
                  <td className="py-2.5 pr-3 text-xs text-slate-500">{r.scope}</td>
                  <td className="py-2.5 pr-3 text-xs text-slate-600">{r.lob}</td>
                  <td className="py-2.5 pr-3 text-xs text-slate-500">{r.region}</td>
                  <td className="py-2.5 pr-3 text-xs text-slate-600 whitespace-nowrap">{r.reviewer}</td>
                  <td className="py-2.5 pr-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle[r.status]}`}>{r.status.replace("_"," ")}</span>
                  </td>
                  <td className="py-2.5 pr-3 text-xs">
                    <span className={resultStyle[r.result]}>{r.result.replace("_"," ")}</span>
                  </td>
                  <td className="py-2.5 pr-3 text-xs text-slate-500 whitespace-nowrap">{r.scheduledDate}</td>
                  <td className="py-2.5 pr-3 text-xs text-slate-500 whitespace-nowrap">{r.completedDate}</td>
                  <td className="py-2.5 pr-3">
                    {r.findingsCount > 0
                      ? <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">{r.findingsCount}</span>
                      : <span className="text-xs text-slate-400">—</span>}
                  </td>
                  <td className="py-2.5">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="xs">View</Button>
                      {r.status === "IN_PROGRESS" && <Button variant="outline" size="xs">Complete</Button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-10 text-center text-sm text-slate-400">No reviews match the filters.</div>}
        </div>
      </div>
    </div>
  )
}
