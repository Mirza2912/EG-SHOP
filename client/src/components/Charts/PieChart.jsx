import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

const COLORS = ["#38B2AC", "#F56565"]; // In-stock = teal, Out-of-stock = red

const StockDoughnutChart = () => {
  const { adminProducts } = useSelector((state) => state.products);

  let outOfStock = 0;
  let inStock = 0;

  adminProducts?.forEach((item) => {
    if (item.stock === 0) outOfStock += 1;
    else inStock += 1;
  });

  const data = [
    { name: "In Stock", value: inStock },
    { name: "Out of Stock", value: outOfStock },
  ];

  return (
    <div className="md:my-32 my-64 w-[90%] md:max-w-4xl mx-auto h-[300px] md:h-[400px]">
      <h2 className="text-5xl text-center text-gray-800 my-10 font-bold">
        Product Stock Status
      </h2>
      <ResponsiveContainer
        width="100%"
        height={400}
        className={"bg-white/70 shadow-md p-4 rounded-2xl"}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockDoughnutChart;
