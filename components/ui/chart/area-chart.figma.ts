// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=517-111675
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/node_modules/recharts/types/chart/AreaChart.d.ts
// component=AreaChart

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  Basic: "natural",
  Linear: "linear",
  Step: "step",
  Stacked: "natural",
  "Stacked Expanded": "natural",
})
const stackOffset = figma.selectedInstance.getEnum("Type", {
  Basic: undefined,
  Linear: undefined,
  Step: undefined,
  Stacked: undefined,
  "Stacked Expanded": "expand",
})
const grid = figma.selectedInstance.getBoolean("Show Grid", {
  true: figma.helpers.react.jsxElement("<ChartGrid />"),
  false: undefined,
})
const legend = figma.selectedInstance.getBoolean("Show Legend", {
  true: figma.helpers.react.jsxElement(
    "<ChartLegend content={<ChartLegendContent />} />",
  ),
  false: undefined,
})

export default {
  id: "AreaChart",
  imports: [
    'import { Area, AreaChart, XAxis, YAxis, CHART_MARGIN, ChartContainer, ChartGrid, ChartLegend, ChartLegendContent, ChartTip, chartAxisProps } from "aperia-ds5/chart"',
  ],
  example: figma.code`<ChartContainer config={chartConfig} className="h-64 w-full">
        <AreaChart data={chartData}${figma.helpers.react.renderProp(
          "stackOffset",
          stackOffset,
        )} margin={CHART_MARGIN}>
          ${figma.helpers.react.renderChildren(grid)}
          <XAxis dataKey="month" {...chartAxisProps()}/>
          <YAxis {...chartAxisProps()}/>
          <ChartTip indicator="line"/>
          ${figma.helpers.react.renderChildren(legend)}
          {/* One <Area> per series; stacked areas share a stackId. Gradient=Yes: fill from a <linearGradient> in <defs> */}
          <Area dataKey="desktop"${figma.helpers.react.renderProp(
            "type",
            type,
          )} fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)"/>
        </AreaChart>
      </ChartContainer>`,
  metadata: { nestable: true },
}
