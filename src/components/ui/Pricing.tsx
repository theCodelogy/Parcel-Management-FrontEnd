import React, { useState } from "react";

interface Price {
  weight: string;
  price: number;
}

interface Tab {
  name: string;
  prices: Price[];
}

const calculatePrices = (
  base: number,
  increment: number,
  maxKg: number = 10
): Price[] => {
  return Array.from({ length: maxKg }, (_, i) => ({
    weight: (i + 1).toString(),
    price: base + i * increment,
  }));
};

const Pricing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Same Day");

  const tabs: Tab[] = [
    {
      name: "Same Day",
      prices: calculatePrices(60, 40),
    },
    {
      name: "Next Day",
      prices: calculatePrices(70, 40),
    },
    {
      name: "Sub City",
      prices: calculatePrices(100, 40),
    },
    {
      name: "Outside City",
      prices: calculatePrices(130, 40),
    },
  ];

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-[#A31621] inline-block mb-6">
        Classic Courier BD Pricing
      </h1>

      <div className="flex justify-center space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === tab.name
                ? "bg-[#A31621] text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {tabs
          .find((tab) => tab.name === activeTab)
          ?.prices.map(({ weight, price }) => (
            <div
              key={weight}
              className="border border-[#A31621] p-4 rounded-lg shadow-md"
            >
              <p className="text-lg font-semibold">Up To {weight} (KG)</p>
              <p className="text-2xl font-bold">৳ {price}.00</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Pricing;
