import React, { useState } from "react";
import CreateIncome from "./CreateIncome";

interface Income {
  id: number;
  details: string;
  toAccount: string;
  date: string;
  receipt: string;
  amount: number;
}

const initialIncomes: Income[] = [
  {
    id: 1,
    details: "Salary Payment",
    toAccount: "Account #67890",
    date: "2025-02-22",
    receipt: "Receipt #001",
    amount: 1500,
  },
  {
    id: 2,
    details: "Freelance Work",
    toAccount: "Account #98765",
    date: "2025-02-21",
    receipt: "Receipt #002",
    amount: 800,
  },
];

const Income = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [incomes, setIncomes] = useState<Income[]>(initialIncomes);
  const [filters, setFilters] = useState({
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

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Income Records</h2>

      {/* Filters */}
      <div className="mb-4 flex gap-4">
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

      {/* Create Income Button */}
      <button className="px-4 py-2 bg-green-600 text-white rounded-md mb-4">
        Create Income
      </button>

      {/* Income Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Details</th>
              <th className="p-3 text-left">To Account</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Receipt</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {incomes
              .filter((income) =>
                income.toAccount.toLowerCase().includes(filters.toAccount.toLowerCase()) &&
                (filters.date ? income.date === filters.date : true)
              )
              .map((income) => (
                <tr key={income.id}>
                  <td className="p-3">{income.id}</td>
                  <td className="p-3">{income.details}</td>
                  <td className="p-3">{income.toAccount}</td>
                  <td className="p-3">{income.date}</td>
                  <td className="p-3">{income.receipt}</td>
                  <td className="p-3">${income.amount}</td>
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
      <CreateIncome/>
    </div>
  );
};

export default Income;
