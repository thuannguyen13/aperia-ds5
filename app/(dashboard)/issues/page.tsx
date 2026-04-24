"use client"

import { useState, useMemo } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table"
import { Download, ChevronUp, ChevronDown, ChevronsUpDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button/button"
import { KpiCard } from "@/components/dashboard/KpiCard"
import { SeverityBadge } from "@/components/dashboard/SeverityBadge"
import { PageHeaderSetter } from "@/components/layout/PageHeaderSetter"
import { Badge } from "@/components/ui/badge/badge"
import { Card, CardContent } from "@/components/ui/card/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group/input-group"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

type Severity   = "LOW" | "MODERATE" | "HIGH" | "CRITICAL"
type IssueStatus = "OPEN" | "IN_REMEDIATION" | "PENDING_VALIDATION" | "CLOSED"
type IssueType  = "DIRECT" | "INDIRECT" | "CAAS"

interface Issue {
  id:          string
  name:        string
  severity:    Severity
  lob:         string
  type:        IssueType
  source:      string
  status:      IssueStatus
  opened:      string
  dueDate:     string
  daysPastDue: number
  owner:       string
}

const issues: Issue[] = [
  { id: "ISS-45608", name: "Critical Operational Risk — Issuer Processing Gap",   severity: "CRITICAL", lob: "Issuer Solutions",    type: "DIRECT",   source: "Internal Audit", status: "OPEN",               opened: "Dec 10, 2024", dueDate: "Oct 22, 2025", daysPastDue: 183, owner: "John Smith"  },
  { id: "ISS-45807", name: "AML Transaction Monitoring Deficiency",                severity: "CRITICAL", lob: "Issuer Solutions",    type: "DIRECT",   source: "2nd Line",       status: "IN_REMEDIATION",    opened: "Feb 20, 2025", dueDate: "Feb 21, 2026", daysPastDue: 61,  owner: "Jane Doe"    },
  { id: "ISS-45957", name: "Policy Documentation Gap — Corporate",                 severity: "LOW",      lob: "Corporate & Other",   type: "INDIRECT", source: "Business ID",    status: "OPEN",               opened: "Mar 5, 2025",  dueDate: "Mar 10, 2026", daysPastDue: 44,  owner: "Mark Wilson" },
  { id: "ISS-45953", name: "Regulatory Compliance Risk — Policy Alignment",        severity: "MODERATE", lob: "Corporate & Other",   type: "DIRECT",   source: "Business ID",    status: "OPEN",               opened: "Mar 1, 2025",  dueDate: "Apr 22, 2026", daysPastDue: 1,   owner: "Sara Brown"  },
  { id: "ISS-46001", name: "Customer Data Handling Deficiency",                    severity: "HIGH",     lob: "Financial Solutions", type: "DIRECT",   source: "Internal Audit", status: "OPEN",               opened: "Jan 15, 2026", dueDate: "May 15, 2026", daysPastDue: 0,   owner: "Alice Park"  },
  { id: "ISS-46002", name: "KYC Process Control Weakness",                         severity: "CRITICAL", lob: "Financial Solutions", type: "DIRECT",   source: "2nd Line",       status: "IN_REMEDIATION",    opened: "Feb 1, 2026",  dueDate: "Apr 30, 2026", daysPastDue: 0,   owner: "Derek Lane"  },
  { id: "ISS-46003", name: "GDPR Data Retention Non-Compliance",                   severity: "HIGH",     lob: "EMEA",                type: "DIRECT",   source: "External",       status: "OPEN",               opened: "Jan 20, 2026", dueDate: "May 5, 2026",  daysPastDue: 0,   owner: "Boris Klein" },
  { id: "ISS-46004", name: "Sanctions Screening Gap — EMEA Ops",                   severity: "MODERATE", lob: "EMEA",                type: "INDIRECT", source: "2nd Line",       status: "OPEN",               opened: "Feb 10, 2026", dueDate: "May 20, 2026", daysPastDue: 0,   owner: "Elena Ford"  },
  { id: "ISS-46005", name: "Vendor Due Diligence Shortfall",                       severity: "LOW",      lob: "Merchant Solutions",  type: "DIRECT",   source: "Business ID",    status: "PENDING_VALIDATION", opened: "Mar 1, 2026",  dueDate: "Jun 10, 2026", daysPastDue: 0,   owner: "Carla Nunes" },
  { id: "ISS-46006", name: "Fair Lending Assessment Gap",                          severity: "HIGH",     lob: "Corporate & Other",   type: "DIRECT",   source: "Internal Audit", status: "OPEN",               opened: "Feb 15, 2026", dueDate: "May 5, 2026",  daysPastDue: 0,   owner: "Elena Ford"  },
  { id: "ISS-46007", name: "Privacy Notice Update Needed",                         severity: "MODERATE", lob: "EMEA",                type: "INDIRECT", source: "2nd Line",       status: "OPEN",               opened: "Mar 5, 2026",  dueDate: "May 30, 2026", daysPastDue: 0,   owner: "Frank Moore" },
  { id: "ISS-46008", name: "AML Model Validation Overdue",                         severity: "HIGH",     lob: "Financial Solutions", type: "DIRECT",   source: "Internal Audit", status: "OPEN",               opened: "Jan 10, 2026", dueDate: "Apr 28, 2026", daysPastDue: 0,   owner: "Alice Park"  },
  { id: "ISS-46009", name: "Consumer Complaints Handling Process",                 severity: "MODERATE", lob: "Merchant Solutions",  type: "DIRECT",   source: "2nd Line",       status: "IN_REMEDIATION",    opened: "Feb 20, 2026", dueDate: "Jun 15, 2026", daysPastDue: 0,   owner: "Carla Nunes" },
  { id: "ISS-46010", name: "ICT Risk Control Gap — APAC",                          severity: "MODERATE", lob: "APAC",                type: "INDIRECT", source: "2nd Line",       status: "OPEN",               opened: "Mar 10, 2026", dueDate: "Jun 25, 2026", daysPastDue: 0,   owner: "Grace Xu"    },
  { id: "ISS-46011", name: "CDD Periodic Review Backlog",                          severity: "LOW",      lob: "LATAM",               type: "DIRECT",   source: "Business ID",    status: "OPEN",               opened: "Mar 15, 2026", dueDate: "Jul 1, 2026",  daysPastDue: 0,   owner: "Hugo Cruz"   },
  { id: "ISS-46012", name: "Financial Reporting Discrepancy",                      severity: "CRITICAL", lob: "Financial Solutions", type: "CAAS",     source: "External",       status: "OPEN",               opened: "Apr 1, 2026",  dueDate: "Apr 30, 2026", daysPastDue: 0,   owner: "Derek Lane"  },
]

const lobChartData = [
  { lob: "Financial Solutions", low: 22, moderate: 10, high: 2,  critical: 6 },
  { lob: "Corporate & Other",   low: 10, moderate: 19, high: 8,  critical: 1 },
  { lob: "EMEA",                low: 6,  moderate: 23, high: 8,  critical: 1 },
  { lob: "Merchant Solutions",  low: 5,  moderate: 13, high: 2,  critical: 0 },
  { lob: "APAC",                low: 0,  moderate: 2,  high: 0,  critical: 0 },
  { lob: "LATAM",               low: 0,  moderate: 0,  high: 1,  critical: 0 },
]

const sourceData = [
  { name: "Business ID",    value: 21, color: "#3b82f6" },
  { name: "2nd Line",       value: 50, color: "#f97316" },
  { name: "Internal Audit", value: 56, color: "#8b5cf6" },
  { name: "External",       value: 12, color: "#10b981" },
]

const statusClass: Record<IssueStatus, string> = {
  OPEN:                "border-transparent bg-gray-100 text-gray-700 hover:bg-gray-100",
  IN_REMEDIATION:      "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100",
  PENDING_VALIDATION:  "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100",
  CLOSED:              "border-transparent bg-green-100 text-green-800 hover:bg-green-100",
}

const col = createColumnHelper<Issue>()

const columns = [
  col.accessor("id", {
    header: "Issue ID",
    cell: info => <span className="font-mono text-xs text-slate-700">{info.getValue()}</span>,
  }),
  col.accessor("name", {
    header: "Name",
    cell: info => <p className="max-w-[200px] truncate text-xs font-medium text-slate-800">{info.getValue()}</p>,
  }),
  col.accessor("severity", {
    header: "Severity",
    cell: info => <SeverityBadge severity={info.getValue()} />,
    filterFn: "equals",
  }),
  col.accessor("lob", {
    header: "LOB",
    cell: info => <span className="whitespace-nowrap text-xs text-slate-600">{info.getValue()}</span>,
    filterFn: "equals",
  }),
  col.accessor("type", {
    header: "Type",
    cell: info => <span className="text-xs text-slate-500">{info.getValue()}</span>,
    filterFn: "equals",
  }),
  col.accessor("source", {
    header: "Source",
    cell: info => <span className="text-xs text-slate-500">{info.getValue()}</span>,
  }),
  col.accessor("opened", {
    header: "Opened",
    cell: info => <span className="whitespace-nowrap text-xs text-slate-500">{info.getValue()}</span>,
  }),
  col.accessor("dueDate", {
    header: "Due Date",
    cell: info => <span className="whitespace-nowrap text-xs text-slate-600">{info.getValue()}</span>,
  }),
  col.accessor("daysPastDue", {
    header: "Days PD",
    cell: info => info.getValue() > 0
      ? <span className="text-xs font-semibold text-red-600">{info.getValue()}d</span>
      : <span className="text-xs text-slate-400">—</span>,
  }),
  col.accessor("owner", {
    header: "Owner",
    cell: info => <span className="text-xs text-slate-600">{info.getValue()}</span>,
  }),
  col.accessor("status", {
    header: "Actions",
    enableSorting: false,
    filterFn: "equals",
    cell: info => (
      <div className="flex items-center gap-1">
        <Badge variant="outline" className={statusClass[info.getValue()]}>
          {info.getValue().replace(/_/g, " ")}
        </Badge>
        <Button variant="ghost" size="xs">View</Button>
      </div>
    ),
  }),
]

export default function IssuesPage() {
  const [globalFilter, setGlobalFilter]     = useState("")
  const [sorting, setSorting]               = useState<SortingState>([])
  const [columnFilters, setColumnFilters]   = useState<ColumnFiltersState>([])
  const [pastDueOnly, setPastDueOnly]       = useState(false)

  const lobs = useMemo(() => ["All", ...Array.from(new Set(issues.map(i => i.lob)))], [])

  const getFilter = (id: string) =>
    (columnFilters.find(f => f.id === id)?.value as string) ?? "All"

  const setFilter = (id: string, value: string) => {
    setColumnFilters(prev =>
      value === "All"
        ? prev.filter(f => f.id !== id)
        : [...prev.filter(f => f.id !== id), { id, value }]
    )
  }

  const data = useMemo(
    () => pastDueOnly ? issues.filter(i => i.daysPastDue > 0) : issues,
    [pastDueOnly]
  )

  const table = useReactTable({
    data,
    columns,
    state:           { sorting, columnFilters, globalFilter },
    onSortingChange:       setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange:  setGlobalFilter,
    globalFilterFn: (row, _colId, filterValue) => {
      const q = filterValue.toLowerCase()
      return (
        row.original.id.toLowerCase().includes(q) ||
        row.original.name.toLowerCase().includes(q) ||
        row.original.owner.toLowerCase().includes(q)
      )
    },
    getCoreRowModel:       getCoreRowModel(),
    getSortedRowModel:     getSortedRowModel(),
    getFilteredRowModel:   getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  function exportCsv() {
    const rows = [
      ["ID", "Name", "Severity", "LOB", "Type", "Source", "Status", "Opened", "Due Date", "Days PD", "Owner"],
      ...table.getFilteredRowModel().rows.map(r => {
        const i = r.original
        return [i.id, i.name, i.severity, i.lob, i.type, i.source, i.status, i.opened, i.dueDate, String(i.daysPastDue), i.owner]
      }),
    ]
    const blob = new Blob([rows.map(r => r.join(",")).join("\n")], { type: "text/csv" })
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "issues.csv" })
    a.click()
  }

  const { pageIndex } = table.getState().pagination
  const totalPages    = table.getPageCount()

  return (
    <div className="flex flex-col gap-6">
      <PageHeaderSetter title="Issues" breadcrumb={["Programs", "Issues"]} />

      {/* KPI row */}
      <div className="grid grid-cols-5 gap-4">
        <KpiCard label="Open Issues"      value={139}    subtitle="+2 vs last mo."      trend="up"   trendLabel="+1.5%" accentColor="orange" />
        <KpiCard label="Critical + High"  value={29}     subtitle="20.9% of open"       trend="down" trendLabel="-41%"  accentColor="red"    />
        <KpiCard label="Moderate"         value={67}     subtitle="48.2% of open"                                       accentColor="slate"  />
        <KpiCard label="Past Due"         value={4}      subtitle="2.9% of open"                                        accentColor="red"    />
        <KpiCard label="Avg Days Past Due" value="72.3"  subtitle="↓ from 243 last yr"  trend="down" trendLabel="-70%"  accentColor="green"  />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="col-span-3">
          <CardContent className="p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Issues by LOB and Severity</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={lobChartData} layout="vertical" margin={{ top: 4, right: 24, left: 16, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis dataKey="lob" type="category" tick={{ fontSize: 11, fill: "#64748b" }} width={130} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="low"      stackId="a" fill="#94a3b8" name="Low"      />
              <Bar dataKey="moderate" stackId="a" fill="#fbbf24" name="Moderate" />
              <Bar dataKey="high"     stackId="a" fill="#f97316" name="High"     />
              <Bar dataKey="critical" stackId="a" fill="#dc2626" name="Critical" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardContent className="p-4">
          <h2 className="mb-2 text-sm font-semibold text-slate-800">Issues by Source</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={sourceData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} dataKey="value">
                {sourceData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-1 flex flex-wrap justify-center gap-3">
            {sourceData.map(d => (
              <div key={d.name} className="flex items-center gap-1">
                <div className="size-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-xs text-slate-600">{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
          </CardContent>
        </Card>
      </div>

      {/* Issue table */}
      <Card>
      <CardContent className="p-4">
        {/* Toolbar */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h2 className="mr-2 text-sm font-semibold text-slate-800">All Issues</h2>
          <InputGroup className="w-44">
            <InputGroupAddon><Search /></InputGroupAddon>
            <InputGroupInput
              placeholder="Search…"
              value={globalFilter}
              onChange={e => { setGlobalFilter(e.target.value); table.setPageIndex(0) }}
            />
          </InputGroup>
          {[
            { id: "severity", opts: ["All", "CRITICAL", "HIGH", "MODERATE", "LOW"] },
            { id: "lob",      opts: lobs },
            { id: "type",     opts: ["All", "DIRECT", "INDIRECT", "CAAS"] },
            { id: "status",   opts: ["All", "OPEN", "IN_REMEDIATION", "PENDING_VALIDATION", "CLOSED"] },
          ].map(({ id, opts }) => (
            <Select
              key={id}
              value={getFilter(id)}
              onValueChange={v => { setFilter(id, v); table.setPageIndex(0) }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {opts.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
          ))}
          <label className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-600">
            <input
              type="checkbox"
              checked={pastDueOnly}
              onChange={e => { setPastDueOnly(e.target.checked); table.setPageIndex(0) }}
              className="size-3.5"
            />
            Past due only
          </label>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-slate-400">
              {table.getFilteredRowModel().rows.length} results
            </span>
            <Button variant="outline" size="sm" onClick={exportCsv}>
              <Download className="size-3.5" />Export CSV
            </Button>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(hg => (
              <TableRow key={hg.id} className="border-b border-border">
                {hg.headers.map(header => {
                  const canSort = header.column.getCanSort()
                  const sorted  = header.column.getIsSorted()
                  return (
                    <TableHead
                      key={header.id}
                      className="pb-2 pr-4 text-xs font-medium uppercase tracking-wider text-slate-500"
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      style={canSort ? { cursor: "pointer", userSelect: "none" } : undefined}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {canSort && (
                        sorted === "asc"  ? <ChevronUp   className="ml-1 inline size-3 text-blue-600" /> :
                        sorted === "desc" ? <ChevronDown className="ml-1 inline size-3 text-blue-600" /> :
                                            <ChevronsUpDown className="ml-1 inline size-3 text-slate-300" />
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="divide-y divide-border">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => {
                const dpd = row.original.daysPastDue
                return (
                  <TableRow
                    key={row.id}
                    className={`cursor-pointer transition-colors hover:bg-slate-50 ${dpd >= 91 ? "bg-red-50/40" : dpd > 0 ? "bg-amber-50/30" : ""}`}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="py-2.5 pr-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-10 text-center text-sm text-slate-400">
                  No issues match the current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-slate-400">
            Page {pageIndex + 1} of {totalPages || 1}
          </span>
          <div className="flex gap-1">
            <Button variant="outline" size="xs" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Prev</Button>
            <Button variant="outline" size="xs" disabled={!table.getCanNextPage()}     onClick={() => table.nextPage()}>Next</Button>
          </div>
        </div>
      </CardContent>
      </Card>
    </div>
  )
}
