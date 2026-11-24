import { useState, type CSSProperties } from "react"
import {
  CardContent,
  EmptyState,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "aperia-ds5"
import { TitledCard } from "../recipes"
import { cn } from "@/lib/utils"
import { BeforeAfter, Screen } from "./before-after"

// Sales Portal's pipeline over one quarter: how many opportunities reached each stage, and of those that stopped at a
// stage, how many were lost there and how many are still there.
type Stage = { name: string; reached: number; lost: number; open: number }

const STAGES: Stage[] = [
  { name: "Discovery", reached: 120, lost: 30, open: 12 },
  { name: "Qualification", reached: 78, lost: 20, open: 12 },
  { name: "Demo", reached: 46, lost: 13, open: 8 },
  { name: "Proposal", reached: 25, lost: 6, open: 5 },
  { name: "Closed Won", reached: 14, lost: 0, open: 0 },
]

// Inline, so the fills never depend on a class being generated: the app's chart colors, and stripes of the first.
const MOVED: CSSProperties = { background: "var(--chart-1)" }
const LOST: CSSProperties = { background: "var(--chart-3)" }
const OPEN: CSSProperties = {
  background:
    "repeating-linear-gradient(135deg, color-mix(in oklab, var(--chart-1) 40%, transparent) 0 3px, color-mix(in oklab, var(--chart-1) 12%, transparent) 3px 7px)",
}

const FILLS = [
  { style: MOVED, label: "Moved to Next Stage" },
  { style: LOST, label: "Lost" },
  { style: OPEN, label: "In Progress" },
]

const share = (part: number, whole: number) =>
  whole === 0 ? "0%" : `${Math.round((part / whole) * 100)}%`

function Legend() {
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
      {FILLS.map(({ style, label }) => (
        <span key={label} className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-xs" style={style} aria-hidden />
          {label}
        </span>
      ))}
    </span>
  )
}

/** The one sentence a stage says, to a screen reader and in its card. */
function sentence(stage: Stage, next: Stage | undefined, first: number) {
  const reached = `${stage.reached} of ${first} opportunities reached ${stage.name} (${share(stage.reached, first)})`
  if (!next) return `${reached}.`
  return `${reached}: ${next.reached} moved to the next stage, ${stage.lost} were lost there and ${stage.open} are still there.`
}

const BAR = 140

