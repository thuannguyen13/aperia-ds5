"use client"

import { useState } from "react"
import { CheckCircle2, Upload, Bell, FileText, AlertTriangle, GitFork } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { SeverityBadge } from "@/components/dashboard/SeverityBadge"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import { PageHeaderSetter } from "@/components/layout/PageHeaderSetter"

type Status = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "PAST_DUE" | "DEFERRED" | "CANCELLED"
type Severity = "LOW" | "MODERATE" | "HIGH" | "CRITICAL"

const myActivities = [
  { id: "FCC-2026-001", name: "Sanctions Screening Calibration", type: "MONITORING", frequency: "Monthly", targetDate: "Apr 30, 2026", status: "IN_PROGRESS" as Status, evidenceUploaded: false },
  { id: "PRIV-2026-002", name: "Cookie Consent Audit", type: "TESTING", frequency: "Annually", targetDate: "Jun 30, 2026", status: "PLANNED" as Status, evidenceUploaded: false },
  { id: "FIG-2025-041", name: "FIG Annual Product Family Review", type: "TESTING", frequency: "Annually", targetDate: "Feb 28, 2026", status: "PAST_DUE" as Status, evidenceUploaded: false },
]

const myIssues = [
  { id: "ISS-45953", name: "Regulatory Compliance Risk — Policy Gap", severity: "MODERATE" as Severity, daysPastDue: 1, dueDate: "Apr 22, 2026", source: "Business ID" },
  { id: "ISS-46100", name: "Customer Data Handling Deficiency", severity: "HIGH" as Severity, daysPastDue: 0, dueDate: "May 15, 2026", source: "Internal Audit" },
]

const notifications = [
  { id: "1", type: "TASK_DUE", title: "Activity due in 7 days", message: "Sanctions Screening Calibration is due Apr 30, 2026.", time: "2h ago", read: false },
  { id: "2", type: "TASK_OVERDUE", title: "Activity past due", message: "FIG Annual Product Family Review is 55 days overdue.", time: "1d ago", read: false },
  { id: "3", type: "ISSUE_ESCALATED", title: "Issue requires input", message: "ISS-45953 — due tomorrow. Action needed.", time: "1d ago", read: false },
  { id: "4", type: "WEEKLY_DIGEST", title: "Weekly digest ready", message: "You have 3 open items this week.", time: "2d ago", read: true },
  { id: "5", type: "SLA_WARNING", title: "SLA approaching", message: "CFPB Regulation F Update — 80% SLA elapsed.", time: "3d ago", read: true },
]

const tabs = ["My Activities", "My Issues", "Workflow Tasks", "Notifications"] as const
type Tab = typeof tabs[number]

const notifIcon: Record<string, React.ElementType> = {
  TASK_DUE: Bell,
  TASK_OVERDUE: AlertTriangle,
  ISSUE_ESCALATED: AlertTriangle,
  WEEKLY_DIGEST: FileText,
  SLA_WARNING: Bell,
}

