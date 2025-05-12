import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", sales: 320 },
  { day: "Tue", sales: 450 },
  { day: "Wed", sales: 300 },
  { day: "Thu", sales: 600 },
  { day: "Fri", sales: 400 },
  { day: "Sat", sales: 700 },
  { day: "Sun", sales: 500 },
];

export default function WeeklySalesChart() {
  return (
    <div className="w-[90%] md:max-w-4xl mx-auto h-[300px] md:h-[400px] ">
      <h2 className="text-5xl text-center text-gray-800 my-10 font-bold">
        Weekly Sales
      </h2>
      <ResponsiveContainer
        className={"bg-white/70 shadow-md p-4 rounded-2xl"}
        width="100%"
        height="100%"
      >
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 14, fill: "#4B5563", fontWeight: "500" }}
            label={{
              value: "Day of the Week",
              position: "bottom",
              offset: 10,
              style: { fill: "#6B7280", fontSize: 12 },
            }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#4B5563" }}
            label={{
              value: "Sales",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#6B7280", fontSize: 12 },
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#38B2AC"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
