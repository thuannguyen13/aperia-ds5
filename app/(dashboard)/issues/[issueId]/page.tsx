import Link from "next/link"
import { ArrowLeft, AlertTriangle, Calendar, User, Building2, FileText, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { SeverityBadge } from "@/components/dashboard/SeverityBadge"
import { TopNav } from "@/components/layout/TopNav"

const issue = {
  id: "ISS-45608",
  name: "Critical Operational Risk — Issuer Processing Gap",
  description: "A gap was identified in the issuer transaction processing controls that may allow unauthorised transactions to proceed without adequate secondary validation. This issue was surfaced through the annual internal audit cycle and requires immediate remediation.",
  severity: "CRITICAL" as const,
  status: "OPEN",
  lob: "Issuer Solutions",
  region: "North America",
  country: "United States",
  legalEntity: "Fiserv Inc.",
  type: "DIRECT",
  source: "Internal Audit",
  riskLevel1: "Operational Risk",
  riskLevel2: "Transaction Processing",
  rootCauseL1: "Process",
  rootCauseL2: "Control Design Deficiency",
  regulatoryImpact: true,
  clientRegulatoryImpact: false,
  dateIdentified: "Nov 15, 2024",
  dateOpened: "Dec 10, 2024",
  originalDueDate: "Oct 22, 2025",
  currentDueDate: "Oct 22, 2025",
  daysPastDue: 183,
  owner: "John Smith",
  mapsCount: 3,
}

const maps = [
  { id: "MAP-001", name: "Root Cause Analysis", status: "COMPLETED", dueDate: "Jan 15, 2025", completedDate: "Jan 12, 2025", owner: "John Smith" },
  { id: "MAP-002", name: "Control Remediation Design", status: "IN_PROGRESS", dueDate: "Apr 30, 2025", completedDate: null, owner: "Sarah Lee" },
  { id: "MAP-003", name: "UAT & Validation Testing", status: "PENDING", dueDate: "Aug 31, 2025", completedDate: null, owner: "John Smith" },
]

const auditLog = [
  { action: "Issue Opened", user: "Audit Team", date: "Dec 10, 2024", note: "Created from Internal Audit finding Q4-2024." },
  { action: "Owner Assigned", user: "Thomas Bennington", date: "Dec 12, 2024", note: "John Smith assigned as issue owner." },
  { action: "MAP-001 Completed", user: "John Smith", date: "Jan 12, 2025", note: "Root cause analysis finalized and approved." },
  { action: "Due Date Confirmed", user: "John Smith", date: "Jan 20, 2025", note: "Original due date Oct 22, 2025 confirmed." },
  { action: "MAP-002 Started", user: "Sarah Lee", date: "Feb 1, 2025", note: "Control remediation design work commenced." },
  { action: "Escalated", user: "System", date: "Oct 23, 2025", note: "Issue automatically escalated — past due date." },
]

const mapStatus: Record<string, string> = {
  COMPLETED: "bg-green-100 text-green-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  PENDING: "bg-gray-100 text-gray-700",
}

export default function IssueDetailPage({ params }: { params: { issueId: string } }) {
  return (
    <div className="flex flex-col gap-6">
      <TopNav title={`Issue — ${params.issueId}`} breadcrumb={["Issues", params.issueId]} />

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/issues"><ArrowLeft className="size-3.5" />Back to Issues</Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left column — Issue info */}
        <div className="col-span-2 flex flex-col gap-4">

          {/* Header */}
          <div className="rounded-xl border border-border bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-500">{issue.id}</span>
                  <SeverityBadge severity={issue.severity} />
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">{issue.status}</span>
                  {issue.daysPastDue > 0 && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">{issue.daysPastDue}d Past Due</span>
                  )}
                </div>
                <h1 className="mt-2 text-xl font-semibold text-slate-900">{issue.name}</h1>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{issue.description}</p>
          </div>

          {/* Metadata grid */}
          <div className="rounded-xl border border-border bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold text-slate-800">Issue Details</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "LOB", value: issue.lob, icon: Building2 },
                { label: "Region", value: issue.region, icon: Building2 },
                { label: "Country", value: issue.country, icon: Building2 },
                { label: "Legal Entity", value: issue.legalEntity, icon: Building2 },
                { label: "Issue Type", value: issue.type, icon: FileText },
                { label: "Source", value: issue.source, icon: FileText },
                { label: "Risk Level 1", value: issue.riskLevel1, icon: AlertTriangle },
                { label: "Risk Level 2", value: issue.riskLevel2, icon: AlertTriangle },
                { label: "Root Cause L1", value: issue.rootCauseL1, icon: FileText },
                { label: "Root Cause L2", value: issue.rootCauseL2, icon: FileText },
                { label: "Date Identified", value: issue.dateIdentified, icon: Calendar },
                { label: "Date Opened", value: issue.dateOpened, icon: Calendar },
                { label: "Original Due Date", value: issue.originalDueDate, icon: Calendar },
                { label: "Current Due Date", value: issue.currentDueDate, icon: Calendar },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label}>
                  <p className="flex items-center gap-1 text-xs font-medium text-slate-500"><Icon className="size-3" />{label}</p>
                  <p className="mt-0.5 text-sm text-slate-800">{value}</p>
                </div>
              ))}
              <div>
                <p className="text-xs font-medium text-slate-500">Regulatory Impact</p>
                <p className={`mt-0.5 text-sm font-medium ${issue.regulatoryImpact ? "text-red-600" : "text-green-600"}`}>{issue.regulatoryImpact ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Client Reg. Impact</p>
                <p className={`mt-0.5 text-sm font-medium ${issue.clientRegulatoryImpact ? "text-red-600" : "text-green-600"}`}>{issue.clientRegulatoryImpact ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>

          {/* MAPS — Milestones & Action Plans */}
          <div className="rounded-xl border border-border bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-800">Milestones & Action Plans (MAPS)</h2>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">{issue.mapsCount} total</span>
            </div>
            <div className="flex flex-col gap-3">
              {maps.map(map => (
                <div key={map.id} className="flex items-center gap-4 rounded-lg border border-border p-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100">
                    {map.status === "COMPLETED"
                      ? <CheckCircle2 className="size-4 text-green-600" />
                      : map.status === "IN_PROGRESS"
                      ? <Clock className="size-4 text-blue-500" />
                      : <div className="size-3 rounded-full border-2 border-slate-300" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">{map.name}</p>
                    <p className="text-xs text-slate-500">{map.owner} · Due {map.dueDate}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${mapStatus[map.status]}`}>{map.status.replace("_"," ")}</span>
                  {map.completedDate && <span className="text-xs text-green-600">Done {map.completedDate}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Audit timeline */}
          <div className="rounded-xl border border-border bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold text-slate-800">Activity History</h2>
            <div className="relative flex flex-col gap-0">
              {auditLog.map((entry, i) => (
                <div key={i} className="flex gap-4 pb-4 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <div className="size-2 rounded-full bg-blue-500" />
                    </div>
                    {i < auditLog.length - 1 && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className="min-w-0 pb-2">
                    <div className="flex items-baseline gap-2">
                      <p className="text-xs font-semibold text-slate-800">{entry.action}</p>
                      <span className="text-xs text-slate-400">{entry.date}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">{entry.user} — {entry.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — Actions */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold text-slate-800">Update Status</h2>
            <select className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-slate-700 mb-3">
              <option>OPEN</option>
              <option>IN_REMEDIATION</option>
              <option>PENDING_VALIDATION</option>
              <option>CLOSED</option>
            </select>
            <Button variant="default" size="sm" className="w-full">Save Status</Button>
          </div>

          <div className="rounded-xl border border-border bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold text-slate-800">Owner</h2>
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-800">JS</div>
              <div>
                <p className="text-sm font-medium text-slate-800">{issue.owner}</p>
                <p className="text-xs text-slate-400">Issue Owner</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-3 w-full"><User className="size-3.5" />Reassign Owner</Button>
          </div>

          <div className="rounded-xl border border-border bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold text-slate-800">Key Dates</h2>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Date Opened</span><span className="font-medium text-slate-700">{issue.dateOpened}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Original Due</span><span className="font-medium text-slate-700">{issue.originalDueDate}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Current Due</span><span className="font-semibold text-red-600">{issue.currentDueDate}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Days Past Due</span><span className="font-bold text-red-700">{issue.daysPastDue}d</span></div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold text-slate-800">Add Note</h2>
            <textarea className="w-full rounded-lg border border-border px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20" rows={3} placeholder="Add a comment or update…" />
            <Button variant="outline" size="sm" className="mt-2 w-full">Save Note</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
