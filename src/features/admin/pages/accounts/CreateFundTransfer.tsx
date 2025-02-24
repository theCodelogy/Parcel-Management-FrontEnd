import React, { useState } from "react";

interface FundTransferData {
  fromAccount: string;
  toAccount: string;
  description: string;
  amount: string;
  date: string;
}

const CreateFundTransfer: React.FC = () => {
  const [formData, setFormData] = useState<FundTransferData>({
    fromAccount: "",
    toAccount: "",
    description: "",
    amount: "",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="text-black p-8 rounded-xl shadow-lg max-w-2xl mx-auto my-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-6">Create Fund Transfer</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        
        {/* From Account */}
        <div className="col-span-2">
          <label className="block text-sky-600 font-semibold mb-1">From Account *</label>
          <select
            name="fromAccount"
            value={formData.fromAccount}
            onChange={handleChange}
            required
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          >
            <option value="">Select From Account</option>
            <option value="Account1">Account 1</option>
            <option value="Account2">Account 2</option>
          </select>
        </div>

        {/* To Account */}
        <div className="col-span-2">
          <label className="block text-sky-600 font-semibold mb-1">To Account *</label>
          <select
            name="toAccount"
            value={formData.toAccount}
            onChange={handleChange}
            required
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          >
            <option value="">Select To Account</option>
            <option value="Account3">Account 3</option>
            <option value="Account4">Account 4</option>
          </select>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sky-600 font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
        </div>

        {/* Amount */}
        <div className="col-span-2">
          <label className="block text-sky-600 font-semibold mb-1">Amount *</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
        </div>

        {/* Date */}
        <div className="col-span-2">
          <label className="block text-sky-600 font-semibold mb-1">Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-indigo-500 p-2 rounded text-white hover:bg-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFundTransfer;
