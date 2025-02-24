import React, { useState } from 'react';

interface FormData {
  businessName: string;
  email: string;
  openingBalance: string;
  vat: string;
  nid: File | null;
  tradeLicense: File | null;
  name: string;
  phone: string;
  password: string;
  hub: string;
  status: string;
  image: File | null;
  referenceName: string;
  referencePhone: string;
  paymentPeriod: string;
  walletUseActivation: boolean;
  address: string;
  returnCharges: string;
  codChargeInsideCity: string;
  codChargeSubCity: string;
  codChargeOutsideCity: string;
}

const CreateMerchant: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    email: '',
    openingBalance: '',
    vat: '',
    nid: null,
    tradeLicense: null,
    name: '',
    phone: '',
    password: '',
    hub: '',
    status: 'Active',
    image: null,
    referenceName: '',
    referencePhone: '',
    paymentPeriod: '2',
    walletUseActivation: false,
    address: '',
    returnCharges: '100',
    codChargeInsideCity: '1',
    codChargeSubCity: '2',
    codChargeOutsideCity: '3',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files ? files[0] : null }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto my-10 border border-blue-500">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Create Merchant</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <label className="block font-medium text-gray-700">
            Business Name *
            <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full p-2 border border-blue-400 rounded-lg" required />
          </label>

          <label className="block font-medium text-gray-700">
            Email
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-blue-400 rounded-lg" />
          </label>

          <label className="block font-medium text-gray-700">
            Opening Balance
            <input type="text" name="openingBalance" value={formData.openingBalance} onChange={handleChange} className="w-full p-2 border border-blue-400 rounded-lg" />
          </label>

          <label className="block font-medium text-gray-700">
            VAT %
            <input type="text" name="vat" value={formData.vat} onChange={handleChange} className="w-full p-2 border border-blue-400 rounded-lg" />
          </label>

          <label className="block font-medium text-gray-700">
            NID
            <input type="file" name="nid" onChange={handleChange} className="w-full p-2 border border-blue-400 rounded-lg" />
          </label>

          <label className="block font-medium text-gray-700">
            Trade License
            <input type="file" name="tradeLicense" onChange={handleChange} className="w-full p-2 border border-blue-400 rounded-lg" />
          </label>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <label className="block font-medium text-gray-700">
            Name *
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-blue-400 rounded-lg" required />
          </label>

          <label className="block font-medium text-gray-700">
            Phone *
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-blue-400 rounded-lg" required />
          </label>

          <label className="block font-medium text-gray-700">
            Password *
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-blue-400 rounded-lg" required />
          </label>

          <label className="block font-medium text-gray-700">
            Hub *
            <select name="hub" value={formData.hub} onChange={handleChange} className="w-full p-2 border border-blue-400 rounded-lg">
              <option value="">Select Branch</option>
            </select>
          </label>

          <label className="block font-medium text-gray-700">
            Status
            <input type="text" name="status" value={formData.status} className="w-full p-2 border border-blue-400 rounded-lg" disabled />
          </label>

          <label className="block font-medium text-gray-700">
            Image
            <input type="file" name="image" onChange={handleChange} className="w-full p-2 border border-blue-400 rounded-lg" />
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="col-span-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateMerchant;
