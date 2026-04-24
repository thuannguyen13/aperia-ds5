"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Download, Eye, Check } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input/input"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import { TopNav } from "@/components/layout/TopNav"

type Status = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "PAST_DUE" | "DEFERRED" | "CANCELLED"

interface Activity {
  id: string; region: string; lob: string; programArea: string; name: string
  type: "MONITORING" | "TESTING"; frequency: string; owner: string
  targetDate: string; status: Status; evidenceUploaded: boolean
}

const activities: Activity[] = [
  { id: "EMEA-2025-061", region: "EMEA",          lob: "FIG",      programArea: "Financial Crimes", name: "Daily Sanctions Upload Review",              type: "MONITORING", frequency: "Monthly",   owner: "Richard Pooley",     targetDate: "Mar 31, 2026", status: "COMPLETED", evidenceUploaded: true  },
  { id: "FCC-2025-075",  region: "North America", lob: "FCC",      programArea: "Financial Crimes", name: "I-9 Monitoring",                             type: "MONITORING", frequency: "Quarterly", owner: "Jason Hollingsworth",targetDate: "Mar 31, 2026", status: "COMPLETED", evidenceUploaded: true  },
  { id: "MER-2025-032",  region: "Merchant",      lob: "Merchant", programArea: "Fairness",         name: "Clover Capital - CA Annual Reporting",       type: "TESTING",    frequency: "Annually",  owner: "Jo-Ann Teng",        targetDate: "Mar 31, 2026", status: "COMPLETED", evidenceUploaded: true  },
  { id: "PRIV-2025-018", region: "Global",        lob: "Privacy",  programArea: "Privacy",          name: "Privacy Incident QA",                        type: "TESTING",    frequency: "Quarterly", owner: "Kelly Thewes",       targetDate: "Mar 31, 2026", status: "COMPLETED", evidenceUploaded: false },
  { id: "FIG-2025-033",  region: "North America", lob: "FIG",      programArea: "Fairness",         name: "Monitoring of Regulatory Client Inquiries",  type: "MONITORING", frequency: "Monthly",   owner: "Ed Friedman",        targetDate: "Mar 31, 2026", status: "COMPLETED", evidenceUploaded: true  },
  { id: "FIG-2025-041",  region: "North America", lob: "FIG",      programArea: "Financial Crimes", name: "FIG Annual Product Family Review",           type: "TESTING",    frequency: "Annually",  owner: "Ed Friedman",        targetDate: "Feb 28, 2026", status: "PAST_DUE",  evidenceUploaded: false },
  { id: "FIG-2025-042",  region: "EMEA",          lob: "FIG",      programArea: "Financial Crimes", name: "EMEA Financial Crime Assessment",            type: "TESTING",    frequency: "Annually",  owner: "Richard Pooley",     targetDate: "Jan 31, 2026", status: "PAST_DUE",  evidenceUploaded: false },
  { id: "FIG-2025-043",  region: "EMEA",          lob: "FIG",      programArea: "Privacy",          name: "EMEA Data Protection Review",                type: "MONITORING", frequency: "Quarterly", owner: "Richard Pooley",     targetDate: "Dec 31, 2025", status: "PAST_DUE",  evidenceUploaded: false },
  { id: "FIG-2025-044",  region: "North America", lob: "FIG",      programArea: "Fairness",         name: "CRA Geographic Analysis",                   type: "MONITORING", frequency: "Annually",  owner: "Ed Friedman",        targetDate: "Dec 31, 2025", status: "PAST_DUE",  evidenceUploaded: false },
  { id: "FIG-2025-045",  region: "APAC",          lob: "FIG",      programArea: "Financial Crimes", name: "APAC Sanctions Screening Review",            type: "TESTING",    frequency: "Bi-Annually",owner: "Mei Lin",            targetDate: "Nov 30, 2025", status: "PAST_DUE",  evidenceUploaded: false },
  { id: "FIG-2025-046",  region: "LATAM",         lob: "FIG",      programArea: "Financial Crimes", name: "LATAM AML Process Review",                  type: "TESTING",    frequency: "Annually",  owner: "Carlos Rivera",      targetDate: "Nov 30, 2025", status: "PAST_DUE",  evidenceUploaded: false },
  { id: "FCC-2026-001",  region: "North America", lob: "FCC",      programArea: "Financial Crimes", name: "Sanctions Screening Calibration",            type: "MONITORING", frequency: "Monthly",   owner: "Jason Hollingsworth",targetDate: "Apr 30, 2026", status: "IN_PROGRESS",evidenceUploaded: false },
  { id: "EMEA-2026-003", region: "EMEA",          lob: "EMEA",     programArea: "Privacy",          name: "GDPR Data Mapping Review",                   type: "MONITORING", frequency: "Quarterly", owner: "Richard Pooley",     targetDate: "Jun 30, 2026", status: "IN_PROGRESS",evidenceUploaded: false },
  { id: "PRIV-2026-002", region: "Global",        lob: "Privacy",  programArea: "Privacy",          name: "Cookie Consent Audit",                       type: "TESTING",    frequency: "Annually",  owner: "Kelly Thewes",       targetDate: "Jun 30, 2026", status: "PLANNED",   evidenceUploaded: false },
  { id: "APAC-2026-001", region: "APAC",          lob: "APAC",     programArea: "Financial Crimes", name: "AML Quarterly Review",                       type: "MONITORING", frequency: "Quarterly", owner: "Mei Lin",            targetDate: "Jun 30, 2026", status: "PLANNED",   evidenceUploaded: false },
  { id: "LATAM-2026-001",region: "LATAM",         lob: "LATAM",    programArea: "Financial Crimes", name: "CDD Annual Review",                          type: "TESTING",    frequency: "Annually",  owner: "Carlos Rivera",      targetDate: "Sep 30, 2026", status: "PLANNED",   evidenceUploaded: false },
]

