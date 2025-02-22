import React, { useState } from 'react';

interface IncomeFormData {
  accountHead: string;
  parcelTrackingId: string;
  date: string;
  receipt: File | null;
  toAccount: string;
  amount: string;
  note: string;
}

const CreateIncome: React.FC = () => {
  const [formData, setFormData] = useState<IncomeFormData>({
    accountHead: '',
    parcelTrackingId: '',
    date: '2025-02-22',
    receipt: null,
    toAccount: '',
    amount: '',
    note: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Income Form submitted:', formData);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto my-10 border border-green-500">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Create Income</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <label className="block font-medium text-gray-700">
            Account Heads *
            <select name="accountHead" value={formData.accountHead} onChange={handleChange} className="w-full p-2 border border-green-400 rounded-lg">
              <option value="">Select Account Heads</option>
            </select>
          </label>

          <label className="block font-medium text-gray-700">
            Parcel Tracking ID
            <input type="text" name="parcelTrackingId" value={formData.parcelTrackingId} onChange={handleChange} className="w-full p-2 border border-green-400 rounded-lg" />
          </label>

          <label className="block font-medium text-gray-700">
            Date *
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border border-green-400 rounded-lg" required />
          </label>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <label className="block font-medium text-gray-700">
            Receipt
            <input type="file" name="receipt" onChange={handleChange} className="w-full p-2 border border-green-400 rounded-lg" />
          </label>

          <label className="block font-medium text-gray-700">
            To Account *
            <select name="toAccount" value={formData.toAccount} onChange={handleChange} className="w-full p-2 border border-green-400 rounded-lg">
              <option value="">Select To Account</option>
            </select>
          </label>

          <label className="block font-medium text-gray-700">
            Amount *
            <input type="text" name="amount" value={formData.amount} onChange={handleChange} className="w-full p-2 border border-green-400 rounded-lg" required />
          </label>
        </div>

        {/* Note Section */}
        <label className="col-span-2 block font-medium text-gray-700">
          Note
          <input type="text" name="note" value={formData.note} onChange={handleChange} className="w-full p-2 border border-green-400 rounded-lg" />
        </label>

        {/* Submit Button */}
        <button type="submit" className="col-span-2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateIncome;
