import React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
  CHART_MARGIN,
  ChartContainer,
  ChartGrid,
  ChartLegend,
  ChartLegendContent,
  ChartTip,
  chartAxisProps,
} from "."
import figma from "@figma/code-connect"

figma.connect(
  BarChart,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=449-7503",
  {
    imports: [
      'import { Bar, BarChart, XAxis, YAxis, CHART_MARGIN, ChartContainer, ChartGrid, ChartLegend, ChartLegendContent, ChartTip, chartAxisProps } from "aperia-ds5/chart"',
    ],
    props: {
      layout: figma.enum("Type", {
        Basic: undefined,
        Multiple: undefined,
        Label: undefined,
        Stacked: undefined,
        Negative: undefined,
        Active: undefined,
        Horizontal: "vertical",
        "Custom Label": undefined,
        Mixed: undefined,
      }),
      grid: figma.boolean("Show Grid", {
        true: <ChartGrid />,
        false: undefined,
      }),
      legend: figma.boolean("Show Legend", {
        true: <ChartLegend content={<ChartLegendContent />} />,
        false: undefined,
      }),
    },
    example: ({ layout, grid, legend }) => (
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <BarChart data={chartData} layout={layout} margin={CHART_MARGIN}>
          {grid}
          {/* layout="vertical": <ChartGrid vertical />, XAxis type="number", YAxis type="category" */}
          <XAxis dataKey="month" {...chartAxisProps()} />
          <YAxis {...chartAxisProps()} />
          <ChartTip />
          {legend}
          {/* One <Bar> per series; stacked bars share a stackId */}
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    ),
  },
)

figma.connect(
  LineChart,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=520-6888",
  {
    imports: [
      'import { Line, LineChart, XAxis, YAxis, CHART_MARGIN, ChartContainer, ChartGrid, ChartLegend, ChartLegendContent, ChartTip, chartAxisProps } from "aperia-ds5/chart"',
    ],
    props: {
      type: figma.enum("Type", {
        Basic: "natural",
        Linear: "linear",
        Step: "step",
        Multiple: "natural",
        Dots: "natural",
        "Dots Colors": "natural",
        Label: "natural",
      }),
      dot: figma.enum("Type", {
        Basic: false,
        Linear: false,
        Step: false,
        Multiple: false,
        Dots: true,
        "Dots Colors": true,
        Label: true,
      }),
      grid: figma.boolean("Show Grid", {
        true: <ChartGrid />,
        false: undefined,
      }),
      legend: figma.boolean("Show Legend", {
        true: <ChartLegend content={<ChartLegendContent />} />,
        false: undefined,
      }),
    },
    example: ({ type, dot, grid, legend }) => (
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <LineChart data={chartData} margin={CHART_MARGIN}>
          {grid}
          <XAxis dataKey="month" {...chartAxisProps()} />
          <YAxis {...chartAxisProps()} />
          <ChartTip />
          {legend}
          {/* One <Line> per series */}
          <Line
            dataKey="desktop"
            type={type}
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={dot}
          />
        </LineChart>
      </ChartContainer>
    ),
  },
)

figma.connect(
  AreaChart,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=517-111675",
  {
    imports: [
      'import { Area, AreaChart, XAxis, YAxis, CHART_MARGIN, ChartContainer, ChartGrid, ChartLegend, ChartLegendContent, ChartTip, chartAxisProps } from "aperia-ds5/chart"',
    ],
    props: {
      type: figma.enum("Type", {
        Basic: "natural",
        Linear: "linear",
        Step: "step",
        Stacked: "natural",
        "Stacked Expanded": "natural",
      }),
      stackOffset: figma.enum("Type", {
        Basic: undefined,
        Linear: undefined,
        Step: undefined,
        Stacked: undefined,
        "Stacked Expanded": "expand",
      }),
      grid: figma.boolean("Show Grid", {
        true: <ChartGrid />,
        false: undefined,
      }),
      legend: figma.boolean("Show Legend", {
        true: <ChartLegend content={<ChartLegendContent />} />,
        false: undefined,
      }),
    },
    example: ({ type, stackOffset, grid, legend }) => (
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <AreaChart data={chartData} stackOffset={stackOffset} margin={CHART_MARGIN}>
          {grid}
          <XAxis dataKey="month" {...chartAxisProps()} />
          <YAxis {...chartAxisProps()} />
          <ChartTip indicator="line" />
          {legend}
          {/* One <Area> per series; stacked areas share a stackId. Gradient=Yes: fill from a <linearGradient> in <defs> */}
          <Area
            dataKey="desktop"
            type={type}
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
          />
        </AreaChart>
      </ChartContainer>
    ),
  },
)

