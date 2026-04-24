"use client"

import { useState } from "react"
import { Bell, Save, Plus, Trash2, Edit2, Mail, Check, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select"
import { Switch } from "@/components/ui/switch/switch"
import { Card, CardContent } from "@/components/ui/card/card"
import { Badge } from "@/components/ui/badge/badge"

interface JobReminders {
  onAssign: boolean; thirtyDay: boolean; tenDay: boolean; fiveDay: boolean; weekly: boolean
}

interface Job {
  id: string; name: string; source: string; area: string; owner: string; dueDate: string
  reminders: JobReminders
}

interface ReminderRule {
  id: string; event: string; trigger: string; recipients: string
  frequency: string; channel: string; active: boolean
}

interface EmailTemplate {
  id: string; name: string; subject: string; assignedTo: string[]
}

const initialJobs: Job[] = [
  { id: "JOB-001", name: "Daily Sanctions Upload Review", source: "Archer",     area: "Financial Crimes", owner: "Jason Hollingsworth", dueDate: "Apr 30, 2026", reminders: { onAssign: true,  thirtyDay: true,  tenDay: true,  fiveDay: true,  weekly: true  } },
  { id: "JOB-002", name: "KYC Periodic Review",           source: "SharePoint", area: "Financial Crimes", owner: "Richard Pooley",      dueDate: "May 15, 2026", reminders: { onAssign: true,  thirtyDay: true,  tenDay: false, fiveDay: false, weekly: true  } },
  { id: "JOB-003", name: "GDPR Data Mapping Audit",       source: "Manual",     area: "Privacy",          owner: "Kelly Thewes",        dueDate: "Jun 30, 2026", reminders: { onAssign: false, thirtyDay: true,  tenDay: true,  fiveDay: true,  weekly: false } },
]

const defaultRules: ReminderRule[] = [
  { id: "RR-001", event: "Activity Due",          trigger: "7 days before", recipients: "Owner + Lead Officer",        frequency: "Once",   channel: "Email + In-App", active: true  },
  { id: "RR-002", event: "Activity Overdue",      trigger: "Day after",     recipients: "Owner + Lead + Program Lead", frequency: "Daily",  channel: "Email + In-App", active: true  },
  { id: "RR-003", event: "SLA Warning (RRM)",     trigger: "On event",      recipients: "Alert Assignee",              frequency: "Once",   channel: "In-App",         active: true  },
  { id: "RR-004", event: "Issue Escalated",       trigger: "On event",      recipients: "Lead Officer",                frequency: "Once",   channel: "Email + In-App", active: true  },
  { id: "RR-005", event: "Weekly Digest",         trigger: "Every Monday",  recipients: "All Officers",                frequency: "Weekly", channel: "Email",          active: true  },
  { id: "RR-006", event: "Approval Needed",       trigger: "On event",      recipients: "Approver",                    frequency: "Daily",  channel: "Email + In-App", active: true  },
  { id: "RR-007", event: "Activity Due (30 days)",trigger: "30 days before",recipients: "Owner",                       frequency: "Once",   channel: "In-App",         active: false },
]

const initialTemplates: EmailTemplate[] = [
  { id: "TPL-001", name: "Activity Due Reminder",   subject: "Action Required: [Activity Name] due in [X] days",   assignedTo: ["JOB-001", "JOB-002"] },
  { id: "TPL-002", name: "Overdue Escalation",      subject: "OVERDUE: [Activity Name] — [X] days past due",       assignedTo: ["JOB-001"] },
  { id: "TPL-003", name: "Weekly Digest",           subject: "Your Compliance Weekly Digest — Week of [DATE]",     assignedTo: [] },
]

const reminderCols: { key: keyof JobReminders; label: string; desc: string }[] = [
  { key: "onAssign",  label: "On Assign",   desc: "Immediate on job assignment" },
  { key: "thirtyDay", label: "30d Before",  desc: "Single reminder 30 days before due" },
  { key: "tenDay",    label: "10d Before",  desc: "Single reminder 10 days before due" },
  { key: "fiveDay",   label: "Daily ≤5d",   desc: "Daily from 5 days out through due date" },
  { key: "weekly",    label: "Weekly PD",   desc: "Weekly while past due" },
]

export default function AdminAlertsPage() {
  const [jobs, setJobs]         = useState(initialJobs)
  const [rules, setRules]       = useState(defaultRules)
  const [templates, setTemplates] = useState(initialTemplates)
  const [digest, setDigest]     = useState({ sendDay: "Monday", sendTime: "08:00", activities: true, issues: true, alerts: true, workflows: false })
  const [saved, setSaved]       = useState(false)

  // Job form state
  const [showJobForm, setShowJobForm] = useState(false)
  const [jobForm, setJobForm] = useState({ name: "", source: "Archer", area: "", owner: "", dueDate: "" })

  // Template form state
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null)
  const [showNewTemplate, setShowNewTemplate] = useState(false)
  const [templateForm, setTemplateForm] = useState({ name: "", subject: "" })

  function toggleRule(id: string) { setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r)) }

  function toggleJobReminder(jobId: string, key: keyof JobReminders) {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, reminders: { ...j.reminders, [key]: !j.reminders[key] } } : j))
  }

  function addJob() {
    if (!jobForm.name) return
    const id = `JOB-${String(jobs.length + 1).padStart(3, "0")}`
    setJobs([...jobs, { id, ...jobForm, reminders: { onAssign: true, thirtyDay: true, tenDay: true, fiveDay: true, weekly: true } }])
    setJobForm({ name: "", source: "Archer", area: "", owner: "", dueDate: "" })
    setShowJobForm(false)
  }

  function openEditTemplate(tpl: EmailTemplate) {
    setEditingTemplate(tpl.id)
    setShowNewTemplate(false)
    setTemplateForm({ name: tpl.name, subject: tpl.subject })
  }

  function saveTemplate() {
    if (!templateForm.name) return
    if (editingTemplate) {
      setTemplates(templates.map(t => t.id === editingTemplate ? { ...t, ...templateForm } : t))
      setEditingTemplate(null)
    } else {
      const id = `TPL-${String(templates.length + 1).padStart(3, "0")}`
      setTemplates([...templates, { id, ...templateForm, assignedTo: [] }])
      setShowNewTemplate(false)
    }
    setTemplateForm({ name: "", subject: "" })
  }

  function cancelTemplateForm() {
    setShowNewTemplate(false)
    setEditingTemplate(null)
    setTemplateForm({ name: "", subject: "" })
  }

  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="flex flex-col gap-6">

      {/* Job Onboarding */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">Compliance Job Onboarding</h2>
              <p className="mt-0.5 text-xs text-slate-400">Register monitoring jobs and configure per-job reminder schedules.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowJobForm(!showJobForm)}>
              {showJobForm ? <ChevronUp className="size-3.5" /> : <Plus className="size-3.5" />}
              {showJobForm ? "Cancel" : "Add Job"}
            </Button>
          </div>

          {showJobForm && (
            <div className="mt-4 rounded-lg border border-border bg-slate-50 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-600">New Job</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-medium text-slate-700">Job Name</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="e.g. Daily Sanctions Upload Review"
                    value={jobForm.name} onChange={e => setJobForm({ ...jobForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700">Source</label>
                  <Select value={jobForm.source} onValueChange={v => setJobForm({ ...jobForm, source: v })}>
                    <SelectTrigger className="mt-1 w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Archer", "SharePoint", "Thomson Reuters", "Manual"].map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700">Area / Program</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="e.g. Financial Crimes"
                    value={jobForm.area} onChange={e => setJobForm({ ...jobForm, area: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700">Owner</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Officer name"
                    value={jobForm.owner} onChange={e => setJobForm({ ...jobForm, owner: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700">Due Date</label>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    value={jobForm.dueDate} onChange={e => setJobForm({ ...jobForm, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowJobForm(false)}>Cancel</Button>
                <Button variant="default" size="sm" onClick={addJob} disabled={!jobForm.name}>Add Job</Button>
              </div>
            </div>
          )}

          {jobs.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              {jobs.map(job => (
                <div key={job.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-100 font-mono text-xs font-semibold text-blue-800">
                    {job.id.slice(-1)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{job.name}</p>
                    <p className="text-xs text-slate-400">{job.area} · {job.owner} · Due {job.dueDate}</p>
                  </div>
                  <Badge variant="outline" className="border-transparent bg-slate-100 text-slate-600 hover:bg-slate-100">{job.source}</Badge>
                  <Button variant="ghost" size="icon-xs" onClick={() => setJobs(jobs.filter(j => j.id !== job.id))}>
                    <Trash2 className="size-3 text-red-400" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Per-Job Reminder Schedules */}
      <Card>
        <CardContent className="p-5">
          <div className="mb-1">
            <h2 className="text-sm font-semibold text-slate-800">Per-Job Reminder Schedules</h2>
            <p className="mt-0.5 text-xs text-slate-400">Toggle reminder types independently for each job.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-2 pr-6 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Job</th>
                  {reminderCols.map(col => (
                    <th key={col.key} className="pb-2 pr-4 text-center text-xs font-medium uppercase tracking-wider text-slate-500 whitespace-nowrap">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {jobs.map(job => (
                  <tr key={job.id} className="hover:bg-slate-50">
                    <td className="py-3 pr-6">
                      <p className="text-xs font-medium text-slate-800">{job.name}</p>
                      <p className="text-xs text-slate-400">{job.owner}</p>
                    </td>
                    {reminderCols.map(col => (
                      <td key={col.key} className="py-3 pr-4">
                        <div className="flex justify-center">
                          <Switch checked={job.reminders[col.key]} onCheckedChange={() => toggleJobReminder(job.id, col.key)} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            <span className="font-medium">On Assign</span> — immediate ·{" "}
            <span className="font-medium">30d / 10d Before</span> — single reminder ·{" "}
            <span className="font-medium">Daily ≤5d</span> — every day from 5 days out through due date ·{" "}
            <span className="font-medium">Weekly PD</span> — weekly escalation while past due
          </p>
        </CardContent>
      </Card>

      {/* Notification Trigger Rules */}
      <Card>
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">Notification Trigger Rules</h2>
              <p className="mt-0.5 text-xs text-slate-400">Define which events generate notifications and who receives them.</p>
            </div>
            <Button variant="outline" size="sm"
              onClick={() => setRules([...rules, { id: `RR-${String(rules.length + 1).padStart(3, "0")}`, event: "New Rule", trigger: "On event", recipients: "Owner", frequency: "Once", channel: "In-App", active: false }])}>
              <Plus className="size-3.5" />Add Rule
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Event","Trigger","Recipients","Frequency","Channel","Active",""].map(h => (
                    <th key={h} className="pb-2 pr-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rules.map(rule => (
                  <tr key={rule.id} className={`hover:bg-slate-50 ${!rule.active ? "opacity-50" : ""}`}>
                    <td className="py-2.5 pr-4">
                      <div className="flex items-center gap-2">
                        <Bell className="size-3.5 text-slate-400" />
                        <span className="text-xs font-medium text-slate-800">{rule.event}</span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-slate-600">{rule.trigger}</td>
                    <td className="py-2.5 pr-4 text-xs text-slate-600">{rule.recipients}</td>
                    <td className="py-2.5 pr-4 text-xs text-slate-500">{rule.frequency}</td>
                    <td className="py-2.5 pr-4 text-xs text-slate-500">{rule.channel}</td>
                    <td className="py-2.5 pr-4">
                      <Switch checked={rule.active} onCheckedChange={() => toggleRule(rule.id)} />
                    </td>
                    <td className="py-2.5">
                      <Button variant="ghost" size="icon-xs" onClick={() => setRules(rules.filter(r => r.id !== rule.id))}>
                        <Trash2 className="size-3 text-red-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Email Templates CRUD */}
      <Card>
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">Email Templates</h2>
              <p className="mt-0.5 text-xs text-slate-400">Create, edit, and assign email templates to compliance jobs.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => { setShowNewTemplate(!showNewTemplate); setEditingTemplate(null); setTemplateForm({ name: "", subject: "" }) }}>
              {showNewTemplate ? "Cancel" : <><Plus className="size-3.5" />New Template</>}
            </Button>
          </div>

          {(showNewTemplate || editingTemplate) && (
            <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-800">
                {editingTemplate ? "Edit Template" : "New Template"}
              </p>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-700">Template Name</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="e.g. Activity Due Reminder"
                    value={templateForm.name} onChange={e => setTemplateForm({ ...templateForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700">Subject Line</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="e.g. Action Required: [Activity Name] due in [X] days"
                    value={templateForm.subject} onChange={e => setTemplateForm({ ...templateForm, subject: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={cancelTemplateForm}>Cancel</Button>
                <Button variant="default" size="sm" onClick={saveTemplate} disabled={!templateForm.name}>
                  <Check className="size-3.5" />{editingTemplate ? "Save Changes" : "Create Template"}
                </Button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {templates.map(tpl => (
              <div key={tpl.id} className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${editingTemplate === tpl.id ? "border-blue-200 bg-blue-50/40" : "border-border"}`}>
                <Mail className="size-4 shrink-0 text-blue-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800">{tpl.name}</p>
                  <p className="truncate text-xs text-slate-400">{tpl.subject}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  {tpl.assignedTo.length > 0 && (
                    <Badge variant="outline" className="border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100">
                      {tpl.assignedTo.length} job{tpl.assignedTo.length > 1 ? "s" : ""}
                    </Badge>
                  )}
                  <Button variant="ghost" size="icon-xs" onClick={() => openEditTemplate(tpl)}>
                    <Edit2 className="size-3 text-slate-400" />
                  </Button>
                  <Button variant="ghost" size="icon-xs" onClick={() => setTemplates(templates.filter(t => t.id !== tpl.id))}>
                    <Trash2 className="size-3 text-red-400" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly digest config */}
      <Card>
        <CardContent className="p-5">
          <h2 className="mb-4 text-sm font-semibold text-slate-800">Weekly Digest Settings</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-medium text-slate-700">Send Day</label>
                <Select value={digest.sendDay} onValueChange={v => setDigest({ ...digest, sendDay: v })}>
                  <SelectTrigger className="mt-1 w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Monday","Tuesday","Wednesday","Thursday","Friday"].map(d => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700">Send Time</label>
                <input type="time" className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-slate-700"
                  value={digest.sendTime} onChange={e => setDigest({ ...digest, sendTime: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700">Include in Digest</label>
              <div className="mt-2 flex flex-col gap-2">
                {([["activities","M&T Activities"],["issues","Open Issues"],["alerts","RRM Alerts"],["workflows","Workflow Tasks"]] as const).map(([key, label]) => (
                  <label key={key} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" className="size-3.5"
                      checked={digest[key as keyof typeof digest] as boolean}
                      onChange={e => setDigest({ ...digest, [key]: e.target.checked })} />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm">Send Test Digest</Button>
        <Button variant="default" size="sm" onClick={handleSave}>
          <Save className="size-3.5" />{saved ? "Saved!" : "Save Settings"}
        </Button>
      </div>
    </div>
  )
}
