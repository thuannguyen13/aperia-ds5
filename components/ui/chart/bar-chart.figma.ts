// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=449-7503
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/node_modules/recharts/types/chart/BarChart.d.ts
// component=BarChart

import figma from "figma"

const layout = figma.selectedInstance.getEnum("Type", {
  Basic: undefined,
  Multiple: undefined,
  Label: undefined,
  Stacked: undefined,
  Negative: undefined,
  Active: undefined,
  Horizontal: "vertical",
  "Custom Label": undefined,
  Mixed: undefined,
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
  id: "BarChart",
  imports: [
    'import { Bar, BarChart, XAxis, YAxis, CHART_MARGIN, ChartContainer, ChartGrid, ChartLegend, ChartLegendContent, ChartTip, chartAxisProps } from "aperia-ds5/chart"',
  ],
  example: figma.code`<ChartContainer config={chartConfig} className="h-64 w-full">
        <BarChart data={chartData}${figma.helpers.react.renderProp(
          "layout",
          layout,
        )} margin={CHART_MARGIN}>
          ${figma.helpers.react.renderChildren(grid)}
          {/* layout="vertical": <ChartGrid vertical />, XAxis type="number", YAxis type="category" */}
          <XAxis dataKey="month" {...chartAxisProps()}/>
          <YAxis {...chartAxisProps()}/>
          <ChartTip />
          ${figma.helpers.react.renderChildren(legend)}
          {/* One <Bar> per series; stacked bars share a stackId */}
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4}/>
        </BarChart>
      </ChartContainer>`,
  metadata: { nestable: true },
}
