// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=523-7181
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/node_modules/recharts/types/chart/PieChart.d.ts
// component=PieChart

import figma from "figma"

const label = figma.selectedInstance.getEnum("Type", {
  Basic: false,
  Label: true,
})
const labelList = figma.selectedInstance.getBoolean("Show Label List", {
  true: figma.helpers.react.jsxElement('<LabelList dataKey="browser" />'),
  false: undefined,
})
const legend = figma.selectedInstance.getBoolean("Show Legend", {
  true: figma.helpers.react.jsxElement(
    '<ChartLegend content={<ChartLegendContent nameKey="browser" />} />',
  ),
  false: undefined,
})

export default {
  id: "PieChart",
  imports: [
    'import { LabelList, Pie, PieChart, ChartContainer, ChartLegend, ChartLegendContent, ChartTip } from "aperia-ds5/chart"',
  ],
  example: figma.code`<ChartContainer config={chartConfig} className="mx-auto aspect-square h-64">
        <PieChart>
          <ChartTip hideLabel/>
          <Pie data={chartData} dataKey="visitors" nameKey="browser"${figma.helpers.react.renderProp(
            "label",
            label,
          )}>
            ${figma.helpers.react.renderChildren(labelList)}
          </Pie>
          ${figma.helpers.react.renderChildren(legend)}
        </PieChart>
      </ChartContainer>`,
  metadata: { nestable: true },
}
