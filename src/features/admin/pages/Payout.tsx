import React, { useState } from "react";

const Payout: React.FC = () => {
  const [merchant, setMerchant] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", merchant);
  };

  const handleClear = () => {
    setMerchant("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Breadcrumb */}
      <div className="text-gray-500 text-sm mb-4">
        <span className="text-purple-500">Dashboard</span> / Payout
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Payout Box */}
        <div className="bg-white shadow-md rounded-lg p-6 col-span-1 md:col-span-1">
          <h2 className="text-xl font-semibold">Payout</h2>

          {/* Merchant Dropdown */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">
              Merchant
            </label>
            <select
              className="w-full border rounded p-2"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
            >
              <option value="">Select Merchant</option>
              <option value="merchant1">Merchant 1</option>
              <option value="merchant2">Merchant 2</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              className="flex-1 bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 transition flex items-center justify-center"
              onClick={handleSearch}
            >
              🔍 Search
            </button>
            <button
              className="flex-1 bg-pink-500 text-white px-4 py-2 rounded shadow hover:bg-pink-600 transition flex items-center justify-center"
              onClick={handleClear}
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Payout List Box */}
        <div className="bg-white shadow-md rounded-lg p-6 col-span-2">
          <h2 className="text-xl font-semibold">Payout List</h2>

          {/* Table */}
          <div className="mt-4">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">#</th>
                  <th className="border p-2 text-left">Card Type</th>
                  <th className="border p-2 text-left">Merchant</th>
                  <th className="border p-2 text-left">From Account</th>
                  <th className="border p-2 text-left">Transaction Id</th>
                  <th className="border p-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* No Results */}
                <tr>
                  <td colSpan={6} className="border p-4 text-center text-gray-500">
                    Showing 0 of 0 results
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-8">
        Copyright © All rights reserved. Development by <span className="text-blue-500">ON2digital</span>
      </div>
    </div>
  );
};

export default Payout;
