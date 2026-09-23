// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=524-3257
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/node_modules/recharts/types/chart/RadarChart.d.ts
// component=RadarChart

import figma from "figma"

const grid = figma.selectedInstance.getBoolean("Show Grid", {
  true: figma.selectedInstance.getEnum("Type", {
    Basic: figma.helpers.react.jsxElement("<PolarGrid />"),
    Dots: figma.helpers.react.jsxElement("<PolarGrid />"),
    Multiple: figma.helpers.react.jsxElement("<PolarGrid />"),
    "Lines Only": figma.helpers.react.jsxElement("<PolarGrid />"),
    "Grid Custom": figma.helpers.react.jsxElement("<PolarGrid />"),
    "Grid Filled": figma.helpers.react.jsxElement("<PolarGrid />"),
    "Grid Circle": figma.helpers.react.jsxElement(
      '<PolarGrid gridType="circle" />',
    ),
    "No lines": figma.helpers.react.jsxElement("<PolarGrid />"),
    "Grid Circle Filled": figma.helpers.react.jsxElement(
      '<PolarGrid gridType="circle" />',
    ),
  }),
  false: undefined,
})
const angleAxis = figma.selectedInstance.getBoolean("Show Label", {
  true: figma.helpers.react.jsxElement(
    '<PolarAngleAxis dataKey="month" tick={{ fontSize: 11 }} />',
  ),
  false: undefined,
})
const radiusAxis = figma.selectedInstance.getBoolean("Show Radius Axis", {
  true: figma.helpers.react.jsxElement(
    "<PolarRadiusAxis tick={{ fontSize: 11 }} axisLine={false} />",
  ),
  false: undefined,
})
const legend = figma.selectedInstance.getBoolean("Show Legend", {
  true: figma.helpers.react.jsxElement(
    "<ChartLegend content={<ChartLegendContent />} />",
  ),
  false: undefined,
})

export default {
  id: "RadarChart",
  imports: [
    'import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ChartContainer, ChartLegend, ChartLegendContent, ChartTip } from "aperia-ds5/chart"',
  ],
  example: figma.code`<ChartContainer config={chartConfig} className="h-64 w-full">
        <RadarChart data={chartData}>
          <ChartTip />
          ${figma.helpers.react.renderChildren(grid)}
          ${figma.helpers.react.renderChildren(angleAxis)}
          ${figma.helpers.react.renderChildren(radiusAxis)}
          {/* One <Radar> per series */}
          <Radar dataKey="desktop" stroke="var(--color-desktop)" fill="var(--color-desktop)" fillOpacity={0.5}/>
          ${figma.helpers.react.renderChildren(legend)}
        </RadarChart>
      </ChartContainer>`,
  metadata: { nestable: true },
}
