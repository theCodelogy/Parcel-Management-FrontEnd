import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateSalary from "./CreateSalary";

interface Salary {
  id: number;
  user: string;
  email: string;
  month: string;
  amount: string;
  status: string;
  note: string;
}

const initialSalaries: Salary[] = [
  {
    id: 1,
    user: "John Doe",
    email: "john.doe@example.com",
    month: "January",
    amount: "৳20,000",
    status: "Unpaid",
    note: "New employee",
  },
  {
    id: 2,
    user: "Jane Smith",
    email: "jane.smith@example.com",
    month: "February",
    amount: "৳18,000",
    status: "Paid",
    note: "Performance bonus",
  },
];

const SalaryGenerate = () => {
  const [salaries, setSalaries] = useState<Salary[]>(initialSalaries);

  // Auto Generate Salary Button Handler
  const handleAutoGenerateSalary = () => {
    alert("Salaries auto-generated!");
    // Logic to auto-generate salaries can be added here
  };

  // Create Salary Button Handler
  const handleCreateSalary = () => {
    alert("Create Salary button clicked!");
    // Logic to create new salary can be added here
  };

  // Conditional class for salary status
  const getStatusClass = (status: string) => {
    return status === "Paid"
      ? "bg-green-500 text-white px-4 py-2 rounded-full text-center"
      : "bg-red-500 text-white px-4 py-2 rounded-full text-center";
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Salary Generate
        </h2>

        {/* Salary Generate Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleAutoGenerateSalary}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            <FaPlus className="mr-2" />
            Auto Generate Salary
          </button>

          <button
            onClick={handleCreateSalary}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            <FaPlus className="mr-2" />
            Create Salary
          </button>
        </div>
      </div>

      {/* Salary Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Month</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Note</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {salaries.map((salary) => (
              <tr key={salary.id}>
                <td className="p-3">{salary.id}</td>
                <td className="p-3">
                  {/* Displaying Name and Email in the same box */}
                  <div>
                    <div>{salary.user}</div>
                    <div className="text-sm text-gray-500">{salary.email}</div>
                  </div>
                </td>
                <td className="p-3">{salary.month}</td>
                <td className="p-3">{salary.amount}</td>
                <td className="p-3">
                  {/* Status button with conditional color */}
                  <div className={getStatusClass(salary.status)}>
                    {salary.status}
                  </div>
                </td>
                <td className="p-3">{salary.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateSalary/>
    </div>
  );
};

export default SalaryGenerate;
