"use client"

import { useState } from "react"
import { RefreshCw, CheckCircle2, AlertTriangle, Clock, ExternalLink, Activity } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { Badge } from "@/components/ui/badge/badge"
import { Card, CardContent } from "@/components/ui/card/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select"
import { cn } from "@/lib/utils"

type IntegrationStatus = "CONNECTED" | "WARNING" | "ERROR" | "SYNCING"
type DataPointStatus = "CONFORMING" | "NON_CONFORMING" | "DUE_SOON" | "OVERDUE" | "PENDING"

const integrations = [
  { id: "INT-001", name: "Archer",          desc: "Governance, risk & compliance platform. Source for all ERIS issues.", status: "CONNECTED" as IntegrationStatus, lastSync: "Apr 23, 2026 06:00", nextSync: "Apr 24, 2026 06:00", records: 12341, errors: 0, color: "bg-red-100 text-red-700",     letter: "A" },
  { id: "INT-002", name: "Thomson Reuters", desc: "Regulatory intelligence and alerts feed (RRM source).",              status: "WARNING"   as IntegrationStatus, lastSync: "Apr 22, 2026 14:30", nextSync: "Apr 23, 2026 14:30", records: 847,   errors: 3, color: "bg-blue-100 text-blue-700",   letter: "T" },
  { id: "INT-003", name: "SharePoint",      desc: "Legacy M&T activity spreadsheet migration source.",                  status: "CONNECTED" as IntegrationStatus, lastSync: "Apr 23, 2026 08:00", nextSync: "Apr 24, 2026 08:00", records: 711,   errors: 0, color: "bg-green-100 text-green-700", letter: "S" },
  { id: "INT-004", name: "Resend (Email)",  desc: "Transactional email for officer digests and reminders.",             status: "CONNECTED" as IntegrationStatus, lastSync: "Apr 23, 2026 08:00", nextSync: "Apr 24, 2026 08:00", records: 1240,  errors: 0, color: "bg-purple-100 text-purple-700",letter: "E" },
]

const dataPoints = [
  { id: "DCP-001", name: "AML Transaction Reports — Q1 2026",          area: "Financial Crimes", program: "FCC",   source: "Archer",          owner: "Jason Hollingsworth", dueDate: "Mar 31, 2026", status: "CONFORMING"     as DataPointStatus },
  { id: "DCP-002", name: "KYC Periodic Review Evidence",               area: "Financial Crimes", program: "FCC",   source: "SharePoint",      owner: "Richard Pooley",      dueDate: "Apr 15, 2026", status: "NON_CONFORMING" as DataPointStatus },
  { id: "DCP-003", name: "GDPR Data Mapping Update",                   area: "Privacy",          program: "PRIV",  source: "SharePoint",      owner: "Kelly Thewes",        dueDate: "Apr 28, 2026", status: "DUE_SOON"       as DataPointStatus },
  { id: "DCP-004", name: "Sanctions Screening Calibration Report",     area: "Financial Crimes", program: "FCC",   source: "Archer",          owner: "Jason Hollingsworth", dueDate: "Apr 20, 2026", status: "OVERDUE"        as DataPointStatus },
  { id: "DCP-005", name: "Operational Risk Register — Q1",             area: "Operational Risk", program: "ORM",   source: "Archer",          owner: "John Smith",          dueDate: "May 15, 2026", status: "PENDING"        as DataPointStatus },
  { id: "DCP-006", name: "EMEA Regulatory Reporting Package",          area: "Regulatory",       program: "RRM",   source: "Thomson Reuters", owner: "Richard Pooley",      dueDate: "Apr 30, 2026", status: "CONFORMING"     as DataPointStatus },
  { id: "DCP-007", name: "Consumer Complaints Monthly Summary",        area: "Compliance",       program: "FIG",   source: "SharePoint",      owner: "Ed Friedman",         dueDate: "Apr 10, 2026", status: "OVERDUE"        as DataPointStatus },
  { id: "DCP-008", name: "Privacy Incident Register Update",           area: "Privacy",          program: "PRIV",  source: "Archer",          owner: "Kelly Thewes",        dueDate: "Apr 27, 2026", status: "DUE_SOON"       as DataPointStatus },
  { id: "DCP-009", name: "Fair Lending Assessment Data Package",       area: "Compliance",       program: "FIG",   source: "Manual",          owner: "Ed Friedman",         dueDate: "May 5, 2026",  status: "PENDING"        as DataPointStatus },
  { id: "DCP-010", name: "APAC Sanctions Screening Results — Mar",     area: "Financial Crimes", program: "FCC",   source: "Archer",          owner: "Mei Lin",             dueDate: "Apr 5, 2026",  status: "CONFORMING"     as DataPointStatus },
]

