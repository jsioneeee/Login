"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const sampleData = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 55 },
  { name: "Mar", value: 70 },
  { name: "Apr", value: 65 },
];

export default function ChartCard() {
  return (
    <div className="h-64 w-full p-4 rounded-2xl border shadow-sm bg-white dark:bg-neutral-900">
      <h2 className="text-lg font-semibold mb-2">Monthly Performance</h2>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="currentColor"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
