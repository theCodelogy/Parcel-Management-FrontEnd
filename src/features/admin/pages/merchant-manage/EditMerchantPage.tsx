import React, { useState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { hostImage } from "../../../../utils/hostImageOnIMGBB";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGetAllBranchQuery } from "@/redux/features/branch/branchApi";
import { useUpdateMerchantMutation } from "@/redux/features/merchant/merchantApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AuthState {
  businessName: string;
  name: string;
  email: string;
  phone: string;
  openingBalance: string;
  password: string;
  vat: number;
  hub: string;
  nid: string;
  status: "Pending" | "Active" | "Disabled";
  tradeLicense: File | null;
  image: File | null;
  referenceName: string;
  referencePhone: string;
  paymentPeriod: number;
  walletUseActivation: boolean;
  address: string;
  returnCharges: number;
  deliveryCharge: {
    isDefault: boolean;
    chargeList?: {
      sameDay: number;
      nextDay: number;
      subCity: number;
      outsideCity: number;
    };
    increasePerKG?: {
      sameDay: number;
      nextDay: number;
      subCity: number;
      outsideCity: number;
    };
  };
  showPassword: boolean;
  loading: boolean;
}

export type TMerchant = {
  _id: string;
  businessName: string;
  name: string;
  email: string;
  phone: string;
  role: "Merchant";
  openingBalance: number;
  password?: string;
  vat: number;
  hub: string;
  nid?: string;
  status: "Pending" | "Active" | "Disabled";
  tradeLicense?: string;
  image?: string;
  referenceName: string;
  referencePhone: string;
  paymentPeriod: number;
  walletUseActivation: boolean;
  address: string;
  returnCharges: number;
  deliveryCharge: {
    isDefault: boolean;
    chargeList?: {
      sameDay: number;
      nextDay: number;
      subCity: number;
      outsideCity: number;
    };
    increasePerKG?: {
      sameDay: number;
      nextDay: number;
      subCity: number;
      outsideCity: number;
    };
  };
  createdAt: Date;
};

const EditMerchantPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const merchantData = location.state?.merchant as TMerchant;
  const [updateMerchant, { isLoading: isUpdating }] =
    useUpdateMerchantMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError,
  } = useForm<AuthState>();

  const [state, setState] = useState<AuthState>({
    businessName: "",
    name: "",
    email: "",
    phone: "",
    openingBalance: "",
    password: "",
    vat: 0,
    hub: "",
    nid: "",
    status: "Pending",
    tradeLicense: null,
    image: null,
    referenceName: "",
    referencePhone: "",
    paymentPeriod: 0,
    walletUseActivation: false,
    address: "",
    returnCharges: 0,
    deliveryCharge: {
      isDefault: false,
      chargeList: {
        sameDay: 0,
        nextDay: 0,
        subCity: 0,
        outsideCity: 0,
      },
      increasePerKG: {
        sameDay: 0,
        nextDay: 0,
        subCity: 0,
        outsideCity: 0,
      },
    },
    showPassword: false,
    loading: false,
  });

  const {
    data: branchData,
    isLoading: branchLoading,
    error: branchError,
  } = useGetAllBranchQuery([]);

  useEffect(() => {
    if (merchantData) {
      setValue("businessName", merchantData.businessName);
      setValue("name", merchantData.name);
      setValue("email", merchantData.email);
      setValue("phone", merchantData.phone);
      setValue("openingBalance", String(merchantData.openingBalance));
      setValue("vat", Number(merchantData.vat));
      setValue("hub", merchantData.hub);
      setValue("nid", merchantData.nid || "");
      setValue("status", merchantData.status);
      setValue("referenceName", merchantData.referenceName);
      setValue("referencePhone", merchantData.referencePhone);
      setValue("paymentPeriod", Number(merchantData.paymentPeriod));
      setValue("walletUseActivation", merchantData.walletUseActivation);
      setValue("address", merchantData.address);
      setValue("returnCharges", Number(merchantData.returnCharges));
      setValue(
        "deliveryCharge.isDefault",
        merchantData.deliveryCharge.isDefault
      );
      setValue(
        "deliveryCharge.chargeList.sameDay",
        Number(merchantData.deliveryCharge.chargeList?.sameDay) || 0
      );
      setValue(
        "deliveryCharge.chargeList.nextDay",
        Number(merchantData.deliveryCharge.chargeList?.nextDay) || 0
      );
      setValue(
        "deliveryCharge.chargeList.subCity",
        Number(merchantData.deliveryCharge.chargeList?.subCity) || 0
      );
      setValue(
        "deliveryCharge.chargeList.outsideCity",
        Number(merchantData.deliveryCharge.chargeList?.outsideCity) || 0
      );
      setValue(
        "deliveryCharge.increasePerKG.sameDay",
        Number(merchantData.deliveryCharge.increasePerKG?.sameDay) || 0
      );
      setValue(
        "deliveryCharge.increasePerKG.nextDay",
        Number(merchantData.deliveryCharge.increasePerKG?.nextDay) || 0
      );
      setValue(
        "deliveryCharge.increasePerKG.subCity",
        Number(merchantData.deliveryCharge.increasePerKG?.subCity) || 0
      );
      setValue(
        "deliveryCharge.increasePerKG.outsideCity",
        Number(merchantData.deliveryCharge.increasePerKG?.outsideCity) || 0
      );
      setState((prevState) => ({
        ...prevState,
        tradeLicense: null,
        image: null,
      }));
    }
  }, [merchantData, setValue]);

  const onSubmit = async (data: AuthState): Promise<void> => {
    setState((prevState) => ({ ...prevState, loading: true }));
    const toastId = toast.loading("Updating Merchant...");

    const payload: Partial<TMerchant> = {
      businessName: data.businessName,
      name: data.name,
      email: data.email,
      phone: data.phone,
      openingBalance: Number(data.openingBalance),
      vat: Number(data.vat),
      hub: data.hub,
      nid: data.nid,
      status: data.status,
      referenceName: data.referenceName,
      referencePhone: data.referencePhone,
      paymentPeriod: Number(data.paymentPeriod),
      walletUseActivation: data.walletUseActivation,
      address: data.address,
      returnCharges: Number(data.returnCharges),
      deliveryCharge: {
        isDefault: data.deliveryCharge.isDefault,
        chargeList: {
          sameDay: Number(data.deliveryCharge.chargeList?.sameDay) || 0,
          nextDay: Number(data.deliveryCharge.chargeList?.nextDay) || 0,
          subCity: Number(data.deliveryCharge.chargeList?.subCity) || 0,
          outsideCity: Number(data.deliveryCharge.chargeList?.outsideCity) || 0,
        },
        increasePerKG: {
          sameDay: Number(data.deliveryCharge.increasePerKG?.sameDay) || 0,
          nextDay: Number(data.deliveryCharge.increasePerKG?.nextDay) || 0,
          subCity: Number(data.deliveryCharge.increasePerKG?.subCity) || 0,
          outsideCity:
            Number(data.deliveryCharge.increasePerKG?.outsideCity) || 0,
        },
      },
    };

    if (data.password) {
      payload.password = data.password;
    }

    if (state.tradeLicense) {
      const tradeLicenseUrl = await hostImage(state.tradeLicense);
      payload.tradeLicense = tradeLicenseUrl;
    }

    if (state.image) {
      const imageUrl = await hostImage(state.image);
      payload.image = imageUrl;
    }

    try {
      const res = await updateMerchant({
        id: merchantData._id,
        data: payload,
      }).unwrap();

      if (res.success) {
        toast.success("Successfully updated Merchant!", { id: toastId });
        navigate("/admin/merchant-manage/merchants");
      }
    } catch (err: any) {
      console.log(err);
      const errorMessage = err?.data?.message || "Error updating Merchant";
      toast.error(errorMessage, { id: toastId });

      if (err?.data?.message === "Duplicate Key Error") {
        err?.data?.errorSource.forEach(
          (error: { path: string; message: string }) => {
            setError(error.path as keyof AuthState, {
              type: "manual",
              message: error.message,
            });
          }
        );
      }
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full bg-white rounded-2xl shadow-xl overflow-auto p-8">
        <div className="col-span-2 mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Edit Merchant</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                {...register("businessName", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Business Name"
              />
              {errors.businessName && (
                <p className="mt-1 text-sm text-red-600">
                  Business Name is required
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">Name is required</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                {...register("phone", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Your Phone Number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">Phone is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message || "Please enter a valid email address"}
                </p>
              )}
            </div>

            {/* Opening Balance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opening Balance
              </label>
              <input
                type="number"
                {...register("openingBalance", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Opening Balance"
              />
              {errors.openingBalance && (
                <p className="mt-1 text-sm text-red-600">
                  Opening Balance is required
                </p>
              )}
            </div>

            {/* VAT */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                VAT
              </label>
              <input
                type="number"
                {...register("vat", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="VAT"
              />
              {errors.vat && (
                <p className="mt-1 text-sm text-red-600">VAT is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={state.showPassword ? "text" : "password"}
                  {...register("password", {
                    minLength: 8,
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-400"
                  onClick={() =>
                    setState((prevState) => ({
                      ...prevState,
                      showPassword: !prevState.showPassword,
                    }))
                  }
                >
                  {state.showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            {/* Hub as a select field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hub
              </label>
              {branchLoading ? (
                <p>Loading branches...</p>
              ) : branchError ? (
                <p>Error loading branches</p>
              ) : (
                <Controller
                  name="hub"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={merchantData?.hub || ""}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branchData?.data?.map((branch: any) => (
                          <SelectItem key={branch._id} value={branch.name}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              )}
              {errors.hub && (
                <p className="mt-1 text-sm text-red-600">Hub is required</p>
              )}
            </div>

            {/* NID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NID
              </label>
              <input
                type="text"
                {...register("nid", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="NID"
              />
              {errors.nid && (
                <p className="mt-1 text-sm text-red-600">NID is required</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={merchantData?.status || "Pending"}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">Status is required</p>
              )}
            </div>

            {/* Trade License */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trade License
              </label>
              {merchantData.tradeLicense ? (
                <div className="relative w-full max-h-48 overflow-hidden rounded-md border-2 border-dashed border-border p-4">
                  <img
                    src={merchantData.tradeLicense}
                    alt="Trade License"
                    className="w-full h-auto object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 rounded-full w-6 h-6 p-0 flex items-center justify-center"
                    onClick={(e) => {
                      e.preventDefault();
                      setValue("tradeLicense", null);
                      setState((prev) => ({ ...prev, tradeLicense: null }));
                    }}
                  >
                    ×
                  </Button>
                </div>
              ) : (
                <Controller
                  name="tradeLicense"
                  control={control}
                  render={({ field }) => (
                    <FileUpload
                      id="tradeLicense"
                      label="Trade License"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(file) => {
                        field.onChange(file);
                        setState((prevState) => ({
                          ...prevState,
                          tradeLicense: file,
                        }));
                      }}
                      error={errors.tradeLicense?.message}
                    />
                  )}
                />
              )}
            </div>

            {/* Image */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image
              </label>
              {merchantData.image ? (
                <div className="relative w-full max-h-48 overflow-hidden rounded-md border-2 border-dashed border-border p-4">
                  <img
                    src={merchantData.image}
                    alt="Profile"
                    className="w-full h-auto object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 rounded-full w-6 h-6 p-0 flex items-center justify-center"
                    onClick={(e) => {
                      e.preventDefault();
                      setValue("image", null);
                      setState((prev) => ({ ...prev, image: null }));
                    }}
                  >
                    ×
                  </Button>
                </div>
              ) : (
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <FileUpload
                      id="image"
                      label="Profile Image"
                      accept="image/*"
                      onChange={(file) => {
                        field.onChange(file);
                        setState((prevState) => ({
                          ...prevState,
                          image: file,
                        }));
                      }}
                      error={errors.image?.message}
                    />
                  )}
                />
              )}
            </div>

            {/* Reference Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reference Name
              </label>
              <input
                type="text"
                {...register("referenceName", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Reference Name"
              />
              {errors.referenceName && (
                <p className="mt-1 text-sm text-red-600">
                  Reference Name is required
                </p>
              )}
            </div>

            {/* Reference Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reference Phone
              </label>
              <input
                type="text"
                {...register("referencePhone", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Reference Phone"
              />
              {errors.referencePhone && (
                <p className="mt-1 text-sm text-red-600">
                  Reference Phone is required
                </p>
              )}
            </div>

            {/* Payment Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Period
              </label>
              <input
                type="number"
                {...register("paymentPeriod", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Payment Period"
              />
              {errors.paymentPeriod && (
                <p className="mt-1 text-sm text-red-600">
                  Payment Period is required
                </p>
              )}
            </div>

            {/* Wallet Use Activation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wallet Use Activation
              </label>
              <Controller
                name="walletUseActivation"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value)}
                    defaultValue={String(
                      merchantData?.walletUseActivation || false
                    )}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Activation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Activated</SelectItem>
                      <SelectItem value="false">Deactivated</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.walletUseActivation && (
                <p className="mt-1 text-sm text-red-600">
                  Wallet Use Activation is required
                </p>
              )}
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                {...register("address", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Your Address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">Address is required</p>
              )}
            </div>

            {/* Return Charges */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Return Charges
              </label>
              <input
                type="number"
                {...register("returnCharges", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Return Charges"
              />
              {errors.returnCharges && (
                <p className="mt-1 text-sm text-red-600">
                  Return Charges is required
                </p>
              )}
            </div>

            {/* Delivery Charge */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Charge
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Same Day
                  </label>
                  <input
                    type="number"
                    {...register("deliveryCharge.chargeList.sameDay", {
                      required: true,
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="Same Day"
                  />
                  {errors.deliveryCharge?.chargeList?.sameDay && (
                    <p className="mt-1 text-sm text-red-600">
                      Same Day Charge is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Next Day
                  </label>
                  <input
                    type="number"
                    {...register("deliveryCharge.chargeList.nextDay", {
                      required: true,
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="Next Day"
                  />
                  {errors.deliveryCharge?.chargeList?.nextDay && (
                    <p className="mt-1 text-sm text-red-600">
                      Next Day Charge is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sub City
                  </label>
                  <input
                    type="number"
                    {...register("deliveryCharge.chargeList.subCity", {
                      required: true,
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="Sub City"
                  />
                  {errors.deliveryCharge?.chargeList?.subCity && (
                    <p className="mt-1 text-sm text-red-600">
                      Sub City Charge is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Outside City
                  </label>
                  <input
                    type="number"
                    {...register("deliveryCharge.chargeList.outsideCity", {
                      required: true,
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="Outside City"
                  />
                  {errors.deliveryCharge?.chargeList?.outsideCity && (
                    <p className="mt-1 text-sm text-red-600">
                      Outside City Charge is required
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Increase Per KG */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Increase Per KG
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Same Day
                  </label>
                  <input
                    type="number"
                    {...register("deliveryCharge.increasePerKG.sameDay", {
                      required: true,
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="Same Day"
                  />
                  {errors.deliveryCharge?.increasePerKG?.sameDay && (
                    <p className="mt-1 text-sm text-red-600">
                      Same Day Increase is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Next Day
                  </label>
                  <input
                    type="number"
                    {...register("deliveryCharge.increasePerKG.nextDay", {
                      required: true,
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="Next Day"
                  />
                  {errors.deliveryCharge?.increasePerKG?.nextDay && (
                    <p className="mt-1 text-sm text-red-600">
                      Next Day Increase is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sub City
                  </label>
                  <input
                    type="number"
                    {...register("deliveryCharge.increasePerKG.subCity", {
                      required: true,
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="Sub City"
                  />
                  {errors.deliveryCharge?.increasePerKG?.subCity && (
                    <p className="mt-1 text-sm text-red-600">
                      Sub City Increase is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Outside City
                  </label>
                  <input
                    type="number"
                    {...register("deliveryCharge.increasePerKG.outsideCity", {
                      required: true,
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="Outside City"
                  />
                  {errors.deliveryCharge?.increasePerKG?.outsideCity && (
                    <p className="mt-1 text-sm text-red-600">
                      Outside City Increase is required
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-[#d63384] text-white py-2 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
                disabled={state.loading || isUpdating}
              >
                {state.loading || isUpdating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMerchantPage;

interface FileUploadProps {
  id: string;
  label: string;
  accept?: string;
  required?: boolean;
  onChange: (file: File | null) => void;
  error?: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  accept = "image/*",
  required = false,
  onChange,
  error,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);

    if (file) {
      setFileName(file.name);

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    } else {
      setFileName("");
      setPreviewUrl(null);
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setFileName("");
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>

      <div
        onClick={triggerFileInput}
        className={cn(
          "border-2 border-dashed rounded-lg p-4 transition-colors duration-200 cursor-pointer",
          "flex flex-col items-center justify-center space-y-2 hover:border-primary/50",
          error ? "border-red-500" : "border-border",
          className
        )}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        {previewUrl ? (
          <div className="relative w-full max-h-48 overflow-hidden rounded-md">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-auto object-contain"
            />
            <Button
              onClick={removeFile}
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 rounded-full w-6 h-6 p-0 flex items-center justify-center"
            >
              ×
            </Button>
          </div>
        ) : (
          <>
            <div className="text-3xl text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              {fileName ? fileName : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-muted-foreground">
              {accept.split(",").join(", ")}
            </p>
          </>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
