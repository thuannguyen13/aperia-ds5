"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, FileText, CheckCircle2, Clock, Link as LinkIcon, User } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import { SeverityBadge } from "@/components/dashboard/SeverityBadge"
import { PageHeaderSetter } from "@/components/layout/PageHeaderSetter"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select"
import { Badge } from "@/components/ui/badge/badge"

const activity = {
  id: "EMEA-2025-061",
  name: "Daily Sanctions Upload Review",
  status: "COMPLETED" as const,
  type: "MONITORING",
  region: "EMEA",
  lob: "FIG",
  programArea: "Financial Crimes Compliance",
  country: "United Kingdom",
  productFamily: "Enterprise Payments",
  productArea: "Payments Processing",
  frequency: "Monthly",
  scopePeriod: "Jan 1 – Dec 31, 2025",
  rationale: "Required by OFAC, EU Sanctions Regulation, and UK sanctions legislation to ensure the daily sanctions list uploads are being performed accurately and completely across all EMEA payment processing nodes.",
  anticipatedStartDate: "Jan 15, 2025",
  targetCompletionDate: "Mar 31, 2026",
  actualCompletionDate: "Mar 28, 2026",
  evidenceUploaded: true,
  evidenceFiles: [
    { name: "sanctions-review-q1-2026.pdf", size: "2.1 MB", uploadedAt: "Mar 28, 2026", uploadedBy: "Richard Pooley" },
    { name: "sanctions-review-q4-2025.pdf", size: "1.8 MB", uploadedAt: "Jan 5, 2026",  uploadedBy: "Dawn Dale"      },
  ],
  linkedRegulatoryRule: "RRM-003",
  erisIssueCount: 0,
  observationCount: 1,
  observationDesc: "Minor documentation gap identified in Nov 2025 upload reconciliation. Resolved and closed in Dec 2025.",
  notes: "Activity completed on schedule. All daily sanctions uploads verified against OFAC and EU consolidated lists.",
  leadOfficer: { name: "Richard Pooley", initials: "RP", region: "EMEA" },
  owner: { name: "Dawn Dale", initials: "DD", region: "EMEA" },
}

const auditLog = [
  { action: "Activity Created", user: "Thomas Bennington", date: "Jan 5, 2025",  note: "Added to 2025 M&T Annual Plan." },
  { action: "Started",          user: "Richard Pooley",    date: "Jan 15, 2025", note: "Monitoring commenced for Jan 2025 uploads." },
  { action: "Observation Added",user: "Dawn Dale",         date: "Dec 3, 2025",  note: "Minor documentation gap noted in Nov reconciliation." },
  { action: "Observation Closed",user: "Dawn Dale",        date: "Dec 15, 2025", note: "Gap resolved — updated reconciliation procedure." },
  { action: "Evidence Uploaded", user: "Dawn Dale",        date: "Jan 5, 2026",  note: "Q4 2025 evidence package uploaded." },
  { action: "Evidence Uploaded", user: "Richard Pooley",   date: "Mar 28, 2026", note: "Final Q1 2026 evidence uploaded." },
  { action: "Marked Complete",   user: "Richard Pooley",   date: "Mar 28, 2026", note: "Activity marked complete for FY 2025–2026." },
]

