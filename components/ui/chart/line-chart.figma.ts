// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=520-6888
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/node_modules/recharts/types/chart/LineChart.d.ts
// component=LineChart

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  Basic: "natural",
  Linear: "linear",
  Step: "step",
  Multiple: "natural",
  Dots: "natural",
  "Dots Colors": "natural",
  Label: "natural",
})
const dot = figma.selectedInstance.getEnum("Type", {
  Basic: false,
  Linear: false,
  Step: false,
  Multiple: false,
  Dots: true,
  "Dots Colors": true,
  Label: true,
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
  id: "LineChart",
  imports: [
    'import { Line, LineChart, XAxis, YAxis, CHART_MARGIN, ChartContainer, ChartGrid, ChartLegend, ChartLegendContent, ChartTip, chartAxisProps } from "aperia-ds5/chart"',
  ],
  example: figma.code`<ChartContainer config={chartConfig} className="h-64 w-full">
        <LineChart data={chartData} margin={CHART_MARGIN}>
          ${figma.helpers.react.renderChildren(grid)}
          <XAxis dataKey="month" {...chartAxisProps()}/>
          <YAxis {...chartAxisProps()}/>
          <ChartTip />
          ${figma.helpers.react.renderChildren(legend)}
          {/* One <Line> per series */}
          <Line dataKey="desktop"${figma.helpers.react.renderProp(
            "type",
            type,
          )} stroke="var(--color-desktop)" strokeWidth={2}${figma.helpers.react.renderProp(
    "dot",
    dot,
  )}/>
        </LineChart>
      </ChartContainer>`,
  metadata: { nestable: true },
}
