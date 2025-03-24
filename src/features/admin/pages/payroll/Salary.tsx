import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import SalaryCreate from "./SalaryCreate";

interface Salary {
  id: number;
  user: string;
  fromAccount: string;
  month: string;
  date: string;
  note: string;
  amount: string;
}

const initialSalaries: Salary[] = [
  {
    id: 1,
    user: "John Doe",
    fromAccount: "Account 1",
    month: "January",
    date: "2025-01-15",
    note: "Performance bonus",
    amount: "৳20,000",
  },
  {
    id: 2,
    user: "Jane Smith",
    fromAccount: "Account 2",
    month: "February",
    date: "2025-02-10",
    note: "Salary for the month",
    amount: "৳18,000",
  },
];

const Salary: React.FC = () => {
  const [salaries, setSalaries] = useState<Salary[]>(initialSalaries);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  // Create Salary Button Handler
  const handleCreateSalary = () => {
    alert("Create Salary button clicked!");
    // Example logic to create a new salary
    const newSalary = {
      id: salaries.length + 1,
      user: "New User",
      fromAccount: "Account 3",
      month: "March",
      date: "2025-03-15",
      note: "Newly created",
      amount: "৳21,000",
    };
    setSalaries([...salaries, newSalary]); // Update the state with the new salary
  };

  // Filter Salaries by User and Month
  const filteredSalaries = salaries.filter((salary) => {
    return (
      (selectedUser ? salary.user === selectedUser : true) &&
      (selectedMonth
        ? new Date(salary.date).toISOString().slice(0, 7) === selectedMonth
        : true)
    );
  });

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Salary
        </h2>

        {/* Salary Generate Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleCreateSalary}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            <FaPlus className="mr-2" />
            Create Salary
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex gap-4 mb-4">
        {/* User Filter */}
        <div>
          <label
            htmlFor="user"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            User
          </label>
          <select
            id="user"
            className="mt-1 block w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-2"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select User</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
          </select>
        </div>

        {/* Month Filter */}
        <div>
          <label
            htmlFor="month"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Month
          </label>
          <input
            type="month"
            id="month"
            className="mt-1 block w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>
      </div>

      {/* Salary Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">From Account</th>
              <th className="p-3 text-left">Month</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Note</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {filteredSalaries.map((salary) => (
              <tr key={salary.id}>
                <td className="p-3">{salary.id}</td>
                <td className="p-3">{salary.user}</td>
                <td className="p-3">{salary.fromAccount}</td>
                <td className="p-3">{salary.month}</td>
                <td className="p-3">{salary.date}</td>
                <td className="p-3">{salary.note}</td>
                <td className="p-3">{salary.amount}</td>
                <td className="p-3">
                  {/* Add actions like edit or delete here */}
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SalaryCreate />
    </div>
  );
};

export default Salary;
