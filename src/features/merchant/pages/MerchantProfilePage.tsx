import React, { useState, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Edit,
  ArrowLeftRight,
  User,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetAllMerchantQuery,
  useUpdateMerchantMutation,
} from "@/redux/features/merchant/merchantApi";
import { hostImage } from "../../../utils/hostImageOnIMGBB";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { TMerchant } from "type/merchantType";

// Define the user data interface
interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl: string;
  joinDate: string;
  businessName: string;
  referenceName: string;
  referencePhone: string;
  returnCharges: number;
}

// Interface for component props
interface UserProfileProps {
  userId?: string;
}

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: UserData;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  onOpenChange,
  userData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData.name,
      phone: userData.phone,
      address: userData.address,
    },
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize the update mutation
  const [updateMerchant, { isLoading: updating }] = useUpdateMerchantMutation();

  const onSubmit = async (data: any) => {
    try {
      let imageUrl = userData.avatarUrl;
      if (selectedImage) {
        imageUrl = await hostImage(selectedImage);
      }

      const payload = { id: userData.id, data: { ...data, image: imageUrl } };
      const response = await updateMerchant(payload).unwrap();
      console.log("Update successful:", response);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              {...register("phone", { required: true })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <textarea
              {...register("address", { required: true })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture</label>
            <div
              onClick={triggerFileInput}
              className="border-2 border-dashed rounded-lg p-4 transition-colors duration-200 cursor-pointer flex flex-col items-center justify-center space-y-2 hover:border-primary/50"
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {selectedImage ? (
                <div className="relative w-full max-h-48 overflow-hidden rounded-md">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    className="w-full h-auto object-contain"
                  />
                </div>
              ) : (
                <div className="relative w-full max-h-48 overflow-hidden rounded-md">
                  <img
                    src={userData.avatarUrl}
                    alt="Current Profile"
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={updating}>
              {updating ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const SkeletonLoader = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <Card className="profile-section p-6 sm:p-8 shadow-md rounded-3xl bg-white backdrop-filter backdrop-blur-md">
      <div className="flex flex-col md:space-x-8">
        <div className="flex flex-col items-center justify-center">
          <div className="w-28 h-28 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="flex flex-col items-center mt-4">
            <div className="h-8 w-40 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-300 rounded mt-2 animate-pulse"></div>
            <div className="h-6 w-32 bg-gray-300 rounded mt-2 animate-pulse"></div>
            <div className="h-10 w-28 bg-gray-300 rounded mt-3 animate-pulse"></div>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <div className="h-6 w-32 bg-gray-300 rounded mb-4 animate-pulse"></div>
            <ul className="space-y-4">
              <li className="h-6 w-48 bg-gray-300 rounded animate-pulse"></li>
              <li className="h-6 w-48 bg-gray-300 rounded animate-pulse"></li>
              <li className="h-6 w-48 bg-gray-300 rounded animate-pulse"></li>
            </ul>
          </div>
          <div>
            <div className="h-6 w-32 bg-gray-300 rounded mb-4 animate-pulse"></div>
            <ul className="space-y-4">
              <li className="h-6 w-48 bg-gray-300 rounded animate-pulse"></li>
              <li className="h-6 w-48 bg-gray-300 rounded animate-pulse"></li>
              <li className="h-6 w-48 bg-gray-300 rounded animate-pulse"></li>
              <li className="h-6 w-48 bg-gray-300 rounded animate-pulse"></li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  </div>
);

const MerchantProfilePage: React.FC<UserProfileProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { email } = useAppSelector(useCurrentUser) as any;

  // Fetch merchant data using the RTK Query hook.
  const { data, isLoading } = useGetAllMerchantQuery([
    { name: "email", value: email },
  ]);

  // Pick the first matching record from the returned array.
  const merchantData: TMerchant | undefined = data?.data?.[0];

  // Map the fetched data to our local UserData format.
  const userData: UserData | null = merchantData
    ? {
        id: merchantData._id,
        name: merchantData.name,
        email: merchantData.email,
        phone: merchantData.phone,
        address: merchantData.address,
        avatarUrl: merchantData.image,
        joinDate: merchantData.createdAt,
        businessName: merchantData.businessName,
        referenceName: merchantData.referenceName,
        referencePhone: merchantData.referencePhone,
        returnCharges: merchantData.returnCharges,
      }
    : null;

  if (isLoading || !userData) {
    return <SkeletonLoader />;
  }

  // Format the join date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="profile-section p-6 sm:p-8 shadow-md rounded-3xl bg-white backdrop-filter backdrop-blur-md">
        <div className="flex flex-col md:space-x-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center justify-center">
            <Avatar className="w-28 h-28 border-4 border-white shadow-xl">
              <img
                src={userData.avatarUrl}
                alt={userData.name}
                className="object-cover rounded-full"
              />
            </Avatar>
            <div className="flex flex-col items-center mt-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {userData.name}
              </h1>
              <div className="profile-badge flex items-center gap-1 mt-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                <Building className="w-5 h-5" />
                <span className="capitalize">Merchant</span>
              </div>
              <p className="text-gray-600 mt-2">
                Member since {formatDate(userData.joinDate)}
              </p>
              <Button
                className="mt-3 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition duration-200 shadow-md"
                onClick={() => setIsModalOpen(true)}
              >
                <Edit className="w-5 h-5" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Contact Information and Stats */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Contact Information
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Mail className="w-6 h-6 text-blue-500 mr-3" />
                  <div>
                    <span className="font-medium text-gray-600">Email</span>
                    <p className="text-gray-800">{userData.email}</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <Phone className="w-6 h-6 text-blue-500 mr-3" />
                  <div>
                    <span className="font-medium text-gray-600">Phone</span>
                    <p className="text-gray-800">{userData.phone}</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <MapPin className="w-6 h-6 text-blue-500 mr-3" />
                  <div>
                    <span className="font-medium text-gray-600">Address</span>
                    <p className="text-gray-800">{userData.address}</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <User className="w-6 h-6 text-blue-500 mr-3" />
                  <div>
                    <span className="font-medium text-gray-600">
                      Reference Name
                    </span>
                    <p className="text-gray-800">{userData.referenceName}</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <Phone className="w-6 h-6 text-blue-500 mr-3" />
                  <div>
                    <span className="font-medium text-gray-600">
                      Reference Phone
                    </span>
                    <p className="text-gray-800">{userData.referencePhone}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Business Details
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Calendar className="w-6 h-6 text-blue-500 mr-3" />
                  <div>
                    <span className="font-medium text-gray-600">
                      Member Since
                    </span>
                    <p className="text-gray-800">
                      {formatDate(userData.joinDate)}
                    </p>
                  </div>
                </li>
                <li className="flex items-center">
                  <Building className="w-6 h-6 text-blue-500 mr-3" />
                  <div>
                    <span className="font-medium text-gray-600">
                      Business Name
                    </span>
                    <p className="text-gray-800">{userData.businessName}</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <ArrowLeftRight className="w-6 h-6 text-blue-500 mr-3" />
                  <div>
                    <span className="font-medium text-gray-600">
                      Return Charges
                    </span>
                    <p className="text-gray-800">${userData.returnCharges}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
      <EditProfileModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        userData={userData}
      />
    </div>
  );
};

export default MerchantProfilePage;