const auditLog = [
  { date: "Apr 23, 2026 06:02", integration: "Archer",          action: "SYNC", result: "SUCCESS", records: 12341, detail: "Full delta sync. 23 new issues ingested."         },
  { date: "Apr 22, 2026 14:31", integration: "Thomson Reuters", action: "PULL", result: "WARNING", records: 847,   detail: "3 alerts failed schema validation — skipped."       },
  { date: "Apr 22, 2026 08:00", integration: "SharePoint",      action: "SYNC", result: "SUCCESS", records: 711,   detail: "Activity list sync complete. No changes detected." },
  { date: "Apr 21, 2026 06:02", integration: "Archer",          action: "SYNC", result: "SUCCESS", records: 12318, detail: "Delta sync. 5 issues updated."                     },
  { date: "Apr 21, 2026 08:00", integration: "Resend",          action: "SEND", result: "SUCCESS", records: 47,    detail: "Weekly digest emails delivered to 47 recipients."  },
]

const statusCfg: Record<IntegrationStatus, { badgeClass: string; icon: React.ElementType }> = {
  CONNECTED: { badgeClass: "border-transparent bg-green-100 text-green-800 hover:bg-green-100", icon: CheckCircle2  },
  WARNING:   { badgeClass: "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100",  icon: AlertTriangle },
  ERROR:     { badgeClass: "border-transparent bg-red-100 text-red-800 hover:bg-red-100",         icon: AlertTriangle },
  SYNCING:   { badgeClass: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100",      icon: RefreshCw     },
}

const dpStatusCfg: Record<DataPointStatus, { badgeClass: string; rowClass: string; label: string }> = {
  CONFORMING:     { badgeClass: "border-transparent bg-green-100 text-green-800 hover:bg-green-100",   rowClass: "",              label: "Conforming"     },
  NON_CONFORMING: { badgeClass: "border-transparent bg-red-100 text-red-800 hover:bg-red-100",         rowClass: "bg-red-50/50",  label: "Non-Conforming" },
  DUE_SOON:       { badgeClass: "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100",   rowClass: "bg-amber-50/40",label: "Due Soon"       },
  OVERDUE:        { badgeClass: "border-transparent bg-red-100 text-red-800 hover:bg-red-100",         rowClass: "bg-red-50/50",  label: "Overdue"        },
  PENDING:        { badgeClass: "border-transparent bg-slate-100 text-slate-600 hover:bg-slate-100",   rowClass: "",              label: "Pending"        },
}

const allAreas   = ["All", ...Array.from(new Set(dataPoints.map(d => d.area)))]
const allSources = ["All", ...Array.from(new Set(dataPoints.map(d => d.source)))]

export default function AdminIntegrationsPage() {
  const [syncing, setSyncing]       = useState<string | null>(null)
  const [areaFilter, setAreaFilter]     = useState("All")
  const [sourceFilter, setSourceFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")

  function handleSync(id: string) { setSyncing(id); setTimeout(() => setSyncing(null), 2000) }

  const filteredPoints = dataPoints.filter(d =>
    (areaFilter === "All"   || d.area   === areaFilter) &&
    (sourceFilter === "All" || d.source === sourceFilter) &&
    (statusFilter === "All" || d.status === statusFilter)
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Integration cards */}
      <div className="grid grid-cols-2 gap-4">
        {integrations.map(intg => {
          const isSyncing = syncing === intg.id
          const cfg = statusCfg[isSyncing ? "SYNCING" : intg.status]
          const StatusIcon = cfg.icon
          return (
            <Card key={intg.id} className={intg.status === "WARNING" ? "ring-amber-200" : ""}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex size-10 items-center justify-center rounded-lg font-bold ${intg.color}`}>{intg.letter}</div>
                    <div>
                      <p className="font-semibold text-slate-900">{intg.name}</p>
                      <p className="text-xs text-slate-500">{intg.desc}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn("shrink-0", cfg.badgeClass)}>
                    <StatusIcon className={`size-3 ${isSyncing ? "animate-spin" : ""}`} />
                    {isSyncing ? "SYNCING" : intg.status}
                  </Badge>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <div className="rounded bg-slate-50 p-2"><p className="text-slate-400">Last Sync</p><p className="font-medium text-slate-700 truncate">{intg.lastSync}</p></div>
                  <div className="rounded bg-slate-50 p-2"><p className="text-slate-400">Records</p><p className="font-medium text-slate-700">{intg.records.toLocaleString()}</p></div>
                  <div className={`rounded p-2 ${intg.errors > 0 ? "bg-amber-50" : "bg-slate-50"}`}>
                    <p className="text-slate-400">Errors</p>
                    <p className={`font-medium ${intg.errors > 0 ? "text-amber-700" : "text-green-700"}`}>{intg.errors}</p>
                  </div>
                </div>
                {intg.errors > 0 && (
                  <p className="mt-2 rounded border border-amber-100 bg-amber-50 px-2 py-1.5 text-xs text-amber-800">
                    <AlertTriangle className="mr-1 inline size-3" />{intg.errors} records need manual review
                  </p>
                )}
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-slate-400"><Clock className="size-3" />Next: {intg.nextSync}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="xs"><ExternalLink className="size-3" />Docs</Button>
                    <Button variant="outline" size="sm" onClick={() => handleSync(intg.id)} disabled={isSyncing}>
                      <RefreshCw className={`size-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                      {isSyncing ? "Syncing…" : "Sync Now"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* System health */}
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <Activity className="size-4 shrink-0 text-blue-600" />
          <span className="text-xs font-semibold text-slate-700">System Health</span>
          {[
            { label: "API Uptime",  value: "99.98%", ok: true  },
            { label: "Avg Sync",   value: "1.4s",   ok: true  },
            { label: "Queue",      value: "0 jobs", ok: true  },
            { label: "Failed Jobs",value: "3",      ok: false },
          ].map(({ label, value, ok }) => (
            <div key={label} className="flex items-center gap-1.5 ml-2">
              <span className={`size-1.5 rounded-full ${ok ? "bg-green-500" : "bg-amber-500"}`} />
              <span className="text-xs text-slate-500">{label}:</span>
              <span className={`text-xs font-semibold ${ok ? "text-green-700" : "text-amber-700"}`}>{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Data Collection Points */}
      <Card>
        <CardContent className="p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">Data Collection Points</h2>
              <p className="mt-0.5 text-xs text-slate-400">Track incoming data submissions across programs and sources.</p>
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger size="sm" className="w-36"><SelectValue placeholder="Source" /></SelectTrigger>
                <SelectContent>
                  {allSources.map(s => <SelectItem key={s} value={s}>{s === "All" ? "All Sources" : s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger size="sm" className="w-36"><SelectValue placeholder="Area" /></SelectTrigger>
                <SelectContent>
                  {allAreas.map(a => <SelectItem key={a} value={a}>{a === "All" ? "All Areas" : a}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger size="sm" className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="CONFORMING">Conforming</SelectItem>
                  <SelectItem value="NON_CONFORMING">Non-Conforming</SelectItem>
                  <SelectItem value="DUE_SOON">Due Soon</SelectItem>
                  <SelectItem value="OVERDUE">Overdue</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-xs text-slate-400">{filteredPoints.length} of {dataPoints.length}</span>
            </div>
          </div>

          {/* Legend */}
          <div className="mb-3 flex flex-wrap gap-3">
            {(Object.entries(dpStatusCfg) as [DataPointStatus, typeof dpStatusCfg[DataPointStatus]][]).map(([key, cfg]) => (
              <span key={key} className="flex items-center gap-1 text-xs text-slate-500">
                <Badge variant="outline" className={cn("text-[10px] py-0", cfg.badgeClass)}>{cfg.label}</Badge>
              </span>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["ID", "Data Name", "Area / Program", "Source", "Owner", "Due Date", "Status"].map(h => (
                    <th key={h} className="pb-2 pr-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredPoints.length === 0 && (
                  <tr><td colSpan={7} className="py-8 text-center text-sm text-slate-400">No data points match the selected filters.</td></tr>
                )}
                {filteredPoints.map(dp => {
                  const cfg = dpStatusCfg[dp.status]
                  return (
                    <tr key={dp.id} className={cn("hover:bg-slate-50", cfg.rowClass)}>
                      <td className="py-2.5 pr-4 font-mono text-xs text-slate-500">{dp.id}</td>
                      <td className="py-2.5 pr-4 max-w-[220px]">
                        <p className="truncate text-xs font-medium text-slate-800">{dp.name}</p>
                      </td>
                      <td className="py-2.5 pr-4">
                        <p className="text-xs text-slate-700">{dp.area}</p>
                        <p className="text-[10px] text-slate-400">{dp.program}</p>
                      </td>
                      <td className="py-2.5 pr-4 text-xs text-slate-600">{dp.source}</td>
                      <td className="py-2.5 pr-4 text-xs text-slate-600">{dp.owner}</td>
                      <td className="py-2.5 pr-4 text-xs text-slate-600">{dp.dueDate}</td>
                      <td className="py-2.5">
                        <Badge variant="outline" className={cn("text-[10px]", cfg.badgeClass)}>{cfg.label}</Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Integration audit log */}
      <Card>
        <CardContent className="p-5">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Sync History</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Timestamp","Integration","Action","Result","Records","Detail"].map(h => (
                  <th key={h} className="pb-2 pr-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {auditLog.map((e, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-2 pr-4 font-mono text-xs text-slate-500 whitespace-nowrap">{e.date}</td>
                  <td className="py-2 pr-4 text-xs font-medium text-slate-800">{e.integration}</td>
                  <td className="py-2 pr-4"><span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-700">{e.action}</span></td>
                  <td className="py-2 pr-4 text-xs font-semibold">
                    <span className={e.result === "SUCCESS" ? "text-green-600" : e.result === "WARNING" ? "text-amber-600" : "text-red-600"}>{e.result}</span>
                  </td>
                  <td className="py-2 pr-4 text-xs text-slate-600">{e.records.toLocaleString()}</td>
                  <td className="py-2 text-xs text-slate-500">{e.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
