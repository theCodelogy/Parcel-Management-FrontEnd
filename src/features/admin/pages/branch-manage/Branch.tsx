/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import CreateBranchModal from "./CreateBranchModal";

// Static data structure for branches
interface Branch {
  id: number;
  name: string;
  phone: string;
  address: string;
  status: "Active" | "Inactive";
}

const initialBranches: Branch[] = [
  {
    id: 1,
    name: "Jatrabari Branch",
    phone: "017xxxxxxx",
    address: "Jatrabari, Dhaka",
    status: "Active",
  },
  {
    id: 2,
    name: "Uttara Branch",
    phone: "018xxxxxxx",
    address: "Uttara, Dhaka",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Mirpur Branch",
    phone: "019xxxxxxx",
    address: "Mirpur, Dhaka",
    status: "Active",
  },
];

const Branch = () => {
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Branches
        </h2>
        <CreateBranchModal />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {branches.map((branch) => (
              <tr
                key={branch.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-3">{branch.id}</td>
                <td className="p-3">{branch.name}</td>
                <td className="p-3">{branch.phone}</td>
                <td className="p-3">{branch.address}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      branch.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {branch.status}
                  </span>
                </td>
                <td className="p-3 relative">
                  <button
                    className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    onClick={() =>
                      setOpenDropdown(openDropdown === branch.id ? null : branch.id)
                    }
                  >
                    <FaEllipsisV />
                  </button>

                  {openDropdown === branch.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
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
      </div>
    </div>
  );
};

export default Branch;
