/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const PayoutPage = () => {
  const [merchant, setMerchant] = useState<string>("");
  const [payouts, setPayouts] = useState<Array<any>>([]);

  const handleSearch = () => {
    // Example: Fetch payouts based on the selected merchant
    setPayouts([
      { id: 1, cardType: "Visa", merchant: "Shop A", account: "12345", transactionId: "TXN123", amount: "৳5000" },
      { id: 2, cardType: "MasterCard", merchant: "Shop B", account: "67890", transactionId: "TXN456", amount: "৳7500" },
    ]);
  };

  const handleClear = () => {
    setMerchant("");
    setPayouts([]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-purple-600 mb-4">Dashboard / Payout</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Payout Box */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Payout</h2>
        </div>

        {/* Merchant Selection Box */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Merchant</h2>
          <select
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            className="w-full border rounded-lg p-2 outline-none"
          >
            <option value="">Select Merchant</option>
            <option value="Shop A">Shop A</option>
            <option value="Shop B">Shop B</option>
          </select>

          {/* Buttons */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleSearch}
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
            >
              🔍 Search
            </button>
            <button
              onClick={handleClear}
              className="flex-1 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition"
            >
              ❌ Clear
            </button>
          </div>
        </div>
      </div>

      {/* Payout List Table */}
      <div className="bg-white p-4 rounded-xl shadow-md mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Payout List</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Card Type</th>
                <th className="p-2 border">Merchant</th>
                <th className="p-2 border">From Account</th>
                <th className="p-2 border">Transaction ID</th>
                <th className="p-2 border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payouts.length > 0 ? (
                payouts.map((payout, index) => (
                  <tr key={payout.id} className="text-center">
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border">{payout.cardType}</td>
                    <td className="p-2 border">{payout.merchant}</td>
                    <td className="p-2 border">{payout.account}</td>
                    <td className="p-2 border">{payout.transactionId}</td>
                    <td className="p-2 border font-semibold text-green-600">{payout.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    No Payouts Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 mt-6">
        Copyright © All rights reserved. Development by ON2digital
      </div>
    </div>
  );
};

export default PayoutPage;