import React, { useState } from "react";

const CreateSalary: React.FC = () => {
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);

  const handleSubmit = () => {
    console.log({
      user,
      month,
      year,
      amount,
      note,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Salary Generate</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* User Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">User *</label>
            <select
              className="w-full border rounded p-2"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            >
              <option value="">Select User</option>
              <option value="User1">User 1</option>
              <option value="User2">User 2</option>
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Amount *</label>
            <input
              type="number"
              className="w-full border rounded p-2"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Month Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Month *</label>
            <select
              className="w-full border rounded p-2"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Year Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Year *</label>
            <select
              className="w-full border rounded p-2"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Note Input */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Note</label>
            <textarea
              className="w-full border rounded p-2"
              placeholder="Enter Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 transition"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button className="bg-pink-500 text-white px-4 py-2 rounded shadow hover:bg-pink-600 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSalary;
