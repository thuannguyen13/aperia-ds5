import Link from "next/link"
import { ArrowLeft, FileText, Globe, Calendar, User, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { SlaProgressBar } from "@/components/dashboard/SlaProgressBar"
import { PageHeaderSetter } from "@/components/layout/PageHeaderSetter"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select"
import { Badge } from "@/components/ui/badge/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar"
import { Card, CardContent } from "@/components/ui/card/card"
import { cn } from "@/lib/utils"

const alert = {
  id: "RRM-001",
  title: "CFPB Regulation F Update",
  description: "The Consumer Financial Protection Bureau has issued updated guidance under Regulation F concerning debt collection practices, specifically expanding requirements for electronic communications and mandating additional disclosures in digital channels. Financial institutions must update their compliance programs accordingly.",
  jurisdiction: "US",
  regulatoryBody: "CFPB",
  priority: "HIGH",
  status: "IN_REVIEW",
  received: "Mar 25, 2026",
  effectiveDate: "Jun 1, 2026",
  daysElapsed: 28,
  slaDays: 30,
  assignee: "Lena Capalbo",
  pageCount: 47,
  documentUrl: "#",
  applicabilityVerdict: "Under Review",
  applicabilityNotes: "Initial review indicates applicability to Issuer Solutions and Financial Solutions LOBs. Further assessment required before confirming scope.",
  linkedIssues: [
    { id: "ISS-46001", name: "Customer Data Handling Deficiency", severity: "HIGH" as const },
    { id: "ISS-46008", name: "AML Model Validation Overdue", severity: "HIGH" as const },
    { id: "ISS-46012", name: "Financial Reporting Discrepancy", severity: "CRITICAL" as const },
  ],
}

const assessments = [
  { assessor: "Lena Capalbo", verdict: "Under Review", date: "Apr 5, 2026", notes: "Initial read complete. Likely applicable to consumer-facing products. Escalating to product leads for confirmation." },
]

const priorityClass: Record<string, string> = {
  CRITICAL: "border-transparent bg-red-100 text-red-800 hover:bg-red-100",
  HIGH:     "border-transparent bg-orange-100 text-orange-800 hover:bg-orange-100",
  STANDARD: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100",
  LOW:      "border-transparent bg-slate-100 text-slate-700 hover:bg-slate-100",
}

const severityClass: Record<string, string> = {
  CRITICAL: "border-transparent bg-red-100 text-red-800 hover:bg-red-100",
  HIGH:     "border-transparent bg-orange-100 text-orange-800 hover:bg-orange-100",
  MODERATE: "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100",
  LOW:      "border-transparent bg-slate-100 text-slate-700 hover:bg-slate-100",
}

export default function AlertDetailPage({ params }: { params: { alertId: string } }) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeaderSetter title={`Alert — ${params.alertId}`} breadcrumb={["RRM", params.alertId]} />

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/rrm"><ArrowLeft className="size-3.5" />Back to RRM</Link>
        </Button>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm"><FileText className="size-3.5" />View Document</Button>
          <Button variant="default" size="sm">Submit Assessment</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left */}
        <div className="col-span-2 flex flex-col gap-4">

          {/* Header card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-slate-500">{alert.id}</span>
                    <Badge variant="outline" className={cn("uppercase font-semibold", priorityClass[alert.priority])}>{alert.priority}</Badge>
                    <Badge variant="outline" className="border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100">{alert.status.replace("_"," ")}</Badge>
                  </div>
                  <h1 className="mt-2 text-xl font-semibold text-slate-900">{alert.title}</h1>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{alert.description}</p>

              {/* SLA bar */}
              <div className="mt-4 rounded-lg bg-slate-50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-700">SLA Progress</span>
                  <span className="text-xs text-slate-500">{alert.daysElapsed} of {alert.slaDays} days elapsed</span>
                </div>
                <SlaProgressBar daysElapsed={alert.daysElapsed} slaDays={alert.slaDays} showLabel />
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardContent className="p-5">
              <h2 className="mb-4 text-sm font-semibold text-slate-800">Alert Details</h2>
              <div className="grid grid-cols-3 gap-4 text-sm">
                {[
                  { label: "Jurisdiction", value: alert.jurisdiction, icon: Globe },
                  { label: "Regulatory Body", value: alert.regulatoryBody, icon: Globe },
                  { label: "Priority", value: alert.priority, icon: AlertTriangle },
                  { label: "Date Received", value: alert.received, icon: Calendar },
                  { label: "Effective Date", value: alert.effectiveDate, icon: Calendar },
                  { label: "Document Pages", value: alert.pageCount, icon: FileText },
                  { label: "Assignee", value: alert.assignee, icon: User },
                  { label: "Applicability", value: alert.applicabilityVerdict, icon: FileText },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label}>
                    <p className="flex items-center gap-1 text-xs font-medium text-slate-500"><Icon className="size-3" />{label}</p>
                    <p className="mt-0.5 text-sm text-slate-800">{value}</p>
                  </div>
                ))}
              </div>
              {alert.applicabilityNotes && (
                <div className="mt-4 rounded-lg bg-amber-50 border border-amber-100 p-3">
                  <p className="text-xs font-medium text-amber-800">Applicability Notes</p>
                  <p className="mt-1 text-xs text-slate-700">{alert.applicabilityNotes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assessment history */}
          <Card>
            <CardContent className="p-5">
              <h2 className="mb-4 text-sm font-semibold text-slate-800">Assessment History</h2>
              {assessments.map((a, i) => (
                <div key={i} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback className="bg-blue-100 text-blue-800">
                          {a.assessor.split(" ").map(n => n[0]).join("").slice(0,2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-slate-800">{a.assessor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100">{a.verdict}</Badge>
                      <span className="text-xs text-slate-400">{a.date}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-600">{a.notes}</p>
                </div>
              ))}
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full">+ Add Assessment</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4">
          {/* Submit assessment */}
          <Card>
            <CardContent className="p-4">
              <h2 className="mb-3 text-sm font-semibold text-slate-800">Submit Assessment</h2>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-700">Verdict</label>
                  <Select defaultValue="Applicable">
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Applicable">Applicable</SelectItem>
                      <SelectItem value="Not Applicable">Not Applicable</SelectItem>
                      <SelectItem value="Needs Further Review">Needs Further Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700">Notes</label>
                  <textarea className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm placeholder:text-slate-400" rows={4} placeholder="Assessment notes…" />
                </div>
                <Button variant="default" size="sm" className="w-full">Submit</Button>
              </div>
            </CardContent>
          </Card>

          {/* Linked issues */}
          <Card>
            <CardContent className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">Linked Issues</h2>
                <Badge variant="outline" className="border-transparent bg-orange-100 text-orange-800 font-semibold hover:bg-orange-100">{alert.linkedIssues.length}</Badge>
              </div>
              <div className="flex flex-col gap-2">
                {alert.linkedIssues.map(issue => (
                  <Link key={issue.id} href={`/issues/${issue.id}`}
                    className="flex items-center justify-between rounded-lg border border-border p-2.5 hover:bg-slate-50 transition-colors">
                    <div className="min-w-0">
                      <p className="font-mono text-xs text-blue-600">{issue.id}</p>
                      <p className="truncate text-xs text-slate-700">{issue.name}</p>
                    </div>
                    <Badge variant="outline" className={cn("ml-2 shrink-0 uppercase font-semibold", severityClass[issue.severity])}>{issue.severity}</Badge>
                  </Link>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-3 w-full">Link Issue</Button>
            </CardContent>
          </Card>

          {/* Assignee */}
          <Card>
            <CardContent className="p-4">
              <h2 className="mb-3 text-sm font-semibold text-slate-800">Assignee</h2>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-blue-100 text-blue-800">LC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-slate-800">{alert.assignee}</p>
                  <p className="text-xs text-slate-400">Lead Officer</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-3 w-full"><User className="size-3.5" />Reassign</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
