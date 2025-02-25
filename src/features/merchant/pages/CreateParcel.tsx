import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMoneyBill } from "react-icons/fa";

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

interface Category {
  _id: string;
  title: string;
  status: string;
  position: number;
  __v: number;
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
    advance: "400",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [categories, setCategories] = useState<Category[]>([]);

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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.merchant) newErrors.merchant = "Merchant is required";
    if (!formData.cashCollection)
      newErrors.cashCollection = "Cash Collection is required";
    if (!formData.customerName)
      newErrors.customerName = "Customer Name is required";
    if (!formData.customerPhone)
      newErrors.customerPhone = "Customer Phone is required";
    if (!formData.customerAddress)
      newErrors.customerAddress = "Customer Address is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.deliveryType)
      newErrors.deliveryType = "Delivery Type is required";
    if (formData.category === "KG" && !formData.weight)
      newErrors.weight = "Weight is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      merchant: formData.merchant,
      pickupPoints: formData.pickupPoints,
      pickupPhone: formData.pickupPhone,
      pickupAddress: formData.pickupAddress,
      cashCollection: parseFloat(formData.cashCollection) || 0,
      sellingPrice: parseFloat(formData.sellingPrice) || 0,
      invoice: formData.invoiceNumber,
      deliveryType: formData.deliveryType,
      Weight: formData.category === "KG" ? parseFloat(formData.weight) || 0 : 0,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerAddress: formData.customerAddress,
      note: formData.note,
      packaging: formData.packaging,
      priority: formData.priority ? "High" : "Normal",
      paymentMethod: formData.paymentMethod,
      deliveryCharge: charges.deliveryCharge,
      liquidORFragile: formData.liquidFragile ? 1 : 0,
      codCharge: charges.codCharge,
      totalCharge: charges.totalCharge,
      vat: charges.vat,
      netPayable: charges.netPayable,
      advance: parseFloat(formData.advance) || 0,
      currentPayable: charges.currentPayable,
      parcelStatus: [
        {
          status: "Processing",
        },
      ],
    };

    axios
      .post(
        "https://parcel-management-back-end.vercel.app/api/v1/parcel",
        payload
      )
      .then((response) => {
        console.log("Response data:", response.data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });

    console.log("Form submitted", payload);
  };

  useEffect(() => {
    const cashCollection = parseFloat(formData.cashCollection) || 0;
    const deliveryCharge = cashCollection * 0.1;
    const codCharge =
      formData.paymentMethod === "COD" ? cashCollection * 0.02 : 0;
    const totalCharge = cashCollection + deliveryCharge + codCharge;
    const vat = totalCharge * 0.15;
    const netPayable = totalCharge + vat;
    const currentPayable = netPayable;
    const totalPayable = netPayable;

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

  useEffect(() => {
    axios
      .get(
        "https://parcel-management-back-end.vercel.app/api/v1/deliveryCategory"
      )
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const activeCategories = categories.filter(
    (category) => category.status === "Active"
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Add New Parcel
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-medium mb-4 text-gray-700">
                  Parcel Info
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="merchant"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Merchant <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="merchant"
                      name="merchant"
                      value={formData.merchant}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select Merchant</option>
                      <option value="merchantA">Merchant A</option>
                      <option value="merchantB">Merchant B</option>
                    </select>
                    {errors.merchant && (
                      <p className="text-red-500 text-sm">{errors.merchant}</p>
                    )}
                  </div>

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

                  <div>
                    <label
                      htmlFor="cashCollection"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Cash Collection <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="cashCollection"
                      type="number"
                      name="cashCollection"
                      placeholder="Cash Collection Amount"
                      value={formData.cashCollection}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                    {errors.cashCollection && (
                      <p className="text-red-500 text-sm">
                        {errors.cashCollection}
                      </p>
                    )}
                  </div>

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
                  <div>
                    <label
                      htmlFor="advance"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Advance
                    </label>
                    <input
                      id="advance"
                      type="number"
                      name="advance"
                      placeholder="Advance Amount"
                      value={formData.advance}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>
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

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select Category</option>
                      {activeCategories.map((category) => (
                        <option key={category._id} value={category.title}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm">{errors.category}</p>
                    )}
                  </div>

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
                      {errors.weight && (
                        <p className="text-red-500 text-sm">{errors.weight}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="deliveryType"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Delivery Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="deliveryType"
                      name="deliveryType"
                      value={formData.deliveryType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select Delivery Type</option>
                      <option value="Same Day">Same Day</option>
                      <option value="Next Day">Next Day</option>
                      <option value="Sub City">Sub City</option>
                      <option value="Outside City">Outside City</option>
                    </select>
                    {errors.deliveryType && (
                      <p className="text-red-500 text-sm">
                        {errors.deliveryType}
                      </p>
                    )}
                  </div>

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
                      <option value="Poly">Poly</option>
                      <option value="Bubble Poly">Bubble Poly</option>
                      <option value="Box">Box</option>
                      <option value="Box Poly">Box Poly</option>
                    </select>
                  </div>

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

              <section>
                <h3 className="text-xl font-medium mb-4 text-gray-700">
                  Customer Info
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="customerName"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Customer Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="customerName"
                      type="text"
                      name="customerName"
                      placeholder="Customer Name"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                    {errors.customerName && (
                      <p className="text-red-500 text-sm">
                        {errors.customerName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="customerPhone"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Customer Phone Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="customerPhone"
                      type="text"
                      name="customerPhone"
                      placeholder="Customer Phone Number"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                    />
                    {errors.customerPhone && (
                      <p className="text-red-500 text-sm">
                        {errors.customerPhone}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="customerAddress"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Customer Full Address{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="customerAddress"
                      name="customerAddress"
                      placeholder="Customer Full Address"
                      value={formData.customerAddress}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500 min-h-[100px]"
                    />
                    {errors.customerAddress && (
                      <p className="text-red-500 text-sm">
                        {errors.customerAddress}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-medium mb-4 text-gray-700">
                  Parcel Options
                </h3>
                <div className="grid grid-cols-2 gap-4">
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

                  <div className="col-span-2">
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                    >
                      <FaMoneyBill className="h-5 w-5" />
                      <span>
                        {formData.paymentMethod === "COD"
                          ? "Cash on Delivery"
                          : formData.paymentMethod}
                      </span>
                    </button>
                  </div>
                </div>
              </section>

              <div className="space-y-4 pt-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-purple-600 text-white rounded font-medium disabled:bg-purple-300 disabled:cursor-not-allowed hover:bg-purple-700 transition duration-200"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>

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
