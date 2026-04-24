"use client"

import { useState } from "react"
import { Bell, Save, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button/button"

interface ReminderRule {
  id: string; event: string; trigger: string; recipients: string
  frequency: string; channel: string; active: boolean
}

const defaultRules: ReminderRule[] = [
  { id: "RR-001", event: "Activity Due",          trigger: "7 days before", recipients: "Owner + Lead Officer",        frequency: "Once",   channel: "Email + In-App", active: true  },
  { id: "RR-002", event: "Activity Overdue",      trigger: "Day after",     recipients: "Owner + Lead + Program Lead", frequency: "Daily",  channel: "Email + In-App", active: true  },
  { id: "RR-003", event: "SLA Warning (RRM)",     trigger: "On event",      recipients: "Alert Assignee",              frequency: "Once",   channel: "In-App",         active: true  },
  { id: "RR-004", event: "Issue Escalated",       trigger: "On event",      recipients: "Lead Officer",                frequency: "Once",   channel: "Email + In-App", active: true  },
  { id: "RR-005", event: "Weekly Digest",         trigger: "Every Monday",  recipients: "All Officers",                frequency: "Weekly", channel: "Email",           active: true  },
  { id: "RR-006", event: "Approval Needed",       trigger: "On event",      recipients: "Approver",                    frequency: "Daily",  channel: "Email + In-App", active: true  },
  { id: "RR-007", event: "Activity Due (30 days)",trigger: "30 days before",recipients: "Owner",                       frequency: "Once",   channel: "In-App",         active: false },
]

export default function AdminAlertsPage() {
  const [rules, setRules]   = useState(defaultRules)
  const [digest, setDigest] = useState({ sendDay: "Monday", sendTime: "08:00", activities: true, issues: true, alerts: true, workflows: false })
  const [saved, setSaved]   = useState(false)

  function toggleRule(id: string) { setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r)) }
  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="flex flex-col gap-6">
      {/* Trigger rules */}
      <div className="rounded-xl border border-border bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Notification Trigger Rules</h2>
            <p className="mt-0.5 text-xs text-slate-400">Define which events generate notifications and who receives them.</p>
          </div>
          <Button variant="outline" size="sm"
            onClick={() => setRules([...rules, { id: `RR-00${rules.length+1}`, event: "New Rule", trigger: "On event", recipients: "Owner", frequency: "Once", channel: "In-App", active: false }])}>
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
                    <div className="flex items-center gap-2"><Bell className="size-3.5 text-slate-400" /><span className="text-xs font-medium text-slate-800">{rule.event}</span></div>
                  </td>
                  <td className="py-2.5 pr-4 text-xs text-slate-600">{rule.trigger}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-600">{rule.recipients}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500">{rule.frequency}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500">{rule.channel}</td>
                  <td className="py-2.5 pr-4">
                    <button onClick={() => toggleRule(rule.id)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${rule.active ? "bg-blue-600" : "bg-slate-300"}`}>
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
          <div className="flex flex-col gap-3">
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
      </div>

      {/* Template preview */}
      <div className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">Email Template Preview</h2>
        <div className="rounded-lg border border-border bg-slate-50 p-4 font-mono text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">
{`Subject: Your Compliance Weekly Digest — Week of [DATE]

Hi [Name],

📋 M&T ACTIVITIES
- [Activity Name] — Due [DATE] — ⚠️ Due in 5 days
- [Activity Name] — OVERDUE since [DATE]

⚠️ ISSUES
- [Issue Name] — [Severity] — Due [DATE]

🔔 RRM ALERTS
- [Alert Title] — [Priority] — SLA [X]% elapsed

[View My Work Dashboard →]

---
Sends every ${digest.sendDay} at ${digest.sendTime}.`}
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
