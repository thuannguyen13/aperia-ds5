"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Clock, Circle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { PageHeaderSetter } from "@/components/layout/PageHeaderSetter"

type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "OVERDUE"

interface WorkflowTask {
  id: string; stepIndex: number; stepName: string
  assignee: string; role: string; dueDate: string
  status: TaskStatus; completedAt?: string; notes?: string; slaDays: number
}

const workflow = {
  id: "WF-001",
  name: "Q1 2026 Product Family Review — EMEA",
  template: "Annual Product Family Review",
  status: "IN_PROGRESS",
  dueDate: "May 15, 2026",
  createdAt: "Apr 1, 2026",
}

const tasks: WorkflowTask[] = [
  { id: "TASK-001", stepIndex: 1, stepName: "Collect Input from Officers", assignee: "Richard Pooley", role: "OFFICER", dueDate: "Apr 15, 2026", status: "COMPLETED", completedAt: "Apr 12, 2026", notes: "All EMEA officer inputs collected and compiled.", slaDays: 14 },
  { id: "TASK-002", stepIndex: 2, stepName: "Lead Officer Review",         assignee: "Lena Capalbo",   role: "LEAD_OFFICER", dueDate: "Apr 22, 2026", status: "IN_PROGRESS", slaDays: 7 },
  { id: "TASK-003", stepIndex: 3, stepName: "CCO Sign-off",                assignee: "Thomas Bennington", role: "PROGRAM_LEAD", dueDate: "Apr 27, 2026", status: "PENDING", slaDays: 5 },
]

const taskStatusStyle: Record<TaskStatus, { badge: string; icon: React.ElementType; iconColor: string; bg: string }> = {
  COMPLETED:   { badge: "bg-green-100 text-green-800",  icon: CheckCircle2, iconColor: "text-green-500",  bg: "bg-green-50"  },
  IN_PROGRESS: { badge: "bg-blue-100 text-blue-800",    icon: Clock,        iconColor: "text-blue-500",   bg: "bg-blue-50"   },
  PENDING:     { badge: "bg-gray-100 text-gray-600",    icon: Circle,       iconColor: "text-slate-300",  bg: "bg-white"     },
  OVERDUE:     { badge: "bg-red-100 text-red-800",      icon: Clock,        iconColor: "text-red-500",    bg: "bg-red-50"    },
}

const roleStyle: Record<string, string> = {
  OFFICER:       "bg-slate-100 text-slate-700",
  LEAD_OFFICER:  "bg-blue-100 text-blue-800",
  PROGRAM_LEAD:  "bg-purple-100 text-purple-800",
}

export default function WorkflowDetailPage({ params }: { params: { workflowId: string } }) {
  const [completingId, setCompletingId] = useState<string | null>(null)
  const [notes, setNotes] = useState("")

  const completedCount = tasks.filter(t => t.status === "COMPLETED").length
  const progress = Math.round((completedCount / tasks.length) * 100)

  return (
    <div className="flex flex-col gap-6">
      <PageHeaderSetter title={workflow.name} breadcrumb={["Workflows", params.workflowId]} />

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/workflows"><ArrowLeft className="size-3.5" />Back to Workflows</Link>
        </Button>
      </div>

      {/* Workflow header */}
      <div className="rounded-xl border border-border bg-white p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">{workflow.status.replace("_"," ")}</span>
              <span className="text-xs text-slate-400">Template: {workflow.template}</span>
            </div>
            <h1 className="mt-2 text-xl font-semibold text-slate-900">{workflow.name}</h1>
            <p className="mt-1 text-xs text-slate-400">Created {workflow.createdAt} · Due {workflow.dueDate}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900">{progress}%</div>
            <div className="text-xs text-slate-400">complete</div>
          </div>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-1 flex justify-between text-xs text-slate-400">
          <span>{completedCount} of {tasks.length} tasks complete</span>
          <span>{tasks.length - completedCount} remaining</span>
        </div>
      </div>

      {/* Step-by-step tasks */}
      <div className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-5 text-sm font-semibold text-slate-800">Workflow Steps</h2>
        <div className="flex flex-col gap-0">
          {tasks.map((task, i) => {
            const style = taskStatusStyle[task.status]
            const Icon = style.icon
            const isActive = task.status === "IN_PROGRESS"
            return (
              <div key={task.id} className="flex gap-4">
                {/* Step indicator */}
                <div className="flex flex-col items-center">
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 ${task.status === "COMPLETED" ? "border-green-400 bg-green-50" : isActive ? "border-blue-400 bg-blue-50" : "border-border bg-white"}`}>
                    <Icon className={`size-4 ${style.iconColor}`} />
                  </div>
                  {i < tasks.length - 1 && (
                    <div className={`w-px flex-1 my-1 ${task.status === "COMPLETED" ? "bg-green-300" : "bg-border"}`} style={{ minHeight: 24 }} />
                  )}
                </div>

                {/* Task content */}
                <div className={`mb-5 flex-1 rounded-xl border p-4 ${isActive ? "border-blue-200 " + style.bg : "border-border " + style.bg}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-slate-400">Step {task.stepIndex}</span>
                        <ChevronRight className="size-3 text-slate-300" />
                        <p className="font-semibold text-slate-900">{task.stepName}</p>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${style.badge}`}>{task.status.replace("_"," ")}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <div className="flex size-5 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-700">
                            {task.assignee.split(" ").map(n => n[0]).join("").slice(0,2)}
                          </div>
                          <span>{task.assignee}</span>
                        </div>
                        <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${roleStyle[task.role]}`}>{task.role.replace("_"," ")}</span>
                        <span>Due {task.dueDate}</span>
                        <span>SLA: {task.slaDays} days</span>
                      </div>
                      {task.completedAt && (
                        <p className="mt-1 text-xs text-green-600">Completed {task.completedAt}</p>
                      )}
                      {task.notes && (
                        <p className="mt-2 rounded bg-white/60 p-2 text-xs text-slate-600 italic">{task.notes}</p>
                      )}
                    </div>
                    {isActive && (
                      <Button variant="default" size="sm" onClick={() => setCompletingId(task.id)}>
                        <CheckCircle2 className="size-3.5" />Complete
                      </Button>
                    )}
                    {task.status === "PENDING" && (
                      <Button variant="outline" size="sm" disabled>Waiting</Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Complete task drawer */}
      {completingId && (
        <div className="fixed inset-0 z-50 flex items-end justify-end" onClick={() => setCompletingId(null)}>
          <div className="h-full w-96 border-l border-border bg-white p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-base font-semibold text-slate-900">Complete Task</h2>
            <p className="mt-1 text-xs text-slate-500">{tasks.find(t => t.id === completingId)?.stepName}</p>
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700">Completion Notes</label>
                <textarea
                  className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm placeholder:text-slate-400"
                  rows={5} value={notes} onChange={e => setNotes(e.target.value)}
                  placeholder="Summarize actions taken and any key findings…"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700">Completion Date</label>
                <input type="date" defaultValue="2026-04-23" className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-slate-700" />
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="sm" className="flex-1" onClick={() => setCompletingId(null)}>
                  <CheckCircle2 className="size-3.5" />Mark Complete
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCompletingId(null)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
