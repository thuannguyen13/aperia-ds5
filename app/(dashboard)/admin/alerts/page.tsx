"use client"

import { useState } from "react"
import { Bell, Save, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { TopNav } from "@/components/layout/TopNav"

interface ReminderRule {
  id: string; event: string; triggerDays: number; recipients: string
  frequency: string; channel: string; active: boolean
}

const defaultRules: ReminderRule[] = [
  { id: "RR-001", event: "Activity Due",          triggerDays: 7,  recipients: "Owner + Lead Officer", frequency: "Once",   channel: "Email + In-App", active: true  },
  { id: "RR-002", event: "Activity Overdue",       triggerDays: 1,  recipients: "Owner + Lead + Program Lead", frequency: "Daily",  channel: "Email + In-App", active: true  },
  { id: "RR-003", event: "SLA Warning (RRM)",      triggerDays: 0,  recipients: "Alert Assignee",       frequency: "Once",   channel: "In-App",         active: true  },
  { id: "RR-004", event: "Issue Escalated",        triggerDays: 0,  recipients: "Lead Officer",         frequency: "Once",   channel: "Email + In-App", active: true  },
  { id: "RR-005", event: "Weekly Digest",          triggerDays: 0,  recipients: "All Officers",         frequency: "Weekly", channel: "Email",           active: true  },
  { id: "RR-006", event: "Approval Needed",        triggerDays: 0,  recipients: "Approver",             frequency: "Daily",  channel: "Email + In-App", active: true  },
  { id: "RR-007", event: "Activity Due (30 days)", triggerDays: 30, recipients: "Owner",                frequency: "Once",   channel: "In-App",         active: false },
]

const digestSettings = {
  sendDay: "Monday",
  sendTime: "08:00",
  includeActivities: true,
  includeIssues: true,
  includeAlerts: true,
  includeWorkflows: false,
}

export default function AdminAlertsPage() {
  const [rules, setRules]   = useState(defaultRules)
  const [digest, setDigest] = useState(digestSettings)
  const [saved, setSaved]   = useState(false)

  function toggleRule(id: string) {
    setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r))
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <TopNav title="Admin — Reminder Config" breadcrumb={["Admin", "Reminder Config"]} />

      {/* Global reminder rules */}
      <div className="rounded-xl border border-border bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Notification Trigger Rules</h2>
            <p className="mt-0.5 text-xs text-slate-400">Configure which events trigger notifications and who receives them.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setRules([...rules, { id: `RR-00${rules.length+1}`, event: "New Rule", triggerDays: 7, recipients: "Owner", frequency: "Once", channel: "In-App", active: false }])}>
            <Plus className="size-3.5" />Add Rule
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Event","Trigger","Recipients","Frequency","Channel","Active","Actions"].map(h => (
                  <th key={h} className="pb-2 pr-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rules.map(rule => (
                <tr key={rule.id} className={`hover:bg-slate-50 transition-colors ${!rule.active ? "opacity-50" : ""}`}>
                  <td className="py-2.5 pr-4">
                    <div className="flex items-center gap-2">
                      <Bell className="size-3.5 text-slate-400" />
                      <span className="text-xs font-medium text-slate-800">{rule.event}</span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-4 text-xs text-slate-600">
                    {rule.triggerDays > 0 ? `${rule.triggerDays} days before` : "On event"}
                  </td>
                  <td className="py-2.5 pr-4 text-xs text-slate-600">{rule.recipients}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500">{rule.frequency}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500">{rule.channel}</td>
                  <td className="py-2.5 pr-4">
                    <button
                      onClick={() => toggleRule(rule.id)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${rule.active ? "bg-blue-600" : "bg-slate-300"}`}
                    >
                      <span className={`inline-block size-3.5 rounded-full bg-white shadow transition-transform ${rule.active ? "translate-x-4.5" : "translate-x-0.5"}`} />
                    </button>
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
      </div>

      {/* Weekly digest config */}
      <div className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-slate-800">Weekly Digest Settings</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium text-slate-700">Send Day</label>
              <select className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-slate-700"
                value={digest.sendDay} onChange={e => setDigest({ ...digest, sendDay: e.target.value })}>
                {["Monday","Tuesday","Wednesday","Thursday","Friday"].map(d => <option key={d}>{d}</option>)}
              </select>
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
              {[
                { key: "includeActivities", label: "M&T Activities" },
                { key: "includeIssues",     label: "Open Issues"     },
                { key: "includeAlerts",     label: "RRM Alerts"      },
                { key: "includeWorkflows",  label: "Workflow Tasks"  },
              ].map(({ key, label }) => (
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
      </div>

      {/* Email template preview */}
      <div className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">Email Template Preview</h2>
        <div className="rounded-lg border border-border bg-slate-50 p-4 font-mono text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
{`Subject: Your Compliance Weekly Digest — Week of [DATE]

Hi [Name],

Here's your summary for this week:

📋 M&T ACTIVITIES
- [Activity Name] — Due [DATE] — ⚠️ Due in 5 days
- [Activity Name] — OVERDUE since [DATE]

⚠️ ISSUES
- [Issue Name] — [Severity] — Due [DATE]

🔔 RRM ALERTS
- [Alert Title] — [Priority] — SLA [X]% elapsed

[View My Work Dashboard →]

---
Fiserv Global Regulatory Compliance
This digest is sent every ${digest.sendDay} at ${digest.sendTime}.`}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm">Send Test Digest</Button>
        <Button variant="default" size="sm" onClick={handleSave}>
          <Save className="size-3.5" />{saved ? "Saved!" : "Save Settings"}
        </Button>
      </div>
    </div>
  )
}
