import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash, } from "react-icons/fa";
import ModalXXL from "./ModalXXL";


interface DeliveryMan {
  id: number;
  name: string;
  email: string;
  hub: string;
  deliveryCharge: string;
  pickupCharge: string;
  returnCharge: string;
  currentBalance: string;
  openingBalance: string;
  status: "Active" | "Inactive";
  avatar: string;
}

const initialDeliveryMen: DeliveryMan[] = [
  {
    id: 1,
    name: "Soeman Majhi",
    email: "jackdenial10@gmail.com",
    hub: "Jatrabari",
    deliveryCharge: "৳40.00",
    pickupCharge: "৳5.00",
    returnCharge: "৳20.00",
    currentBalance: "৳-1100.00",
    openingBalance: "৳0.00",
    status: "Active",
    avatar: "https://cte.fitspick.com/public/images/default/user.png",
  },
  {
    id: 2,
    name: "Soeman Majhi",
    email: "jackdenial10@gmail.com",
    hub: "Jatrabari",
    deliveryCharge: "৳40.00",
    pickupCharge: "৳5.00",
    returnCharge: "৳20.00",
    currentBalance: "৳-1100.00",
    openingBalance: "৳0.00",
    status: "Active",
    avatar: "https://cte.fitspick.com/public/images/default/user.png",
  },
  {
    id: 3,
    name: "Soeman Majhi",
    email: "jackdenial10@gmail.com",
    hub: "Jatrabari",
    deliveryCharge: "৳40.00",
    pickupCharge: "৳5.00",
    returnCharge: "৳20.00",
    currentBalance: "৳-1100.00",
    openingBalance: "৳0.00",
    status: "Active",
    avatar: "https://cte.fitspick.com/public/images/default/user.png",
  },
  {
    id: 4,
    name: "Soeman Majhi",
    email: "jackdenial10@gmail.com",
    hub: "Jatrabari",
    deliveryCharge: "৳40.00",
    pickupCharge: "৳5.00",
    returnCharge: "৳20.00",
    currentBalance: "৳-1100.00",
    openingBalance: "৳0.00",
    status: "Active",
    avatar: "https://cte.fitspick.com/public/images/default/user.png",
  },
];

const DeliveryManTable = () => {
  const [deliveryMen, setDeliveryMen] =
    useState<DeliveryMan[]>(initialDeliveryMen);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDeliveryMan, setNewDeliveryMan] = useState<Partial<DeliveryMan>>({
    status: "Active",
  });

  const handleAddDeliveryMan = () => {
    if (!newDeliveryMan.name || !newDeliveryMan.email || !newDeliveryMan.hub) {
      alert("Please fill in all required fields.");
      return;
    }
    const newMan: DeliveryMan = {
      id: deliveryMen.length + 1,
      name: newDeliveryMan.name!,
      email: newDeliveryMan.email!,
      hub: newDeliveryMan.hub!,
      deliveryCharge: newDeliveryMan.deliveryCharge || "৳0.00",
      pickupCharge: newDeliveryMan.pickupCharge || "৳0.00",
      returnCharge: newDeliveryMan.returnCharge || "৳0.00",
      currentBalance: "৳0.00",
      openingBalance: "৳0.00",
      status: newDeliveryMan.status as "Active" | "Inactive",
      avatar: "https://cte.fitspick.com/public/images/default/user.png",
    };

    setDeliveryMen([...deliveryMen, newMan]);
    setIsModalOpen(false);
    setNewDeliveryMan({ status: "Active" });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Delivery Man
        </h2>
        <ModalXXL/>
       
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Hub</th>
              <th className="p-3 text-left">Delivery Charge</th>
              <th className="p-3 text-left">Pickup Charge</th>
              <th className="p-3 text-left">Return Charge</th>
              <th className="p-3 text-left">Current Balance</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {deliveryMen.map((man) => (
              <tr
                key={man.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-3">{man.id}</td>
                <td className="p-3 flex items-center space-x-2">
                  <img
                    src={man.avatar}
                    alt={man.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{man.name}</p>
                    <p className="text-xs text-gray-500">{man.email}</p>
                  </div>
                </td>
                <td className="p-3">{man.hub}</td>
                <td className="p-3">{man.deliveryCharge}</td>
                <td className="p-3">{man.pickupCharge}</td>
                <td className="p-3">{man.returnCharge}</td>
                <td className="p-3">{man.currentBalance}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      man.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {man.status}
                  </span>
                </td>
                <td className="p-3 relative">
                  <button
                    className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    onClick={() =>
                      setOpenDropdown(openDropdown === man.id ? null : man.id)
                    }
                  >
                    <FaEllipsisV />
                  </button>

                  {openDropdown === man.id && (
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
            <h3 className="text-lg font-semibold mb-4">Add New Delivery Man</h3>
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Name"
              onChange={(e) =>
                setNewDeliveryMan({ ...newDeliveryMan, name: e.target.value })
              }
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Email"
              onChange={(e) =>
                setNewDeliveryMan({ ...newDeliveryMan, email: e.target.value })
              }
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Hub"
              onChange={(e) =>
                setNewDeliveryMan({ ...newDeliveryMan, hub: e.target.value })
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
                onClick={handleAddDeliveryMan}
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

export default DeliveryManTable;
