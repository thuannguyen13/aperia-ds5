"use client"

import { useState } from "react"
import { RefreshCw, CheckCircle2, AlertTriangle, Clock, ExternalLink, Activity } from "lucide-react"
import { Button } from "@/components/ui/button/button"

type IntegrationStatus = "CONNECTED" | "WARNING" | "ERROR" | "SYNCING"

const integrations = [
  { id: "INT-001", name: "Archer",          desc: "Governance, risk & compliance platform. Source for all ERIS issues.", status: "CONNECTED" as IntegrationStatus, lastSync: "Apr 23, 2026 06:00", nextSync: "Apr 24, 2026 06:00", records: 12341, errors: 0, color: "bg-red-100 text-red-700",     letter: "A" },
  { id: "INT-002", name: "Thomson Reuters", desc: "Regulatory intelligence and alerts feed (RRM source).",              status: "WARNING"   as IntegrationStatus, lastSync: "Apr 22, 2026 14:30", nextSync: "Apr 23, 2026 14:30", records: 847,   errors: 3, color: "bg-blue-100 text-blue-700",   letter: "T" },
  { id: "INT-003", name: "SharePoint",      desc: "Legacy M&T activity spreadsheet migration source.",                  status: "CONNECTED" as IntegrationStatus, lastSync: "Apr 23, 2026 08:00", nextSync: "Apr 24, 2026 08:00", records: 711,   errors: 0, color: "bg-green-100 text-green-700", letter: "S" },
  { id: "INT-004", name: "Resend (Email)",  desc: "Transactional email for officer digests and reminders.",             status: "CONNECTED" as IntegrationStatus, lastSync: "Apr 23, 2026 08:00", nextSync: "Apr 24, 2026 08:00", records: 1240,  errors: 0, color: "bg-purple-100 text-purple-700",letter: "E" },
]

const auditLog = [
  { date: "Apr 23, 2026 06:02", integration: "Archer",          action: "SYNC", result: "SUCCESS", records: 12341, detail: "Full delta sync. 23 new issues ingested."         },
  { date: "Apr 22, 2026 14:31", integration: "Thomson Reuters", action: "PULL", result: "WARNING", records: 847,   detail: "3 alerts failed schema validation — skipped."       },
  { date: "Apr 22, 2026 08:00", integration: "SharePoint",      action: "SYNC", result: "SUCCESS", records: 711,   detail: "Activity list sync complete. No changes detected." },
  { date: "Apr 21, 2026 06:02", integration: "Archer",          action: "SYNC", result: "SUCCESS", records: 12318, detail: "Delta sync. 5 issues updated."                     },
  { date: "Apr 21, 2026 08:00", integration: "Resend",          action: "SEND", result: "SUCCESS", records: 47,    detail: "Weekly digest emails delivered to 47 recipients."  },
]

const statusCfg: Record<IntegrationStatus, { badge: string; icon: React.ElementType }> = {
  CONNECTED: { badge: "bg-green-100 text-green-800", icon: CheckCircle2  },
  WARNING:   { badge: "bg-amber-100 text-amber-800", icon: AlertTriangle },
  ERROR:     { badge: "bg-red-100 text-red-800",     icon: AlertTriangle },
  SYNCING:   { badge: "bg-blue-100 text-blue-800",   icon: RefreshCw     },
}

export default function AdminIntegrationsPage() {
  const [syncing, setSyncing] = useState<string | null>(null)

  function handleSync(id: string) { setSyncing(id); setTimeout(() => setSyncing(null), 2000) }

  return (
    <div className="flex flex-col gap-6">
      {/* Integration cards */}
      <div className="grid grid-cols-2 gap-4">
        {integrations.map(intg => {
          const isSyncing = syncing === intg.id
          const cfg = statusCfg[isSyncing ? "SYNCING" : intg.status]
          const StatusIcon = cfg.icon
          return (
            <div key={intg.id} className={`rounded-xl border bg-white p-5 ${intg.status === "WARNING" ? "border-amber-200" : "border-border"}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex size-10 items-center justify-center rounded-lg font-bold ${intg.color}`}>{intg.letter}</div>
                  <div>
                    <p className="font-semibold text-slate-900">{intg.name}</p>
                    <p className="text-xs text-slate-500">{intg.desc}</p>
                  </div>
                </div>
                <span className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cfg.badge}`}>
                  <StatusIcon className={`size-3 ${isSyncing ? "animate-spin" : ""}`} />
                  {isSyncing ? "SYNCING" : intg.status}
                </span>
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
            </div>
          )
        })}
      </div>

      {/* System health */}
      <div className="flex items-center gap-4 rounded-xl border border-border bg-white p-4">
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
      </div>

      {/* Integration audit log */}
      <div className="rounded-xl border border-border bg-white p-5">
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
      </div>
    </div>
  )
}
