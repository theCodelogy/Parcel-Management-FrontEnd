import React, { useState } from "react";

const WalletRequest: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All Transactions");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-purple-700 mb-4">Dashboard / Wallet Request / List</div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
  {/* Filter Container */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {/* Date Input */}
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-600">Select Date</label>
      <input type="date" className="p-2 border rounded-md w-full" />
    </div>

    {/* Status Dropdown */}
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-600">Status</label>
      <select className="p-2 border rounded-md w-full">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
      </select>
    </div>

    {/* Merchant Dropdown */}
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-600">Merchant</label>
      <select className="p-2 border rounded-md w-full">
        <option value="">Select Merchant</option>
        <option value="merchant1">Merchant 1</option>
        <option value="merchant2">Merchant 2</option>
      </select>
    </div>

    {/* Search & Buttons (Full Width on Mobile) */}
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <input type="text" className="p-2 border rounded-md flex-1" placeholder="Search..." />
      <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
        Filter
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
        Clear
      </button>
    </div>
  </div>
</div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Recharge", value: "৳ 0.00" },
          { title: "Total Deductions", value: "৳ 0.00" },
          { title: "Pending", value: "0" },
          { title: "Confirmed", value: "0" },
        ].map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-500">{card.title}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Wallet Request List */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Wallet Request List</h1>

        {/* Tabs */}
        <div className="flex space-x-4 border-b">
          {["All Transactions", "Recharges"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 text-lg font-medium border-b-2 transition-all ${
                activeTab === tab ? "border-purple-600 text-purple-600" : "border-transparent text-gray-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto mt-4">
          {activeTab === "All Transactions" ? (
            <table className="w-full border-collapse border">
              <thead className="bg-gray-200">
                <tr>
                  {["#", "Merchant", "Date", "Transaction ID", "Payment Method", "Amount", "Status", "Actions"].map(
                    (header) => (
                      <th key={header} className="p-2 border text-left">
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="p-2 border">1</td>
                  <td className="p-2 border">Example Merchant</td>
                  <td className="p-2 border">2025-02-18</td>
                  <td className="p-2 border">TXN123456</td>
                  <td className="p-2 border">Credit Card</td>
                  <td className="p-2 border font-semibold text-green-600">৳500.00</td>
                  <td className="p-2 border">Completed</td>
                  <td className="p-2 border">
                    <button className="text-blue-500 hover:underline">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="w-full border-collapse border">
              <thead className="bg-gray-200">
                <tr>
                  {["#", "Merchant", "Date", "Amount", "Status", "Actions"].map((header) => (
                    <th key={header} className="p-2 border text-left">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="p-2 border">1</td>
                  <td className="p-2 border">Example Merchant</td>
                  <td className="p-2 border">2025-02-18</td>
                  <td className="p-2 border font-semibold text-green-600">৳1000.00</td>
                  <td className="p-2 border">Pending</td>
                  <td className="p-2 border">
                    <button className="text-blue-500 hover:underline">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Footer */}
      {/* <div className="text-center text-gray-500 text-sm mt-6">
        Copyright © All rights reserved. Development by ON2digital
      </div> */}
    </div>
  );
};

export default WalletRequest;