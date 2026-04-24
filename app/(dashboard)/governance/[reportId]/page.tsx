import Link from "next/link"
import { ArrowLeft, AlertTriangle, Building2, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { SeverityBadge } from "@/components/dashboard/SeverityBadge"
import { PageHeaderSetter } from "@/components/layout/PageHeaderSetter"
import { Badge } from "@/components/ui/badge/badge"

const report = {
  id: "GOV-APR-2026",
  title: "April 2026 Compliance Governance Forum",
  month: "April 2026",
  status: "DRAFT",
  generatedAt: "Apr 22, 2026",
  snapshot: {
    openIssues: 139,
    criticalHigh: 29,
    pastDue: 4,
    avgDaysPastDue: 72.25,
    mtCompletion: "99.2%",
  },
}

const issuesInReport = [
  { id: "ISS-45608", name: "Critical Operational Risk — Issuer Processing Gap", severity: "CRITICAL" as const, lob: "Issuer Solutions", type: "DIRECT", source: "Internal Audit", dueDate: "Oct 22, 2025", daysPastDue: 183 },
  { id: "ISS-45807", name: "AML Transaction Monitoring Deficiency", severity: "CRITICAL" as const, lob: "Issuer Solutions", type: "DIRECT", source: "2nd Line", dueDate: "Feb 21, 2026", daysPastDue: 61 },
  { id: "ISS-46001", name: "Customer Data Handling Deficiency", severity: "HIGH" as const, lob: "Financial Solutions", type: "DIRECT", source: "Internal Audit", dueDate: "May 15, 2026", daysPastDue: 0 },
  { id: "ISS-46003", name: "GDPR Data Retention Non-Compliance", severity: "HIGH" as const, lob: "EMEA", type: "DIRECT", source: "External", dueDate: "May 5, 2026", daysPastDue: 0 },
  { id: "ISS-46002", name: "KYC Process Control Weakness", severity: "CRITICAL" as const, lob: "Financial Solutions", type: "DIRECT", source: "2nd Line", dueDate: "Apr 30, 2026", daysPastDue: 0 },
  { id: "ISS-46006", name: "Fair Lending Assessment Gap", severity: "HIGH" as const, lob: "Corporate & Other", type: "DIRECT", source: "Internal Audit", dueDate: "May 5, 2026", daysPastDue: 0 },
]

const highlights = [
  "Total open issues decreased 21% year-over-year (176 → 139).",
  "Average days past due improved dramatically from 243 days to 72.25 days.",
  "M&T program completion rate reached 99.2% (705/711 activities).",
  "4 issues remain past due; 2 are critical and require immediate escalation.",
  "FIG region accounts for all 6 past-due M&T activities.",
]

export default function GovernanceReportDetailPage({ params }: { params: { reportId: string } }) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeaderSetter title={report.title} breadcrumb={["Governance", params.reportId]} />

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/governance"><ArrowLeft className="size-3.5" />Back to Governance</Link>
        </Button>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm">Export CSV</Button>
          <Button variant="default" size="sm">Approve Report</Button>
        </div>
      </div>

      {/* Report header */}
      <div className="rounded-xl border border-border bg-white p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">{report.status}</span>
              <span className="text-xs text-slate-400">Generated {report.generatedAt}</span>
            </div>
            <h1 className="mt-2 text-xl font-semibold text-slate-900">{report.title}</h1>
          </div>
        </div>

        {/* Snapshot KPIs */}
        <div className="mt-4 grid grid-cols-5 gap-3">
          {[
            { label: "Open Issues", value: report.snapshot.openIssues, color: "text-orange-600" },
            { label: "Critical + High", value: report.snapshot.criticalHigh, color: "text-red-600" },
            { label: "Past Due", value: report.snapshot.pastDue, color: "text-red-600" },
            { label: "Avg Days PD", value: report.snapshot.avgDaysPastDue, color: "text-amber-600" },
            { label: "M&T Completion", value: report.snapshot.mtCompletion, color: "text-green-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-lg bg-slate-50 p-3 text-center">
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
              <div className="mt-0.5 text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Forum highlights */}
      <div className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">Forum Highlights</h2>
        <ul className="flex flex-col gap-2">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blue-500" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Issues in this report */}
      <div className="rounded-xl border border-border bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800">Issues Included in Report</h2>
          <span className="text-xs text-slate-400">{issuesInReport.length} selected issues</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Issue ID", "Name", "Severity", "LOB", "Type", "Source", "Due Date", "Days PD"].map(h => (
                  <th key={h} className="pb-2 pr-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {issuesInReport.map(issue => (
                <tr key={issue.id} className={`hover:bg-slate-50 ${issue.daysPastDue > 0 ? "bg-red-50/40" : ""}`}>
                  <td className="py-2.5 pr-4 font-mono text-xs text-blue-600">
                    <Link href={`/issues/${issue.id}`} className="hover:underline">{issue.id}</Link>
                  </td>
                  <td className="py-2.5 pr-4 max-w-[220px]"><p className="truncate text-xs font-medium text-slate-800">{issue.name}</p></td>
                  <td className="py-2.5 pr-4"><SeverityBadge severity={issue.severity} /></td>
                  <td className="py-2.5 pr-4 text-xs text-slate-600">{issue.lob}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500">{issue.type}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-500">{issue.source}</td>
                  <td className="py-2.5 pr-4 text-xs text-slate-600">{issue.dueDate}</td>
                  <td className="py-2.5">
                    {issue.daysPastDue > 0
                      ? <span className="text-xs font-bold text-red-600">{issue.daysPastDue}d</span>
                      : <span className="text-xs text-slate-400">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approval section */}
      <div className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-slate-800">Approval Chain</h2>
        <div className="flex items-center gap-6">
          {[
            { role: "Report Author", name: "Thomas Bennington", status: "Submitted", date: "Apr 22, 2026", color: "bg-green-100 text-green-800" },
            { role: "Program Lead Review", name: "Lena Capalbo", status: "Pending", date: "—", color: "bg-gray-100 text-gray-600" },
            { role: "CCO Approval", name: "Executive Sponsor", status: "Pending", date: "—", color: "bg-gray-100 text-gray-600" },
          ].map((step, i) => (
            <div key={i} className="flex flex-1 flex-col gap-1 rounded-lg border border-border p-3">
              <p className="text-xs font-medium text-slate-500">{step.role}</p>
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                  {step.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                </div>
                <span className="text-sm font-medium text-slate-800">{step.name}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <Badge variant="outline" className={`border-transparent hover:opacity-90 ${step.color}`}>{step.status}</Badge>
                <span className="text-xs text-slate-400">{step.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="default" size="sm">Approve Report</Button>
          <Button variant="outline" size="sm">Request Changes</Button>
        </div>
      </div>
    </div>
  )
}
