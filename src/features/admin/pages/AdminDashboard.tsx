import React, { useState, useEffect, JSX } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";

// Custom hook for counting up numbers with animation
const useCountUp = (
  target: number,
  duration: number = 1000,
  shouldAnimate: boolean = true
): number => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    if (shouldAnimate) {
      window.requestAnimationFrame(step);
    } else {
      setCount(target);
    }
  }, [target, duration, shouldAnimate]);

  return count;
};

interface StatCardData {
  title: string;
  value: number;
  icon?: JSX.Element;
  path?: string;
}

interface StatCardProps {
  data: StatCardData;
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

const AdminDashboard: React.FC = () => {
  // Fetch merchants, delivery men, branches, parcels and delivered parcels
  const {
    data: merchants,
    isLoading: merchantsLoading,
    error: merchantsError,
  } = useGetAllMerchantQuery([]);

  const {
    data: deliveryMen,
    isLoading: deliveryMenLoading,
    error: deliveryMenError,
  } = useGetAllDeliveryManQuery([]);

  const {
    data: branches,
    isLoading: branchesLoading,
    error: branchesError,
  } = useGetAllBranchQuery([]);

  const {
    data: parcels,
    isLoading: parcelsLoading,
    error: parcelsError,
  } = useGetAllParcelQuery([]);

  const {
    data: deliveredParcels,
    isLoading: deliveredParcelsLoading,
    error: deliveredParcelsError,
  } = useGetAllParcelQuery([{ name: "currentStatus", value: "Delivered" }]);

  const isLoading =
    merchantsLoading ||
    deliveryMenLoading ||
    parcelsLoading ||
    branchesLoading ||
    deliveredParcelsLoading;

  if (
    merchantsError ||
    deliveryMenError ||
    parcelsError ||
    branchesError ||
    deliveredParcelsError
  ) {
    return <div>Error loading data.</div>;
  }

  // Ensure that each card’s value is a number (fallback to 0)
  const statCardsData: StatCardData[] = [
    {
      title: "Total Parcels",
      value: parcels ? parcels.data?.length ?? 0 : 0,
      icon: <Package className="h-5 w-5" />,
      path: "/admin/parcels",
    },
    {
      title: "Total Users",
      value: 25000,
      icon: <Users className="h-5 w-5" />,
      path: "/users",
    },
    {
      title: "Total Merchants",
      value: merchants ? merchants.data?.length ?? 0 : 0,
      icon: <ShoppingBag className="h-5 w-5" />,
      path: "/admin/merchant-manage/merchants",
    },
    {
      title: "Total Delivery Men",
      value: deliveryMen ? deliveryMen.data?.length ?? 0 : 0,
      icon: <Truck className="h-5 w-5" />,
      path: "/admin/deliveryman",
    },
    {
      title: "Total Branches",
      value: branches ? branches.data?.length ?? 0 : 0,
      icon: <MapPin className="h-5 w-5" />,
      path: "/admin/branch-manage/branch",
    },
    {
      title: "Total Accounts",
      value: 30000,
      icon: <User className="h-5 w-5" />,
      path: "/accounts",
    },
    {
      title: "Total Partial Delivered",
      value: 200,
      icon: <Clock className="h-5 w-5" />,
      path: "/partial-delivered",
    },
    {
      title: "Total Parcels Delivered",
      value: deliveredParcels ? deliveredParcels.data?.length ?? 0 : 0,
      icon: <CheckCircle className="h-5 w-5" />,
      path: "/delivered-parcels",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold gradient-text">
          Dashboard Overview
        </h2>
        <div className="mt-1 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {statCardsData.map((card, index) => (
          <StatCard key={index} data={card} isLoading={isLoading} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
