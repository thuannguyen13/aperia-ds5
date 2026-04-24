# Fiserv Compliance Platform — Full Design Specification

> **Purpose:** This document is the authoritative instruction set for Claude Code to build the Fiserv Regulatory Compliance Platform. Follow every section in order. Do not skip sections or substitute patterns without explicit instruction.

---

## 1. Context & Problem Statement

Fiserv's Global Regulatory Compliance team manages 700+ annual Monitoring & Testing activities, 12,000+ Archer compliance issues (filtered to ~139 open at any time), regulatory rules intake, and monthly Governance Forum reporting — all through a fragmented stack of Archer modules, SharePoint spreadsheets, and manual Excel/PowerPoint pipelines.

**Core pain points driving this build:**
- Thomas (Governance Reporting) spends 75–100% of his bandwidth in Forum weeks pulling from ~12,000 Archer issues, building charts manually, and copy-pasting into PowerPoint.
- Lena (RRM) runs 3–5 Archer reports per metric per month; no smart prioritization — every rule alert gets the same flat 45-day SLA.
- 40+ compliance officers share a 700-activity SharePoint spreadsheet with no workflow, no automated reminders, no evidence linking.
- No "my work" view for any officer. Managers chase officers for status via email.
- No cross-program visibility — RRM → CRA → M&T linkages are manual; officers like Lena can't see downstream impact of their regulatory assessments.

**What success looks like:**
- A single officer ("Susie") signs in and sees everything she owes across all programs with a weekly digest replacing manual chasing.
- Tom pre-assembles the Governance Forum from live data; leadership gets a drillable dashboard.
- Automated feeds replace SharePoint spreadsheets; evidence links are managed in-system.
- Quick-win automations land in 6 months: unified dashboard, task/alert tracking, audit-ready reporting, early automation of M&T plan status.

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 14** (App Router) | Full-stack, RSC for data-heavy pages, file-based API routes |
| Language | **TypeScript** (strict mode) | Required throughout; no `any` |
| ORM | **Prisma** | Type-safe, migration-based, works cleanly with Next.js |
| Database | **PostgreSQL** (via Supabase or local Docker) | Relational data model, JSON columns for flexible metadata |
| Auth | **NextAuth.js v5** (Credentials + JWT) | RBAC-ready, simple to seed with test users |
| UI Components | **shadcn/ui** (Radix primitives + Tailwind) | Accessible, composable, no runtime CSS-in-JS |
| Styling | **Tailwind CSS v3** | Utility-first, consistent with shadcn |
| Charts | **Recharts** | React-native, works with RSC data passing |
| State / Fetching | **TanStack Query v5** (client) + **server actions** | Mutations via server actions; reads via RSC where possible |
| Email / Alerts | **Resend** (or stub with `console.log`) | Transactional email for officer digest and reminders |
| File Upload | **uploadthing** or local `/public/uploads` | Evidence attachment for M&T activities |
| Icons | **lucide-react** | Tree-shakeable, shadcn-compatible |
| Date | **date-fns** | Lightweight, no locale issues |
| Form | **react-hook-form** + **zod** | Paired for validation everywhere |
| Testing | **Vitest** + **React Testing Library** | Unit + integration; Playwright for E2E |

---

## 3. Project Structure

```
/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx                  # Sidebar + topnav shell
│   │   ├── page.tsx                    # Exec summary / home
│   │   ├── my-work/page.tsx            # Officer "my work" view (Susie's view)
│   │   ├── governance/
│   │   │   ├── page.tsx                # Governance Forum dashboard (Tom's view)
│   │   │   └── [reportId]/page.tsx     # Drillable issue detail
│   │   ├── rrm/
│   │   │   ├── page.tsx                # RRM Metrics Board (Lena's view)
│   │   │   └── [alertId]/page.tsx      # Rule alert detail
│   │   ├── monitoring-testing/
│   │   │   ├── page.tsx                # M&T Program dashboard
│   │   │   ├── activities/page.tsx     # Full activity table
│   │   │   └── [activityId]/page.tsx   # Activity detail + evidence
│   │   ├── issues/
│   │   │   ├── page.tsx                # Issues dashboard
│   │   │   └── [issueId]/page.tsx      # Issue detail + MAPS
│   │   ├── workflows/
│   │   │   ├── page.tsx                # All active workflows
│   │   │   └── [workflowId]/page.tsx   # Workflow instance detail
│   │   ├── policies/page.tsx
│   │   ├── qar/page.tsx
│   │   └── admin/
│   │       ├── users/page.tsx
│   │       ├── alerts/page.tsx
│   │       └── integrations/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── activities/route.ts
│       ├── activities/[id]/route.ts
│       ├── issues/route.ts
│       ├── issues/[id]/route.ts
│       ├── rrm/alerts/route.ts
│       ├── governance/report/route.ts
│       ├── workflows/route.ts
│       ├── users/route.ts
│       ├── notifications/route.ts
│       └── seed/route.ts               # Dev-only data seeder
├── components/
│   ├── ui/                             # shadcn primitives (auto-generated)
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── TopNav.tsx
│   │   └── PageHeader.tsx
│   ├── dashboard/
│   │   ├── KpiCard.tsx
│   │   ├── SeverityBadge.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── SlaProgressBar.tsx
│   │   ├── RegionalCompletionChart.tsx
│   │   ├── MonthlyVelocityChart.tsx
│   │   ├── SeverityDonutChart.tsx
│   │   ├── IssueSourceBarChart.tsx
│   │   └── ActivityTypeChart.tsx
│   ├── governance/
│   │   ├── IssueTable.tsx
│   │   ├── IssueFilters.tsx
│   │   ├── SeverityMatrix.tsx
│   │   └── ExportButton.tsx
│   ├── rrm/
│   │   ├── RegulationTrackerTable.tsx
│   │   ├── AlertFeed.tsx
│   │   └── SlaCountdown.tsx
│   ├── mt/
│   │   ├── ActivityTable.tsx
│   │   ├── ActivityForm.tsx
│   │   ├── EvidenceUploader.tsx
│   │   └── ReminderPanel.tsx
│   ├── my-work/
│   │   ├── TaskList.tsx
│   │   └── WeeklyDigestPreview.tsx
│   └── shared/
│       ├── DataTable.tsx               # Reusable sortable/filterable table
│       ├── FilterBar.tsx
│       ├── DateRangePicker.tsx
│       ├── EmptyState.tsx
│       ├── LoadingSkeleton.tsx
│       └── ConfirmDialog.tsx
├── lib/
│   ├── prisma.ts                       # Prisma client singleton
│   ├── auth.ts                         # NextAuth config
│   ├── sla.ts                          # SLA computation utilities
│   ├── alerts.ts                       # Notification / reminder engine
│   ├── export.ts                       # CSV / report export helpers
│   └── utils.ts                        # General utilities + cn()
├── prisma/
│   ├── schema.prisma
│   └── seed.ts                         # Seed from real data shape
├── types/
│   └── index.ts                        # Global TypeScript types
├── hooks/
│   ├── useActivities.ts
│   ├── useIssues.ts
│   ├── useMyWork.ts
│   └── useNotifications.ts
├── actions/
│   ├── activities.ts                   # Server actions
│   ├── issues.ts
│   ├── rrm.ts
│   ├── workflows.ts
│   └── notifications.ts
└── middleware.ts                        # Route protection by role
```

