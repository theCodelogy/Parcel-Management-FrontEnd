import React, { useState, useEffect, JSX } from "react";
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
import { useGetAllMerchantQuery } from "@/redux/features/merchant/merchantApi";
import { useGetAllDeliveryManQuery } from "@/redux/features/deliveryMan/deliveryManApi";
import { useGetAllBranchQuery } from "@/redux/features/branch/branchApi";
import { useGetAllParcelQuery } from "@/redux/features/parcel/parcelApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Define the structure of StatCardData
interface StatCardData {
  title: string;
  value: number | undefined; // Allow undefined values
  change?: number;
  icon?: JSX.Element;
  path?: string; // Add a path for navigation
}

// Custom hook for counting up numbers with animation
const useCountUp = (
  target: number | undefined,
  duration: number = 1000,
  shouldAnimate: boolean = true
) => {
  const [count, setCount] = useState<number | undefined>(0);

  useEffect(() => {
    if (target === undefined) {
      setCount(undefined);
      return;
    }

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
  isLoading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ data, isLoading }) => {
  const shouldAnimate = !isLoading; // Only animate when not loading
  const count = useCountUp(data.value, 1000, shouldAnimate);

  return (
    <Link to={data.path || "#"} className="no-underline">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {isLoading ? <Skeleton className="h-4 w-1/2" /> : data.title}
          </CardTitle>
          {data.icon && (
            <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-full">
              {isLoading ? <Skeleton className="h-5 w-5" /> : data.icon}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? (
              <Skeleton className="h-6 w-24" />
            ) : count !== undefined ? (
              count
            ) : (
              0
            )}
          </div>
        </CardContent>
      </Card>
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
  // Fetch merchants from /merchant
  const {
    data: merchants,
    isLoading: merchantsLoading,
    error: merchantsError,
  } = useGetAllMerchantQuery([]);

  // Fetch delivery men from /deliveryMan
  const {
    data: deliveryMen,
    isLoading: deliveryMenLoading,
    error: deliveryMenError,
  } = useGetAllDeliveryManQuery([]);

  // Fetch Branches from /branch
  const {
    data: branches,
    isLoading: branchesLoading,
    error: branchesError,
  } = useGetAllBranchQuery([]);

  // Fetch parcels from /parcel
  const {
    data: parcels,
    isLoading: parcelsLoading,
    error: parcelsError,
  } = useGetAllParcelQuery([]);

  // Fetch delivered parcels from /parcel
  const {
    data: deliveredParcels,
    isLoading: deliveredParcelsLoading,
    error: deliveredParcelsError,
  } = useGetAllParcelQuery([{ name: "currentStatus", value: "Delivered" }]);

  // Handle loading and error states (adjust as necessary)
  const isLoading =
    merchantsLoading ||
    deliveryMenLoading ||
    parcelsLoading ||
    branchesLoading ||
    deliveredParcelsLoading;
  const hasError =
    merchantsError ||
    deliveryMenError ||
    parcelsError ||
    branchesError ||
    deliveredParcelsError;

  if (isLoading) {
    return (
      <div>
        <div className="space-y-8">
          <Skeleton className="h-8 w-64 mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-6 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                <CardContent className="h-96">
                  {i === 0 ? ( // Income vs Expense Chart
                    <div className="flex items-center justify-center h-full">
                      <Skeleton className="w-full h-full" />
                    </div>
                  ) : (
                    // Delivery Man Statement/Merchant Statement
                    <div className="flex items-center justify-center h-full">
                      <Skeleton className="w-full h-full" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return <div>Error loading data.</div>;
  }

  // Here we assume that the API returns an array of items.
  // Adjust the logic if your response structure differs.
  const statCardsData: StatCardData[] = [
    {
      title: "Total Parcels",
      value: parcels ? parcels?.data?.length : 0,
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
      value: merchants ? merchants?.data?.length : 0,
      change: 2,
      icon: <ShoppingBag className="h-5 w-5" />,
      path: "/admin/merchant-manage/merchants",
    },
    {
      title: "Total Delivery Mans",
      value: deliveryMen ? deliveryMen?.data?.length : 0,
      change: 0,
      icon: <Truck className="h-5 w-5" />,
      path: "/admin/deliveryman",
    },
    {
      title: "Total Branches",
      value: branches ? branches?.data?.length : 0, // static example
      change: 1,
      icon: <MapPin className="h-5 w-5" />,
      path: "/admin/branch-manage/branch",
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
      value: deliveredParcels ? deliveredParcels?.data?.length : 0,
      change: 12,
      icon: <CheckCircle className="h-5 w-5" />,
      path: "/delivered-parcels", // Add a path for navigation
    },
  ];

  // Colors for pie charts
  const COLORS = ["#3b82f6", "#ef4444", "#22c55e"];

  return (
    <div className="">
      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Dashboard Overview
          </h2>
          <div className="mt-1 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {statCardsData.map((card) => (
            <StatCard key={card.title} data={card} isLoading={false} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Income vs Expense Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Income vs Expense</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
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
            </CardContent>
          </Card>

          {/* Delivery Man Statement */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Man Statement</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex justify-center items-center">
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
            </CardContent>
          </Card>

          {/* Merchant Statement */}
          <Card>
            <CardHeader>
              <CardTitle>Merchant Statement</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex justify-center items-center">
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
            </CardContent>
          </Card>

          {/* Courier Revenue */}
          <Card>
            <CardHeader>
              <CardTitle>Courier Revenue</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
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
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
