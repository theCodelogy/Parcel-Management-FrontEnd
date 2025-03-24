import React, { useState } from "react";
import CreateFundTransfer from "./CreateFundTransfer";

interface FundTransfer {
  id: number;
  fromAccount: string;
  toAccount: string;
  date: string;
  amount: number;
}

const initialTransfers: FundTransfer[] = [
  {
    id: 1,
    fromAccount: "Account #12345",
    toAccount: "Account #67890",
    date: "2025-02-22",
    amount: 500,
  },
  {
    id: 2,
    fromAccount: "Account #54321",
    toAccount: "Account #98765",
    date: "2025-02-21",
    amount: 200,
  },
];

const FundTransferTable = () => {
  const [transfers, setTransfers] = useState<FundTransfer[]>(initialTransfers);
  const [filters, setFilters] = useState({
    fromAccount: "",
    toAccount: "",
    date: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTransfer = (newTransfer: FundTransfer) => {
    setTransfers((prevTransfers) => [...prevTransfers, newTransfer]);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Fund Transfers
      </h2>

      {/* Filters */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          name="fromAccount"
          placeholder="From Account"
          value={filters.fromAccount}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700"
        />
        <input
          type="text"
          name="toAccount"
          placeholder="To Account"
          value={filters.toAccount}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700"
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700"
        />
      </div>

      {/* Create Fund Transfer Button */}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md mb-4"
        onClick={() =>
          addTransfer({
            id: 3,
            fromAccount: "Account #11111",
            toAccount: "Account #22222",
            date: "2025-02-23",
            amount: 300,
          })
        }
      >
        Create Fund Transfer
      </button>

      {/* Fund Transfer Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">From Account</th>
              <th className="p-3 text-left">To Account</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {transfers
              .filter(
                (transfer) =>
                  transfer.fromAccount
                    .toLowerCase()
                    .includes(filters.fromAccount.toLowerCase()) &&
                  transfer.toAccount
                    .toLowerCase()
                    .includes(filters.toAccount.toLowerCase()) &&
                  (filters.date ? transfer.date === filters.date : true)
              )
              .map((transfer) => (
                <tr key={transfer.id}>
                  <td className="p-3">{transfer.id}</td>
                  <td className="p-3">{transfer.fromAccount}</td>
                  <td className="p-3">{transfer.toAccount}</td>
                  <td className="p-3">{transfer.date}</td>
                  <td className="p-3">${transfer.amount}</td>
                  <td className="p-3">
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-md">
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md ml-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <CreateFundTransfer />
    </div>
  );
};

export default FundTransferTable;
