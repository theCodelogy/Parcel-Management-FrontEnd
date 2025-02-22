import React, { useState } from "react";

const SalaryCreate: React.FC = () => {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // Default current month (YYYY-MM)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default current date (YYYY-MM-DD)
  const [user, setUser] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    console.log({
      month,
      date,
      user,
      account,
      amount,
      note,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Salary</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Month Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Month *</label>
            <input
              type="month"
              className="w-full border rounded p-2"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Date *</label>
            <input
              type="date"
              className="w-full border rounded p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

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

          {/* From Account Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">From Account *</label>
            <select
              className="w-full border rounded p-2"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Account1">Account 1</option>
              <option value="Account2">Account 2</option>
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

export default SalaryCreate;
