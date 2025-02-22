import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import CreateDescriptionForm from "./CreateDescription";

interface Deception {
  id: number;
  phone: string;
  name: string;
  trackingId: string;
}

const initialDeceptions: Deception[] = [
  {
    id: 1,
    phone: "123-456-7890",
    name: "John Doe",
    trackingId: "TRK12345",
  },
  {
    id: 2,
    phone: "987-654-3210",
    name: "Jane Smith",
    trackingId: "TRK67890",
  },
  {
    id: 3,
    phone: "555-123-4567",
    name: "Tom Johnson",
    trackingId: "TRK11223",
  },
  {
    id: 4,
    phone: "444-999-2222",
    name: "Emily Davis",
    trackingId: "TRK33445",
  },
];

const DeceptionCheck = () => {
  const [deceptions, setDeceptions] = useState<Deception[]>(initialDeceptions);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDeception, setNewDeception] = useState<Partial<Deception>>({});

  const handleAddDeception = () => {
    if (!newDeception.phone || !newDeception.name || !newDeception.trackingId) {
      alert("Please fill in all required fields.");
      return;
    }
    const newDeceptionItem: Deception = {
      id: deceptions.length + 1,
      phone: newDeception.phone!,
      name: newDeception.name!,
      trackingId: newDeception.trackingId!,
    };

    setDeceptions([...deceptions, newDeceptionItem]);
    setIsModalOpen(false);
    setNewDeception({});
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Deceptions
        </h2>
        <button className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
          <FaPlus /> Create Description
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Tracking Id</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {deceptions.map((deception) => (
              <tr
                key={deception.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-3">{deception.id}</td>
                <td className="p-3">{deception.phone}</td>
                <td className="p-3">{deception.name}</td>
                <td className="p-3">{deception.trackingId}</td>
                <td className="p-3 relative">
                  <button
                    className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === deception.id ? null : deception.id
                      )
                    }
                  >
                    <FaEllipsisV />
                  </button>

                  {openDropdown === deception.id && (
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
            <h3 className="text-lg font-semibold mb-4">Add New Deception</h3>
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Phone"
              onChange={(e) =>
                setNewDeception({ ...newDeception, phone: e.target.value })
              }
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Name"
              onChange={(e) =>
                setNewDeception({ ...newDeception, name: e.target.value })
              }
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Tracking Id"
              onChange={(e) =>
                setNewDeception({ ...newDeception, trackingId: e.target.value })
              }
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleAddDeception}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      <CreateDescriptionForm/>
    </div>
  );
};

export default DeceptionCheck;
