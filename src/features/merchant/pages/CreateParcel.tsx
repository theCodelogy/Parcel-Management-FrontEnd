import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMoneyBill } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { generateStatus } from "../../../utils/statusGenerator";

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

interface DeliveryChargeData {
  _id: string;
  category: string;
  weight: number;
  sameDay: number;
  nextDay: number;
  subCity: number;
  outsideCity: number;
  status: string;
  position: number;
}

const CreateParcel: React.FC = () => {
  const { control, handleSubmit, watch } = useForm();
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

  const [categories, setCategories] = useState<Category[]>([]);
  const [deliveryChargeData, setDeliveryChargeData] = useState<
    DeliveryChargeData[]
  >([]);

  const formData = watch();

  useEffect(() => {
    const cashCollection = parseFloat(formData.cashCollection) || 0;
    const codCharge =
      formData.paymentMethod === "COD" ? cashCollection * 0.02 : 0;

    const weight = parseFloat(formData.weight) || 0;
    const deliveryChargeItem = deliveryChargeData.find(
      (item) => item.weight === weight && item.category === formData.category
    );

    let deliveryCharge = 0;
    if (deliveryChargeItem) {
      switch (formData.deliveryType) {
        case "Same Day":
          deliveryCharge = deliveryChargeItem.sameDay;
          break;
        case "Next Day":
          deliveryCharge = deliveryChargeItem.nextDay;
          break;
        case "Sub City":
          deliveryCharge = deliveryChargeItem.subCity;
          break;
        case "Outside City":
          deliveryCharge = deliveryChargeItem.outsideCity;
          break;
        default:
          deliveryCharge = 0;
      }
    }

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
  }, [
    formData.cashCollection,
    formData.paymentMethod,
    formData.deliveryType,
    formData.weight,
    deliveryChargeData,
  ]);

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

  useEffect(() => {
    axios
      .get(
        "https://parcel-management-back-end.vercel.app/api/v1/deliveryCharge"
      )
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setDeliveryChargeData(response.data.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching delivery charges:", error);
      });
  }, []);

  const activeCategories = categories.filter(
    (category) => category.status === "Active"
  );

  const onSubmit = async (data: any) => {
    const status = await generateStatus({
      title: "Parcel Create",
      statusDetails: {},
    });
    console.log(status);
    const payload = {
      merchant: data.merchant,
      pickupPoints: data.pickupPoints,
      pickupPhone: data.pickupPhone,
      pickupAddress: data.pickupAddress,
      cashCollection: parseFloat(data.cashCollection) || 0,
      sellingPrice: parseFloat(data.sellingPrice) || 0,
      invoice: data.invoiceNumber,
      deliveryType: data.deliveryType,
      Weight: data.category === "KG" ? parseFloat(data.weight) || 0 : 0,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      note: data.note,
      packaging: data.packaging,
      priority: data.priority ? "High" : "Normal",
      paymentMethod: data.paymentMethod, // Ensure this is included
      deliveryCharge: charges.deliveryCharge,
      liquidORFragile: data.liquidFragile ? 1 : 0,
      codCharge: charges.codCharge,
      totalCharge: charges.totalCharge,
      vat: charges.vat,
      netPayable: charges.netPayable,
      advance: parseFloat(data.advance) || 0,
      currentPayable: charges.currentPayable,
      parcelStatus: [status],
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Add New Parcel
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Controller
                      name="merchant"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Merchant is required" }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                        >
                          <option value="">Select Merchant</option>
                          <option value="merchantA">Merchant A</option>
                          <option value="merchantB">Merchant B</option>
                        </select>
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="pickupPoints"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Pickup Points
                    </label>
                    <Controller
                      name="pickupPoints"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Pickup Points"
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="pickupPhone"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Pickup Phone
                    </label>
                    <Controller
                      name="pickupPhone"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Pickup Phone"
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="pickupAddress"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Pickup Address
                    </label>
                    <Controller
                      name="pickupAddress"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Pickup Address"
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cashCollection"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Cash Collection <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="cashCollection"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Cash Collection is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          placeholder="Cash Collection Amount"
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sellingPrice"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Selling Price
                    </label>
                    <Controller
                      name="sellingPrice"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          placeholder="Selling Price"
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="advance"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Advance
                    </label>
                    <Controller
                      name="advance"
                      control={control}
                      defaultValue="400"
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          placeholder="Advance Amount"
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="invoiceNumber"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Invoice Number
                    </label>
                    <Controller
                      name="invoiceNumber"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter Invoice Number"
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Category <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="category"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Category is required" }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                        >
                          <option value="">Select Category</option>
                          {activeCategories.map((category) => (
                            <option key={category._id} value={category.title}>
                              {category.title}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>

                  {formData.category === "KG" && (
                    <div>
                      <label
                        htmlFor="weight"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        Weight <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="weight"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Weight is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                          >
                            <option value="">Select Weight</option>
                            {deliveryChargeData
                              .filter((item) => item.category === "KG")
                              .map((item) => (
                                <option key={item._id} value={item.weight}>
                                  {item.weight} kg
                                </option>
                              ))}
                          </select>
                        )}
                      />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="deliveryType"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Delivery Type <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="deliveryType"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Delivery Type is required" }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                        >
                          <option value="">Select Delivery Type</option>
                          <option value="Same Day">Same Day</option>
                          <option value="Next Day">Next Day</option>
                          <option value="Sub City">Sub City</option>
                          <option value="Outside City">Outside City</option>
                        </select>
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="packaging"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Packaging
                    </label>
                    <Controller
                      name="packaging"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                        >
                          <option value="">Select Packaging Type</option>
                          <option value="Poly">Poly</option>
                          <option value="Bubble Poly">Bubble Poly</option>
                          <option value="Box">Box</option>
                          <option value="Box Poly">Box Poly</option>
                        </select>
                      )}
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="note"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Note
                    </label>
                    <Controller
                      name="note"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <textarea
                          {...field}
                          placeholder="Note"
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500 min-h-[80px]"
                        />
                      )}
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
                    <Controller
                      name="customerName"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Customer Name is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Customer Name"
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="customerPhone"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Customer Phone Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="customerPhone"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Customer Phone is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Customer Phone Number"
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                        />
                      )}
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="customerAddress"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Customer Full Address{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="customerAddress"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Customer Address is required" }}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          placeholder="Customer Full Address"
                          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500 min-h-[100px]"
                        />
                      )}
                    />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-medium mb-4 text-gray-700">
                  Parcel Options
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Controller
                      name="liquidFragile"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="checkbox"
                          className="w-4 h-4 text-purple-600"
                        />
                      )}
                    />
                    <label htmlFor="liquidFragile" className="text-gray-700">
                      Liquid/Fragile
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Controller
                      name="priority"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="checkbox"
                          className="w-4 h-4 text-purple-600"
                        />
                      )}
                    />
                    <label htmlFor="priority" className="text-gray-700">
                      Priority
                    </label>
                  </div>

                  <div className="col-span-2">
                    <Controller
                      name="paymentMethod"
                      control={control}
                      defaultValue="COD"
                      render={({ field }) => (
                        <button
                          type="button"
                          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                        >
                          <FaMoneyBill className="h-5 w-5" />
                          <span>
                            {field.value === "COD"
                              ? "Cash on Delivery"
                              : field.value}
                          </span>
                        </button>
                      )}
                    />
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
