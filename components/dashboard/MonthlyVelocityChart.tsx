"use client"

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const data = [
  { month: "Apr '25", monitoring: 13, testing: 1, cumulative: 14 },
  { month: "May", monitoring: 32, testing: 8, cumulative: 40 },
  { month: "Jun", monitoring: 69, testing: 24, cumulative: 93 },
  { month: "Jul", monitoring: 92, testing: 37, cumulative: 129 },
  { month: "Aug", monitoring: 124, testing: 60, cumulative: 184 },
  { month: "Sep", monitoring: 160, testing: 82, cumulative: 268 },
  { month: "Oct", monitoring: 216, testing: 110, cumulative: 326 },
  { month: "Nov", monitoring: 245, testing: 139, cumulative: 384 },
  { month: "Dec", monitoring: 283, testing: 200, cumulative: 483 },
  { month: "Jan '26", monitoring: 317, testing: 229, cumulative: 546 },
  { month: "Feb", monitoring: 351, testing: 247, cumulative: 598 },
  { month: "Mar", monitoring: 413, testing: 292, cumulative: 705 },
]

export function MonthlyVelocityChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <ComposedChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
          formatter={(val, name) => [val, name === "monitoring" ? "Monitoring" : name === "testing" ? "Testing" : "Cumulative"]}
        />
        <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} formatter={(val) => val === "monitoring" ? "Monitoring" : val === "testing" ? "Testing" : "Cumulative"} />
        <Bar dataKey="monitoring" stackId="a" fill="#60a5fa" radius={[0, 0, 0, 0]} />
        <Bar dataKey="testing" stackId="a" fill="#a78bfa" radius={[2, 2, 0, 0]} />
        <Line dataKey="cumulative" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 2" dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
