import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";


interface PickupRequest {
  id: number;
  user: string;
  address: string;
  estimatedParcel: string;
  note: string;
}

const initialRequests: PickupRequest[] = [
  {
    id: 1,
    user: "John Doe",
    address: "123 Main St, Cityville",
    estimatedParcel: "5kg",
    note: "Fragile items, handle with care",
  },
  {
    id: 2,
    user: "Jane Smith",
    address: "456 Oak Ave, Townsville",
    estimatedParcel: "10kg",
    note: "Please bring a large vehicle",
  },
  {
    id: 3,
    user: "Samuel Green",
    address: "789 Pine Rd, Villageburg",
    estimatedParcel: "2kg",
    note: "Standard items",
  },
];

const PickupRegular = () => {
  const [requests, setRequests] = useState<PickupRequest[]>(initialRequests);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState<Partial<PickupRequest>>({});

  const handleAddRequest = () => {
    const newRequestItem: PickupRequest = {
      id: requests.length + 1,
      user: newRequest.user || "",
      address: newRequest.address || "",
      estimatedParcel: newRequest.estimatedParcel || "",
      note: newRequest.note || "",
    };

    setRequests([...requests, newRequestItem]);
    setIsModalOpen(false);
    setNewRequest({});
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Regular Pickup Requests
        </h2>
      
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Estimated Parcel</th>
              <th className="p-3 text-left">Note</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {requests.map((request) => (
              <tr
                key={request.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-3">{request.user}</td>
                <td className="p-3">{request.address}</td>
                <td className="p-3">{request.estimatedParcel}</td>
                <td className="p-3">{request.note}</td>
                <td className="p-3 relative">
                  <button
                    className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === request.id ? null : request.id
                      )
                    }
                  >
                    <FaEllipsisV />
                  </button>

                  {openDropdown === request.id && (
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Pickup Request</h3>
            <label className="block text-sm mb-2">User</label>
            <input
              type="text"
              value={newRequest.user || ""}
              onChange={(e) =>
                setNewRequest({ ...newRequest, user: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm mb-2">Address</label>
            <input
              type="text"
              value={newRequest.address || ""}
              onChange={(e) =>
                setNewRequest({ ...newRequest, address: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm mb-2">Estimated Parcel</label>
            <input
              type="text"
              value={newRequest.estimatedParcel || ""}
              onChange={(e) =>
                setNewRequest({ ...newRequest, estimatedParcel: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm mb-2">Note</label>
            <textarea
              value={newRequest.note || ""}
              onChange={(e) =>
                setNewRequest({ ...newRequest, note: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleAddRequest}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PickupRegular;
