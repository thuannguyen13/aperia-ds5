"use client"

import { useState } from "react"
import { RefreshCw, CheckCircle2, AlertTriangle, Clock, ExternalLink, Activity } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { TopNav } from "@/components/layout/TopNav"

type IntegrationStatus = "CONNECTED" | "WARNING" | "ERROR" | "SYNCING"

interface Integration {
  id: string; name: string; description: string; status: IntegrationStatus
  lastSync: string; nextSync: string; recordsProcessed: number; errorCount: number
  icon: string
}

const integrations: Integration[] = [
  { id: "INT-001", name: "Archer",            description: "Governance, risk & compliance platform. Source for all ERIS issues.", status: "CONNECTED", lastSync: "Apr 23, 2026 06:00", nextSync: "Apr 24, 2026 06:00", recordsProcessed: 12341, errorCount: 0, icon: "A" },
  { id: "INT-002", name: "Thomson Reuters",   description: "Regulatory intelligence and alerts feed (RRM source).",              status: "WARNING",   lastSync: "Apr 22, 2026 14:30", nextSync: "Apr 23, 2026 14:30", recordsProcessed: 847,   errorCount: 3, icon: "T" },
  { id: "INT-003", name: "SharePoint",        description: "Legacy M&T activity spreadsheet migration source.",                  status: "CONNECTED", lastSync: "Apr 23, 2026 08:00", nextSync: "Apr 24, 2026 08:00", recordsProcessed: 711,   errorCount: 0, icon: "S" },
  { id: "INT-004", name: "Resend (Email)",    description: "Transactional email for officer digests and reminders.",             status: "CONNECTED", lastSync: "Apr 23, 2026 08:00", nextSync: "Apr 24, 2026 08:00", recordsProcessed: 1240,  errorCount: 0, icon: "E" },
]

const auditLog = [
  { date: "Apr 23, 2026 06:02", integration: "Archer",          action: "SYNC", result: "SUCCESS", records: 12341, details: "Full delta sync completed. 23 new issues ingested." },
  { date: "Apr 22, 2026 14:31", integration: "Thomson Reuters", action: "PULL", result: "WARNING", records: 847,   details: "3 alerts failed schema validation — skipped. Manual review needed." },
  { date: "Apr 22, 2026 08:00", integration: "SharePoint",      action: "SYNC", result: "SUCCESS", records: 711,   details: "Activity list sync complete. No changes detected." },
  { date: "Apr 21, 2026 06:02", integration: "Archer",          action: "SYNC", result: "SUCCESS", records: 12318, details: "Delta sync. 5 issues updated." },
  { date: "Apr 21, 2026 08:00", integration: "Resend",          action: "SEND", result: "SUCCESS", records: 47,    details: "Weekly digest emails delivered. 47 recipients." },
]

const statusConfig: Record<IntegrationStatus, { style: string; icon: React.ElementType; label: string }> = {
  CONNECTED: { style: "bg-green-100 text-green-800",  icon: CheckCircle2,   label: "Connected" },
  WARNING:   { style: "bg-amber-100 text-amber-800",  icon: AlertTriangle,  label: "Warning"   },
  ERROR:     { style: "bg-red-100 text-red-800",      icon: AlertTriangle,  label: "Error"     },
  SYNCING:   { style: "bg-blue-100 text-blue-800",    icon: RefreshCw,      label: "Syncing"   },
}

const iconBg: Record<string, string> = {
  A: "bg-red-100 text-red-700",
  T: "bg-blue-100 text-blue-700",
  S: "bg-green-100 text-green-700",
  E: "bg-purple-100 text-purple-700",
}

