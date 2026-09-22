"use client"

// House chart chrome. It lives beside chart.tsx rather than inside it because chart.tsx
// is refreshed with `npx shadcn@latest add chart --overwrite` and diffed, which would
// clobber anything added there.

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"
import { ChartTooltip, ChartTooltipContent } from "./chart"

/** Axis chrome: no axis line, no tick marks, 8px between the plot and its labels. */
const CHART_AXIS = { tickLine: false, axisLine: false, tickMargin: 8 } as const

/**
 * Left stays 0 because <YAxis> reserves its own width; the gap it needs is not margin.
 * Bottom stays 0 because tickMargin already holds the x labels off the plot.
 */
const CHART_MARGIN = { top: 4, right: 8, bottom: 0, left: 0 } as const

/** The dashed grid, horizontal by default. */
function ChartGrid({ vertical = false }: { vertical?: boolean }) {
  return (
    <RechartsPrimitive.CartesianGrid
      vertical={vertical}
      horizontal={!vertical}
      strokeDasharray="3 3"
    />
  )
}

// The row is justify-between, so without a wider min-w the label and its value nearly
// touch at the default min-w-32.
const TOOLTIP_SPACING = "min-w-44 [&_.justify-between]:gap-6"

/** ChartTooltip carrying the house spacing. Takes whatever ChartTooltipContent takes. */
function ChartTip({
  className,
  indicator = "dot",
  ...props
}: React.ComponentProps<typeof ChartTooltipContent>) {
  return (
    <ChartTooltip
      content={
        <ChartTooltipContent
          indicator={indicator}
          className={cn(TOOLTIP_SPACING, className)}
          {...props}
        />
      }
    />
  )
}

/**
 * CHART_AXIS plus the tick density a width allows; spread onto every axis. Recharts
 * measures label collisions in pixels, so a 390px axis has room for two or three dates,
 * not eight. Pass `narrow` from whatever measures the chart's width.
 */
function chartAxisProps(narrow = false) {
  return {
    ...CHART_AXIS,
    tick: { fontSize: narrow ? 10 : 11 },
    // preserveStartEnd keeps the first and last label whatever else drops, so a narrow
    // axis still says what range it covers. Never interval={0}, which forces every label
    // and switches collision handling off entirely.
    interval: "preserveStartEnd" as const,
    minTickGap: narrow ? 24 : 8,
  }
}

export { CHART_AXIS, CHART_MARGIN, ChartGrid, ChartTip, chartAxisProps }
