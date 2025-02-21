import React, { useState } from 'react';

interface BranchFormData {
  name: string;
  phone: string;
  address: string;
}

const CreateBranchForm: React.FC = () => {
  const [formData, setFormData] = useState<BranchFormData>({
    name: '',
    phone: '',
    address: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="text-black p-8 rounded-xl shadow-lg max-w-2xl mx-auto my-20">
      <h2 className="text-3xl font-bold text-center mb-6">Create Branch</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter Branch Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
        />

        {/* Address */}
        <textarea
          name="address"
          placeholder="Enter Branch Address"
          value={formData.address}
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

export default CreateBranchForm;