export default function AdminIntegrationsPage() {
  const [syncing, setSyncing] = useState<string | null>(null)

  function handleSync(id: string) {
    setSyncing(id)
    setTimeout(() => setSyncing(null), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <TopNav title="Admin — Integrations" breadcrumb={["Admin", "Integrations"]} />

      {/* Integration status cards */}
      <div className="grid grid-cols-2 gap-4">
        {integrations.map(intg => {
          const cfg = statusConfig[syncing === intg.id ? "SYNCING" : intg.status]
          const StatusIcon = cfg.icon
          return (
            <div key={intg.id} className={`rounded-xl border bg-white p-5 ${intg.status === "WARNING" ? "border-amber-200" : intg.status === "ERROR" ? "border-red-200" : "border-border"}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex size-10 items-center justify-center rounded-lg text-lg font-bold ${iconBg[intg.icon]}`}>{intg.icon}</div>
                  <div>
                    <p className="font-semibold text-slate-900">{intg.name}</p>
                    <p className="text-xs text-slate-500">{intg.description}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cfg.style}`}>
                  <StatusIcon className={`size-3 ${syncing === intg.id ? "animate-spin" : ""}`} />{cfg.label}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-lg bg-slate-50 p-2">
                  <p className="text-slate-500">Last Sync</p>
                  <p className="mt-0.5 font-medium text-slate-800">{intg.lastSync}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <p className="text-slate-500">Records Processed</p>
                  <p className="mt-0.5 font-medium text-slate-800">{intg.recordsProcessed.toLocaleString()}</p>
                </div>
                <div className={`rounded-lg p-2 ${intg.errorCount > 0 ? "bg-amber-50" : "bg-slate-50"}`}>
                  <p className="text-slate-500">Errors</p>
                  <p className={`mt-0.5 font-medium ${intg.errorCount > 0 ? "text-amber-700" : "text-green-700"}`}>{intg.errorCount}</p>
                </div>
              </div>

              {intg.errorCount > 0 && (
                <div className="mt-3 rounded-lg border border-amber-100 bg-amber-50 p-2 text-xs text-amber-800">
                  <AlertTriangle className="mr-1 inline size-3" />{intg.errorCount} records failed validation — manual review required.
                </div>
              )}

              <div className="mt-3 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="size-3" />Next sync: {intg.nextSync}
                </span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="xs"><ExternalLink className="size-3" />Docs</Button>
                  <Button variant="outline" size="sm" onClick={() => handleSync(intg.id)} disabled={syncing === intg.id}>
                    <RefreshCw className={`size-3.5 ${syncing === intg.id ? "animate-spin" : ""}`} />
                    {syncing === intg.id ? "Syncing…" : "Sync Now"}
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* System health */}
      <div className="rounded-xl border border-border bg-white p-5">
        <div className="mb-3 flex items-center gap-2">
          <Activity className="size-4 text-blue-600" />
          <h2 className="text-sm font-semibold text-slate-800">System Health</h2>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "API Uptime",     value: "99.98%", color: "text-green-600" },
            { label: "Avg Sync Time",  value: "1.4s",   color: "text-green-600" },
            { label: "Queued Jobs",    value: "0",      color: "text-green-600" },
            { label: "Failed Jobs",    value: "3",      color: "text-amber-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-lg bg-slate-50 p-3 text-center">
              <div className={`text-xl font-bold ${color}`}>{value}</div>
              <div className="mt-0.5 text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit log */}
      <div className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">Integration Audit Log</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Timestamp","Integration","Action","Result","Records","Details"].map(h => (
                  <th key={h} className="pb-2 pr-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {auditLog.map((entry, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-2 pr-4 font-mono text-xs text-slate-500 whitespace-nowrap">{entry.date}</td>
                  <td className="py-2 pr-4 text-xs font-medium text-slate-800">{entry.integration}</td>
                  <td className="py-2 pr-4"><span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-700">{entry.action}</span></td>
                  <td className="py-2 pr-4">
                    <span className={`text-xs font-semibold ${entry.result === "SUCCESS" ? "text-green-600" : entry.result === "WARNING" ? "text-amber-600" : "text-red-600"}`}>
                      {entry.result}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-xs text-slate-600">{entry.records.toLocaleString()}</td>
                  <td className="py-2 text-xs text-slate-500">{entry.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