---

## 4. Database Schema (Prisma)

Create `prisma/schema.prisma` with the following models. Use PostgreSQL as the provider.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── AUTH & USERS ─────────────────────────────────────────────────────────────

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  passwordHash  String
  role          UserRole
  region        String?   // APAC, EMEA, LATAM, North America, Global
  lob           String?   // Line of Business
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  ownedActivities   Activity[]       @relation("ActivityOwner")
  leadActivities    Activity[]       @relation("ActivityLead")
  assignedIssues    Issue[]          @relation("IssueOwner")
  workflowTasks     WorkflowTask[]
  notifications     Notification[]
  sessions          Session[]
}

enum UserRole {
  ADMIN
  PROGRAM_LEAD      // Can author plans, approve activities
  LEAD_OFFICER      // Can view cross-LOB, approve officer work
  OFFICER           // Does M&T activities
  READ_ONLY         // Governance Forum attendees
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  user      User     @relation(fields: [userId], references: [id])
}

// ─── M&T ACTIVITIES ───────────────────────────────────────────────────────────

model Activity {
  id                   String           @id @default(cuid())
  referenceId          String           @unique // e.g. "EMEA-2025-061"
  region               Region
  programArea          String           // Financial Crimes Compliance, Privacy, Fairness, etc.
  lob                  String           // Line of Business
  country              String?
  productFamily        String?
  productArea          String?
  rationale            String?
  activityType         ActivityType
  activityTypeRationale String?
  name                 String
  description          String
  scopePeriod          String?
  frequency            Frequency
  frequencyRationale   String?
  previouslyRun        Boolean          @default(false)
  frequencyChanged     Boolean?
  frequencyChangeRationale String?
  anticipatedStartDate DateTime?
  targetCompletionDate DateTime?
  actualCompletionDate DateTime?
  completionStatus     CompletionStatus @default(PLANNED)
  evidenceUploaded     Boolean          @default(false)
  evidenceUrl          String?
  linkedRegulatoryRule String?
  erisIssueCount       Int              @default(0)
  erisIssueNumbers     String[]
  observationCount     Int              @default(0)
  observationDesc      String?
  notes                String?

  // Ownership
  leadOfficerId   String?
  ownerId         String?
  leadOfficer     User?    @relation("ActivityLead", fields: [leadOfficerId], references: [id])
  owner           User?    @relation("ActivityOwner", fields: [ownerId], references: [id])

  // Relations
  linkedIssues    Issue[]
  evidence        Evidence[]
  reminders       Reminder[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([region])
  @@index([completionStatus])
  @@index([frequency])
  @@index([leadOfficerId])
}

enum Region {
  NORTH_AMERICA
  EMEA
  APAC
  LATAM
  GLOBAL
}

enum ActivityType {
  MONITORING
  TESTING
}

enum Frequency {
  ONE_TIME
  MONTHLY
  BI_MONTHLY
  QUARTERLY
  BI_ANNUALLY
  ANNUALLY
}

enum CompletionStatus {
  PLANNED
  IN_PROGRESS
  COMPLETED
  DEFERRED
  CANCELLED
  PAST_DUE
}

model Evidence {
  id          String   @id @default(cuid())
  activityId  String
  activity    Activity @relation(fields: [activityId], references: [id])
  fileName    String
  fileUrl     String
  uploadedAt  DateTime @default(now())
  uploadedBy  String
}

// ─── ISSUES ───────────────────────────────────────────────────────────────────

model Issue {
  id                   String         @id @default(cuid())
  sourceId             String?        @unique // Archer issue ID e.g. "Issue-12345"
  name                 String
  description          String
  workflowStatus       IssueStatus
  severityRating       SeverityLevel
  riskLevel1           String?        // Operational Risk, Regulatory Compliance Risk, etc.
  riskLevel2           String?
  lob                  String
  region               String?
  country              String?
  legalEntity          String?
  issueType            IssueType      @default(DIRECT)
  identificationMethod String?
  issueSourceL1        String?        // Business ID, 2nd Line Assessment, Internal Audit, External
  issueSourceL2        String?
  rootCauseL1          String?
  rootCauseL2          String?
  relatedEnterpriseRisk String?
  regulatoryImpact     Boolean        @default(false)
  clientRegulatoryImpact Boolean      @default(false)
  dateIdentified       DateTime?
  dateCreated          DateTime?
  dateOpened           DateTime?
  dateClosed           DateTime?
  originalDueDate      DateTime?
  currentDueDate       DateTime?
  daysPastDue          Int            @default(0)
  mapsCount            Int            @default(0)  // Milestones/Action Plans

  ownerId   String?
  owner     User?   @relation("IssueOwner", fields: [ownerId], references: [id])

  linkedActivities Activity[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([severityRating])
  @@index([workflowStatus])
  @@index([lob])
  @@index([currentDueDate])
}

enum IssueStatus {
  OPEN
  IN_REMEDIATION
  PENDING_VALIDATION
  CLOSED
}

enum SeverityLevel {
  LOW
  MODERATE
  HIGH
  CRITICAL
}

enum IssueType {
  DIRECT
  INDIRECT
  CAAS
}

// ─── RRM (Regulatory Rules Management) ────────────────────────────────────────

model RegulatoryAlert {
  id                   String       @id @default(cuid())
  externalId           String?      @unique  // Thomson Reuters ID
  title                String
  description          String
  jurisdiction         String
  regulatoryBody       String?
  effectiveDate        DateTime?
  alertReceivedDate    DateTime     @default(now())
  priority             AlertPriority @default(STANDARD)
  status               AlertStatus  @default(NEW)
  slaDays              Int          @default(45)   // Smart SLA: computed from priority + effective date
  slaDueDate           DateTime?
  applicabilityVerdict String?      // Yes / No / Under Review
  applicabilityNotes   String?
  aiPageCount          Int?         // Document page count
  documentUrl          String?

  assessments  RrmAssessment[]
  linkedIssues Issue[]          @relation() // Via junction if needed

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([status])
  @@index([slaDueDate])
  @@index([priority])
}

enum AlertPriority {
  LOW
  STANDARD
  HIGH
  CRITICAL
}

enum AlertStatus {
  NEW
  IN_REVIEW
  ASSESSED
  CLOSED
}

model RrmAssessment {
  id           String          @id @default(cuid())
  alertId      String
  alert        RegulatoryAlert @relation(fields: [alertId], references: [id])
  assessorId   String
  verdict      String          // Applicable / Not Applicable / Needs Further Review
  notes        String?
  completedAt  DateTime?
  createdAt    DateTime        @default(now())
}

// ─── GOVERNANCE REPORTING ─────────────────────────────────────────────────────

model GovernanceReport {
  id            String       @id @default(cuid())
  title         String       // e.g. "April 2026 Compliance Governance Forum"
  reportMonth   DateTime     // First day of the report month
  status        ReportStatus @default(DRAFT)
  generatedAt   DateTime?
  approvedAt    DateTime?
  approvedBy    String?
  exportedAt    DateTime?
  exportUrl     String?      // Link to generated PPT/PDF

  // Snapshot data at generation time (JSON)
  snapshotData  Json?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum ReportStatus {
  DRAFT
  IN_REVIEW
  APPROVED
  PUBLISHED
}

// ─── WORKFLOWS ────────────────────────────────────────────────────────────────

model WorkflowTemplate {
  id          String @id @default(cuid())
  name        String // e.g. "Annual Product Family Review", "BCP Update"
  description String?
  steps       Json   // Array of step definitions: [{name, role, sla_days, requires_approval}]
  isActive    Boolean @default(true)

  instances   WorkflowInstance[]
  createdAt   DateTime @default(now())
}

model WorkflowInstance {
  id          String           @id @default(cuid())
  templateId  String
  template    WorkflowTemplate @relation(fields: [templateId], references: [id])
  title       String
  status      WorkflowStatus   @default(IN_PROGRESS)
  dueDate     DateTime?
  completedAt DateTime?
  metadata    Json?

  tasks     WorkflowTask[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model WorkflowTask {
  id          String         @id @default(cuid())
  instanceId  String
  instance    WorkflowInstance @relation(fields: [instanceId], references: [id])
  stepIndex   Int
  stepName    String
  assigneeId  String
  assignee    User           @relation(fields: [assigneeId], references: [id])
  status      TaskStatus     @default(PENDING)
  dueDate     DateTime?
  completedAt DateTime?
  notes       String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum WorkflowStatus {
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum TaskStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
  OVERDUE
}

// ─── NOTIFICATIONS & REMINDERS ────────────────────────────────────────────────

model Notification {
  id        String           @id @default(cuid())
  userId    String
  user      User             @relation(fields: [userId], references: [id])
  type      NotificationType
  title     String
  message   String
  entityId  String?          // ID of the related entity
  entityType String?         // "activity" | "issue" | "alert" | "workflow"
  read      Boolean          @default(false)
  sentAt    DateTime         @default(now())
}

enum NotificationType {
  TASK_DUE
  TASK_OVERDUE
  ISSUE_ESCALATED
  SLA_WARNING
  WEEKLY_DIGEST
  REMINDER
  APPROVAL_NEEDED
}

model Reminder {
  id          String    @id @default(cuid())
  activityId  String
  activity    Activity  @relation(fields: [activityId], references: [id])
  scheduledAt DateTime
  sentAt      DateTime?
  message     String?
}

// ─── POLICY MANAGEMENT ────────────────────────────────────────────────────────

model Policy {
  id              String       @id @default(cuid())
  title           String
  description     String?
  owner           String
  lob             String?
  region          String?
  status          PolicyStatus @default(DRAFT)
  effectiveDate   DateTime?
  nextReviewDate  DateTime?
  documentUrl     String?
  version         String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum PolicyStatus {
  DRAFT
  IN_REVIEW
  APPROVED
  ACTIVE
  ARCHIVED
}

// ─── AUDIT LOG ────────────────────────────────────────────────────────────────

model AuditLog {
  id         String   @id @default(cuid())
  userId     String
  action     String   // CREATE | UPDATE | DELETE | APPROVE | EXPORT
  entityType String   // activity | issue | alert | report | workflow
  entityId   String
  before     Json?
  after      Json?
  createdAt  DateTime @default(now())

  @@index([entityType, entityId])
  @@index([userId])
}
```

---

## 5. Seed Data (`prisma/seed.ts`)

The seeder must create:

### Users (8 minimum)
```typescript
const users = [
  { email: "thomas.bennington@fiserv.com", name: "Thomas Bennington", role: "PROGRAM_LEAD", region: "GLOBAL" },
  { email: "lena.capalbo@fiserv.com", name: "Lena Capalbo", role: "LEAD_OFFICER", region: "GLOBAL" },
  { email: "richard.pooley@fiserv.com", name: "Richard Pooley", role: "LEAD_OFFICER", region: "EMEA" },
  { email: "ed.friedman@fiserv.com", name: "Ed Friedman", role: "LEAD_OFFICER", region: "NORTH_AMERICA" },
  { email: "jason.hollingsworth@fiserv.com", name: "Jason Hollingsworth", role: "LEAD_OFFICER", region: "NORTH_AMERICA" },
  { email: "kelly.thewes@fiserv.com", name: "Kelly Thewes", role: "LEAD_OFFICER", region: "GLOBAL" },
  { email: "susie.officer@fiserv.com", name: "Susie Officer", role: "OFFICER", region: "NORTH_AMERICA" },
  { email: "admin@fiserv.com", name: "Admin User", role: "ADMIN", region: "GLOBAL" },
]
// Password for all: "Password123!" (hashed with bcrypt)
```

### M&T Activities (seed from the real data shape)
Seed **at least 60 activities** covering all regions, statuses, types, and frequencies. Use the actual `referenceId` format from the file (e.g., `EMEA-2025-061`). Include:
- 10+ Completed activities per major region (EMEA, NA, APAC, LATAM)
- Mix of Monitoring and Testing types
- Mix of frequencies (Monthly, Quarterly, Annually, One-Time)
- Several PAST_DUE activities for realism
- 2026 planned activities with future completion dates
- Evidence links for completed ones

Key examples to include from the real data:
- EMEA-2025-061: Daily Sanctions upload review (Richard Pooley / Dawn Dale, Completed)
- FCC-2025-075: I-9 Monitoring (Jason Hollingsworth, Completed)
- MER-2025-032: Clover Capital - California annual reporting (Jo-Ann Teng, Completed)
- PRIV-2025-018: Privacy Incident QA (Kelly Thewes, Completed)
- FIG-2025-033: Monitoring of Regulatory Client Inquiries (Ed Friedman, Completed)

### Issues (seed 50+)
Based on the real aggregate shape:
- Total: 139 open issues
- By severity: Low (43), Moderate (67), High (21), Critical (8)
- By LOB: Financial Solutions (40), Corporate/Other (38), EMEA (38), Merchant (20), APAC (2), LATAM (1)
- By source: Business ID (21), 2nd Line (50), Internal Audit (56), External (12)
- Past due: 4 total (1 at 91+ days, 2 at 31-90, 1 at 1-30)
- Direct: 107 | Indirect: 32

Include these real past-due issues in seed:
```
Issue created 45608, due 45930 (183 days past due) - Issuer Solutions, Critical, Operational Risk
Issue created 45807, due 46052 (61 days past due) - Issuer Solutions, Critical, Operational Risk
Issue created 45957, due 46069 (44 days past due) - Corporate, Low, Regulatory Compliance Risk
Issue created 45953, due 46112 (1 day past due) - Corporate, Moderate, Regulatory Compliance Risk
```
(Note: those are Excel serial dates; convert to actual dates in the seed.)

### M&T Velocity Data
Seed the monthly completion counts from the M&T chart file:
```
Apr 2025: 14, May: 40, Jun: 93, Jul: 129, Aug: 184, Sep: 268
Oct: 326, Nov: 384, Dec: 483, Jan 2026: 546, Feb: 598, Mar: 705
Monitoring: 413, Testing: 292, Total plan: 711
```
Store as `GovernanceReport` snapshots or as JSON metadata on the Activity records.

### LOB Completion by Region
```
ACH: 5/5, FIG: 64/70 (6 past due), Merchant: 56/56,
Issuer: 19/19, APAC: 64/64, EMEA: 187/187,
LATAM: 76/76, FCC: 171/171, Privacy: 60/60, DCS: 3/3
```

### Regulatory Alerts (RRM — 10 minimum)
```typescript
// Mix of priorities and statuses
{ title: "CFPB Regulation F Update", jurisdiction: "US", priority: "HIGH", status: "IN_REVIEW", slaDays: 30 },
{ title: "EU AI Act Compliance Requirements", jurisdiction: "EU", priority: "CRITICAL", status: "NEW", slaDays: 15 },
{ title: "PSD2 Fraud Reporting Update", jurisdiction: "EMEA", priority: "STANDARD", status: "ASSESSED", slaDays: 45 },
{ title: "KNF IT/IS KRI Reporting Changes", jurisdiction: "Poland", priority: "STANDARD", status: "NEW", slaDays: 45 },
// ... 6 more
```

---

## 6. API Routes

All routes return `{ data, error, meta }` JSON envelope. Use Next.js App Router route handlers. All routes except auth require a valid session. Apply role checks per the RBAC table in Section 9.

### Activities
```
GET    /api/activities              ?region=&status=&type=&frequency=&officer=&page=&limit=
POST   /api/activities              Body: CreateActivityDto
GET    /api/activities/:id
PUT    /api/activities/:id          Body: UpdateActivityDto
PATCH  /api/activities/:id/status   Body: { status, completionDate?, notes? }
POST   /api/activities/:id/evidence Body: FormData (file upload)
GET    /api/activities/stats        Returns KPI aggregates (completion %, by-region, by-type)
```

### Issues
```
GET    /api/issues                  ?severity=&lob=&type=&status=&pastDue=&page=&limit=
POST   /api/issues
GET    /api/issues/:id
PUT    /api/issues/:id
GET    /api/issues/stats            Returns severity counts, LOB breakdown, past-due list, Y-o-Y
```

### Governance Report
```
GET    /api/governance/report       ?month=YYYY-MM (defaults to current month)
POST   /api/governance/report       Generate a new report snapshot
GET    /api/governance/report/:id
PUT    /api/governance/report/:id   Approve/publish
GET    /api/governance/report/:id/export  Returns CSV/JSON for export
```

### RRM
```
GET    /api/rrm/alerts              ?status=&priority=&jurisdiction=&page=&limit=
POST   /api/rrm/alerts
GET    /api/rrm/alerts/:id
PUT    /api/rrm/alerts/:id
POST   /api/rrm/alerts/:id/assess   Body: { verdict, notes }
GET    /api/rrm/stats               SLA health, overdue count, volume by jurisdiction
```

### My Work
```
GET    /api/my-work                 Returns tasks/activities/issues/alerts for current user
GET    /api/my-work/digest          Returns weekly digest payload
```

### Workflows
```
GET    /api/workflows/templates
POST   /api/workflows/templates
GET    /api/workflows
POST   /api/workflows              Launch workflow from template
GET    /api/workflows/:id
PUT    /api/workflows/:id/tasks/:taskId  Complete or reassign a task
```

### Notifications
```
GET    /api/notifications           Current user's notifications
PATCH  /api/notifications/:id/read
POST   /api/notifications/send-digest   Admin/cron: trigger weekly digest
```

### Users (Admin only)
```
GET    /api/users
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

---

## 7. Feature Modules — Detailed Specifications

### 7.1 Unified Dashboard (Exec Summary)

**Route:** `/`  
**Audience:** All roles (read-only sees fewer controls)

**Layout: 4 rows**

**Row 1 — Program KPI Cards (6 cards)**
```
┌─────────────────┬────────────────┬────────────────┬────────────────┬────────────────┬────────────────┐
│ Open Issues     │ Critical/High  │ M&T Completion │ Past-Due       │ RRM Alerts     │ Policies       │
│ 139             │ 29             │ 99.2%          │ 4              │ In-SLA: 8      │ Due for Review │
│ +2 vs last mo.  │ 21%            │ 705/711        │ 2.9% of total  │ Overdue: 1     │ 3              │
└─────────────────┴────────────────┴────────────────┴────────────────┴────────────────┴────────────────┘
```
Each `KpiCard` props: `{ label, value, subtitle, trend?: 'up'|'down'|'flat', accentColor }`.

**Row 2 — Charts (3 columns)**
- **Col 1 (50%):** M&T Monthly Velocity — `MonthlyVelocityChart`: stacked bar (Monitoring vs Testing) over 12 months. Use the real data: Apr 2025 (14) through Mar 2026 (705 cumulative). Show per-month completions: 14, 26, 53, 36, 55, 84, 58, 58, 99, 63, 52, 107.
- **Col 2 (25%):** Issues by Severity — `SeverityDonutChart`: donut chart. Low (43, gray), Moderate (67, amber), High (21, orange), Critical (8, red). Center shows total (139).
- **Col 3 (25%):** Issues by Source — `IssueSourceBarChart`: horizontal bar. Business ID (21), 2nd Line (50), Internal Audit (56), External (12).

**Row 3 — Regional M&T Completion (full width)**
`RegionalCompletionChart`: stacked horizontal bar per LOB/region showing Completed vs Past Due vs Planned. Use the real LOB data:
```
ACH: 5 committed, 5 completed
FIG: 70 committed, 64 completed, 6 past due
Merchant: 56/56
Issuer: 19/19
APAC: 64/64
EMEA: 187/187
LATAM: 76/76
FCC: 171/171
Privacy: 60/60
DCS: 3/3
```

**Row 4 — Recent Activity Feed + Past-Due Alerts**
- Left (60%): Recent completions feed — last 10 activity completions, with name, officer, region, date.
- Right (40%): `ReminderPanel` — past-due items across all programs, color-coded by severity/urgency.

---

### 7.2 Officer "My Work" View

**Route:** `/my-work`  
**Audience:** OFFICER, LEAD_OFFICER (shows own + team for leads)

**Purpose:** Replace "Andrew chasing officers 5 times." This is the single sign-in view for Susie.

**Layout:**

**Top — Personal Summary Strip**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Good morning, Susie. You have 3 open items due this week.                 │
│  📋 2 M&T Activities  |  ⚠️ 1 Issue Requiring Input  |  🔔 0 Overdue      │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Tabbed Content: "My Activities" | "My Issues" | "My Workflow Tasks" | "Notifications"**

**My Activities tab:**
- Filterable table of activities where `ownerId = currentUser.id`
- Columns: Reference ID, Name, Type, Frequency, Target Date, Status, Evidence Uploaded
- Row actions: Mark Complete, Upload Evidence, Add Note
- Past-due rows highlighted in amber/red
- "Mark Complete" opens a drawer with: Actual completion date, Evidence file upload, ERIS issue count, Observation description, Notes

**My Issues tab:**
- Table of issues assigned to current user
- Columns: Issue ID, Name, Severity badge, Days Past Due, Current Due Date, Source
- Row action: View Detail, Update Status

**Notifications tab:**
- Bell-icon list of all notifications for this user
- Filter: All | Unread | Tasks | Reminders | Escalations
- "Mark all read" action

**Weekly Digest Preview (Sidebar card):**
Shows a preview of the automated weekly digest email that will be sent each Monday. Button: "Send Now" (admin only).

---

### 7.3 Governance Reporting Dashboard (Tom's View)

**Route:** `/governance`  
**Audience:** PROGRAM_LEAD, LEAD_OFFICER, READ_ONLY

**Purpose:** Pre-assemble the monthly Governance Forum package from live data. Eliminate the manual Archer → Excel → PowerPoint pipeline.

**Layout:**

**Top bar — Report Selector + Status**
```
[April 2026 Governance Forum ▼]  Status: DRAFT   [Generate Report]  [Export]  [Approve]
```
Dropdown shows last 12 months. Generate button builds a `GovernanceReport` snapshot from live data.

**Row 1 — Forum KPI Cards (5 cards)**
```
Open Issues: 139 | Critical+High: 29 (20.9%) | Past Due: 4 (2.9%) | Avg Days Past Due: 72.25 | vs Last Year: -21%
```
Each metric has a Y-o-Y comparison arrow. Pulled from real data:
- Current: 139 open, 4 past due (2.9%), 72.25 avg days, 29 critical/high
- Last year: 176 open, 1 past due (1%), 243 avg days, 49 critical/high

**Row 2 — Issues by LOB (full width)**
Stacked horizontal bar chart:
```
Financial Solutions: Low(22) Moderate(10) High(2) Critical(6) = 40
Corporate & Other: Low(10) Moderate(19) High(8) Critical(1) = 38
EMEA: Low(6) Moderate(23) High(8) Critical(1) = 38
Merchant Solutions: Low(5) Moderate(13) High(2) Critical(0) = 20
APAC: Low(0) Moderate(2) High(0) Critical(0) = 2
LATAM: Low(0) Moderate(0) High(1) Critical(0) = 1
```
Color coding: Low = slate-400, Moderate = amber-400, High = orange-500, Critical = red-600

**Row 3 — Issues by Source + Past Due Table (2 columns)**
- Left (40%): Donut chart — Business ID (21), 2nd Line (50), Audit (56), External (12)
- Right (60%): Past Due table
  ```
  Columns: Issue ID | Severity | LOB | Days Past Due | Due Date | Owner | Type
  ```
  Show 4 real past-due issues. Red rows for 91+ days (183 days). Amber for 31-90. Yellow for 1-30.

**Row 4 — Full Issue Table (drillable)**
`IssueTable` component with columns:
```
Issue ID | Name (truncated) | Severity | LOB | Type | Source | Opened | Due Date | Days Past Due | Owner
```
Features:
- Client-side sort on every column
- Filter bar: Severity, LOB, Type (Direct/Indirect), Source, Status, Past Due only toggle
- Row click → `/governance/[issueId]` for detail
- Pagination: 25 per page
- Export button: downloads filtered view as CSV

**Export functionality:**
The `ExportButton` generates a structured CSV with all current filter state applied. In the future this feeds PowerPoint generation. For now, CSV is sufficient.

---

### 7.4 RRM Metrics Board (Lena's View)

**Route:** `/rrm`  
**Audience:** PROGRAM_LEAD, LEAD_OFFICER

**Purpose:** Replace Lena's 3-5 manual Archer report pulls per metric. Surface regulatory rule alerts from Thomson Reuters, track assessment workflow, expose downstream issue linkage she currently lacks.

**Layout:**

**Row 1 — RRM KPI Cards (blue accent, distinct from orange Issues accent)**
```
┌────────────────┬───────────────┬────────────────┬──────────────────┬────────────────┐
│ Total Alerts   │ In Review     │ Past SLA       │ Avg Review Days  │ Linked Issues  │
│ 10             │ 3             │ 1              │ 18.4             │ 7              │
│ This month     │ Within SLA    │ Overdue        │ vs 45-day SLA    │ Downstream     │
└────────────────┴───────────────┴────────────────┴──────────────────┴────────────────┘
```

**Row 2 — Charts (2 columns)**
- Left (50%): Alert Volume by Jurisdiction — bar chart (US, EU, UK, Poland, Brazil, etc.)
- Right (50%): SLA Health — horizontal progress bars per priority level showing % within SLA vs overdue

**Row 3 — Unified Regulation Tracker Table (full width)**
This is the core RRM component. One row per regulatory alert.

```
Columns:
│ Alert ID │ Title │ Jurisdiction │ Priority │ Received │ Effective Date │ SLA Progress │ Status │ Linked Issues │ Assignee │ Actions │
```

**SLA Progress column** (`SlaProgressBar`):
- Shows a color-coded inline progress bar: days elapsed / SLA days
- < 50%: green | 50-80%: amber | 80-99%: orange | 100%+: red (overdue)
- Tooltip shows exact days remaining

**Linked Issues column:**
- Badge with count of linked Archer/ERIS issues
- Hover popover shows issue names and severities
- This gives Lena visibility into downstream impact she currently lacks

**Priority badge colors:**
- CRITICAL: red-600 | HIGH: orange-500 | STANDARD: blue-500 | LOW: slate-400

**Row actions:**
- "Assess": Opens assessment drawer with verdict dropdown (Applicable / Not Applicable / Needs Review) and notes field
- "View Detail": Links to `/rrm/[alertId]`

**Row 4 — AI Applicability Feed (left) + Data Quality Flags (right)**
- Left: Feed of recent regulatory alert summaries. Each card shows: title, jurisdiction, page count (page icon + number, NOT "pp"), received date, AI-suggested applicability.
- Right: Data quality flag panel — alerts missing required fields (effective date, assignee, etc.)

**Smart SLA Logic** (`lib/sla.ts`):
```typescript
// SLA is NOT a flat 45 days. Compute based on:
// - Alert priority: CRITICAL → 15 days, HIGH → 30 days, STANDARD → 45 days, LOW → 60 days
// - Compliance effective date: if effective date is < SLA deadline, SLA = effective date - 5 days
function computeSlaDueDate(alert: RegulatoryAlert): Date {
  const base = alert.alertReceivedDate
  const priorityDays = { CRITICAL: 15, HIGH: 30, STANDARD: 45, LOW: 60 }[alert.priority]
  const deadlineFromPriority = addDays(base, priorityDays)
  if (alert.effectiveDate) {
    const deadlineFromEffective = subDays(alert.effectiveDate, 5)
    return min([deadlineFromPriority, deadlineFromEffective])
  }
  return deadlineFromPriority
}
```
Store computed `slaDueDate` on the `RegulatoryAlert` record at creation.

---

### 7.5 M&T Program Dashboard

**Route:** `/monitoring-testing`  
**Audience:** All roles

**Purpose:** Replace the 700-activity SharePoint spreadsheet. Give leads a completion dashboard; give officers their activity queue; give admins reminder controls.

**Layout:**

**Row 1 — M&T KPI Cards (4 cards)**
```
Total Activities: 711 | Completed: 705 (99.2%) | In Progress: 3 | Past Due: 6 (FIG)
```

**Row 2 — Velocity Chart + Type Breakdown (2 columns)**
- Left (65%): `MonthlyVelocityChart` — bar chart per month (Apr 2025 – Mar 2026), stacked Monitoring vs Testing
  - Real data: Apr(13/1), May(32/8), Jun(69/24), Jul(92/37), Aug(124/60), Sep(160/82), Oct(216/110), Nov(245/139), Dec(283/200), Jan'26(317/229), Feb(351/247), Mar(413/292)
- Right (35%): `ActivityTypeChart` — two donut charts side by side (Monitoring 413/711, Testing 298/711)

**Row 3 — Regional Completion (full width)**
`RegionalCompletionChart`: Horizontal stacked bar. LOBs on Y-axis. Completed (blue), Past Due (red), Outstanding (gray). Data from the LOB completion table in the seed.

**Row 4 — Activity Table with Filters**
Tabbed: "All" | "My Activities" | "Past Due" | "Planned"

Table columns:
```
Reference ID | Region | LOB | Program Area | Activity Name | Type | Frequency | Owner | Target Date | Status | Evidence | Actions
```

Filters above table:
```
[Region ▼] [LOB ▼] [Program Area ▼] [Activity Type ▼] [Frequency ▼] [Status ▼] [Date Range] [Search 🔍]
```

Row actions:
- "Complete": Opens completion drawer (same as My Work view)
- "View": Links to `/monitoring-testing/[activityId]`

**Row 5 — Automated Reminder Panel**
Card on the right sidebar (or separate tab):
```
Upcoming Due (next 7 days): [N activities]
Overdue: [N activities]
[Configure Reminders] button → opens admin reminder settings
```

Reminder settings (admin): frequency (daily/weekly), recipient logic (owner + lead officer), message template.

---

### 7.6 Activity Detail Page

**Route:** `/monitoring-testing/[activityId]`

**Layout: Two-column**

**Left column (65%) — Activity Info**
- Header: Reference ID, Name, Status badge, Type badge
- Metadata grid: Region, LOB, Program Area, Country, Product Family, Frequency, Scope Period
- Rationale section
- Completion section: Dates, Evidence uploaded status, ERIS issue count with linked issue numbers, Observation count and description
- Notes/comments
- Activity history timeline (from AuditLog)

**Right column (35%) — Actions + Links**
- Status update dropdown (role-controlled)
- Evidence Uploader: drag-and-drop file upload, shows existing evidence files
- Linked Issues: list of linked ERIS issues with severity badges and link-outs
- Linked Regulatory Rule: if `linkedRegulatoryRule` is set, link to RRM alert
- Reminder settings for this specific activity
- Lead Officer and Activity Owner cards with avatar + contact info

---

### 7.7 Workflow Engine

**Route:** `/workflows`

Pre-built workflow templates (from the discovery pain points):

```typescript
const templates = [
  {
    name: "Annual Product Family Review",
    steps: [
      { name: "Collect Input from Officers", role: "OFFICER", sla_days: 14 },
      { name: "Lead Officer Review", role: "LEAD_OFFICER", sla_days: 7 },
      { name: "CCO Sign-off", role: "PROGRAM_LEAD", sla_days: 5 }
    ]
  },
  {
    name: "BCP Update",
    steps: [
      { name: "Draft Update", role: "OFFICER", sla_days: 10 },
      { name: "Manager Approval", role: "LEAD_OFFICER", sla_days: 5 },
      { name: "CCO Approval", role: "PROGRAM_LEAD", sla_days: 5 }
    ]
  },
  {
    name: "Vendor Forecast",
    steps: [
      { name: "Finance Input", role: "OFFICER", sla_days: 7 },
      { name: "Compliance Review", role: "LEAD_OFFICER", sla_days: 5 }
    ]
  },
  {
    name: "Post-Effective-Date M&T Trigger",
    steps: [
      { name: "M&T Activity Assignment", role: "PROGRAM_LEAD", sla_days: 2 },
      { name: "Officer Execution", role: "OFFICER", sla_days: 30 },
      { name: "Lead Review", role: "LEAD_OFFICER", sla_days: 7 }
    ]
  }
]
```

**Workflow list page:** table of all active workflow instances. Columns: Name, Template, Status, Due Date, # Tasks Remaining, Actions.

**Launch workflow:** button + template picker modal → creates WorkflowInstance + WorkflowTask records.

**Workflow detail page:** step-by-step progress visualization. Current step highlighted. Each task shows assignee, due date, status. Task owner can click "Complete" with notes.

---

### 7.8 Admin Panel

**Route:** `/admin`  
**Audience:** ADMIN only (enforced by middleware)

**Tabs:**
- **Users:** CRUD table. Columns: Name, Email, Role, Region, LOB, Created. Row actions: Edit, Deactivate, Reset Password.
- **Reminder Config:** Configure global reminder rules: which events trigger notifications, frequency, email template. Per-entity overrides.
- **Integrations:** Status cards for: Archer (last sync), Thomson Reuters (last pull), SharePoint (last sync). Each has a "Sync Now" button (logs to AuditLog; actual integration is stubbed).
- **Audit Log:** Full AuditLog table. Filters: User, Entity Type, Action, Date Range.

---

## 8. Key UI Components — Detailed Specs

### `KpiCard`
```typescript
interface KpiCardProps {
  label: string
  value: string | number
  subtitle?: string
  trend?: 'up' | 'down' | 'flat'
  trendLabel?: string
  accentColor?: 'blue' | 'orange' | 'red' | 'green' | 'slate'
  icon?: LucideIcon
  onClick?: () => void  // Navigate to filtered view
}
```
Design: white card, thin colored left-border per accentColor, large value in `text-3xl font-bold`, trend arrow in colored text.

### `SeverityBadge`
```typescript
// LOW = slate | MODERATE = amber | HIGH = orange | CRITICAL = red
// Pill shape, uppercase text, solid fill
```

### `StatusBadge`
```typescript
// PLANNED = gray | IN_PROGRESS = blue | COMPLETED = green | PAST_DUE = red | DEFERRED = slate
```

### `SlaProgressBar`
```typescript
interface SlaProgressBarProps {
  daysElapsed: number
  slaDays: number
  showLabel?: boolean  // "12 of 45 days"
}
// Width = (daysElapsed / slaDays) * 100%
// Color: < 50% = green, 50-80% = amber, 80-100% = orange, > 100% = red (overflow)
// Capped visually at 100% width; overflow shown in red text
```

### `DataTable`
Reusable table with:
- Sort on any column (client-side for ≤ 500 rows, server-side for large sets)
- Column visibility toggle
- Density toggle (compact / comfortable)
- Pagination (10/25/50 per page)
- Row selection (checkboxes) for bulk actions
- Sticky header
- Export selected rows as CSV

### `FilterBar`
- Multi-select dropdowns
- Date range picker (from shadcn calendar)
- Search input with debounce (300ms)
- "Clear all filters" link
- Active filter count badge on filter button

### `RegionalCompletionChart`
```typescript
// Recharts BarChart, layout="vertical"
// Each bar = one LOB. Stacked: Completed (blue-500), PastDue (red-500), Outstanding (slate-200)
// X-axis: 0 to max committed
// Y-axis: LOB names
// Tooltip shows: committed, completed, past due, % complete
```

### `MonthlyVelocityChart`
```typescript
// Recharts ComposedChart
// Bars: Monitoring (blue-400) and Testing (violet-400) stacked per month
// Line: Cumulative total (gray-600, dashed)
// X-axis: month labels (Apr '25 ... Mar '26)
// Y-axis: count
// Tooltip: month, monitoring, testing, cumulative
```

---

## 9. RBAC — Role-Based Access Control

### Middleware (`middleware.ts`)
Intercept all `/(dashboard)/*` routes. Check session. Check role against route map:

```typescript
const routeRoleMap: Record<string, UserRole[]> = {
  '/admin':       ['ADMIN'],
  '/governance':  ['ADMIN', 'PROGRAM_LEAD', 'LEAD_OFFICER', 'READ_ONLY'],
  '/rrm':         ['ADMIN', 'PROGRAM_LEAD', 'LEAD_OFFICER'],
  '/workflows':   ['ADMIN', 'PROGRAM_LEAD', 'LEAD_OFFICER'],
  '/my-work':     ['ADMIN', 'PROGRAM_LEAD', 'LEAD_OFFICER', 'OFFICER'],
  // All others: all authenticated roles
}
```

### Capability Matrix

| Capability | ADMIN | PROGRAM_LEAD | LEAD_OFFICER | OFFICER | READ_ONLY |
|---|:---:|:---:|:---:|:---:|:---:|
| View all dashboards | ✓ | ✓ | ✓ | ✓* | ✓ |
| Edit own activities | ✓ | ✓ | ✓ | ✓ | ✗ |
| Edit any activity | ✓ | ✓ | ✓ | ✗ | ✗ |
| Create/delete issues | ✓ | ✓ | ✓ | ✗ | ✗ |
| Approve governance report | ✓ | ✓ | ✗ | ✗ | ✗ |
| Launch workflows | ✓ | ✓ | ✓ | ✗ | ✗ |
| Manage users | ✓ | ✗ | ✗ | ✗ | ✗ |
| Configure reminders | ✓ | ✓ | ✗ | ✗ | ✗ |
| Export reports | ✓ | ✓ | ✓ | ✗ | ✗ |
| View Admin panel | ✓ | ✗ | ✗ | ✗ | ✗ |

*Officers see only activities/issues assigned to them in "My Work"; can see aggregate dashboards in read mode.

---

## 10. Notification & Reminder Engine

### `lib/alerts.ts`

Implement the following notification triggers:

```typescript
// 1. TASK_DUE: 7 days before any activity's targetCompletionDate → notify owner + lead
// 2. TASK_OVERDUE: Day after past due → notify owner + lead + program lead
// 3. SLA_WARNING: When SLA is > 80% elapsed on RRM alert → notify alert assignee
// 4. ISSUE_ESCALATED: When issue severity changes to HIGH/CRITICAL → notify lead officer
// 5. WEEKLY_DIGEST: Every Monday 8am → compile all pending items for each officer
// 6. APPROVAL_NEEDED: When workflow task is ready for approval → notify approver
```

Weekly digest format:
```
Subject: Your Compliance Weekly Digest — Week of [DATE]

Hi [Name],

Here's your summary for this week:

📋 M&T ACTIVITIES (3 items)
- [Activity Name] — Due [DATE] — ⚠️ Due in 5 days
- [Activity Name] — Due [DATE] — ✅ Evidence needed
- [Activity Name] — OVERDUE since [DATE]

⚠️ ISSUES (1 item)
- [Issue Name] — [Severity] — Due [DATE]

[View My Work Dashboard →]
```

Store all notifications in the `Notification` table. Mark `sentAt` when delivered. UI shows unread count badge on bell icon in TopNav.

---

## 11. Navigation & Layout

### Sidebar (`components/layout/Sidebar.tsx`)
Left sidebar, collapsible. Width: 240px expanded, 64px collapsed.

```
🏠 Dashboard
📋 My Work               [N] badge (pending items)
──────────────────────
📊 Governance Reporting
⚖️  RRM (Reg Rules)
🔍 Monitoring & Testing
⚠️  Issues
──────────────────────
🔄 Workflows
📜 Policies
🔎 QAR
──────────────────────
⚙️  Admin               (ADMIN only)
```

Active item: blue-600 left border + bg-blue-50 highlight.

### TopNav (`components/layout/TopNav.tsx`)
- Left: Page title + breadcrumb
- Center: Global search bar (searches across activities, issues, alerts)
- Right: Notification bell with badge + User avatar dropdown (Profile, Switch Role [dev only], Logout)

### Color System
```
Primary: blue-600 (#2563EB) — used for RRM, primary actions
Secondary: orange-500 (#F97316) — used for Issues Management
Success: green-500 (#22C55E) — completed, on track
Warning: amber-500 (#F59E0B) — approaching due, SLA warning
Danger: red-600 (#DC2626) — overdue, critical severity
Neutral: slate-* — backgrounds, secondary text
```

### Typography
```
Page title: text-2xl font-semibold text-slate-900
Section header: text-lg font-semibold text-slate-800
KPI value: text-3xl font-bold text-slate-900
Table header: text-xs font-medium uppercase tracking-wider text-slate-500
Body: text-sm text-slate-700
Muted: text-sm text-slate-400
```

---

## 12. Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
RESEND_API_KEY="..."     # Optional; stub with console.log if not set
UPLOADTHING_SECRET="..." # Optional; use local file storage if not set
```

---

## 13. Implementation Order

Build in this sequence — each phase is independently deployable:

### Phase 1 — Foundation (Days 1-3)
1. Next.js project scaffold with TypeScript, Tailwind, shadcn/ui
2. Prisma schema + PostgreSQL connection
3. NextAuth login with seeded users
4. Sidebar + TopNav layout shell
5. Seed script with all data

### Phase 2 — M&T Dashboard (Days 4-6)
1. Activity data model + API routes
2. `/monitoring-testing` page with KPI cards
3. `RegionalCompletionChart` with real LOB data
4. `MonthlyVelocityChart` with real monthly data
5. Activity table with filters and pagination
6. Activity detail page with evidence placeholder

### Phase 3 — Governance Dashboard (Days 7-8)
1. Issues data model + API routes
2. `/governance` page with all chart components
3. `IssueTable` with full filter bar
4. Past-due table with real 4-issue data
5. Export to CSV functionality

### Phase 4 — My Work + RRM (Days 9-11)
1. `/my-work` page — personalized task view
2. Activity completion drawer with form
3. `/rrm` page — RRM Metrics Board
4. `SlaProgressBar` component
5. Smart SLA calculation logic
6. Assessment drawer

### Phase 5 — Notifications + Workflows (Days 12-14)
1. Notification model + in-app bell feed
2. Weekly digest trigger (manual button for now)
3. Workflow templates + instance creation
4. Workflow task completion flow
5. Reminder panel

### Phase 6 — Polish + Admin (Days 15-16)
1. Admin panel — Users CRUD
2. Admin panel — Audit Log
3. Admin panel — Reminder Config
4. Role-based UI hiding (show/hide controls per role)
5. Global search
6. Responsive mobile layout

---

## 14. Quality Gates

Before marking any phase complete:
- [ ] TypeScript compiles with zero errors
- [ ] All new API routes return the standard `{ data, error, meta }` envelope
- [ ] All tables are sortable and filterable
- [ ] All KPI numbers match the seed data
- [ ] Role checks are enforced on every mutating API route
- [ ] Every form uses zod validation with react-hook-form
- [ ] Loading and error states are handled for every async operation
- [ ] AuditLog entry written for every create/update/delete action
- [ ] No `console.error` silently swallowed — surface errors in the UI

---

## 15. Key Design Decisions (Rationale for Future Reference)

1. **Unified Regulation Tracker (RRM)**: The regulation tracker table deliberately merges status tracking and SLA countdown into a single table with inline SLA progress bar, avoiding the conflation problem (two unrelated functions in one card) while still giving a consolidated view.

2. **Linked Issues column in RRM**: Added specifically so Lena can see downstream impact on Thomas's issue remediation work — institutional knowledge she currently lacks. Cross-stakeholder visibility is a first-class design value.

3. **Smart SLA vs flat 45 days**: Per explicit ask from Andrew, the flat 45-day SLA for all RRM alerts is replaced with priority-driven + effective-date-aware computation. This is the `computeSlaDueDate` function in `lib/sla.ts`.

4. **Color accent semantics**: Blue = RRM, Orange = Issue Management. Used consistently across KPI cards, badges, and chart fills to help users orient across programs at a glance.

5. **Page icon + count (not "pp")**: Regulatory document page count is displayed with a `FileText` lucide icon + number. The "pp" abbreviation is never used in the UI.

6. **Server Actions for mutations**: All create/update/delete operations use Next.js Server Actions rather than client-side fetch to the API, keeping mutation logic server-side and simplifying optimistic updates via TanStack Query's `invalidateQueries`.

7. **Snapshot model for Governance Reports**: `GovernanceReport.snapshotData` stores a JSON blob of the issue counts, severity distribution, and M&T completion at generation time. This means Tom can regenerate a report for a past month without data drift — the snapshot preserves the Forum's source of truth.
