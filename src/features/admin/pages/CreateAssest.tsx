import React, { useState } from "react";

const CreateAsset: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    assetCategory: "",
    hub: "",
    supplierName: "",
    quantity: "",
    warranty: "",
    invoiceNo: "",
    amount: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl max-w-3xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-sky-600">Add Asset</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        
        {/* Name */}
        <div className="col-span-2">
          <label className="block text-sky-600 font-semibold mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
            required
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
        </div>

        {/* Asset Category */}
        <div>
          <label className="block text-sky-600 font-semibold mb-1">Asset Category *</label>
          <select
            name="assetCategory"
            value={formData.assetCategory}
            onChange={handleChange}
            required
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          >
            <option value="">Select Asset Category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
        </div>

        {/* Hub */}
        <div>
          <label className="block text-sky-600 font-semibold mb-1">Hub *</label>
          <select
            name="hub"
            value={formData.hub}
            onChange={handleChange}
            required
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          >
            <option value="">Select Branch</option>
            <option value="branch1">Branch 1</option>
            <option value="branch2">Branch 2</option>
          </select>
        </div>

        {/* Supplier Name */}
        <div>
          <label className="block text-sky-600 font-semibold mb-1">Supplier Name</label>
          <input
            type="text"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            placeholder="Enter Supplier Name"
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sky-600 font-semibold mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter Quantity"
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
        </div>

        {/* Warranty */}
        <div>
          <label className="block text-sky-600 font-semibold mb-1">Warranty</label>
          <input
            type="text"
            name="warranty"
            value={formData.warranty}
            onChange={handleChange}
            placeholder="Enter Warranty"
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
        </div>

        {/* Invoice No */}
        <div>
          <label className="block text-sky-600 font-semibold mb-1">Invoice No</label>
          <input
            type="text"
            name="invoiceNo"
            value={formData.invoiceNo}
            onChange={handleChange}
            placeholder="Enter Invoice No"
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sky-600 font-semibold mb-1">Amount *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter Amount"
            required
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sky-600 font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description"
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800 h-20"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-indigo-500 p-2 rounded text-white hover:bg-indigo-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAsset;
