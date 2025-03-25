import React, { useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { hostImage } from "../../../../utils/hostImageOnIMGBB";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAddMerchantMutation } from "@/redux/features/merchant/merchantApi";
import { useGetAllBranchQuery } from "@/redux/features/branch/branchApi";

interface MerchantFormState {
  businessName: string;
  name: string;
  email: string;
  phone: string;
  openingBalance: number;
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
  // Delivery Charge
  isDefault: boolean;
  sameDayCharge?: number;
  nextDayCharge?: number;
  subCityCharge?: number;
  outsideCityCharge?: number;
  sameDayIncreasePerKG?: number;
  nextDayIncreasePerKG?: number;
  subCityIncreasePerKG?: number;
  outsideCityIncreasePerKG?: number;
  // UI-only states
  showPassword: boolean;
  loading: boolean;
}

export type TMerchant = {
  businessName: string;
  name: string;
  email: string;
  phone: string;
  role: "Merchant";
  openingBalance: number;
  password: string;
  vat: number;
  hub: string;
  nid: string;
  status: "Pending" | "Active" | "Disabled";
  tradeLicense: string;
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

const CreateMerchantPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
    watch,
  } = useForm<MerchantFormState>();
  const [state, setState] = useState<MerchantFormState>({
    businessName: "",
    name: "",
    email: "",
    phone: "",
    openingBalance: 0,
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
    isDefault: true,
    sameDayCharge: undefined,
    nextDayCharge: undefined,
    subCityCharge: undefined,
    outsideCityCharge: undefined,
    sameDayIncreasePerKG: undefined,
    nextDayIncreasePerKG: undefined,
    subCityIncreasePerKG: undefined,
    outsideCityIncreasePerKG: undefined,
    showPassword: false,
    loading: false,
  });

  // Fetch branch data for Hub select dropdown
  const {
    data: branchData,
    isLoading: branchLoading,
    error: branchError,
  } = useGetAllBranchQuery([]);
  const [addMerchant] = useAddMerchantMutation();

  const onSubmit = async (data: MerchantFormState): Promise<void> => {
    setState((prev) => ({ ...prev, loading: true }));
    const toastId = toast.loading("Adding Merchant...");

    // Build the payload for TMerchant
    const payload: TMerchant = {
      businessName: data.businessName,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: "Merchant",
      openingBalance: Number(data.openingBalance),
      password: data.password,
      vat: Number(data.vat),
      hub: data.hub,
      nid: data.nid,
      // You can set status from data if you want, here we mark it active upon submission
      status: "Active",
      tradeLicense: "",
      referenceName: data.referenceName,
      referencePhone: data.referencePhone,
      paymentPeriod: Number(data.paymentPeriod),
      walletUseActivation: data.walletUseActivation,
      address: data.address,
      returnCharges: Number(data.returnCharges),
      deliveryCharge: {
        isDefault: data.isDefault,
      },
      createdAt: new Date(),
    };

    // Upload files if provided
    if (state.tradeLicense) {
      const tradeLicenseUrl = await hostImage(state.tradeLicense);
      payload.tradeLicense = tradeLicenseUrl;
    }
    if (state.image) {
      const imageUrl = await hostImage(state.image);
      payload.image = imageUrl;
    }

    // If not using the default delivery charge, include the charge details
    if (!data.isDefault) {
      payload.deliveryCharge.chargeList = {
        sameDay: Number(data.sameDayCharge),
        nextDay: Number(data.nextDayCharge),
        subCity: Number(data.subCityCharge),
        outsideCity: Number(data.outsideCityCharge),
      };
      payload.deliveryCharge.increasePerKG = {
        sameDay: Number(data.sameDayIncreasePerKG),
        nextDay: Number(data.nextDayIncreasePerKG),
        subCity: Number(data.subCityIncreasePerKG),
        outsideCity: Number(data.outsideCityIncreasePerKG),
      };
    }

    console.log("Payload being sent:", payload);

    try {
      const response = await addMerchant(payload).unwrap();
      if (response.success) {
        console.log(response);
        toast.success("Successfully added Merchant!", { id: toastId });
        navigate("/admin/merchant-manage/merchants");
      }
    } catch (err: any) {
      console.log(err.data);
      const errorMessage = err.data?.message || "Error adding Merchant";
      toast.error(errorMessage, { id: toastId });
      // Example error handling for duplicate fields
      if (errorMessage === "This Email is Already Exist!") {
        setError("email", {
          type: "manual",
          message: errorMessage,
        });
      }
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const isDefault = watch("isDefault");

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white rounded-2xl shadow-xl overflow-auto p-8">
        <div className="col-span-2 mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Create Merchant</h2>
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
                placeholder="Your Business Name"
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

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={state.showPassword ? "text" : "password"}
                  {...register("password", { required: true, minLength: 8 })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-400"
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      showPassword: !prev.showPassword,
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

            {/* Hub */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hub
              </label>
              {branchLoading ? (
                <p>Loading branches...</p>
              ) : branchError ? (
                <p>Error loading branches</p>
              ) : (
                <select
                  {...register("hub", { required: true })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                >
                  <option value="">Select a branch</option>
                  {branchData?.data?.map((branch: any) => (
                    <option key={branch._id} value={branch._id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
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
                placeholder="Your National ID"
              />
              {errors.nid && (
                <p className="mt-1 text-sm text-red-600">NID is required</p>
              )}
            </div>

            {/* Trade License */}
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
                    setState((prev) => ({ ...prev, tradeLicense: file }));
                  }}
                  error={errors.tradeLicense?.message}
                />
              )}
            />

            {/* Image */}
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
                    setState((prev) => ({ ...prev, image: file }));
                  }}
                  error={errors.image?.message}
                />
              )}
            />

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
                Payment Period (in days)
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
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">
                Wallet Use Activation
              </label>
              <input
                type="checkbox"
                {...register("walletUseActivation")}
                className="h-4 w-4 text-red-600 border-gray-300 rounded"
              />
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

            {/* Delivery Charge Default Switch */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">
                Use Default Delivery Charge?
              </label>
              <input
                type="checkbox"
                {...register("isDefault")}
                className="h-4 w-4 text-red-600 border-gray-300 rounded"
              />
            </div>

            {/* Conditional Delivery Charge Fields */}
            {!isDefault && (
              <>
                {/* Charge List */}
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Delivery Charge (Charge List)
                  </h3>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Same Day Charge
                  </label>
                  <input
                    type="number"
                    {...register("sameDayCharge", { required: true })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="Same Day Charge"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Next Day Charge
                  </label>
                  <input
                    type="number"
                    {...register("nextDayCharge", { required: true })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="Next Day Charge"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sub City Charge
                  </label>
                  <input
                    type="number"
                    {...register("subCityCharge", { required: true })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="Sub City Charge"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Outside City Charge
                  </label>
                  <input
                    type="number"
                    {...register("outsideCityCharge", { required: true })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="Outside City Charge"
                  />
                </div>

                {/* Increase Per KG */}
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Delivery Charge (Increase Per KG)
                  </h3>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Same Day Increase Per KG
                  </label>
                  <input
                    type="number"
                    {...register("sameDayIncreasePerKG", { required: true })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="Same Day Increase Per KG"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Next Day Increase Per KG
                  </label>
                  <input
                    type="number"
                    {...register("nextDayIncreasePerKG", { required: true })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="Next Day Increase Per KG"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sub City Increase Per KG
                  </label>
                  <input
                    type="number"
                    {...register("subCityIncreasePerKG", { required: true })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="Sub City Increase Per KG"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Outside City Increase Per KG
                  </label>
                  <input
                    type="number"
                    {...register("outsideCityIncreasePerKG", {
                      required: true,
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="Outside City Increase Per KG"
                  />
                </div>
              </>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-[#d63384] text-white py-2 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
              disabled={state.loading}
            >
              {state.loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMerchantPage;

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

      // Create preview for images
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
