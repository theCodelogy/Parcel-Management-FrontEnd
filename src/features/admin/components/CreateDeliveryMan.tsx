import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  returnCharge: string;
  openingBalance: string;
  salary: string;
  hub: string;
  image: File | null;
  address: string;
  phone: string;
  deliveryCharge: string;
  pickupCharge: string;
  password: string;
  status: string;
  drivingLicense: File | null;
}

const CreateDeliveryMan: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    returnCharge: '',
    openingBalance: '',
    salary: '',
    hub: 'Badda',
    image: null,
    address: '',
    phone: '',
    deliveryCharge: '',
    pickupCharge: '',
    password: '',
    status: 'Active',
    drivingLicense: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const drivingLicense = e.target.drivingLicense;
    console.log(drivingLicense);
    // console.log('Form submitted:', formData);
  };

  return (
    <div className="text-black p-8 rounded-xl shadow-lg max-w-2xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-6">Create Delivery Man</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        
        {/* Name */}
        <input type="text" name="name" placeholder="Name *" value={formData.name} onChange={handleChange} className="p-2 rounded-lg border border-sky-600 w-full" required />

        {/* Email */}
        <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} className="p-2 rounded-lg border border-sky-600 w-full" required />

        {/* Return Charge */}
        <input type="text" name="returnCharge" placeholder="Return Charge" value={formData.returnCharge} onChange={handleChange} className="p-2 rounded-lg border border-sky-600 w-full" />

        {/* Opening Balance */}
        <input type="text" name="openingBalance" placeholder="Opening Balance" value={formData.openingBalance} onChange={handleChange} className="p-2 rounded-lg border border-sky-600 w-full" />

        {/* Salary */}
        <input type="text" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} className="p-2 rounded-lg border border-sky-600 w-full" />

        {/* Hub */}
        <select name="hub" value={formData.hub} onChange={handleChange} className="p-2 rounded-lg border border-sky-600 w-full">
          <option value="Badda">Badda</option>
        </select>

        {/* Image */}
        <input type="file" name="image" onChange={handleChange} className="p-2 rounded-lg border border-sky-600 w-full" />

        {/* Address */}
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="p-2 rounded-lg border border-sky-600 w-full" />

        {/* Phone */}
        <input type="text" name="phone" placeholder="Phone *" value={formData.phone} onChange={handleChange} className="p-2 rounded-lg border border-sky-600 w-full" required />

        {/* Delivery Charge */}
        <input type="text" name="deliveryCharge" placeholder="Delivery Charge" value={formData.deliveryCharge} onChange={handleChange} className="p-2 rounded-lg border border-sky-600 w-full" />

        {/* Pickup Charge */}
        <input type="text" name="pickupCharge" placeholder="Pickup Charge" value={formData.pickupCharge} onChange={handleChange} className="p-2 rounded-lg border border-sky-600 w-full" />

        {/* Password */}
        <input type="password" name="password" placeholder="Password *" value={formData.password} onChange={handleChange} className="p-2 rounded-lg border border-sky-600 w-full" required />

        {/* Status Dropdown */}
        <select name="status" value={formData.status} onChange={handleChange} className="p-2 rounded-lg border border-sky-600 w-full">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Driving License File Upload */}
        <input type="file" name="drivingLicense" onChange={handleChange} className="p-2 rounded-lg border border-sky-600 w-full" />

        {/* Submit Button */}
        <button type="submit" className="col-span-2 bg-indigo-500 p-2 rounded text-white hover:bg-indigo-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateDeliveryMan;
