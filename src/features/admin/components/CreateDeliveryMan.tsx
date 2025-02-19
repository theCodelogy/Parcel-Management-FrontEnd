import React, { useState } from "react";

const CreateDeliveryMan: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    return_charge: "",
    opening_balance: "",
    salary: "",
    hub_id: "6",
    image_id: "",
    address: "",
    lat: "",
    long: "",
    mobile: "",
    delivery_charge: "",
    pickup_charge: "",
    password: "",
    status: "1",
    driving_license_image_id: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create Delivery Man</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Return Charge</label>
            <input
              type="number"
              name="return_charge"
              value={formData.return_charge}
              onChange={handleChange}
              className="w-full border p-2 rounded-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Opening Balance</label>
            <input
              type="number"
              name="opening_balance"
              value={formData.opening_balance}
              onChange={handleChange}
              className="w-full border p-2 rounded-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full border p-2 rounded-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Hub</label>
            <select
              name="hub_id"
              value={formData.hub_id}
              onChange={handleChange}
              className="w-full border p-2 rounded-full"
            >
              <option value="6">Badda</option>
              <option value="3">Dhanmondi</option>
              <option value="5">Jatrabari</option>
              <option value="1">Mirpur-10</option>
              <option value="4">Old Dhaka</option>
              <option value="2">Uttara</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border p-2 rounded-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border p-2 rounded-full"
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#7e0095] text-white rounded-full "
          >
            Save
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-[#e83e8c] text-white rounded-full "
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDeliveryMan;