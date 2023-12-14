import React from 'react';
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { StaticRevenue } from '@/types/static';

interface SaleChartProps {
  data: StaticRevenue[];
}

export default function SaleChart({ data }: SaleChartProps) {
  return (
    <LineChart width={600} height={250} data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="item1" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="item2" stroke="#8884d8" />
    </LineChart>
  )
}
