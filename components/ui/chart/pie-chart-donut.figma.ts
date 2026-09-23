// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=523-7880
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/node_modules/recharts/types/chart/PieChart.d.ts
// component=PieChart

import figma from "figma"

export default {
  id: "PieChart",
  imports: [
    'import { Pie, PieChart, ChartContainer, ChartTip } from "aperia-ds5/chart"',
  ],
  example: figma.code`<ChartContainer config={chartConfig} className="mx-auto aspect-square h-64">
        <PieChart>
          <ChartTip hideLabel/>
          <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={2}>
            {/* Show Text: center total as a <Label> with a content render function */}
          </Pie>
        </PieChart>
      </ChartContainer>`,
}
