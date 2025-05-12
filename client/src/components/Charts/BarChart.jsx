import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";

const BarChartComponent = () => {
  const { allUsers } = useSelector((state) => state.auth);
  const { adminProducts } = useSelector((state) => state.products);
  const { allOrders } = useSelector((state) => state.order);

  // Calculate totals
  const totalUsers = allUsers?.length || 0;
  const totalProducts = adminProducts?.length || 0;
  const totalOrders = allOrders?.length || 0;

  const totalAmount = allOrders?.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  // Chart data
  const data = [
    { name: "Users", value: totalUsers },
    { name: "Products", value: totalProducts },
    { name: "Orders", value: totalOrders },
    { name: "Amount", value: totalAmount },
  ];

  return (
    <div className=" mt-32 w-[90%] md:max-w-4xl mx-auto h-[300px] md:h-[400px]">
      <h2 className="text-5xl text-center text-gray-800 my-10 font-bold">
        Amount Chart
      </h2>
      <ResponsiveContainer
        width="100%"
        height={400}
        className={"bg-white/70 shadow-md p-4 rounded-2xl"}
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 14, fill: "#4B5563", fontWeight: 600 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="value"
            fill="#4c51bf"
            barSize={45}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