function StageColumn({
  stage,
  next,
  first,
  isFirst,
}: {
  stage: Stage
  next: Stage | undefined
  first: number
  isFirst: boolean
}) {
  const [open, setOpen] = useState(false)
  const height = (count: number) =>
    count === 0 ? 0 : Math.max(3, (count / first) * BAR)
  const onward = stage.reached - stage.lost - stage.open
  const parts = next
    ? [
        { style: MOVED, label: "Moved to Next Stage", count: next.reached },
        { style: LOST, label: "Lost", count: stage.lost },
        { style: OPEN, label: "In Progress", count: stage.open },
      ]
    : []
  return (
    <HoverCard
      open={open}
      onOpenChange={setOpen}
      openDelay={80}
      closeDelay={80}
    >
      <HoverCardTrigger asChild>
        {/* One Tab stop per stage, named by its sentence. A tap opens the card too: Radix's hover card ignores touch. */}
        <div
          tabIndex={0}
          role="img"
          aria-label={sentence(stage, next, first)}
          onClick={() => setOpen((was) => !was)}
          className={cn(
            "row-span-2 grid min-w-0 grid-rows-subgrid gap-y-3 rounded-md px-2 py-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
            open && "bg-muted/50"
          )}
        >
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm text-muted-foreground">
              {stage.name}
            </span>
            <span className="flex flex-wrap items-center gap-x-2">
              <span className="text-2xl font-semibold tabular-nums">
                {stage.reached}
              </span>
              <span className="rounded-sm bg-muted px-1 text-xs font-medium tabular-nums">
                {share(stage.reached, first)}
              </span>
            </span>
          </div>
          <div className="flex items-end" style={{ height: BAR }}>
            <div
              className={cn(
                "flex w-3/5 shrink-0 flex-col-reverse overflow-hidden rounded-t-md",
                isFirst && "rounded-bl-md",
                !next && "rounded-br-md"
              )}
            >
              <div style={{ ...MOVED, height: height(onward) }} />
              {stage.lost > 0 && (
                <div style={{ ...LOST, height: height(stage.lost) }} />
              )}
              {stage.open > 0 && (
                <div style={{ ...OPEN, height: height(stage.open) }} />
              )}
            </div>
            {/* The wedge from this bar's moved-on part to the next bar, carried through both columns' padding. */}
            {next && (
              <div className="relative -mr-4 flex-1 self-stretch">
                <svg
                  className="absolute inset-0 size-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <polygon
                    points={`0,${100 - (onward / first) * 100} 100,${100 - (next.reached / first) * 100} 100,100 0,100`}
                    fill="var(--chart-1)"
                    fillOpacity={0.1}
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </HoverCardTrigger>
      {/* Below the bar, so it never covers what it describes; laid out like a chart's tooltip. */}
      <HoverCardContent
        side="bottom"
        align="start"
        sideOffset={8}
        className="flex w-64 flex-col gap-1.5 bg-card p-2.5 text-xs"
      >
        <span className="font-medium">{stage.name}</span>
        <span className="flex justify-between gap-6 tabular-nums">
          <span className="text-muted-foreground">Reached</span>
          {stage.reached} of {first} ({share(stage.reached, first)})
        </span>
        {parts.map(({ style, label, count }) => (
          <span
            key={label}
            className="flex items-center justify-between gap-6 tabular-nums"
          >
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="size-2.5 rounded-xs" style={style} aria-hidden />
              {label}
            </span>
            {count}
          </span>
        ))}
      </HoverCardContent>
    </HoverCard>
  )
}

function Funnel({ stages }: { stages: Stage[] }) {
  const first = stages[0]?.reached ?? 0
  if (first === 0) return <EmptyState title="No Opportunities" />
  return (
    // Scrolls sideways on a phone rather than squeezing five bars into 390px.
    <div className="overflow-x-auto">
      <div
        className="grid min-w-[36rem] grid-rows-[auto_auto]"
        style={{
          gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`,
        }}
      >
        {stages.map((stage, index) => (
          <StageColumn
            key={stage.name}
            stage={stage}
            next={stages[index + 1]}
            first={first}
            isFirst={index === 0}
          />
        ))}
      </div>
    </div>
  )
}

/** The dashboard's funnel for the quarter, and the same card in a quarter where nobody reached the first stage. */
export function FunnelChartExample() {
  return (
    <Screen caption="Point at a stage, Tab to it or tap it. The page’s subtitle, 10/01/2026–12/31/2026, is the span both cards count.">
      <TitledCard title="Pipeline Funnel" action={<Legend />}>
        <CardContent className="pb-4">
          <Funnel stages={STAGES} />
        </CardContent>
      </TitledCard>
      <TitledCard title="Pipeline Funnel" action={<Legend />}>
        <CardContent className="pb-4">
          <Funnel
            stages={STAGES.map((stage) => ({
              ...stage,
              reached: 0,
              lost: 0,
              open: 0,
            }))}
          />
        </CardContent>
      </TitledCard>
    </Screen>
  )
}

// The drift: each stage its own color from outside the chart palette, no legend, and nothing on who stopped where.
const RAINBOW = ["#a855f7", "#2dd4bf", "#ec4899", "#fbbf24", "#84cc16"]

export function FunnelChartBeforeAfter() {
  const first = STAGES[0].reached
  return (
    <BeforeAfter
      beforeNote="a color per stage, off the palette, with no legend"
      afterNote="the chart palette, a legend, and each bar split"
      before={
        <TitledCard title="Funnel">
          <CardContent className="flex h-40 items-end gap-2 pb-4">
            {STAGES.map((stage, index) => (
              <div
                key={stage.name}
                className="flex min-w-0 flex-1 flex-col items-center gap-1"
              >
                <span className="text-xs tabular-nums">{stage.reached}</span>
                <div
                  className="w-full rounded-t-sm"
                  style={{
                    background: RAINBOW[index],
                    height: (stage.reached / first) * 100,
                  }}
                />
              </div>
            ))}
          </CardContent>
        </TitledCard>
      }
      after={
        <TitledCard title="Pipeline Funnel" action={<Legend />}>
          <CardContent className="pb-4">
            <Funnel stages={STAGES} />
          </CardContent>
        </TitledCard>
      }
    />
  )
}

export const funnelChartExamples = {
  "How it looks and behaves": <FunnelChartExample />,
  "Before and after": <FunnelChartBeforeAfter />,
}
