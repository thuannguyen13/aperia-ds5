"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select"
import { Badge } from "@/components/ui/badge/badge"
import { Card, CardContent } from "@/components/ui/card/card"
import { cn } from "@/lib/utils"

const auditLogs = [
  { date: "Apr 23, 2026 09:14", user: "Admin User",         action: "UPDATE", entity: "user",      entityId: "USR-007",       detail: "Role changed: OFFICER → LEAD_OFFICER"              },
  { date: "Apr 23, 2026 08:00", user: "System",             action: "EXPORT", entity: "report",    entityId: "GOV-APR-2026",  detail: "Governance report exported as CSV"                 },
  { date: "Apr 22, 2026 17:32", user: "Thomas Bennington",  action: "APPROVE",entity: "report",    entityId: "GOV-APR-2026",  detail: "Governance report approved for April 2026"         },
  { date: "Apr 22, 2026 14:10", user: "Lena Capalbo",       action: "CREATE", entity: "activity",  entityId: "FCC-2026-001",  detail: "New M&T activity created"                          },
  { date: "Apr 22, 2026 11:05", user: "System",             action: "UPDATE", entity: "issue",     entityId: "ISS-45608",     detail: "Issue auto-escalated — 183 days past due"           },
  { date: "Apr 21, 2026 15:44", user: "Richard Pooley",     action: "UPDATE", entity: "activity",  entityId: "EMEA-2025-061", detail: "Status changed: IN_PROGRESS → COMPLETED"           },
  { date: "Apr 21, 2026 10:30", user: "Admin User",         action: "DELETE", entity: "user",      entityId: "USR-013",       detail: "Inactive user account removed"                      },
  { date: "Apr 20, 2026 09:00", user: "System",             action: "CREATE", entity: "workflow",  entityId: "WF-004",        detail: "Post-effective-date workflow auto-triggered"        },
  { date: "Apr 19, 2026 14:22", user: "Kelly Thewes",       action: "UPDATE", entity: "activity",  entityId: "PRIV-2025-018", detail: "Evidence uploaded for Privacy Incident QA"         },
  { date: "Apr 18, 2026 11:10", user: "Lena Capalbo",       action: "CREATE", entity: "issue",     entityId: "ISS-46012",     detail: "New issue created from RRM assessment"             },
  { date: "Apr 17, 2026 16:05", user: "Thomas Bennington",  action: "EXPORT", entity: "report",    entityId: "GOV-MAR-2026",  detail: "March Governance report exported"                  },
  { date: "Apr 16, 2026 09:30", user: "Admin User",         action: "UPDATE", entity: "user",      entityId: "USR-009",       detail: "LOB updated: FCC → APAC"                           },
]

const actionClass: Record<string, string> = {
  CREATE:  "border-transparent bg-green-100 text-green-800 hover:bg-green-100",
  UPDATE:  "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100",
  DELETE:  "border-transparent bg-red-100 text-red-800 hover:bg-red-100",
  APPROVE: "border-transparent bg-purple-100 text-purple-800 hover:bg-purple-100",
  EXPORT:  "border-transparent bg-slate-100 text-slate-700 hover:bg-slate-100",
}

export default function AdminAuditPage() {
  const [userF, setUserF]     = useState("All")
  const [entityF, setEntityF] = useState("All")
  const [actionF, setActionF] = useState("All")

  const users    = ["All", ...Array.from(new Set(auditLogs.map(l => l.user)))]
  const entities = ["All", ...Array.from(new Set(auditLogs.map(l => l.entity)))]
  const actions  = ["All", ...Array.from(new Set(auditLogs.map(l => l.action)))]

  const filtered = auditLogs
    .filter(l => userF   === "All" || l.user   === userF)
    .filter(l => entityF === "All" || l.entity === entityF)
    .filter(l => actionF === "All" || l.action === actionF)

  return (
    <div className="flex flex-col gap-4">
      {/* Summary */}
      <div className="grid grid-cols-5 gap-3">
        {(["CREATE","UPDATE","DELETE","APPROVE","EXPORT"] as const).map(action => (
          <Card key={action}>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-slate-900">{auditLogs.filter(l => l.action === action).length}</div>
              <Badge variant="outline" className={cn("mt-1", actionClass[action])}>{action}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <h2 className="mr-2 text-sm font-semibold text-slate-800">Audit Events</h2>
            {[
              { label: "User",   val: userF,   set: setUserF,   opts: users    },
              { label: "Entity", val: entityF, set: setEntityF, opts: entities },
              { label: "Action", val: actionF, set: setActionF, opts: actions  },
            ].map(({ label, val, set, opts }) => (
              <Select key={label} value={val} onValueChange={set}>
                <SelectTrigger size="sm">
                  <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">{label}</SelectItem>
                  {opts.filter(o => o !== "All").map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
            ))}
            <span className="ml-auto text-xs text-slate-400">{filtered.length} events</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Timestamp","User","Action","Entity","Entity ID","Detail"].map(h => (
                    <th key={h} className="pb-2 pr-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 pr-4 font-mono text-xs text-slate-500 whitespace-nowrap">{log.date}</td>
                    <td className="py-2.5 pr-4 text-xs font-medium text-slate-800">{log.user}</td>
                    <td className="py-2.5 pr-4">
                      <Badge variant="outline" className={cn(actionClass[log.action] ?? "border-transparent bg-slate-100 text-slate-600 hover:bg-slate-100")}>{log.action}</Badge>
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-slate-500">{log.entity}</td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-blue-600">{log.entityId}</td>
                    <td className="py-2.5 text-xs text-slate-600">{log.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="py-10 text-center text-sm text-slate-400">No events match the filters.</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
