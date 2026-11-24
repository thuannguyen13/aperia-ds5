import { useState, type ReactNode } from "react"
import { DownloadIcon, UploadIcon } from "lucide-react"
import {
  Badge,
  Button,
  FieldError,
  FileDrop,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ToggleGroup,
  ToggleGroupItem,
} from "aperia-ds5"
import { ScrollTable, StatTile } from "../recipes"
import { BeforeAfter, Screen } from "./before-after"

type Status = "new" | "existing" | "repeat"
type Choice = "add" | "fill" | "skip"
type Row = {
  line: number
  name: string
  website: string
  city: string
  status: Status
  of?: number
}

const ROWS: Row[] = [
  {
    line: 2,
    name: "Northwind Payments",
    website: "northwindpay.com",
    city: "Chicago",
    status: "existing",
  },
  {
    line: 3,
    name: "Pioneer Trust",
    website: "pioneertrust.com",
    city: "Omaha",
    status: "new",
  },
  {
    line: 4,
    name: "Summit Federal",
    website: "summitfcu.org",
    city: "Denver",
    status: "new",
  },
  {
    line: 5,
    name: "Harbor Lane Bistro LLC",
    website: "harborlanebistro.com",
    city: "Portland",
    status: "new",
  },
  {
    line: 6,
    name: "Pioneer Trust",
    website: "pioneertrust.com",
    city: "Omaha",
    status: "repeat",
    of: 3,
  },
  {
    line: 7,
    name: "Maple Street Florist",
    website: "maplestreetflorist.com",
    city: "Madison",
    status: "new",
  },
]

const START: Record<number, Choice> = {
  2: "fill",
  3: "add",
  4: "add",
  5: "add",
  7: "add",
}

type Kind = "added" | "updated" | "repeats" | "skipped"
function kindOf(row: Row, choices: Record<number, Choice>): Kind {
  if (row.status === "repeat") return "repeats"
  return ({ add: "added", fill: "updated", skip: "skipped" } as const)[
    choices[row.line]
  ]
}
const LABELS: Record<Kind, (count: number) => string> = {
  added: (count) => `${count} New`,
  updated: (count) => `${count} Existing`,
  repeats: (count) => `${count} ${count === 1 ? "Duplicate" : "Duplicates"}`,
  skipped: (count) => `${count} Skipped`,
}

function Match({ row, choice }: { row: Row; choice?: Choice }) {
  if (row.status === "repeat")
    return (
      <span className="flex flex-col items-start gap-1">
        <Badge variant="destructive">Duplicate</Badge>
        <span className="text-xs text-muted-foreground">
          Same as row {row.of}
        </span>
      </span>
    )
  return (
    <Badge
      variant={
        row.status === "existing" && choice !== "add" ? "secondary" : "outline"
      }
    >
      {row.status === "existing" && choice !== "add" ? "Existing" : "New"}
    </Badge>
  )
}

/** The dialog's frame, drawn in place so the docs show it without opening it. */
function DialogFrame({
  footer,
  message,
  children,
}: {
  footer: ReactNode
  /** A refusal, shown above the buttons. */
  message?: ReactNode
  children: ReactNode
}) {
  return (
    <div
      role="group"
      aria-label="Import Prospects"
      className="flex max-h-[32rem] flex-col overflow-hidden rounded-xl bg-background shadow-lg ring-[0.5px] ring-border"
    >
      <div className="border-b px-4 py-3">
        <h2 className="text-base font-semibold">Import Prospects</h2>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
      <div className="flex flex-col gap-2 border-t px-4 py-3">
        {message}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          {footer}
        </div>
      </div>
    </div>
  )
}

