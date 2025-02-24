import React, { useState } from "react";

const CreateAccount: React.FC = () => {
  const [type, setType] = useState("");
  const [user, setUser] = useState("");
  const [gateway, setGateway] = useState("");

  const handleSubmit = () => {
    console.log({
      type,
      user,
      gateway,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-sky-500">
        <h2 className="text-3xl font-bold text-center mb-6 text-sky-600">Create Account</h2>

        <div className="space-y-4">
          {/* Type Selection */}
          <div>
            <label className="block text-sky-600 font-semibold mb-1">Type</label>
            <select
              className="w-full p-2 rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {/* User Selection */}
          <div>
            <label className="block text-sky-600 font-semibold mb-1">User</label>
            <select
              className="w-full p-2 rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            >
              <option value="">Select User</option>
              <option value="User1">User 1</option>
              <option value="User2">User 2</option>
              <option value="User3">User 3</option>
            </select>
          </div>

          {/* Gateway Selection */}
          <div>
            <label className="block text-sky-600 font-semibold mb-1">Gateway *</label>
            <select
              className="w-full p-2 rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
              value={gateway}
              onChange={(e) => setGateway(e.target.value)}
            >
              <option value="">Select Gateway</option>
              <option value="PayPal">PayPal</option>
              <option value="Stripe">Stripe</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            className="w-1/2 bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className="w-1/2 bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
