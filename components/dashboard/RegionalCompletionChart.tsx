"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { lob: "ACH", completed: 5, pastDue: 0, outstanding: 0 },
  { lob: "FIG", completed: 64, pastDue: 6, outstanding: 0 },
  { lob: "Merchant", completed: 56, pastDue: 0, outstanding: 0 },
  { lob: "Issuer", completed: 19, pastDue: 0, outstanding: 0 },
  { lob: "APAC", completed: 64, pastDue: 0, outstanding: 0 },
  { lob: "EMEA", completed: 187, pastDue: 0, outstanding: 0 },
  { lob: "LATAM", completed: 76, pastDue: 0, outstanding: 0 },
  { lob: "FCC", completed: 171, pastDue: 0, outstanding: 0 },
  { lob: "Privacy", completed: 60, pastDue: 0, outstanding: 0 },
  { lob: "DCS", completed: 3, pastDue: 0, outstanding: 0 },
]

export function RegionalCompletionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 32, left: 16, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} />
        <YAxis dataKey="lob" type="category" tick={{ fontSize: 12, fill: "#64748b" }} width={60} />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
          formatter={(val, name) => [val, name === "completed" ? "Completed" : name === "pastDue" ? "Past Due" : "Outstanding"]}
        />
        <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} formatter={(val) => val === "completed" ? "Completed" : val === "pastDue" ? "Past Due" : "Outstanding"} />
        <Bar dataKey="completed" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
        <Bar dataKey="pastDue" stackId="a" fill="#ef4444" />
        <Bar dataKey="outstanding" stackId="a" fill="#e2e8f0" radius={[0, 2, 2, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
