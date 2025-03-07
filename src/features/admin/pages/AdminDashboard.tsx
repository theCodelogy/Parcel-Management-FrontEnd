import React, { useState, useEffect, JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Package,
  Users,
  ShoppingBag,
  Truck,
  MapPin,
  User,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import useAxiosSecure from "@/Hoocks/useAxiosSecure";

// Import your secured axios hook

// Define the structure of StatCardData
interface StatCardData {
  title: string;
  value: number;
  change?: number;
  icon?: JSX.Element;
  path?: string; // Add a path for navigation
}

// Custom hook for counting up numbers with animation
const useCountUp = (
  target: number,
  duration: number = 1000,
  shouldAnimate: boolean = true
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (shouldAnimate) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    } else {
      setCount(target);
    }
  }, [target, duration, shouldAnimate]);

  return count;
};

interface StatCardProps {
  data: StatCardData;
}

const StatCard: React.FC<StatCardProps> = ({ data }) => {
  const shouldAnimate = true; // Always animate the count-up effect
  const count = useCountUp(data.value, 1000, shouldAnimate);

  return (
    <Link to={data.path || "#"} className="no-underline">
      <div className="glass-card card-transition rounded-xl p-6 flex flex-col relative overflow-hidden shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {data.title}
          </h3>
          {data.icon && (
            <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-full">
              {data.icon}
            </div>
          )}
        </div>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-bold gradient-text">{count}</div>
        </div>
      </div>
    </Link>
  );
};

// Sample static chart data (can be replaced with dynamic data if needed)
const incomeExpenseData = [
  { name: "Jan", Income: 65, Expense: 28 },
  { name: "Feb", Income: 59, Expense: 48 },
  { name: "Mar", Income: 80, Expense: 40 },
  { name: "Apr", Income: 81, Expense: 19 },
  { name: "May", Income: 56, Expense: 86 },
  { name: "Jun", Income: 55, Expense: 27 },
];

const deliveryManChartData = [
  { name: "Delivered", value: 70 },
  { name: "Pending", value: 20 },
  { name: "Returned", value: 10 },
];

const merchantChartData = [
  { name: "Active", value: 60 },
  { name: "Inactive", value: 30 },
  { name: "Pending", value: 10 },
];

const courierRevenueData = [
  { name: "Jan", Revenue: 1000 },
  { name: "Feb", Revenue: 1200 },
  { name: "Mar", Revenue: 900 },
  { name: "Apr", Revenue: 1100 },
  { name: "May", Revenue: 1300 },
  { name: "Jun", Revenue: 1400 },
];

const Dashboard: React.FC = () => {
  // Use your secured axios instance
  const axiosSecure = useAxiosSecure();

  // Fetch merchants from /merchant
  const {
    data: merchants,
    isLoading: merchantsLoading,
    error: merchantsError,
  } = useQuery({
    queryKey: ["merchants"],
    queryFn: async () => {
      const res = await axiosSecure.get("/merchant");
      return res.data.data;
    },
  });

  // Fetch delivery men from /deliveryMan
  const {
    data: deliveryMen,
    isLoading: deliveryMenLoading,
    error: deliveryMenError,
  } = useQuery({
    queryKey: ["deliveryMen"],
    queryFn: async () => {
      const res = await axiosSecure.get("/deliveryMan");
      return res.data.data;
    },
  });

  // Fetch Branches from /branch
  const {
    data: branches,
    isLoading: branchesLoading,
    error: branchesError,
  } = useQuery({
    queryKey: ["branches"],
    queryFn: async () => {
      const res = await axiosSecure.get("/branch");
      return res.data.data;
    },
  });

  // Fetch parcels from /parcel
  const {
    data: parcels,
    isLoading: parcelsLoading,
    error: parcelsError,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcel");
      return res.data.data;
    },
  });

  // Handle loading and error states (adjust as necessary)
  if (
    merchantsLoading ||
    deliveryMenLoading ||
    parcelsLoading ||
    branchesLoading
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (merchantsError || deliveryMenError || parcelsError || branchesError) {
    return <div>Error loading data.</div>;
  }

  // Here we assume that the API returns an array of items.
  // Adjust the logic if your response structure differs.
  const statCardsData: StatCardData[] = [
    {
      title: "Total Parcels",
      value: parcels ? parcels.length : 0,
      change: 10,
      icon: <Package className="h-5 w-5" />,
      path: "/admin/parcels", // Add a path for navigation
    },
    {
      title: "Total Users",
      // Keeping static value as an example
      value: 25000,
      change: 5,
      icon: <Users className="h-5 w-5" />,
      path: "/users", // Add a path for navigation
    },
    {
      title: "Total Merchants",
      value: merchants ? merchants.length : 0,
      change: 2,
      icon: <ShoppingBag className="h-5 w-5" />,
      path: "/admin/merchants", // Add a path for navigation
    },
    {
      title: "Total Delivery Mans",
      value: deliveryMen ? deliveryMen.length : 0,
      change: 0,
      icon: <Truck className="h-5 w-5" />,
      path: "/admin/deliveryman",
    },
    {
      title: "Total Branches",
      value: branches ? branches.length : 0, // static example
      change: 1,
      icon: <MapPin className="h-5 w-5" />,
      path: "/admin/branch", // Add a path for navigation
    },
    {
      title: "Total Accounts",
      value: 30000, // static example
      change: 3,
      icon: <User className="h-5 w-5" />,
      path: "/accounts", // Add a path for navigation
    },
    {
      title: "Total Partial Delivered",
      value: 200, // static example
      change: -1,
      icon: <Clock className="h-5 w-5" />,
      path: "/partial-delivered", // Add a path for navigation
    },
    {
      title: "Total Parcels Delivered",
      value: 4800, // static example
      change: 12,
      icon: <CheckCircle className="h-5 w-5" />,
      path: "/delivered-parcels", // Add a path for navigation
    },
  ];

  // Colors for pie charts
  const COLORS = ["#3b82f6", "#ef4444", "#22c55e"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <section className="container mx-auto px-4 py-8 relative">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold gradient-text">
            Dashboard Overview
          </h2>
          <div className="mt-1 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {statCardsData.map((card) => (
            <StatCard key={card.title} data={card} />
          ))}
        </div>

        {/* Additional decorative elements */}
        <div className="absolute -top-10 left-1/4 w-72 h-72 bg-purple-300/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 right-1/3 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl -z-10"></div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Income vs Expense Chart */}
          <div className="glass-card rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Income vs Expense</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeExpenseData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Income" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Delivery Man Statement */}
          <div className="glass-card rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Delivery Man Statement
            </h3>
            <div className="h-[300px] flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deliveryManChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {deliveryManChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}`, "Amount"]}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Merchant Statement */}
          <div className="glass-card rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Merchant Statement</h3>
            <div className="h-[300px] flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={merchantChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {merchantChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}`, "Amount"]}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Courier Revenue */}
          <div className="glass-card rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Courier Revenue</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={courierRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
