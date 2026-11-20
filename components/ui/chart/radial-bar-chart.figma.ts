// url=https://www.figma.com/design/uXivJU4N3R0LWu0mbimHWt/Aperia-Shadcn-Library--Enhanced-?node-id=533-6153
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/node_modules/recharts/types/chart/RadialBarChart.d.ts
// component=RadialBarChart

import figma from "figma"

export default {
  id: "RadialBarChart",
  imports: [
    'import { RadialBar, RadialBarChart, ChartContainer, ChartTip } from "aperia-ds5/chart"',
  ],
  example: figma.code`<ChartContainer config={chartConfig} className="mx-auto aspect-square h-64">
        <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
          <ChartTip hideLabel nameKey="browser"/>
          <RadialBar dataKey="visitors" background/>
        </RadialBarChart>
      </ChartContainer>`,
}
