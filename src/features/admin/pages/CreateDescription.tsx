import React, { useState } from 'react';

interface DescriptionFormData {
  phone: string;
  name: string;
  trackingId: string;
  details: string;
}

const CreateDescriptionForm: React.FC = () => {
  const [formData, setFormData] = useState<DescriptionFormData>({
    phone: '',
    name: '',
    trackingId: '',
    details: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="text-black p-8 rounded-xl shadow-lg max-w-2xl mx-auto my-20">
      <h2 className="text-3xl font-bold text-center mb-6">Create Description</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
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

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
        />

        {/* Tracking ID */}
        <input
          type="text"
          name="trackingId"
          placeholder="Enter Tracking ID"
          value={formData.trackingId}
          onChange={handleChange}
          className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
        />

        {/* Details */}
        <textarea
          name="details"
          placeholder="Enter Details"
          value={formData.details}
          onChange={handleChange}
          required
          className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800 col-span-2"
        />

        {/* Buttons */}
        <div className="col-span-2 flex justify-center gap-4">
          <button
            type="submit"
            className="bg-indigo-500 p-2 rounded text-white hover:bg-indigo-600"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-red-500 p-2 rounded text-white hover:bg-red-600"
            onClick={() => setFormData({ phone: '', name: '', trackingId: '', details: '' })}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDescriptionForm;