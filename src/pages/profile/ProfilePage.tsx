import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  CheckCircle,
  Calendar,
  Edit,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

// Define user role types
type UserRole = "admin";

// Define the user data interface
interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  role: UserRole;
  avatarUrl: string;
  joinDate: string;
  verified: boolean;
  stats: {
    adminStats?: {
      totalUsers: number;
      activeDeliveries: number;
      pendingApprovals: number;
      systemHealth: number;
    };
  };
}

// Sample user data for demonstration
const sampleUsers: Record<UserRole, UserData> = {
  admin: {
    id: "admin-001",
    name: "Alex Morgan",
    email: "alex.morgan@parcelid.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Admin Ave",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "USA",
    },
    role: "admin",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    joinDate: "2020-01-15",
    verified: true,
    stats: {
      adminStats: {
        totalUsers: 1458,
        activeDeliveries: 267,
        pendingApprovals: 23,
        systemHealth: 98,
      },
    },
  },
};

// Interface for component props
interface UserProfileProps {
  userId?: string;
  role?: UserRole;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  userData: UserData;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onRequestClose, userData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: `${userData.address.street}, ${userData.address.city}, ${userData.address.state} ${userData.address.zipCode}, ${userData.address.country}`,
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Profile Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
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
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
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
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onRequestClose}
            className="px-4 py-2 mr-2 text-gray-700 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

const UserProfile: React.FC<UserProfileProps> = ({ role = "admin" }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const userData = sampleUsers[role];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Get role badge color
  const getRoleBadgeColor = (role: UserRole): string => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get role icon
  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "admin":
        return <Shield className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className="profile-section p-6 sm:p-8 shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
          {/* Profile Header Section */}
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="relative mb-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <img
                  src={userData.avatarUrl}
                  alt={userData.name}
                  className="object-cover"
                />
              </Avatar>
              {userData.verified && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Verified Account</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <h1 className="text-2xl font-bold text-profile-primary">
              {userData.name}
            </h1>
            <div
              className={`profile-badge flex items-center gap-1 mt-2 ${getRoleBadgeColor(
                userData.role
              )}`}
            >
              {getRoleIcon(userData.role)}
              <span className="capitalize">{userData.role}</span>
            </div>
            <p className="text-profile-muted mt-1 mb-2">
              Member since {formatDate(userData.joinDate)}
            </p>
            <Button
              className="profile-button profile-button-primary mt-2"
              onClick={openModal}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          {/* Contact Information and Stats */}
          <div className="flex-1">
            <h2 className="profile-heading mb-4">Contact Information</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-profile-accent mr-3 mt-0.5" />
                <div>
                  <span className="profile-label">Email</span>
                  <p className="profile-value">{userData.email}</p>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-profile-accent mr-3 mt-0.5" />
                <div>
                  <span className="profile-label">Phone</span>
                  <p className="profile-value">{userData.phone}</p>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-profile-accent mr-3 mt-0.5" />
                <div>
                  <span className="profile-label">Address</span>
                  <p className="profile-value">
                    {userData.address.street}, {userData.address.city},{" "}
                    {userData.address.state} {userData.address.zipCode},{" "}
                    {userData.address.country}
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <Calendar className="w-5 h-5 text-profile-accent mr-3 mt-0.5" />
                <div>
                  <span className="profile-label">Member Since</span>
                  <p className="profile-value">
                    {formatDate(userData.joinDate)}
                  </p>
                </div>
              </li>
            </ul>

            {/* Stats Section */}
            <h2 className="profile-heading mt-6 mb-4">Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="profile-stat">
                <span className="profile-stat-value">
                  {userData.stats.adminStats?.totalUsers}
                </span>
                <span className="profile-stat-label">Total Users</span>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-value">
                  {userData.stats.adminStats?.activeDeliveries}
                </span>
                <span className="profile-stat-label">Active Deliveries</span>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-value">
                  {userData.stats.adminStats?.pendingApprovals}
                </span>
                <span className="profile-stat-label">Pending Approvals</span>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-value">
                  {userData.stats.adminStats?.systemHealth}%
                </span>
                <span className="profile-stat-label">System Health</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <EditProfileModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        userData={userData}
      />

      <style>{`
        .modal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </motion.div>
  );
};

export default UserProfile;
