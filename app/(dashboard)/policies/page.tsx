"use client"

import { useState } from "react"
import { Plus, FileText, Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { PageHeaderSetter } from "@/components/layout/PageHeaderSetter"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group/input-group"
import { Badge } from "@/components/ui/badge/badge"

type PolicyStatus = "DRAFT" | "IN_REVIEW" | "APPROVED" | "ACTIVE" | "ARCHIVED"

interface Policy {
  id: string; title: string; owner: string; lob: string; region: string
  status: PolicyStatus; effectiveDate: string; nextReviewDate: string; version: string
}

const policies: Policy[] = [
  { id: "POL-001", title: "AML / BSA Compliance Policy",              owner: "Lena Capalbo",        lob: "FCC",      region: "Global",        status: "ACTIVE",     effectiveDate: "Jan 1, 2025",  nextReviewDate: "Jan 1, 2026",  version: "v4.2" },
  { id: "POL-002", title: "Sanctions Compliance Policy",              owner: "Jason Hollingsworth", lob: "FCC",      region: "Global",        status: "ACTIVE",     effectiveDate: "Mar 1, 2025",  nextReviewDate: "Mar 1, 2026",  version: "v3.1" },
  { id: "POL-003", title: "Privacy and Data Protection Policy",       owner: "Kelly Thewes",        lob: "Privacy",  region: "Global",        status: "IN_REVIEW",  effectiveDate: "Jun 1, 2024",  nextReviewDate: "Jun 1, 2026",  version: "v2.4" },
  { id: "POL-004", title: "Fair Lending Policy",                      owner: "Ed Friedman",         lob: "FIG",      region: "North America", status: "ACTIVE",     effectiveDate: "Apr 1, 2025",  nextReviewDate: "Apr 1, 2027",  version: "v1.8" },
  { id: "POL-005", title: "GDPR Compliance Policy",                   owner: "Richard Pooley",      lob: "EMEA",     region: "EMEA",          status: "ACTIVE",     effectiveDate: "May 25, 2024", nextReviewDate: "May 25, 2026", version: "v3.0" },
  { id: "POL-006", title: "Vendor Due Diligence Policy",              owner: "Kelly Thewes",        lob: "Corporate",region: "Global",        status: "ACTIVE",     effectiveDate: "Jul 1, 2024",  nextReviewDate: "Jul 1, 2026",  version: "v2.1" },
  { id: "POL-007", title: "Consumer Complaints Handling Policy",      owner: "Ed Friedman",         lob: "Merchant", region: "North America", status: "IN_REVIEW",  effectiveDate: "Sep 1, 2024",  nextReviewDate: "Sep 1, 2025",  version: "v1.3" },
  { id: "POL-008", title: "Business Continuity Planning Policy",      owner: "Thomas Bennington",   lob: "Corporate",region: "Global",        status: "DRAFT",      effectiveDate: "—",            nextReviewDate: "Jun 1, 2026",  version: "v0.3" },
  { id: "POL-009", title: "Cybersecurity and ICT Risk Policy",        owner: "Thomas Bennington",   lob: "Corporate",region: "Global",        status: "APPROVED",   effectiveDate: "Feb 1, 2026",  nextReviewDate: "Feb 1, 2027",  version: "v1.0" },
  { id: "POL-010", title: "LATAM Regulatory Compliance Framework",    owner: "Lena Capalbo",        lob: "LATAM",    region: "LATAM",         status: "ACTIVE",     effectiveDate: "Oct 1, 2024",  nextReviewDate: "Oct 1, 2026",  version: "v2.0" },
  { id: "POL-011", title: "CDD / KYC Policy",                        owner: "Lena Capalbo",        lob: "FCC",      region: "Global",        status: "ACTIVE",     effectiveDate: "Jan 1, 2025",  nextReviewDate: "Jan 1, 2027",  version: "v3.3" },
  { id: "POL-012", title: "Financial Crimes Escalation Policy",       owner: "Jason Hollingsworth", lob: "FCC",      region: "Global",        status: "ARCHIVED",   effectiveDate: "Jan 1, 2022",  nextReviewDate: "—",            version: "v2.0" },
]

const statusClass: Record<PolicyStatus, string> = {
  DRAFT:     "border-transparent bg-gray-100 text-gray-700 hover:bg-gray-100",
  IN_REVIEW: "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100",
  APPROVED:  "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100",
  ACTIVE:    "border-transparent bg-green-100 text-green-800 hover:bg-green-100",
  ARCHIVED:  "border-transparent bg-slate-100 text-slate-500 hover:bg-slate-100",
}

const dueForReview = policies.filter(p => (p.status === "ACTIVE" && p.nextReviewDate.includes("2026")) || p.status === "IN_REVIEW")

export default function PoliciesPage() {
  const [search, setSearch]   = useState("")
  const [statusF, setStatusF] = useState("All")
  const [regionF, setRegionF] = useState("All")

  const regions = ["All", ...Array.from(new Set(policies.map(p => p.region)))]

  const filtered = policies
    .filter(p => statusF === "All" || p.status === statusF)
    .filter(p => regionF === "All" || p.region === regionF)
    .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.owner.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex flex-col gap-6">
      <PageHeaderSetter title="Policies" breadcrumb={["Tools", "Policies"]} />

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Policies",  value: policies.length,                                       color: "border-l-blue-600"  },
          { label: "Active",          value: policies.filter(p => p.status === "ACTIVE").length,    color: "border-l-green-500" },
          { label: "Due for Review",  value: dueForReview.length,                                   color: "border-l-amber-500" },
          { label: "Draft / In Review", value: policies.filter(p => p.status === "DRAFT" || p.status === "IN_REVIEW").length, color: "border-l-slate-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className={`flex flex-col gap-1 rounded-lg border border-border bg-white p-4 border-l-4 shadow-sm ${color}`}>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</span>
            <span className="text-3xl font-bold text-slate-900">{value}</span>
          </div>
        ))}
      </div>

      {/* Due for review alert */}
      {dueForReview.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">{dueForReview.length} policies due for review in 2026</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {dueForReview.slice(0,5).map(p => (
              <span key={p.id} className="rounded-full bg-white border border-amber-200 px-2.5 py-1 text-xs text-slate-700">{p.title}</span>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-border bg-white p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <InputGroup className="w-52">
            <InputGroupAddon><Search /></InputGroupAddon>
            <InputGroupInput placeholder="Search policies…" value={search} onChange={e => setSearch(e.target.value)} />
          </InputGroup>
          <Select value={statusF} onValueChange={setStatusF}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["All","ACTIVE","APPROVED","IN_REVIEW","DRAFT","ARCHIVED"].map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={regionF} onValueChange={setRegionF}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm"><Download className="size-3.5" />Export</Button>
            <Button variant="default" size="sm"><Plus className="size-3.5" />New Policy</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["ID","Title","Owner","LOB","Region","Status","Effective Date","Next Review","Version","Actions"].map(h => (
                  <th key={h} className="pb-2 pr-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(p => (
                <tr key={p.id} className={`hover:bg-slate-50 transition-colors ${p.status === "IN_REVIEW" ? "bg-amber-50/30" : ""}`}>
                  <td className="py-2.5 pr-4 font-mono text-xs text-slate-700">{p.id}</td>
                  <td className="py-2.5 pr-4 max-w-[220px]">
                    <div className="flex items-center gap-1.5">
                      <FileText className="size-3.5 shrink-0 text-slate-400" />
                      <p className="truncate text-xs font-medium text-slate-800">{p.title}</p>
                    </div>
                  </td>
                  <td className="py-2.5 pr-4 text-xs text-slate-600 whitespace-nowrap">{p.owner}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500">{p.lob}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500">{p.region}</td>
                  <td className="py-2.5 pr-4">
                    <Badge variant="outline" className={statusClass[p.status]}>{p.status.replace("_"," ")}</Badge>
                  </td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500 whitespace-nowrap">{p.effectiveDate}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500 whitespace-nowrap">
                    {p.nextReviewDate.includes("2026") && p.status !== "ARCHIVED"
                      ? <span className="font-medium text-amber-600">{p.nextReviewDate}</span>
                      : p.nextReviewDate}
                  </td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500">{p.version}</td>
                  <td className="py-2.5">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="xs">View</Button>
                      {p.status !== "ARCHIVED" && <Button variant="ghost" size="xs">Edit</Button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-10 text-center text-sm text-slate-400">No policies match the filters.</div>}
        </div>
      </div>
    </div>
  )
}
