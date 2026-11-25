import { useEffect, useRef } from "react"
import {
  Bar,
  BarChart,
  CHART_MARGIN,
  ChartContainer,
  ChartGrid,
  ChartLegend,
  ChartLegendContent,
  ChartTip,
  XAxis,
  YAxis,
  chartAxisProps,
  type ChartConfig,
} from "@/components/ui/chart"
import { Anatomy } from "../anatomy"
import { TitledCard } from "../recipes"

// The Anatomy drawing of the Charts page: a bar chart of created and won opportunities in a titled card, with the
// tooltip open on one month. The chart is the one the page's In code section builds, from the same parts (the
// `@/components/ui/chart` module is what the `aperia-ds5/chart` subpath publishes). Each part is marked in the order of
// the part list in charts.md.

const MONTHS = [
  { month: "Jun", created: 15, won: 5 },
  { month: "Jul", created: 13, won: 4 },
  { month: "Aug", created: 16, won: 4 },
  { month: "Sep", created: 12, won: 4 },
  { month: "Oct", created: 21, won: 5 },
  { month: "Nov", created: 17, won: 4 },
]

const CONFIG: ChartConfig = {
  created: { label: "Created", color: "var(--chart-1)" },
  won: { label: "Won", color: "var(--chart-2)" },
}

const axis = chartAxisProps()

/** A real pointer over the third month opens the tooltip; the drawing sends one move there once the chart has size. */
function useOpenTooltip() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let tries = 0
    const timer = setInterval(() => {
      const wrapper = root.current?.querySelector(".recharts-wrapper")
      const bar = root.current?.querySelectorAll(".recharts-bar-rectangle")[2]
      tries += 1
      if (root.current?.querySelector(".recharts-tooltip-wrapper")?.textContent)
        return clearInterval(timer)
      if (wrapper && bar) {
        const box = bar.getBoundingClientRect()
        wrapper.dispatchEvent(
          new MouseEvent("mousemove", {
            bubbles: true,
            clientX: box.left + box.width / 2,
            clientY: box.top + box.height / 2,
          })
        )
      }
      if (tries > 20) clearInterval(timer)
    }, 150)
    return () => clearInterval(timer)
  }, [])
  return root
}

function ChartDrawing() {
  const root = useOpenTooltip()
  return (
    <div ref={root} className="w-[36rem] max-w-full">
      <TitledCard title="Opportunities by Month" figure="94 created">
        <div className="px-4 pb-4">
          <ChartContainer config={CONFIG} className="h-64 w-full">
            <BarChart data={MONTHS} margin={CHART_MARGIN}>
              <ChartGrid />
              <XAxis dataKey="month" {...axis} />
              <YAxis allowDecimals={false} {...axis} />
              <ChartTip />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="created" fill="var(--color-created)" radius={4} />
              <Bar dataKey="won" fill="var(--color-won)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </TitledCard>
    </div>
  )
}

export const chartsAnatomy = (
  <Anatomy
    targets={{
      1: { selector: "[data-slot=card-header]", side: "left" },
      2: { selector: ".recharts-bar-rectangle path", side: ["top", "right"] },
      3: { selector: ".recharts-cartesian-grid", side: "right" },
      // recharts draws the labels in a layer of their own, apart from the axis group, which measures 0 by 0.
      4: { selector: ".recharts-yAxis-tick-labels", side: "left" },
      5: { selector: ".recharts-legend-wrapper", side: "bottom" },
      6: { selector: ".recharts-tooltip-wrapper", side: "right" },
    }}
  >
    <ChartDrawing />
  </Anatomy>
)
