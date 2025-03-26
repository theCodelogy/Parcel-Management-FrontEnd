import React, { useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { hostImage } from "../../../../utils/hostImageOnIMGBB";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddDeliveryManMutation } from "@/redux/features/deliveryMan/deliveryManApi";
import { useGetAllBranchQuery } from "@/redux/features/branch/branchApi";
import { Button } from "@/components/ui/button";

interface AuthState {
  name: string;
  phone: string;
  email: string;
  deliveryCharge: number;
  returnCharge: number;
  pickupCharge: number;
  openingBalance: string;
  password: string;
  salary: number;
  status: string;
  hub: string;
  drivingLicense: File | null;
  image: File | null;
  address: string;
  showPassword: boolean;
  loading: boolean;
}

export type TDeliveryMan = {
  name: string;
  phone: string;
  email: string;
  role: "Delivery Man";
  deliveryCharge: number;
  returnCharge: number;
  pickupCharge: number;
  openingBalance: number;
  password: string;
  salary: number;
  status: "Pending" | "Active" | "Disabled";
  hub: string;
  drivingLicence?: string;
  image?: string;
  address: string;
};

const CreateDeliveryManPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm<AuthState>();

  const [state, setState] = useState<AuthState>({
    name: "",
    phone: "",
    email: "",
    deliveryCharge: 0,
    returnCharge: 0,
    pickupCharge: 0,
    openingBalance: "",
    password: "",
    salary: 0,
    status: "Pending",
    hub: "",
    drivingLicense: null,
    image: null,
    address: "",
    showPassword: false,
    loading: false,
  });

  // Fetch branch data for the Hub select dropdown
  const {
    data: branchData,
    isLoading: branchLoading,
    error: branchError,
  } = useGetAllBranchQuery([]);
  console.log("Branch Data:", branchData);

  const [addDeliveryMan] = useAddDeliveryManMutation();

  const onSubmit = async (data: AuthState): Promise<void> => {
    setState((prevState) => ({ ...prevState, loading: true }));
    const toastId = toast.loading("Adding Delivery Man...");

    const payload: TDeliveryMan = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      role: "Delivery Man",
      deliveryCharge: Number(data.deliveryCharge),
      returnCharge: Number(data.returnCharge),
      pickupCharge: Number(data.pickupCharge),
      openingBalance: Number(data.openingBalance),
      password: data.password,
      salary: Number(data.salary),
      status: "Active",
      hub: data.hub,
      address: data.address,
    };

    if (state.drivingLicense) {
      const drivinglicenceUrl = await hostImage(state.drivingLicense);
      payload.drivingLicence = drivinglicenceUrl;
    }

    if (state.image) {
      const imageUrl = await hostImage(state.image);
      payload.image = imageUrl;
    }
    console.log("Payload being sent:", payload);

    try {
      const response = await addDeliveryMan(payload).unwrap();
      if (response.success) {
        console.log(response);
        toast.success("Successfully added Delivery Man!", { id: toastId });
        navigate("/admin/deliveryman");
      }
    } catch (err: any) {
      console.log(err.data);
      // Get error message or fallback to default error text
      const errorMessage = err.data?.message || "Error adding Delivery Man";

      // Show the error message via toast, updating the loading toast
      toast.error(errorMessage, { id: toastId });

      // Also update form errors if needed
      if (errorMessage === "This Email is Already Exist!") {
        setError("email", {
          type: "manual",
          message: errorMessage,
        });
      } else if (errorMessage === "Duplicate Key Error") {
        err.data.errorSource.forEach(
          (error: { path: string; message: string }) => {
            setError(error.path as keyof AuthState, {
              type: "manual",
              message: error.message,
            });
          }
        );
      }
    } finally {
      // Clear the loading state
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white rounded-2xl shadow-xl overflow-auto p-8">
        <div className="col-span-2 mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Create Delivery Man
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message || "Phone is required"}
                </p>
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

            {/* Delivery Charge */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Charge
              </label>
              <input
                type="number"
                {...register("deliveryCharge", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Delivery Charge"
              />
              {errors.deliveryCharge && (
                <p className="mt-1 text-sm text-red-600">
                  Delivery Charge is required
                </p>
              )}
            </div>

            {/* Return Charge */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Return Charge
              </label>
              <input
                type="number"
                {...register("returnCharge", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Return Charge"
              />
              {errors.returnCharge && (
                <p className="mt-1 text-sm text-red-600">
                  Return Charge is required
                </p>
              )}
            </div>

            {/* Pickup Charge */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Charge
              </label>
              <input
                type="number"
                {...register("pickupCharge", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Pickup Charge"
              />
              {errors.pickupCharge && (
                <p className="mt-1 text-sm text-red-600">
                  Pickup Charge is required
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

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={state.showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
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

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary
              </label>
              <input
                type="number"
                {...register("salary", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                placeholder="Salary"
              />
              {errors.salary && (
                <p className="mt-1 text-sm text-red-600">Salary is required</p>
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
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
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

            {/* Driving License */}
            <Controller
              name="drivingLicense"
              control={control}
              render={({ field }) => (
                <FileUpload
                  id="drivingLicense"
                  label="Driving License"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(file) => {
                    field.onChange(file);
                    setState((prevState) => ({
                      ...prevState,
                      drivingLicense: file,
                    }));
                  }}
                  error={errors.drivingLicense?.message}
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
                    setState((prevState) => ({
                      ...prevState,
                      image: file,
                    }));
                  }}
                  error={errors.image?.message}
                />
              )}
            />

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

export default CreateDeliveryManPage;

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