figma.connect(
  PieChart,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=523-7181",
  {
    imports: [
      'import { LabelList, Pie, PieChart, ChartContainer, ChartLegend, ChartLegendContent, ChartTip } from "aperia-ds5/chart"',
    ],
    props: {
      label: figma.enum("Type", {
        Basic: false,
        Label: true,
      }),
      labelList: figma.boolean("Show Label List", {
        true: <LabelList dataKey="browser" />,
        false: undefined,
      }),
      legend: figma.boolean("Show Legend", {
        true: <ChartLegend content={<ChartLegendContent nameKey="browser" />} />,
        false: undefined,
      }),
    },
    example: ({ label, labelList, legend }) => (
      <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64">
        <PieChart>
          <ChartTip hideLabel />
          <Pie data={chartData} dataKey="visitors" nameKey="browser" label={label}>
            {labelList}
          </Pie>
          {legend}
        </PieChart>
      </ChartContainer>
    ),
  },
)

figma.connect(
  PieChart,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=523-7880",
  {
    imports: ['import { Pie, PieChart, ChartContainer, ChartTip } from "aperia-ds5/chart"'],
    example: () => (
      <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64">
        <PieChart>
          <ChartTip hideLabel />
          <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={2}>
            {/* Show Text: center total as a <Label> with a content render function */}
          </Pie>
        </PieChart>
      </ChartContainer>
    ),
  },
)

figma.connect(
  RadarChart,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=524-3257",
  {
    imports: [
      'import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ChartContainer, ChartLegend, ChartLegendContent, ChartTip } from "aperia-ds5/chart"',
    ],
    props: {
      grid: figma.boolean("Show Grid", {
        true: figma.enum("Type", {
          Basic: <PolarGrid />,
          Dots: <PolarGrid />,
          Multiple: <PolarGrid />,
          "Lines Only": <PolarGrid />,
          "Grid Custom": <PolarGrid />,
          "Grid Filled": <PolarGrid />,
          "Grid Circle": <PolarGrid gridType="circle" />,
          "No lines": <PolarGrid />,
          "Grid Circle Filled": <PolarGrid gridType="circle" />,
        }),
        false: undefined,
      }),
      angleAxis: figma.boolean("Show Label", {
        true: <PolarAngleAxis dataKey="month" tick={{ fontSize: 11 }} />,
        false: undefined,
      }),
      radiusAxis: figma.boolean("Show Radius Axis", {
        true: <PolarRadiusAxis tick={{ fontSize: 11 }} axisLine={false} />,
        false: undefined,
      }),
      legend: figma.boolean("Show Legend", {
        true: <ChartLegend content={<ChartLegendContent />} />,
        false: undefined,
      }),
    },
    example: ({ grid, angleAxis, radiusAxis, legend }) => (
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <RadarChart data={chartData}>
          <ChartTip />
          {grid}
          {angleAxis}
          {radiusAxis}
          {/* One <Radar> per series */}
          <Radar dataKey="desktop" stroke="var(--color-desktop)" fill="var(--color-desktop)" fillOpacity={0.5} />
          {legend}
        </RadarChart>
      </ChartContainer>
    ),
  },
)

figma.connect(
  RadialBarChart,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=533-6153",
  {
    imports: ['import { RadialBar, RadialBarChart, ChartContainer, ChartTip } from "aperia-ds5/chart"'],
    example: () => (
      <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64">
        <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
          <ChartTip hideLabel nameKey="browser" />
          <RadialBar dataKey="visitors" background />
        </RadialBarChart>
      </ChartContainer>
    ),
  },
)
