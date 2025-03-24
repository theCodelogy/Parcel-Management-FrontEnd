import React, { useState, useEffect, JSX } from "react";
import { Link } from "react-router-dom";
import { Package, Check, Truck, Clipboard } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { TUser } from "@/interface";
import { useGetAllDeliveryManQuery } from "@/redux/features/deliveryMan/deliveryManApi";
import { useGetAllParcelQuery } from "@/redux/features/parcel/parcelApi";
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

const BranchDashboard = () => {
  const { name } = useAppSelector(useCurrentUser) as TUser;

  const {
    data: deliveryMen,
    isLoading: deliveryMenLoading,
    error: deliveryMenError,
  } = useGetAllDeliveryManQuery([{ name: "hub", value: name }]);

  const {
    data: parcels,
    isLoading: parcelsLoading,
    error: parcelsError,
  } = useGetAllParcelQuery([{ name: "branchname", value: name }]);

  const {
    data: deliveredParcels,
    isLoading: deliveredParcelsLoading,
    error: deliveredParcelsError,
  } = useGetAllParcelQuery([
    { name: "branchname", value: name },
    { name: "currentStatus", value: "Delivered" },
  ]);

  const orderSummary = [
    {
      title: "Total Parcel",
      value: parcels ? parcels.data?.length ?? 0 : 0,
      icon: <Package size={24} />,
      path: "/branch/parcels",
    },
    {
      title: "Total Delivery Man",
      value: deliveryMen ? deliveryMen.data?.length ?? 0 : 0,
      icon: <Check size={24} />,
      path: "/branch/deliveryman",
    },
    {
      title: "Total Partial Delivered",
      value: 0,
      icon: <Truck size={24} />,
    },
    {
      title: "Total Parcel Delivered",
      value: deliveredParcels ? deliveredParcels.data?.length ?? 0 : 0,
      icon: <Clipboard size={24} />,
      path: "/branch/parcels?status=Delivered",
    },
  ];

  const isLoading =
    deliveryMenLoading || parcelsLoading || deliveredParcelsLoading;

  if (deliveryMenError || parcelsError || deliveredParcelsError) {
    return <div>Error loading data</div>;
  }

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
    </div>
  );
};

export default BranchDashboard;
