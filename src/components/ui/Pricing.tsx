import React, { useState } from "react";

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("Same Day");
  
  const tabs = [
    { name: "Same Day", prices: [
      { weight: "1", price: 80 },
      { weight: "2", price: 120 },
      { weight: "3", price: 160 },
      { weight: "4", price: 200 },
      { weight: "5", price: 240 },
      { weight: "6", price: 280 },
      { weight: "7", price: 320 },
      { weight: "8", price: 370 },
      { weight: "9", price: 410 },
      { weight: "10", price: 450 },
    ] },
    { name: "Next Day", prices: [
      { weight: "1", price: 70 },
      { weight: "2", price: 110 },
      { weight: "3", price: 150 },
      { weight: "4", price: 190 },
      { weight: "5", price: 230 },
      { weight: "6", price: 270 },
      { weight: "7", price: 310 },
      { weight: "8", price: 360 },
      { weight: "9", price: 400 },
      { weight: "10", price: 440 },
    ] },
    { name: "Sub City", prices: [
      { weight: "1", price: 90 },
      { weight: "2", price: 130 },
      { weight: "3", price: 170 },
      { weight: "4", price: 210 },
      { weight: "5", price: 250 },
      { weight: "6", price: 290 },
      { weight: "7", price: 330 },
      { weight: "8", price: 380 },
      { weight: "9", price: 420 },
      { weight: "10", price: 460 },
    ] },
    { name: "Outside City", prices: [
      { weight: "1", price: 100 },
      { weight: "2", price: 140 },
      { weight: "3", price: 180 },
      { weight: "4", price: 220 },
      { weight: "5", price: 260 },
      { weight: "6", price: 300 },
      { weight: "7", price: 340 },
      { weight: "8", price: 390 },
      { weight: "9", price: 430 },
      { weight: "10", price: 470 },
    ] },
  ];

  return (
    <div className="p-6 text-center bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-[#A31621] inline-block mb-6">
        City & Town Express Pricing
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
        {tabs.find((tab) => tab.name === activeTab)?.prices.map(({ weight, price }) => (
          <div
            key={weight}
            className="border border-[#A31621] p-4 rounded-lg shadow-md"
          >
            <p className="text-lg font-semibold">Up To {weight} ( KG )</p>
            <p className="text-2xl font-bold">৳ {price}.00</p>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default Pricing;
