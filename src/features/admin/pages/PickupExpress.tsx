import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";

interface ExpressPickupRequest {
  id: number;
  user: string;
  name: string;
  phone: string;
  address: string;
  codAmount: string;
  invoice: string;
  weight: string;
  exchangeParcel: string;
  note: string;
}

const initialRequests: ExpressPickupRequest[] = [
  {
    id: 1,
    user: "John Doe",
    name: "John",
    phone: "123-456-7890",
    address: "123 Main St, Cityville",
    codAmount: "$100",
    invoice: "INV12345",
    weight: "5kg",
    exchangeParcel: "No",
    note: "Handle with care",
  },
  {
    id: 2,
    user: "Jane Smith",
    name: "Jane",
    phone: "987-654-3210",
    address: "456 Oak Ave, Townsville",
    codAmount: "$200",
    invoice: "INV12346",
    weight: "10kg",
    exchangeParcel: "Yes",
    note: "Urgent delivery",
  },
  {
    id: 3,
    user: "Samuel Green",
    name: "Samuel",
    phone: "555-123-4567",
    address: "789 Pine Rd, Villageburg",
    codAmount: "$50",
    invoice: "INV12347",
    weight: "3kg",
    exchangeParcel: "No",
    note: "Standard items",
  },
];

const PickupExpress = () => {
  const [requests, setRequests] = useState<ExpressPickupRequest[]>(initialRequests);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState<Partial<ExpressPickupRequest>>({});

  const handleAddRequest = () => {
    const newRequestItem: ExpressPickupRequest = {
      id: requests.length + 1,
      user: newRequest.user || "",
      name: newRequest.name || "",
      phone: newRequest.phone || "",
      address: newRequest.address || "",
      codAmount: newRequest.codAmount || "",
      invoice: newRequest.invoice || "",
      weight: newRequest.weight || "",
      exchangeParcel: newRequest.exchangeParcel || "",
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
          Express Pickup Requests
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Cod Amount</th>
              <th className="p-3 text-left">Invoice</th>
              <th className="p-3 text-left">Weight</th>
              <th className="p-3 text-left">Exchange Parcel</th>
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
                <td className="p-3">{request.name}</td>
                <td className="p-3">{request.phone}</td>
                <td className="p-3">{request.address}</td>
                <td className="p-3">{request.codAmount}</td>
                <td className="p-3">{request.invoice}</td>
                <td className="p-3">{request.weight}</td>
                <td className="p-3">{request.exchangeParcel}</td>
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
            <label className="block text-sm mb-2">Name</label>
            <input
              type="text"
              value={newRequest.name || ""}
              onChange={(e) =>
                setNewRequest({ ...newRequest, name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm mb-2">Phone</label>
            <input
              type="text"
              value={newRequest.phone || ""}
              onChange={(e) =>
                setNewRequest({ ...newRequest, phone: e.target.value })
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
            <label className="block text-sm mb-2">Cod Amount</label>
            <input
              type="text"
              value={newRequest.codAmount || ""}
              onChange={(e) =>
                setNewRequest({ ...newRequest, codAmount: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm mb-2">Invoice</label>
            <input
              type="text"
              value={newRequest.invoice || ""}
              onChange={(e) =>
                setNewRequest({ ...newRequest, invoice: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm mb-2">Weight</label>
            <input
              type="text"
              value={newRequest.weight || ""}
              onChange={(e) =>
                setNewRequest({ ...newRequest, weight: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm mb-2">Exchange Parcel</label>
            <input
              type="text"
              value={newRequest.exchangeParcel || ""}
              onChange={(e) =>
                setNewRequest({ ...newRequest, exchangeParcel: e.target.value })
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

export default PickupExpress;
