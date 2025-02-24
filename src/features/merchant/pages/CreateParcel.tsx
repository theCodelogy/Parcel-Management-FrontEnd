import React, { useState, useEffect } from "react";

interface DeliveryCharges {
  cashCollection: number;
  deliveryCharge: number;
  codCharge: number;
  totalCharge: number;
  vat: number;
  netPayable: number;
  currentPayable: number;
  totalPayable: number;
}

const CreateParcel: React.FC = () => {
  const [charges, setCharges] = useState<DeliveryCharges>({
    cashCollection: 0,
    deliveryCharge: 0,
    codCharge: 0,
    totalCharge: 0,
    vat: 0,
    netPayable: 0,
    currentPayable: 0,
    totalPayable: 0,
  });

  const [formData, setFormData] = useState({
    merchant: "",
    pickupPoints: "",
    pickupPhone: "",
    pickupAddress: "",
    invoiceNumber: "",
    cashCollection: "",
    sellingPrice: "",
    category: "",
    deliveryType: "",
    packaging: "",
    note: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    liquidFragile: false,
    priority: false,
    paymentMethod: "COD",
    weight: "",
  });

  const [agreed, setAgreed] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  // Calculate delivery charges based on cashCollection and paymentMethod
  useEffect(() => {
    const cashCollection = parseFloat(formData.cashCollection) || 0;
    const deliveryCharge = cashCollection * 0.1; // e.g., 10%
    const codCharge =
      formData.paymentMethod === "COD" ? cashCollection * 0.02 : 0; // e.g., 2% for COD orders
    const totalCharge = cashCollection + deliveryCharge + codCharge;
    const vat = totalCharge * 0.15; // e.g., 15% VAT
    const netPayable = totalCharge + vat;
    const currentPayable = netPayable; // can be updated if needed
    const totalPayable = netPayable; // final amount

    setCharges({
      cashCollection,
      deliveryCharge,
      codCharge,
      totalCharge,
      vat,
      netPayable,
      currentPayable,
      totalPayable,
    });
  }, [formData.cashCollection, formData.paymentMethod]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Add New Parcel
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Parcel Info Section */}
              <section>
                <h3 className="text-xl font-medium mb-4 text-gray-700">
                  Parcel Info
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Merchant */}
                  <div>
                    <label
                      htmlFor="merchant"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Merchant
                    </label>
                    <select
                      id="merchant"
                      name="merchant"
                      value={formData.merchant}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select Merchant</option>
                      <option value="merchantA">Merchant A</option>
                      <option value="merchantB">Merchant B</option>
                    </select>
                  </div>

                  {/* Pickup Points */}
                  <div>
                    <label
                      htmlFor="pickupPoints"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Pickup Points
                    </label>
                    <input
                      id="pickupPoints"
                      type="text"
                      name="pickupPoints"
                      placeholder="Pickup Points"
                      value={formData.pickupPoints}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Pickup Phone */}
                  <div>
                    <label
                      htmlFor="pickupPhone"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Pickup Phone
                    </label>
                    <input
                      id="pickupPhone"
                      type="text"
                      name="pickupPhone"
                      placeholder="Pickup Phone"
                      value={formData.pickupPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Pickup Address */}
                  <div>
                    <label
                      htmlFor="pickupAddress"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Pickup Address
                    </label>
                    <input
                      id="pickupAddress"
                      type="text"
                      name="pickupAddress"
                      placeholder="Pickup Address"
                      value={formData.pickupAddress}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Cash Collection */}
                  <div>
                    <label
                      htmlFor="cashCollection"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Cash Collection
                    </label>
                    <input
                      id="cashCollection"
                      type="number"
                      name="cashCollection"
                      placeholder="Cash Collection Amount"
                      value={formData.cashCollection}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Selling Price */}
                  <div>
                    <label
                      htmlFor="sellingPrice"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Selling Price
                    </label>
                    <input
                      id="sellingPrice"
                      type="number"
                      name="sellingPrice"
                      placeholder="Selling Price"
                      value={formData.sellingPrice}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Invoice Number */}
                  <div>
                    <label
                      htmlFor="invoiceNumber"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Invoice Number
                    </label>
                    <input
                      id="invoiceNumber"
                      type="text"
                      name="invoiceNumber"
                      placeholder="Enter Invoice Number"
                      value={formData.invoiceNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select Category</option>
                      <option value="KG">KG</option>
                      <option value="electronics">Electronics</option>
                    </select>
                  </div>

                  {/* Conditionally render Weight field if category is KG */}
                  {formData.category === "KG" && (
                    <div>
                      <label
                        htmlFor="weight"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        Weight
                      </label>
                      <select
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                      >
                        <option value="">Select Weight</option>
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} kg
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Delivery Type */}
                  <div>
                    <label
                      htmlFor="deliveryType"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Delivery Type
                    </label>
                    <select
                      id="deliveryType"
                      name="deliveryType"
                      value={formData.deliveryType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select Delivery Type</option>
                      <option value="regular">Regular</option>
                      <option value="express">Express</option>
                    </select>
                  </div>

                  {/* Packaging */}
                  <div>
                    <label
                      htmlFor="packaging"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Packaging
                    </label>
                    <select
                      id="packaging"
                      name="packaging"
                      value={formData.packaging}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select Packaging Type</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>

                  {/* Note (full width) */}
                  <div className="col-span-2">
                    <label
                      htmlFor="note"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Note
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      placeholder="Note"
                      value={formData.note}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500 min-h-[80px]"
                    />
                  </div>
                </div>
              </section>

              {/* Customer Info Section */}
              <section>
                <h3 className="text-xl font-medium mb-4 text-gray-700">
                  Customer Info
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Customer Name */}
                  <div>
                    <label
                      htmlFor="customerName"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Customer Name
                    </label>
                    <input
                      id="customerName"
                      type="text"
                      name="customerName"
                      placeholder="Customer Name"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div>
                    <label
                      htmlFor="customerPhone"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Customer Phone Number
                    </label>
                    <input
                      id="customerPhone"
                      type="text"
                      name="customerPhone"
                      placeholder="Customer Phone Number"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Customer Address (full width) */}
                  <div className="col-span-2">
                    <label
                      htmlFor="customerAddress"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Customer Full Address
                    </label>
                    <textarea
                      id="customerAddress"
                      name="customerAddress"
                      placeholder="Customer Full Address"
                      value={formData.customerAddress}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500 min-h-[100px]"
                    />
                  </div>
                </div>
              </section>

              {/* Parcel Options Section */}
              <section>
                <h3 className="text-xl font-medium mb-4 text-gray-700">
                  Parcel Options
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Liquid/Fragile */}
                  <div className="flex items-center gap-2">
                    <input
                      id="liquidFragile"
                      type="checkbox"
                      name="liquidFragile"
                      checked={formData.liquidFragile}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-purple-600"
                    />
                    <label htmlFor="liquidFragile" className="text-gray-700">
                      Liquid/Fragile
                    </label>
                  </div>

                  {/* Priority */}
                  <div className="flex items-center gap-2">
                    <input
                      id="priority"
                      type="checkbox"
                      name="priority"
                      checked={formData.priority}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-purple-600"
                    />
                    <label htmlFor="priority" className="text-gray-700">
                      Priority
                    </label>
                  </div>

                  {/* Payment Method (centered compact button) */}
                  <div className="col-span-2">
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                    >
                      {/* Example Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-2 0-4 1-4 3s2 3 4 3 4-1 4-3-2-3-4-3z"
                        />
                      </svg>
                      <span>Cash on Delivery</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Submit Section */}
              <div className="space-y-4 pt-4">
                <button
                  type="submit"
                  disabled={!agreed}
                  className="w-full py-3 bg-purple-600 text-white rounded font-medium disabled:bg-purple-300 disabled:cursor-not-allowed hover:bg-purple-700 transition duration-200"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Delivery Charges Card */}
        <div className="w-full lg:w-80">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-800">
                Delivery Charge Details
              </h3>
            </div>

            <div className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between p-3 rounded-md">
                  <span className="text-gray-600">Cash Collection</span>
                  <span className="font-medium">
                    {charges.cashCollection} Tk
                  </span>
                </div>

                <div className="flex justify-between p-3 rounded-md">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span className="font-medium">
                    {charges.deliveryCharge} Tk
                  </span>
                </div>
                <div className="flex justify-between p-3 rounded-md">
                  <span className="text-gray-600">COD Charge</span>
                  <span className="font-medium">{charges.codCharge} Tk</span>
                </div>
                <div className="flex justify-between p-3 rounded-md">
                  <span className="text-gray-600">Total Charge</span>
                  <span className="font-medium">{charges.totalCharge} Tk</span>
                </div>

                <div className="flex justify-between p-3 rounded-md">
                  <span className="text-gray-600">VAT</span>
                  <span className="font-medium">{charges.vat} Tk</span>
                </div>
                <div className="flex justify-between p-3 rounded-md">
                  <span className="text-gray-600">Net Payable</span>
                  <span className="font-medium">{charges.netPayable} Tk</span>
                </div>
                <div className="flex justify-between p-3 rounded-md">
                  <span className="text-gray-600">Current Payable</span>
                  <span className="font-medium">
                    {charges.currentPayable} Tk
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-200 mt-3">
                  <div className="flex justify-between p-3 rounded-md bg-purple-100 font-medium">
                    <span className="text-gray-800">Total Payable Amount</span>
                    <span className="text-purple-700">
                      {charges.totalPayable} Tk
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-500 text-center">
                    Note: If you request for pick up after 5pm, it will be
                    collected on the next day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateParcel;
