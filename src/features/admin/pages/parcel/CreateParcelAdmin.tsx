import React, { useState, useEffect } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { generateStatus } from "@/utils/statusGenerator";
import { useGetAllDeliveryCategoryQuery } from "@/redux/features/deliveryCategory/deliveryCategoryApi";
import { useGetAllMerchantQuery } from "@/redux/features/merchant/merchantApi";
import { useGetAllDeliveryChargeQuery } from "@/redux/features/deliveryCharge/deliveryChargeApi";
import { useAddParcelMutation } from "@/redux/features/parcel/parcelApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

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

interface CategoryData {
  _id: string;
  title: string;
  status: string;
}

interface MerchantData {
  _id: string;
  businessName: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  openingBalance: number;
  password: string;
  vat: number;
  hub: string;
  nid: string;
  status: string;
  tradeLicense: string;
  image: string;
  referenceName: string;
  referencePhone: string;
  paymentPeriod: number;
  walletUseActivation: boolean;
  address: string;
  returnCharges: number;
  // Marking deliveryCharge as optional to match the API response
  deliveryCharge?: {
    isDefault: boolean;
    chargeList: {
      sameDay: number;
      nextDay: number;
      subCity: number;
      outsideCity: number;
    };
    increasePerKG: {
      sameDay: number;
      nextDay: number;
      subCity: number;
      outsideCity: number;
    };
  };
  createdAt: string;
  updatedAt: string;
}

const CreateParcelAdmin: React.FC = () => {
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
  const [loading, setLoading] = useState(false);
  const [deliveryChargeData, setDeliveryChargeData] = useState<
    DeliveryChargeData[]
  >([]);
  const formData = watch();

  const { data: categoriesData } = useGetAllDeliveryCategoryQuery([]);
  const categories: CategoryData[] = categoriesData?.data || [];

  const { data: merchantsData } = useGetAllMerchantQuery([]);
  // Now that deliveryCharge is optional, this assignment works fine.
  const merchants: MerchantData[] = merchantsData?.data || [];

  const { data: deliveryChargesData, error: deliveryChargesError } =
    useGetAllDeliveryChargeQuery([]);
  const [addParcel] = useAddParcelMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (deliveryChargesData) {
      setDeliveryChargeData(deliveryChargesData.data || []);
    }
    if (deliveryChargesError) {
      console.error("Error fetching delivery charges:", deliveryChargesError);
    }
  }, [deliveryChargesData, deliveryChargesError]);

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
    formData.category,
  ]);

  const activeCategories = categories.filter(
    (category) => category.status === "Active"
  );

  const onSubmit = async (data: any) => {
    setLoading(true);
    const toastId = toast.loading("Creating parcel...");

    const selectedMerchant = merchants.find(
      (merchant) => merchant.name === data.merchant
    );

    if (!selectedMerchant) {
      console.error("Selected merchant not found");
      setLoading(false);
      toast.error("Selected merchant not found", { id: toastId });
      return;
    }

    const status = await generateStatus({
      title: "Parcel Create",
      statusDetails: {},
    });

    const payload = {
      merchantName: selectedMerchant.name,
      merchantEmail: selectedMerchant.email,
      merchantPhone: selectedMerchant.phone,
      merchantAddress: selectedMerchant.address,
      branchname: selectedMerchant.hub,
      cashCollection: parseFloat(data.cashCollection) || 0,
      sellingPrice: parseFloat(data.sellingPrice) || 0,
      deliveryType: data.deliveryType,
      Weight: data.category === "KG" ? parseFloat(data.weight) || 0 : 0,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      note: data.note,
      packaging: data.packaging,
      priority: data.priority ? "High" : "Normal",
      paymentMethod: data.paymentMethod,
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

    addParcel(payload)
      .unwrap()
      .then(() => {
        toast.success("Parcel created successfully!", { id: toastId });
        setLoading(false);
        navigate("/admin/parcels");
      })
      .catch((error) => {
        console.error("Error creating parcel:", error);
        toast.error("Error creating parcel. Please try again.", {
          id: toastId,
        });
        setLoading(false);
      });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500">
                            <SelectValue placeholder="Select Merchant" />
                          </SelectTrigger>
                          <SelectContent>
                            {merchants.map((merchant) => (
                              <SelectItem
                                key={merchant._id}
                                value={merchant.name}
                              >
                                {merchant.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {activeCategories.map((category) => (
                              <SelectItem
                                key={category._id}
                                value={category.title}
                              >
                                {category.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500">
                              <SelectValue placeholder="Select Weight" />
                            </SelectTrigger>
                            <SelectContent>
                              {deliveryChargeData
                                .filter((item) => item.category === "KG")
                                .map((item) => (
                                  <SelectItem
                                    key={item._id}
                                    value={String(item.weight)}
                                  >
                                    {item.weight} kg
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500">
                            <SelectValue placeholder="Select Delivery Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Same Day">Same Day</SelectItem>
                            <SelectItem value="Next Day">Next Day</SelectItem>
                            <SelectItem value="Sub City">Sub City</SelectItem>
                            <SelectItem value="Outside City">
                              Outside City
                            </SelectItem>
                          </SelectContent>
                        </Select>
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500">
                            <SelectValue placeholder="Select Packaging Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Poly">Poly</SelectItem>
                            <SelectItem value="Bubble Poly">
                              Bubble Poly
                            </SelectItem>
                            <SelectItem value="Box">Box</SelectItem>
                            <SelectItem value="Box Poly">Box Poly</SelectItem>
                          </SelectContent>
                        </Select>
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
                          onClick={() =>
                            field.onChange(
                              field.value === "COD" ? "Prepaid" : "COD"
                            )
                          }
                        >
                          <FaMoneyBill className="h-5 w-5" />
                          <span>
                            {field.value === "COD"
                              ? "Cash on Delivery"
                              : "Prepaid"}
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
                  disabled={loading}
                  className="w-full py-3 bg-purple-600 text-white rounded font-medium disabled:bg-purple-300 disabled:cursor-not-allowed hover:bg-purple-700 transition duration-200"
                >
                  {loading ? "Creating..." : "Submit"}
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

export default CreateParcelAdmin;
