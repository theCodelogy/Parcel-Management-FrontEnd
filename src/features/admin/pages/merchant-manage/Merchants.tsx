import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash, FaPlus, FaSearch, FaFileInvoice } from "react-icons/fa";
import CreateMerchant from "./CreateMerchant";

// Sample data for merchants
interface Merchant {
  id: number;
  details: string;
  hub: string;
  businessName: string;
  uniqueId: string;
  phone: string;
  status: "Active" | "Inactive";
  currentBalance: string;
  avatar: string;
}

const initialMerchants: Merchant[] = [
  {
    id: 1,
    details: "Merchant A",
    hub: "Hub 1",
    businessName: "Business A",
    uniqueId: "ID001",
    phone: "123-456-7890",
    status: "Active",
    currentBalance: "৳10000.00",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    details: "Merchant B",
    hub: "Hub 2",
    businessName: "Business B",
    uniqueId: "ID002",
    phone: "987-654-3210",
    status: "Inactive",
    currentBalance: "৳5000.00",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    details: "Merchant C",
    hub: "Hub 1",
    businessName: "Business C",
    uniqueId: "ID003",
    phone: "555-666-7777",
    status: "Active",
    currentBalance: "৳7000.00",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const MerchantList = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [merchants, setMerchants] = useState<Merchant[]>(initialMerchants);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredMerchants = merchants.filter(
    (merchant) =>
      merchant.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.phone.includes(searchTerm)
  );

  const handleCreateMerchant = () => {
    // You can add functionality for creating a new merchant
    alert("Create Merchant button clicked!");
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Merchant List
        </h2>
        <div className="mb-4 flex justify-center">
        <div className="relative w-80% max-w-md">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 pl-10 pr-4 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white w-full"
          />
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" />
        </div>
      </div>
        {/* Create Merchant Button */}
        <button
          onClick={handleCreateMerchant}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" /> Create Merchant
        </button>
        
      </div>

      {/* Search Bar Centered */}
      

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Details</th>
              <th className="p-3 text-left">Hub</th>
              <th className="p-3 text-left">Business Name</th>
              <th className="p-3 text-left">Unique ID</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Current Balance</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {filteredMerchants.map((merchant) => (
              <tr
                key={merchant.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-3">{merchant.id}</td>
                <td className="p-3 flex items-center">
                  <img
                    src={merchant.avatar}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  {merchant.details}
                </td>
                <td className="p-3">{merchant.hub}</td>
                <td className="p-3">{merchant.businessName}</td>
                <td className="p-3">{merchant.uniqueId}</td>
                <td className="p-3">{merchant.phone}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      merchant.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {merchant.status}
                  </span>
                </td>
                <td className="p-3">{merchant.currentBalance}</td>
                <td className="p-3 relative">
                  <button
                    className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    onClick={() =>
                      setOpenDropdown(openDropdown === merchant.id ? null : merchant.id)
                    }
                  >
                    <FaEllipsisV />
                  </button>

                  {openDropdown === merchant.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                      <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaFileInvoice className="mr-2" /> Generate Invoice
                      </button>
                      <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaSearch className="mr-2" /> View
                      </button>
                      <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaEdit className="mr-2" /> Edit
                      </button>
                      <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CreateMerchant/>
      </div>
    </div>
  );
};

export default MerchantList;
