import React, { useState, useEffect, JSX } from "react";
import { Link } from "react-router-dom";
// Import lucide-react icons
import {
  Package,
  Check,
  Truck,
  Clipboard,
  DollarSign,
  Tag,
  CreditCard,
  CheckCircle,
  Hourglass,
  Settings,
} from "lucide-react";
import { FaMoneyBill } from "react-icons/fa";

// Define the structure of StatCardData
interface StatCardData {
  title: string;
  value: number;
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
      <div className="glass-card card-transition rounded-xl p-6 flex flex-col relative overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
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

const MerchantDashboard = () => {
  const orderSummary = [
    { title: "Total Order", count: 2, icon: <Package size={24} /> },
    { title: "Total Delivered", count: 2, icon: <Check size={24} /> },
    { title: "Total Picked", count: 0, icon: <Truck size={24} /> },
    { title: "Pickup Pending", count: 0, icon: <Clipboard size={24} /> },
    { title: "Total Amount", count: 2500, icon: <DollarSign size={24} /> },
    {
      title: "Delivered Collected Amount",
      count: 2500,
      icon: <FaMoneyBill size={24} />,
    },
    { title: "Delivery Charge", count: 160, icon: <Tag size={24} /> },
    { title: "COD Charge", count: 0, icon: <CreditCard size={24} /> },
  ];

  const paymentSummary = [
    { title: "Paid Amount", count: 2340, icon: <CheckCircle size={24} /> },
    { title: "Unpaid Amount", count: 0, icon: <Hourglass size={24} /> },
    { title: "Processing Amount", count: 0, icon: <Settings size={24} /> },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold gradient-text">
          Dashboard Overview
        </h2>
        <div className="mt-1 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
      </div>
      {/* Order Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {orderSummary.map((item, index) => (
          <StatCard
            key={index}
            data={{
              title: item.title,
              value: item.count,
              icon: item.icon,
            }}
          />
        ))}
      </div>

      {/* Payment Summary */}
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold gradient-text">
            Payment Summary
          </h2>
          <div className="mt-1 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paymentSummary.map((item, index) => (
            <StatCard
              key={index}
              data={{
                title: item.title,
                value: item.count,
                icon: item.icon,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
