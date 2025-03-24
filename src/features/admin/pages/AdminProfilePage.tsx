import React, { useState } from "react";
import { Mail, Phone, MapPin, Building, Calendar, Edit } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useGetAllSuperAdminQuery,
  useUpdateSuperAdminMutation,
} from "@/redux/features/superAdmin/superAdminApi";

// Define the user data interface without avatarUrl since it is not provided.
interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
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

export interface TSuperAdmin {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "Super Admin";
  status: "Pending" | "Active" | "Disabled";
  createdAt: Date;
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
  } = useForm<Partial<UserData>>({
    defaultValues: {
      name: userData.name,
      phone: userData.phone,
      address: userData.address,
    },
  });

  // Initialize the update mutation
  const [updateSuperAdmin, { isLoading: updating }] =
    useUpdateSuperAdminMutation();

  const onSubmit = async (data: Partial<UserData>) => {
    try {
      const payload = { id: userData.id, data };
      const response = await updateSuperAdmin(payload).unwrap();
      console.log("Update successful:", response);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update:", error);
    }
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
          <div className="h-8 w-40 bg-gray-300 rounded animate-pulse"></div>
          <div className="flex flex-col items-center mt-4">
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

const AdminProfilePage: React.FC<UserProfileProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { email } = useAppSelector(useCurrentUser) as any;
  console.log("Current User Email:", email);

  // Fetch super admin data using the RTK Query hook.
  const { data, isLoading } = useGetAllSuperAdminQuery([
    { name: "email", value: email },
  ]);

  // Pick the first matching record from the returned array.
  const superAdminData: TSuperAdmin | undefined =
  (data?.data as TSuperAdmin[])?.[0];

  console.log("Super Admin Data:", superAdminData);
  // Map the fetched data to our local UserData format.
  const userData: UserData | null = superAdminData
    ? {
        id: superAdminData._id,
        name: superAdminData.name,
        email: superAdminData.email,
        phone: superAdminData.phone,
        address: superAdminData.address,
        joinDate: superAdminData.createdAt.toString(),
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
            {/* Instead of an avatar image, we display the name in a header */}
            <h1 className="text-3xl font-bold text-gray-800">
              {userData.name}
            </h1>
            <div className="profile-badge flex items-center gap-1 mt-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
              <Building className="w-5 h-5" />
              <span className="capitalize">Super Admin</span>
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

          {/* Contact Information */}
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
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Account Details
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
                    <span className="font-medium text-gray-600">Role</span>
                    <p className="text-gray-800">Super Admin</p>
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

export default AdminProfilePage;