export default function MyWorkPage() {
  const [activeTab, setActiveTab] = useState<Tab>("My Activities")
  const [notifFilter, setNotifFilter] = useState("All")
  const [notifs, setNotifs] = useState(notifications)

  const openItemsThisWeek = 3
  const overdue = myActivities.filter((a) => a.status === "PAST_DUE").length
  const issuesNeedingInput = myIssues.filter((i) => i.daysPastDue >= 0).length

  function markAllRead() {
    setNotifs(notifs.map((n) => ({ ...n, read: true })))
  }

  const filteredNotifs = notifs.filter((n) => {
    if (notifFilter === "Unread") return !n.read
    if (notifFilter === "Tasks") return n.type.startsWith("TASK")
    if (notifFilter === "Reminders") return n.type === "WEEKLY_DIGEST" || n.type === "SLA_WARNING"
    if (notifFilter === "Escalations") return n.type === "ISSUE_ESCALATED"
    return true
  })

  return (
    <div className="flex flex-col gap-6">
      <PageHeaderSetter title="My Work" breadcrumb={["My Work"]} />

      {/* Personal summary strip */}
      <div className="flex items-center gap-6 rounded-xl border border-blue-200 bg-blue-50 px-6 py-4">
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800">
            Good morning, Susie. You have <span className="text-blue-700">{openItemsThisWeek} open items</span> due this week.
          </p>
        </div>
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-1.5 text-slate-700">
            <FileText className="size-4 text-blue-500" />
            <span className="font-semibold">{myActivities.length}</span>
            <span className="text-slate-500">M&T Activities</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <AlertTriangle className="size-4 text-amber-500" />
            <span className="font-semibold">{issuesNeedingInput}</span>
            <span className="text-slate-500">Issues Requiring Input</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <Bell className="size-4 text-red-500" />
            <span className="font-semibold">{overdue}</span>
            <span className={overdue > 0 ? "text-red-600 font-medium" : "text-slate-500"}>Overdue</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main content */}
        <div className="col-span-2 rounded-xl border border-border bg-white p-4">
          {/* Tabs */}
          <div className="mb-4 flex gap-1 rounded-lg bg-slate-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* My Activities */}
          {activeTab === "My Activities" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Ref ID", "Name", "Type", "Frequency", "Target Date", "Status", "Evidence", "Actions"].map((h) => (
                      <th key={h} className="pb-2 text-left text-xs font-medium uppercase tracking-wider text-slate-500 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {myActivities.map((a) => (
                    <tr key={a.id} className={`${a.status === "PAST_DUE" ? "bg-red-50/60" : "hover:bg-slate-50"} transition-colors`}>
                      <td className="py-2.5 font-mono text-xs text-slate-700 pr-4">{a.id}</td>
                      <td className="py-2.5 pr-4">
                        <span className="text-xs font-medium text-slate-800">{a.name}</span>
                        {a.status === "PAST_DUE" && (
                          <span className="ml-1.5 text-xs font-semibold text-red-600">OVERDUE</span>
                        )}
                      </td>
                      <td className="py-2.5 text-xs text-slate-600 pr-4">{a.type}</td>
                      <td className="py-2.5 text-xs text-slate-500 pr-4">{a.frequency}</td>
                      <td className="py-2.5 text-xs text-slate-600 pr-4">{a.targetDate}</td>
                      <td className="py-2.5 pr-4"><StatusBadge status={a.status} /></td>
                      <td className="py-2.5 pr-4">
                        {a.evidenceUploaded ? (
                          <span className="text-xs text-green-700 font-medium">Uploaded</span>
                        ) : (
                          <span className="text-xs text-slate-400">Pending</span>
                        )}
                      </td>
                      <td className="py-2.5">
                        <div className="flex gap-1">
                          <Button variant="outline" size="xs">
                            <CheckCircle2 className="size-3" />
                            Complete
                          </Button>
                          <Button variant="ghost" size="icon-xs" title="Upload evidence">
                            <Upload className="size-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* My Issues */}
          {activeTab === "My Issues" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Issue ID", "Name", "Severity", "Days Past Due", "Due Date", "Source", "Actions"].map((h) => (
                      <th key={h} className="pb-2 text-left text-xs font-medium uppercase tracking-wider text-slate-500 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {myIssues.map((issue) => (
                    <tr key={issue.id} className={`hover:bg-slate-50 transition-colors ${issue.daysPastDue > 0 ? "bg-amber-50/40" : ""}`}>
                      <td className="py-2.5 font-mono text-xs text-slate-700 pr-4">{issue.id}</td>
                      <td className="py-2.5 pr-4">
                        <span className="text-xs font-medium text-slate-800">{issue.name}</span>
                      </td>
                      <td className="py-2.5 pr-4"><SeverityBadge severity={issue.severity} /></td>
                      <td className="py-2.5 pr-4">
                        {issue.daysPastDue > 0 ? (
                          <span className="text-xs font-semibold text-red-600">{issue.daysPastDue}d</span>
                        ) : (
                          <span className="text-xs text-green-600 font-medium">On time</span>
                        )}
                      </td>
                      <td className="py-2.5 text-xs text-slate-600 pr-4">{issue.dueDate}</td>
                      <td className="py-2.5 text-xs text-slate-500 pr-4">{issue.source}</td>
                      <td className="py-2.5">
                        <Button variant="outline" size="xs">View Detail</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Workflow Tasks */}
          {activeTab === "Workflow Tasks" && (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-blue-50">
                <GitFork className="size-5 text-blue-500" />
              </div>
              <p className="text-sm font-medium text-slate-700">No active workflow tasks</p>
              <p className="text-xs text-slate-400">Workflow tasks assigned to you will appear here.</p>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "Notifications" && (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex gap-1 rounded-lg bg-slate-100 p-0.5">
                  {["All", "Unread", "Tasks", "Reminders", "Escalations"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setNotifFilter(f)}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${notifFilter === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <Button variant="ghost" size="xs" onClick={markAllRead}>Mark all read</Button>
              </div>
              <div className="flex flex-col gap-2">
                {filteredNotifs.map((n) => {
                  const Icon = notifIcon[n.type] || Bell
                  return (
                    <div key={n.id} className={`flex gap-3 rounded-lg p-3 ${n.read ? "bg-white" : "bg-blue-50/60 border border-blue-100"}`}>
                      <div className={`flex size-7 shrink-0 items-center justify-center rounded-full ${n.read ? "bg-slate-100" : "bg-blue-100"}`}>
                        <Icon className={`size-3.5 ${n.read ? "text-slate-400" : "text-blue-600"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold ${n.read ? "text-slate-700" : "text-slate-900"}`}>{n.title}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{n.message}</p>
                      </div>
                      <span className="shrink-0 text-xs text-slate-400">{n.time}</span>
                    </div>
                  )
                })}
                {filteredNotifs.length === 0 && (
                  <div className="py-8 text-center text-sm text-slate-400">No notifications in this category.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Weekly Digest Sidebar */}
        <div className="rounded-xl border border-border bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Weekly Digest Preview</h2>
            <Bell className="size-4 text-slate-400" />
          </div>
          <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-700">
            <p className="font-semibold text-slate-900">Your Compliance Weekly Digest</p>
            <p className="mt-0.5 text-slate-500">Week of Apr 21, 2026</p>
            <div className="mt-3 flex flex-col gap-2.5">
              <div>
                <p className="font-semibold text-slate-800">M&T Activities (3 items)</p>
                <ul className="mt-1 space-y-1 text-slate-600">
                  <li>• Sanctions Screening Calibration — Due Apr 30</li>
                  <li className="text-red-600 font-medium">• FIG Annual Review — OVERDUE 55d</li>
                  <li>• Cookie Consent Audit — Due Jun 30</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Issues (1 item)</p>
                <ul className="mt-1 space-y-1 text-slate-600">
                  <li className="text-amber-700">• ISS-45953 — Moderate — Due Apr 22</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <Button variant="default" size="sm" className="w-full">
              Send Digest Now
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              View Full Dashboard
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-slate-400">Auto-sends every Monday at 8 AM</p>
        </div>
      </div>
    </div>
  )
}
