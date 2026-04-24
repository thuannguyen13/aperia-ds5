"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Low", value: 43, color: "#94a3b8" },
  { name: "Moderate", value: 67, color: "#fbbf24" },
  { name: "High", value: 21, color: "#f97316" },
  { name: "Critical", value: 8, color: "#dc2626" },
]

const total = 139

export function SeverityDonutChart() {
  return (
    <div className="relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
            formatter={(val, name) => [val, name]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-slate-900">{total}</span>
        <span className="text-xs text-slate-500">Total Open</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 pb-1">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-1">
            <div className="size-2.5 rounded-full" style={{ background: d.color }} />
            <span className="text-xs text-slate-600">{d.name} ({d.value})</span>
          </div>
        ))}
      </div>
    </div>
  )
}
