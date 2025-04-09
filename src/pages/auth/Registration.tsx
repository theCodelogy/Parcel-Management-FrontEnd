import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetAllBranchQuery } from "@/redux/features/branch/branchApi";
import { useAddMerchantMutation } from "@/redux/features/merchant/merchantApi";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { hostImage } from "@/utils/hostImageOnIMGBB";
import { useGetAllDeliveryChargeQuery } from "@/redux/features/deliveryCharge/deliveryChargeApi";
import { TDeliveryCharge } from "@/features/admin/pages/setting/DeliveryCharge";

interface FormData {
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
  isDefault: boolean;
}

interface TMerchant {
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
}

const Registration: React.FC = () => {
  const navigate = useNavigate();

  const { data } = useGetAllDeliveryChargeQuery([]);
  const deliveryData: TDeliveryCharge | undefined = (
    data?.data as TDeliveryCharge[]
  )?.[0];
  console.log(deliveryData);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const {
    data: branchData,
    isLoading: branchLoading,
    error: branchError,
  } = useGetAllBranchQuery([]);

  const [addMerchant] = useAddMerchantMutation();

  const onSubmit = async (data: FormData) => {
    if (!termsAccepted) {
      alert("You must accept the terms and conditions.");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Adding Merchant...");

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
      status: "Pending",
      tradeLicense: "",
      referenceName: data.referenceName,
      referencePhone: data.referencePhone,
      paymentPeriod: Number(data.paymentPeriod),
      walletUseActivation: data.walletUseActivation,
      address: data.address,
      returnCharges: Number(data.returnCharges),
      deliveryCharge: {
        isDefault: data.isDefault,
        chargeList: deliveryData?.chargeList,
        increasePerKG: deliveryData?.increasePerKG,
      },
      createdAt: new Date(),
    };

    if (data.tradeLicense) {
      const tradeLicenseUrl = await hostImage(data.tradeLicense);
      payload.tradeLicense = tradeLicenseUrl;
    }
    if (data.image) {
      const imageUrl = await hostImage(data.image);
      payload.image = imageUrl;
    }

    try {
      const response = await addMerchant(payload).unwrap();
      if (response.success) {
        toast.success("Successfully added Merchant!", { id: toastId });
        navigate("/merchant/dashboard");
      }
    } catch (err: any) {
      const errorMessage = err.data?.message || "Error adding Merchant";
      toast.error(errorMessage, { id: toastId });

      // Handle specific errors
      if (errorMessage === "This Email is Already Exist!") {
        setError("email", {
          type: "manual",
          message: errorMessage,
        });
      } else if (errorMessage === "Duplicate Key Error") {
        err.data.errorSource.forEach(
          (error: { path: string; message: string }) => {
            setError(error.path as keyof FormData, {
              type: "manual",
              message: error.message,
            });
          }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (password: string) => password.length >= 8;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-auto p-8">
        <div className="col-span-2 mb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
            <FaUserPlus className="text-red-600 text-lg" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600 mt-2">Get started with your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  This field is required
                </p>
              )}
            </div>

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
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  Please enter a valid email address
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                {...register("phone", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Your Phone Number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

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
                  This field is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    validate: validatePassword,
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && errors.password.type === "validate" && (
                <p className="mt-1 text-sm text-red-600">
                  Password must be at least 8 characters
                </p>
              )}
            </div>

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
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Hub
              </label>
              {branchLoading ? (
                <p>Loading branches...</p>
              ) : branchError ? (
                <p>Error loading branches</p>
              ) : (
                <Controller
                  name="hub"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600">
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
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

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
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            <Controller
              name="tradeLicense"
              control={control}
              render={({ field }) => (
                <FileUpload
                  id="tradeLicense"
                  label="Trade License"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(file) => field.onChange(file)}
                  error={errors.tradeLicense?.message}
                />
              )}
            />

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <FileUpload
                  id="image"
                  label="Profile Image"
                  accept="image/*"
                  onChange={(file) => field.onChange(file)}
                  error={errors.image?.message}
                />
              )}
            />

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
                  This field is required
                </p>
              )}
            </div>

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
                  This field is required
                </p>
              )}
            </div>

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
                  This field is required
                </p>
              )}
            </div>

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
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

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
                  This field is required
                </p>
              )}
            </div>

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
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              className="mr-2"
            />
            <label className="text-gray-700 text-sm">
              I agree to City & Town Express Privacy Policy & Terms.
            </label>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d63384] text-white py-2 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
            >
              {loading ? "Processing..." : "Register"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?
            <Link to="/login" className="text-[#d63384] font-semibold ml-2">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;

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
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string>("");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

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