const PAGE_SIZE = 12

export default function ActivitiesPage() {
  const [search, setSearch]       = useState("")
  const [regionF, setRegionF]     = useState("All")
  const [lobF, setLobF]           = useState("All")
  const [areaF, setAreaF]         = useState("All")
  const [typeF, setTypeF]         = useState("All")
  const [freqF, setFreqF]         = useState("All")
  const [statusF, setStatusF]     = useState("All")
  const [page, setPage]           = useState(1)

  const regions     = ["All", ...Array.from(new Set(activities.map(a => a.region)))]
  const lobs        = ["All", ...Array.from(new Set(activities.map(a => a.lob)))]
  const areas       = ["All", ...Array.from(new Set(activities.map(a => a.programArea)))]
  const frequencies = ["All", ...Array.from(new Set(activities.map(a => a.frequency)))]

  const filtered = activities
    .filter(a => regionF === "All" || a.region === regionF)
    .filter(a => lobF    === "All" || a.lob    === lobF)
    .filter(a => areaF   === "All" || a.programArea === areaF)
    .filter(a => typeF   === "All" || a.type   === typeF)
    .filter(a => freqF   === "All" || a.frequency === freqF)
    .filter(a => statusF === "All" || a.status === statusF)
    .filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase()))

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function exportCsv() {
    const rows = [["Ref ID","Region","LOB","Program Area","Name","Type","Frequency","Owner","Target Date","Status","Evidence"],
      ...filtered.map(a => [a.id, a.region, a.lob, a.programArea, a.name, a.type, a.frequency, a.owner, a.targetDate, a.status, String(a.evidenceUploaded)])]
    const blob = new Blob([rows.map(r => r.join(",")).join("\n")], { type: "text/csv" })
    const anchor = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "activities.csv" })
    anchor.click()
  }

  return (
    <div className="flex flex-col gap-6">
      <TopNav title="All Activities" breadcrumb={["M&T", "Activities"]} />

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-white p-3">
        <Input size="sm" placeholder="Search activities…" leftIcon={<Search />} value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} className="w-52" />
        {[
          { label: "Region",      val: regionF,  set: setRegionF,  opts: regions     },
          { label: "LOB",         val: lobF,      set: setLobF,     opts: lobs        },
          { label: "Program Area",val: areaF,     set: setAreaF,    opts: areas       },
          { label: "Type",        val: typeF,     set: setTypeF,    opts: ["All","MONITORING","TESTING"] },
          { label: "Frequency",   val: freqF,     set: setFreqF,    opts: frequencies },
          { label: "Status",      val: statusF,   set: setStatusF,  opts: ["All","PLANNED","IN_PROGRESS","COMPLETED","PAST_DUE","DEFERRED"] },
        ].map(({ label, val, set, opts }) => (
          <select key={label} className="rounded-lg border border-border bg-white px-2 py-1.5 text-xs text-slate-700"
            value={val} onChange={e => { set(e.target.value); setPage(1) }}>
            <option value="All">{label}</option>
            {opts.filter(o => o !== "All").map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-slate-400">{filtered.length} results</span>
          <Button variant="outline" size="sm" onClick={exportCsv}><Download className="size-3.5" />Export</Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-white p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Ref ID","Region","LOB","Program Area","Activity Name","Type","Frequency","Owner","Target Date","Status","Evidence","Actions"].map(h => (
                  <th key={h} className="pb-2 pr-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map(a => (
                <tr key={a.id} className={`transition-colors hover:bg-slate-50 ${a.status === "PAST_DUE" ? "bg-red-50/40" : ""}`}>
                  <td className="py-2.5 pr-3 font-mono text-xs text-blue-600">
                    <Link href={`/monitoring-testing/${a.id}`} className="hover:underline">{a.id}</Link>
                  </td>
                  <td className="py-2.5 pr-3 text-xs text-slate-600">{a.region}</td>
                  <td className="py-2.5 pr-3 text-xs text-slate-600">{a.lob}</td>
                  <td className="py-2.5 pr-3 text-xs text-slate-500">{a.programArea}</td>
                  <td className="py-2.5 pr-3 max-w-[200px]"><p className="truncate text-xs font-medium text-slate-800">{a.name}</p></td>
                  <td className="py-2.5 pr-3"><span className={`text-xs font-medium ${a.type === "MONITORING" ? "text-blue-700" : "text-violet-700"}`}>{a.type}</span></td>
                  <td className="py-2.5 pr-3 text-xs text-slate-500">{a.frequency}</td>
                  <td className="py-2.5 pr-3 text-xs text-slate-600 whitespace-nowrap">{a.owner}</td>
                  <td className="py-2.5 pr-3 text-xs text-slate-600 whitespace-nowrap">{a.targetDate}</td>
                  <td className="py-2.5 pr-3"><StatusBadge status={a.status} /></td>
                  <td className="py-2.5 pr-3">
                    {a.evidenceUploaded
                      ? <span className="text-xs font-medium text-green-700">Uploaded</span>
                      : <span className="text-xs text-slate-400">Pending</span>}
                  </td>
                  <td className="py-2.5">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon-xs" asChild><Link href={`/monitoring-testing/${a.id}`}><Eye className="size-3" /></Link></Button>
                      {a.status !== "COMPLETED" && <Button variant="ghost" size="icon-xs" title="Mark complete"><Check className="size-3" /></Button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-10 text-center text-sm text-slate-400">No activities match the current filters.</div>}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-slate-400">Page {page} of {totalPages || 1} · {filtered.length} total</span>
          <div className="flex gap-1">
            <Button variant="outline" size="xs" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
            <Button variant="outline" size="xs" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