function Review({
  choices,
  onChoose,
}: {
  choices: Record<number, Choice>
  onChoose: (line: number, choice: Choice) => void
}) {
  const [only, setOnly] = useState<Kind | null>(null)
  const counts = ROWS.reduce<Record<Kind, number>>(
    (sum, row) => ({
      ...sum,
      [kindOf(row, choices)]: sum[kindOf(row, choices)] + 1,
    }),
    { added: 0, updated: 0, repeats: 0, skipped: 0 }
  )
  const rows = only ? ROWS.filter((row) => kindOf(row, choices) === only) : ROWS
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2" aria-label="Show rows">
        {(Object.keys(LABELS) as Kind[])
          .filter((kind) => counts[kind] > 0)
          .map((kind) => (
            <button
              key={kind}
              type="button"
              aria-pressed={only === kind}
              onClick={() => setOnly((was) => (was === kind ? null : kind))}
              className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Badge
                variant={
                  only === kind
                    ? "default"
                    : kind === "repeats"
                      ? "destructive"
                      : "secondary"
                }
              >
                {LABELS[kind](counts[kind])}
              </Badge>
            </button>
          ))}
      </div>
      <ScrollTable label="Rows in the file" className="surface">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4 text-right">Row</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Match</TableHead>
              <TableHead className="pr-4">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.line}>
                <TableCell className="pl-4 text-right text-muted-foreground tabular-nums">
                  {row.line}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.website}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>
                  <Match row={row} choice={choices[row.line]} />
                </TableCell>
                <TableCell className="pr-4">
                  {row.status === "repeat" ? (
                    <span className="text-muted-foreground">Skip</span>
                  ) : (
                    <Select
                      value={choices[row.line]}
                      onValueChange={(value) =>
                        onChoose(row.line, value as Choice)
                      }
                    >
                      <SelectTrigger
                        size="sm"
                        className="w-44"
                        aria-label={`Action for row ${row.line}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {row.status === "existing" && (
                          <SelectItem value="fill">
                            Fill Empty Fields
                          </SelectItem>
                        )}
                        <SelectItem value="add">
                          {row.status === "existing" ? "Add as New" : "Add"}
                        </SelectItem>
                        <SelectItem value="skip">Skip</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollTable>
    </div>
  )
}

type Step = "review" | "importing" | "result"

/** The Prospects list's import: the upload panel, then Review, Importing and Result in one dialog. */
export function ImportExample() {
  const [step, setStep] = useState<Step>("review")
  const [file, setFile] = useState<string | null>(null)
  const [refusal, setRefusal] = useState<string | null>(null)
  const [choices, setChoices] = useState(START)
  const [refused, setRefused] = useState<string | null>(null)
  const importable = Object.values(choices).filter(
    (choice) => choice !== "skip"
  ).length

  function pick(files: File[]) {
    const picked = files[0]
    if (!picked) return
    if (!/\.(csv|xlsx)$/i.test(picked.name)) {
      setRefusal("File must be CSV or XLSX.")
      return
    }
    setRefusal(null)
    setFile(picked.name)
    setStep("review")
  }

  const footer =
    step === "review" ? (
      <>
        <Button variant="outline">Choose Another File</Button>
        <Button
          onClick={() =>
            importable === 0
              ? setRefused("Set at least one row to import.")
              : setStep("importing")
          }
        >
          {importable === 0
            ? "Import Prospects"
            : `Import ${importable} ${importable === 1 ? "Prospect" : "Prospects"}`}
        </Button>
      </>
    ) : step === "importing" ? (
      <Button disabled>Importing</Button>
    ) : (
      <>
        <Button variant="outline">
          <DownloadIcon data-icon="inline-start" />
          Download Failed Rows
        </Button>
        <Button onClick={() => setStep("review")}>Done</Button>
      </>
    )

  return (
    <Screen
      caption={
        file
          ? `Picked ${file}. Press a count above the table to show only those rows.`
          : "Open Import Prospects to see the upload panel. Press a count above the table to show only those rows."
      }
      controls={
        <>
          <span>Step</span>
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            aria-label="Step"
            value={step}
            onValueChange={(next) => next && setStep(next as Step)}
          >
            <ToggleGroupItem value="review">Review</ToggleGroupItem>
            <ToggleGroupItem value="importing">Importing</ToggleGroupItem>
            <ToggleGroupItem value="result">Result</ToggleGroupItem>
          </ToggleGroup>
        </>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Prospects</h1>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <UploadIcon data-icon="inline-start" />
                Import Prospects
              </Button>
            </PopoverTrigger>
            {/* Two groups, the file and the templates, each with its own inset; the line between them runs edge to edge. */}
            <PopoverContent
              align="end"
              className="w-popover-lg max-w-[calc(100vw-2rem)] gap-0 p-0"
            >
              <div className="flex flex-col gap-3 p-3">
                <PopoverHeader>
                  <PopoverTitle>Import Prospects</PopoverTitle>
                </PopoverHeader>
                <FileDrop
                  id="import-file"
                  label="Prospects file"
                  accept=".csv,.xlsx"
                  hint="CSV or XLSX, up to 5,000 rows."
                  onFiles={pick}
                />
                {refusal && (
                  <p className="text-sm text-destructive">{refusal}</p>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t p-3">
                <PopoverDescription>Need a template?</PopoverDescription>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <DownloadIcon data-icon="inline-start" />
                    CSV
                  </Button>
                  <Button variant="outline" size="sm">
                    <DownloadIcon data-icon="inline-start" />
                    XLSX
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button>Add Prospect</Button>
        </div>
      </div>
      <DialogFrame
        footer={footer}
        message={
          step === "review" && refused ? (
            <FieldError className="sm:text-right">{refused}</FieldError>
          ) : undefined
        }
      >
        {step === "review" && (
          <Review
            choices={choices}
            onChoose={(line, choice) => {
              setRefused(null)
              setChoices((was) => ({ ...was, [line]: choice }))
            }}
          />
        )}
        {step === "importing" && (
          <div className="flex flex-col gap-2 py-8">
            <Progress value={30} aria-label="Import progress" />
            <p className="text-sm text-muted-foreground tabular-nums">
              Importing 120 of 400
            </p>
          </div>
        )}
        {step === "result" && (
          <div className="grid grid-cols-2 gap-4 @2xl:grid-cols-4">
            <StatTile label="New Added" value={4} />
            <StatTile label="Existing Updated" value={1} />
            <StatTile label="Skipped" value={1} />
            <StatTile label="Failed" value={2} />
          </div>
        )}
      </DialogFrame>
    </Screen>
  )
}

/** A list of rows and Submit, against Review with its counts, actions and a named button. */
export function ImportBeforeAfter() {
  return (
    <BeforeAfter
      beforeNote="rows as text, Submit, and a toast after the fact"
      afterNote="each row’s match and action before anything saves"
      before={
        <div className="flex flex-col gap-3 rounded-xl bg-background p-4 shadow-lg ring-[0.5px] ring-border">
          <h2 className="text-base font-semibold">Upload File</h2>
          <ul className="flex flex-col gap-1 text-sm">
            {ROWS.slice(0, 4).map((row) => (
              <li key={row.line}>{row.name}</li>
            ))}
          </ul>
          <Button className="self-end">Submit</Button>
          <div className="rounded-lg bg-popover p-3 text-sm shadow-md ring-[0.5px] ring-border">
            Import failed. Please try again.
          </div>
        </div>
      }
      after={
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">3 New</Badge>
            <Badge variant="secondary">1 Existing</Badge>
            <Badge variant="destructive">1 Duplicate</Badge>
          </div>
          <div className="overflow-hidden surface">
            <Table>
              <TableBody>
                {ROWS.slice(1, 3)
                  .concat(ROWS[0])
                  .map((row) => (
                    <TableRow key={row.line}>
                      <TableCell className="pl-4 text-right text-muted-foreground tabular-nums">
                        {row.line}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell className="pr-4">
                        <Match row={row} choice={START[row.line]} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          <Button className="self-end">Import 4 Prospects</Button>
        </div>
      }
    />
  )
}

export const importExamples = {
  "How it looks and behaves": <ImportExample />,
  "Before and after": <ImportBeforeAfter />,
}
