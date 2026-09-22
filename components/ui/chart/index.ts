// The complete chart surface, published as the "aperia-ds5/chart" subpath.
//
// The recharts primitives are re-exported here and not from the root barrel because
// recharts' `Label` and `Tooltip` collide with the DS5 components of those names: a
// star export loses to an explicit one, so `import { Label } from "aperia-ds5"` would
// silently resolve to the form label rather than the chart one.
export * from "recharts"

export {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
} from "./chart"
export {
  CHART_AXIS,
  CHART_MARGIN,
  ChartGrid,
  ChartTip,
  chartAxisProps,
} from "./chart-defaults"
