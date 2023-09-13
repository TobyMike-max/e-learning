import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import data from '../assets/chart.js';

export default function BarChartComponent() {
  return (
    <ResponsiveContainer width="98%" height={210}>
      <BarChart
        width={100}
        height={80}
        data={data}
        margin={{ right: 5, left: -40 }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Bar dataKey="time" fill="#df6690" radius={[5, 5, 5, 5]}>
          <Cell />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
