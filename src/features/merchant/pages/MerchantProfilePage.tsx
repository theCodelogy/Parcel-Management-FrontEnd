import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  User,
  ArrowLeftRight,
  Building,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import axios from "axios";
import { TUser } from "@/interface";

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
  isOpen: boolean;
  onRequestClose: () => void;
  userData: UserData;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onRequestClose,
  userData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
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
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
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
              className="px-4 py-2 mr-2 text-gray-700 border rounded-lg hover:bg-gray-100 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
};

const MerchantProfilePage: React.FC<UserProfileProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { email } = useAppSelector(useCurrentUser) as TUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://parcel-management-back-end-peach.vercel.app/api/v1/merchant?email=${email}`
        );
        const data = response.data.data[0];
        const mappedData: UserData = {
          id: data._id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          avatarUrl: data.image,
          joinDate: data.createdAt,
          businessName: data.businessName,
          referenceName: data.referenceName,
          referencePhone: data.referencePhone,
          returnCharges: data.returnCharges,
        };
        setUserData(mappedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [email]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!userData) {
    return <div>Loading...</div>;
  }

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="profile-section p-6 sm:p-8 shadow-md rounded-3xl bg-white backdrop-filter backdrop-blur-md">
          <div className="flex flex-col md:space-x-8">
            {/* Profile Header Section */}
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
                  onClick={openModal}
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
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          userData={userData}
        />
      </motion.div>

      <style>{`
        .modal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
          max-width: 500px;
          width: 90%;
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
    </div>
  );
};

export default MerchantProfilePage;
