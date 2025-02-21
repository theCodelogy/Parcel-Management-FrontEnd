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
  status: boolean;
  drivingLicense: boolean;
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
    status: false,
    drivingLicense: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, image: files ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="text-black p-8 rounded-xl shadow-lg max-w-2xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-6">Create Delivery Man</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Name */}
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder=" "
            value={formData.name}
            onChange={handleChange}
            className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
          <label
            className="absolute top-2 left-3 text-xs text-sky-600 duration-200 transform peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-sky-800"
            htmlFor="name"
          >
            Name
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
            className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
          <label
            className="absolute top-2 left-3 text-xs text-sky-600 duration-200 transform peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-sky-800"
            htmlFor="email"
          >
            Email
          </label>
        </div>

        {/* Return Charge */}
        <input
          type="text"
          name="returnCharge"
          placeholder="Enter Return Charge"
          value={formData.returnCharge}
          onChange={handleChange}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Opening Balance */}
        <input
          type="text"
          name="openingBalance"
          placeholder="Enter Opening Balance"
          value={formData.openingBalance}
          onChange={handleChange}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Salary */}
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Hub */}
        <select
          name="hub"
          value={formData.hub}
          onChange={handleChange}
          className="p-2 rounded-lg border border-sky-600 w-full"
        >
          <option value="Badda">Badda</option>
        </select>

        {/* Image */}
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Address */}
        <div className="relative">
          <input
            type="text"
            name="address"
            placeholder=" "
            value={formData.address}
            onChange={handleChange}
            className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
          <label
            className="absolute top-2 left-3 text-xs text-sky-600 duration-200 transform peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-sky-800"
            htmlFor="address"
          >
            Address
          </label>
        </div>

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          value={formData.phone}
          onChange={handleChange}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Delivery Charge */}
        <input
          type="text"
          name="deliveryCharge"
          placeholder="Enter Delivery Charge"
          value={formData.deliveryCharge}
          onChange={handleChange}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Pickup Charge */}
        <input
          type="text"
          name="pickupCharge"
          placeholder="Enter Pickup Charge"
          value={formData.pickupCharge}
          onChange={handleChange}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Status Checkbox */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
            className="rounded"
          />
          Active
        </label>

        {/* Driving License Checkbox */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="drivingLicense"
            checked={formData.drivingLicense}
            onChange={handleChange}
            className="rounded"
          />
          Driving License
        </label>

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

export default CreateDeliveryMan;
