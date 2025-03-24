import React, { useState, useEffect, JSX } from "react";
import { Link } from "react-router-dom";
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
import { useGetAllParcelQuery } from "@/redux/features/parcel/parcelApi";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { TUser } from "@/interface";
import { Skeleton } from "@/components/ui/skeleton";

const useCountUp = (
  target: number,
  duration: number = 1000,
  shouldAnimate: boolean = true
): number => {
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
  data: { title: string; value: number; icon?: JSX.Element; path?: string };
  isLoading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ data, isLoading }) => {
  const shouldAnimate = !isLoading;
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
          {isLoading ? (
            <Skeleton className="w-[100px] h-[32px]" />
          ) : (
            <div className="text-2xl font-bold gradient-text">{count}</div>
          )}
        </div>
      </div>
    </Link>
  );
};

const MerchantDashboard = () => {
  const { email } = useAppSelector(useCurrentUser) as TUser;

  const { data: allParcels, isLoading: isLoadingAllParcels } =
    useGetAllParcelQuery([{ name: "merchantEmail", value: email }]);

  const { data: deliveredParcels, isLoading: isLoadingDeliveredParcels } =
    useGetAllParcelQuery([
      { name: "merchantEmail", value: email },
      { name: "currentStatus", value: "Delivered" },
    ]);

  const { data: pickedParcels, isLoading: isLoadingPickedParcels } =
    useGetAllParcelQuery([
      { name: "merchantEmail", value: email },
      { name: "currentStatus", value: "Pickup Assigned" },
    ]);

  const {
    data: pickupPendingParcels,
    isLoading: isLoadingPickupPendingParcels,
  } = useGetAllParcelQuery([
    { name: "merchantEmail", value: email },
    { name: "currentStatus", value: "Parcel Create" },
  ]);

  console.log("All Parcels:", allParcels);
  console.log("Delivered Parcels:", deliveredParcels);
  console.log("Picked Parcels:", pickedParcels);
  console.log("Pickup Pending Parcels:", pickupPendingParcels);

  const orderSummary = [
    {
      title: "Total Order",
      value: allParcels?.data?.length || 0,
      icon: <Package size={24} />,
      path: "/merchant/all-orders",
    },
    {
      title: "Total Delivered",
      value: deliveredParcels?.data?.length || 0,
      icon: <Check size={24} />,
      path: "/merchant/all-orders?status=Delivered",
    },
    {
      title: "Total Picked",
      value: pickedParcels?.data?.length || 0,
      icon: <Truck size={24} />,
      path: "/merchant/all-orders?status=Pickup Assigned",
    },
    {
      title: "Pickup Pending",
      value: pickupPendingParcels?.data?.length || 0,
      icon: <Clipboard size={24} />,
      path: "/merchant/all-orders?status=Parcel Create",
    },
    { title: "Total Amount", value: 2500, icon: <DollarSign size={24} /> },
    {
      title: "Delivered Collected Amount",
      value: 2500,
      icon: <FaMoneyBill size={24} />,
    },
    { title: "Delivery Charge", value: 160, icon: <Tag size={24} /> },
    { title: "COD Charge", value: 0, icon: <CreditCard size={24} /> },
  ];

  const paymentSummary = [
    { title: "Paid Amount", value: 2340, icon: <CheckCircle size={24} /> },
    { title: "Unpaid Amount", value: 0, icon: <Hourglass size={24} /> },
    { title: "Processing Amount", value: 0, icon: <Settings size={24} /> },
  ];

  const isLoading =
    isLoadingAllParcels ||
    isLoadingDeliveredParcels ||
    isLoadingPickedParcels ||
    isLoadingPickupPendingParcels;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold gradient-text">
          Dashboard Overview
        </h2>
        <div className="mt-1 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {orderSummary.map((item, index) => (
          <StatCard key={index} data={item} isLoading={isLoading} />
        ))}
      </div>
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold gradient-text">
            Payment Summary
          </h2>
          <div className="mt-1 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paymentSummary.map((item, index) => (
            <StatCard key={index} data={item} isLoading={isLoading} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
