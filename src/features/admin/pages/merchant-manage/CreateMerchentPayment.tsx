import React, { useState } from 'react';

interface MerchantPaymentFormData {
  merchant: string;
  invoice: string;
  amount: number;
  merchantAccount: string;
  isProcessed: boolean;
  transId: string;
  fromAccount: string;
  reference: string;
  description: string;
}

const CreateMerchantPaymentForm: React.FC = () => {
  const [formData, setFormData] = useState<MerchantPaymentFormData>({
    merchant: '',
    invoice: '',
    amount: 0,
    merchantAccount: '',
    isProcessed: false,
    transId: '',
    fromAccount: '',
    reference: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="text-black p-8 rounded-xl shadow-lg max-w-2xl mx-auto my-20">
      <h2 className="text-3xl font-bold text-center mb-6">Create Merchant Payment</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Merchant */}
        <input
          type="text"
          name="merchant"
          placeholder="Enter Merchant Name"
          value={formData.merchant}
          onChange={handleChange}
          required
          className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
        />

        {/* Invoice */}
        <input
          type="text"
          name="invoice"
          placeholder="Enter Invoice"
          value={formData.invoice}
          onChange={handleChange}
          required
          className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
        />

        {/* Amount */}
        <input
          type="number"
          name="amount"
          placeholder="Enter Amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
        />

        {/* Merchant Account */}
        <select
          name="merchantAccount"
          value={formData.merchantAccount}
          onChange={handleChange}
          required
          className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
        >
          <option value="">Select Merchant Account</option>
          {/* Add options here */}
          <option value="Account1">Account 1</option>
          <option value="Account2">Account 2</option>
        </select>

        {/* Is Processed? */}
        <div className="col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isProcessed"
              checked={formData.isProcessed}
              onChange={handleChange}
              className="mr-2"
            />
            Is Processed?
          </label>
        </div>

        {/* Conditional fields */}
        {formData.isProcessed && (
          <>
            {/* Trans. ID */}
            <input
              type="text"
              name="transId"
              placeholder="Enter Transaction ID"
              value={formData.transId}
              onChange={handleChange}
              required
              className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
            />

            {/* From Account */}
            <select
              name="fromAccount"
              value={formData.fromAccount}
              onChange={handleChange}
              required
              className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
            >
              <option value="">Select From Account</option>
              {/* Add options here */}
              <option value="AccountA">Account A</option>
              <option value="AccountB">Account B</option>
            </select>

            {/* Reference */}
            <input
              type="text"
              name="reference"
              placeholder="Enter Reference"
              value={formData.reference}
              onChange={handleChange}
              required
              className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
            />
          </>
        )}

        {/* Description */}
        <textarea
          name="description"
          placeholder="Enter Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800 col-span-2"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 bg-indigo-500 p-2 rounded text-white hover:bg-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateMerchantPaymentForm;
