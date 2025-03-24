import { useState } from "react";

interface AccountHead {
  id: number;
  type: string;
  name: string;
  status: string;
}

const initialAccountHeads: AccountHead[] = [
  {
    id: 1,
    type: "Expense",
    name: "Electricity Bill",
    status: "Active",
  },
  {
    id: 2,
    type: "Income",
    name: "Sales Revenue",
    status: "Inactive",
  },
  {
    id: 3,
    type: "Expense",
    name: "Office Rent",
    status: "Active",
  },
];

const AccountHeads = () => {
  const [accountHeads, setAccountHeads] =
    useState<AccountHead[]>(initialAccountHeads);

  // Toggle status between Active and Inactive
  const toggleStatus = (id: number) => {
    setAccountHeads((prevState) =>
      prevState.map((accountHead) =>
        accountHead.id === id
          ? {
              ...accountHead,
              status: accountHead.status === "Active" ? "Inactive" : "Active",
            }
          : accountHead
      )
    );
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Account Heads
      </h2>

      {/* Account Heads Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {accountHeads.map((accountHead) => (
              <tr key={accountHead.id}>
                <td className="p-3">{accountHead.id}</td>
                <td className="p-3">{accountHead.type}</td>
                <td className="p-3">{accountHead.name}</td>
                <td className="p-3">
                  <button
                    onClick={() => toggleStatus(accountHead.id)}
                    className={`px-4 py-2 rounded-md text-white font-semibold ${
                      accountHead.status === "Active"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {accountHead.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountHeads;
