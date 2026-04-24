"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, GitFork, ChevronRight, Clock, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { PageHeaderSetter } from "@/components/layout/PageHeaderSetter"

type WfStatus = "IN_PROGRESS" | "COMPLETED" | "CANCELLED"

interface WorkflowInstance {
  id: string; name: string; template: string; status: WfStatus
  dueDate: string; tasksRemaining: number; tasksTotal: number; createdAt: string
}

const templates = [
  { id: "TPL-001", name: "Annual Product Family Review", steps: 3, description: "Officer input → Lead review → CCO sign-off" },
  { id: "TPL-002", name: "BCP Update", steps: 3, description: "Draft → Manager approval → CCO approval" },
  { id: "TPL-003", name: "Vendor Forecast", steps: 2, description: "Finance input → Compliance review" },
  { id: "TPL-004", name: "Post-Effective-Date M&T Trigger", steps: 3, description: "Assignment → Officer execution → Lead review" },
]

const instances: WorkflowInstance[] = [
  { id: "WF-001", name: "Q1 2026 Product Family Review — EMEA",   template: "Annual Product Family Review",        status: "IN_PROGRESS", dueDate: "May 15, 2026", tasksRemaining: 2, tasksTotal: 3, createdAt: "Apr 1, 2026"  },
  { id: "WF-002", name: "BCP Update — Financial Solutions",        template: "BCP Update",                          status: "IN_PROGRESS", dueDate: "May 1, 2026",  tasksRemaining: 1, tasksTotal: 3, createdAt: "Apr 5, 2026"  },
  { id: "WF-003", name: "Vendor Forecast — Q2 2026",               template: "Vendor Forecast",                     status: "IN_PROGRESS", dueDate: "Apr 30, 2026", tasksRemaining: 1, tasksTotal: 2, createdAt: "Apr 10, 2026" },
  { id: "WF-004", name: "Post-CFPB Rule M&T Trigger",             template: "Post-Effective-Date M&T Trigger",     status: "IN_PROGRESS", dueDate: "Jun 30, 2026", tasksRemaining: 3, tasksTotal: 3, createdAt: "Apr 15, 2026" },
  { id: "WF-005", name: "Q4 2025 Product Family Review — NA",     template: "Annual Product Family Review",        status: "COMPLETED",   dueDate: "Mar 31, 2026", tasksRemaining: 0, tasksTotal: 3, createdAt: "Jan 10, 2026" },
  { id: "WF-006", name: "BCP Update — Merchant Solutions 2025",   template: "BCP Update",                          status: "COMPLETED",   dueDate: "Dec 31, 2025", tasksRemaining: 0, tasksTotal: 3, createdAt: "Nov 1, 2025"  },
]

const wfStatusStyle: Record<WfStatus, string> = {
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-slate-100 text-slate-600",
}

const wfStatusIcon: Record<WfStatus, React.ElementType> = {
  IN_PROGRESS: Clock,
  COMPLETED: CheckCircle2,
  CANCELLED: XCircle,
}

export default function WorkflowsPage() {
  const [showLaunch, setShowLaunch] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [filter, setFilter] = useState<"ALL" | WfStatus>("ALL")

  const filtered = instances.filter(w => filter === "ALL" || w.status === filter)
  const activeCount = instances.filter(w => w.status === "IN_PROGRESS").length

  return (
    <div className="flex flex-col gap-6">
      <PageHeaderSetter title="Workflows" breadcrumb={["Tools", "Workflows"]} />

      {/* Header actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(["ALL","IN_PROGRESS","COMPLETED","CANCELLED"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${filter === f ? "bg-blue-600 text-white" : "bg-white border border-border text-slate-600 hover:bg-slate-50"}`}>
              {f === "ALL" ? `All (${instances.length})` : f === "IN_PROGRESS" ? `Active (${activeCount})` : f.replace("_"," ")}
            </button>
          ))}
        </div>
        <Button variant="default" size="sm" onClick={() => setShowLaunch(true)}>
          <Plus className="size-3.5" />Launch Workflow
        </Button>
      </div>

      {/* Active workflows */}
      <div className="grid grid-cols-1 gap-3">
        {filtered.map(wf => {
          const Icon = wfStatusIcon[wf.status]
          const progress = Math.round(((wf.tasksTotal - wf.tasksRemaining) / wf.tasksTotal) * 100)
          return (
            <Link key={wf.id} href={`/workflows/${wf.id}`}
              className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 hover:shadow-sm transition-shadow">
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${wf.status === "IN_PROGRESS" ? "bg-blue-100" : wf.status === "COMPLETED" ? "bg-green-100" : "bg-slate-100"}`}>
                <GitFork className={`size-5 ${wf.status === "IN_PROGRESS" ? "text-blue-600" : wf.status === "COMPLETED" ? "text-green-600" : "text-slate-400"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-slate-900 truncate">{wf.name}</p>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${wfStatusStyle[wf.status]}`}>
                    <Icon className="mr-1 inline size-2.5" />{wf.status.replace("_"," ")}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">{wf.template} · Created {wf.createdAt}</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${progress === 100 ? "bg-green-500" : "bg-blue-500"}`} style={{ width: `${progress}%` }} />
                  </div>
                  <span className="shrink-0 text-xs text-slate-500">{wf.tasksTotal - wf.tasksRemaining}/{wf.tasksTotal} tasks</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-slate-500">Due {wf.dueDate}</span>
                {wf.tasksRemaining > 0 && (
                  <span className="text-xs font-medium text-blue-600">{wf.tasksRemaining} pending</span>
                )}
                <ChevronRight className="mt-1 size-4 text-slate-300" />
              </div>
            </Link>
          )
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-white py-16">
            <GitFork className="size-10 text-slate-300" />
            <p className="text-sm text-slate-500">No workflows in this category.</p>
            <Button variant="outline" size="sm" onClick={() => setShowLaunch(true)}><Plus className="size-3.5" />Launch New Workflow</Button>
          </div>
        )}
      </div>

      {/* Template reference */}
      <div className="rounded-xl border border-border bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">Available Templates</h2>
        <div className="grid grid-cols-2 gap-3">
          {templates.map(t => (
            <div key={t.id} className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-800">{t.name}</p>
                <span className="text-xs text-slate-400">{t.steps} steps</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{t.description}</p>
              <Button variant="outline" size="xs" className="mt-2" onClick={() => { setSelectedTemplate(t.id); setShowLaunch(true) }}>
                Use Template
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Launch modal */}
      {showLaunch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowLaunch(false)}>
          <div className="w-[480px] rounded-xl bg-white p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-base font-semibold text-slate-900">Launch Workflow</h2>
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700">Template</label>
                <select className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-slate-700"
                  value={selectedTemplate} onChange={e => setSelectedTemplate(e.target.value)}>
                  <option value="">Select a template…</option>
                  {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700">Workflow Title</label>
                <input className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm placeholder:text-slate-400" placeholder="e.g. Q2 2026 Product Family Review — APAC" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700">Due Date</label>
                <input type="date" className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-slate-700" />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="default" size="sm" className="flex-1" onClick={() => setShowLaunch(false)}>Launch</Button>
                <Button variant="outline" size="sm" onClick={() => setShowLaunch(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
