import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useGetAllDeliveryChargeQuery } from "@/redux/features/deliveryCharge/deliveryChargeApi";

export type TDeliveryCharge = {
  _id?: string;
  chargeList?: {
    sameDay: number;
    nextDay: number;
    subCity: number;
    outsideCity: number;
  };
  increasePerKG?: {
    sameDay: number;
    nextDay: number;
    subCity: number;
    outsideCity: number;
  };
};

const DeliveryChargePage: React.FC = () => {
  const { data, error, isLoading } = useGetAllDeliveryChargeQuery([]);

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">Error loading data</div>
    );
  }

  const deliveryData: TDeliveryCharge | undefined = (
    data?.data as TDeliveryCharge[]
  )?.[0];

  const calculateCharge = (
    baseCharge: number,
    increasePerKG: number,
    weight: number
  ) => {
    return baseCharge + (weight - 1) * increasePerKG;
  };

  const deliveryTypes = deliveryData?.chargeList
    ? Object.keys(deliveryData.chargeList)
    : [];

  return (
    <div className="px-4 py-8 w-full">
      <Tabs
        defaultValue="sameDay"
        className="w-full flex flex-col items-center"
      >
        <TabsList className="flex flex-wrap justify-center gap-2 mb-6">
          {deliveryTypes.map((deliveryType) => (
            <TabsTrigger
              key={deliveryType}
              value={deliveryType}
              className="h-10 px-4 text-sm sm:text-base font-medium border rounded-md data-[state=active]:bg-[#A31621] data-[state=active]:text-white"
            >
              {deliveryType.replace(/([A-Z])/g, " $1")}
            </TabsTrigger>
          ))}
        </TabsList>

        {deliveryTypes.map((deliveryType) => {
          const baseCharge =
            deliveryData?.chargeList?.[
              deliveryType as keyof typeof deliveryData.chargeList
            ] || 0;
          const increasePerKG =
            deliveryData?.increasePerKG?.[
              deliveryType as keyof typeof deliveryData.increasePerKG
            ] || 0;

          return (
            <TabsContent
              key={deliveryType}
              value={deliveryType}
              className="w-full"
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mt-10 sm:mt-0 justify-items-center">
                {isLoading
                  ? Array.from({ length: 10 }).map((_, index) => (
                      <div
                        key={`skeleton-${index}`}
                        className="w-full sm:max-w-sm border border-[#A31621] p-4 rounded-lg shadow-md animate-pulse"
                      >
                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                        <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    ))
                  : Array.from({ length: 10 }).map((_, index) => {
                      const weight = index + 1;
                      const price = calculateCharge(
                        baseCharge,
                        increasePerKG,
                        weight
                      );
                      return (
                        <div
                          key={weight}
                          className="w-full sm:max-w-sm border border-[#A31621] p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                        >
                          <p className="text-lg font-semibold">
                            Up To {weight} (KG)
                          </p>
                          <p className="text-2xl font-bold text-[#A31621]">
                            ৳ {price}.00
                          </p>
                        </div>
                      );
                    })}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default DeliveryChargePage;
