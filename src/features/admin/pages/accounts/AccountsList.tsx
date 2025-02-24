/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import CreateAccount from "./CreateAccount";

interface Account {
  id: number;
  gateway: string;
  accountInfo: string;
  status: string;
  bank: string;
}

const initialAccounts: Account[] = [
  {
    id: 1,
    gateway: "Payment Gateway 1",
    accountInfo: "Account #12345",
    status: "Active",
    bank: "Bank A",
  },
  {
    id: 2,
    gateway: "Payment Gateway 2",
    accountInfo: "Account #67890",
    status: "Inactive",
    bank: "Bank B",
  },
];

const AccountTable = () => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [filters, setFilters] = useState({
    holderName: "",
    accountNo: "",
    bank: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateAccount = () => {
    // Your logic to open the modal or redirect for account creation can go here
    console.log("Create Account Clicked");
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Accounts</h2>

      {/* Filters */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          name="holderName"
          placeholder="Holder Name"
          value={filters.holderName}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700"
        />
        <input
          type="text"
          name="accountNo"
          placeholder="Account No"
          value={filters.accountNo}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700"
        />
        <select
          name="bank"
          value={filters.bank}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700"
        >
          <option value="">Select Bank</option>
          <option value="Bank A">Bank A</option>
          <option value="Bank B">Bank B</option>
          <option value="Bank C">Bank C</option>
        </select>
      </div>

      {/* Create Account Button */}
      <button
        onClick={handleCreateAccount}
        className="px-4 py-2 bg-blue-600 text-white rounded-md mb-4"
      >
        Create Account
      </button>

      {/* Account Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Gateway</th>
              <th className="p-3 text-left">Account Info</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Bank</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {accounts
              .filter((account) =>
                account.gateway.toLowerCase().includes(filters.holderName.toLowerCase()) &&
                account.accountInfo.toLowerCase().includes(filters.accountNo.toLowerCase()) &&
                (filters.bank ? account.bank === filters.bank : true)
              )
              .map((account) => (
                <tr key={account.id}>
                  <td className="p-3">{account.id}</td>
                  <td className="p-3">{account.gateway}</td>
                  <td className="p-3">{account.accountInfo}</td>
                  <td className="p-3">
                    <button
                      className={`px-4 py-2 rounded-md text-white font-semibold ${
                        account.status === "Active"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {account.status}
                    </button>
                  </td>
                  <td className="p-3">{account.bank}</td>
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
      <CreateAccount/>
    </div>
  );
};

export default AccountTable;