export default function ActivityDetailPage({ params }: { params: { activityId: string } }) {
  const [dragging, setDragging] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <PageHeaderSetter title={`Activity — ${params.activityId}`} breadcrumb={["M&T", params.activityId]} />

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/monitoring-testing"><ArrowLeft className="size-3.5" />Back to M&T</Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left — Activity info */}
        <div className="col-span-2 flex flex-col gap-4">

          {/* Header */}
          <div className="rounded-xl border border-border bg-white p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-slate-500">{activity.id}</span>
              <StatusBadge status={activity.status} />
              <Badge variant="outline" className={activity.type === "MONITORING" ? "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100" : "border-transparent bg-violet-100 text-violet-800 hover:bg-violet-100"}>{activity.type}</Badge>
            </div>
            <h1 className="mt-2 text-xl font-semibold text-slate-900">{activity.name}</h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{activity.rationale}</p>
          </div>

          {/* Metadata */}
          <div className="rounded-xl border border-border bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold text-slate-800">Activity Details</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                ["Region",          activity.region],
                ["LOB",             activity.lob],
                ["Program Area",    activity.programArea],
                ["Country",         activity.country],
                ["Product Family",  activity.productFamily],
                ["Product Area",    activity.productArea],
                ["Frequency",       activity.frequency],
                ["Scope Period",    activity.scopePeriod],
                ["Anticipated Start",activity.anticipatedStartDate],
                ["Target Completion",activity.targetCompletionDate],
                ["Actual Completion",activity.actualCompletionDate ?? "—"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs font-medium text-slate-500">{label}</p>
                  <p className="mt-0.5 text-sm text-slate-800">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Completion data */}
          <div className="rounded-xl border border-border bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold text-slate-800">Completion Details</h2>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-xs font-medium text-slate-500">ERIS Issues Identified</p>
                <p className="mt-0.5 font-semibold text-slate-800">{activity.erisIssueCount}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Observations</p>
                <p className="mt-0.5 font-semibold text-slate-800">{activity.observationCount}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Evidence Status</p>
                <p className={`mt-0.5 font-semibold ${activity.evidenceUploaded ? "text-green-600" : "text-amber-600"}`}>
                  {activity.evidenceUploaded ? "Uploaded" : "Pending"}
                </p>
              </div>
            </div>
            {activity.observationDesc && (
              <div className="mt-3 rounded-lg bg-amber-50 border border-amber-100 p-3">
                <p className="text-xs font-medium text-amber-800">Observation Notes</p>
                <p className="mt-1 text-xs text-slate-700">{activity.observationDesc}</p>
              </div>
            )}
            {activity.notes && (
              <div className="mt-3 rounded-lg bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-600">Notes</p>
                <p className="mt-1 text-xs text-slate-700">{activity.notes}</p>
              </div>
            )}
          </div>

          {/* Audit timeline */}
          <div className="rounded-xl border border-border bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold text-slate-800">Activity History</h2>
            <div className="flex flex-col gap-0">
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

        {/* Right — Actions */}
        <div className="flex flex-col gap-4">

          {/* Status */}
          <div className="rounded-xl border border-border bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold text-slate-800">Update Status</h2>
            <Select defaultValue="COMPLETED">
              <SelectTrigger className="mb-3 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                <SelectItem value="PLANNED">PLANNED</SelectItem>
                <SelectItem value="DEFERRED">DEFERRED</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="default" size="sm" className="w-full">Save Status</Button>
          </div>

          {/* Evidence uploader */}
          <div className="rounded-xl border border-border bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-800">Evidence Files</h2>
              <span className="text-xs text-slate-400">{activity.evidenceFiles.length} files</span>
            </div>

            {/* Existing files */}
            <div className="mb-3 flex flex-col gap-2">
              {activity.evidenceFiles.map(file => (
                <div key={file.name} className="flex items-center gap-2 rounded-lg border border-border p-2">
                  <FileText className="size-4 shrink-0 text-blue-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-slate-800">{file.name}</p>
                    <p className="text-xs text-slate-400">{file.size} · {file.uploadedAt}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false) }}
              className={`rounded-lg border-2 border-dashed p-4 text-center transition-colors ${dragging ? "border-blue-400 bg-blue-50" : "border-border bg-slate-50"}`}
            >
              <Upload className="mx-auto mb-1 size-5 text-slate-400" />
              <p className="text-xs font-medium text-slate-600">Drop files here or</p>
              <Button variant="link" size="xs" className="mt-0.5">browse</Button>
              <p className="mt-1 text-xs text-slate-400">PDF, XLSX, DOCX up to 25MB</p>
            </div>
          </div>

          {/* Linked rule */}
          {activity.linkedRegulatoryRule && (
            <div className="rounded-xl border border-border bg-white p-4">
              <h2 className="mb-3 text-sm font-semibold text-slate-800">Linked Regulatory Rule</h2>
              <Link href={`/rrm/${activity.linkedRegulatoryRule}`}
                className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 hover:bg-blue-100 transition-colors">
                <LinkIcon className="size-4 text-blue-600" />
                <div>
                  <p className="text-xs font-semibold text-blue-800">{activity.linkedRegulatoryRule}</p>
                  <p className="text-xs text-blue-600">PSD2 Fraud Reporting Update</p>
                </div>
              </Link>
            </div>
          )}

          {/* Officers */}
          <div className="rounded-xl border border-border bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold text-slate-800">Team</h2>
            <div className="flex flex-col gap-3">
              {[
                { label: "Lead Officer", person: activity.leadOfficer },
                { label: "Activity Owner", person: activity.owner },
              ].map(({ label, person }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800">{person.initials}</div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{person.name}</p>
                    <p className="text-xs text-slate-400">{label} · {person.region}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reminders */}
          <div className="rounded-xl border border-border bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold text-slate-800">Reminders</h2>
            <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-green-600" />
                <span className="text-xs text-green-700">Activity completed — no reminders active</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-3 w-full">Configure Reminders</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
